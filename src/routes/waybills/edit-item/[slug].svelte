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
    let waybillId;

    const stock_release = field("stock_release", null, [required()]);
    const stock_release_item = field("stock_release_item", null, [required()]);

    let remark = "";

    const formChildItem = form(stock_release, stock_release_item);

    let stock_releases = [];
    let stock_release_items = [];

    let waybill_items = [];

    let errors;


    async function add() {
        await formChildItem.validate();
        if (!$formChildItem.valid || waybill_items.length > 0 ) {
            return;
        }

        try {
            let response = await put({
                path: "waybill-items/" + slug + "?populate=%2A",
                data: {
                    data: {
                        // waybill: waybillId,
                        stock_release_item: $stock_release_item.value.value ,
                        remark: remark
                    },
                },
            });

            console.log("Edit Waybill Request  ", response);

            if (response.data?.id) {
                toast.push("Waybill Edited Successfully!", {
                    duration: 20000,
                    theme: {
                        "--toastBackground": "#48BB78",
                        "--toastBarBackground": "#2F855A",
                    },
                });

                createActivityLog("Waybill", response.data, "Edit", response.data.id)

                goto("waybills/edit/" + waybillId)
            }
        } catch (e) {
            console.log("Error Edit Waybill   ", e);

            errors = e.error?.details?.errors;

            toast.push(
                "Waybill Item Could Not Be Edited! \n\n" + e.error?.message,
                {
                    duration: 20000,
                    theme: {
                        "--toastBackground": "#bb4848",
                        "--toastBarBackground": "#852f2f",
                    },
                }
            );
        }
    }



    async function getStockReleases(consortium) {
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
                            $in: [consortium],
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
        if(stock_releases.length == 0) {
            return
        }
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
                populate: ['waybill','stock_release_item', 'stock_release_item.stock_release', 'stock_release_item.stock_release.consortium_member' ,'stock_release_item.purchase_order_item', 'stock_release_item.purchase_order_item.item', 'stock_release_item.purchase_order_item.purchase_order']
            };
            params = qs.stringify(params, {
                encodeValuesOnly: true,
            });

            let response = await get("waybill-items/" + slug, params);

            console.log("Get Waybill by ID ", response);

            getStockReleases(response.data?.attributes.stock_release_item.data?.attributes.stock_release.data?.attributes.consortium_member.data?.id)

            stock_release.set({
                value: response.data?.attributes.stock_release_item.data?.attributes.stock_release.data?.id,
                    label:
                        "SRF# - " +
                        response.data?.attributes.stock_release_item.data?.attributes.stock_release.data?.id +
                        "  ------- Date   " +
                        response.data?.attributes.stock_release_item.data?.attributes.stock_release.data?.attributes.date,
                    data: response.data?.attributes.stock_release_item.data?.attributes.stock_release.data,
            })

            stock_release_item.set({
                value: response.data?.attributes.stock_release_item.data?.id,
                    label:
                    response.data?.attributes.stock_release_item.data?.attributes.purchase_order_item.data?.attributes.item
                            .data.attributes.name +
                        "-" +
                        response.data?.attributes.stock_release_item.data?.attributes.purchase_order_item.data?.attributes.item
                            .data.attributes.category +
                        "  --- Unit - " +
                        response.data?.attributes.stock_release_item.data?.attributes.purchase_order_item.data?.attributes.unit +
                        " - Pieces - " +
                        response.data?.attributes.stock_release_item.data?.attributes.purchase_order_item.data?.attributes
                            .pieces +
                        " - Quantity - " +
                        response.data?.attributes.stock_release_item.data?.attributes.quantity +
                        " - Unit Price - " +
                        response.data?.attributes.stock_release_item.data?.attributes.purchase_order_item.data?.attributes
                            .unitPrice +
                        " - Currency - " +
                        response.data?.attributes.stock_release_item.data?.attributes.purchase_order_item.data?.attributes
                            .currency +
                        "    ID    " +
                        response.data?.attributes.stock_release_item.data?.id,
                    data: response.data?.attributes.stock_release_item.data,
            });

            remark = response.data?.attributes.remark;


            waybillId = response.data?.attributes.waybill?.data?.id;

            // getStockReleases(response.data?.attributes.waybill?.data?.attributes.consortium_member.data?.id);
            
        } catch (e) {
            console.log("Error get Waybill Item by ID ", e);
        }
    }

    $: if (slug) {
        getItem();
    }
</script>

<svelte:head>
    <title>Edit Waybill</title>
</svelte:head>

<br /><br />
<div class="container px-6">
    <a href="waybills/edit/{waybillId}" class="has-text-dark"
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
                    disabled={!$formChildItem.valid || !$formChildItem.dirty}
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

    :global(.selectContainer .listContainer .listItem) {
        font-size: 14px;
    }

    :global(.button.is-success svg *, .button.is-danger svg *, .button.is-info
            svg
            *) {
        color: white;
    }
</style>
