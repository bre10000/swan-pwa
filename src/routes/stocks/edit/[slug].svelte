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
        faEdit,
        faPlus,
        faTimes,
    } from "@fortawesome/free-solid-svg-icons";
    import Icon from "svelte-awesome/components/Icon.svelte";
    import { numberWithCommas } from "../../../lib";
    import Select from "svelte-select";
    import { DateInput } from "date-picker-svelte";
    import qs from "qs";
    import DeleteConfirmation from "../../../widgets/modals/DeleteConfirmation.svelte";
import { createActivityLog } from "../../../utils/activity/log";

    export let slug;

    const warehouse = field("warehouse", "", [required()]);
    const consortium_member = field("consortium_member", "", [required()]);
    const date = field("date", new Date(), [required()]);

    const formItem = form(warehouse, consortium_member, date);

    const purchase_order = field("purchase_order", null, [required()]);
    const purchase_order_item = field("purchase_order_item", null, [required()]);
    const received = field("received", "", [required()]);

    let remark = "";
    let remaining = 0;
    let stock_items = [];

    const formChildItem = form(
        purchase_order,
        purchase_order_item,
        received
    );

    let childItems = [];
    let childItemsExisting = [];

    let consortium_members = [];
    let warehouses = [];
    let purchase_orders = [];
    let purchase_order_items = [];


    let errors;

    let currentItem;
    let showConfirmation = false;

    async function add() {
        await formItem.validate();
        if (!$formItem.valid) {
            return;
        }

        try {
            let response = await put({
                path: "stocks/" + slug + "?populate=%2A",
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

                createActivityLog("Stock", response.data, "Edit", response.data.id)

                saveItems(response.data);
            }
        } catch (e) {
            console.log("Error Add Stock   ", e);

            errors = e.error?.details.errors;

            toast.push(
                "Stock Could Not Be Edited! \n\n" + e.error.message,
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

    async function saveItems(stock) {
        try {
            childItems.forEach(async (element) => {
                let response = await post({
                    path: "stock-items?populate=%2A",
                    data: {
                        data: {
                            stock: stock.id,
                            purchase_order_item: element.purchase_order_item.value,
                            received: element.received,
                            remark: element.remark
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
            });

            goto("stocks");
        } catch (e) {
            console.log("Error Stock Items ", e);
        }
    }

    async function addItem() {
        await formChildItem.validate();
        if (!$formChildItem.valid || remaining - $received.value < 0) {
            return;
        }

        console.log("Add Item ", $purchase_order_item.value)

        childItems = [
            ...childItems,
            {
                index: childItems.length,
                purchase_order_item: $purchase_order_item.value,
                po_no: $purchase_order.value.data?.attributes.poNumber,
                unit: $purchase_order_item.value.data?.attributes.unit,
                pieces: $purchase_order_item.value.data?.attributes.pieces,
                currency: $purchase_order_item.value.data?.attributes.currency,
                quantity: $purchase_order_item.value.data?.attributes.quantity,
                unitPrice: $purchase_order_item.value.data?.attributes.unitPrice,
                received: $received.value,
                remark: remark,
            },
        ];

        formChildItem.reset();
        remark = "";
        stock_items = [];
        remaining = 0;

        console.log(childItems);

        toast.push("Stock Item Added Successfully!", {
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
    function removeChildItemExisting(child) {
        currentItem = child;
        showConfirmation = true;
    }

    async function deleteItem() {
        showConfirmation = false;

        try {
            let response = await del(
                "stock-items/" + currentItem.id,
                null
            );

            console.log("Delete Stock Item Request  ", response);

            if (response.data?.id) {
                toast.push("Stock Item Deleted Successfully!", {
                    duration: 20000,
                    theme: {
                        "--toastBackground": "#48BB78",
                        "--toastBarBackground": "#2F855A",
                    },
                });

                createActivityLog("Stock Item", currentItem, "Delete", currentItem.id)

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
                    label:
                        x.attributes.name,
                    data: x
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
        purchase_order.set("");
        purchase_order_item.set("");
        remaining = 0;
        stock_items = [];

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
                            }
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
                        "PO# - " +x.attributes.poNumber +
                        "  ------- Date   " +
                        x.attributes.date +
                        "    ID    " +
                        x.id,
                    data: x
                };
            });
        } catch (e) {
            console.log("Error Purchase Orders ", e);
        }
    }

    async function getPurchaseOrderItems(event) {
        if(event.detail?.value) {
            console.log( purchase_orders.filter( x => x.value == event.detail.value)[0].data?.attributes.purchase_order_items.data)
            purchase_order_items = purchase_orders.filter( x => x.value == event.detail.value)[0].data?.attributes.purchase_order_items.data;

            purchase_order_items = purchase_order_items.map((x) => {
                return {
                    value: x.id,
                    label:
                        x.attributes.item.data.attributes.name + '-'+  x.attributes.item.data.attributes.category +
                        "  --- Unit - " +
                        x.attributes.unit + " - Pieces - " +  x.attributes.pieces + " - Quantity - " +  x.attributes.quantity + " - Unit Price - " +  x.attributes.unitPrice + " - Currency - " + x.attributes.currency +
                        "    ID    " +
                        x.id,
                        data: x
                };
            });

            
        }
    }

    async function getRemaining(event) {
        if(event.detail?.data) {
            

            try {
            let params = {
                populate: ['stock', 'stock.consortium_member', 'stock.warehouse' ,'purchase_order_item', 'purchase_order_item.item'],
                filters: {
                            purchase_order_item: {
                                id: {
                                    $in: [event.detail.data.id],
                                },
                            }
                },
                "pagination[limit]": -1,
            };
            params = qs.stringify(params, {
                encodeValuesOnly: true,
            });
            let response = await get("stock-items", params);

            console.log("Get Stock Items ", response);

            let stocks = 0;
            stock_items = response.data;
            response.data.forEach(element => {
                stocks += parseInt(element.attributes.received);
            });

            remaining =  parseInt(event.detail.data.attributes.quantity) - stocks;

            return;
        } catch (e) {
            console.log("Error Stock Items ", e);
        }


            

        }
        remaining = 0;
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
                        populate: ['purchase_order_item', 'purchase_order_item.item' , 'purchase_order_item.purchase_order'],
                    },
                },
            };
            params = qs.stringify(params, {
                encodeValuesOnly: true,
            });

            let response = await get("stocks/" + slug, params);

            console.log("Get Stock by ID ", response);

            warehouse.set(response.data.attributes.warehouse.data?.id);
            consortium_member.set(
                {
                    value: response.data.attributes.consortium_member.data?.id,
                    label: response.data.attributes.consortium_member.data?.attributes.name
                }
            );
            date.set(new Date(response.data.attributes.date));

            childItemsExisting =
                response.data.attributes.stock_items.data;
        } catch (e) {
            console.log("Error get Stock by ID ", e);
        }
    }

    $: if (slug) {
        getItem();
        getConsortiumMembers();
        getWarehouses();
    }
</script>

<svelte:head>
    <title>Edit Stock</title>
</svelte:head>

<br /><br />
<div class="container px-6">
    <a href="stocks" class="has-text-dark"
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
                        <p class="help is-danger">
                            Warehouse is required
                        </p>
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
                        <p class="help is-danger">Consortium Member is required</p>
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

        <h5>Existing Items</h5>
        <hr />
        {#each childItemsExisting as child}
            <div class="columns">
                <div class="column is-narrow">
                    <div class="tag is-rounded has-text-weight-bold is-large">
                        {child.id}
                    </div>
                </div>
                <div class="column has-text-centered">
                    <div class="tag is-rounded is-small">PO#</div>
                    <br />
                    {child.attributes.purchase_order_item.data?.attributes.purchase_order.data?.attributes.poNumber}
                </div>
                <div class="column is-3">
                    {child.attributes.purchase_order_item.data?.attributes.item?.data?.attributes.name} <br />
                    <span class="gray is-size-7">{child.attributes.remark}</span
                    >
                </div>
                <div class="column has-text-centered">
                    <div class="tag is-rounded is-small">Unit</div>
                    <br />
                    {child.attributes.purchase_order_item.data?.attributes.unit}
                </div>
                <div class="column has-text-centered">
                    <div class="tag is-rounded is-small">Pieces</div>
                    <br />
                    {child.attributes.purchase_order_item.data?.attributes.pieces}
                </div>
                <div class="column has-text-centered">
                    <div class="tag is-rounded is-small">Quantity</div>
                    <br />
                    {numberWithCommas(child.attributes.purchase_order_item.data?.attributes.quantity)}
                </div>
                <div class="column has-text-centered">
                    <div class="tag is-rounded is-small">Currency</div>
                    <br />
                    {child.attributes.purchase_order_item.data?.attributes.currency}
                </div>
                <div class="column has-text-centered">
                    <div class="tag is-rounded is-small">Unit Price</div>
                    <br />
                    {numberWithCommas(child.attributes.purchase_order_item.data?.attributes.unitPrice)}
                </div>
                <div class="column has-text-centered">
                    <div class="tag is-rounded is-small">
                        Total
                    </div>
                    <br />
                    {numberWithCommas(
                        child.attributes.purchase_order_item.data?.attributes.unitPrice * child.attributes.purchase_order_item.data?.attributes.quantity
                    )}
                </div>
                <div class="column has-text-centered">
                    <div class="tag is-rounded is-small has-text-weight-bold">
                        Received
                    </div>
                    <br />
                    {numberWithCommas(
                        child.attributes.received
                    )}
                </div>
                <div class="column has-text-right is-flex">
                    <a
                        href="stocks/edit-item/{child.id}"
                        class="button is-info"
                    >
                        <span class="icon">
                            <Icon data={faEdit} />
                        </span>
                    </a>
                    <button
                        on:click={() => removeChildItemExisting(child)}
                        class="button is-danger ml-2"
                    >
                        <span class="icon">
                            <Icon data={faTimes} />
                        </span>
                    </button>
                </div>
            </div>
            <hr />
        {/each}

        <h5>New Items</h5>
        <hr />
        {#each childItems as child, index}
            <div class="columns">
                <div class="column is-narrow">
                    <div class="tag is-rounded has-text-weight-bold is-large">
                        {index + 1}
                    </div>
                </div>
                <div class="column is-3">
                    {child.purchase_order_item.label} <br />
                    <span class="gray is-size-7">{child.remark}</span>
                </div>
                <div class="column has-text-centered">
                    <div class="tag is-rounded is-small">PO#</div>
                    <br />
                    {child.po_no}
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
                    <div class="tag is-rounded is-small">
                        Total
                    </div>
                    <br />
                    {numberWithCommas(child.unitPrice * child.quantity)}
                </div>

                <div class="column has-text-centered">
                    <div class="tag is-rounded is-small has-text-weight-bold">
                        Received
                    </div>
                    <br />
                    {numberWithCommas(child.received)}
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
                    <h4 class="my-0">Stock Items</h4>
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
                            >Add a Stock Item</span
                        >
                    </button>
                </div>
            </div>

            <div class="columns">
                <div class="column">
                    <div class="field">
                        <label for="" class="gray">Purchase Order (*)</label>
                        <div class="control">
                            <Select
                                items={purchase_orders}
                                on:select={getPurchaseOrderItems}
                                bind:value={$purchase_order.value}
                                listAutoWidth={true}
                            />
                        </div>
                        {#if $formChildItem.hasError("purchase_order.required")}
                            <p class="help is-danger">Purchase Order is required</p>
                        {/if}
                    </div>
                </div>
               
            </div>

            <div class="columns">
                <div class="column">
                    <div class="field">
                        <label for="" class="gray">Item (*)</label>
                        <div class="control">
                            <Select
                                on:select={getRemaining}
                                items={purchase_order_items}
                                bind:value={$purchase_order_item.value}
                            />
                        </div>
                        {#if $formChildItem.hasError("purchase_order_item.required")}
                            <p class="help is-danger">Purchase Order Item is required</p>
                        {/if}
                    </div>
                </div>
            </div>

            <div class="columns">
                <div class="column">
                    <label for="" class="gray">Received</label><br />
                    <input
                        type="number"
                        placeholder="Unit Price"
                        class="input"
                        class:is-danger= {
                            remaining - $received.value < 0
                        }
                        bind:value={$received.value}
                    />
                    {#if $formChildItem.hasError("received.required")}
                        <p class="help is-danger">Received is required</p>
                    {/if}
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
                 <div class="column has-text-right">
                    <br />
                    <span class="has-text-weight-bold">Remaining Amount - </span>
                    {numberWithCommas(remaining)}
                    <br>
                    <span class="has-text-weight-bold">Differnece - </span>
                    {numberWithCommas(remaining - $received.value)}
                </div>
            </div>

            {#if stock_items}
            <h5>Stock History</h5>
            <hr />
                {#each stock_items as s}
                <div class="columns has-text-weight-bold">
                    <div class="column is-narrow">
                        {s.attributes.stock.data.id}
                    </div>
                    <div class="column">
                        {s.attributes.stock.data.attributes.date}
                    </div>
                    <div class="column">
                        {s.attributes.stock.data.attributes.consortium_member?.data.attributes.name}
                    </div>
                    <div class="column">
                        {s.attributes.stock.data.attributes.warehouse?.data.attributes.name}
                    </div>
                </div>
                <div class="columns">
                            <div
                                class="column is-narrow gray"
                            >
                                {s.id}
                            </div>
                        
                            <div class="column is-3">
                                <span
                                    class=""
                                    >{s.attributes
                                        .purchase_order_item
                                        ?.data
                                        ?.attributes.item?.data?.attributes
                                        .name}  - ({s.attributes
                                        .purchase_order_item
                                        ?.data
                                        ?.id})</span
                                >
                                <br />
                                <span class="gray"
                                    >{s.attributes
                                        .purchase_order_item
                                        ?.data
                                        ?.attributes.item?.data?.attributes
                                        .category}</span
                                >

                            </div>
                        
                            <div
                                class="column has-text-centered"
                            >
                                <span
                                    class="is-small tag"
                                    >Unit</span
                                > <br />
                                {s.attributes
                                    .purchase_order_item
                                    ?.data?.attributes.unit}
                            </div>

                            <div
                                class="column has-text-centered"
                            >
                                <span
                                    class="is-small tag"
                                    >Pieces</span
                                > <br />
                                {s.attributes
                                    .purchase_order_item
                                    ?.data?.attributes.pieces}
                            </div>

                            <div
                                class="column has-text-centered"
                            >
                                <span
                                    class="is-small tag"
                                    >Quantity</span
                                > <br />
                                {s.attributes
                                    .purchase_order_item
                                    ?.data?.attributes.quantity}
                            </div>

                            <div
                                class="column has-text-centered"
                            >
                                <span
                                    class="is-small tag"
                                    >Unit Price</span
                                > <br />
                                {s.attributes
                                    .purchase_order_item
                                    ?.data?.attributes.unitPrice}
                            </div>

                            <div
                                class="column has-text-centered"
                            >
                                <span
                                    class="is-small tag"
                                    >Currency</span
                                > <br />
                                {s.attributes
                                    .purchase_order_item
                                    ?.data?.attributes.currency}
                            </div>
                        
                            <div
                                class="column has-text-centered"
                            >
                                <span
                                    class="is-small tag"
                                    >Received</span
                                > <br />
                                {s.attributes.received}
                            </div>
                            <div
                                class="column has-text-centered"
                            >
                                <span
                                    class="is-small tag"
                                    >Remark</span
                                > <br />
                                {s.attributes.remark}
                            </div>


                </div>
                <hr>
                {/each}
            {/if}
        </form>

        <br /><br />
    </div>
</div>

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
        width: 200% !important;
        z-index: 10;
    }
    :global(.selectContainer .listContainer .listItem) {
        font-size: 14px;
    }

    :global(.button.is-success svg *, .button.is-danger svg *, .button.is-info
            svg
            *) {
        color: white;
    }
</style>
