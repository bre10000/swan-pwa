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
    import { image_url } from "../../config";

    const unsubscribe = user.subscribe((value) => {
        if (!process.browser) {
            return;
        }

        if (!value.loggedIn && value.fetched) {
            goto("/login");
        } else if (value.data) {
            getConsortiumMembers();
        }
    });

    onDestroy(unsubscribe);

    let query = "",
        queryC = "";
    let sortBy = "";

    let currentConsortiumMember;
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
            key: "phone",
            title: "Phone",
            sortable: true,
            filterValue: (v) => v.last_name.charAt(0).toLowerCase(),
            filterType: "string",
            selected: true,
        },
        {
            key: "website",
            title: "Website",
            sortable: true,
            filterValue: (v) => v.last_name.charAt(0).toLowerCase(),
            filterType: "string",
            selected: true,
        },
        {
            key: "address_1",
            title: "Address",
            sortable: true,
            filterValue: (v) => v.last_name.charAt(0).toLowerCase(),
            filterType: "string",
            selected: true,
        },
        {
            key: "address_2",
            title: "Address 2",
            sortable: true,
            filterValue: (v) => v.last_name.charAt(0).toLowerCase(),
            filterType: "string",
            selected: true,
        },
    ];

    let pagination;

    let options = {
        title: "Consortium Members Table",
        showFilterHeader: false,
        showSelect: false,
        showDetails: false,
        showActions: true,
        showFooter: false,
    };

    async function getConsortiumMembers(filters, sort, page) {
        try {
            let params = {
                filters: filters ? filters : {},
                "pagination[limit]": -1,
                populate: "*",
            };
            params = qs.stringify(params, {
                encodeValuesOnly: true,
            });

            let response = await get("consortium-members", params);

            console.log("Get Consortium Members Request - ", response);

            rows = response.data;
            pagination = response.meta?.pagination;
        } catch (e) {
            console.warn("Error Getting Consortium Members - ", e);
        }
    }

    function search() {
        let qs = getQS();
        getConsortiumMembers(qs, sortBy);
    }

    function changePage(event) {
        let qs = getQS();

        getConsortiumMembers(qs, sortBy, event.detail.newPage);
    }

    function sort(event) {
        sortBy = event.detail.key;
        let qs = getQS();

        getConsortiumMembers(qs, sortBy, event.detail.newPage);
    }

    function editRow(event) {
        goto("consortium-members/edit/" + event.detail.row.id);
    }

    function deleteRow(row) {
        currentConsortiumMember = row;
        showConfirmation = true;
    }

    async function deleteConsortiumMember() {
        showConfirmation = false;

        try {
            let response = await del(
                "consortium-members/" + currentConsortiumMember.id,
                null
            );

            console.log("Delete Consortium Member Request  ", response);

            if (response.data?.id) {
                toast.push("Consortium Member Deleted Successfully!", {
                    duration: 20000,
                    theme: {
                        "--toastBackground": "#48BB78",
                        "--toastBarBackground": "#2F855A",
                    },
                });

                search();
            }
        } catch (e) {
            console.log("Error Delete Consortium Member   ", e);
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
                    website: {
                        $containsi: query,
                    },
                },
                {
                    phone: {
                        $containsi: query,
                    },
                },
            ],
        };
    }

    function exportcsv() {
        exportToCSV("Consortium Members", rows, columns);
    }

    function exportPDF() {
        exportToPDF("Consortium Members", rows, columns);
    }

    async function exportAllcsv() {
        try {
            let params = {
                "pagination[limit]": -1,
            };
            params = qs.stringify(params, {
                encodeValuesOnly: true,
            });

            let response = await get("consortium-members", params);

            exportToCSV("Consortium Members", response.data, columns);
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

            let response = await get("consortium-members", params);

            exportToPDF("Consortium Members", response.data, columns);
        } catch (e) {}
    }
</script>

<svelte:head>
    <title>Consortium Members</title>
</svelte:head>

<br /><br />
<div class="container px-6">
    <div class="columns">
        <div class="column">
            <h3>
                Consortium Members
                {#if pagination}
                    <span class="gray has-text-weight-light ml-2"
                        >{pagination.total}</span
                    >
                {/if}
            </h3>
        </div>
        <div class="column has-text-right">
            <a href="/consortium-members/add" class="button is-dark px-5">
                <span class="icon">
                    <Icon data={faPlus} />
                </span>
                <span class="has-text-white has-text-weight-bold"
                    >Add a Consortium Member</span
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
    <div class="card p-5">
        <div class="columns is-multiline">
            {#if rows?.length > 0}
                {#each rows as r}
                    <div class="column is-4 card">
                        <div class="card-image">
                            <figure
                                class="image is-4by3"
                                style="background-image: url('{image_url}{r
                                    .attributes.logo?.data?.attributes.url}');"
                            >
                                <!-- <img src="{image_url}{r.attributes.logo.data.attributes.url}" alt="Placeholder"> -->
                            </figure>
                        </div>
                        <div class="card-content">
                            <div class="media">
                                <div class="media-content">
                                    <p class="title is-4">
                                        {r.attributes.name}
                                    </p>
                                    <p class="subtitle is-6">
                                        {r.attributes.website}
                                    </p>
                                </div>
                            </div>

                            <div class="content gray">
                                {r.attributes.address_1} <br />
                                {r.attributes.address_2}
                            </div>
                        </div>
                        <div class="card-footer">
                            <a
                                href="reports/consortium/stock/{r.id}"
                                class="card-footer-item has-text-dark">Stock</a
                            >
                            <a
                                href="reports/consortium/waybill/{r.id}"
                                class="card-footer-item has-text-dark"
                                >Waybill</a
                            >
                        </div>
                        <div class="card-footer">
                            <a
                                href="consortium-members/edit/{r.id}"
                                class="card-footer-item has-text-dark">Edit</a
                            >
                            <a
                                href={"#"}
                                on:click|preventDefault={() => deleteRow(r)}
                                class="card-footer-item has-text-dark">Delete</a
                            >
                        </div>
                    </div>
                {/each}
                <!-- <DataTable
                {pagination}
                {columns}
                {rows}
                {options}
                on:clickCol={sort}
                on:changePage={changePage}
                on:deleteRow={deleteRow}
                on:editRow={editRow}
                on:clickRow={editRow}
            /> -->
            {:else}
                <div class="column has-text-centered">
                    <br /><br /><br /><br />
                    <Icon data={faSearch} scale="3" />
                    <p class="gray">Uh oh! nothing found on database.</p>
                    <br /><br /><br /><br />
                </div>
            {/if}
        </div>
    </div>
    <br /><br /><br /><br /><br />
</div>

{#if showConfirmation}
    <DeleteConfirmation
        on:confirm={deleteConsortiumMember}
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

    .image.is-4by3 {
        background-size: contain;
        background-position: center center;
        background-repeat: no-repeat;
    }

    .card {
        box-shadow: none !important;
        border: 0.5px solid rgba(211, 211, 211, 0.167);
    }
</style>
