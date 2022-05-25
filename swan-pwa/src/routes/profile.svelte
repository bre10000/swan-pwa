<script context="module">
    export async function preload(params) {
        return { slug: parseInt(params.params.slug) };
    }
</script>

<script>
    import { form, field } from "svelte-forms";
    import { email, required } from "svelte-forms/validators";
    import { get, put } from "../lib/api";
    import { goto } from "@sapper/app";
    import { toast } from "@zerodevx/svelte-toast";
    import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
    import Icon from "svelte-awesome/components/Icon.svelte";
    import { onDestroy, onMount } from "svelte";
    import { user } from "../store/user";

    export let slug;


    const name = field("name", "", [required()]);
    const username = field("username", "", [required()]);
    const emailValue = field("email", "", [required(), email()]);
    

    const formItem = form(name, username, emailValue);


    async function add() {
        await formItem.validate()
        if(!$formItem.valid){
            return;
        }
        
        try {
            let response = await put({
                path: "users/" + $user.data.id,
                data: {
                        name: $name.value,
                        username: $username.value,
                        email: $emailValue.value,
                    
                },
            });

            console.log("Add User Request  ", response);

            if (response?.id) {
                toast.push("Profile Edited Successfully!", {
                    duration: 20000,
                    theme: {
                        "--toastBackground": "#48BB78",
                        "--toastBarBackground": "#2F855A",
                    },
                });
                user.createUser();
                goto("dashboard");
            }
        } catch (e) {
            console.log("Error Add User   ", e);
        }
    }



    const unsubscribe = user.subscribe((value) => {
    if (!process.browser) {
      return;
    }

    if (!value.loggedIn && value.fetched) {
      goto("/login");
    } else if(value.loggedIn && value.fetched) {
      name.set(value.data.name);
      emailValue.set(value.data.email);
      username.set(value.data.username);
    } 
  });

  onDestroy(unsubscribe);
  

    
</script>

<svelte:head>
  <title>Profile</title>
</svelte:head>

<br /><br />
<div class="container px-6">
    <a href="dashboard" class="has-text-dark"
        ><span class="icon is-small"><Icon data={faAngleLeft} /></span> Back</a
    >
    <br /><br />
    <div class="card px-6">
        <br /><br />
        <h3 class="my-0">Edit Profile</h3>
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
                    <label for="" class="gray">Username (*)</label>
                    <div class="control">
                        <input
                            class="input"
                            required
                            bind:value={$username.value}
                            type="text"
                        />
                    </div>
                    {#if $formItem.hasError("username.required")}
                        <p class="help is-danger">Username is required</p>
                    {/if}
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column">
                <div class="field">
                    <label for="" class="gray">Email (*)</label>
                    <div class="control">
                        <input
                            class="input"
                            required
                            bind:value={$emailValue.value}
                            type="email"
                        />
                    </div>
                    {#if $formItem.hasError("email.required")}
                        <p class="help is-danger">Email is required</p>
                    {/if}
                </div>
            </div>

            
        </div>

        
        <div class="container-fluid has-text-centered py-2">
            <button
                disabled={!$formItem.valid || !$formItem.dirty}
                on:click|preventDefault={add}
                class="button is-dark my-2 px-5 py-2 has-text-weight-bold"
                >Save</button
            >
        </div>
    </form>
    </div>
</div>
