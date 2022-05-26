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
            key: "poNumber",
            title: "PO #",
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
    ];

    let detailVariable = "purchase_order_items";

    let pagination;

    let options = {
        title: "Purchase Orders Table",
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
                    purchase_order_items: {
                        populate: "*",
                    },
                },
            };
            params = qs.stringify(params, {
                encodeValuesOnly: true,
            });

            let response = await get("purchase-orders", params);

            console.log("Get Purchase Orders Request - ", response);

            rows = response.data;
            pagination = response.meta?.pagination;
        } catch (e) {
            console.warn("Error Getting Purchase Orders - ", e);
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
        let qs = getQS();

        getItems(qs, sortBy, event.detail.newPage);
    }

    function editRow(event) {
        goto("purchase-orders/edit/" + event.detail.row.id);
    }

    function printRow(event) {
        goto("reports/single/purchase-order/" + event.detail.row.id);
    }

    function deleteRow(event) {
        currentItem = event.detail.row;
        showConfirmation = true;
    }

    async function deleteItem() {
        showConfirmation = false;

        try {
            let response = await del("purchase-orders/" + currentItem.id, null);

            console.log("Delete Purchase Order Request  ", response);

            if (response.data?.id) {
                toast.push("Purchase Order Deleted Successfully!", {
                    duration: 20000,
                    theme: {
                        "--toastBackground": "#48BB78",
                        "--toastBarBackground": "#2F855A",
                    },
                });

                createActivityLog("Purchase Order", currentItem, "Delete", response.data.id)
                
                search();
            }
        } catch (e) {
            console.log("Error Delete Purchase Order   ", e);
        }
    }

    function getQS() {
        return {
            $or: [
                {
                    poNumber: {
                        $containsi: query,
                    },
                },
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
                    purchase_order_items: {
                        item: {
                            name: {
                                $containsi: query,
                            },
                        },
                    },
                },
                {
                    purchase_order_items: {
                        item: {
                            category: {
                                $containsi: query,
                            },
                        },
                    },
                },
                {
                    purchase_order_items: {
                        unit: {
                            $containsi: query,
                        },
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
                element.attributes.poNumber,
                element.attributes.consortium_member.data.attributes.name,
                element.attributes.date,
                "-",
                "-",
                "-",
                "-",
                "-",
                "-",
                "-",
            ]);

            element.attributes.purchase_order_items.data.forEach((elementC) => {
                array.push([
                    "-",
                    "-",
                    "-",
                    "-",
                    elementC.id,
                    elementC.attributes.item.data.attributes.name,
                    elementC.attributes.unit,
                    elementC.attributes.pieces,
                    elementC.attributes.quantity,
                    elementC.attributes.currency,
                    elementC.attributes.unitPrice,
                ]);
            });
        });
        return array;
    }

    function exportcsv() {
        let now = new Date();
        let fname = `"SWAN "${"Purchase Orders"} ${now.getFullYear()}-${now.getMonth()}-${now.getDate()} T${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}.csv`;

        let array = getPopulatedDataPdf(rows);

        array = [columns.concat(columnsDetails).map((x) => x.title), ...array];
        exportToCsvAlternate(fname, array);
    }

    function exportPDF() {
        // exportToPDF("Purchase Orders", rows, columns);
        exportToPDFAlternate(
            "Purchase Orders",
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
                    purchase_order_items: {
                        populate: "*",
                    },
                },
                "pagination[limit]": -1,
            };
            params = qs.stringify(params, {
                encodeValuesOnly: true,
            });

            let response = await get("purchase-orders", params);

            let now = new Date();
            let fname = `"SWAN "${"Purchase Orders"} ${now.getFullYear()}-${now.getMonth()}-${now.getDate()} T${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}.csv`;

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
                    purchase_order_items: {
                        populate: "*",
                    },
                },
            };
            params = qs.stringify(params, {
                encodeValuesOnly: true,
            });

            let response = await get("purchase-orders", params);

            exportToPDFAlternate(
                "Purchase Orders",
                getPopulatedDataPdf(response.data),
                columns.concat(columnsDetails)
            );
        } catch (e) {}
    }
</script>

<svelte:head>
    <title>Purchase Orders</title>
</svelte:head>

<br /><br />
<div class="container px-6">
    <div class="columns">
        <div class="column">
            <h3>
                Purchase Orders
                {#if pagination}
                    <span class="gray has-text-weight-light ml-2"
                        >{pagination.total}</span
                    >
                {/if}
            </h3>
        </div>
        <div class="column has-text-right">
            <a href="purchase-orders/add" class="button is-dark px-5">
                <span class="icon">
                    <Icon data={faPlus} />
                </span>
                <span class="has-text-white has-text-weight-bold"
                    >Add a Purchase Order</span
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
