<script context="module">
    export async function preload(params) {
        return { slug: parseInt(params.params.slug) };
    }
</script>

<script>
    import { form, field } from "svelte-forms";
    import { required } from "svelte-forms/validators";
    import { get, post, put, del } from "../../../lib/api";
    import { goto } from "@sapper/app";
    import { toast } from "@zerodevx/svelte-toast";
    import {
        faAngleLeft,
        faEdit,
        faPlus,
        faTimes,
    } from "@fortawesome/free-solid-svg-icons";
    import Icon from "svelte-awesome/components/Icon.svelte";
    import { numberWithCommas } from "../../../lib";
    import Select from "svelte-select";
    import { DateInput } from "date-picker-svelte";
    import qs from "qs";
    import DeleteConfirmation from "../../../widgets/modals/DeleteConfirmation.svelte";
    import { createActivityLog } from "../../../utils/activity/log";

    export let slug;

    const destination = field("destination", "", [required()]);
    const category = field("category", "", [required()]);
    const consortium_member = field("consortium_member", "", [required()]);
    const date = field("date", new Date(), [required()]);

    const transporterName = field("transporterName", "", []);
    const transporterPhone = field("transporterPhone", "", []);
    const transporterType = field("transporterType", "", []);
    const driverName = field("driverName", "", []);
    const driverPhone = field("driverPhone", "", []);
    const driverPlateNo = field("driverPlateNo", "", []);
    const driverTransportType = field("driverTransportType", "", []);
    const consigneeName = field("consigneeName", "", []);
    const consigneeAddress = field("consigneeAddress", "", []);
    const consigneePhone = field("consigneePhone", "", []);

    const formItem = form(destination, category, consortium_member, date);

    const stock_release = field("stock_release", null, [required()]);
    const stock_release_item = field("stock_release_item", null, [required()]);

    let remark = "";

    const formChildItem = form(stock_release, stock_release_item);

    let childItems = [];
    let childItemsExisting = [];

    let consortium_members = [];
    let stock_releases = [];
    let stock_release_items = [];

    let waybill_items = [];

    let errors;

    let currentItem;
    let showConfirmation = false;

    async function add() {
        await formItem.validate();
        if (!$formItem.valid) {
            return;
        }

        try {
            let response = await put({
                path: "waybills/" + slug + "?populate=%2A",
                data: {
                    data: {
                        destination: $destination.value,
                        category: $category.value,
                        consortium_member: $consortium_member.value.value,
                        date: $date.value,

                        transporterName: $transporterName.value,
                        transporterPhone: $transporterPhone.value,
                        transporterType: $transporterType.value,
                        driverName: $driverName.value,
                        driverPhone: $driverPhone.value,
                        driverPlateNo: $driverPlateNo.value,
                        driverTransportType: $driverTransportType.value,
                        consigneeName: $consigneeName.value,
                        consigneeAddress: $consigneeAddress.value,
                        consigneePhone: $consigneePhone.value,
                    },
                },
            });

            console.log("Add Waybill Request  ", response);

            if (response.data?.id) {
                toast.push("Waybill Edited Successfully!", {
                    duration: 20000,
                    theme: {
                        "--toastBackground": "#48BB78",
                        "--toastBarBackground": "#2F855A",
                    },
                });

                createActivityLog(
                    "Waybill",
                    response.data,
                    "Edit",
                    response.data.id
                );

                saveItems(response.data);
            }
        } catch (e) {
            console.log("Error Add Waybill   ", e);

            errors = e.error?.details.errors;

            toast.push("Waybill Could Not Be Edited! \n\n" + e.error?.message, {
                duration: 20000,
                theme: {
                    "--toastBackground": "#bb4848",
                    "--toastBarBackground": "#852f2f",
                },
            });
        }
    }

    async function saveItems(waybill) {
        try {
            childItems.forEach(async (element) => {
                let response = await post({
                    path: "waybill-items?populate=%2A",
                    data: {
                        data: {
                            waybill: waybill.id,
                            stock_release_item:
                                element.stock_release_item.value,
                            remark: element.remark,
                        },
                    },
                });

                console.log("Save Waybill Items ", response);

                if (response.data) {
                    createActivityLog(
                        "Waybill Item",
                        response.data,
                        "Create",
                        response.data.id
                    );
                }
            });

            goto("waybills");
        } catch (e) {
            console.log("Error Waybill Items ", e);
        }
    }

    async function addItem() {
        await formChildItem.validate();
        if (!$formChildItem.valid || waybill_items.length > 0) {
            return;
        }

        console.log("Add Item ", $stock_release_item.value);

        childItems = [
            ...childItems,
            {
                index: childItems.length,
                stock_release_item: $stock_release_item.value,
                srf_no: $stock_release.value.data?.id,
                unit: $stock_release_item.value.data?.attributes
                    .purchase_order_item.data?.attributes.unit,
                pieces: $stock_release_item.value.data?.attributes
                    .purchase_order_item.data?.attributes.pieces,
                currency:
                    $stock_release_item.value.data?.attributes
                        .purchase_order_item.data?.attributes.currency,
                quantity: $stock_release_item.value.data?.attributes.quantity,
                unitPrice:
                    $stock_release_item.value.data?.attributes
                        .purchase_order_item.data?.attributes.unitPrice,
                remark: remark,
            },
        ];

        formChildItem.reset();
        remark = "";

        console.log(childItems);

        toast.push("Waybill Item Added Successfully!", {
            duration: 20000,
            theme: {
                "--toastBackground": "#48BB78",
                "--toastBarBackground": "#2F855A",
            },
        });
    }

    function removeChildItem(index) {
        childItems = childItems.filter(
            (x) => x.index != childItems[index].index
        );
    }
    function removeChildItemExisting(child) {
        currentItem = child;
        showConfirmation = true;
    }

    async function deleteItem() {
        showConfirmation = false;

        try {
            let response = await del("waybill-items/" + currentItem.id, null);

            console.log("Delete Waybill Item Request  ", response);

            if (response.data?.id) {
                toast.push("Waybill Item Deleted Successfully!", {
                    duration: 20000,
                    theme: {
                        "--toastBackground": "#48BB78",
                        "--toastBarBackground": "#2F855A",
                    },
                });

                createActivityLog(
                    "Waybill Item",
                    currentItem,
                    "Delete",
                    currentItem.id
                );

                getItem();
            }
        } catch (e) {
            console.log("Error Delete Waybill Item  ", e);
        }
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

            consortium_members = response.data.map((x) => {
                return {
                    value: x.id,
                    label: x.attributes.name,
                    data: x,
                };
            });
        } catch (e) {
            console.log("Error Get Consortium Members ", e);
        }
    }

    async function getStockReleases(event) {
        stock_release.set("");
        stock_release_item.set("");

        try {
            let params = {
                populate: [
                    "consortium_member",
                    "stock_release_items",
                    "stock_release_items.purchase_order_item",
                    "stock_release_items.purchase_order_item.purchase_order",
                    "stock_release_items.purchase_order_item.item",
                ],
                filters: {
                    consortium_member: {
                        id: {
                            $in: [$consortium_member.value.value],
                        },
                    },
                },
                "pagination[limit]": -1,
            };
            params = qs.stringify(params, {
                encodeValuesOnly: true,
            });
            let response = await get("stock-releases", params);

            console.log("Get Stock Release ", response);

            stock_releases = response.data.map((x) => {
                return {
                    value: x.id,
                    label:
                        "SRF# - " +
                        x.id +
                        "  ------- Date   " +
                        x.attributes.date,
                    data: x,
                };
            });
        } catch (e) {
            console.log("Error Stock Release ", e);
        }
    }

    async function getStockReleaseItems(event) {
        if (event.detail?.value) {
            console.log(
                stock_releases.filter((x) => x.value == event.detail.value)[0]
                    .data?.attributes
            );
            stock_release_items = stock_releases.filter(
                (x) => x.value == event.detail.value
            )[0].data?.attributes.stock_release_items.data;

            stock_release_items = stock_release_items.map((x) => {
                return {
                    value: x.id,
                    label:
                        x.attributes.purchase_order_item.data?.attributes.item
                            .data.attributes.name +
                        "-" +
                        x.attributes.purchase_order_item.data?.attributes.item
                            .data.attributes.category +
                        "  --- Unit - " +
                        x.attributes.purchase_order_item.data?.attributes.unit +
                        " - Pieces - " +
                        x.attributes.purchase_order_item.data?.attributes
                            .pieces +
                        " - Quantity - " +
                        x.attributes.quantity +
                        " - Unit Price - " +
                        x.attributes.purchase_order_item.data?.attributes
                            .unitPrice +
                        " - Currency - " +
                        x.attributes.purchase_order_item.data?.attributes
                            .currency +
                        "    ID    " +
                        x.id,
                    data: x,
                };
            });
        }
    }

    async function getWaybillItems(event) {
        console.log("--------------", event, event.detail.data?.id);
        try {
            let params = {
                populate: [
                    "waybill",
                    "stock_release_item",
                    "stock_release_item.stock_release",
                    "stock_release_item.stock_release.consortium_member",
                    "stock_release_item.purchase_order_item",
                    "stock_release_item.purchase_order_item.purchase_order",
                    "stock_release_item.purchase_order_item.item",
                ],
                filters: {
                    stock_release_item: {
                        id: {
                            $in: [event.detail.data?.id],
                        },
                    },
                    waybill: {
                        id: {
                            $notIn: [null],
                        },
                    },
                },
                "pagination[limit]": -1,
            };
            params = qs.stringify(params, {
                encodeValuesOnly: true,
            });
            let response = await get("waybill-items", params);

            console.log("Get Waybill Items ", response);

            waybill_items = response.data.filter( x => x.attributes.waybill.data );
        } catch (e) {
            console.log("Error Waybill Items ", e);
        }
    }

    async function getItem() {
        try {
            let params = {
                populate: [
                    "consortium_member",
                    "waybill_items",
                    "waybill_items.stock_release_item",
                    "waybill_items.stock_release_item.stock_release",
                    "waybill_items.stock_release_item.purchase_order_item",
                    "waybill_items.stock_release_item.purchase_order_item.item",
                    "waybill_items.stock_release_item.purchase_order_item.purchase_order",
                ],
            };
            params = qs.stringify(params, {
                encodeValuesOnly: true,
            });

            let response = await get("waybills/" + slug, params);

            console.log("Get Waybill by ID ", response);

            consortium_member.set({
                value: response.data.attributes.consortium_member.data?.id,
                label: response.data.attributes.consortium_member.data
                    ?.attributes.name,
            });
            date.set(new Date(response.data.attributes.date));
            category.set(response.data.attributes.category);
            destination.set(response.data.attributes.destination);

            transporterName.set(response.data.attributes.transporterName);
            transporterPhone.set(response.data.attributes.transporterPhone);
            transporterType.set(response.data.attributes.transporterType);
            driverName.set(response.data.attributes.driverName);
            driverPhone.set(response.data.attributes.driverPhone);
            driverPlateNo.set(response.data.attributes.driverPlateNo);
            driverTransportType.set(response.data.attributes.driverTransportType);
            consigneeName.set(response.data.attributes.consigneeName);
            consigneeAddress.set(response.data.attributes.consigneeAddress);
            consigneePhone.set(response.data.attributes.consigneePhone);

            childItemsExisting = response.data.attributes.waybill_items.data;
        } catch (e) {
            console.log("Error get Waybill by ID ", e);
        }
    }

    $: if (slug) {
        getItem();
        getConsortiumMembers();
    }
