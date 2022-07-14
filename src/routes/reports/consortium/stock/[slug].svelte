<script context="module">
    export async function preload(params) {
        return { slug: parseInt(params.params.slug) };
    }
</script>

<script>
    import { get } from "../../../../lib/api";
    import { faAngleLeft,
faSave, faFileExcel, faFilePdf, faPrint } from "@fortawesome/free-solid-svg-icons";
    import Icon from "svelte-awesome/components/Icon.svelte";
    import qs from "qs";
    import { numberWithCommas, checkValue } from "../../../../lib";
    import { exportToCsvAlternate } from "../../../../utils/export/csvGenerator";
    import { exportToPDFAlternate } from "../../../../utils/export/exportPDFAlternate";

    export let slug;

    let consortium;

    function getTotal(items) {
        let total = 0;

        items.forEach((element2) => {
            element2.attributes.stock_items.data?.forEach((element) => {
                total +=
                    element.attributes.purchase_order_item.data?.attributes
                        .unitPrice * element.attributes.received;
            });
        });

        return total;
    }

    async function getItem() {
        try {
            let params = {
                populate: [
                    "stocks",
                    "stocks.stock_items",
                    "stocks.warehouse",
                    "stocks.stock_items.purchase_order_item",
                    "stocks.stock_items.purchase_order_item.item",
                    "stocks.stock_items.purchase_order_item.purchase_order",
                ],
            };
            params = qs.stringify(params, {
                encodeValuesOnly: true,
            });

            let response = await get("consortium-members/" + slug, params);

            console.log("Get Consortium Member by ID ", response);

            consortium = response.data;
        } catch (e) {
            console.log("Error get Consortium Member by ID ", e);
        }
    }

    const columns = [
        {
            key: "id",
            title: "ID",
            sortable: true,
            filterValue: (v) => Math.floor(v.id / 10),
            interval: 10,
            filterType: "numeric",
            headerClass: "has-text-left",
            selected: true,
        },
        {
            key: "warehouse",
            title: "Warehouse",
            sortable: true,
            filterValue: (v) => v.first_name.charAt(0).toLowerCase(),
            filterType: "string",
            selected: true,
        },
        {
            key: "consortium_member",
            title: "Consortium Member",
            sortable: true,
            filterValue: (v) => v.last_name.charAt(0).toLowerCase(),
            filterType: "string",
            selected: true,
        },
        {
            key: "date",
            title: "Date",
            sortable: true,
            filterValue: (v) => v.last_name.charAt(0).toLowerCase(),
            filterType: "string",
            selected: true,
        },
    ];

    const columnsDetails = [
        {
            key: "id",
            title: "ID",
            sortable: true,
            selected: true,
        },
        {
            key: "poNumber",
            title: "PO#",
            sortable: true,
            selected: true,
        },
        {
            key: "item",
            title: "ITEM",
            sortable: true,
            selected: true,
        },
        {
            key: "unit",
            title: "Unit",
            sortable: true,
            selected: true,
        },
        {
            key: "pieces",
            title: "Pieces",
            sortable: true,
            selected: true,
        },
        {
            key: "quantity",
            title: "Quantity",
            sortable: true,
            selected: true,
        },
        {
            key: "currency",
            title: "Currency",
            sortable: true,
            selected: true,
        },
        {
            key: "unitPrice",
            title: "Unit Price",
            sortable: true,
            selected: true,
        },
        {
            key: "received",
            title: "Received",
            sortable: true,
            selected: true,
        },
        {
            key: "remark",
            title: "Remark",
            sortable: true,
            selected: true,
        },
        {
            key: "total",
            title: "Total",
            sortable: true,
            selected: true,
        },
    ];

    function getPopulatedDataPdf(rowss) {
        let array = [];
        rowss.forEach((element) => {
            array.push([
                element.id,
                element.attributes.warehouse.data.attributes.name,
                consortium.attributes.name,
                element.attributes.date,
                "-",
                "-",
                "-",
                "-",
                "-",
                "-",
                "-",
                "-",
                "-",
                "-"
            ]);

            element.attributes.stock_items.data.forEach((elementC) => {
                array.push([
                    "-",
                    "-",
                    "-",
                    "-",
                    elementC.id,
                    elementC.attributes.purchase_order_item.data.attributes.purchase_order.data.attributes.poNumber,
                    elementC.attributes.purchase_order_item.data.attributes.item.data.attributes.name,
                    elementC.attributes.purchase_order_item.data.attributes.item.data.attributes.unit,
                    elementC.attributes.purchase_order_item.data.attributes.item.data.attributes.pieces,
                    elementC.attributes.purchase_order_item.data.attributes.quantity,
                    elementC.attributes.purchase_order_item.data.attributes.currency,
                    elementC.attributes.purchase_order_item.data.attributes.unitPrice,
                    elementC.attributes.received,
                    elementC.attributes.remark,
                    elementC.attributes.purchase_order_item.data.attributes.unitPrice * elementC.attributes.received,
                ]);
            });
        });

        array.push([
                "Total",
                "-",
                "-",
                "-",
                "-",
                "-",
                "-",
                "-",
                "-",
                "-",
                "-",
                "-",
                "-",
                "-",
                numberWithCommas(
                            getTotal(consortium.attributes.stocks.data)
                        )
            ]);


        return array;
    }

    function exportcsv() {
        let now = new Date();
        let fname = `SWAN Partner Stocks - ${consortium.attributes.name} ${now.getFullYear()}-${now.getMonth()}-${now.getDate()} T${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}.csv`;

        let array = getPopulatedDataPdf(consortium.attributes.stocks.data);

        array = [columns.concat(columnsDetails).map((x) => x.title), ...array];
        exportToCsvAlternate(fname, array);
    }

    function exportPDF() {
        // exportToPDF("Stocks", rows, columns);
        exportToPDFAlternate(
            "Partner Stocks - " + consortium.attributes.name,
            getPopulatedDataPdf(consortium.attributes.stocks.data),
            columns.concat(columnsDetails)
        );
    }
    

    $: if (slug) {
        getItem();
    }
