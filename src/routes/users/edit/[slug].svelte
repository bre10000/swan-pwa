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
    import { get as getIDB } from "idb-keyval";
    import { createActivityLog } from "../../../utils/activity/log";
    import Select from "svelte-select";
    import qs from "qs";

    export let slug;

    let roles = [];

    const name = field("name", "", [required()]);
    const username = field("username", "", [required()]);
    const emailValue = field("email", "", [required(), email()]);
    // const password = field("password", "", [required()]);

   

    let blocked;
    let role;
    let gpsLocation;

    const formItem = form(name, username, emailValue);

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
        await formItem.validate();
        if (!$formItem.valid) {
            return;
        }

        try {
            let response = await put({
                path: "users/" + slug,
                data: {
                    name: $name.value,
                    username: $username.value,
                    email: $emailValue.value,
                    // password: $password.value,
                    role: role.value,
                    blocked: blocked,
                    avatar: file ? file.id : imageID,
                },
            });

            console.log("Add User Request  ", response);

            if (response?.id) {
                toast.push("User Edited Successfully!", {
                    duration: 20000,
                    theme: {
                        "--toastBackground": "#48BB78",
                        "--toastBarBackground": "#2F855A",
                    },
                });

                createActivityLog("User", response, "Edit", response.id);

                goto("users");
            }
        } catch (e) {
            console.log("Error Add User   ", e);
        }
    }

    async function uploadImage() {
        try {
            if (!thumbnail) {
                add();
                return;
            }

            let API_ENDPOINT = api_url + "/upload";
            const request = new XMLHttpRequest();
            const formData = new FormData();

            request.open("POST", API_ENDPOINT, true);
            request.setRequestHeader(
                "Authorization",
                "Bearer " + (await getIDB("session"))
            );
            request.onreadystatechange = () => {
                if (request.readyState === 4 && request.status === 200) {
                    // console.log(request.responseText);
                    let file = JSON.parse(request.responseText)[0];
                    add(file);
                }
                console.log("Image Upload Request", request);
            };
            console.log(fileinput.files[0]);
            formData.append("files", fileinput.files[0]);

            console.log("Form Data", formData);
            await request.send(formData);
        } catch (e) {
            console.log("Error Image Upload Request", e);
        }
    }

    async function changeAccountStatus() {
        try {
            let response = await put({
                path: "users/" + slug,
                data: {
                    blocked: !blocked,
                },
            });

            console.log("Change User Status Request  ", response);

            if (response?.id) {
                toast.push(
                    !blocked
                        ? "User Account Blocked Successfully!"
                        : "User Account Activated Successfully!",
                    {
                        duration: 20000,
                        theme: {
                            "--toastBackground": "#48BB78",
                            "--toastBarBackground": "#2F855A",
                        },
                    }
                );

                createActivityLog(
                    "User",
                    response,
                    "Account Status",
                    response.id
                );

                getItem();
            }
        } catch (e) {
            console.log("Error Change User Status   ", e);
        }
    }

    async function getItem() {
        try {
            let response = await get("users/" + slug + "?populate=*", null);

            console.log("Get User by ID ", response);

            name.set(response.name);
            username.set(response.username);
            emailValue.set(response.email);


            role = {
                value: response.role?.id,
                label: response.role?.name
            };
            blocked = response.blocked;

            url = response.avatar?.url;
            imageID = response.avatar?.id;
        } catch (e) {
            console.log("Error get User by ID ", e);
        }
    }
    async function getRoles() {
        try {
            let response = await get("roles", null);

            console.log("Get Roles ", response);

            roles = response.data.map((x) => {
                return {
                    value: x.id,
                    label:  x.name,
                };
            });
        } catch (e) {
            console.log("Error Get Roles ", e);
        }
    }

    

    $: if (slug) {
        getRoles();
        getItem();
    }
</script>

<svelte:head>
    <title>Edit User</title>
</svelte:head>

<br /><br />
<div class="container px-6">
    <a href="users" class="has-text-dark"
        ><span class="icon is-small"><Icon data={faAngleLeft} /></span> Back</a
    >
    <br /><br />
    <div class="card px-6">
        <br /><br />
        <h3 class="my-0">Edit User</h3>
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
                                class="input has-background-light has-text-weight-semibold"
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
                                class="input has-background-light has-text-weight-semibold"
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
                                class="input has-background-light has-text-weight-semibold"
                                required
                                bind:value={$emailValue.value}
                                type="email"
                            />
                        </div>
                        {#if $formItem.hasError("email.required")}
                            <p class="help is-danger">Email is required</p>
                        {/if}
                        {#if $formItem.hasError("email.not_an_email")}
                            <p class="help is-danger">Email is not valid</p>
                        {/if}
                    </div>
                </div>
                
                    <div class="column">
                        <div class="field">
                            <label for="" class="gray">Role</label><br />
                            <div class="control select is-fullwidth ">
                                <Select
                                            items={roles}
                                            bind:value={role}
                                            listAutoWidth={true}
                                        />
                            </div>
                        </div>
                    </div>

                </div>


               

            {#if role}
                <div class="columns" />
            {/if}

            {#if !thumbnail && url}
                <figure class="image is-128x128">
                    <img class="image" src="{image_url}{url}" alt="thumnail" />
                </figure>
            {/if}

            {#if thumbnail}
                <figure class="image is-128x128">
                    <img class="image" src={thumbnail} alt="thumnail" />
                </figure>
            {/if}

            <div class="field">
                <label for="" class="ml-4 gray">Avatar</label>
                <div class="file">
                    <label class="file-label">
                        <input
                            class="file-input"
                            accept="image/png, image/jpeg"
                            type="file"
                            name="resume"
                            required
                            on:change={(e) => onFileSelected(e)}
                            bind:this={fileinput}
                        />
                        <span class="file-cta">
                            <span class="file-icon">
                                <Icon data={faUpload} />
                            </span>
                            <span class="file-label"> Choose a file… </span>
                        </span>
                        {#if thumbnail}
                            <span class="file-name">
                                {thumbnail}
                            </span>
                        {/if}
                    </label>
                </div>

                <div class="columns">
                    <div class="column">
                        <div class="field">
                            <label for="" class="gray">Status</label><br />
                            <div
                                class="tag px-4"
                                class:is-success={!blocked}
                                class:is-danger={blocked}
                            >
                                {blocked ? "Blocked" : "Active"}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container-fluid">
                    {#if !blocked}
                        <button
                            on:click={changeAccountStatus}
                            type="button"
                            class="button is-danger is-light  p-5 has-text-weight-bold"
                        >
                            Block Account
                        </button>
                    {:else}
                        <button
                            on:click={changeAccountStatus}
                            type="button"
                            class="button is-success  is-light  p-5 mr05 has-text-weight-bold"
                        >
                            Activate Account
                        </button>
                    {/if}

                    <a
                        href="users/change-password/{slug}"
                        class="button is-warning is-light p-5 mr05 has-text-weight-bold"
                    >
                        Change Password
                    </a>

                    <div class="container-fluid has-text-centered py-2">
                        <button
                            disabled={!$formItem.valid && !$formItem.dirty}
                            on:click|preventDefault={uploadImage}
                            class="button is-dark my-2 px-5 py-2 has-text-weight-bold"
                            ><Icon data={faSave}/>  <span class="ml-2 has-text-white">Save</span></button
                        >
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>