</script>

<svelte:head>
    <title>Edit Waybill</title>
</svelte:head>

<br /><br />
<div class="container px-6">
    <a href="waybills" class="has-text-dark"
        ><span class="icon is-small"><Icon data={faAngleLeft} /></span> Back</a
    >
    <br /><br />
    <div class="card px-6">
        <br /><br />
        <div class="columns">
            <div class="column">
                <h3 class="my-0">Edit Waybill</h3>
                <p class="gray py-0">Complete the form below and click save.</p>
            </div>
            <div class="column has-text-right">
                <button
                    disabled={!$formItem.valid || !$formItem.dirty}
                    on:click|preventDefault={add}
                    class="button is-dark my-2 px-5 py-2 has-text-weight-bold"
                    >Save</button
                >
            </div>
        </div>

        <br />

        {#if errors}
            {#each errors as e}
                <div class="notification is-danger">
                    <span class="has-text-weight-bold">{e.path}</span>
                    <br />{e.message}
                </div>
            {/each}
        {/if}
        <!-- svelte-ignore component-name-lowercase -->
        <form>
            <div class="columns">
                <div class="column">
                    <div class="field">
                        <label for="" class="gray">Consortium Member (*)</label>
                        <div class="control">
                            <Select
                                items={consortium_members}
                                on:select={getStockReleases}
                                bind:value={$consortium_member.value}
                                listAutoWidth={true}
                            />
                        </div>
                        {#if $formItem.hasError("consortium_member.required")}
                            <p class="help is-danger">
                                Consortium Member is required
                            </p>
                        {/if}
                    </div>
                </div>

                <div class="column">
                    <div class="field">
                        <label for="" class="gray">Date</label><br />
                        <div class="control">
                            <DateInput
                                bind:value={$date.value}
                                format="yyyy/MM/dd"
                                placeholder="2000/31/12"
                                closeOnSelection={true}
                                min={new Date("1920/1/1")}
                                class="input"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div class="columns">
                <div class="column">
                    <div class="field">
                        <label for="" class="gray">Destination (*)</label>
                        <div class="control">
                            <input
                                type="text"
                                class="input"
                                bind:value={$destination.value}
                            />
                        </div>
                        {#if $formItem.hasError("destination.required")}
                            <p class="help is-danger">
                                Destination is required
                            </p>
                        {/if}
                    </div>
                </div>
                <div class="column">
                    <div class="field">
                        <label for="" class="gray">Category</label><br />
                        <div class="control select is-fullwidth">
                            <select
                                name="category"
                                bind:value={$category.value}
                            >
                                <option value="Health">Health</option>
                                <option value="Wash">Wash</option>
                                <option value="ES/NFI">ES/NFI</option>
                            </select>
                            {#if $formItem.hasError("category.required")}
                                <p class="help is-danger">
                                    Category is required
                                </p>
                            {/if}
                        </div>
                    </div>
                </div>
            </div>

            <h5>Transport Information</h5>

            <div class="columns">
                <div class="column">
                    <div class="field">
                        <label for="" class="gray">Transporter Name</label>
                        <div class="control">
                            <input
                                type="text"
                                class="input"
                                bind:value={$transporterName.value}
                            />
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="field">
                        <label for="" class="gray">Transporter Phone</label>
                        <div class="control">
                            <input
                                type="text"
                                class="input"
                                bind:value={$transporterPhone.value}
                            />
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="field">
                        <label for="" class="gray">Transporter Type</label><br
                        />
                        <div class="control select is-fullwidth">
                            <select
                                name="category"
                                bind:value={$transporterType.value}
                            >
                                <option value="Commercial">Commercial</option>
                                <option value="Own">Own</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <h5>Driver Information</h5>
            <div class="columns">
                <div class="column">
                    <div class="field">
                        <label for="" class="gray">Driver Name</label>
                        <div class="control">
                            <input
                                type="text"
                                class="input"
                                bind:value={$driverName.value}
                            />
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="field">
                        <label for="" class="gray">Plate No.</label>
                        <div class="control">
                            <input
                                type="text"
                                class="input"
                                bind:value={$driverPlateNo.value}
                            />
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="field">
                        <label for="" class="gray">Transport Type</label><br />
                        <div class="control select is-fullwidth">
                            <select
                                name="category"
                                bind:value={$driverTransportType.value}
                            >
                                <option value="Road">Road</option>
                                <option value="Rail">Rail</option>
                                <option value="Air">Air</option>
                                <option value="Sea">Sea</option>
                                <option value="Hand Carry">Hand Carry</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div class="columns">
                <div class="column">
                    <div class="field">
                        <label for="" class="gray">Driver Phone</label>
                        <div class="control">
                            <input
                                type="text"
                                class="input"
                                bind:value={$driverPhone.value}
                            />
                        </div>
                    </div>
                </div>
                <div class="column" />
                <div class="column" />
            </div>

            <h5>Cosignee Information</h5>
            <div class="columns">
                <div class="column">
                    <div class="field">
                        <label for="" class="gray">Cosignee Name</label>
                        <div class="control">
                            <input
                                type="text"
                                class="input"
                                bind:value={$consigneeName.value}
                            />
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="field">
                        <label for="" class="gray">Address</label>
                        <div class="control">
                            <input
                                type="text"
                                class="input"
                                bind:value={$consigneeAddress.value}
                            />
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="field">
                        <label for="" class="gray">Phone No.</label>
                        <div class="control">
                            <input
                                type="text"
                                class="input"
                                bind:value={$consigneePhone.value}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <br /><br />

            <br />
        </form>

        <h5>Existing Items</h5>
        <hr />
        {#each childItemsExisting as child}
            <div class="columns">
                <div class="column is-narrow">
                    <div class="tag is-rounded has-text-weight-bold is-large">
                        {child.id}
                    </div>
                </div>
                <div class="column is-3">
                    {child.attributes.stock_release_item.data?.attributes
                        .purchase_order_item.data?.attributes.item?.data
                        ?.attributes.name} <br />
                    <span class="gray is-size-7">{child.attributes.remark}</span
                    >
                </div>
                <div class="column has-text-centered">
                    <div class="tag is-rounded is-small">PO#</div>
                    <br />
                    {child.attributes.stock_release_item.data?.attributes
                        .purchase_order_item.data?.attributes.purchase_order
                        ?.data?.attributes.poNumber}
                </div>
                <div class="column has-text-centered">
                    <div class="tag is-rounded is-small">Unit</div>
                    <br />
                    {child.attributes.stock_release_item.data?.attributes
                        .purchase_order_item.data?.attributes.unit}
                </div>
                <div class="column has-text-centered">
                    <div class="tag is-rounded is-small">Pieces</div>
                    <br />
                    {child.attributes.stock_release_item.data?.attributes
                        .purchase_order_item.data?.attributes.pieces}
                </div>

                <div class="column has-text-centered">
                    <div class="tag is-rounded is-small">Currency</div>
                    <br />
                    {child.attributes.stock_release_item.data?.attributes
                        .purchase_order_item.data?.attributes.currency}
                </div>
                <div class="column has-text-centered">
                    <div class="tag is-rounded is-small">Unit Price</div>
                    <br />
                    {numberWithCommas(
                        child.attributes.stock_release_item.data?.attributes
                            .purchase_order_item.data?.attributes.unitPrice
                    )}
                </div>
                <div class="column has-text-centered">
                    <div class="tag is-rounded is-small">Total</div>
                    <br />
                    {numberWithCommas(
                        child.attributes.stock_release_item.data?.attributes
                            .purchase_order_item.data?.attributes.unitPrice *
                            child.attributes.stock_release_item.data?.attributes
                                .quantity
                    )}
                </div>
                <div class="column has-text-centered">
                    <div class="tag is-rounded is-small has-text-weight-bold">
                        Quantity
                    </div>
                    <br />
                    {numberWithCommas(
                        child.attributes.stock_release_item.data?.attributes
                            .quantity
                    )}
                </div>
                <div class="column has-text-right is-flex">
                    <a
                        href="waybills/edit-item/{child.id}"
                        class="button is-info"
                    >
                        <span class="icon">
                            <Icon data={faEdit} />
                        </span>
                    </a>
                    <button
                        on:click={() => removeChildItemExisting(child)}
                        class="button is-danger ml-2"
                    >
                        <span class="icon">
                            <Icon data={faTimes} />
                        </span>
                    </button>
                </div>
            </div>
            <hr />
        {/each}

        <h5>New Items</h5>
        <hr />
        {#each childItems as child, index}
            <div class="columns">
                <div class="column is-narrow">
                    <div class="tag is-rounded has-text-weight-bold is-large">
                        {index + 1}
                    </div>
                </div>
                <div class="column is-3">
                    {child.stock_release_item.label} <br />
                    <span class="gray is-size-7">{child.remark}</span>
                </div>
                <div class="column has-text-centered">
                    <div class="tag is-rounded is-small">SRF #</div>
                    <br />
                    {child.srf_no}
                </div>
                <div class="column has-text-centered">
                    <div class="tag is-rounded is-small">Unit</div>
                    <br />
                    {child.unit}
                </div>
                <div class="column has-text-centered">
                    <div class="tag is-rounded is-small">Pieces</div>
                    <br />
                    {child.pieces}
                </div>
                <div class="column has-text-centered">
                    <div class="tag is-rounded is-small">Currency</div>
                    <br />
                    {child.currency}
                </div>
                <div class="column has-text-centered">
                    <div class="tag is-rounded is-small">Unit Price</div>
                    <br />
                    {numberWithCommas(child.unitPrice)}
                </div>
                <div class="column has-text-centered">
                    <div class="tag is-rounded is-small">Total</div>
                    <br />
                    {numberWithCommas(child.unitPrice * child.quantity)}
                </div>

                <div class="column has-text-centered">
                    <div class="tag is-rounded is-small has-text-weight-bold">
                        Quantity
                    </div>
                    <br />
                    {numberWithCommas(child.quantity)}
                </div>
                <div class="column has-text-right">
                    <button
                        on:click={() => removeChildItem(index)}
                        class="button is-danger"
                    >
                        <span class="icon">
                            <Icon data={faTimes} />
                        </span>
                    </button>
                </div>
            </div>
            <hr />
        {/each}

        <!-- svelte-ignore component-name-lowercase -->
        <form>
            <div class="columns">
                <div class="column">
                    <h4 class="my-0">Waybill Items</h4>
                </div>
                <div class="column has-text-right">
                    <button
                        disabled={!$formItem.valid || !$formItem.dirty}
                        on:click|preventDefault={addItem}
                        class="button is-success"
                    >
                        <span class="icon">
                            <Icon data={faPlus} />
                        </span>
                        <span class="has-text-white has-text-weight-bold"
                            >Add a Waybill Item</span
                        >
                    </button>
                </div>
            </div>

            <div class="columns">
                <div class="column">
                    <div class="field">
                        <label for="" class="gray">Stock Release (*)</label>
                        <div class="control">
                            <Select
                                items={stock_releases}
                                on:select={getStockReleaseItems}
                                bind:value={$stock_release.value}
                                listAutoWidth={true}
                            />
                        </div>
                        {#if $formChildItem.hasError("stock_release.required")}
                            <p class="help is-danger">
                                Purchase Order is required
                            </p>
                        {/if}
                    </div>
                </div>
            </div>

            <div class="columns">
                <div class="column">
                    <div class="field">
                        <label for="" class="gray">Stock Release Item (*)</label
                        >
                        <div class="control">
                            <Select
                                on:select={getWaybillItems}
                                items={stock_release_items}
                                bind:value={$stock_release_item.value}
                                hasError={waybill_items.length > 0}
                            />
                        </div>
                        {#if $formChildItem.hasError("stock_release_item.required")}
                            <p class="help is-danger">
                                Waybill Item is required
                            </p>
                        {/if}
                    </div>
                </div>
            </div>

            <div class="columns">
                <div class="column">
                    <div class="field">
                        <label for="" class="gray">Remark</label><br />
                        <div class="control is-fullwidth">
                            <textarea
                                rows="1"
                                class="textarea"
                                bind:value={remark}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {#if waybill_items}
                <h5>Waybill History</h5>
                <hr />
                {#each waybill_items as s}
                    <div class="columns has-text-weight-bold">
                        <div class="column is-narrow">
                            {s.attributes.stock_release_item.data?.attributes
                                .stock_release.data.id}
                        </div>
                        <div class="column">
                            {s.attributes.stock_release_item.data?.attributes
                                .stock_release.data.attributes.date}
                        </div>
                        <div class="column">
                            {s.attributes.stock_release_item.data?.attributes
                                .stock_release.data.attributes.consortium_member
                                ?.data.attributes.name}
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column is-narrow gray">
                            {s.id}
                        </div>

                        <div class="column is-3">
                            <span class=""
                                >{s.attributes.stock_release_item.data
                                    ?.attributes.purchase_order_item?.data
                                    ?.attributes.item?.data?.attributes.name} - ({s
                                    .attributes.stock_release_item.data
                                    ?.attributes.purchase_order_item?.data
                                    ?.id})</span
                            >
                            <br />
                            <span class="gray"
                                >{s.attributes.stock_release_item.data
                                    ?.attributes.purchase_order_item?.data
                                    ?.attributes.item?.data?.attributes
                                    .category}</span
                            >
                        </div>

                        <div class="column has-text-centered">
                            <span class="is-small tag">Unit</span> <br />
                            {s.attributes.stock_release_item.data?.attributes
                                .purchase_order_item?.data?.attributes.unit}
                        </div>

                        <div class="column has-text-centered">
                            <span class="is-small tag">Pieces</span> <br />
                            {s.attributes.stock_release_item.data?.attributes
                                .purchase_order_item?.data?.attributes.pieces}
                        </div>

                        <div class="column has-text-centered">
                            <span class="is-small tag">Quantity</span> <br />
                            {s.attributes.stock_release_item.data?.attributes
                                .purchase_order_item?.data?.attributes.quantity}
                        </div>

                        <div class="column has-text-centered">
                            <span class="is-small tag">Unit Price</span> <br />
                            {s.attributes.stock_release_item.data?.attributes
                                .purchase_order_item?.data?.attributes
                                .unitPrice}
                        </div>

                        <div class="column has-text-centered">
                            <span class="is-small tag">Currency</span> <br />
                            {s.attributes.stock_release_item.data?.attributes
                                .purchase_order_item?.data?.attributes.currency}
                        </div>

                        <div class="column has-text-centered">
                            <span class="is-small tag">Quantity</span> <br />
                            {s.attributes.stock_release_item.data?.attributes
                                .quantity}
                        </div>
                        <div class="column has-text-centered">
                            <span class="is-small tag">Remark</span> <br />
                            {s.attributes.remark}
                        </div>
                    </div>
                    <hr />
                {/each}
            {/if}
        </form>

        <br /><br />
    </div>
</div>

{#if showConfirmation}
    <DeleteConfirmation
        on:confirm={deleteItem}
        on:dismiss={() => (showConfirmation = false)}
    />
{/if}

<style>
    .card {
        overflow: visible !important;
    }

    .input,
    .select {
        border-radius: 5px;
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

    :global(.selectContainer .listContainer) {
        width: 200% !important;
        z-index: 10;
    }
    :global(.selectContainer .listContainer .listItem) {
        font-size: 14px;
    }

    :global(.button.is-success svg *, .button.is-danger svg *, .button.is-info
            svg
            *) {
        color: white;
    }
</style>
