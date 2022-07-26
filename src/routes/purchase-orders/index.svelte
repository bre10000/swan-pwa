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
    import { Moon } from "svelte-loading-spinners";
    import { numberWithCommas, checkValue } from "../../lib";

    let query = "";
    let sortBy = "id:desc";

    let currentItem;
    let showConfirmation = false;

    let rows;

    let filters = [];

    let field, queryF;

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
            key: "item_id",
            title: "PO Item ID",
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
            key: "unitPrice",
            title: "Unit Price",
            sortable: true,
            selected: true,
        },

        {
            key: "total",
            title: "Total",
            sortable: true,
            selected: true,
        },
        {
            key: "currency",
            title: "Currency",
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
        rows = null;
        try {
            let params = {
                filters: filters ? filters : {},
                sort: sort ? sort : "id:desc",
                populate: [
                    "consortium_member","purchase_order_items","purchase_order_items.item"
                ]
            };

            if(page)
                params["pagination[page]"] = page;
            else    
                params["pagination[limit]"] = -1;

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
        if(query == "" && filters.length == 0)
            getItems(null, null, 1);
        else {
            getItems(qs, sortBy, null);
        }
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

                createActivityLog(
                    "Purchase Order",
                    currentItem,
                    "Delete",
                    response.data.id
                );

                search();
            }
        } catch (e) {
            console.log("Error Delete Purchase Order   ", e);
        }
    }

    function getQS() {
        return {
            $and: [
                ...filters.map((x) => x.value),
               query !== "" ? {
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
                                      sof: {
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
                          ],
                      } : {}
                    
            ],
        };
    }

    function addFilter() {
        if (field && queryF) {
            if (
                field == "consortium_member" ||
                field == "quantity" ||
                field == "sof" ||
                field == "currency" ||
                field == "unitPrice" ||
                field == "item_id"
            ) {
                let parent;
                
                let field2 = field;


                
                if (field == "consortium_member") {
                    parent = "consortium_member";
                } else {
                    parent = "purchase_order_items";
                }

                field = field.includes("name") ? "name" : field;
                field = field.includes("item_id") ? "id" : field;
                field = field.includes("consortium_member") ? "name" : field;

                let temp = {
                    index: filters.length,
                    value: {},
                    name: field2,
                    query: queryF,
                };
                temp.value[parent] = {};
                temp.value[parent][field] = {
                    $containsi: queryF,
                };

                filters = [temp, ...filters];
            } else if (
                field == "item" ||
                field == "unit" ||
                field == "pieces"
            ) {
                let grandparent, parent;
                let field2 = field;

                grandparent = "purchase_order_items";
                parent = "item";

                field = field.includes("item") ? "name" : field;

                let temp = {
                    index: filters.length,
                    value: {},
                    name: field2,
                    query: queryF,
                };

                temp.value[grandparent] = {};
                temp.value[grandparent][parent] = {};
                temp.value[grandparent][parent][field] = {
                    $containsi: queryF,
                };
                console.log("Custom Filter", temp);

                filters = [temp, ...filters];
            } else {
                let temp = {
                    index: filters.length,
                    value: {},
                    name: field,
                    query: queryF,
                };

                temp.value[field] = {
                    $containsi: queryF,
                };

                filters = [temp, ...filters];
            }

            field = "";
            queryF = "";

            search();
            console.log({ filters });
        }
    }

    function removeFilter(f) {
        filters = [...filters.filter((x) => x.index !== f.index)];
        search();
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
                    elementC.attributes.item.data.attributes.unit,
                    elementC.attributes.item.data.attributes.pieces,
                    numberWithCommas(elementC.attributes.quantity),
                    numberWithCommas(elementC.attributes.unitPrice),
                    numberWithCommas(
                        elementC.attributes.quantity *
                            elementC.attributes.unitPrice
                    ),
                    elementC.attributes.currency,
                ]);
            });
        });
        return array;
    }

    function exportcsv() {
        let now = new Date();
        let fname = `SWAN ${"Purchase Orders"} ${now.getFullYear()}-${now.getMonth()}-${now.getDate()} T${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}.csv`;

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
            let fname = `SWAN ${"Purchase Orders"} ${now.getFullYear()}-${now.getMonth()}-${now.getDate()} T${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}.csv`;

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

    const unsubscribe = user.subscribe((value) => {
        if (!process.browser) {
            return;
        }

        if (!value.loggedIn && value.fetched) {
            goto("login");
        } else if (value.data) {
            getItems(null, null, 1);
        }
    });

    onDestroy(unsubscribe);
</script>

<svelte:head>
    <title>Purchase Orders</title>
</svelte:head>

<br /><br />
<div class="container px-6">
    <div class="columns">
        <div class="column">
            <h3 class="has-text-info">
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
        <div class="column is-narrow">
            <div class="field has-addons" style="width: 250px;">
                <div class="control has-icons-left">
                    <input
                        bind:value={query}
                        class="input is-light"
                        type="search"
                        placeholder="search"
                    />
                    <span class="icon is-small is-left">
                        <Icon data={faSearch} />
                    </span>
                </div>
                <div class="control">
                    <button
                        class="button is-light has-text-weight-bold"
                        on:click={search}
                    >
                        Search
                    </button>
                </div>
            </div>
        </div>
        <div class="column is-narrow">
            <div class="dropdown is-hoverable">
                <div class="dropdown-trigger">
                    <button
                        class="button is-light px-5 has-text-weight-bold"
                        aria-haspopup="true"
                        aria-controls="dropdown-menu"
                    >
                        <span class="panel-icon pr-4" style="margin-top: -7px;">
                            <svg
                                width="24"
                                height="24"
                                stroke-width="1.5"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M2.99997 7V4C2.99997 3.44772 3.44769 3 3.99997 3H20.0001C20.5523 3 21 3.44766 21.0001 3.9999L21.0004 7M2.99997 7L9.65077 12.7007C9.87241 12.8907 9.99998 13.168 9.99998 13.4599V19.7192C9.99998 20.3698 10.6114 20.8472 11.2425 20.6894L13.2425 20.1894C13.6877 20.0781 14 19.6781 14 19.2192V13.46C14 13.168 14.1275 12.8907 14.3492 12.7007L21.0004 7M2.99997 7H21.0004"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                        </span>
                        <span>Filter</span>
                    </button>
                </div>
                <div class="dropdown-menu" id="dropdown-menu" role="menu">
                    <div class="dropdown-content has-text-left p-3">
                        <div class="field">
                            <label for="" class="gray">Field</label><br />
                            <div
                                class="control select has-background-light is-fullwidth"
                            >
                                <select
                                    required
                                    bind:value={field}
                                    name="category"
                                >
                                    {#each columns.concat(columnsDetails) as c}
                                        <option value={c.key}>{c.title}</option>
                                    {/each}
                                </select>
                            </div>
                        </div>
                        <div class="field">
                            <label for="" class="gray">Query</label><br />
                            <div class="control">
                                <input
                                    bind:value={queryF}
                                    class="input has-background-light"
                                    required
                                    type="text"
                                />
                            </div>
                        </div>

                        <button
                            on:click|preventDefault={addFilter}
                            class="button is-fullwidth is-dark my-2 px-5 py-2 has-text-weight-bold"
                            >ADD</button
                        >
                    </div>
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

    <div class="container">
        {#if filters?.length > 0}
            {#each filters as f (f.index)}
                <span class="tag is-light is-medium is-rounded p-4 mr-4">
                    <b class="mx-2">
                        {columns
                            .concat(columnsDetails)
                            .filter((c) => c.key == f?.name)[0]?.title}
                    </b>
                    contains
                    <b class="mx-2">{f.query}</b>
                    <button
                        on:click={() => removeFilter(f)}
                        class="delete is-small"
                    />
                </span>
            {/each}
        {/if}
    </div>
    <br />

    <div class="card">
        {#if rows?.length > 0}
            <DataTableDetails
                {query}
                {filters}
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
        {:else if rows}
            <div class="has-text-centered">
                <br /><br /><br /><br />
                <Icon data={faSearch} scale="3" />
                <p class="gray">Uh oh! nothing found on database.</p>
                <br /><br /><br /><br />
            </div>
        {:else}
            <div class="has-text-centered">
                <br /><br /><br /><br />
                <div class="is-flex is-justify-content-center">
                    <Moon size="60" color="blue" unit="px" duration="1s" />
                </div>
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
