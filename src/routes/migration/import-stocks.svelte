<script>
    import {
        faAngleLeft,
        faFileDownload,
        faUpload,
    } from "@fortawesome/free-solid-svg-icons";

    import Icon from "svelte-awesome/components/Icon.svelte";
    import { csv } from "csvtojson";
    import { utils, read, writeFileXLSX } from "xlsx";
    import { Jellyfish } from "svelte-loading-spinners";
    import { onMount } from "svelte";
    import qs from "qs";
    import { get, post } from "../../lib/api";
    import { toast } from "@zerodevx/svelte-toast";
    import { user } from "../../store/user";
    import { createActivityLog } from "../../utils/activity/log";
    import UnsavedConfirmation from "../../widgets/modals/UnsavedConfirmation.svelte";
    import DataTableItemImport from "../../widgets/table/migration/DataTableItemImport.svelte";

    let file, fileinput;
    let unsavedItemsDialog;

    let stocks = [];

    let consortium_members = [];

    const columns = [
        {
            key: "date",
            title: "Date",
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
            key: "old_id",
            title: "Old ID",
            sortable: true,
            filterValue: (v) => v.last_name.charAt(0).toLowerCase(),
            filterType: "string",
            selected: true,
        },

        {
            key: "status",
            title: "Status",
            sortable: true,
            filterValue: (v) => v.last_name.charAt(0).toLowerCase(),
            filterType: "string",
            selected: true,
        },
    ];

    let options = {
        title: "Stocks Table",
        showFilterHeader: false,
        showSelect: true,
        showDetails: false,
        showActions: false,
        showFooter: false,
    };

    const onFileSelected = (e) => {
        let image = e.target.files[0];
        let reader = new FileReader();
        file = e.target.files[0].name;

        console.log(e.target.files[0]);
        stocks = undefined;

        if (e.target.files[0].type == "text/csv") reader.readAsText(image);
        else {
            reader.readAsArrayBuffer(image);
        }
        reader.onload = (e2) => {
            if (e.target.files[0].type == "text/csv") {
                csv({
                    colParser: {
                        item_code: "string",
                        item_name: "string",
                        item_address: "string",
                    },
                    checkType: true,
                })
                    .fromString(e2.target.result)
                    .then((csvRow) => {
                        console.log(csvRow); // => [["1","2","3"], ["4","5","6"], ["7","8","9"]]
                        csvRow.forEach((element, index) => {
                            element.item_code = element["Bank Code"];
                            element.item_name = element["Bank Name"];
                            element.item_address = element["Bank Address"];

                            element.id = index;
                        });
                        cleanData(csvRow);
                    });
            } else {
                var data = e2.target.result;
                /* reader.readAsArrayBuffer(file) -> data will be an ArrayBuffer */
                var workbook = read(data);
                console.log(workbook.Sheets.Sheet1);

                // Iterate over all rows that have values in a worksheet
                let temp = utils.sheet_to_json(workbook.Sheets.Sheet1, {
                    raw: false,
                    header: [
                        "old_id",
                        "date",
                        "consortium_member_id",
                        "warehouse",
                        "consortium_member_name",
                    ],
                });
                temp.forEach((element, index) => {
                    element.id = index;
                    element.consortium_member = consortium_members.filter(
                        (x) =>
                            x.attributes.name == element.consortium_member_name
                    )[0];
                });
                console.log(temp);

                cleanData(temp);
            }
        };
    };

    function cleanData(data) {
        console.log("Starting clean on ", data);
        stocks = data.filter(
            (x) =>
                x.date &&
                x.consortium_member_id &&
                x.old_id &&
                x.warehouse &&
                x.consortium_member_name &&
                x.consortium_member
        );
        console.log("Cleaned", stocks);
    }

    function selectRow(event) {
        let index = stocks.findIndex((x) => x.id == event.detail.id);
        stocks[index].selected = !event.detail.selected;
    }

    function selectAllRows(event) {
        event.detail.rows.forEach((element) => {
            if (element.status == "Done") {
                element.selected = false;
            }
        });

        stocks = event.detail.rows;
    }

    async function getConsortiumMembers() {
        try {
            let params = {
                "pagination[limit]": -1,
            };
            params = qs.stringify(params, {
                encodeValuesOnly: true,
            });
            let response = await get("consortium-members", params);

            console.log("Get Consortium Members ", response);

            consortium_members = response.data;
        } catch (e) {
            console.log("Error Get Consortium Members ", e);
        }
    }

    function saveSelected() {
        let numberOfPurchaseOrders = stocks.filter((x) => x.selected).length;

        stocks
            .filter((x) => x.selected)
            .forEach(async (element, index) => {
                try {
                    let response = await post({
                        path: "stocks/",
                        data: {
                            data: {
                                date: new Date(element.date.toString()),
                                old_id: parseInt(element.old_id),
                                consortium_member: element.consortium_member.id,
                                warehouse: 1
                            },
                        },
                    });

                    console.log("Add Stock Request  ", response);

                    if (response.data?.id) {
                        let index = stocks.findIndex((x) => x.id == element.id);

                        stocks[index].status = "Done";
                        stocks[index].selected = false;
                    }
                } catch (e) {
                    let index = stocks.findIndex((x) => x.id == element.id);

                    stocks[index].status = "Error";
                    stocks[index].selected = false;

                    let message = "";

                    if (e.error?.details?.errors) {
                        e.error?.details?.errors.forEach((element) => {
                            message =
                                message +
                                element.message +
                                " - " +
                                element.path[0] +
                                "\n";
                        });
                    } else {
                        message = e.error?.message;
                    }

                    stocks[index].message = message;

                    // toast.push( message, {
                    //         duration: 20000,
                    //         theme: {
                    //             "--toastBackground": "red",
                    //             "--toastBarBackground": "darkred",
                    //         },
                    // });

                    console.log("Error Add Order   ", e);
                }

                if (index + 1 == numberOfPurchaseOrders) {
                    toast.push(
                        stocks.filter((x) => x.status == "Done").length +
                            " Stocks Added Successfully!",
                        {
                            duration: 20000,
                            theme: {
                                "--toastBackground": "#48BB78",
                                "--toastBarBackground": "#2F855A",
                            },
                        }
                    );
                }
            });
    }

    onMount(() => {
        getConsortiumMembers();
    });
