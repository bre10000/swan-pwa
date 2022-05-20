<script>
    import { form, field } from "svelte-forms";
    import { required } from "svelte-forms/validators";
    import { post } from "../../lib/api";
    import { goto } from "@sapper/app";
    import { toast } from "@zerodevx/svelte-toast";
    import Icon from "svelte-awesome/components/Icon.svelte";
    import { faAngleLeft, faUpload } from "@fortawesome/free-solid-svg-icons";
    import { api_url } from "../../config";
    import { get as getIDB } from 'idb-keyval'

    const name = field("name", "", [required()]);
    const phone = field("phone", "", []);
    const website = field("website", "", []);
    const address_1 = field("address_1", "", []);
    const address_2 = field("address_2", "", []);

    const formItem = form(name, phone, website, address_1, address_2);

    let thumbnail, fileinput;

    const onFileSelected = (e) => {
        let image = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = (e) => {
            thumbnail = e.target.result;
        };
    };

    async function add() {
        try {
            let response = await post({
                path: "consortium-members/",
                data: {
                    data: {
                        name: $name.value,
                        phone: $phone.value,
                        website: $website.value,
                        address_1: $address_1.value,
                        address_2: $address_2.value,
                    },
                },
            });

            console.log("Add Consortium Member Request  ", response);

            if (response.data?.id) {
                toast.push("Consortium Member Added Successfully!", {
                    duration: 20000,
                    theme: {
                        "--toastBackground": "#48BB78",
                        "--toastBarBackground": "#2F855A",
                    },
                });
                uploadImage(response.data);
            }
        } catch (e) {
            console.log("Error Add Consortium Member   ", e);
        }
    }

    async function uploadImage(consortium) {
        try {
            if(!thumbnail) {
                return;
            }

            let API_ENDPOINT = api_url + "/upload";
            const request = new XMLHttpRequest();
            const formData = new FormData();
            

            request.open("POST", API_ENDPOINT, true);
            request.setRequestHeader(
                "Authorization",
                "Bearer " + await getIDB('session')
            );
            request.onreadystatechange = () => {
                if (request.readyState === 4 && request.status === 200) {
                    console.log(request.responseText);
                    goto("consortium-members");
                }
                console.log("Image Upload Request", request)
            };
            console.log(fileinput.files[0]);
            formData.append("files", fileinput.files[0]);
            formData.append("ref", "api::consortium-member.consortium-member");
            formData.append("refId", consortium.id);
            formData.append("field", "logo");
            console.log("Form Data", formData)
            await request.send(formData);
        } catch (e) {
            console.log("Error Image Upload Request", e)
        }
    }
</script>

<svelte:head>
    <title>Add Consortium Member</title>
</svelte:head>

<br /><br />
<div class="container px-6">
    <a href="consortium-members" class="has-text-dark"
        ><span class="icon is-small"><Icon data={faAngleLeft} /></span> Back</a
    >
    <br /><br />

    <div class="card px-6">
        <br /><br />
        <h3 class="my-0">Add Consortium Member</h3>
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
                        disabled={!$formItem.valid || !$formItem.dirty}
                        on:click|preventDefault={add}
                        class="button is-dark my-2 px-5 py-2 has-text-weight-bold"
                        >Save</button
                    >
                </div>
            </div>
        </form>
    </div>
</div>
