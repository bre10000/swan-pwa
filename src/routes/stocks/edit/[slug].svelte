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
        faHistory,
        faCalendarAlt,
    } from "@fortawesome/free-solid-svg-icons";
    import Icon from "svelte-awesome/components/Icon.svelte";
    import { checkInput, numberWithCommas, checkValue } from "../../../lib";
    import Select from "svelte-select";
    import { DateInput } from "date-picker-svelte";
    import qs from "qs";
    import DeleteConfirmation from "../../../widgets/modals/DeleteConfirmation.svelte";
    import { createActivityLog } from "../../../utils/activity/log";
    import UnsavedConfirmation from "../../../widgets/modals/UnsavedConfirmation.svelte";

    export let slug;

    const warehouse = field("warehouse", "", [required()]);
    const consortium_member = field("consortium_member", "", [required()]);
    const date = field("date", new Date(), [required()]);

    const formItem = form(warehouse, consortium_member, date);

    let remark = "";
    let remaining = 0;
    let stock_items = [];

    let formChildItems = [];

    let consortium_members = [];
    let warehouses = [];
    let purchase_orders = [];
    let purchase_order_items = [];

    let errors;

    let unsavedItemsDialog;

    let currentItem;
    let showConfirmation = false;

    async function add() {
        await formItem.validate();
        if (!$formItem.valid) {
            return;
        }

        if (!validateChildItems()) {
            return;
        }

        try {
            let params = {
                populate: [
                    "consortium_member",
                    "warehouse",
                    "stock_items",
                    "stock_items.purchase_order_item",
                    ,
                    "stock_items.purchase_order_item.item",
                    ,
                    "stock_items.purchase_order_item.purchase_order",
                ],
            };
            params = qs.stringify(params, {
                encodeValuesOnly: true,
            });

            let response = await put({
                path: "stocks/" + slug + "?" + params,
                data: {
                    data: {
                        warehouse: $warehouse.value,
                        consortium_member: $consortium_member.value.value,
                        date: $date.value,
                    },
                },
            });

            console.log("Add Stock Request  ", response);

            if (response.data?.id) {
                toast.push("Stock Edited Successfully!", {
                    duration: 20000,
                    theme: {
                        "--toastBackground": "#48BB78",
                        "--toastBarBackground": "#2F855A",
                    },
                });

                createActivityLog(
                    "Stock",
                    response.data,
                    "Edit",
                    response.data.id
                );

                saveItems(response.data);
            }
        } catch (e) {
            console.log("Error Add Stock   ", e);

            errors = e.error?.details.errors;

            toast.push("Stock Could Not Be Edited! \n\n" + e.error.message, {
                duration: 20000,
                theme: {
                    "--toastBackground": "#bb4848",
                    "--toastBarBackground": "#852f2f",
                },
            });
        }
    }

    async function saveItems(stock) {
        try {
            let params = {
                populate: [
                    "stock",
                    "stock.consortium_member",
                    "purchase_order_item",
                    "purchase_order_item.item",
                    "purchase_order_item.purchase_order",
                ],
            };
            params = qs.stringify(params, {
                encodeValuesOnly: true,
            });

            let response;

            formChildItems.forEach(async (element) => {
                if (element.createdAt) {
                    response = await put({
                        path: "stock-items/" + element.id + "?" + params,
                        data: {
                            data: {
                                has_expiry: element.has_expiry,
                                expiry_date: element.expiry_date,
                                stock: stock.id,
                                purchase_order_item:
                                    element.purchase_order_item.value,
                                received: element.received,
                                remark: element.remark,
                            },
                        },
                    });

                    console.log("Edit Stock Items ", response);

                    if (response.data) {
                        createActivityLog(
                            "Stock Item",
                            response.data,
                            "Edit",
                            response.data.id
                        );
                    }
                } else {
                    response = await post({
                        path: "stock-items?" + params,
                        data: {
                            data: {
                                stock: stock.id,
                                purchase_order_item:
                                    element.purchase_order_item.value,
                                received: element.received,
                                remark: element.remark,
                            },
                        },
                    });

                    console.log("Save Stock Items ", response);

                    if (response.data) {
                        createActivityLog(
                            "Stock Item",
                            response.data,
                            "Create",
                            response.data.id
                        );
                    }
                }
            });

            goto("stocks");
        } catch (e) {
            console.log("Error Stock Items ", e);
        }
    }

    function validateChildItems() {
        formChildItems.forEach((element) => {
            if (
                checkInput(element.purchase_order) &&
                checkInput(element.purchase_order_item) &&
                checkInput(element.quantity) &&
                checkInput(element.unitPrice) &&
                checkInput(element.received) &&
                checkInput(element.currency)
            ) {
                if (element.remaining < element.formQuantity) {
                    element.error =
                        "<b class='has-text-danger'> Received amount exceeds Purchase order Quantity </b>";
                } else {
                    element.error = null;
                }
            } else {
                element.error =
                    "<b> Required field/s are missing </b> <br> " +
                    (checkInput(element.purchase_order)
                        ? ""
                        : " Purchase Order ") +
                    (checkInput(element.purchase_order_item)
                        ? ""
                        : " Purchase Order Item") +
                    (checkInput(element.quantity) ? "" : " Quantity ") +
                    (checkInput(element.unitPrice) ? "" : " Unit Price ") +
                    (checkInput(element.currency) ? "" : " Currency ") +
                    (checkInput(element.received) ? "" : " Received ");
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

    function addChildItem() {
        formChildItems = [
            ...formChildItems,
            {
                purchase_order: "",
                purchase_order_item: "",
                purchase_order_items: "",
                currency: "",
                unit: "",
                quantity: "",
                unitPrice: "",
                received: "",
                remark: "",
                showHistory: false,
                has_expiry: false,
                expiry_date: new Date(Date.now()),

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

        formChildItems[index].purchase_order_items = purchase_order_items.map(
            (x) => {
                return {
                    value: x.id,
                    label:
                        x.attributes.item.data.attributes.name +
                        "-" +
                        "PO ITEM ID - " +
                        x.id +
                        " - " +
                        x.attributes.item.data.attributes.category +
                        "  - UNIT - " +
                        x.attributes.item.data.attributes.unit +
                        " - PCS (" +
                        x.attributes.item.data.attributes.pieces +
                        ")",
                    data: x,
                };
            }
        );
    }

    async function deleteItem() {
        showConfirmation = false;

        try {
            let response = await del("stock-items/" + currentItem.id, null);

            console.log("Delete Stock Item Request  ", response);

            if (response.data?.id) {
                toast.push("Stock Item Deleted Successfully!", {
                    duration: 20000,
                    theme: {
                        "--toastBackground": "#48BB78",
                        "--toastBarBackground": "#2F855A",
                    },
                });

                createActivityLog(
                    "Stock Item",
                    currentItem,
                    "Delete",
                    currentItem.id
                );

                getItem();
            }
        } catch (e) {
            console.log("Error Delete Stock Item  ", e);
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

            consortium_members = response.data.map((x) => {
                return {
                    value: x.id,
                    label: x.attributes.name,
                    data: x,
                };
            });
        } catch (e) {
            console.log("Error Get Consortium Members ", e);
        }
    }

    async function getWarehouses() {
        try {
            let params = {
                "pagination[limit]": -1,
            };
            params = qs.stringify(params, {
                encodeValuesOnly: true,
            });

            let response = await get("warehouses", params);

            console.log("Get Warehouses ", response);

            warehouses = response.data;
        } catch (e) {
            console.log("Error Get Warehouses ", e);
        }
    }

    async function getPurchaseOrders(event) {
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
                filters: {
                    consortium_member: {
                        id: {
                            $in: [$consortium_member.value.value],
                        },
                    },
                },
                "pagination[limit]": -1,
            };
            params = qs.stringify(params, {
                encodeValuesOnly: true,
            });
            let response = await get("purchase-orders", params);

            console.log("Get Purchase Orders ", response);

            purchase_orders = response.data.map((x) => {
                return {
                    value: x.id,
                    label:
                        "PO# - " +
                        x.attributes.poNumber +
                        "  ------- Date   " +
                        x.attributes.date +
                        "    ID    " +
                        x.id,
                    data: x,
                };
            });

            formChildItems.forEach((element) => {
                getPurchaseOrderItems(
                    { detail: element.purchase_order },
                    element
                );
                getRemaining({ detail: element.purchase_order_item }, element);
            });
        } catch (e) {
            console.log("Error Purchase Orders ", e);
        }
    }

    async function getPurchaseOrderItems(event, childItem) {
        if (event.detail?.value && purchase_orders?.length > 0) {
            purchase_order_items = purchase_orders.filter(
                (x) => x.value == event.detail.value
            )[0]?.data?.attributes.purchase_order_items?.data;

            if (purchase_order_items) {
                let index = formChildItems.findIndex(
                    (x) => x.id == childItem.id
                );
                formChildItems[index].purchase_order_items =
                    purchase_order_items.map((x) => {
                        return {
                            value: x.id,
                            label:
                                x.attributes.item.data.attributes.name +
                                "-" +
                                "PO ITEM ID - " +
                                x.id +
                                " - " +
                                x.attributes.item.data.attributes.category +
                                "  - UNIT - " +
                                x.attributes.item.data.attributes.unit +
                                " - PCS (" +
                                x.attributes.item.data.attributes.pieces +
                                ")",
                            data: x,
                        };
                    });
            }
        }
    }

    async function getRemaining(event, childItem) {
        console.log("Get Remaining ", event);
        if (event.detail?.data) {
            try {
                let params = {
                    populate: [
                        "stock",
                        "stock.consortium_member",
                        "stock.warehouse",
                        "purchase_order_item",
                        "purchase_order_item.item",
                    ],
                    filters: {
                        $and: [
                            {
                                purchase_order_item: {
                                    id: {
                                        $in: [event.detail.data.id],
                                    },
                                },
                            },
                            {
                                $not: {
                                    stock: {
                                        id: {
                                            $in: slug,
                                        },
                                    },
                                },
                            },
                        ],
                    },
                    "pagination[limit]": -1,
                };
                params = qs.stringify(params, {
                    encodeValuesOnly: true,
                });
                let response = await get("stock-items", params);

                console.log("Get Stock Items ", response);

                let stocks = 0;
                stock_items = response.data.filter(
                    (x) => x.attributes.stock.data
                );
                stock_items.forEach((element) => {
                    stocks += parseInt(element.attributes.received);
                });

                let index = formChildItems.findIndex(
                    (x) => x.id == childItem.id
                );
                console.log(
                    parseInt(event.detail.data.attributes.quantity) - stocks
                );

                formChildItems[index].remaining =
                    parseInt(event.detail.data.attributes.quantity) - stocks;

                formChildItems[index].stock_items = stock_items;
                formChildItems[index].purchase_order_item = event.detail;
                formChildItems[index].quantity =
                    event.detail.data.attributes.quantity;
                formChildItems[index].currency =
                    event.detail.data.attributes.currency;
                formChildItems[index].unit = event.detail.data.attributes.item
                    ?.data?.attributes.unit
                    ? event.detail.data.attributes.item?.data?.attributes.unit
                    : "-";
                formChildItems[index].unitPrice =
                    event.detail.data.attributes.unitPrice;

                formChildItems = formChildItems;

                return;
            } catch (e) {
                console.log("Error Stock Items ", e);
            }
        }
    }

    function refreshRemaining(event) {
        let temp = 0;
        formChildItems
            .filter((x) => event.detail.data.id == x.purchase_order_item?.value)
            .forEach((element) => {
                temp += parseFloat(element.received);
            });

        formChildItems.forEach((element) => {
            if(element.purchase_order_item?.value == event.detail.data.id)
                element.formQuantity = temp;
        });

        formChildItems = formChildItems;

        console.log("Refresh Remaining ", formChildItems);
    }

    async function getItem() {
        try {
            let params = {
                populate: {
                    consortium_member: {
                        populate: "*",
                    },
                    warehouse: {
                        populate: "*",
                    },
                    stock_items: {
                        populate: [
                            "purchase_order_item",
                            "purchase_order_item.item",
                            "purchase_order_item.purchase_order",
                        ],
                    },
                },
            };
            params = qs.stringify(params, {
                encodeValuesOnly: true,
            });

            let response = await get("stocks/" + slug, params);

            console.log("Get Stock by ID ", response);

            warehouse.set(response.data.attributes.warehouse.data?.id);
            consortium_member.set({
                value: response.data.attributes.consortium_member.data?.id,
                label: response.data.attributes.consortium_member.data
                    ?.attributes.name,
            });
            date.set(new Date(response.data.attributes.date));

            formChildItems = response.data.attributes.stock_items.data.map(
                (x) => {
                    return {
                        id: x.id,
                        purchase_order: {
                            value: x.attributes.purchase_order_item.data
                                ?.attributes.purchase_order.data.id,
                            label: x.attributes.purchase_order_item.data
                                ?.attributes.purchase_order.data.attributes
                                .poNumber,
                            data: x.attributes.purchase_order_item.data
                                ?.attributes.purchase_order.data,
                        },
                        purchase_order_item: {
                            value: x.attributes.purchase_order_item.data?.id,
                            label: x.attributes.purchase_order_item.data
                                ?.attributes.item.data.attributes.name,
                            data: x.attributes.purchase_order_item.data,
                        },
                        purchase_order_items: [],
                        currency:
                            x.attributes.purchase_order_item.data?.attributes
                                .currency,
                        unit: x.attributes.purchase_order_item.data?.attributes
                            .item.data.attributes.unit,
                        quantity:
                            x.attributes.purchase_order_item.data?.attributes
                                .quantity,
                        unitPrice:
                            x.attributes.purchase_order_item.data?.attributes
                                .unitPrice,
                        received: x.attributes.received,
                        has_expiry: x.attributes.has_expiry,
                        expiry_date: new Date(x.attributes.expiry_date),
                        remark: x.attributes.remark,
                        showHistory: false,

                        createdAt: x.attributes.createdAt,
                    };
                }
            );
        } catch (e) {
            console.log("Error get Stock by ID ", e);
        }
    }

    $: if (slug) {
        getConsortiumMembers();
        getWarehouses();
        getItem();
    }
</script>

<svelte:head>
    <title>Edit Stock</title>
</svelte:head>

<br /><br />
<div class="container px-6">
    <a
        href="stocks"
        on:click|preventDefault={() => (unsavedItemsDialog = true)}
        class="has-text-dark"
        ><span class="icon is-small"><Icon data={faAngleLeft} /></span> Back</a
    >
    <br /><br />
    <div class="card px-6">
        <br /><br />
        <div class="columns">
            <div class="column">
                <h3 class="my-0">Edit Stock</h3>
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
                        <label for="" class="gray">Warehouse</label><br />
                        <div class="control select is-fullwidth">
                            <select
                                required
                                name="category"
                                bind:value={$warehouse.value}
                            >
                                {#each warehouses as c}
                                    <option value={c.id}
                                        >{c.attributes.name}</option
                                    >
                                {/each}
                            </select>
                        </div>
                        {#if $formItem.hasError("warehouse.required")}
                            <p class="help is-danger">Warehouse is required</p>
                        {/if}
                    </div>
                </div>

                <div class="column">
                    <div class="field">
                        <label for="" class="gray">Consortium Member (*)</label>
                        <div class="control">
                            <Select
                                items={consortium_members}
                                on:select={getPurchaseOrders}
                                bind:value={$consortium_member.value}
                                listAutoWidth={true}
                            />
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
                    <h4 class="my-0">Stock Items</h4>
                </div>
                <div class="column has-text-right">
                    <button
                        disabled={!$formItem.valid && !$formItem.dirty}
                        on:click|preventDefault={addChildItem}
                        class="button is-success"
                    >
                        <span class="icon">
                            <Icon data={faPlus} />
                        </span>
                        <span class="has-text-white has-text-weight-bold"
                            >Add a Stock Item</span
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
                <div class="column  is-narrow" style="width: 90px;">
                    <label for="" class="gray">PO #</label>
                </div>
                <div class="column  is-narrow" style="width: 150px;">
                    <label for="" class="gray">Item (*)</label>
                </div>
                <div class="column">
                    <label for="" class="gray">Currency</label>
                </div>
                <div class="column">
                    <label for="" class="gray">Quantity</label>
                </div>
                <div class="column">
                    <label for="" class="gray">Unit Price</label>
                </div>
                <div class="column">
                    <label for="" class="gray">Received</label>
                </div>
                <div class="column">
                    <label for="" class="gray">Remaining</label>
                </div>
                <div class="column">
                    <span class="has-text-weight-bold">Total</span>
                </div>
                <div class="column">
                    <label for="" class="gray">Remark</label>
                </div>
                <div
                    class="column is-narrow has-text-weight-bold"
                    style="width: 40px;"
                />
                <div
                    class="column is-narrow has-text-weight-bold"
                    style="width: 40px;"
                />
                <div
                    class="column is-narrow has-text-weight-bold"
                    style="width: 40px;"
                />
            </div>

            {#each formChildItems as childItem, index}
                <div class="columns child-item">
                    <div class="column is-narrow" style="width: 50px;">
                        <input
                            type="text"
                            class="input has-background-light border-radius-0 "
                            disabled
                            value={index + 1}
                        />
                    </div>
                    <div class="column is-narrow" style="width: 90px;">
                        <div class="field">
                            <div class="control">
                                <Select
                                    items={purchase_orders}
                                    on:select={(event) =>
                                        getPurchaseOrderItems(event, childItem)}
                                    bind:value={childItem.purchase_order}
                                    listAutoWidth={true}
                                />
                            </div>
                        </div>
                    </div>
                    <div class="column is-narrow" style="width: 150px;">
                        <div class="field">
                            <div class="control">
                                <Select
                                    on:select={(event) =>
                                        getRemaining(event, childItem)}
                                    on:clear={() => {
                                        formChildItems[
                                            index
                                        ].purchase_order_item = "";
                                        formChildItems[index].stock_items =
                                            null;
                                        formChildItems = formChildItems;
                                    }}
                                    items={childItem.purchase_order_items}
                                    value={childItem.purchase_order_item}
                                />
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <input
                            type="text"
                            class="input has-background-light border-radius-0 "
                            disabled
                            value={childItem.currency
                                ? childItem.currency
                                : "-"}
                        />
                    </div>
                    <div class="column">
                        <input
                            type="text"
                            class="input has-background-light border-radius-0 "
                            disabled
                            value={childItem.quantity
                                ? childItem.quantity
                                : "-"}
                        />
                    </div>
                    <div class="column">
                        <input
                            type="text"
                            class="input has-background-light border-radius-0 "
                            disabled
                            value={childItem.quantity
                                ? childItem.unitPrice
                                : "-"}
                        />
                    </div>
                    <div class="column">
                        <input
                            type="number"
                            min="0"
                            on:input={checkValue}
                            placeholder="Received"
                            class="input border-radius-0 "
                            class:is-danger={childItem.remaining -
                                (childItem.received != ""
                                    ? childItem.received
                                    : 0) <
                                0}
                            on:change={() =>
                                refreshRemaining({
                                    detail: childItem.purchase_order_item,
                                })}
                            bind:value={childItem.received}
                        />
                    </div>
                    <div class="column">
                        <input
                            type="text"
                            class="input has-background-light border-radius-0 "
                            disabled
                            value={childItem.remaining
                                ? childItem.remaining
                                : "-"}
                        />
                    </div>

                    <div class="column">
                        <input
                            type="text"
                            class="input has-background-light border-radius-0 "
                            disabled
                            value={childItem.received
                                ? numberWithCommas(
                                      childItem.received * childItem.quantity
                                  )
                                : "-"}
                        />
                    </div>
                    <div class="column">
                        <input
                            rows="1"
                            class="input has-background-light border-radius-0 "
                            bind:value={childItem.remark}
                        />
                    </div>

                    <div
                        class="column is-narrow has-text-weight-bold input"
                        style="width: 40px;"
                    >
                        <!-- <button class="button is-info is-light ml-2"> <Icon data={faEdit}/></button> -->
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
                    <div
                        class="column is-narrow has-text-weight-bold input"
                        style="width: 40px;"
                    >
                        <button
                            type="button"
                            on:click={() =>
                                (childItem.showHistory =
                                    !childItem.showHistory)}
                            class="button is-info"
                        >
                            <Icon data={faHistory} /></button
                        >
                    </div>
                    <div
                        class="column is-narrow has-text-weight-bold input"
                        style="width: 40px;"
                    >
                        <button
                            type="button"
                            on:click={() =>
                                (childItem.showExpiryForm =
                                    !childItem.showExpiryForm)}
                            class="button is-info"
                        >
                            <Icon data={faCalendarAlt} /></button
                        >
                    </div>
                </div>
                <div class="columns" class:is-hidden={!childItem.showHistory}>
                    <div class="column mx-2 p-4 has-background-light">
                        <br />

                        {#if childItem.stock_items?.length > 0}
                            <h6>
                                <Icon data={faHistory} />

                                <span class="mx-4"> Stock History </span>
                            </h6>
                            <hr />
                            {#each stock_items as s}
                                <div
                                    class="columns has-text-weight-bold is-size-8"
                                >
                                    <div class="column is-narrow">
                                        {s.attributes.stock.data.id}
                                    </div>
                                    <div class="column">
                                        {s.attributes.stock.data.attributes
                                            .date}
                                    </div>
                                    <div class="column">
                                        {s.attributes.stock.data.attributes
                                            .consortium_member?.data.attributes
                                            .name}
                                    </div>
                                    <div class="column">
                                        {s.attributes.stock.data.attributes
                                            .warehouse?.data.attributes.name}
                                    </div>
                                </div>
                                <div class="columns">
                                    <div class="column is-narrow gray">
                                        {s.id}
                                    </div>

                                    <div class="column is-3">
                                        <span class=""
                                            >{s.attributes.purchase_order_item
                                                ?.data?.attributes.item?.data
                                                ?.attributes.name} - ({s
                                                .attributes.purchase_order_item
                                                ?.data?.id})</span
                                        >
                                        <br />
                                        <span class="gray"
                                            >{s.attributes.purchase_order_item
                                                ?.data?.attributes.item?.data
                                                ?.attributes.category}</span
                                        >
                                    </div>

                                    <div class="column has-text-centered">
                                        <span class="is-small tag">Unit</span>
                                        <br />
                                        {s.attributes.purchase_order_item?.data
                                            ?.attributes.item?.data?.attributes
                                            .unit}
                                    </div>

                                    <div class="column has-text-centered">
                                        <span class="is-small tag">Pieces</span>
                                        <br />
                                        {s.attributes.purchase_order_item?.data
                                            ?.attributes.item?.data?.attributes
                                            .pieces}
                                    </div>

                                    <div class="column has-text-centered">
                                        <span class="is-small tag"
                                            >Quantity</span
                                        > <br />
                                        {s.attributes.purchase_order_item?.data
                                            ?.attributes.quantity}
                                    </div>

                                    <div class="column has-text-centered">
                                        <span class="is-small tag"
                                            >Unit Price</span
                                        > <br />
                                        {s.attributes.purchase_order_item?.data
                                            ?.attributes.unitPrice}
                                    </div>

                                    <div class="column has-text-centered">
                                        <span class="is-small tag"
                                            >Currency</span
                                        > <br />
                                        {s.attributes.purchase_order_item?.data
                                            ?.attributes.currency}
                                    </div>

                                    <div class="column has-text-centered">
                                        <span class="is-small tag"
                                            >Received</span
                                        > <br />
                                        {s.attributes.received}
                                    </div>
                                    <div class="column has-text-centered">
                                        <span class="is-small tag">Remark</span>
                                        <br />
                                        {s.attributes.remark}
                                    </div>
                                </div>
                                <hr />
                            {/each}
                        {:else if childItem.stock_items?.length == 0}
                            <br /><br />
                            <p class="has-text-centered">
                                No stock history found
                            </p>
                            <br /><br />
                        {:else}
                            <br /><br />
                            <p class="has-text-centered">Choose an Item</p>
                            <br /><br />
                        {/if}
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

                {#if childItem.showExpiryForm}
                    <div class="columns px-3 has-background-light p-4">
                        <div class="column">
                            <h6>Expiry Date Form</h6>
                            <label class="checkbox">
                                <input
                                    bind:checked={childItem.has_expiry}
                                    type="checkbox"
                                />
                                Item Has Expiry Date
                            </label>
                        </div>
                        <div class="column">
                            <label for="">Expiry Date</label>
                            <DateInput
                                bind:value={childItem.expiry_date}
                                format="yyyy/MM/dd"
                                placeholder="2000/31/12"
                                closeOnSelection={true}
                                min={new Date("1920/1/1")}
                                class="input"
                            />
                        </div>
                    </div>
                {/if}
            {/each}
        </form>

        <br /><br />
    </div>
</div>
<br /><br /><br /><br /><br /><br /><br /><br />
{#if showConfirmation}
    <DeleteConfirmation
        on:confirm={deleteItem}
        on:dismiss={() => (showConfirmation = false)}
    />
{/if}

{#if unsavedItemsDialog}
    <UnsavedConfirmation
        on:confirm={() => goto("stocks")}
        on:dismiss={() => (unsavedItemsDialog = false)}
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
        height: 28px !important;
        /* background-color: #f5f5f5!important; */
    }
    :global(.selectContainer) {
        height: 28px !important;
    }

    :global(.selectContainer .listContainer .listItem) {
        font-size: 14px;
        border-radius: 0px;
    }

    :global(.button.is-success svg *, .button.is-danger svg *, .button.is-info
            svg
            *) {
        color: white;
    }
</style>
