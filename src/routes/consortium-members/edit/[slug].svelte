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
    import { faAngleLeft,
faSave, faUpload } from "@fortawesome/free-solid-svg-icons";
    import Icon from "svelte-awesome/components/Icon.svelte";
    import { api_url, image_url } from "../../../config";
    import { get as getIDB } from "idb-keyval";
import { json } from "svelte-i18n";

    export let slug;

    const name = field("name", "", [required()]);
    const phone = field("phone", "", []);
    const website = field("website", "", []);
    const address_1 = field("address_1", "", []);
    const address_2 = field("address_2", "", []);

    const formItem = form(name, phone, website, address_1, address_2);

    let thumbnail, fileinput;

    let url;

    const onFileSelected = (e) => {
        let image = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = (e) => {
            thumbnail = e.target.result;
        };
    };

    async function add(file) {
        try {
            let response = await put({
                path: "consortium-members/" + slug,
                data: {
                    data: {
                        name: $name.value,
                        phone: $phone.value,
                        website: $website.value,
                        address_1: $address_1.value,
                        address_2: $address_2.value,
                        logo: file? file.id : null
                    },
                },
            });

            console.log("Add Consortium Member Request  ", response);

            if (response.data?.id) {
                toast.push("Consortium Member Edited Successfully!", {
                    duration: 20000,
                    theme: {
                        "--toastBackground": "#48BB78",
                        "--toastBarBackground": "#2F855A",
                    },
                });
                goto("consortium-members")
            }

            
        } catch (e) {
            console.log("Error Add Consortium Member   ", e);
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

    async function getItem() {
        try {
            let response = await get(
                "consortium-members/" + slug,
                "populate=%2A"
            );

            console.log("Get Consortium Member by ID ", response);

            name.set(response.data.attributes.name);
            phone.set(response.data.attributes.phone);
            website.set(response.data.attributes.website);
            address_1.set(response.data.attributes.address_1);
            address_2.set(response.data.attributes.address_2);
            url = response.data.attributes.logo?.data?.attributes.url;
        } catch (e) {
            console.log("Error get Consortium Member by ID ", e);
        }
    }

    $: if (slug) {
        getItem();
    }
</script>

<svelte:head>
    <title>Edit Consortium Member</title>
</svelte:head>

<br /><br />
<div class="container px-6">
    <a href="consortium-members" class="has-text-dark"
        ><span class="icon is-small"><Icon data={faAngleLeft} /></span> Back</a
    >
    <br /><br />
    <div class="card px-6">
        <br /><br />
        <h3 class="my-0">Edit Consortium Member</h3>
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
                        <label for="" class="gray">Phone </label>
                        <div class="control">
                            <input
                                class="input"
                                bind:value={$phone.value}
                                type="text"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div class="columns">
                <div class="column">
                    <div class="field">
                        <label for="" class="gray">Website </label>
                        <div class="control">
                            <input
                                class="input"
                                bind:value={$website.value}
                                type="text"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div class="columns">
                <div class="column">
                    <div class="field">
                        <label for="" class="gray">Address 1</label><br />
                        <div class="control">
                            <textarea
                                bind:value={$address_1.value}
                                name="description"
                                class="textarea"
                                rows="3"
                            />
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="field">
                        <label for="" class="gray">Address 2</label><br />
                        <div class="control">
                            <textarea
                                bind:value={$address_2.value}
                                name="address"
                                class="textarea"
                                rows="3"
                            />
                        </div>
                    </div>
                </div>
            </div>

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
                <label for="" class="ml-4 gray">Logo</label>
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

                <div class="container-fluid has-text-centered py-2">
                    <button
                        disabled={!$formItem.valid && !$formItem.dirty}
                        on:click|preventDefault={uploadImage}
                        class="button is-dark my-2 px-5 py-2 has-text-weight-bold"
                        ><Icon data={faSave}/>  <span class="ml-2 has-text-white">Save</span></button
                    >
                </div>
            </div>
        </form>
    </div>
</div>
