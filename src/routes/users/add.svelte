<script>
    import { form, field } from "svelte-forms";
    import { email, required } from "svelte-forms/validators";
    import { get, post } from "../../lib/api";
    import { goto } from "@sapper/app";
    import { toast } from "@zerodevx/svelte-toast";
    import Icon from "svelte-awesome/components/Icon.svelte";
    import { faAngleLeft, faSave } from "@fortawesome/free-solid-svg-icons";
    import { onMount } from "svelte";

    let roles = [];

    const name = field("name", "", [required()]);
    const username = field("username", "", [required()]);
    const emailValue = field("email", "", [required(), email()]);
    const password = field("password", "", [required()]);
    let role;
    let gpsLocation;

    const formItem = form(name, username, emailValue, password);

    async function add() {
        await formItem.validate()
        if(!$formItem.valid){
            return;
        }
        
        try {
            let response = await post({
                path: "users/",
                data: {
                    name: $name.value,
                    username: $username.value,
                    email: $emailValue.value,
                    password: $password.value,
                    role: role.id,
                },
            });

            console.log("Add User Request  ", response);

            if (response?.id) {
                toast.push("User Added Successfully!", {
                    duration: 20000,
                    theme: {
                        "--toastBackground": "#48BB78",
                        "--toastBarBackground": "#2F855A",
                    },
                });

                goto("users");
            }
        } catch (e) {
            console.log("Error Add User   ", e);
        }
    }

    async function getRoles() {
        try {
            let response = await get("roles", null);

            console.log("Get Roles ", response);

            roles = response.data.filter( x => x.name !== "Public" && x.name !== "Authenticated" );
        } catch (e) {
            console.log("Error Get Roles ", e);
        }
    }

    onMount(() => {
        getRoles();
    });
</script>

<svelte:head>
  <title>Add User</title>
</svelte:head>

<br /><br />
<div class="container px-6">
    <a href="users" class="has-text-dark"
        ><span class="icon is-small"><Icon data={faAngleLeft} /></span> Back</a
    >
    <br /><br />

    <div class="card px-6">
        <br /><br />
        <h3 class="my-0">Add User</h3>
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

                <div class="column">
                    <div class="field">
                        <label for="" class="gray">Password (*)</label>
                        <div class="control">
                            <input
                                class="input"
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
            </div>

            <div class="columns">
                <div class="column">
                    <div class="field">
                        <label for="" class="gray">Role</label><br />
                        <div class="control select is-fullwidth">
                            <select name="category" bind:value={role}>
                                {#each roles as r}
                                    <option value={r}>{r.name}</option>
                                {/each}
                            </select>
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