</script>

<br /><br />
<div class="container px-6">
    <a
        href="received-stocks"
        on:click|preventDefault={() => (unsavedItemsDialog = true)}
        class="has-text-dark"
        ><span class="icon is-small"><Icon data={faAngleLeft} /></span> Back</a
    >
    <br /><br />

    <div class="card px-6">
        <br /><br />
        <div class="columns">
            <div class="column">
                <h3 class="my-0">Import Stocks</h3>
                <p class="gray py-0">Upload a Excel file to get started.</p>
            </div>
            <div class="column has-text-right">
                <a
                    href="./downloads/Sample Bank Data Upload.xlsx"
                    class="button is-light p-5"
                >
                    <span class="icon">
                        <Icon data={faFileDownload} />
                    </span>
                    <span class="has-text-weight-bold"
                        >Download Uploading Template</span
                    ></a
                >
            </div>
        </div>
        <br />

        <br />

        <div class="is-flex is-justify-content-center">
            <div class="file is-lightgreen is-large is-boxed has-name">
                <label class="file-label">
                    <input
                        class="file-input"
                        on:change={(e) => onFileSelected(e)}
                        bind:this={fileinput}
                        accept=" .xls, .xlsx, .csv"
                        type="file"
                        name="resume"
                    />
                    <span class="file-cta">
                        <span class="file-icon">
                            <Icon data={faUpload} scale="2" />
                        </span>
                        <span class="file-label is-fullwidth">
                            Upload your file
                        </span>
                    </span>
                    {#if file}
                        <span class="file-name is-size-6">
                            {file}
                        </span>
                    {/if}
                </label>
            </div>
        </div>

        <br />

        <div class="has-text-centered">
            {#if stocks?.length > 0}
                <button
                    on:click={saveSelected}
                    class="button is-success is-light p-4 ml-4 has-text-weight-bold"
                >
                    Save Selected
                </button>
            {/if}
        </div>

        <br />

        {#if stocks?.length > 0}
            <DataTableItemImport
                {columns}
                bind:rows={stocks}
                {options}
                on:selectRow={selectRow}
                on:selectAllRows={selectAllRows}
            />
        {:else if stocks}
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
                <p class="light-gray">No Stocks Found in the file</p>
                <br /><br /><br /><br />
            </div>
        {:else}
            <div class="has-text-centered">
                <br /><br /><br /><br />
                <div class="is-flex is-justify-content-center">
                    <Jellyfish
                        size="60"
                        color="#74cf6d"
                        unit="px"
                        duration="1s"
                    />
                </div>
                <!-- <p class="gray">Loading...</p> -->
                <br /><br /><br /><br />
            </div>
        {/if}

        <br /><br />
    </div>
</div>

{#if unsavedItemsDialog}
    <UnsavedConfirmation
        on:confirm={() => window.history.back()}
        on:dismiss={() => (unsavedItemsDialog = false)}
    />
{/if}

<style>
    .file.is-lightgreen .file-cta {
        background-color: rgba(151, 255, 140, 0.739) !important;
    }

    .card {
        overflow: visible !important;
    }
</style>
