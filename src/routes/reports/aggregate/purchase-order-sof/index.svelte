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
    import Select from "svelte-select";

    let now = new Date();
    const sof = field("sof", "", [required()]);
    const start = field("start", now, [required()]);
    const end = field("end", now, [required()]);

    const formItem = form(start, end);

    let purchase_order_items;

    let sofs = [];

    function getTotal(items) {
        let total = 0;

        items.forEach((element) => {
            total += element.attributes.unitPrice * element.attributes.quantity;
        });

        return total;
    }

    async function getItem(filter) {
        try {
            let params = {
                populate: [
                    "purchase_order",
                    "purchase_order.consortium_member",
                    "item",
                ],
                filters: filter,
                "pagination[limit]": -1,
            };
            params = qs.stringify(params, {
                encodeValuesOnly: true,
            });

            let response = await get("purchase-order-items", params);

            console.log("Get Purchase Order Items  ", response);

            purchase_order_items = response.data.filter(
                (x) => x.attributes.purchase_order.data
            );
        } catch (e) {
            console.log("Error get Purchase Order Items  ", e);
        }
    }

    async function filter() {
        await formItem.validate();
        if (!$formItem.valid) {
            return;
        }

        let filter = {
            $and: [
                {
                    sof: {
                        $containsi: $sof.value?.value,
                    },
                },
            ],
        };

        if ($start.value != $end.value) {
            filter.$and.push({
                purchase_order: {
                    date: {
                        $gte: $start.value,
                        $lte: $end.value,
                    },
                },
            });
        }

        console.log({ filter });

        getItem(filter);
    }

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    async function getItems() {
        try {
            let params = {
                "pagination[limit]": -1,
            };
            params = qs.stringify(params, {
                encodeValuesOnly: true,
            });
            let response = await get("purchase-order-items", params);

            console.log("Get Purchase Order Items SOF ", response);

            sofs = response.data
                .filter((x) => x.attributes.sof)
                .map((x) => {
                    return x.attributes.sof;
                })
                .filter(onlyUnique);

            console.log({ sofs });
        } catch (e) {
            console.log("Error Get Purchase Order Items SOF ", e);
        }
    }

    const columnsDetails = [
        {
            key: "poNumber",
            title: "PO #",
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
            key: "date",
            title: "Date",
            sortable: true,
            selected: true,
        },
        {
            key: "id",
            title: "PO Item ID",
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
            key: "sof",
            title: "SOF",
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
            key: "total",
            title: "Total",
            sortable: true,
            selected: true,
        },
    ];

    function getPopulatedDataPdf(rowss) {
        let array = [];

        rowss.forEach((elementC) => {
            array.push([
                elementC.attributes.purchase_order.data.attributes.poNumber,
                elementC.attributes.purchase_order.data.attributes.consortium_member
                    .data.attributes.name,
                
                elementC.attributes.purchase_order.data.attributes.date,
                elementC.id,
                elementC.attributes.item.data.attributes
                    .name,
                elementC.attributes.item.data.attributes
                    .category,
                elementC.attributes.item.data.attributes
                    .unit,
                elementC.attributes.item.data.attributes
                    .pieces,
                elementC.attributes.currency,
                elementC.attributes.unitPrice,
                elementC.attributes.sof,
                elementC.attributes.quantity,

                elementC.attributes.unitPrice *
                    elementC.attributes.quantity,
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
            numberWithCommas(getTotal(purchase_order_items)),
        ]);

        return array;
    }

    function exportcsv() {
        let now = new Date();
        let fname = `SWAN Purchase Order by SOF -  ${now.getFullYear()}-${now.getMonth()}-${now.getDate()} T${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}.csv`;

        let array = getPopulatedDataPdf(purchase_order_items);

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
            "Purchase Order by SOF - " + ($sof.value?.value ? $sof.value?.value : "-") + s,
            getPopulatedDataPdf(purchase_order_items),
            columnsDetails
        );
    }

    onMount(async () => {
        await getItems();
    });
</script>

<svelte:head>
    <title>Print Purchase Order by SOF Report</title>
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
                    Print Purchase Order by SOF Report
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
                        <label for="" class="gray">SOF (*)</label>
                        <div class="control">
                            <Select
                                items={sofs}
                                bind:value={$sof.value}
                                listAutoWidth={true}
                            />
                        </div>
                        {#if $formItem.hasError("sof.required")}
                            <p class="help is-danger">SOF is required</p>
                        {/if}
                    </div>
                </div>
                <div class="column" />
            </div>

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
                        disabled={!$formItem.valid}
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

    {#if purchase_order_items}
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
                    <h3 class="is-size-5">Purchase Order by SOF</h3>
                </div>
            </div>

            <hr />
            {#if $start.value != $end.value}
                <p class="gray">
                    Start - {$start.value.toDateString()}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    End - {$end.value.toDateString()}
                </p>
            {/if}
            <!-- <p class="card-header-title">Stock Items</p> -->

            {#if $sof.value}
                <p class="card-header-title">{$sof.value.value}</p>
            {/if}

            <table class="table is-bordered is-fullwidth is-narrow">
                <tr class="has-background-black has-text-white">
                    <td>No.</td>
                    <th class="has-text-white">PO #</th>
                    <th class="has-text-white">Consortium Member</th>
                    <th class="has-text-white">Date</th>
                    <th class="has-text-white">Description</th>
                    <th class="has-text-white">Category</th>
                    <th class="has-text-white">Unit</th>
                    <th class="has-text-white">Pcs/Package</th>
                    <th class="has-text-white">SOF</th>
                    <th class="has-text-white">Unit Price</th>
                    <th class="has-text-white">Quantity</th>

                    <th class="has-text-white">Total</th>
                </tr>

                {#each purchase_order_items as stock, index}
                    <tr>
                        <td>{index + 1}</td>
                        <td>
                            {stock.attributes.purchase_order.data?.attributes
                                .poNumber}
                        </td>
                        <td>
                            {stock.attributes.purchase_order.data?.attributes
                                .consortium_member.data?.attributes.name}
                        </td>

                        <td>
                            {stock.attributes.purchase_order.data?.attributes
                                .date}
                        </td>
                        <td
                            >{stock.attributes.item.data?.attributes.name} - PO Item ID({stock.id})</td
                        >
                        <td
                            >{stock.attributes.item.data?.attributes.category}
                        </td>
                        <td
                            >{stock.attributes.item.data?.attributes.unit
                                ? stock.attributes.item.data?.attributes.unit
                                : "-"}</td
                        >
                        <td
                            >{stock.attributes.item.data?.attributes.pieces
                                ? stock.attributes.item.data?.attributes.pieces
                                : "-"}</td
                        >

                        <td
                            >{stock.attributes.sof
                                ? stock.attributes.sof
                                : "-"}</td
                        >

                        <td>{numberWithCommas(stock.attributes.unitPrice)}</td>
                        <td>{numberWithCommas(stock.attributes.quantity)}</td>

                        <td
                            >{numberWithCommas(
                                stock.attributes.unitPrice *
                                    stock.attributes.quantity
                            )}
                            {stock.attributes.currency}</td
                        >
                    </tr>
                {/each}

                <tr class="">
                    <th>Total</th>
                    <th colspan="10" />
                    <th>{numberWithCommas(getTotal(purchase_order_items))}</th>
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
