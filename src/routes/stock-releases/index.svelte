<script>
    import Icon from "svelte-awesome/components/Icon.svelte";
    import {
        faFileExport,
        faPlus,
        faSearch,
    } from "@fortawesome/free-solid-svg-icons";

    import { onDestroy } from "svelte";
    import { user } from "../../store/user";
    import { get, del } from "../../lib/api";
    import qs from "qs";
    import DeleteConfirmation from "../../widgets/modals/DeleteConfirmation.svelte";
    import { goto } from "@sapper/app";
    import { toast } from "@zerodevx/svelte-toast";
    import DataTableDetails from "../../widgets/table/DataTableDetails.svelte";
    import { exportToCsvAlternate } from "../../utils/export/csvGenerator";
    import { exportToPDFAlternate } from "../../utils/export/exportPDFAlternate";
import { createActivityLog } from "../../utils/activity/log";

    const unsubscribe = user.subscribe((value) => {
        if (!process.browser) {
            return;
        }

        if (!value.loggedIn && value.fetched) {
            goto("login");
        } else if (value.data) {
            getItems();
        }
    });

    onDestroy(unsubscribe);

    let query = "";
    let sortBy = "";

    let currentItem;
    let showConfirmation = false;

    let rows = [];

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
            key: "quantity",
            title: "Quantity",
            sortable: true,
            selected: true,
        },
    ];

    let detailVariable = "stock_release_items";

    let pagination;

    let options = {
        title: "Stock Releases Table",
        showFilterHeader: false,
        showSelect: false,
        showDetails: false,
        showPrint: true,
        showActions: true,
        showFooter: false,
    };

    async function getItems(filters, sort, page) {
        try {
            let params = {
                filters: filters ? filters : {},
                sort: sort ? sort : "id:desc",
                "pagination[page]": page ? page : 1,
                populate: {
                    consortium_member: {
                        populate: "*",
                    },
                    stock_release_items: {
                        populate: ['purchase_order_item', 'purchase_order_item.item', 'purchase_order_item.purchase_order'],
                    },
                },
            };
            params = qs.stringify(params, {
                encodeValuesOnly: true,
            });

            let response = await get("stock-releases", params);

            console.log("Get Stock Releases Request - ", response);

            rows = response.data;
            pagination = response.meta?.pagination;
        } catch (e) {
            console.warn("Error Getting Stock Releases - ", e);
        }
    }

    function search() {
        let qs = getQS();
        getItems(qs, sortBy);
    }

    function changePage(event) {
        let qs = getQS();

        getItems(qs, sortBy, event.detail.newPage);
    }

    function sort(event) {
        sortBy = event.detail.key;
        sortBy = sortBy.replace("consortium_member", "consortium_member.name");
        sortBy = sortBy.replace("warehouse", "warehouse.name");
        let qs = getQS();

        getItems(qs, sortBy, event.detail.newPage);
    }

    function editRow(event) {
        goto("stock-releases/edit/" + event.detail.row.id);
    }

    function printRow(event) {
        goto("reports/single/stock-release/" + event.detail.row.id);
    }

    function deleteRow(event) {
        currentItem = event.detail.row;
        showConfirmation = true;
    }

    async function deleteItem() {
        showConfirmation = false;

        try {
            let response = await del("stock-releases/" + currentItem.id, null);

            console.log("Delete Stock Release Request  ", response);

            if (response.data?.id) {
                toast.push("Stock Release Deleted Successfully!", {
                    duration: 20000,
                    theme: {
                        "--toastBackground": "#48BB78",
                        "--toastBarBackground": "#2F855A",
                    },
                });

                createActivityLog("Stock Release", currentItem, "Delete", response.data.id)
                
                search();
            }
        } catch (e) {
            console.log("Error Delete Stock Release   ", e);
        }
    }

    function getQS() {
        return {
            $or: [
                
                {
                    date: {
                        $containsi: query,
                    },
                },
                {
                    consortium_member: {
                        name: {
                            $containsi: query,
                        },
                    },
                },
               
                {
                    stock_release_items: {
                        purchase_order_item: {
                            item: {
                                name: {
                                    $containsi: query,
                                },
                            },
                        }
                    },
                },
                {
                    stock_release_items: {
                        purchase_order_item: {
                            item: {
                                category: {
                                    $containsi: query,
                                },
                            },
                        }
                    },
                },
                {
                    stock_release_items: {
                        purchase_order_item: {
                            unit: {
                                $containsi: query,
                            },
                        }
                    },
                },
                {
                    stock_release_items: {
                        purchase_order_item: {
                            purchase_order: {
                                poNumber: {
                                    $containsi: query,
                                }
                            },
                        }
                    },
                },
                
            ],
        };
    }

    function getPopulatedDataPdf(rowss) {
        let array = [];
        rowss.forEach((element) => {
            array.push([
                element.id,
                element.attributes.consortium_member.data.attributes.name,
                element.attributes.date,
                "-",
                "-",
                "-",
                "-",
                "-",
                "-",
                "-",
                "-",
            ]);

            element.attributes.stock_release_items.data.forEach((elementC) => {
                array.push([
                    "-",
                    "-",
                    "-",
                    elementC.id,
                    elementC.attributes.purchase_order_item.data.attributes.purchase_order.data.attributes.poNumber,
                    elementC.attributes.purchase_order_item.data.attributes.item.data.attributes.name,
                    elementC.attributes.purchase_order_item.data.attributes.unit,
                    elementC.attributes.purchase_order_item.data.attributes.pieces,
                    elementC.attributes.purchase_order_item.data.attributes.quantity,
                    elementC.attributes.purchase_order_item.data.attributes.currency,
                    elementC.attributes.purchase_order_item.data.attributes.unitPrice,
                    elementC.attributes.quantity,
                ]);
            });
        });
        return array;
    }

    function exportcsv() {
        let now = new Date();
        let fname = `"SWAN "${"Stock Releases"} ${now.getFullYear()}-${now.getMonth()}-${now.getDate()} T${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}.csv`;

        let array = getPopulatedDataPdf(rows);

        array = [columns.concat(columnsDetails).map((x) => x.title), ...array];
        exportToCsvAlternate(fname, array);
    }

    function exportPDF() {
        // exportToPDF("Stock Releases", rows, columns);
        exportToPDFAlternate(
            "Stock Releases",
            getPopulatedDataPdf(rows),
            columns.concat(columnsDetails)
        );
    }

    async function exportAllcsv() {
        try {
            let params = {
                populate: {
                    consortium_member: {
                        populate: "*",
                    },
                    warehouse: {
                        populate: "*",
                    },
                    stock_release_items: {
                        populate: ['purchase_order_item', 'purchase_order_item.item', 'purchase_order_item.purchase_order'],
                    },
                },
                "pagination[limit]": -1,
            };
            params = qs.stringify(params, {
                encodeValuesOnly: true,
            });

            let response = await get("stock-releases", params);

            let now = new Date();
            let fname = `"SWAN "${"Stock Releases"} ${now.getFullYear()}-${now.getMonth()}-${now.getDate()} T${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}.csv`;

            let array = getPopulatedDataPdf(response.data);

            array = [
                columns.concat(columnsDetails).map((x) => x.title),
                ...array,
            ];
            exportToCsvAlternate(fname, array);
        } catch (e) {}
    }

    async function exportAllPDF() {
        try {
            let params = {
                "pagination[limit]": -1,
                populate: {
                    consortium_member: {
                        populate: "*",
                    },
                    stock_release_items: {
                        populate: ['purchase_order_item', 'purchase_order_item.item', 'purchase_order_item.purchase_order'],
                    },
                },
            };
            params = qs.stringify(params, {
                encodeValuesOnly: true,
            });

            let response = await get("stock-releases", params);

            exportToPDFAlternate(
                "Stock Releases",
                getPopulatedDataPdf(response.data),
                columns.concat(columnsDetails)
            );
        } catch (e) {}
    }
