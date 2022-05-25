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
    let poId;

    const item = field("item", null, [required()]);
    const unit = field("unit", "", [required()]);
    const pieces = field("pieces", "", [required()]);
    const currency = field("currency", "", [required()]);
    const quantity = field("quantity", "", [required()]);
    const unitPrice = field("unitPrice", "", [required()]);
    let remark = "";

    const formChildItem = form(
        item,
        unit,
        pieces,
        currency,
        quantity,
        unitPrice
    );

    let items = [];

    let errors;


    async function add() {
        await formChildItem.validate();
        if (!$formChildItem.valid) {
            return;
        }

        try {
            let response = await put({
                path: "purchase-order-items/" + slug + "?populate=%2A",
                data: {
                    data: {
                        item: $item.value.value,
                        unit: $unit.value,
                        pieces: $pieces.value,
                        quantity: $quantity.value,
                        currency: $currency.value,
                        unitPrice: $unitPrice.value,
                        remark: remark,
                    },
                },
            });

            console.log("Edit Purchase Order Item Request  ", response);

            if (response.data?.id) {
                toast.push("Purchase Order Item Edited Successfully!", {
                    duration: 20000,
                    theme: {
                        "--toastBackground": "#48BB78",
                        "--toastBarBackground": "#2F855A",
                    },
                });

                createActivityLog("Purchase Order Item", response.data, "Edit", response.data.id)

                goto("purchase-orders/edit/" + poId)
            }
        } catch (e) {
            console.log("Error Edit Purchase Order Item   ", e);

            errors = e.error?.details.errors;

            toast.push(
                "Purchase Order Item Could Not Be Edited! \n\n" + e.error.message,
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

            items = response.data.map((x) => {
                return {
                    value: x.id,
                    label: x.attributes.name + "-" + x.attributes.category,
                };
            });
        } catch (e) {
            console.log("Error Get Items ", e);
        }
    }

    async function getItem() {
        try {
            let params = {
                populate: '*'
            };
            params = qs.stringify(params, {
                encodeValuesOnly: true,
            });

            let response = await get("purchase-order-items/" + slug, params);

            console.log("Get Purchase Order Item by ID ", response);

            unit.set(response.data.attributes.unit);
            pieces.set(response.data.attributes.pieces);
            currency.set(response.data.attributes.currency);
            quantity.set(response.data.attributes.quantity);
            unitPrice.set(response.data.attributes.unitPrice);

            item.set({
                value: response.data.attributes.item.data?.id,
                label: response.data.attributes.item.data?.attributes.name + '-' + response.data.attributes.item.data?.attributes.category
            })
            
            remark = response.data.attributes.remark;

            poId = response.data.attributes.purchase_order.data?.id;
            
        } catch (e) {
            console.log("Error get Purchase Order Item by ID ", e);
        }
    }

    $: if (slug) {
        getItem();
        getItems();
    }
</script>

<svelte:head>
    <title>Edit Purchase Order Item</title>
</svelte:head>

<br /><br />
<div class="container px-6">
    <a href="purchase-orders/edit/{poId}" class="has-text-dark"
        ><span class="icon is-small"><Icon data={faAngleLeft} /></span> Back</a
    >
    <br /><br />
    <div class="card px-6">
        <br /><br />
        <div class="columns">
            <div class="column">
                <h3 class="my-0">Edit Purchase Order Item</h3>
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
                        <label for="" class="gray">Item (*)</label>
                        <div class="control">
                            <Select
                                {items}
                                bind:value={$item.value}
                                listAutoWidth={true}
                            />
                        </div>
                        {#if $formChildItem.hasError("item.required")}
                            <p class="help is-danger">Item is required</p>
                        {/if}
                    </div>
                </div>

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
            <div class="columns">
                <div class="column">
                    <label for="" class="gray">Unit</label><br />
                    <div class="control select is-fullwidth">
                        <select bind:value={$unit.value}>
                            <option>Ampule</option>
                            <option>Bag</option>
                            <option>Bolus</option>
                            <option>Bottle</option>
                            <option>Box</option>
                            <option>Carton</option>
                            <option>Capsule</option>
                            <option>Day</option>
                            <option>Drum</option>
                            <option>Dozen</option>
                            <option>Kit</option>
                            <option>Liter</option>
                            <option>Meter</option>
                            <option>Pack</option>
                            <option>Pad</option>
                            <option>Pair</option>
                            <option>Pages</option>
                            <option>Pcs</option>
                            <option>Ream</option>
                            <option>Kg</option>
                            <option>Refill</option>
                            <option>Roll</option>
                            <option>Quintal</option>
                            <option>Sachet</option>
                            <option>Set</option>
                            <option>Spots</option>
                            <option>Strip</option>
                            <option>Suppository</option>
                            <option>Tab</option>
                            <option>Tin</option>
                            <option>Trip</option>
                            <option>Tube</option>
                            <option>Vial</option>
                        </select>
                    </div>
                    {#if $formChildItem.hasError("unit.required")}
                        <p class="help is-danger">Unit is required</p>
                    {/if}
                </div>
                <div class="column">
                    <label for="" class="gray">Pieces</label><br />
                    <input
                        bind:value={$pieces.value}
                        type="number"
                        placeholder="Piece"
                        class="input"
                    />
                    {#if $formChildItem.hasError("pieces.required")}
                        <p class="help is-danger">Pieces is required</p>
                    {/if}
                </div>
                <div class="column">
                    <label for="" class="gray">Quantity</label><br />
                    <input
                        bind:value={$quantity.value}
                        type="number"
                        placeholder="Quantity"
                        class="input"
                    />
                    {#if $formChildItem.hasError("quantity.required")}
                        <p class="help is-danger">Quantity is required</p>
                    {/if}
                </div>
            </div>

            <div class="columns">
                <div class="column">
                    <label for="" class="gray">Currency</label><br />
                    <div class="control select is-fullwidth">
                        <select bind:value={$currency.value}>
                            <option>ETB (ETB)</option>
                            <option>USD (US$)</option>
                            <option>EUR (€)</option>
                            <option>JPY (¥)</option>
                            <option>GBP (£)</option>
                            <option>AUD (A$)</option>
                            <option>CAD (C$)</option>
                            <option>CHF (Fr)</option>
                            <option>CNY </option>
                            <option>SEK (kr)</option>
                            <option>NZD (NZ$)</option>
                            <option>MXN ($)</option>
                        </select>
                    </div>
                    {#if $formChildItem.hasError("currency.required")}
                        <p class="help is-danger">Currency is required</p>
                    {/if}
                </div>
                <div class="column">
                    <label for="" class="gray">Unit Price</label><br />
                    <input
                        type="number"
                        placeholder="Unit Price"
                        class="input"
                        bind:value={$unitPrice.value}
                    />
                    {#if $formChildItem.hasError("unitPrice.required")}
                        <p class="help is-danger">Unit Price is required</p>
                    {/if}
                </div>
                <div class="column has-text-right">
                    <br />
                    <span class="has-text-weight-bold">Total - </span>
                    {numberWithCommas(
                        $unitPrice.value * parseInt($quantity.value)
                    )
                        ? numberWithCommas(
                              $unitPrice.value *
                                  parseInt($quantity.value)
                          )
                        : 0}
                </div>
            </div>
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
