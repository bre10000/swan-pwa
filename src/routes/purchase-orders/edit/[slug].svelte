<script context="module">
    export async function preload(params) {
        return { slug: parseInt(params.params.slug) };
    }
</script>

<script>
    import { form, field } from "svelte-forms";
    import { required } from "svelte-forms/validators";
    import { get, post, put, del } from "../../../lib/api";
    import { goto } from "@sapper/app";
    import { toast } from "@zerodevx/svelte-toast";
    import {
        faAngleLeft,
        faSave,
        faEdit,
        faPlus,
        faTimes,
    } from "@fortawesome/free-solid-svg-icons";
    import Icon from "svelte-awesome/components/Icon.svelte";
    import { checkInput, numberWithCommas } from "../../../lib";
    import Select from "svelte-select";
    import { DateInput } from "date-picker-svelte";
    import qs from "qs";
    import DeleteConfirmation from "../../../widgets/modals/DeleteConfirmation.svelte";
    import { createActivityLog } from "../../../utils/activity/log";
import UnsavedConfirmation from "../../../widgets/modals/UnsavedConfirmation.svelte";

    export let slug;

    const poNumber = field("poNumber", "", [required()]);
    const consortium_member = field("consortium_member", "", [required()]);
    const date = field("date", new Date(), [required()]);

    const formItem = form(poNumber, consortium_member, date);

    let formChildItems = [];

    let consortium_members = [];
    let items = [];

    let errors;

    let unsavedItemsDialog;

    let currentItem;
    let showConfirmation = false;

    async function add() {
        await formItem.validate();
        if (!$formItem.valid) {
            return;
        }

        if(!validateChildItems()) {
            return;
        }

        try {
            let params = {
                populate: [
                    "consortium_member",
                    "purchase_order_items",
                    "purchase_order_items.item",
                ],
            };
            params = qs.stringify(params, {
                encodeValuesOnly: true,
            });

            let response = await put({
                path: "purchase-orders/" + slug + "?" + params,
                data: {
                    data: {
                        poNumber: $poNumber.value,
                        consortium_member: $consortium_member.value,
                        date: $date.value,
                    },
                },
            });

            console.log("Add Purchase Order Request  ", response);

            if (response.data?.id) {
                toast.push("Purchase Order Edited Successfully!", {
                    duration: 20000,
                    theme: {
                        "--toastBackground": "#48BB78",
                        "--toastBarBackground": "#2F855A",
                    },
                });

                createActivityLog(
                    "Purchase Order",
                    response.data,
                    "Edit",
                    response.data.id
                );

                saveItems(response.data);
            }
        } catch (e) {
            console.log("Error Add Purchase Order   ", e);

            errors = e.error?.details.errors;

            toast.push(
                "Purchase Order Could Not Be Edited! \n\n" + e.error.message,
                {
                    duration: 20000,
                    theme: {
                        "--toastBackground": "#bb4848",
                        "--toastBarBackground": "#852f2f",
                    },
                }
            );
        }
    }

    async function saveItems(po) {
        try {
            formChildItems.forEach(async (element) => {
                if(element.createdAt) {

                    let response = await put({
                    path: "purchase-order-items/" + element.id + "?populate=*",
                    data: {
                        data: {
                            unit: element.unit,
                            pieces: element.pieces,
                            quantity: element.quantity,
                            unitPrice: element.unitPrice,
                            currency: element.currency,
                            remark: element.remark,

                            purchase_order: po.id,
                            item: element.item.value,
                        },
                    },
                });

                console.log("Edit Purchase Order Item ", response);

                if (response.data) {
                    createActivityLog(
                        "Purchase Order Item",
                        response.data,
                        "Edit",
                        response.data.id
                    );
                }

                } else {

                    let response = await post({
                    path: "purchase-order-items?populate=*",
                    data: {
                        data: {
                            unit: element.unit,
                            pieces: element.pieces,
                            quantity: element.quantity,
                            unitPrice: element.unitPrice,
                            currency: element.currency,
                            remark: element.remark,

                            purchase_order: po.id,
                            item: element.item.value,
                        },
                    },
                });

                console.log("Save Purchase Order Items ", response);

                if (response.data) {
                    createActivityLog(
                        "Purchase Order Item",
                        response.data,
                        "Create",
                        response.data.id
                    );
                }

                }
                
            });

            goto("purchase-orders");
        } catch (e) {
            console.log("Error Purchase Order Items ", e);
        }
    }

    function addChildItem() {
        formChildItems = [
            ...formChildItems,
            {
                category: "",
                item: "",
                items: [],
                currency: "",
                quantity: "",
                unitPrice: "",
                remark: "",

                id: Date.now(),
            },
        ];

        console.log("Form Child Items - ", { formChildItems });
    }

    function removeChildItem(id, childItem) {
        if (childItem.createdAt) {
            showConfirmation = true;
            currentItem = childItem;
            return;
        }
        formChildItems = formChildItems.filter((x) => x.id != id);
    }

    function filterItems(event, id) {
        let index = formChildItems.findIndex((x) => x.id == id);
        formChildItems[index].items = items.filter(
            (x) => x.category == event.target.value
        );

        console.log("Filtered Items ", items.filter(
            (x) => x.category == event.target.value
        ), event.target.value)
    }
    function selectItem(event, id) {
        let index = formChildItems.findIndex((x) => x.id == id);
        formChildItems[index].item = event?.detail;
    }

    function validateChildItems() {
        formChildItems.forEach((element) => {
            if (
                checkInput(element.item) &&
                checkInput(element.quantity) &&
                checkInput(element.unitPrice) &&
                checkInput(element.currency)
            ) {
                element.error = null;
            } else {
                element.error =
                    "<b> Required field/s are missing </b> <br> " +
                    (checkInput(element.item) ? "" : " Item ") +
                    (checkInput(element.quantity) ? "" : " Quantity ") +
                    (checkInput(element.unitPrice) ? "" : " Unit Price ") +
                    (checkInput(element.currency) ? "" : " Currency ");
            }
        });

        console.log("validate", { formChildItems });

        formChildItems = formChildItems;

        console.log(
            "Validate Result",
            formChildItems.filter((x) => checkInput(x.error))
        );

        if (formChildItems.filter((x) => checkInput(x.error)).length == 0) {
            return true;
        } else {
            $formItem.valid = true;
            formItem = formItem;
            return false;
        }
    }

    async function deleteItem() {
        showConfirmation = false;

        try {
            let response = await del(
                "purchase-order-items/" + currentItem.id,
                null
            );

            console.log("Delete Purchase Order Item Request  ", response);

            if (response.data?.id) {
                toast.push("Purchase Order Item Deleted Successfully!", {
                    duration: 20000,
                    theme: {
                        "--toastBackground": "#48BB78",
                        "--toastBarBackground": "#2F855A",
                    },
                });

                createActivityLog(
                    "Purchase Order Item",
                    currentItem,
                    "Delete",
                    currentItem.id
                );

                getItem();
            }
        } catch (e) {
            console.log("Error Delete Purchase Order Item  ", e);
        }
    }

    async function getConsortiumMembers() {
        try {
            let params = {
                "pagination[limit]": -1,
            };
            params = qs.stringify(params, {
                encodeValuesOnly: true,
            });

            let response = await get("consortium-members", params);

            console.log("Get Consortium Members ", response);

            consortium_members = response.data;
        } catch (e) {
            console.log("Error Get Consortium Members ", e);
        }
    }

    async function getItems() {
        try {
            let params = {
                "pagination[limit]": -1,
            };
            params = qs.stringify(params, {
                encodeValuesOnly: true,
            });

            let response = await get("items", params);

            console.log("Get Items ", response);

            items = response.data.map((x) => {
                return {
                    value: x.id,
                    label:
                        x.attributes.name +
                        "-" +
                        x.attributes.unit +
                        "-" +
                        x.attributes.pieces,
                    data: x,
                    category: x.attributes.category
                };
            });


            getItem();
        } catch (e) {
            console.log("Error Get Items ", e);
        }
    }

    async function getItem() {
        try {
            let params = {
                populate: {
                    consortium_member: {
                        populate: "*",
                    },
                    purchase_order_items: {
                        populate: "*",
                    },
                },
            };
            params = qs.stringify(params, {
                encodeValuesOnly: true,
            });

            let response = await get("purchase-orders/" + slug, params);

            console.log("Get Purchase Order by ID ", response);

            poNumber.set(response.data.attributes.poNumber);
            consortium_member.set(
                response.data.attributes.consortium_member.data?.id
            );
            date.set(new Date(response.data.attributes.date));

            formChildItems =
                response.data.attributes.purchase_order_items.data.map((x) => {
                    console.log({ x });
                    return {
                        id: x.id,
                        category: x.attributes.item.data.attributes.category,
                        item: {
                            value: x.attributes.item.id,
                            label:
                                x.attributes.item.data.attributes.name +
                                "-" +
                                (x.attributes.item.data.attributes.unit
                                    ? x.attributes.item.data.attributes.unit
                                    : "") +
                                "-" +
                                (x.attributes.item.data.attributes.pieces
                                    ? x.attributes.item.data.attributes.pieces
                                    : ""),
                            category:
                                x.attributes.item.data.attributes.category,
                        },
                        category: x.attributes.item.data.attributes.category,
                        items: items,
                        currency: x.attributes.currency,
                        quantity: x.attributes.quantity,
                        unitPrice: x.attributes.unitPrice,
                        remark: x.attributes.remark,
                        createdAt: x.attributes.createdAt,
                    };
                });
        } catch (e) {
            console.log("Error get Purchase Order by ID ", e);
        }
    }

    $: if (slug) {
        getItems();
        getConsortiumMembers();
       
    }
