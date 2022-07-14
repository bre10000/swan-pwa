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
    import { numberWithCommas, checkValue } from "../../../../lib";

    export let slug;

    let stock;

    function getTotal(items) {
        let total = 0;

        items.forEach((element) => {
            total +=
                element.attributes.stock_release_item.data?.attributes
                    .purchase_order_item.data?.attributes.unitPrice *
                element.attributes.stock_release_item.data?.attributes.quantity;
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
                    waybill_items: {
                        populate: [
                            "stock_release_item",
                            "stock_release_item.stock_release",
                            "stock_release_item.purchase_order_item",
                            "stock_release_item.purchase_order_item.item",
                            "stock_release_item.purchase_order_item.purchase_order",
                        ],
                    },
                },
            };
            params = qs.stringify(params, {
                encodeValuesOnly: true,
            });

            let response = await get("waybills/" + slug, params);

            console.log("Get Waybill by ID ", response);

            stock = response.data;
        } catch (e) {
            console.log("Error get Waybill by ID ", e);
        }
    }

    $: if (slug) {
        getItem();
    }
</script>

<svelte:head>
    <title>Print Waybill - {slug} - {new Date()}</title>
</svelte:head>

<br class="hide-print" /><br class="hide-print" />
<div class="container">
    <a href="waybills" class="has-text-dark hide-print"
        ><span class="icon is-small"><Icon data={faAngleLeft} /></span> Back</a
    >
    <br class="hide-print" /><br class="hide-print" />
    <div class="card px-6 hide-print">
        <br class="hide-print" /><br class="hide-print" />
        <div class="columns">
            <div class="column">
                <h3 class="my-0 is-size-5 has-text-weight-bold">
                    Print Waybill
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
            <div class="has-text-centered is-flex is-align-items-center">
                <img src="./images/logo/swan_consortium.svg" width="150" alt="SWAN Humaniterian Consortium" style="margin: 0 auto;">
            </div>
            <h2 class="has-text-centered has-text-weight-bold">
                SWAN Warehouse
            </h2>
            <h3 class="has-text-centered has-text-weight-bold">
                {stock.attributes.consortium_member.data?.attributes.name}
            </h3>
            <p class="has-text-centered">
                {stock.attributes.consortium_member.data?.attributes.address_1} -
                {stock.attributes.consortium_member.data?.attributes.address_2}
            </p>
            <p class="has-text-centered">
                {stock.attributes.consortium_member
                    .data?.attributes.website} - {stock.attributes.consortium_member
                    .data?.attributes.phone}
            </p>
            <hr />
            <h3 class="is-size-5">
                Waybill No. -
                <span class="has-text-weight-bold">{stock.id}</span>
            </h3>

            <div class="columns">
                <div class="column">
                    <div class="card" style="width: 350px;">
                        <div class="card-header">
                            <p class="card-header-title">From</p>
                        </div>
                        <div class="card-body p-4">
                            <div class="columns">
                                <div class="column py-1 gray">From</div>
                                <div class="column py-1 " />
                            </div>
                            <div class="columns">
                                <div class="column  py-1  gray">
                                    Date Raised
                                </div>
                                <div class="column py-1 " />
                            </div>
                            <div class="columns">
                                <div class="column py-1  gray">
                                    Sender's Email
                                </div>
                                <div class="column py-1 " />
                            </div>
                            <div class="columns">
                                <div class="column py-1  gray">
                                    Sender's Tel No.
                                </div>
                                <div class="column py-1 " />
                            </div>
                        </div>
                    </div>
                </div>


                <div class="column has-text-right">
                    <div class="card has-text-left" style="width: 350px; float:right;">
                        <div class="card-header">
                            <p class="card-header-title">To</p>
                        </div>
                        <div class="card-body p-4">
                            <div class="columns">
                                <div class="column py-1 gray">Cosignee</div>
                                <div class="column py-1 ">
                                    {stock.attributes.consigneeName}
                                </div>
                            </div>
                            <div class="columns">
                                <div class="column  py-1  gray">Address</div>
                                <div class="column py-1 ">
                                    {stock.attributes.consigneeAddress}
                                </div>
                            </div>
                            <div class="columns">
                                <div class="column py-1  gray">Phone</div>
                                <div class="column py-1 ">
                                    {stock.attributes.consigneePhone}
                                </div>
                            </div>
                            <div class="columns">
                                <div class="column py-1  gray">Email</div>
                                <div class="column py-1 ">
                                </div>
                            </div>
        
                        </div>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <p class="card-header-title">Transport Details</p>
                </div>
                <div class="card-body is-flex">
                    <div class="card p-4">
                        Transport Type: 
                        <span class="has-text-weight-bold">
                            {stock.attributes.driverTransportType}
                        </span>
                    </div>
                    <div class="card p-4">
                        Means of Transport: 
                        <span class="has-text-weight-bold">
                            {stock.attributes.transporterType}
                        </span>
                    </div>
                    <div class="card p-4">
                        Dates of Dispatch: 
                        <span class="has-text-weight-bold">
                            {stock.attributes.date}
                        </span>
                    </div>
                    <div class="card p-4">
                        ETD: 
                        <span class="has-text-weight-bold px-6">
                        </span>
                    </div>
                    <div class="card p-4">
                        ETA: 
                        <span class="has-text-weight-bold px-6">
                        </span>
                    </div>
                </div>
            </div>


            <table class="table is-bordered is-fullwidth is-responsive">
                <tr>
                    <th>Transporter Name</th>
                    <th>{stock.attributes.transporterName}</th>
                </tr>
                <tr>
                    <td>Transporter's Tel No.</td>
                    <td>{stock.attributes.transporterPhone}</td>
                </tr>
                <tr>
                    <td>Driver's Name</td>
                    <td>{stock.attributes.driverName}</td>
                </tr>
                <tr>
                    <td>Vehicle Registration No.</td>
                    <td>{stock.attributes.driverPlateNo}</td>
                </tr>
            </table>


            <p class="card-header-title">Items</p>

            <table class="table is-bordered is-fullwidth is-narrow">
                <tr class="has-background-black has-text-white">
                    <th class="has-text-white">No.</th>
                    <th class="has-text-white">Item Description</th>
                    <th class="has-text-white">Carton No.</th>
                    <th class="has-text-white">Unit</th>
                    <th class="has-text-white">Pack Type</th>
                    <th class="has-text-white">Quantity</th>
                    <th class="has-text-white">Unit Value</th>
                    <th class="has-text-white">Total Value</th>                    
                    <th class="has-text-white">Total Weight</th>
                    <th class="has-text-white">Total Volume</th>
                    <th class="has-text-white">Quantity Received</th>
                    <th class="has-text-white">Remark</th>
                </tr>

                {#each stock.attributes.waybill_items.data as item, index}
                    <tr>
                        <td>{index + 1}</td>
                        <td
                            >{item.attributes.stock_release_item.data
                                ?.attributes.purchase_order_item.data
                                ?.attributes.item.data?.attributes.name} - {item
                                .attributes.stock_release_item.data?.attributes
                                .purchase_order_item.data?.attributes.item.data
                                ?.attributes.category}</td
                        >
                        <td></td>
                        <td
                            >{item
                                .attributes.stock_release_item.data?.attributes
                                .purchase_order_item.data?.attributes.item.data
                                ?.attributes.unit ? item
                                .attributes.stock_release_item.data?.attributes
                                .purchase_order_item.data?.attributes.item.data
                                ?.attributes.unit : "-"}</td
                        >
                        <td
                            >{item
                                .attributes.stock_release_item.data?.attributes
                                .purchase_order_item.data?.attributes.item.data
                                ?.attributes.pieces ? item
                                .attributes.stock_release_item.data?.attributes
                                .purchase_order_item.data?.attributes.item.data
                                ?.attributes.pieces : "-"}</td
                        >
                        <td
                            >{item.attributes.stock_release_item.data
                                ?.attributes.quantity}</td
                        >
                        <td
                        >{numberWithCommas(item.attributes.stock_release_item.data
                            ?.attributes.purchase_order_item.data
                            ?.attributes.unitPrice)}</td
                    >
                        <td
                            >
                            {numberWithCommas(item.attributes.stock_release_item.data
                                ?.attributes.quantity * 
                                item.attributes.stock_release_item.data
                                ?.attributes.purchase_order_item.data
                                ?.attributes.unitPrice)}
                            
                            {item.attributes.stock_release_item.data
                                ?.attributes.purchase_order_item.data
                                ?.attributes.currency}</td
                        >

                        <td
                            ></td
                        >
                        <td
                            ></td
                        >
                        <td />
                        <td>
                            
                        </td>
                    </tr>
                {/each}
<!-- 
                <tr class="">
                    <th>Total</th>
                    <th />
                    <th />
                    <th />
                    <th />
                    <th />

                    <th
                        >{numberWithCommas(
                            getTotal(stock.attributes.waybill_items.data)
                        )}</th
                    >
                    <th />
                    <th />
                    <th />
                    <th />
                </tr> -->
            </table>

            <table class="table is-bordered is-full-width">
                <tr>
                    <th colspan="6" class="has-text-centered">
                        Total Weight(KGS) and Volume(CBM)
                    </th>
                </tr>
                <tr>
                    <th class="is-narrow"></th>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Signature</th>
                    <th>Date</th>
                    <th>Condition</th>
                </tr>
                <tr>
                    <td>Loaded by (SENDER):</td>
                    <td></td>
                    <td>Store Keeper</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>Transported By by (TRANSPORTER):</td>
                    <td></td>
                    <td>Driver</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>Received by (COSIGNEE):</td>
                    <td></td>
                    <td>Store Keeper</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td colspan="6">Consignee Comments: (Include all the details on any missing/ damaged items recived - Please be specific & State exact quantities)</td>
                    
                </tr>
            </table>
            <br />

            <p class="has-text-centered is-size-8">
                COPIES : 1 copy retained by Sender, 3 copies (including original) given to Transporter- 1 signed copy retained by Transporter, 1 signed copy retained by Consignee, the original signed copy returned to Sender by the Consignee . 
            </p>

            <br /><br />
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
            transform: scale(0.8);
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
