<script>
    import { form, field } from "svelte-forms";
    import { required } from "svelte-forms/validators";
    import { get, post } from "../../lib/api";
    import { goto } from "@sapper/app";
    import { toast } from "@zerodevx/svelte-toast";
    import Icon from "svelte-awesome/components/Icon.svelte";
    import qs from "qs";
    import {
        faAngleLeft,
        faSave,
        faCrosshairs,
        faPlus,
        faTimes,
        faHistory,
    } from "@fortawesome/free-solid-svg-icons";
    import { onMount } from "svelte";
    import { DateInput } from "date-picker-svelte";
    import Select from "svelte-select";
    import { checkInput, numberWithCommas, checkValue } from "../../lib";
    import { createActivityLog } from "../../utils/activity/log";
    import UnsavedConfirmation from "../../widgets/modals/UnsavedConfirmation.svelte";

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

    let remark = "";

    let formChildItems = [];

    let consortium_members = [];
    let stock_releases = [];
    let stock_release_items = [];

    let categories = [];

    let errors;

    let unsavedItemsDialog;

    async function add() {
        await formItem.validate();
        if (!$formItem.valid) {
            return;
        }

        if (!validateChildItems()) {
            return;
        }

        try {
            let response = await post({
                path: "waybills?populate=%2A",
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
                toast.push("Waybill Added Successfully!", {
                    duration: 20000,
                    theme: {
                        "--toastBackground": "#48BB78",
                        "--toastBarBackground": "#2F855A",
                    },
                });
                createActivityLog(
                    "Waybill",
                    response.data,
                    "Create",
                    response.data.id
                );

                saveItems(response.data);
            }
        } catch (e) {
            console.log("Error Add Waybill   ", e);

            errors = e.error.details.errors;

            toast.push("Waybill Could Not Be Added! \n\n" + e.error.message, {
                duration: 20000,
                theme: {
                    "--toastBackground": "#bb4848",
                    "--toastBarBackground": "#852f2f",
                },
            });
        }
    }

    function validateChildItems() {
        formChildItems.forEach((element) => {
            if (
                checkInput(element.stock_release) &&
                checkInput(element.stock_release_item) &&
                checkInput(element.quantity)
            ) {
                if (element.amount < element.formQuantity) {
                    element.error =
                        "<b class='has-text-danger'> Waybill Item quantity exceeds stock release amount </b>";
                } else {
                    element.error = null;
                }
            } else {
                element.error =
                    "<b> Required field/s are missing </b> <br> " +
                    (checkInput(element.purchase_order)
                        ? ""
                        : " Purchase Order ") +
                    (checkInput(element.stock_release)
                        ? ""
                        : " Stock Release") +
                    (checkInput(element.stock_release_item)
                        ? ""
                        : " Stock Release Item") +
                    (checkInput(element.quantity) ? "" : " Quantity ");
            }
        });

        console.log("validate", { formChildItems });

        formChildItems = formChildItems;

        console.log(
            "Validate Result",
            formChildItems.filter((x) => checkInput(x.error))
        );

        if (formChildItems.filter((x) => checkInput(x.error)).length == 0) {
            return true;
        } else {
            $formItem.valid = true;
            formItem = formItem;
            return false;
        }
    }

    async function saveItems(waybill) {
        try {
            let params = {
                populate: [
                    "stock_release_item",
                    "stock_release_item.purchase_order_item",
                    ,
                    "stock_release_item.purchase_order_item.item",
                    ,
                    "stock_release_item.purchase_order_item.purchase_order",
                ],
            };
            params = qs.stringify(params, {
                encodeValuesOnly: true,
            });

            formChildItems.forEach(async (element) => {
                let response = await post({
                    path: "waybill-items?" + params,
                    data: {
                        data: {
                            waybill: waybill.id,
                            stock_release_item:
                                element.stock_release_item.value,
                            quantity: element.quantity,
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

    function addChildItem() {
        formChildItems = [
            ...formChildItems,
            {
                stock_releases: stock_releases,
                stock_release: "",
                stock_release_items: [],
                stock_release_item: "",
                quantity: "",

                remark: "",
                showHistory: false,

                id: Date.now(),
            },
        ];

        console.log("Form Child Items - ", { formChildItems });
    }

    function removeChildItem(id) {
        formChildItems = formChildItems.filter((x) => x.id != id);
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
        try {
            let params = {
                populate: [
                    "consortium_member",
                    "stock_release_items",
                    "stock_release_items.waybill_items",
                    "stock_release_items.waybill_items.waybill",
                    "stock_release_items.waybill_items.waybill.consortium_member",
                    "stock_release_items.waybill_items.stock_release_item",
                    "stock_release_items.waybill_items.stock_release_item.stock_release",
                    "stock_release_items.waybill_items.stock_release_item.purchase_order_item",
                    "stock_release_items.waybill_items.stock_release_item.purchase_order_item.purchase_order",
                    "stock_release_items.waybill_items.stock_release_item.purchase_order_item.item",
                    "stock_release_items.purchase_order_item",
                    "stock_release_items.purchase_order_item.purchase_order",
                    "stock_release_items.purchase_order_item.item",
                ],
                filters: {
                    consortium_member: {
                        id: {
                            $in: [event.detail.value],
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
                        "SRF# - " + x.id + "  --- Date   " + x.attributes.date,
                    data: x,
                };
            });
        } catch (e) {
            console.log("Error Stock Release ", e);
        }
    }

    async function getStockReleaseItems(event, childItem) {
        if (event.detail?.value) {
            stock_release_items =
                event.detail.data?.attributes.stock_release_items.data;

            let index = formChildItems.findIndex((x) => x.id == childItem.id);
            formChildItems[index].stock_release_item = "";
            formChildItems[index].stock_release = event.detail;

            formChildItems[index].stock_release_items = stock_release_items
                .filter(
                    (x) =>
                        x.attributes.purchase_order_item.data?.attributes.item
                            .data.attributes.category == $category.value
                )
                .map((x) => {
                    return {
                        value: x.id,
                        label:
                            x.attributes.purchase_order_item.data?.attributes
                                .item.data.attributes.name +
                            "-" +
                            x.attributes.purchase_order_item.data?.attributes
                                .item.data.attributes.category +
                            "  --- Unit - " +
                            x.attributes.purchase_order_item.data?.attributes
                                .item.data.attributes?.unit +
                            " - Pieces - " +
                            x.attributes.purchase_order_item.data?.attributes
                                .item.data.attributes?.pieces +
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

            console.log(formChildItems[index]);
        }
    }

    async function getRemaining(event, childItem) {
        if (event.detail?.value) {
            let index = formChildItems.findIndex((x) => x.id == childItem.id);
            formChildItems[index].stock_release_item = event.detail;

            let waybillAmount = 0;
            event.detail.data.attributes?.waybill_items?.data?.forEach(
                (element) => {
                    waybillAmount += parseInt(
                        element.attributes.quantity
                            ? element.attributes.quantity
                            : 0
                    );
                }
            );

            formChildItems[index].waybill_items =
                event.detail.data.attributes?.waybill_items?.data;
            formChildItems[index].amount =
                parseInt(event.detail.data.attributes.quantity) -
                parseInt(waybillAmount);

            let stock_item =
                event.detail.data.attributes.purchase_order_item.data;
            formChildItems[index].currency = stock_item?.attributes.currency;
            formChildItems[index].unitPrice = stock_item?.attributes.unitPrice;
            formChildItems[index].unit = stock_item?.attributes.item?.data
                ?.attributes.unit
                ? stock_item?.attributes.item?.data?.attributes.unit
                : "";
            formChildItems[index].pieces = stock_item?.attributes.item?.data
                ?.attributes.pieces
                ? stock_item?.attributes.item?.data?.attributes.pieces
                : "";

            console.log(
                "ahfdkjls",
                parseFloat(waybillAmount),
                parseFloat(event.detail.data.attributes.quantity) -
                    parseFloat(waybillAmount)
            );
            console.log("ahfdkjls", formChildItems[index]);
        }
    }

    function refreshRemaining(event) {
        let temp = 0;
        formChildItems
            .filter((x) => event.detail.data.id == x.stock_release_item?.value)
            .forEach((element) => {
                temp += parseFloat(element.quantity);
            });

        formChildItems.forEach((element) => {
            element.formQuantity = temp;
        });

        formChildItems = formChildItems;

        console.log("Refresh Remaining ", formChildItems);
    }

    async function getCategories() {
        try {
            let params = {
                "pagination[limit]": -1,
            };
            params = qs.stringify(params, {
                encodeValuesOnly: true,
            });
            let response = await get("categories", params);

            console.log("Get Categories ", response);

            categories = response.data.map((x) => x.attributes.name);
        } catch (e) {
            console.log("Error Get Categories ", e);
        }
    }

    onMount(() => {
        getConsortiumMembers();
        addChildItem();
        getCategories();
    });
</script>

<svelte:head>
    <title>Add Waybill</title>
</svelte:head>

<br /><br />
<div class="container px-6">
    <a
        href="waybills"
        on:click|preventDefault={() => (unsavedItemsDialog = true)}
        class="has-text-dark"
        ><span class="icon is-small"><Icon data={faAngleLeft} /></span> Back</a
    >
    <br /><br />

    <div class="card px-6">
        <br /><br />
        <div class="columns">
            <div class="column">
                <h3 class="my-0">Add Waybill</h3>
                <p class="gray py-0">Complete the form below and click save.</p>
            </div>
            <div class="column has-text-right">
                <button
                    disabled={!$formItem.valid && !$formItem.dirty}
                    on:click|preventDefault={add}
                    class="button is-dark my-2 px-5 py-2 has-text-weight-bold"
                    ><Icon data={faSave} />
                    <span class="ml-2 has-text-white">Save</span></button
                >
            </div>
        </div>

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
                                name="destination"
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
                                {#each categories as c}
                                    <option>{c}</option>
                                {/each}
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

            <br />
        </form>

        <!-- svelte-ignore component-name-lowercase -->
        <form>
            <div class="columns">
                <div class="column">
                    <h4 class="my-0">Waybill Items</h4>
                </div>
                <div class="column has-text-right">
                    <button
                        disabled={!$formItem.valid && !$formItem.dirty}
                        on:click|preventDefault={addChildItem}
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

            <div class="columns child-item">
                <div
                    class="column is-narrow has-text-weight-bold"
                    style="width: 50px;"
                >
                    No.
                </div>
                <div class="column  is-narrow" style="width: 120px;">
                    <label for="" class="gray">SRF #</label>
                </div>
                <div class="column  is-narrow" style="width: 200px;">
                    <label for="" class="gray">Item (*)</label>
                </div>
                <div class="column">
                    <label for="" class="gray">Unit Price</label>
                </div>
                <div class="column">
                    <label for="" class="gray">Remaining Amount</label>
                </div>

                <div class="column">
                    <label for="" class="gray">Quantity</label>
                </div>

                <div class="column">
                    <span class="has-text-weight-bold">Total</span>
                </div>
                <div class="column">
                    <label for="" class="gray">Remark</label>
                </div>
                <div
                    class="column is-narrow has-text-weight-bold"
                    style="width: 40px;"
                />
                <div
                    class="column is-narrow has-text-weight-bold"
                    style="width: 40px;"
                />
            </div>

            {#each formChildItems as childItem, index}
                <div class="columns child-item">
                    <div class="column is-narrow" style="width: 50px;">
                        <input
                            type="text"
                            class="input has-background-light border-radius-0 "
                            disabled
                            value={index + 1}
                        />
                    </div>
                    <div class="column is-narrow" style="width: 120px;">
                        <div class="field">
                            <div class="control">
                                <Select
                                    items={stock_releases}
                                    on:select={(event) =>
                                        getStockReleaseItems(event, childItem)}
                                    value={childItem.stock_release}
                                    listAutoWidth={true}
                                />
                            </div>
                        </div>
                    </div>

                    <div class="column is-narrow" style="width: 200px;">
                        <div class="field">
                            <div class="control">
                                <Select
                                    on:select={(event) =>
                                        getRemaining(event, childItem)}
                                    items={childItem.stock_release_items}
                                    value={childItem.stock_release_item}
                                />
                            </div>
                        </div>
                    </div>

                    <div class="column">
                        <input
                            type="text"
                            class="input has-background-light border-radius-0 "
                            disabled
                            value={childItem.unitPrice
                                ? childItem.unitPrice
                                : "-"}
                        />
                    </div>

                    <div class="column">
                        <input
                            type="text"
                            class="input has-background-light border-radius-0 "
                            disabled
                            value={childItem.amount
                                ? numberWithCommas(childItem.amount)
                                : "-"}
                        />
                    </div>

                    <div class="column">
                        <input
                            type="number"
                            min=0 on:input={checkValue}
                            placeholder="Quantity"
                            class="input"
                            on:change={() =>
                                refreshRemaining({
                                    detail: childItem.stock_release_item,
                                })}
                            class:is-danger={childItem.amount <
                                childItem.quantity}
                            bind:value={childItem.quantity}
                        />
                    </div>

                    <div class="column">
                        <input
                            type="text"
                            class="input has-background-light border-radius-0 "
                            disabled
                            on:change={() =>
                                refreshRemaining({
                                    detail: childItem.stock_item,
                                })}
                            value={childItem.quantity
                                ? numberWithCommas(
                                      childItem.quantity * childItem.unitPrice
                                  )
                                : "-"}
                        />
                    </div>

                    <div class="column">
                        <input
                                    rows="1"
                                    class="input has-background-light border-radius-0 "
                                    bind:value={childItem.remark}
                                />
                    </div>

                    <div
                        class="column is-narrow has-text-weight-bold input"
                        style="width: 40px;"
                    >
                        <!-- <button class="button is-info is-light ml-2"> <Icon data={faEdit}/></button> -->
                        <button
                            type="button border-radius-0"
                            on:click|preventDefault={() => {
                                removeChildItem(childItem.id);
                            }}
                            class="button is-danger"
                        >
                            <Icon data={faTimes} /></button
                        >
                    </div>
                    <div
                        class="column is-narrow has-text-weight-bold input"
                        style="width: 40px;"
                    >
                        <button
                            type="button"
                            on:click={() =>
                                (childItem.showHistory =
                                    !childItem.showHistory)}
                            class="button is-info"
                        >
                            <Icon data={faHistory} /></button
                        >
                    </div>
                </div>

                <div class="columns" class:is-hidden={!childItem.showHistory}>
                    <div class="column mx-2 p-4 has-background-light">
                        <br />

                        {#if childItem.waybill_items?.length > 0}
                            <h6>
                                <Icon data={faHistory} />

                                <span class="mx-4"> Waybill History </span>
                            </h6>
                            <hr />
                            {#each childItem.waybill_items as s}
                                <div class="columns has-text-weight-bold">
                                    <div class="column is-narrow">
                                        {s.attributes.stock_release_item.data
                                            ?.attributes.stock_release.data.id}
                                    </div>
                                    <div class="column">
                                        {s.attributes.waybill.data?.attributes
                                            .date}
                                    </div>
                                    <div class="column">
                                        {s.attributes.waybill.data?.attributes
                                            .consortium_member?.data.attributes
                                            .name}
                                    </div>
                                </div>
                                <div class="columns">
                                    <div class="column is-narrow gray">
                                        {s.id}
                                    </div>

                                    <div class="column is-3">
                                        <span class=""
                                            >{s.attributes.stock_release_item
                                                .data?.attributes
                                                .purchase_order_item?.data
                                                ?.attributes.item?.data
                                                ?.attributes.name} - ({s
                                                .attributes.stock_release_item
                                                .data?.attributes
                                                .purchase_order_item?.data
                                                ?.id})</span
                                        >
                                        <br />
                                        <span class="gray"
                                            >{s.attributes.stock_release_item
                                                .data?.attributes
                                                .purchase_order_item?.data
                                                ?.attributes.item?.data
                                                ?.attributes.category}</span
                                        >
                                    </div>

                                    <div class="column has-text-centered">
                                        <span class="is-small tag">Unit</span>
                                        <br />
                                        {s.attributes.stock_release_item.data
                                            ?.attributes.purchase_order_item
                                            ?.data?.attributes.item?.data
                                            ?.attributes.unit
                                            ? s.attributes.stock_release_item
                                                  .data?.attributes
                                                  .purchase_order_item?.data
                                                  ?.attributes.item?.data
                                                  ?.attributes.unit
                                            : "-"}
                                    </div>

                                    <div class="column has-text-centered">
                                        <span class="is-small tag">Pieces</span>
                                        <br />
                                        {s.attributes.stock_release_item.data
                                            ?.attributes.purchase_order_item
                                            ?.data?.attributes.item?.data
                                            ?.attributes.pieces
                                            ? s.attributes.stock_release_item
                                                  .data?.attributes
                                                  .purchase_order_item?.data
                                                  ?.attributes.item?.data
                                                  ?.attributes.pieces
                                            : "-"}
                                    </div>

                                    <div class="column has-text-centered">
                                        <span class="is-small tag"
                                            >Quantity</span
                                        > <br />
                                        {s.attributes.stock_release_item.data
                                            ?.attributes.purchase_order_item
                                            ?.data?.attributes.quantity}
                                    </div>

                                    <div class="column has-text-centered">
                                        <span class="is-small tag"
                                            >Unit Price</span
                                        > <br />
                                        {s.attributes.stock_release_item.data
                                            ?.attributes.purchase_order_item
                                            ?.data?.attributes.unitPrice}
                                    </div>

                                    <div class="column has-text-centered">
                                        <span class="is-small tag"
                                            >Currency</span
                                        > <br />
                                        {s.attributes.stock_release_item.data
                                            ?.attributes.purchase_order_item
                                            ?.data?.attributes.currency}
                                    </div>

                                    <div class="column has-text-centered">
                                        <span class="is-small tag"
                                            >Quantity</span
                                        > <br />
                                        {s.attributes?.quantity}
                                    </div>
                                    <div class="column has-text-centered">
                                        <span class="is-small tag">Remark</span>
                                        <br />
                                        {s.attributes.remark}
                                    </div>
                                </div>
                                <hr />
                            {/each}
                        {:else if childItem.waybill_items?.length == 0}
                            <br /><br />
                            <p class="has-text-centered">
                                No Waybill history found
                            </p>
                            <br /><br />
                        {:else}
                            <br /><br />
                            <p class="has-text-centered">Choose an Item</p>
                            <br /><br />
                        {/if}
                    </div>
                </div>

                {#if childItem.error}
                    <div class="columns px-3">
                        <div
                            class="column has-text-centered has-background-light has-text-danger p-4"
                        >
                            {@html childItem.error}
                        </div>
                    </div>
                {/if}
            {/each}
        </form>

        <br /><br />
    </div>
</div>

<br /><br /><br /><br /><br />

{#if unsavedItemsDialog}
    <UnsavedConfirmation
        on:confirm={() => goto("waybills")}
        on:dismiss={() => (unsavedItemsDialog = false)}
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
        width: 400% !important;
        z-index: 10;
    }

    :global(.selectContainer input) {
        border: 1px solid lightgray !important;
        border-right: 0px solid lightgray !important;
        border-radius: 0px;
        font-size: 0.9rem !important;
        height: 28px !important;
        /* background-color: #f5f5f5!important; */
    }
    :global(.selectContainer) {
        height: 28px !important;
    }

    :global(.selectContainer .listContainer .listItem) {
        font-size: 14px;
        border-radius: 0px;
    }

    :global(.button.is-success svg *, .button.is-danger svg *, .button.is-info
            svg
            *) {
        color: white;
    }
</style>
