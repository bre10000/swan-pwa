<script context="module">
    export async function preload(params) {
        return { slug: parseInt(params.params.slug) };
    }
</script>

<script>
    import { get } from "../../../../lib/api";
    import { faAngleLeft,
faSave, faPrint } from "@fortawesome/free-solid-svg-icons";
    import Icon from "svelte-awesome/components/Icon.svelte";
    import qs from "qs";
    import { numberWithCommas } from "../../../../lib";

    export let slug;

    let stock;

    function getTotal(items) {
        let total = 0;

        items.forEach((element) => {
            total += element.attributes.purchase_order_item.data?.attributes.unitPrice *  element.attributes.received;
        });

        return total;
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

            stock = response.data;
        } catch (e) {
            console.log("Error get Stock by ID ", e);
        }
    }

    $: if (slug) {
        getItem();
    }
</script>

<svelte:head>
    <title>Print Stock - {slug} - {new Date()}</title>
</svelte:head>

<br class="hide-print" /><br class="hide-print" />
<div class="container">
    <a href="stocks" class="has-text-dark hide-print"
        ><span class="icon is-small"><Icon data={faAngleLeft} /></span> Back</a
    >
    <br class="hide-print" /><br class="hide-print" />
    <div class="card px-6 hide-print">
        <br class="hide-print" /><br class="hide-print" />
        <div class="columns">
            <div class="column">
                <h3 class="my-0 is-size-5 has-text-weight-bold">
                    Print Stock
                </h3>
            </div>

            <div class="column has-text-right">
                <button
                    on:click={() => {
                        window.print();
                    }}
                    class="button is-dark px-5 py-2 has-text-weight-bold"
                >
                    <span class="icon">
                        <Icon data={faPrint} />
                    </span>
                    <span class="has-text-white has-text-weight-bold"
                        >Print</span
                    >
                </button>
            </div>
        </div>

        <br />
    </div>

    <br class="hide-print" /><br class="hide-print" />

    {#if stock}
        <div class="card p-6">
            <br />

            <div class="columns">
                <div class="column is-narrow mr-5">
                    <img src="./images/logo/swan_consortium.svg" width="150" alt="SWAN Humaniterian Consortium">
                </div>
                <div class="column is-flex is-align-items-center">
                    <h3 class="is-size-5">
                        <span class="has-text-weight-bold"
                            >{stock.attributes.consortium_member.data?.attributes.name}:</span
                        >
                        Truck Driver Receive Order for SWAN Warehouse
                    </h3>
                </div>
            </div>

            
            <hr />

            <div class="columns">
                <div class="column">
                    <div class="card" style="width: 400px;">
                        <div class="card-header">
                            <p class="card-header-title">Consortium Member</p>
                        </div>
                        <div class="card-body p-4">
                            <div class="columns">
                                <div class="column gray">Company Name</div>
                                <div class="column">
                                    <p>
                                        {stock.attributes.consortium_member
                                            .data?.attributes.name}
                                    </p>
                                </div>
                            </div>
        
                            <div class="columns">
                                <div class="column gray">Address</div>
                                <div class="column">
                                    <p>
                                        {stock.attributes.consortium_member
                                            .data?.attributes.address_1}
                                    </p>
                                    <p>
                                        {stock.attributes.consortium_member
                                            .data?.attributes.address_2}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="column has-text-right">
                    <h5 class="has-text-weight-bold">Stock No - {stock.id}</h5>
                    <p>{stock.attributes.date}</p>
                    <h5 class="has-text-weight-bold">Warehouse - {stock.attributes.warehouse.data?.attributes.name}</h5>
                </div>
            </div>

            <p class="card-header-title">Items</p>

            <table class="table is-bordered is-fullwidth is-narrow">
                <tr class="has-background-black has-text-white">
                    <th class="has-text-white">S/N</th>
                    <th class="has-text-white">Item Description</th>
                    <th class="has-text-white">Purchase Order No.</th>
                    <th class="has-text-white">PO Quantity</th>
                    <th class="has-text-white">Currency</th>
                    <th class="has-text-white">Quantity Received</th>                    
                    <th class="has-text-white">Unit Price</th>
                    <th class="has-text-white">Total Price</th>
                    <th class="has-text-white">Remark</th>
                </tr>

                {#each stock.attributes.stock_items.data as item, index}
                    <tr>
                        <td>{index + 1}</td>
                        <td
                            >{item.attributes.purchase_order_item.data?.attributes.item.data?.attributes.name} - {item.attributes.purchase_order_item.data?.attributes.item.data?.attributes.category}</td
                        >
                        <td>{item.attributes.purchase_order_item.data?.attributes.purchase_order.data?.attributes.poNumber}</td>
                        <td>{numberWithCommas(item.attributes.purchase_order_item.data?.attributes.quantity)}</td>
                        <td>{item.attributes.purchase_order_item.data?.attributes.currency}</td>
                        <td>{numberWithCommas(item.attributes.received)}</td>
                        
                        <td>{numberWithCommas(item.attributes.purchase_order_item.data?.attributes.unitPrice)}</td>
                        <td
                            >{numberWithCommas(
                                item.attributes.purchase_order_item.data?.attributes.unitPrice *
                                item.attributes.received
                            )}</td
                        >
                        <td
                            >{item.attributes.remark}</td
                        >
                    </tr>
                {/each}

                <tr class="">
                    <th>Total</th>
                    <th />
                    <th />
                    <th />
                    <th />
                    <th />
                    <th />
                    
                    <th
                        >{numberWithCommas(
                            getTotal(
                                stock.attributes.stock_items
                                    .data
                            )
                        )}</th
                    >
                    <th />
                </tr>
            </table>

            <br /><br />

            <p class="has-text-centered is-size-8">
                Delivering Organ Name _________________________________________________________________
            </p>

            <br><br>
            <p class="has-text-centered is-size-8">
                Driver's Name _____________ Plate No. ____________________ Delivery Date ______________________ Signature _______________________
            </p>

            <br><br>
            <p class="has-text-centered is-size-8">
                Swan Warehouse Officer Name ____________________________________ Receive Date _________________ Signature ______________________
            </p>

            <br /><br />
        </div>
    {/if}
</div>

<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

<style>
    .card {
        overflow: visible !important;
    }

    .card .card {
        box-shadow: none !important;
        border: 0.5px solid gray;
    }

    :global(.button.is-success svg *, .button.is-dark svg *, .button.is-info
            svg
            *) {
        color: white;
    }

    @media print {
        :global(body, #content, #sapper) {
            height: auto !important;
        }
        :global(#sapper) {
            transform: scale(0.80);
            transform-origin: top center;
        }

        .card {
            box-shadow: none !important;
        }
        .hide-print {
            display: none !important;
        }
        .card.p-6 {
            padding: 1rem !important;
        }
        .is-size-8 {
            font-size: 10px;
        }
    }
</style>
