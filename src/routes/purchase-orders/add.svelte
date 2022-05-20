<script>
    import { form, field } from "svelte-forms";
    import { required } from "svelte-forms/validators";
    import { get, post } from "../../lib/api";
    import { goto } from "@sapper/app";
    import { toast } from "@zerodevx/svelte-toast";
    import Icon from "svelte-awesome/components/Icon.svelte";
    import {
        faAngleLeft,
        faCrosshairs,
        faPlus,
        faTimes,
    } from "@fortawesome/free-solid-svg-icons";
    import { onMount } from "svelte";
    import { DateInput } from "date-picker-svelte";
    import Select from "svelte-select";
    import { numberWithCommas } from "../../lib";
    import { createActivityLog } from '../../utils/activity/log';
    import qs from "qs";

    const poNumber = field("poNumber", "", [required()]);
    const consortium_member = field("consortium_member", "", [required()]);
    const date = field("date", new Date(), [required()]);

    const formItem = form(poNumber, consortium_member, date);

    const item = field("item", null, [required()]);
    const unit = field("unit", "", [required()]);
    const pieces = field("pieces", "", [required()]);
    const currency = field("currency", "", [required()]);
    const quantity = field("quantity", "", [required()]);
    const unitPrice = field("unitPrice", "", [required()]);
    let remark = "";

    const formChildItem = form(
        item,
        unit,
        pieces,
        currency,
        quantity,
        unitPrice
    );

    let childItems = [];

    let consortium_members = [];
    let items = [];

    let errors;

    async function add() {
        await formItem.validate();
        if (!$formItem.valid) {
            return;
        }

        try {
            let response = await post({
                path: "purchase-orders?populate=%2A",
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
                toast.push("Purchase Order Added Successfully!", {
                    duration: 20000,
                    theme: {
                        "--toastBackground": "#48BB78",
                        "--toastBarBackground": "#2F855A",
                    },
                });
                createActivityLog("Purchase Order", response.data, "Create", response.data.id)

                saveItems(response.data);
            }
        } catch (e) {
            console.log("Error Add Purchase Order   ", e);

            errors = e.error.details.errors;

            toast.push(
                "Purchase Order Could Not Be Added! \n\n" + e.error.message,
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
            childItems.forEach(async (element) => {
                let response = await post({
                    path: "purchase-order-items?populate=%2A",
                    data: {
                        data: {
                            unit: element.unit,
                            pieces: element.pieces,
                            quantity: element.quantity,
                            unitPrice: element.unitPrice,
                            currency: element.currency,
                            remark: element.remark,

                            purchase_order: po.id,
                            item: element.item.value
                        },
                    },
                });

                console.log("Save Purchase Order Items ", response)

                if(response.data) {
                    createActivityLog("Purchase Order Item", response.data, "Create", response.data.id)
                }
            });

            goto("purchase-orders")

        } catch (e) {
            console.log("Error Purchase Order Items ", e)
        }
    }

    async function addItem() {
        await formChildItem.validate();
        if (!$formChildItem.valid) {
            return;
        }

        childItems = [
            ...childItems,
            {
                index: childItems.length,
                item: $item.value,
                unit: $unit.value,
                pieces: $pieces.value,
                quantity: $quantity.value,
                currency: $currency.value,
                unitPrice: $unitPrice.value,
                remark: remark,
            },
        ];

        formChildItem.reset();
        remark = "";

        console.log(childItems);

        toast.push("Purchase Order Item Added Successfully!", {
            duration: 20000,
            theme: {
                "--toastBackground": "#48BB78",
                "--toastBarBackground": "#2F855A",
            },
        });
    }

    function removeChildItem(index) {
        childItems = childItems.filter(
            (x) => x.index != childItems[index].index
        );
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
                    label: x.attributes.name + "-" + x.attributes.category,
                };
            });
        } catch (e) {
            console.log("Error Get Items ", e);
        }
    }

    onMount(() => {
        getConsortiumMembers();
        getItems();
    });
</script>

<svelte:head>
    <title>Add Purchase Order</title>
</svelte:head>

