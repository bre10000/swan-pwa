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
    let stockId;

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

    let consortium_members = [];
    let warehouses = [];
    let purchase_orders = [];
    let purchase_order_items = [];


    let errors;


    async function add() {
        await formChildItem.validate();
        if (!$formChildItem.valid || remaining - $received.value < 0) {
            return;
        }

        try {
            let response = await put({
                path: "stock-items/" + slug + "?populate=%2A",
                data: {
                    data: {
                        purchase_order_item: $purchase_order_item.value.value,
                        received: $received.value,
                        remark: remark
                    },
                },
            });

            console.log("Edit Stock Item Request  ", response);

            if (response.data?.id) {
                toast.push("Stock Item Edited Successfully!", {
                    duration: 20000,
                    theme: {
                        "--toastBackground": "#48BB78",
                        "--toastBarBackground": "#2F855A",
                    },
                });

                createActivityLog("Stock Item", response.data, "Edit", response.data.id)

                goto("stocks/edit/" + stockId)
            }
        } catch (e) {
            console.log("Error Edit Stock Item   ", e);

            errors = e.error?.details.errors;

            toast.push(
                "Stock Item Could Not Be Edited! \n\n" + e.error?.message,
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


    async function getPurchaseOrders(consortium) {
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
                                    $in: [consortium],
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
        if(event.detail?.value && purchase_orders.length > 0) {
            console.log( purchase_orders)
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
                console.log(element.id != slug)
                if(element.id != slug)
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
                populate: ['stock', 'stock.consortium_member', 'stock.warehouse' ,'purchase_order_item', 'purchase_order_item.item', 'purchase_order_item.purchase_order']
            };
            params = qs.stringify(params, {
                encodeValuesOnly: true,
            });

            let response = await get("stock-items/" + slug, params);

            console.log("Get Stock Item by ID ", response);

            getPurchaseOrders(response.data?.attributes.stock.data?.attributes.consortium_member.data?.id)

            purchase_order.set({
                value: response.data.attributes.purchase_order_item.data.attributes.purchase_order.data?.id,
                    label:
                        "PO# - " + response.data.attributes.purchase_order_item.data.attributes.purchase_order.data?.attributes.poNumber +
                        "  ------- Date   " +
                        response.data.attributes.purchase_order_item.data.attributes.purchase_order.data?.attributes.date +
                        "    ID    " +
                        response.data.attributes.purchase_order_item.data.attributes.purchase_order.data?.id,
                    data: response.data.attributes.purchase_order_item.data.attributes.purchase_order.data
            })

            purchase_order_item.set({
                value: response.data.attributes.purchase_order_item.data.id,
                    label:
                        response.data.attributes.purchase_order_item.data?.attributes.item.data.attributes.name + '-'+  response.data.attributes.purchase_order_item.data?.attributes.item.data.attributes.category +
                        "  --- Unit - " +
                        response.data.attributes.purchase_order_item.data?.attributes.unit + " - Pieces - " +  response.data.attributes.purchase_order_item.data?.attributes.pieces + " - Quantity - " +  response.data.attributes.purchase_order_item.data?.attributes.quantity + " - Unit Price - " +  response.data.attributes.purchase_order_item.data?.attributes.unitPrice + " - Currency - " + response.data.attributes.purchase_order_item.data?.attributes.currency +
                        "    ID    " +
                        response.data.attributes.purchase_order_item.data?.id,
                        data: response.data.attributes.purchase_order_item.data
            });

            

            received.set(response.data.attributes.received);
            
            remark = response.data.attributes.remark;

            stockId = response.data?.attributes.stock?.data?.id;
            
        } catch (e) {
            console.log("Error get Stock Item Item by ID ", e);
        }
    }

    $: if (slug) {
        getItem();
    }
</script>

<svelte:head>
    <title>Edit Stock Item</title>
</svelte:head>

<br /><br />
<div class="container px-6">
    <a href="stocks/edit/{stockId}" class="has-text-dark"
        ><span class="icon is-small"><Icon data={faAngleLeft} /></span> Back</a
    >
    <br /><br />
    <div class="card px-6">
        <br /><br />
        <div class="columns">
            <div class="column">
                <h3 class="my-0">Edit Stock Item</h3>
                <p class="gray py-0">Complete the form below and click save.</p>
            </div>
            <div class="column has-text-right">
                <button
                    disabled={!$formChildItem.valid || !$formChildItem.dirty}
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

    :global(.selectContainer .listContainer .listItem) {
        font-size: 14px;
    }

    :global(.button.is-success svg *, .button.is-danger svg *, .button.is-info
            svg
            *) {
        color: white;
    }
</style>
