<script context="module">
    export async function preload(params) {
        return { slug: parseInt(params.params.slug) };
    }
</script>

<script>
    import { form, field } from "svelte-forms";
    import { required } from "svelte-forms/validators";
    import { get, post, put } from "../../../lib/api";
    import { goto } from "@sapper/app";
    import { toast } from "@zerodevx/svelte-toast";
    import { faAngleLeft, faSave } from "@fortawesome/free-solid-svg-icons";
    import Icon from "svelte-awesome/components/Icon.svelte";
    import qs from "qs";
import { checkValue } from "../../../lib";

    export let slug;

    const name = field("name", "", [required()]);
    const category = field("category", "Health", [required()]);
    const unit = field("unit", "", [required()]);
    const pieces = field("pieces", "", [required()]);

    const formItem = form(name, category, unit, pieces);

    let units = [];
    let categories = [];

    async function add() {
        await formItem.validate()
        if(!$formItem.valid){
            return;
        }
        try {
            let response = await put({
                path: "items/" + slug,
                data: {
                    data: {
                        name: $name.value,
                        category: $category.value,
                        unit: $unit.value,
                        pieces: $pieces.value,
                    },
                },
            });

            console.log("Add Item Request  ", response);

            if (response.data?.id) {
                toast.push("Item Edited Successfully!", {
                    duration: 20000,
                    theme: {
                        "--toastBackground": "#48BB78",
                        "--toastBarBackground": "#2F855A",
                    },
                });

                goto("items");
            }
        } catch (e) {
            console.log("Error Add Item   ", e);
        }
    }

    async function getItem() {
        try {
            let response = await get("items/" + slug, null);

            console.log("Get Item by ID ", response);

            name.set(response.data.attributes.name);
            category.set(response.data.attributes.category);
            unit.set(response.data.attributes.unit);
            pieces.set(response.data.attributes.pieces);
        } catch (e) {
            console.log("Error get Item by ID ", e);
        }
    }

    async function getUnits() {
        try {
            let params = {
                "pagination[limit]": -1,
            };
            params = qs.stringify(params, {
                encodeValuesOnly: true,
            });
            let response = await get("units", params);

            console.log("Get Units ", response);

            units = response.data.map((x) => x.attributes.name);
        } catch (e) {
            console.log("Error Get Units ", e);
        }
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

    $: if (slug) {
        getItem();
        getUnits();
        getCategories();
    }
</script>

<svelte:head>
    <title>Edit Item</title>
</svelte:head>

<br /><br />
<div class="container px-6">
    <a href="items" class="has-text-dark"
        ><span class="icon is-small"><Icon data={faAngleLeft} /></span> Back</a
    >
    <br /><br />
    <div class="card px-6">
        <br /><br />
        <h3 class="my-0">Edit Item</h3>
        <p class="gray py-0">Complete the form below and click save.</p>
        <br />

        <!-- svelte-ignore component-name-lowercase -->
        <form>
            <div class="columns">
                <div class="column">
                    <div class="field">
                        <label for="" class="gray">Name (*)</label>
                        <div class="control">
                            <input
                                class="input"
                                required
                                bind:value={$name.value}
                                type="text"
                            />
                        </div>
                        {#if $formItem.hasError("name.required")}
                            <p class="help is-danger">Name is required</p>
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

            <div class="columns">
                <div class="column">
                    <label for="" class="gray">Unit</label><br />
                    <div class="control select is-fullwidth">
                        <select bind:value={$unit.value}>
                            {#each units as u}
                                <option>{u}</option>
                            {/each}
                        </select>
                    </div>
                    {#if $formItem.hasError("unit.required")}
                        <p class="help is-danger">Unit is required</p>
                    {/if}
                </div>

                <div class="column">
                    <label for="" class="gray">Pieces</label><br />
                    <input
                        bind:value={$pieces.value}
                        type="number" min=0 on:input={checkValue}
                        placeholder="Piece"
                        class="input"
                    />
                    {#if $formItem.hasError("pieces.required")}
                        <p class="help is-danger">Pieces is required</p>
                    {/if}
                </div>
            </div>

            <div class="container-fluid has-text-centered py-2">
                <button
                    disabled={!$formItem.valid && !$formItem.dirty}
                    on:click|preventDefault={add}
                    class="button is-dark my-2 px-5 py-2 has-text-weight-bold"
                    ><Icon data={faSave}/>  <span class="ml-2 has-text-white">Save</span></button
                >
            </div>
        </form>
    </div>
</div>
