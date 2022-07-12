<script>
  import { faSpinner } from "@fortawesome/free-solid-svg-icons";

  import { goto } from "@sapper/app";
  import { onMount } from "svelte";
  import Icon from "svelte-awesome/components/Icon.svelte";
  import { user } from "../store/user";
  import { sessionStore } from "../store/session";
  import { Moon } from "svelte-loading-spinners";

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

<div class="py-6 px-4 m-6 has-text-centered" style="height: 100vh;">
  {#if error}
    <h5 class="is-size-1 has-text-weight-bold">Shoot!</h5>
    <h5 class="is-size-3">Well, this is unexpected...</h5>
    <h5 class="is-size-5">
      An error has occured with our server and we're working to fix the problem!
      Try again in a few minutes.
    </h5>
  {:else}
  <br><br><br><br>
    <div class="is-flex is-justify-content-center">
      <Moon size="60" color="blue" unit="px" duration="1s" />
    </div>
  {/if}
</div>
