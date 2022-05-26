<script>
  import { faSpinner } from "@fortawesome/free-solid-svg-icons";

  import { goto } from "@sapper/app";
  import { onMount } from "svelte";
  import Icon from "svelte-awesome/components/Icon.svelte";
  import { user } from "../store/user";
  import { sessionStore } from "../store/session";

  let error;
  async function logout() {
    await sessionStore.logout();
    await user.logout();

    goto('login')
  }

  onMount(() => {
    logout();
  });
</script>

<svelte:head>
  <title>Logout</title>
  <meta data-hid="og:title" name="og_title" content="Logout" />
</svelte:head>

<div class="columns py-6 px-4 m-6">
  {#if error}
    <h5 class="is-size-1 has-text-weight-bold">Shoot!</h5>
    <h5 class="is-size-3">Well, this is unexpected...</h5>
    <h5 class="is-size-5">
      An error has occured with our server and we're working to fix the problem!
      Try again in a few minutes.
    </h5>
  {:else}
    <div class="has-text-centered">
      <br /><br />
      <h1 class="is-size-1"><Icon spin={true} data={faSpinner} scale="2" /></h1>
      <p class="gray">Signing Out ...</p>
      <!-- <a href="advertise/add-campaign" class="button is-gradient is-medium has-text-white my-2 is-outlined is-rounded px-5 py-2 has-text-weight-bold">Post Campaign</a> -->
      <br /><br />
    </div>
  {/if}
</div>
