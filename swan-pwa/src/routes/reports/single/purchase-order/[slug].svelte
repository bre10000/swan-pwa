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

    let purchase_order;

    function getTotal(items) {
        let total = 0;

        items.forEach((element) => {
            total += element.attributes.unitPrice * element.attributes.quantity;
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

            purchase_order = response.data;
        } catch (e) {
            console.log("Error get Purchase Order by ID ", e);
        }
    }

    $: if (slug) {
        getItem();
    }
</script>

<svelte:head>
    <title>Print Purchase Order - {slug} - {new Date()}</title>
</svelte:head>

<br class="hide-print" /><br class="hide-print" />
<div class="container">
    <a href="purchase-orders" class="has-text-dark hide-print"
        ><span class="icon is-small"><Icon data={faAngleLeft} /></span> Back</a
    >
    <br class="hide-print" /><br class="hide-print" />
    <div class="card px-6 hide-print">
        <br class="hide-print" /><br class="hide-print" />
        <div class="columns">
            <div class="column">
                <h3 class="my-0 is-size-5 has-text-weight-bold">
                    Print Purchase Order
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

    {#if purchase_order}
        <div class="card p-6">
            <br />

            <h3 class="is-size-5">
                PO No:
                <span class="has-text-weight-bold"
                    >{purchase_order.attributes.poNumber}</span
                >
            </h3>
            <hr />

            <div class="card" style="width: 400px;">
                <div class="card-header">
                    <p class="card-header-title">Consortium Member</p>
                </div>
                <div class="card-body p-4">
                    <div class="columns">
                        <div class="column gray">Company Name</div>
                        <div class="column">
                            <p>
                                {purchase_order.attributes.consortium_member
                                    .data?.attributes.name}
                            </p>
                        </div>
                    </div>

                    <div class="columns">
                        <div class="column gray">Address</div>
                        <div class="column">
                            <p>
                                {purchase_order.attributes.consortium_member
                                    .data?.attributes.address_1}
                            </p>
                            <p>
                                {purchase_order.attributes.consortium_member
                                    .data?.attributes.address_2}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <p class="card-header-title">Items</p>

            <table class="table is-bordered is-fullwidth">
                <tr class="has-background-black has-text-white">
                    <th class="has-text-white">Line Item No.</th>
                    <th class="has-text-white">Description of Goods/Service</th>
                    <th class="has-text-white">Unit Form</th>
                    <th class="has-text-white">Quantity Required</th>
                    <th class="has-text-white">Currency</th>
                    <th class="has-text-white">Unit Price</th>
                    <th class="has-text-white">Total Price</th>
                </tr>

                {#each purchase_order.attributes.purchase_order_items.data as item, index}
                    <tr>
                        <td>{index + 1}</td>
                        <td
                            >{item.attributes.item.data?.attributes.name} - {item
                                .attributes.item.data?.attributes.category}</td
                        >
                        <td>{item.attributes.unit}</td>
                        <td>{item.attributes.quantity}</td>
                        <td>{item.attributes.currency}</td>
                        <td>{numberWithCommas(item.attributes.unitPrice)}</td>
                        <td
                            >{numberWithCommas(
                                item.attributes.unitPrice *
                                    item.attributes.quantity
                            )}</td
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
                                purchase_order.attributes.purchase_order_items
                                    .data
                            )
                        )}</th
                    >
                </tr>
            </table>

            <br /><br />

            <p class="has-text-centered is-size-8">
                The Purchse order must be quoted on all correspondance and
                documents including delivery note and invoice
            </p>

            <br>
            <p class="has-text-centered is-size-8">
                Recommended distribution: Finance (original), Supplier (2nd
                Original), Procurment (Copy) and Warehouse(Copy)
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
