<script>
    import Icon from "svelte-awesome/components/Icon.svelte";
    import {
        faFileExport,
        faPlus,
        faSearch,
    } from "@fortawesome/free-solid-svg-icons";

    import { onDestroy } from "svelte";
    import { user } from "../../store/user";
    import DataTable from "../../widgets/table/DataTable.svelte";
    import { get, del } from "../../lib/api";
    import qs from "qs";
    import { goto } from "@sapper/app";
    import { exportToCSV } from "../../utils/export/exportCSV";
    import { exportToPDF } from "../../utils/export/exportPDF";
import { exportToCsvAlternate } from "../../utils/export/csvGenerator";
import { exportToPDFAlternate } from "../../utils/export/exportPDFAlternate";

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

    let query = "",
        queryC = "";
    let sortBy = "";


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
            key: "userName",
            title: "User's Name",
            sortable: true,
            filterValue: (v) => v.first_name.charAt(0).toLowerCase(),
            filterType: "string",
            selected: true,
        },
        {
            key: "email",
            title: "Email",
            sortable: true,
            filterValue: (v) => v.first_name.charAt(0).toLowerCase(),
            filterType: "string",
            selected: true,
        },
        {
            key: "type",
            title: "Type",
            sortable: true,
            filterValue: (v) => v.first_name.charAt(0).toLowerCase(),
            filterType: "string",
            selected: true,
        },
        {
            key: "entityID",
            title: "Edited ID",
            sortable: true,
            filterValue: (v) => v.first_name.charAt(0).toLowerCase(),
            filterType: "string",
            selected: true,
        },
        {
            key: "action",
            title: "Action",
            sortable: true,
            filterValue: (v) => v.first_name.charAt(0).toLowerCase(),
            filterType: "string",
            selected: true,
        },
        {
            key: "createdAt",
            title: "Date",
            sortable: true,
            filterValue: (v) => v.last_name.charAt(0).toLowerCase(),
            filterType: "string",
            selected: true,
        },
    ];

    let pagination;

    let options = {
        title: "Activity Logs Table",
        showFilterHeader: false,
        showSelect: false,
        showDetails: false,
        showActions: false,
        showFooter: false,
    };

    async function getItems(filters, sort, page) {
        try {
            let params = {
                filters: filters ? filters : {},
                sort: sort ? sort : "id:desc",
                populate: "*",
                "pagination[page]": page ? page : 1,
            };
            params = qs.stringify(params, {
                encodeValuesOnly: true,
            });

            let response = await get("activity-logs", params);

            console.log("Get Activity Logs Request - ", response);

            rows = response.data;
            pagination = response.meta?.pagination;
        } catch (e) {
            console.warn("Error Getting Activity Logs - ", e);
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
        let qs = getQS();

        getItems(qs, sortBy, event.detail.newPage);
    }

    function editRow(event) {
        goto("activity-logs/detail/" + event.detail.row.id);
    }



    function getQS() {
        return {
            $or: [
                {
                    action: {
                        $containsi: query,
                    },
                },
                {
                    type: {
                        $containsi: query,
                    },
                },
                {
                    date: {
                        $containsi: query,
                    },
                },
                {
                    users_permissions_user: {
                        name: {
                            $containsi: query,
                        }
                    },
                },
                {
                    users_permissions_user: {
                        email: {
                            $containsi: query,
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
                element.attributes.users_permissions_user.data?.attributes.name,
                element.attributes.users_permissions_user.data?.attributes.email,
                element.attributes.type,
                element.attributes.entityID,
                element.attributes.action,
                element.attributes.date,
            ]);
        });
        return array;
    }


    function exportcsv() {
        let now = new Date();
        let fname = `"SWAN "${"Activity Logs"} ${now.getFullYear()}-${now.getMonth()}-${now.getDate()} T${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}.csv`;

        let array = getPopulatedDataPdf(rows);

        array = [columns.map((x) => x.title), ...array];
        exportToCsvAlternate(fname, array);
    }

    function exportPDF() {
        exportToPDFAlternate(
            "Activity Logs",
            getPopulatedDataPdf(rows),
            columns
        );
    }

    async function exportAllcsv() {
        try {
            let params = {
                populate: "*",
                "pagination[limit]": -1,
            };
            params = qs.stringify(params, {
                encodeValuesOnly: true,
            });

            let response = await get("activity-logs", params);

            let now = new Date();
            let fname = `"SWAN "${"Activity Logs"} ${now.getFullYear()}-${now.getMonth()}-${now.getDate()} T${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}.csv`;

            let array = getPopulatedDataPdf(response.data);

            array = [
                columns.map((x) => x.title),
                ...array,
            ];
            exportToCsvAlternate(fname, array);
        } catch (e) {}
    }

    async function exportAllPDF() {
        try {
            let params = {
                populate: "*",
                "pagination[limit]": -1,
            };
            params = qs.stringify(params, {
                encodeValuesOnly: true,
            });

            let response = await get("activity-logs", params);

            exportToPDFAlternate(
                "Activity Logs",
                getPopulatedDataPdf(response.data),
                columns
            );
        } catch (e) {}
    }
</script>

<svelte:head>
  <title>Activity Logs</title>
</svelte:head>

<br /><br />
<div class="container px-6">
    <div class="columns">
        <div class="column">
            <h3>
                Activity Logs
                {#if pagination}
                    <span class="gray has-text-weight-light ml-2"
                        >{pagination.total}</span
                    >
                {/if}
            </h3>
        </div>
        <div class="column has-text-right">
            
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
            <DataTable
                {pagination}
                {columns}
                {rows}
                {options}
                on:clickCol={sort}
                on:changePage={changePage}
                on:clickRow={editRow}
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
    <br><br><br><br><br>
</div>



<style>
    :global(.button.is-dark .icon svg *) {
        color: white !important;
    }

    :global(.icon.is-small.is-left svg *) {
        color: lightgray !important;
    }
</style>
