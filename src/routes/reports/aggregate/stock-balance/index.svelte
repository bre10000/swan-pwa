<script>
    import { get } from "../../../../lib/api";
    import {
        faAngleLeft,
        faSave,
        faFileExcel,
        faFilePdf,
        faPrint,
    } from "@fortawesome/free-solid-svg-icons";
    import Icon from "svelte-awesome/components/Icon.svelte";
    import qs from "qs";
    import { numberWithCommas, checkValue } from "../../../../lib";
    import { exportToCsvAlternate } from "../../../../utils/export/csvGenerator";
    import { exportToPDFAlternate } from "../../../../utils/export/exportPDFAlternate";
    import { onMount } from "svelte";
    import { DateInput } from "date-picker-svelte";
    import { field, form } from "svelte-forms";
    import { required } from "svelte-forms/validators";

    let now = new Date();
    const start = field("start", now, [required()]);
    const end = field("end", now, [required()]);

    const formItem = form(start, end);

    let stock_items;
    let categories = ["Health", "Wash", "ES/NFI"];

    function getTotal(items) {
        let total = 0;

        items.forEach((element) => {
            total +=
                element.attributes.purchase_order_item.data?.attributes
                    .unitPrice *
                getRemainingInStock(
                    element
                );
        });

        return total;
    }

    async function getItem(filter) {
        try {
            let params = {
                populate: [
                    "stock",
                    "stock.consortium_member",
                    "stock.warehouse",
                    "purchase_order_item",
                    "purchase_order_item.item",
                    "purchase_order_item.purchase_order",
                    "stock_release_items",
                    "stock_release_items.purchase_order_item",
                    "stock_release_items.purchase_order_item.item",
                    "stock_release_items.purchase_order_item.purchase_order",
                    "stock_release_items.stock_release",
                ],
                filters: filter,
                "pagination[limit]": -1,
            };
            params = qs.stringify(params, {
                encodeValuesOnly: true,
            });

            let response = await get("stock-items", params);

            console.log("Get Stock Items  ", response);

            stock_items = response.data.filter((x) => x.attributes.stock.data);
        } catch (e) {
            console.log("Error get Stock Items  ", e);
        }
    }


    function getCategoryItems(category) {
        return stock_items.filter(
            (x) =>
                x.attributes.purchase_order_item.data?.attributes.item.data
                    ?.attributes.category === category
        );
    }

    function getRemainingInStock(stock_item) {
        let totalStock = stock_item.attributes.received;
        let totalRelease = 0;
        stock_item.attributes.stock_release_items.data
            .filter(
                (x) =>
                    x.attributes.stock_release.data
            )
            .forEach((element) => {
                totalRelease += parseInt(element.attributes.quantity);
            });

       
        // console.log("Total Stock - ", totalStock, " Total Release - ", totalRelease)
        return totalStock - totalRelease;
    }

    function getReleased(stock_release_items) {
        let totalRelease = 0;

        stock_release_items
            .filter(
                (x) =>
                    x.attributes.stock_release.data
            )
            .forEach((element) => {
                totalRelease += parseInt(element.attributes.quantity);
            });

        return totalRelease;
    }

    async function filter() {
        await formItem.validate();
        if (!$formItem.valid) {
            return;
        }

        let filter = {
            stock: {
                date: {
                    $gte: $start.value,
                    $lte: $end.value,
                },
            },
        };

        getItem(filter);
    }

    const columnsDetails = [
        {
            key: "id",
            title: "Batch #",
            sortable: true,
            selected: true,
        },
        {
            key: "consortium_member",
            title: "Consortium Member",
            sortable: true,
            selected: true,
        },
        {
            key: "warehouse",
            title: "Warehouse",
            sortable: true,
            selected: true,
        },
        {
            key: "date",
            title: "Date",
            sortable: true,
            selected: true,
        },
        {
            key: "id",
            title: "Stock Item ID",
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
            title: "Description",
            sortable: true,
            selected: true,
        },
        {
            key: "category",
            title: "Category",
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
            title: "PO Quantity",
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
            key: "released",
            title: "Released",
            sortable: true,
            selected: true,
        },
        {
            key: "remaining",
            title: "Remaining",
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

        categories.forEach((element) => {
            getCategoryItems(element).forEach((elementC) => {
                array.push([
                    elementC.attributes.stock.data.id,
                    elementC.attributes.stock.data.attributes.consortium_member
                        .data.attributes.name,
                    elementC.attributes.stock.data.attributes.warehouse.data
                        .attributes.name,
                    elementC.attributes.stock.data.attributes.date,
                    elementC.id,
                    elementC.attributes.purchase_order_item.data.attributes
                        .purchase_order.data.attributes.poNumber,
                    elementC.attributes.purchase_order_item.data.attributes.item
                        .data.attributes.name,
                    elementC.attributes.purchase_order_item.data.attributes.item
                        .data.attributes.category,
                    elementC.attributes.purchase_order_item.data.attributes.item
                        .data.attributes.unit,
                    elementC.attributes.purchase_order_item.data.attributes.item
                        .data.attributes.pieces,
                    elementC.attributes.purchase_order_item.data.attributes
                        .quantity,
                    elementC.attributes.purchase_order_item.data.attributes
                        .currency,
                    elementC.attributes.purchase_order_item.data.attributes
                        .unitPrice,
                    elementC.attributes.received,
                    getReleased(
                        elementC.attributes.stock_release_items.data
                    ),
                    getRemainingInStock(
                        elementC
                    ),
                    elementC.attributes.purchase_order_item.data.attributes
                        .unitPrice *
                        getRemainingInStock(
                            elementC
                        ),
                ]);
            });

            array.push([
                "Total - " + element,
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
                "-",
                "-",
                numberWithCommas(getTotal(getCategoryItems(element))),
            ]);
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
            "-",
            "-",
            numberWithCommas(getTotal(stock_items)),
        ]);

        return array;
    }

    function exportcsv() {
        let now = new Date();
        let fname = `SWAN Stocks Balance - " ${now.getFullYear()}-${now.getMonth()}-${now.getDate()} T${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}.csv`;

        let array = getPopulatedDataPdf(stock_items);

        array = [columnsDetails.map((x) => x.title), ...array];
        exportToCsvAlternate(fname, array);
    }

    function exportPDF() {
        // exportToPDF("Stocks", rows, columns);
        let s = "";
        if ($start.value != $end.value) {
            s =
                " - Start - " +
                $start.value.toDateString() +
                ", End - " +
                $end.value.toDateString();
        }
        exportToPDFAlternate(
            "Stock Balance" + s,
            getPopulatedDataPdf(stock_items),
            columnsDetails
        );
    }

    onMount(async () => {
        await getItem();
    });
</script>

<svelte:head>
    <title>Print Stock Balance Report</title>
</svelte:head>

<br class="hide-print" /><br class="hide-print" />
<div class="container">
    <a href="reports-list" class="has-text-dark hide-print"
        ><span class="icon is-small"><Icon data={faAngleLeft} /></span> Back</a
    >
    <br class="hide-print" /><br class="hide-print" />
    <div class="card px-6 hide-print">
        <br class="hide-print" /><br class="hide-print" />
        <div class="columns">
            <div class="column">
                <h3 class="my-0 is-size-5 has-text-weight-bold">
                    Print Stock Balance Report
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

        <!-- svelte-ignore component-name-lowercase -->
        <form>
            <div class="columns">
                <div class="column">
                    <div class="field">
                        <label for="" class="gray">Start</label><br />
                        <div class="control">
                            <DateInput
                                bind:value={$start.value}
                                format="yyyy/MM/dd"
                                placeholder="2000/31/12"
                                closeOnSelection={true}
                                min={new Date("1920/1/1")}
                                class="input"
                            />
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="field">
                        <label for="" class="gray">End</label><br />
                        <div class="control">
                            <DateInput
                                bind:value={$end.value}
                                format="yyyy/MM/dd"
                                placeholder="2000/31/12"
                                closeOnSelection={true}
                                min={new Date("1920/1/1")}
                                class="input"
                            />
                        </div>
                    </div>
                </div>
                <div class="column is-flex is-align-items-end">
                    <button
                        disabled={!$formItem.valid && !$formItem.dirty}
                        on:click|preventDefault={filter}
                        class="button is-dark px-5 py-2 has-text-weight-bold"
                        >Filter</button
                    >
                </div>
            </div>
        </form>

        <br />
    </div>

    <br class="hide-print" /><br class="hide-print" />

    {#if stock_items}
        <div class="card p-6">
            <br />

            <div class="columns">
                <div class="column is-narrow mr-5">
                    <img
                        src="./images/logo/swan_consortium.svg"
                        width="150"
                        alt="SWAN Humaniterian Consortium"
                    />
                </div>
                <div class="column is-flex is-align-items-center">
                    <h3 class="is-size-5">Total Stock Balance</h3>
                    <hr />
                    {#if $start.value != $end.value}
                        <p class="gray">
                            Start - {$start.value.toDateString()}
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            End - {$end.value.toDateString()}
                        </p>
                    {/if}
                </div>
            </div>

            <!-- <p class="card-header-title">Stock Items</p> -->

            {#each categories as c}
                <p class="card-header-title">{c}</p>

                <table class="table is-bordered is-fullwidth is-narrow">
                    <tr class="has-background-black has-text-white">
                        <td>No.</td>
                        <th class="has-text-white">Consortium Member</th>
                        <th class="has-text-white">Warehouse</th>
                        <th class="has-text-white">Date</th>
                        <th class="has-text-white">Batch #</th>
                        <th class="has-text-white">Description</th>
                        <th class="has-text-white">Unit</th>
                        <th class="has-text-white">Pcs/Package</th>

                        <th class="has-text-white">Unit Price</th>
                        <th class="has-text-white">PO Quantity</th>
                        <th class="has-text-white">Received</th>
                        <th class="has-text-white">Released</th>

                        <th class="has-text-white">Balance</th>
                        <th class="has-text-white">Total</th>
                    </tr>

                    {#each stock_items.filter((x) => x.attributes.purchase_order_item.data?.attributes.item.data?.attributes.category === c) as stock, index}
                        <tr>
                            <td>{index + 1}</td>
                            <td>
                                {stock.attributes.stock.data?.attributes
                                    .consortium_member.data?.attributes.name}
                            </td>
                            <td>
                                {stock.attributes.stock.data?.attributes
                                    .warehouse.data?.attributes.name}
                            </td>
                            <td>
                                {stock.attributes.stock.data?.attributes.date}
                            </td>
                            <td>
                                {stock.attributes.stock.data?.id}
                            </td>
                            <td
                                >{stock.attributes.purchase_order_item.data
                                    ?.attributes.item.data?.attributes.name} - PO Item ID ({stock
                                    .attributes.purchase_order_item.data
                                    ?.id})</td
                            >
                            <td
                                >{stock.attributes.purchase_order_item.data
                                    ?.attributes.item.data?.attributes.unit
                                    ? stock.attributes.purchase_order_item.data
                                          ?.attributes.item.data?.attributes
                                          .unit
                                    : "-"}</td
                            >
                            <td
                                >{stock.attributes.purchase_order_item.data
                                    ?.attributes.item.data?.attributes.pieces
                                    ? stock.attributes.purchase_order_item.data
                                          ?.attributes.item.data?.attributes
                                          .pieces
                                    : "-"}</td
                            >

                            <td
                                >{numberWithCommas(stock.attributes.purchase_order_item.data
                                    ?.attributes.unitPrice)}</td
                            >
                            <td
                                >{numberWithCommas(stock.attributes.purchase_order_item.data
                                    ?.attributes.quantity)}</td
                            >

                            <td>{numberWithCommas(stock.attributes.received)}</td>
                            <td
                                >{numberWithCommas(
                                    getReleased(
                                        stock.attributes.stock_release_items
                                            .data
                                    )
                                )}</td
                            >
                            <td
                                >{numberWithCommas(
                                    getRemainingInStock(
                                        stock
                                    )
                                )}</td
                            >
                            <td
                                >{numberWithCommas(
                                    stock.attributes.purchase_order_item.data
                                        ?.attributes.unitPrice *
                                        getRemainingInStock(
                                            stock
                                        )
                                )}
                                {stock.attributes.purchase_order_item.data
                                    ?.attributes.currency}</td
                            >
                        </tr>
                    {/each}

                    <tr class="">
                        <th>Total - {c}</th>
                        <th colspan="12" />
                        <th
                            >{numberWithCommas(
                                getTotal(
                                    stock_items.filter(
                                        (x) =>
                                            x.attributes.purchase_order_item
                                                .data?.attributes.item.data
                                                ?.attributes.category === c
                                    )
                                )
                            )}</th
                        >
                    </tr>
                </table>
            {/each}

            <table class="table is-bordered is-fullwidth is-narrow">
                <tr class="">
                    <th>Total</th>
                    <th colspan="12" />
                    <th class="is-narrow"
                        >{numberWithCommas(getTotal(stock_items))}</th
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
            transform: scale(0.9);
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