<br /><br />
<div class="container px-6">
    <a href="purchase-orders" class="has-text-dark"
        ><span class="icon is-small"><Icon data={faAngleLeft} /></span> Back</a
    >
    <br /><br />

    <div class="card px-6">
        <br /><br />
        <div class="columns">
            <div class="column">
                <h3 class="my-0">Add Purchase Order</h3>
                <p class="gray py-0">Complete the form below and click save.</p>
            </div>
            <div class="column has-text-right">
                <button
                    disabled={!$formItem.valid || !$formItem.dirty}
                    on:click|preventDefault={add}
                    class="button is-dark my-2 px-5 py-2 has-text-weight-bold"
                    >Save</button
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

            <br /><br />

            <br />
        </form>

        {#each childItems as child, index}
            <div class="columns">
                <div class="column is-narrow">
                    <div class="tag is-rounded has-text-weight-bold is-large">
                        {index + 1}
                    </div>
                </div>
                <div class="column is-3">
                    {child.item.label} <br />
                    <span class="gray is-size-7">{child.remark}</span>
                </div>
                <div class="column has-text-centered">
                    <div class="tag is-rounded is-small">Unit</div>
                    <br />
                    {child.unit}
                </div>
                <div class="column has-text-centered">
                    <div class="tag is-rounded is-small">Pieces</div>
                    <br />
                    {child.pieces}
                </div>
                <div class="column has-text-centered">
                    <div class="tag is-rounded is-small">Quantity</div>
                    <br />
                    {numberWithCommas(child.quantity)}
                </div>
                <div class="column has-text-centered">
                    <div class="tag is-rounded is-small">Currency</div>
                    <br />
                    {child.currency}
                </div>
                <div class="column has-text-centered">
                    <div class="tag is-rounded is-small">Unit Price</div>
                    <br />
                    {numberWithCommas(child.unitPrice)}
                </div>
                <div class="column has-text-centered">
                    <div class="tag is-rounded is-small has-text-weight-bold">
                        Total
                    </div>
                    <br />
                    {numberWithCommas(child.unitPrice * child.quantity)}
                </div>
                <div class="column has-text-right">
                    <button
                        on:click={() => removeChildItem(index)}
                        class="button is-danger"
                    >
                        <span class="icon">
                            <Icon data={faTimes} />
                        </span>
                    </button>
                </div>
            </div>
            <hr />
        {/each}

        <!-- svelte-ignore component-name-lowercase -->
        <form>
            <div class="columns">
                <div class="column">
                    <h4 class="my-0">Purchase Order Items</h4>
                </div>
                <div class="column has-text-right">
                    <button
                        disabled={!$formItem.valid || !$formItem.dirty}
                        on:click|preventDefault={addItem}
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

            <div class="columns">
                <div class="column">
                    <div class="field">
                        <label for="" class="gray">Item (*)</label>
                        <div class="control">
                            <Select
                                {items}
                                bind:value={$item.value}
                                listAutoWidth={true}
                            />
                        </div>
                        {#if $formChildItem.hasError("item.required")}
                            <p class="help is-danger">Item is required</p>
                        {/if}
                    </div>
                </div>

                <div class="column">
                    <div class="field">
                        <label for="" class="gray">Remark</label><br />
                        <div class="control is-fullwidth">
                            <textarea
                                rows="1"
                                class="textarea"
                                bind:value={remark}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="columns">
                <div class="column">
                    <label for="" class="gray">Unit</label><br />
                    <div class="control select is-fullwidth">
                        <select bind:value={$unit.value}>
                            <option>Ampule</option>
                            <option>Bag</option>
                            <option>Bolus</option>
                            <option>Bottle</option>
                            <option>Box</option>
                            <option>Carton</option>
                            <option>Capsule</option>
                            <option>Day</option>
                            <option>Drum</option>
                            <option>Dozen</option>
                            <option>Kit</option>
                            <option>Liter</option>
                            <option>Meter</option>
                            <option>Pack</option>
                            <option>Pad</option>
                            <option>Pair</option>
                            <option>Pages</option>
                            <option>Pcs</option>
                            <option>Ream</option>
                            <option>Kg</option>
                            <option>Refill</option>
                            <option>Roll</option>
                            <option>Quintal</option>
                            <option>Sachet</option>
                            <option>Set</option>
                            <option>Spots</option>
                            <option>Strip</option>
                            <option>Suppository</option>
                            <option>Tab</option>
                            <option>Tin</option>
                            <option>Trip</option>
                            <option>Tube</option>
                            <option>Vial</option>
                        </select>
                    </div>
                    {#if $formChildItem.hasError("unit.required")}
                        <p class="help is-danger">Unit is required</p>
                    {/if}
                </div>
                <div class="column">
                    <label for="" class="gray">Pieces</label><br />
                    <input
                        bind:value={$pieces.value}
                        type="number"
                        placeholder="Piece"
                        class="input"
                    />
                    {#if $formChildItem.hasError("pieces.required")}
                        <p class="help is-danger">Pieces is required</p>
                    {/if}
                </div>
                <div class="column">
                    <label for="" class="gray">Quantity</label><br />
                    <input
                        bind:value={$quantity.value}
                        type="number"
                        placeholder="Quantity"
                        class="input"
                    />
                    {#if $formChildItem.hasError("quantity.required")}
                        <p class="help is-danger">Quantity is required</p>
                    {/if}
                </div>
            </div>

            <div class="columns">
                <div class="column">
                    <label for="" class="gray">Currency</label><br />
                    <div class="control select is-fullwidth">
                        <select bind:value={$currency.value}>
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
                    {#if $formChildItem.hasError("currency.required")}
                        <p class="help is-danger">Currency is required</p>
                    {/if}
                </div>
                <div class="column">
                    <label for="" class="gray">Unit Price</label><br />
                    <input
                        type="number"
                        placeholder="Unit Price"
                        class="input"
                        bind:value={$unitPrice.value}
                    />
                    {#if $formChildItem.hasError("unitPrice.required")}
                        <p class="help is-danger">Unit Price is required</p>
                    {/if}
                </div>
                <div class="column has-text-right">
                    <br />
                    <span class="has-text-weight-bold">Total - </span>
                    {numberWithCommas(
                        parseInt($unitPrice.value) * parseInt($quantity.value)
                    ) ? numberWithCommas(
                        parseInt($unitPrice.value) * parseInt($quantity.value)
                    ) : 0}
                </div>
            </div>
        </form>

        <br /><br />
    </div>
</div>

<br /><br /><br /><br /><br />

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
        width: 200% !important;
        z-index: 10;
    }
    :global(.selectContainer .listContainer .listItem) {
        font-size: 14px;
    }

    :global(.button.is-success svg *, .button.is-danger svg *) {
        color: white;
    }
</style>
