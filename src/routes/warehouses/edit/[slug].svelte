<script context="module">
    export async function preload(params) {
        return { slug: parseInt(params.params.slug) };
    }
</script>

<script>
    import { form, field } from "svelte-forms";
    import { required } from "svelte-forms/validators";
    import { get, put } from "../../../lib/api";
    import { goto } from "@sapper/app";
    import { toast } from "@zerodevx/svelte-toast";
    import { faAngleLeft, faSave } from "@fortawesome/free-solid-svg-icons";
    import Icon from "svelte-awesome/components/Icon.svelte";

    export let slug;

    const name = field("name", "", [required()]);
    const description = field("description", "", []);
    const address = field("address", "", []);

    let gpsLocation;

    const formItem = form(name, description, address);

    async function add() {
        try {
            let response = await put({
                path: "warehouses/" + slug,
                data: {
                    data: {
                        name: $name.value,
                        description: $description.value,
                        address: $address.value,
                    },
                },
            });

            console.log("Add Warehouse Request  ", response);

            if (response.data?.id) {
                toast.push("Warehouse Edited Successfully!", {
                    duration: 20000,
                    theme: {
                        "--toastBackground": "#48BB78",
                        "--toastBarBackground": "#2F855A",
                    },
                });

                goto("warehouses");
            }
        } catch (e) {
            console.log("Error Add Warehouse   ", e);
        }
    }

    async function getItem() {
        try {
            let response = await get("warehouses/" + slug, null);

            console.log("Get Warehouse by ID ", response);

            name.set(response.data.attributes.name);
            description.set(response.data.attributes.description);
            address.set(response.data.attributes.address);
        } catch (e) {
            console.log("Error get Warehouse by ID ", e);
        }
    }

    $: if (slug) {
        getItem();
    }
</script>

<svelte:head>
  <title>Edit Warehouse</title>
</svelte:head>

<br /><br />
<div class="container px-6">
    <a href="warehouses" class="has-text-dark"
        ><span class="icon is-small"><Icon data={faAngleLeft} /></span> Back</a
    >
    <br /><br />
    <div class="card px-6">
        <br /><br />
        <h3 class="my-0">Edit Warehouse</h3>
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
            
        </div>
        <div class="columns">
            <div class="column">
                <div class="field">
                    <label for="" class="gray">Description</label><br />
                    <div class="control">
                        <textarea bind:value={$description.value} name="description" class="textarea" rows="3"></textarea>
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="field">
                    <label for="" class="gray">Address</label><br />
                    <div class="control">
                        <textarea bind:value={$address.value} name="address" class="textarea" rows="3"></textarea>
                    </div>
                </div>
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