</script>

<svelte:head>
    <title>Stock Releases</title>
</svelte:head>

<br /><br />
<div class="container px-6">
    <div class="columns">
        <div class="column">
            <h3>
                Stock Releases
                {#if pagination}
                    <span class="gray has-text-weight-light ml-2"
                        >{pagination.total}</span
                    >
                {/if}
            </h3>
        </div>
        <div class="column has-text-right">
            <a href="stock-releases/add" class="button is-dark px-5">
                <span class="icon">
                    <Icon data={faPlus} />
                </span>
                <span class="has-text-white has-text-weight-bold"
                    >Add a Stock Release</span
                >
            </a>
        </div>
    </div>

    <div class="columns">
        <div class="column">
            <div class="field has-addons" style="width: 500px;">
                <div class="control has-icons-left">
                    <input
                        bind:value={query}
                        class="input is-dark"
                        type="search"
                        placeholder="search"
                    />
                    <span class="icon is-small is-left">
                        <Icon data={faSearch} />
                    </span>
                </div>
                <div class="control">
                    <button
                        class="button is-dark has-text-weight-bold"
                        on:click={search}
                    >
                        Search
                    </button>
                </div>
            </div>
        </div>
        <div class="column has-text-right">
            <div class="dropdown is-hoverable">
                <div class="dropdown-trigger">
                    <button
                        class="button"
                        aria-haspopup="true"
                        aria-controls="dropdown-menu"
                    >
                        <span>Export To Excel or PDF</span>
                        <span class="icon is-small">
                            <Icon data={faFileExport} />
                        </span>
                    </button>
                </div>
                <div class="dropdown-menu" id="dropdown-menu" role="menu">
                    <div class="dropdown-content has-text-left">
                        <a
                            href={"#"}
                            on:click|preventDefault={exportcsv}
                            class="dropdown-item"
                        >
                            Export Current Page to Excel
                        </a>
                        <a
                            href={"#"}
                            on:click|preventDefault={exportPDF}
                            class="dropdown-item"
                        >
                            Export Current Page to PDF
                        </a>
                        <hr class="dropdown-divider" />
                        <a
                            href={"#"}
                            on:click|preventDefault={exportAllcsv}
                            class="dropdown-item"
                        >
                            Export All to Excel
                        </a>
                        <a
                            href={"#"}
                            on:click|preventDefault={exportAllPDF}
                            class="dropdown-item"
                        >
                            Export All to PDF
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="card">
        {#if rows?.length > 0}
            <DataTableDetails
                {pagination}
                {columns}
                {columnsDetails}
                {detailVariable}
                {rows}
                {options}
                on:clickCol={sort}
                on:changePage={changePage}
                on:deleteRow={deleteRow}
                on:editRow={editRow}
                on:clickRow={editRow}
                on:printRow={printRow}
            />
        {:else}
            <div class="has-text-centered">
                <br /><br /><br /><br />
                <Icon data={faSearch} scale="3" />
                <p class="gray">Uh oh! nothing found on database.</p>
                <br /><br /><br /><br />
            </div>
        {/if}
    </div>
    <br /><br /><br /><br /><br />
</div>

{#if showConfirmation}
    <DeleteConfirmation
        on:confirm={deleteItem}
        on:dismiss={() => (showConfirmation = false)}
    />
{/if}

<style>
    :global(.button.is-dark .icon svg *) {
        color: white !important;
    }

    :global(.icon.is-small.is-left svg *) {
        color: lightgray !important;
    }
</style>