</script>

<svelte:head>
    <title>Edit Purchase Order</title>
</svelte:head>

<br /><br />
<div class="container px-6">
    <a href="purchase-orders" on:click|preventDefault={() => unsavedItemsDialog = true} class="has-text-dark"
        ><span class="icon is-small"><Icon data={faAngleLeft} /></span> Back</a
    >
    <br /><br />
    <div class="card px-6">
        <br /><br />
        <div class="columns">
            <div class="column">
                <h3 class="my-0">Edit Purchase Order</h3>
                <p class="gray py-0">Complete the form below and click save.</p>
            </div>
            <div class="column has-text-right">
                <button
                    disabled={!$formItem.valid && !$formItem.dirty}
                    on:click|preventDefault={add}
                    class="button is-dark my-2 px-5 py-2 has-text-weight-bold"
                    ><Icon data={faSave} />
                    <span class="ml-2 has-text-white">Save</span></button
                >
            </div>
        </div>

        <br />

        {#if errors}
            {#each errors as e}
                <div class="notification is-danger">
                    <span class="has-text-weight-bold">{e.path}</span>
                    <br />{e.message}
                </div>
            {/each}
        {/if}
        <!-- svelte-ignore component-name-lowercase -->
        <form>
            <div class="columns">
                <div class="column">
                    <div class="field">
                        <label for="" class="gray">PO# (*)</label>
                        <div class="control">
                            <input
                                class="input"
                                required
                                bind:value={$poNumber.value}
                                type="text"
                                name="poNumber"
                            />
                        </div>
                        {#if $formItem.hasError("poNumber.required")}
                            <p class="help is-danger">PO# Number is required</p>
                        {/if}
                    </div>
                </div>

                <div class="column">
                    <div class="field">
                        <label for="" class="gray">Consortium Member</label><br
                        />
                        <div class="control select is-fullwidth">
                            <select
                                required
                                name="category"
                                bind:value={$consortium_member.value}
                            >
                                {#each consortium_members as c}
                                    <option value={c.id}
                                        >{c.attributes.name}</option
                                    >
                                {/each}
                            </select>
                        </div>
                        {#if $formItem.hasError("consortium_member.required")}
                            <p class="help is-danger">
                                Consortium Member is required
                            </p>
                        {/if}
                    </div>
                </div>
            </div>
            <div class="columns">
                <div class="column">
                    <div class="field">
                        <label for="" class="gray">Date</label><br />
                        <div class="control">
                            <DateInput
                                bind:value={$date.value}
                                format="yyyy/MM/dd"
                                placeholder="2000/31/12"
                                closeOnSelection={true}
                                min={new Date("1920/1/1")}
                                class="input"
                            />
                        </div>
                    </div>
                </div>
                <div class="column" />
            </div>


            <br />
        </form>

        <!-- svelte-ignore component-name-lowercase -->
        <form>
            <div class="columns">
                <div class="column">
                    <h4 class="my-0">Purchase Order Items</h4>
                </div>
                <div class="column has-text-right">
                    <button
                        type="button"
                        on:click|preventDefault={addChildItem}
                        class="button is-success"
                    >
                        <span class="icon">
                            <Icon data={faPlus} />
                        </span>
                        <span class="has-text-white has-text-weight-bold"
                            >Add a Purchase Order Item</span
                        >
                    </button>
                </div>
            </div>
            <div class="columns child-item">
                <div
                    class="column is-narrow has-text-weight-bold"
                    style="width: 50px;"
                >
                    No.
                </div>
                <div
                    class="column is-narrow has-text-weight-bold is-size-8"
                    style="width: 100px;"
                >
                    PO Item ID
                </div>
                <div class="column  is-narrow" style="width: 120px;">
                    <label for="" class="gray">Category</label>
                </div>
                <div class="column  is-narrow" style="width: 250px;">
                    <label for="" class="gray">Item (*)</label>
                </div>
                <div class="column">
                    <label for="" class="gray">Quantity</label>
                </div>
                <div class="column">
                    <label for="" class="gray">Currency</label>
                </div>
                <div class="column">
                    <label for="" class="gray">Unit Price</label>
                </div>
                <div class="column">
                    <span class="has-text-weight-bold">Total</span>
                </div>
                <div class="column">
                    <label for="" class="gray">Remark</label>
                </div>
                <div
                    class="column is-narrow has-text-weight-bold"
                    style="width: 42px;"
                />
            </div>

            {#each formChildItems as childItem, index}
                <div
                    class="columns child-item"
                    class:is-danger={childItem.error}
                >
                    <div class="column is-narrow" style="width: 50px;">
                        <input
                            type="text"
                            class="input has-background-light border-radius-0 "
                            disabled
                            value={index + 1}
                        />
                    </div>
                    <div class="column is-narrow" style="width: 100px;">
                        <input
                            style="background-color: rgb(236, 239, 255) !important;"
                            type="text"
                            class="input has-text-weight-bold border-radius-0 "
                            disabled
                            value={childItem.createdAt ? childItem.id : "-"}
                        />
                    </div>
                    <div class="column  is-narrow" style="width: 120px;">
                        <div class="control select is-fullwidth">
                            <select
                                on:change={(event) =>
                                    filterItems(event, childItem.id)}
                                bind:value={childItem.category}
                                class="border-radius-0 "
                            >
                                <option>Health</option>
                                <option>Wash</option>
                                <option>ES/NFI</option>
                            </select>
                        </div>
                    </div>
                    <div class="column  is-narrow" style="width: 250px;">
                        <div class="field">
                            <div class="control">
                                <Select
                                    items={childItem.items}
                                    value={childItem.item}
                                    on:select={(event) =>
                                        selectItem(event, childItem.id)}
                                    listAutoWidth={true}
                                />
                            </div>
                        </div>
                    </div>

                    <div class="column">
                        <input
                            bind:value={childItem.quantity}
                            type="number"
                            placeholder="Quantity"
                            class="input has-background-light border-radius-0 "
                        />
                    </div>

                    <div class="column">
                        <div class="control select is-fullwidth">
                            <select
                                class="border-radius-0"
                                bind:value={childItem.currency}
                            >
                                <option>ETB (ETB)</option>
                                <option>USD (US$)</option>
                                <option>EUR (€)</option>
                                <option>JPY (¥)</option>
                                <option>GBP (£)</option>
                                <option>AUD (A$)</option>
                                <option>CAD (C$)</option>
                                <option>CHF (Fr)</option>
                                <option>CNY </option>
                                <option>SEK (kr)</option>
                                <option>NZD (NZ$)</option>
                                <option>MXN ($)</option>
                            </select>
                        </div>
                    </div>
                    <div class="column">
                        <input
                            type="number"
min=0 oninput="validity.valid||(value='');"
                            placeholder="Unit Price"
                            class="input has-background-light border-radius-0 "
                            bind:value={childItem.unitPrice}
                        />
                    </div>
                    <div class="column">
                        <input
                            type="text"
                            placeholder="Unit Price"
                            class="input has-background-light border-radius-0 "
                            disabled
                            value={numberWithCommas(
                                childItem.unitPrice *
                                    parseInt(childItem.quantity)
                            )
                                ? numberWithCommas(
                                      childItem.unitPrice *
                                          parseInt(childItem.quantity)
                                  )
                                : 0}
                        />
                    </div>

                    <div class="column">
                        <div class="field">
                            <div class="control is-fullwidth">
                                <input
                                    type="text"
                                    placeholder="Remark"
                                    class="input has-background-light"
                                    bind:value={childItem.remark}
                                    style="border-right: 1px solid lightgray !important;"
                                />
                            </div>
                        </div>
                    </div>

                    <div
                        class="column is-narrow has-text-weight-bold input has-text-right"
                        style="width: 42px;"
                    >
                        <!-- {#if childItem.createdAt}
                            <button class="button is-dark"> <Icon data={faSave}/></button>
                        {/if} -->
                        <button
                            type="button border-radius-0"
                            on:click|preventDefault={() => {
                                removeChildItem(childItem.id, childItem);
                            }}
                            class="button is-danger"
                        >
                            <Icon data={faTimes} /></button
                        >
                    </div>
                </div>
                {#if childItem.error}
                    <div class="columns px-3">
                        <div
                            class="column has-text-centered has-background-light has-text-danger p-4"
                        >
                            {@html childItem.error}
                        </div>
                    </div>
                {/if}
            {/each}
        </form>

        <br /><br />
    </div>
</div>
<br /><br /><br /><br /><br /><br /><br />


{#if unsavedItemsDialog}
    <UnsavedConfirmation
        on:confirm={() => goto('purchase-orders')}
        on:dismiss={() => (unsavedItemsDialog = false)}
    />
{/if}

{#if showConfirmation}
    <DeleteConfirmation
        on:confirm={deleteItem}
        on:dismiss={() => (showConfirmation = false)}
    />
{/if}

<style>
    .card {
        overflow: visible !important;
    }

    .input,
    .select {
        border-radius: 5px;
    }

    :global(body .date-time-field input) {
        box-shadow: inset 0 0.0625em 0.125em rgba(10, 10, 10, 0.05);
        max-width: 100%;
        width: 100%;
        background-color: #fff;
        border-color: #dbdbdb;
        border-radius: 4px;
        color: #363636;
        font-size: medium;
        padding: 0.5rem;
    }

    :global(.selectContainer .listContainer) {
        width: 400% !important;
        z-index: 10;
    }

    :global(.selectContainer input) {
        border: 1px solid lightgray !important;
        border-right: 0px solid lightgray !important;
        border-radius: 0px;
        font-size: 0.9rem !important;
        height: 36px !important;
        /* background-color: #f5f5f5!important; */
    }
    :global(.selectContainer) {
        height: 36px !important;
    }

    :global(.selectContainer .listContainer .listItem) {
        font-size: 14px;
        border-radius: 0px;
    }

    :global(.button.is-success svg *, .button.is-danger svg * , .button.is-info svg *) {
        color: white;
    }
</style>
