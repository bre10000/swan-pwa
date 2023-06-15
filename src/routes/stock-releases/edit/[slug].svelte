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

    const consortium_member = field("consortium_member", "", [required()]);
    const date = field("date", new Date(), [required()]);

    let formItem = form(consortium_member, date);

    let remark = "";
    let remaining = 0;
    let stock_items = [];
    let stock_release_items = [];

    let formChildItems = [];

    let childItems = [];
    let childItemsExisting = [];

    let consortium_members = [];
    let warehouses = [];
    let purchase_orders = [];
    let purchase_order_items = [];

    let errors;

    let currentItem;
    let showConfirmation = false;

    let unsavedItemsDialog;

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
                    "stock_release_items",
                    "stock_release_items.purchase_order_item",
                    ,
                    "stock_release_items.purchase_order_item.item",
                    ,
                    "stock_release_items.purchase_order_item.purchase_order",
                ],
            };
            params = qs.stringify(params, {
                encodeValuesOnly: true,
            });

            let response = await put({
                path: "stock-releases/" + slug + "?" + params,
                data: {
                    data: {
                        consortium_member: $consortium_member.value.value,
                        date: $date.value,
                    },
                },
            });

            console.log("Add Stock Release Request  ", response);

            if (response.data?.id) {
                toast.push("Stock Release Edited Successfully!", {
                    duration: 20000,
                    theme: {
                        "--toastBackground": "#48BB78",
                        "--toastBarBackground": "#2F855A",
                    },
                });

                createActivityLog(
                    "Stock Release",
                    response.data,
                    "Edit",
                    response.data.id
                );

                saveItems(response.data);
            }
        } catch (e) {
            console.log("Error Add Stock Release   ", e);

            errors = e.error?.details.errors;

            toast.push(
                "Stock Release Could Not Be Edited! \n\n" + e.error?.message,
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

    async function saveItems(stock_release) {
        console.log("saveItems", { stock_release });
        try {
            let params = {
                populate: [
                    "stock_release",
                    "stock_release.consortium_member",
                    "stock_release.warehouse",
                    "purchase_order_item",
                    "purchase_order_item.item",
                    "stock_item",
                    "stock_item.stock",
                    "purchase_order_item.purchase_order",
                ],
            };
            params = qs.stringify(params, {
                encodeValuesOnly: true,
            });
            formChildItems.forEach(async (element) => {
                if (element.createdAt) {
                    let response = await put({
                        path:
                            "stock-release-items/" + element.id + "?" + params,
                        data: {
                            data: {
                                stock_release: stock_release.id,
                                purchase_order_item:
                                    element.stock_item.data.attributes
                                        .purchase_order_item.data.id,
                                stock_item: element.stock_item.value,
                                quantity: element.quantity,
                                remark: element.remark,
                            },
                        },
                    });

                    console.log("Edit Stock Release Items ", response);

                    if (response.data) {
                        createActivityLog(
                            "Stock Release Item",
                            response.data,
                            "Edit",
                            response.data.id
                        );
                    }
                } else {
                    let response = await post({
                        path: "stock-release-items?" + params,
                        data: {
                            data: {
                                stock_release: stock_release.id,
                                purchase_order_item:
                                    element.stock_item.data.attributes
                                        .purchase_order_item.data.id,
                                stock_item: element.stock_item.value,
                                quantity: element.quantity,
                                remark: element.remark,
                            },
                        },
                    });

                    console.log("Save Stock Release Items ", response);

                    if (response.data) {
                        createActivityLog(
                            "Stock Release Item",
                            response.data,
                            "Create",
                            response.data.id
                        );
                    }
                }
            });

            goto("stock-releases");
        } catch (e) {
            console.log("Error Stock Release Items ", e);
        }
    }

    function validateChildItems() {
        formChildItems.forEach((element) => {
            if (
                checkInput(element.purchase_order) &&
                checkInput(element.stock) &&
                checkInput(element.quantity) &&
                checkInput(element.stock_item) &&
                checkInput(element.currency)
            ) {
                if (element.balance < element.formQuantity) {
                    element.error =
                        "<b class='has-text-danger'> Stock Release Item quantity exceeds stock balance </b>";
                } else {
                    element.error = null;
                }
            } else {
                element.error =
                    "<b> Required field/s are missing </b> <br> " +
                    (checkInput(element.purchase_order)
                        ? ""
                        : " Purchase Order ") +
                    (checkInput(element.stock) ? "" : " Purchase Order Item") +
                    (checkInput(element.stock_item) ? "" : " Batch #") +
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
                stocks: "",
                stock: "",
                stock_items: "",
                stock_item: "",
                currency: "",
                unit: "",
                unitPrice: "",
                balance: "",
                quantity: "",

                remark: "",
                showHistory: false,

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

        formChildItems.forEach((element) => {
            getBatchNumbers({ detail: element.purchase_order }, element);
            getStockItems({ detail: element.stock }, element);
            getRemaining({ detail: element.stock_item }, element);
        });
    }

    async function deleteItem() {
        showConfirmation = false;

        try {
            let response = await del(
                "stock-release-items/" + currentItem.id,
                null
            );

            console.log("Delete Stock Release Item Request  ", response);

            if (response.data?.id) {
                toast.push("Stock Release Item Deleted Successfully!", {
                    duration: 20000,
                    theme: {
                        "--toastBackground": "#48BB78",
                        "--toastBarBackground": "#2F855A",
                    },
                });

                createActivityLog(
                    "Stock Release Item",
                    currentItem,
                    "Delete",
                    currentItem.id
                );

                getItem();
            }
        } catch (e) {
            console.log("Error Delete Stock Release Item  ", e);
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

    async function getPurchaseOrders() {
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
                // filters: {
                //             consortium_member: {
                //                 id: {
                //                     $in: [$consortium_member.value.value],
                //                 },
                //             }
                // },
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
                        " - " +
                        x.attributes.consortium_member.data?.attributes.name +
                        "  ------- Date   " +
                        x.attributes.date +
                        "    ID    " +
                        x.id,
                    data: x,
                };
            });

            formChildItems.forEach((element) => {
                getBatchNumbers({ detail: element.purchase_order }, element);
                getStockItems({ detail: element.stock }, element);
                getRemaining({ detail: element.stock_item }, element);
            });
        } catch (e) {
            console.log("Error Purchase Orders ", e);
        }
    }

    async function getBatchNumbers(event, childItem) {
        try {
            let params = {
                populate: {
                    consortium_member: {
                        populate: "*",
                    },
                    stock_items: {
                        populate: [
                            "stock",
                            "stock.consortium_member",
                            "stock.warehouse",
                            "purchase_order_item",
                            "purchase_order_item.item",
                            "stock_release_items",
                            "stock_release_items.purchase_order_item",
                            "stock_release_items.purchase_order_item.item",
                            "stock_release_items.stock",
                            "stock_release_items.stock_release_items",
                            "stock_release_items.stock_release_items.purchase_order_item",
                            "stock_release_items.stock_release_items.purchase_order_item.item",
                            "stock_release_items.stock_release",
                            "stock_release_items.stock_release.consortium_member",
                        ],
                    },
                },
                filters: {
                    // consortium_member: {
                    //     id: {
                    //         $in: [$consortium_member.value.value],
                    //     },
                    // }
                    $and: [
                        {
                            stock_items: {
                                purchase_order_item: {
                                    purchase_order: {
                                        id: {
                                            $in: [event.detail?.value],
                                        },
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
            let response = await get("stocks", params);

            console.log("Get Stocks ", response);

            let index = formChildItems.findIndex((x) => x.id == childItem.id);
            formChildItems[index].purchase_order = event.detail;
            formChildItems[index].stocks = response.data.map((x) => {
                return {
                    value: x.id,
                    label:
                        "BATCH # - " +
                        x.id +
                        " - " +
                        x.attributes.consortium_member.data?.attributes.name +
                        "  -- DATE   " +
                        x.attributes.date,
                    data: x,
                };
            });
        } catch (e) {
            console.log("Error Stocks ", e);
        }
    }

    async function getStockItems(event, childItem) {
        if (event.detail?.value) {
            console.log(childItem.stocks);
            stock_items = childItem.stocks.filter(
                (x) => x.value == event.detail.value
            )[0]?.data?.attributes.stock_items?.data;

            let index = formChildItems.findIndex((x) => x.id == childItem.id);
            formChildItems[index].stock = event.detail;
            formChildItems[index].stock_items = stock_items.map((x) => {
                return {
                    value: x.id,
                    label:
                        x.attributes.purchase_order_item?.data?.attributes.item
                            ?.data.attributes.name +
                        "-" +
                        "PO ITEM ID - " +
                        x.id +
                        " - " +
                        x.attributes.purchase_order_item.data?.attributes.item
                            .data.attributes.category +
                        "  - UNIT - " +
                        x.attributes.purchase_order_item.data?.attributes.item
                            .data.attributes.unit +
                        " - PCS (" +
                        x.attributes.purchase_order_item.data?.attributes.item
                            .data.attributes.pieces +
                        ")",
                    data: x,
                };
            });
        }
    }

    async function getRemaining(event, childItem) {
        if (event.detail?.value) {
            let formIDs = formChildItems
                .filter((x) => x.createdAt)
                .map((x) => x.id);

            stock_release_items =
                event.detail?.data.attributes.stock_release_items?.data.filter(
                    (x) => formIDs.findIndex((y) => y == x.id) == -1
                );

            stock_items = [];

            if (
                childItem.stock.data?.attributes.stock_items?.data?.filter(
                    (x) => x.value == event.detail.id
                ).length > 0
            )
                stock_items = [
                    childItem.stock.data?.attributes.stock_items?.data?.filter(
                        (x) => x.value == event.detail.id
                    )[0],
                    ...stock_items,
                ];

            let index = formChildItems.findIndex((x) => x.id == childItem.id);
            formChildItems[index].stock_item = event.detail;

            let released = 0;
            let batchStock = 0;

            stock_release_items.forEach((element) => {
                released += parseFloat(element.attributes.quantity);
            });
            stock_items.forEach((element) => {
                batchStock += parseFloat(element.attributes.received);
            });
            formChildItems[index].stock_items_history = stock_items;
            formChildItems[index].stock_release_items_history =
                stock_release_items;

            console.log("City boyysss", stock_release_items);

            formChildItems[index].released = released;
            formChildItems[index].batchStock = batchStock;
            formChildItems[index].balance = batchStock - released;

            console.log(event.detail.data.attributes.purchase_order_item.data);
            let stock_item =
                event.detail.data.attributes.purchase_order_item.data;
            formChildItems[index].currency = stock_item?.attributes.currency;
            formChildItems[index].unitPrice = stock_item?.attributes.unitPrice;
            formChildItems[index].unit =
                stock_item?.attributes.item?.data?.attributes.unit;
            formChildItems[index].pieces =
                stock_item?.attributes.item?.data?.attributes.pieces;
        }
    }

    function refreshRemaining(event) {
        let temp = 0;
        formChildItems
            .filter((x) => event.detail.data.id == x.stock_item?.value)
            .forEach((element) => {
                temp += parseFloat(element.quantity);
            });

        formChildItems.forEach((element) => {
            if (event.detail.data.id == element.stock_item?.value)
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
                    stock_release_items: {
                        populate: [
                            "stock_item",
                            "stock_item.stock",
                            "stock_item.stock.stock_items",
                            "stock_item.stock.stock_items.stock",
                            "stock_item.stock.stock_items.stock.consortium_member",
                            "stock_item.stock.stock_items.stock.warehouse",
                            "stock_item.stock.stock_items.purchase_order_item",
                            "stock_item.stock.stock_items.purchase_order_item.item",
                            "stock_item.purchase_order_item",
                            "stock_item.purchase_order_item.item",
                            "stock_item.stock_release_items",
                            "stock_item.stock_release_items.purchase_order_item",
                            "stock_item.stock_release_items.purchase_order_item.item",
                            "stock_item.stock_release_items.stock_release",
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

            let response = await get("stock-releases/" + slug, params);

            console.log("Get Stock Release by ID ", response);

            consortium_member.set({
                value: response.data.attributes.consortium_member.data?.id,
                label: response.data.attributes.consortium_member.data
                    ?.attributes.name,
            });
            date.set(new Date(response.data.attributes.date));

            formChildItems =
                response.data.attributes.stock_release_items.data.map((x) => {
                    return {
                        id: x.id,
                        purchase_order: {
                            value: x.attributes.purchase_order_item.data
                                ?.attributes.purchase_order.data.id,
                            label:
                                "PO# - " +
                                x.attributes.purchase_order_item.data
                                    ?.attributes.purchase_order.data.attributes
                                    .poNumber,
                            data: x.attributes.purchase_order_item.data
                                ?.attributes.purchase_order.data,
                        },
                        stock: {
                            value: x.attributes.stock_item.data?.attributes
                                .stock.data?.id,
                            label:
                                "BATCH #" +
                                x.attributes.stock_item.data?.attributes.stock
                                    .data?.id,
                            data: x.attributes.stock_item.data?.attributes.stock
                                .data,
                        },
                        stocks: [
                            {
                                value: x.attributes.stock_item.data?.attributes
                                    .stock.data?.id,
                                label:
                                    "BATCH #" +
                                    x.attributes.stock_item.data?.attributes
                                        .stock.data?.id,
                                data: x.attributes.stock_item.data?.attributes
                                    .stock.data,
                            },
                        ],
                        stock_item: {
                            value: x.attributes.stock_item.data?.id,
                            label: x.attributes.stock_item?.data?.attributes
                                .purchase_order_item.data.attributes.item?.data
                                .attributes.name,
                            data: x.attributes.stock_item.data,
                        },
                        stock_items:
                            x.attributes.stock_item.data?.attributes.stock.data.attributes.stock_items.data?.map(
                                (y) => {
                                    return {
                                        value: y.id,
                                        label: y.attributes.purchase_order_item
                                            .data.attributes.item?.data
                                            .attributes.name,
                                        data: y,
                                    };
                                }
                            ),
                        currency:
                            x.attributes.purchase_order_item.data?.attributes
                                .currency,
                        unit: x.attributes.purchase_order_item.data?.attributes
                            .item.data.attributes.unit,
                        pieces: x.attributes.purchase_order_item.data
                            ?.attributes.item.data.attributes.pieces,
                        unitPrice:
                            x.attributes.purchase_order_item.data?.attributes
                                .unitPrice,
                        quantity: x.attributes.quantity,
                        remark: x.attributes.remark,
                        showHistory: false,

                        createdAt: x.attributes.createdAt,
                    };
                });

            getPurchaseOrders();
        } catch (e) {
            console.log("Error get Stock Release by ID ", e);
        }
    }

    $: if (slug) {
        getConsortiumMembers();

        getItem();
    }
</script>

<svelte:head>
    <title>Edit Stock Release</title>
</svelte:head>

<br /><br />
<div class="container px-6">
    <a
        href="stock-releases"
        on:click|preventDefault={() => (unsavedItemsDialog = true)}
        class="has-text-dark"
        ><span class="icon is-small"><Icon data={faAngleLeft} /></span> Back</a
    >
    <br /><br />
    <div class="card px-6">
        <br /><br />
        <div class="columns">
            <div class="column">
                <h3 class="my-0">Edit Stock Release</h3>
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
                        <label for="" class="gray">Consortium Member (*)</label>
                        <div class="control">
                            <Select
                                items={consortium_members}
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
            </div>

            <br />
        </form>

        <!-- svelte-ignore component-name-lowercase -->
        <form>
            <div class="columns">
                <div class="column">
                    <h4 class="my-0">Stock Release Items</h4>
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
                            >Add a Stock Release Item</span
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
                <div class="column  is-narrow" style="width: 100px;">
                    <label for="" class="gray">PO #</label>
                </div>
                <div class="column is-narrow" style="width: 100px;">
                    <label for="" class="gray">Batch Number</label>
                </div>
                <div class="column  is-narrow" style="width: 150px;">
                    <label for="" class="gray">Item (*)</label>
                </div>
                <div class="column">
                    <label for="" class="gray">Unit Price</label>
                </div>
                <div class="column">
                    <label for="" class="gray">Balance</label>
                </div>

                <div class="column">
                    <label for="" class="gray">Quantity</label>
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
                    <div class="column is-narrow" style="width: 100px;">
                        <div class="field">
                            <div class="control">
                                <Select
                                    items={purchase_orders}
                                    on:select={(event) =>
                                        getBatchNumbers(event, childItem)}
                                    value={childItem.purchase_order}
                                    listAutoWidth={true}
                                />
                            </div>
                        </div>
                    </div>

                    <div class="column is-narrow" style="width: 100px;">
                        <div class="field">
                            <div class="control">
                                <Select
                                    on:select={(event) =>
                                        getStockItems(event, childItem)}
                                    items={childItem.stocks}
                                    value={childItem.stock}
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
                                    items={childItem.stock_items}
                                    value={childItem.stock_item}
                                />
                            </div>
                        </div>
                    </div>

                    <div class="column">
                        <input
                            type="text"
                            class="input has-background-light border-radius-0 "
                            disabled
                            value={childItem.unitPrice
                                ? childItem.unitPrice
                                : "-"}
                        />
                    </div>

                    <div class="column">
                        <input
                            type="text"
                            class="input has-background-light border-radius-0 "
                            disabled
                            value={childItem.balance ? childItem.balance : "-"}
                        />
                    </div>

                    <div class="column">
                        <input
                            type="number"
                            min="0"
                            on:input={checkValue}
                            placeholder="Unit Price"
                            class="input"
                            on:change={() =>
                                refreshRemaining({
                                    detail: childItem.stock_item,
                                })}
                            class:is-danger={childItem.balance <
                                childItem.quantity}
                            bind:value={childItem.quantity}
                        />
                    </div>

                    <div class="column">
                        <input
                            type="text"
                            class="input has-background-light border-radius-0 "
                            disabled
                            value={childItem.quantity
                                ? numberWithCommas(
                                      childItem.quantity * childItem.unitPrice
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
                </div>

                <div class="columns" class:is-hidden={!childItem.showHistory}>
                    <div class="column mx-2 p-4 has-background-light">
                        <br />

                        {#if childItem.stock_items_history?.length > 0}
                            <h6>
                                <Icon data={faHistory} />

                                <span class="mx-4"> Stock History </span>
                            </h6>
                            <hr />
                            {#each childItem.stock_items_history as s}
                                <div
                                    class="columns has-text-weight-bold is-size-8"
                                >
                                    <div class="column is-narrow">
                                        {s.attributes.stock?.data.id}
                                    </div>
                                    <div class="column">
                                        {s.attributes.stock?.data.attributes
                                            .date}
                                    </div>
                                    <div class="column">
                                        {s.attributes.stock?.data.attributes
                                            .consortium_member?.data.attributes
                                            .name}
                                    </div>
                                    <div class="column">
                                        {s.attributes.stock?.data.attributes
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
                        {:else if childItem.stock_items_history?.length == 0}
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

                        <br />

                        {#if childItem.stock_release_items_history?.length > 0}
                            <h6>
                                <Icon data={faHistory} />

                                <span class="mx-4">
                                    Stock Release History
                                </span>
                            </h6>
                            <hr />
                            {#each childItem.stock_release_items_history as s}
                                <div class="columns is-size-8">
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
                                            .unit
                                            ? s.attributes.purchase_order_item
                                                  ?.data?.attributes.item?.data
                                                  ?.attributes.unit
                                            : "-"}
                                    </div>

                                    <div class="column has-text-centered">
                                        <span class="is-small tag">Pieces</span>
                                        <br />
                                        {s.attributes.purchase_order_item?.data
                                            ?.attributes.item?.data?.attributes
                                            .pieces
                                            ? s.attributes.purchase_order_item
                                                  ?.data?.attributes.item?.data
                                                  ?.attributes.pieces
                                            : "-"}
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
                                            >Quantity</span
                                        > <br />
                                        {s.attributes.quantity}
                                    </div>
                                    <div class="column has-text-centered">
                                        <span class="is-small tag">Remark</span>
                                        <br />
                                        {s.attributes.remark}
                                    </div>
                                </div>
                                <hr />
                            {/each}
                        {:else if childItem.stock_release_items_history?.length == 0}
                            <br /><br />
                            <p class="has-text-centered">
                                No stock release history found
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
            {/each}
        </form>
        <br /><br />
    </div>
</div>

<br /><br /><br /><br /><br />

{#if unsavedItemsDialog}
    <UnsavedConfirmation
        on:confirm={() => goto("stock-releases")}
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

    :global(.button.is-success svg *, .button.is-danger svg *) {
        color: white;
    }
</style>