</script>

<svelte:head>
    <title>Print Consortium Member</title>
</svelte:head>

<br class="hide-print" /><br class="hide-print" />
<div class="container">
    <a href="consortium-members" class="has-text-dark hide-print"
        ><span class="icon is-small"><Icon data={faAngleLeft} /></span> Back</a
    >
    <br class="hide-print" /><br class="hide-print" />
    <div class="card px-6 hide-print">
        <br class="hide-print" /><br class="hide-print" />
        <div class="columns">
            <div class="column">
                <h3 class="my-0 is-size-5 has-text-weight-bold">
                    Print Consortium Member Stock Report
                </h3>
            </div>

            <div class="column has-text-right">
                <button
                    on:click={exportcsv}
                    class="button is-dark px-5 py-2 has-text-weight-bold"
                >
                    <span class="icon">
                        <Icon data={faFileExcel} />
                    </span>
                    <span class="has-text-white has-text-weight-bold"
                        >Download Excel</span
                    >
                </button>
                <button
                    on:click={exportPDF}
                    class="button is-dark px-5 py-2 ml-3 has-text-weight-bold"
                >
                    <span class="icon">
                        <Icon data={faFilePdf} />
                    </span>
                    <span class="has-text-white has-text-weight-bold"
                        >Download PDF</span
                    >
                </button>
                <button
                    on:click={() => {
                        window.print();
                    }}
                    class="button is-dark px-5 ml-3 py-2 has-text-weight-bold"
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

    {#if consortium}
        <div class="card p-6">
            <br />
            
            <div class="columns">
                <div class="column is-narrow mr-5">
                    <img src="./images/logo/swan_consortium.svg" width="150" alt="SWAN Humaniterian Consortium">
                </div>
                <div class="column is-flex is-align-items-center">
                    <h3 class="is-size-5">
                        Consortium Member Stock -
                        <span class="has-text-weight-bold"
                            >{consortium.attributes.name}</span
                        >
                    </h3>
                </div>
            </div>
            
            <hr />

            <p class="card-header-title">Stock Items</p>

            <table class="table is-bordered is-fullwidth is-narrow">
                <tr class="has-background-black has-text-white">
                    <td>Stock No.</td>
                    <th class="has-text-white">Description</th>
                    <th class="has-text-white">Category</th>
                    <th class="has-text-white">Unit</th>
                    <th class="has-text-white">Pcs/Package</th>
                    <th class="has-text-white">Currency</th>
                    <th class="has-text-white">Unit Price</th>
                    <th class="has-text-white">Received</th>
                    <th class="has-text-white">Remark</th>
                    <th class="has-text-white">Total</th>
                </tr>

                {#each consortium.attributes.stocks.data as item, index}
                    <tr class="has-text-weight-bold">
                        <td>{item.id}</td>
                        <td>{item.attributes.date}</td>
                        <td
                            >{item.attributes.warehouse.data?.attributes
                                .name}</td
                        >
                        <td colspan="7" />
                    </tr>
                    {#each item.attributes.stock_items.data as stock, index}
                        <tr>
                            <td>{index + 1}</td>
                            <td
                                >{stock.attributes.purchase_order_item.data
                                    ?.attributes.item.data?.attributes.name}</td
                            >
                            <td>
                                {stock.attributes.purchase_order_item.data
                                    ?.attributes.item.data?.attributes.category}
                            </td>
                            <td
                                >{stock.attributes.purchase_order_item.data
                                    ?.attributes.item.data?.attributes.unit ? stock.attributes.purchase_order_item.data
                                    ?.attributes.item.data?.attributes.unit : "-"}</td
                            >
                            <td
                                >{stock.attributes.purchase_order_item.data
                                    ?.attributes.item.data?.attributes.pieces ? stock.attributes.purchase_order_item.data
                                    ?.attributes.item.data?.attributes.pieces : "-"}</td
                            >

                            <td
                                >{stock.attributes.purchase_order_item.data
                                    ?.attributes.currency}</td
                            >
                            <td
                                >{stock.attributes.purchase_order_item.data
                                    ?.attributes.unitPrice}</td
                            >
                            <td>{numberWithCommas(stock.attributes.received)}</td>

                            <td>{stock.attributes.remark}</td>
                            <td
                                >{numberWithCommas(
                                    stock.attributes.purchase_order_item.data
                                        ?.attributes.unitPrice *
                                        stock.attributes.received
                                )}</td
                            >
                        </tr>
                    {/each}
                {/each}

                <tr class="">
                    <th>Total</th>
                    <th colspan="8" />
                    <th
                        >{numberWithCommas(
                            getTotal(consortium.attributes.stocks.data)
                        )}</th
                    >
                </tr>
            </table>

            <br /><br />

            <br /><br />
        </div>
    {/if}
</div>

<br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

<style>
    .card {
        overflow: visible !important;
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
            transform: scale(0.90);
            transform-origin: top center;
        }

        .card {
            box-shadow: none !important;
        }
        .hide-print {
            display: none !important;
        }
        .card.p-6 {
            padding: 0rem !important;
        }
        .is-size-8 {
            font-size: 10px;
        }
    }
</style>
