<script context="module">
    export async function preload(params) {
        return { slug: parseInt(params.params.slug) };
    }
</script>

<script>
    import { get } from "../../../../lib/api";
    import { faAngleLeft, faPrint } from "@fortawesome/free-solid-svg-icons";
    import Icon from "svelte-awesome/components/Icon.svelte";
    import qs from "qs";
    import { numberWithCommas } from "../../../../lib";

    export let slug;

    let stock;

    function getTotal(items) {
        let total = 0;

        items.forEach((element) => {
            total += element.attributes.purchase_order_item.data?.attributes.unitPrice *  element.attributes.quantity;
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
                    stock_release_items: {
                        populate: ['purchase_order_item', 'purchase_order_item.item' , 'purchase_order_item.purchase_order'],
                    },
                },
            };
            params = qs.stringify(params, {
                encodeValuesOnly: true,
            });

            let response = await get("stock-releases/" + slug, params);

            console.log("Get Stock Release by ID ", response);

            stock = response.data;
        } catch (e) {
            console.log("Error get Stock Release by ID ", e);
        }
    }

    $: if (slug) {
        getItem();
    }
</script>

<svelte:head>
    <title>Print Stock Release - {slug} - {new Date()}</title>
</svelte:head>

<br class="hide-print" /><br class="hide-print" />
<div class="container">
    <a href="stock-releases" class="has-text-dark hide-print"
        ><span class="icon is-small"><Icon data={faAngleLeft} /></span> Back</a
    >
    <br class="hide-print" /><br class="hide-print" />
    <div class="card px-6 hide-print">
        <br class="hide-print" /><br class="hide-print" />
        <div class="columns">
            <div class="column">
                <h3 class="my-0 is-size-5 has-text-weight-bold">
                    Print Stock Release
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
            <h3 class="has-text-centered has-text-weight-bold">
                {stock.attributes.consortium_member
                    .data?.attributes.name}
            </h3>
            <p class="has-text-centered">
                {stock.attributes.consortium_member
                    .data?.attributes.address_1} - {stock.attributes.consortium_member
                    .data?.attributes.address_2}
            </p>
            <p class="has-text-centered">
                {stock.attributes.consortium_member
                    .data?.attributes.website} - {stock.attributes.consortium_member
                    .data?.attributes.phone}
            </p>
            <hr>
            <h3 class="is-size-5">
                
                SRF No. - 
                <span class="has-text-weight-bold"
                    >{stock.id}</span
                >
            </h3>

            <div class="columns">
                <div class="column">
                    <div class="card" style="width: 400px;">
                        <div class="card-header">
                            <p class="card-header-title">Deliver</p>
                        </div>
                        <div class="card-body p-4">
                            <div class="columns">
                                <div class="column py-1 gray">To</div>
                                <div class="column py-1 ">
        
                                </div>
                            </div>
                            <div class="columns">
                                <div class="column  py-1  gray">Address</div>
                                <div class="column py-1 ">
        
                                </div>
                            </div>
                            <div class="columns">
                                <div class="column py-1  gray">Contact Name</div>
                                <div class="column py-1 ">
        
                                </div>
                            </div>
                            <div class="columns">
                                <div class="column py-1  gray">Tel</div>
                                <div class="column py-1 ">
        
                                </div>
                            </div>
        
                        </div>
                    </div>
                </div>

                
            </div>

            <p class="card-header-title">Items</p>

            <table class="table is-bordered is-fullwidth is-narrow">
                <tr class="has-background-black has-text-white">
                    <th class="has-text-white">Line Item No.</th>
                    <th class="has-text-white">Description of Goods</th>
                    <th class="has-text-white">Unit</th>
                    <th class="has-text-white">Quantity Requested</th>
                    <th class="has-text-white">Currency</th>                 
                    <th class="has-text-white">Unit Price</th>
                    <th class="has-text-white">Total</th>
                    <th class="has-text-white">Total QTY Supplied</th>
                    <th class="has-text-white">Waybill No.</th>
                </tr>

                {#each stock.attributes.stock_release_items.data as item, index}
                    <tr>
                        <td>{index + 1}</td>
                        <td
                            >{item.attributes.purchase_order_item.data?.attributes.item.data?.attributes.name} - {item.attributes.purchase_order_item.data?.attributes.item.data?.attributes.category}</td
                        >
                        <td>{item.attributes.purchase_order_item.data?.attributes.unit}</td>
                        <td>{item.attributes.quantity}</td>
                        <td>{item.attributes.purchase_order_item.data?.attributes.currency}</td>
                        
                        
                        <td>{numberWithCommas(item.attributes.purchase_order_item.data?.attributes.unitPrice)}</td>
                        <td
                            >{numberWithCommas(
                                item.attributes.purchase_order_item.data?.attributes.unitPrice *
                                item.attributes.quantity
                            )}</td
                        >
                        <td
                            ></td
                        >
                        <td
                            ></td
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
                    

                    <th
                        >{numberWithCommas(
                            getTotal(
                                stock.attributes.stock_release_items
                                    .data
                            )
                        )}</th
                    >
                    <th />
                    <th />
                </tr>
            </table>


                <div class="card px-4">
                    <div class="card-header">
                        <h4>Remark</h4>
                    </div>
                    <div class="card-body">
                        <br><br><br>
                    </div>
                </div>
                <br>

                <table class="table is-bordered is-fullwidth">
                    <tr >
                        <th rowspan="2">
                            Authorization
                        </th>
                        <th>Release of Goods authorised by</th>
                        <th>Goods released by</th>
                    </tr>
                    <tr>
                        <th>Programme Manager</th>
                        <th>Storekeeper/ Warehouse Officer:</th>
                    </tr>
                    <tr>
                        <td>Name</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Signature</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Date</td>
                        <td></td>
                        <td></td>
                    </tr>
                </table>

            <br><br>
            
        </div>
    {/if}
</div>

<br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

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
