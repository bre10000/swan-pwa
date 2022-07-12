<script context="module">
    export async function preload(params) {
        return { slug: parseInt(params.params.slug) };
    }
</script>

<script>
    import { form, field } from "svelte-forms";
    import { email, required } from "svelte-forms/validators";
    import { get, put } from "../../../lib/api";
    import { goto } from "@sapper/app";
    import { toast } from "@zerodevx/svelte-toast";
    import { faAngleLeft,
faSave, faUpload } from "@fortawesome/free-solid-svg-icons";
    import Icon from "svelte-awesome/components/Icon.svelte";
    import { onMount } from "svelte";
    import { api_url, image_url } from "../../../config";
    import { get as getIDB } from 'idb-keyval'
    import { createActivityLog } from "../../../utils/activity/log";

    export let slug;

    
    const password = field("password", "", [required()]);

    const formItem = form(password);

    let thumbnail, fileinput;

    let url, imageID;

    const onFileSelected = (e) => {
        let image = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = (e) => {
            thumbnail = e.target.result;
        };
    };


    async function add(file) {
        await formItem.validate()
        if(!$formItem.valid){
            return;
        }
        
        try {
            let response = await put({
                path: "users/" + slug,
                data: {
                        password: $password.value,                    
                },
            });

            console.log("Change password Request  ", response);

            if (response?.id) {
                toast.push("Password changed Successfully!", {
                    duration: 20000,
                    theme: {
                        "--toastBackground": "#48BB78",
                        "--toastBarBackground": "#2F855A",
                    },
                });

                createActivityLog(
                    "User",
                    response,
                    "Edit",
                    response.id
                );

                goto("users");
            }
        } catch (e) {
            console.log("Error Change password Request   ", e);
        }
    }

    
</script>

<svelte:head>
  <title>Change Password</title>
</svelte:head>

<br /><br />
<div class="container px-6">
    <a href="users/edit/{slug}" class="has-text-dark"
        ><span class="icon is-small"><Icon data={faAngleLeft} /></span> Back</a
    >
    <br /><br />
    <div class="card px-6">
        <br /><br />
        <h3 class="my-0">Change Password</h3>
        <p class="gray py-0">Complete the form below and click save.</p>
        <br />

       <!-- svelte-ignore component-name-lowercase -->
       <form>
    

            <div class="column">
                <div class="field">
                    <label for="" class="gray">Password (*)</label>
                    <div class="control">
                        <input
                            class="input has-background-light has-text-weight-semibold"
                            required
                            bind:value={$password.value}
                            type="text"
                        />
                    </div>
                    {#if $formItem.hasError("password.required")}
                        <p class="help is-danger">Password is required</p>
                    {/if}
                </div>
            </div>

       


       

        <div class="container-fluid has-text-centered py-2">
            <button
                disabled={!$formItem.valid && !$formItem.dirty}
                on:click|preventDefault={add}
                class="button is-success my-2 px-5 py-2 has-text-weight-bold"
                ><Icon data={faSave}/>  <span class="ml-2 has-text-white">Save</span></button
            >
        </div>
    </form>
    </div>
</div>
