<script>
    import { form, field } from "svelte-forms";
    import { required } from "svelte-forms/validators";
    import { post } from "../../lib/api";
    import { goto } from "@sapper/app";
    import { toast } from "@zerodevx/svelte-toast";
    import Icon from "svelte-awesome/components/Icon.svelte";
    import { faAngleLeft, faSave } from "@fortawesome/free-solid-svg-icons";
    import { onMount } from "svelte";

    const name = field("name", "", [required()]);
    
    const formItem = form(name);


    async function add() {
        await formItem.validate()
        if(!$formItem.valid){
            return;
        }
        try {
            let response = await post({
                path: "units/",
                data: {
                    data: {
                        name: $name.value,
                    },
                },
            });

            console.log("Add Unit Request  ", response);

            if (response.data?.id) {
                toast.push("Unit Added Successfully!", {
                    duration: 20000,
                    theme: {
                        "--toastBackground": "#48BB78",
                        "--toastBarBackground": "#2F855A",
                    },
                });

                goto("units");
            }
        } catch (e) {
            console.log("Error Add Unit   ", e);
        }
    }


</script>

<svelte:head>
    <title>Add Unit</title>
</svelte:head>

<br /><br />
<div class="container px-6">
    <a href="units" class="has-text-dark"
        ><span class="icon is-small"><Icon data={faAngleLeft} /></span> Back</a
    >
    <br /><br />

    <div class="card px-6">
        <br /><br />
        <h3 class="my-0">Add Unit</h3>
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
