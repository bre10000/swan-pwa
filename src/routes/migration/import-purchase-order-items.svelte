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

    let purchase_order_items = [];

    let purchase_orders = [];
    let items = [];

    const columns = [
        {
            key: "purchase_order",
            title: "PO #",
            sortable: true,
            filterValue: (v) => v.last_name.charAt(0).toLowerCase(),
            filterType: "string",
            selected: true,
        },
        {
            key: "date",
            title: "Date",
            sortable: true,
            filterValue: (v) => v.first_name.charAt(0).toLowerCase(),
            filterType: "string",
            selected: true,
        },
        {
            key: "item",
            title: "Item",
            sortable: true,
            filterValue: (v) => v.last_name.charAt(0).toLowerCase(),
            filterType: "string",
            selected: true,
        },
        {
            key: "currency",
            title: "Currency",
            sortable: true,
            filterValue: (v) => v.last_name.charAt(0).toLowerCase(),
            filterType: "string",
            selected: true,
        },
        {
            key: "unitPrice",
            title: "Unit Price",
            sortable: true,
            filterValue: (v) => v.last_name.charAt(0).toLowerCase(),
            filterType: "string",
            selected: true,
        },
        {
            key: "quantity",
            title: "Quantity",
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
        title: "Purchase Order Items Table",
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
        purchase_order_items = undefined;

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
                    header: ["poNumber", "category", "date", "item_name", "unit", "pieces" , "currency", "unitPrice", "quantity", "remark"],
                });
                temp.forEach((element, index) => {
                    element.id = index;
                    element.purchase_order = purchase_orders.filter( x => x.attributes.poNumber == element.poNumber)[0]
                    element.item = items.filter( x => (x.attributes.name.toLowerCase() == element.item_name.toLowerCase()) && (x.attributes.category == element.category) && (x.attributes.unit == element.unit) && (x.attributes.pieces == element.pieces))[0]
                });
                console.log(temp);

                cleanData(temp);
            }
        };
    };

    function cleanData(data) {
        console.log("Starting clean on ", data);
        purchase_order_items = data.filter((x) => x.poNumber && x.category && x.date && x.item_name && x.unit && x.pieces && x.unitPrice && x.quantity && x.item && x.purchase_order);
        console.log("Cleaned", purchase_order_items);

        let difference = data.filter(x => !purchase_order_items.includes(x));

        console.log({difference})
    }

    function selectRow(event) {
        let index = purchase_order_items.findIndex((x) => x.id == event.detail.id);
        purchase_order_items[index].selected = !event.detail.selected;
    }

    function selectAllRows(event) {
        event.detail.rows.forEach((element) => {
            if (element.status == "Done") {
                element.selected = false;
            }
        });

        purchase_order_items = event.detail.rows;
    }

    async function getPurchaseOrders() {
        try {
            let params = {
                "pagination[limit]": -1,
            };
            params = qs.stringify(params, {
                encodeValuesOnly: true,
            });
            let response = await get("purchase-orders", params);

            console.log("Get Purchase Orders ", response);

            purchase_orders = response.data;
        } catch (e) {
            console.log("Error Get Purchase Orders ", e);
        }
    }

    async function getItems() {
        try {
            let params = {
                "pagination[limit]": -1,
            };
            params = qs.stringify(params, {
                encodeValuesOnly: true,
            });
            let response = await get("items", params);

            console.log("Get Items ", response);

            items = response.data;
        } catch (e) {
            console.log("Error Get Items ", e);
        }
    }

    function saveSelected() {
        let numberOfPurchaseOrders = purchase_order_items.filter((x) => x.selected).length;

        console.log(numberOfPurchaseOrders);

        purchase_order_items
            .filter((x) => x.selected)
            .forEach(async (element, index) => {
                try {
                    let response = await post({
                        path: "purchase-order-items/",
                        data: {
                            data: {
                                date: new Date(element.date.toString()),
                                purchase_order: element.purchase_order.id,
                                item: element.item.id,
                                currency: element.currency.toString(),
                                unitPrice: parseFloat(element.unitPrice),
                                quantity: parseInt(element.quantity),
                                remark: element.remark?.toString(),
                            },
                        },
                    });

                    console.log("Add Purchase Order Item Request  ", response);

                    if (response.data?.id) {
                        let index = purchase_order_items.findIndex((x) => x.id == element.id);

                        purchase_order_items[index].status = "Done";
                        purchase_order_items[index].selected = false;
                    }
                } catch (e) {
                    let index = purchase_order_items.findIndex((x) => x.id == element.id);

                    purchase_order_items[index].status = "Error";
                    purchase_order_items[index].selected = false;

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

                    purchase_order_items[index].message = message;

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
                        purchase_order_items.filter((x) => x.status == "Done").length +
                            " Purchase Order Items Added Successfully!",
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

    onMount( () => {
        getItems();
        getPurchaseOrders();
    } )
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
                <h3 class="my-0">Import Purchase Order Items</h3>
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
            {#if purchase_order_items?.length > 0}
                <button
                    on:click={saveSelected}
                    class="button is-success is-light p-4 ml-4 has-text-weight-bold"
                >
                    Save Selected
                </button>
            {/if}
        </div>

        <br />

        {#if purchase_order_items?.length > 0}
            <DataTableItemImport
                {columns}
                bind:rows={purchase_order_items}
                {options}
                on:selectRow={selectRow}
                on:selectAllRows={selectAllRows}
            />
        {:else if purchase_order_items}
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
                <p class="light-gray">No Purchase Order Items Found in the file</p>
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
