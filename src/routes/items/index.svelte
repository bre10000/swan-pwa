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
    import DeleteConfirmation from "../../widgets/modals/DeleteConfirmation.svelte";
    import { goto } from "@sapper/app";
    import { toast } from "@zerodevx/svelte-toast";
    import { exportToCSV } from "../../utils/export/exportCSV";
    import { exportToPDF } from "../../utils/export/exportPDF";

    const unsubscribe = user.subscribe((value) => {
        if (!process.browser) {
            return;
        }

        if (!value.loggedIn && value.fetched) {
            goto("/login");
        } else if (value.data) {
            getItems();
        }
    });

    onDestroy(unsubscribe);

    let query = "",
        queryC = "";
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
            key: "name",
            title: "Name",
            sortable: true,
            filterValue: (v) => v.first_name.charAt(0).toLowerCase(),
            filterType: "string",
            selected: true,
        },
        {
            key: "category",
            title: "Category",
            sortable: true,
            filterValue: (v) => v.last_name.charAt(0).toLowerCase(),
            filterType: "string",
            selected: true,
        },
    ];

    let pagination;

    let options = {
        title: "Items Table",
        showFilterHeader: false,
        showSelect: false,
        showDetails: false,
        showActions: true,
        showFooter: false,
    };

    async function getItems(filters, sort, page) {
        try {
            let params = {
                filters: filters ? filters : {},
                sort: sort ? sort : "id",
                "pagination[page]": page ? page : 1,
            };
            params = qs.stringify(params, {
                encodeValuesOnly: true,
            });

            let response = await get("items", params);

            console.log("Get Items Request - ", response);

            rows = response.data;
            pagination = response.meta?.pagination;
        } catch (e) {
            console.warn("Error Getting Items - ", e);
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
        goto("items/edit/" + event.detail.row.id);
    }

    function deleteRow(event) {
        currentItem = event.detail.row;
        showConfirmation = true;
    }

    async function deleteItem() {
        showConfirmation = false;

        try {
            let response = await del("items/" + currentItem.id, null);

            console.log("Delete Item Request  ", response);

            if (response.data?.id) {
                toast.push("Item Deleted Successfully!", {
                    duration: 20000,
                    theme: {
                        "--toastBackground": "#48BB78",
                        "--toastBarBackground": "#2F855A",
                    },
                });

                search();
            }
        } catch (e) {
            console.log("Error Delete Item   ", e);
        }
    }

    function getQS() {
        return {
            $or: [
                {
                    name: {
                        $containsi: query,
                    },
                },
                {
                    category: {
                        $containsi: query,
                    },
                },
            ],
        };
    }

    function exportcsv() {
        exportToCSV("Items", rows, columns);
    }

    function exportPDF() {
        exportToPDF("Items", rows, columns);
    }

    async function exportAllcsv() {
        try {
            let params = {
                "pagination[limit]": -1,
            };
            params = qs.stringify(params, {
                encodeValuesOnly: true,
            });

            let response = await get("items", params);

            exportToCSV("Items", response.data, columns);
        } catch (e) {}
    }

    async function exportAllPDF() {
        try {
            let params = {
                "pagination[limit]": -1,
            };
            params = qs.stringify(params, {
                encodeValuesOnly: true,
            });

            let response = await get("items", params);

            exportToPDF("Items", response.data, columns);
        } catch (e) {}
    }
</script>

<svelte:head>
  <title>Items</title>
</svelte:head>

<br /><br />
<div class="container px-6">
    <div class="columns">
        <div class="column">
            <h3>
                Items
                {#if pagination}
                    <span class="gray has-text-weight-light ml-2"
                        >{pagination.total}</span
                    >
                {/if}
            </h3>
        </div>
        <div class="column has-text-right">
            <a href="/items/add" class="button is-dark px-5">
                <span class="icon">
                    <Icon data={faPlus} />
                </span>
                <span class="has-text-white has-text-weight-bold"
                    >Add an Item</span
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
            <DataTable
                {pagination}
                {columns}
                {rows}
                {options}
                on:clickCol={sort}
                on:changePage={changePage}
                on:deleteRow={deleteRow}
                on:editRow={editRow}
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
