<!-- <script context="module">
  export function preload({ params, query }) {
    const pageName = query.page;
    return { page: pageName };
  }
</script> -->

<script>
  import { goto } from "@sapper/app";
  import { del, post } from "../lib/apiAuth";

  import { form, field } from "svelte-forms";
  import { required } from "svelte-forms/validators";
  import { user } from "../store/user";
  import { sessionStore } from "../store/session";
  import { localeS } from "../store/locale";
  import { onMount } from "svelte";
  import { _ } from "svelte-i18n";
import Icon from "svelte-awesome/components/Icon.svelte";
import { faEye } from "@fortawesome/free-solid-svg-icons";

  // export let page;

  let errors;

  const identifier = field("identifier", "", [required()]);
  const password = field("password", "", [required()]);
  const loginForm = form(identifier, password);

  async function login() {
    try {
      let response = await post({
        path: "auth/local",
        header: { ContentType: "application/json" },
        data: {
          identifier: $identifier.value,
          password: $password.value,
        },
      });
      if (response && response.error?.status == 400) {
        errors = response.error?.message;
      } else if (response.jwt){
          await sessionStore.setSession(response.jwt);
          await user.fetch();

          goto('dashboard')
      }
    } catch (e) {
      console.error("LOGIN ERROR", e);
      errors =
        "An error has occured while trying to connect to the server. Please try again.";
    }
  }

  function toggleView() {
    var x = document.getElementById("password-input");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

</script>

<svelte:head>
  <title>Login</title>
</svelte:head>
<br><br>
<main class="container px-5 ">
  <br><br>
  <div class="card login-card is-rounded">
    <div class="columns is-justify-content-center">
      <div class="column has-text-centered has-border-right-gray is-hidden-mobile card no-shadow opacity">
        <br><br><br><br>
        <h1 class="is-size-1 has-text-info" style="line-height: 1; font-weight: 900; letter-spacing: -5px;">SWAN</h1>
        <p class="is-size-7 gray">Humanitarian Consortium</p> 
        <br><br>
        <div class="columns px-6 is-align-items-center is-multiline">
          <div class="column p-5 is-half">
            <img src="./images/login/Save the ChildrenSTC_Logo_Horiz_ColPos_RGB-01.jpg" alt="">
          </div>
          <div class="column p-5 is-half">
            <img src="./images/login/World VisionWorld Vision.png" alt="">
          </div>
          <div class="column p-5 is-half">
            <img src="./images/login/Norwegian Refugee CouncilNRC.png" alt="">
          </div>
          <div class="column p-5 is-half">
            <img src="./images/login/Action Against HungerAAH.png" alt="">
          </div>
        </div>
      </div>
      <div class="column is-6 has-text-centered p-6 signin-form">
        <br><br>
        <img src="./images/logo/swan_logo.svg" alt="SWAN Logo" width="200">

        {#if loginForm}
          <!-- svelte-ignore component-name-lowercase -->
          <form
            on:submit|preventDefault={login}
            class="has-text-left pt-4"
            style="max-width: 300px; margin: 0 auto;"
          >
            <div class="field">
              <label for="" class="gray">Username or Email</label>
              <div class="control">
                <input
                  class="input has-background-light has-text-weight-bold"
                  type="text"
                  name="identifier"
                  id="identifier"
                  bind:value={$identifier.value}
                  required
                  placeholder="example@gmail.com"
                />
              </div>
              {#if $loginForm.hasError("identifier.required")}
                <p class="help is-danger">Identifier is required</p>
              {/if}
              
            </div>
            <div class="field py-4">
              <label for="" class="light-gray pt-4">Password</label>
              <div class="field has-addons  is-fullwidth is-flex">
                
  
                <div class="control is-fullwidth is-flex-grow-1">
                  <input
                    id="password-input"
                    name="password"
                    bind:value={$password.value}
                    required
                    class="input is-fullwidth has-background-light has-text-weight-bold"
                    type="password"
                    placeholder="**********"
                  />
                </div>
                <div class="control">
                  <button
                    type="button"
                    class="button is-light has-text-weight-bold"
                    on:click={toggleView}
                  >
                    <Icon data={faEye} />
                  </button>
                </div>
              </div>

              {#if $loginForm.hasError("password.required")}
                <p class="help is-danger">Password is required</p>
              {/if}
              {#if errors && errors?.password}
                {#each errors.password as e}
                  <p class="help is-danger">{e}</p>
                {/each}
              {/if}
            </div>

            {#if errors}
              <h5 class="has-text-danger is-size-6">{errors}</h5>
            {/if}

            <div class="container-fluid has-text-centered py-2">
              <button
                disabled={!$loginForm.valid}
                class="button is-dark px-5 py-2 has-text-weight-bold"
                >Login</button
              >
              <!-- <button on:click|preventDefault={loginAdvertise} disabled={!$loginForm.valid} class="button is-dark  is-outlined is-rounded px-5 py-2 has-text-weight-bold">Login Advertiser</button> -->
            </div>
          </form>
        {/if}

       
        <br><br>
      </div>
    </div>

    
  </div>


  
</main>

<br /><br /><br /><br /><br /><br />

<style>
  .login-card {
    border-radius: 10px;
  }

  .opacity {
    opacity: 0.8 !important;
    transition: opacity 0.5s ease-in-out;
  }
  .opacity:hover {
    opacity: 0.6 !important;
  

  }

  .signin-form{
    background-color: rgba(245, 245, 245, 0.27);
  }
    

  @media screen and (max-width: 728px) {
  }
</style>
