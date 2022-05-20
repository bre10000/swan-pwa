<script>
    import { form, field } from "svelte-forms";
    import { required } from "svelte-forms/validators";
    import { get, post } from "../../lib/api";
    import { goto } from "@sapper/app";
    import { toast } from "@zerodevx/svelte-toast";
    import Icon from "svelte-awesome/components/Icon.svelte";
    import qs from "qs";
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
    import { createActivityLog } from "../../utils/activity/log";

    const consortium_member = field("consortium_member", "", [required()]);
    const date = field("date", new Date(), [required()]);

    const formItem = form(consortium_member, date);

    const purchase_order = field("purchase_order", null, [required()]);
    const purchase_order_item = field("purchase_order_item", null, [required()]);
    const quantity = field("quantity", "", [required()]);

    let remark = "";
    let remaining = 0;
    let stock_items = [];
    let stock_release_items = [];

    const formChildItem = form(
        purchase_order,
        purchase_order_item,
        quantity
    );

    let childItems = [];

    let consortium_members = [];
    let purchase_orders = [];
    let purchase_order_items = [];


    let errors;

    async function add() {
        await formItem.validate();
        if (!$formItem.valid) {
            return;
        }

        try {
            let response = await post({
                path: "stock-releases?populate=%2A",
                data: {
                    data: {
                        consortium_member: $consortium_member.value.value,
                        date: $date.value,
                    },
                },
            });

            console.log("Add Stock Release Request  ", response);

            if (response.data?.id) {
                toast.push("Stock Release Added Successfully!", {
                    duration: 20000,
                    theme: {
                        "--toastBackground": "#48BB78",
                        "--toastBarBackground": "#2F855A",
                    },
                });
                createActivityLog(
                    "Stock Release",
                    response.data,
                    "Create",
                    response.data.id
                );

                saveItems(response.data);
            }
        } catch (e) {
            console.log("Error Add Stock Release   ", e);

            errors = e.error.details.errors;

            toast.push("Stock Release Could Not Be Added! \n\n" + e.error.message, {
                duration: 20000,
                theme: {
                    "--toastBackground": "#bb4848",
                    "--toastBarBackground": "#852f2f",
                },
            });
        }
    }

    async function saveItems(stock_release) {
        try {
            childItems.forEach(async (element) => {
                let response = await post({
                    path: "stock-release-items?populate=%2A",
                    data: {
                        data: {
                            stock_release: stock_release.id,
                            purchase_order_item: element.purchase_order_item.value,
                            quantity: element.quantity,
                            remark: element.remark
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
            });

            goto("stock-releases");
        } catch (e) {
            console.log("Error Stock Release Items ", e);
        }
    }

    async function addItem() {
        await formChildItem.validate();
        if (!$formChildItem.valid || remaining - $quantity.value < 0) {
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
                quantity: $quantity.value,
                remark: remark,
            },
        ];

        formChildItem.reset();
        remark = "";
        stock_items = [];
        stock_release_items = [];
        remaining = 0;

        console.log(childItems);

        toast.push("Stock Release Item Added Successfully!", {
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

    

    async function getPurchaseOrders(event) {
        purchase_order.set("");
        purchase_order_item.set("");
        remaining = 0;
        stock_items = [];
        stock_release_items = [];

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

            remaining =  stocks;

            getRemainingStockReleases(event);

            return;
        } catch (e) {
            console.log("Error Stock Items ", e);
        }


        }
        remaining = 0;
    }


    async function getRemainingStockReleases(event) {
        if(event.detail?.data) {
            

            try {
            let params = {
                populate: ['stock_release', 'stock_release.consortium_member' ,'purchase_order_item', 'purchase_order_item.item'],
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
            let response = await get("stock-release-items", params);

            console.log("Get Stock Release Items ", response);

            let stocks = 0;
            stock_release_items = response.data;
            response.data.forEach(element => {
                stocks += parseInt(element.attributes.quantity);
            });

            remaining =  remaining - stocks;

            return;
        } catch (e) {
            console.log("Error Stock Release Items ", e);
        }


        }
        remaining = 0;
    }


    

    onMount(() => {
        getConsortiumMembers();
    });
</script>

<svelte:head>
    <title>Add Stock Release</title>
</svelte:head>

<br /><br />
<div class="container px-6">
    <a href="stock-releases" class="has-text-dark"
        ><span class="icon is-small"><Icon data={faAngleLeft} /></span> Back</a
    >
    <br /><br />

    <div class="card px-6">
        <br /><br />
        <div class="columns">
            <div class="column">
                <h3 class="my-0">Add Stock Release</h3>
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
                <div class="column has-text-centered">
                    <div class="tag is-rounded is-small">PO#</div>
                    <br />
                    {child.po_no}
                </div>
                <div class="column is-3">
                    {child.purchase_order_item.label} <br />
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
                        Quantity
                    </div>
                    <br />
                    {numberWithCommas(child.quantity)}
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
                    <h4 class="my-0">Stock Release Items</h4>
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
                            >Add a Stock Release Item</span
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
                    <label for="" class="gray">Quantity</label><br />
                    <input
                        type="number"
                        placeholder="Unit Price"
                        class="input"
                        class:is-danger= {
                            remaining - $quantity.value < 0
                        }
                        bind:value={$quantity.value}
                    />
                    {#if $formChildItem.hasError("quantity.required")}
                        <p class="help is-danger">Quantity is required</p>
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
                    <span class="has-text-weight-bold">Amount In Stock- </span>
                    {numberWithCommas(remaining)}
                    <br>
                    <span class="has-text-weight-bold">Differnece - </span>
                    {numberWithCommas(remaining - $quantity.value)}
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



            {#if stock_release_items}
            <h5>Stock Release History</h5>
            <hr />
                {#each stock_release_items as s}
                <div class="columns has-text-weight-bold">
                    <div class="column is-narrow">
                        {s.attributes.stock_release.data.id}
                    </div>
                    <div class="column">
                        {s.attributes.stock_release.data.attributes.date}
                    </div>
                    <div class="column">
                        {s.attributes.stock_release.data.attributes.consortium_member?.data.attributes.name}
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
                                    >Quantity</span
                                > <br />
                                {s.attributes.quantity}
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
        width: 100% !important;
        /* z-index: 10; */
    }
    :global(.selectContainer input) {
        overflow-x: auto !important;
    }
    :global(.selectContainer .listContainer .listItem) {
        font-size: 14px;
    }

    :global(.button.is-success svg *, .button.is-danger svg *) {
        color: white;
    }
</style>
