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
    import { get, del, put } from "../../lib/api";
    import qs from "qs";
    import DeleteConfirmation from "../../widgets/modals/DeleteConfirmation.svelte";
    import { goto } from "@sapper/app";
    import { toast } from "@zerodevx/svelte-toast";
    import { Moon } from "svelte-loading-spinners";
    import { exportToCSV } from "../../utils/export/exportCSV";
    import { exportToPDF } from "../../utils/export/exportPDF";
    import DataTableUsers from "../../widgets/table/DataTableUsers.svelte";
    import { createActivityLog } from "../../utils/activity/log";

   

    let query = "";
    let sortBy = "";

    let currentItem;
    let showConfirmation = false;

    let rows;

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
            filterValue: (v) => v.name.charAt(0).toLowerCase(),
            filterType: "string",
            selected: true,
        },
        {
            key: "username",
            title: "Username",
            sortable: true,
            filterValue: (v) => v.username.charAt(0).toLowerCase(),
            filterType: "string",
            selected: true,
        },
        {
            key: "email",
            title: "Email",
            sortable: true,
            filterValue: (v) => v.email.charAt(0).toLowerCase(),
            filterType: "string",
            selected: true,
        },
        {
            key: "role",
            title: "Role",
            sortable: true,
            filterValue: (v) => v.role.name.charAt(0).toLowerCase(),
            filterType: "string",
            selected: true,
        },
        {
            key: "blocked",
            title: "Blocked",
            sortable: true,
            filterValue: (v) => v.role.name.charAt(0).toLowerCase(),
            filterType: "string",
            selected: true,
        },
    ];

    let pagination;

    let options = {
        title: "Users Table",
        showSearch: false,
        showFilterHeader: false,
        showSelect: true,
        showDetails: false,
        showActions: false,
        showFooter: false,
    };

    async function getItems(filters, sort, page) {
        rows = null;
        try {
            let params = {
                filters: filters ? filters : {},
                sort: sort ? sort : "id",
                "pagination['limit']": -1,
                populate: '*'
            };
            params = qs.stringify(params, {
                encodeValuesOnly: true,
            });

            let response = await get("users", params);

            console.log("Get Users Request - ", response);

            rows = response.data;
            pagination = response.meta?.pagination;
        } catch (e) {
            console.warn("Error Getting Users - ", e);
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
        goto("users/edit/" + event.detail.row.id);
    }
    function selectRow(event) {
        let index = rows.findIndex( x=> x.id == event.detail.id ) 
        rows[index].selected = !rows[index].selected
    }
    function selectAllRows(event) {
        rows = event.detail.rows
    }

    async function changeStatusSelected(value){
        rows?.filter( x => x.selected ).forEach(async element => {
            try {
            let response = await put({
                path: "users/" + element.id,
                data: {
                        blocked: value
                },
            });

            console.log("Change User Status Request  ", response);

            if (response?.id) {
                toast.push( value ? "User Account Blocked Successfully!" : "User Account Activated Successfully!", {
                    duration: 20000,
                    theme: {
                        "--toastBackground": "#48BB78",
                        "--toastBarBackground": "#2F855A",
                    },
                });
                createActivityLog(
                    "User",
                    response,
                    "Account Status",
                    response.id
                );

                getItems();
            }
        } catch (e) {
            console.log("Error Change User Status   ", e);
        }
        });
    }
    function deleteRow(event) {
        currentItem = event.detail.row;
        showConfirmation = true;
    }

    async function deleteItem() {
        showConfirmation = false;

        try {
            let response = await del("users/" + currentItem.id, null);

            console.log("Delete User Request  ", response);

            if (response?.id) {
                toast.push("User Deleted Successfully!", {
                    duration: 20000,
                    theme: {
                        "--toastBackground": "#48BB78",
                        "--toastBarBackground": "#2F855A",
                    },
                });

                search();
            }
        } catch (e) {
            console.log("Error Delete User   ", e);
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
                    email: {
                        $containsi: query,
                    },
                },
                {
                    username: {
                        $containsi: query,
                    },
                },
                {
                    role: {
                        name: {
                            $containsi: query,
                        }
                    },
                },
            ],
        };
    }

    function exportcsv() {
        exportToCSV("Users", rows, columns);
    }

    function exportPDF() {
        exportToPDF("Users", rows, columns);
    }

    async function exportAllcsv() {
        try {
            let params = {
                "pagination[limit]": -1,
            };
            params = qs.stringify(params, {
                encodeValuesOnly: true,
            });

            let response = await get("users", params);

            exportToCSV("Users", response.data, columns);
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

            let response = await get("users", params);

            exportToPDF("Users", response.data, columns);
        } catch (e) {}
    }


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
</script>

<svelte:head>
    <title>Users</title>
</svelte:head>
<br />

<div class="container px-6">
    <br />
    <div class="columns ">
        <div class="column">
            <h3 class="has-text-info">
                
                Users
                {#if rows}
                    <span class="has-text-weight-light ml-2"
                        >{rows.length}</span
                    >
                {/if}
            </h3>
        </div>
        <div class="column has-text-right">
            <a href="users/add" class="button is-dark px-5">
                <span class="icon">
                    <Icon data={faPlus} />
                </span>
                <span class="has-text-white has-text-weight-bold"
                    >Add a User</span
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
        {#if rows?.filter( x => x.selected ).length > 0}
            <div class="column has-text-right">
                <button on:click={() => {changeStatusSelected(true)}} class="button is-danger is-light p-4 has-text-weight-bold">
                    Block Selected
                </button>
                <button on:click={() => {changeStatusSelected(false)}} class="button is-success is-light p-4 ml-4 has-text-weight-bold">
                    Activate Selected
                </button>
            </div>
        {/if}
        <!-- <div class="column has-text-right">
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
        </div> -->
    </div>
    <br>
    <div class="card no-shadow">
        {#if rows?.length > 0}
            <DataTableUsers
                {pagination}
                {columns}
                {rows}
                {options}
                on:clickCol={sort}
                on:changePage={changePage}
                on:deleteRow={deleteRow}
                on:editRow={editRow}
                on:clickRow={editRow}
                on:selectRow={selectRow}
                on:selectAllRows={selectAllRows}
            />
        {:else if rows}
        <div class="has-text-centered">
            <br /><br /><br /><br />
            <span>
                <svg
                    width="72"
                    height="72"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M20 12V5.74853C20 5.5894 19.9368 5.43679 19.8243 5.32426L16.6757 2.17574C16.5632 2.06321 16.4106 2 16.2515 2H4.6C4.26863 2 4 2.26863 4 2.6V21.4C4 21.7314 4.26863 22 4.6 22H11"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M8 10H16M8 6H12M8 14H11"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M20.5 20.5L22 22"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M15 18C15 19.6569 16.3431 21 18 21C18.8299 21 19.581 20.663 20.1241 20.1185C20.6654 19.5758 21 18.827 21 18C21 16.3431 19.6569 15 18 15C16.3431 15 15 16.3431 15 18Z"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M16 5.4V2.35355C16 2.15829 16.1583 2 16.3536 2C16.4473 2 16.5372 2.03725 16.6036 2.10355L19.8964 5.39645C19.9628 5.46275 20 5.55268 20 5.64645C20 5.84171 19.8417 6 19.6464 6H16.6C16.2686 6 16 5.73137 16 5.4Z"
                        fill="currentColor"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </span>
            <p class="light-gray">Uh oh! nothing found on database.</p>
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
