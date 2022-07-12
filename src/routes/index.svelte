<script>
  import { goto } from "@sapper/app";

  import { onDestroy } from "svelte";
  import { user } from "../store/user";
  import { Moon } from "svelte-loading-spinners";

  const unsubscribe = user.subscribe((value) => {
    if (!process.browser) {
      return;
    }

    if (!value.loggedIn && value.fetched) {
      goto("login");
    } else if (value.loggedIn && value.fetched) {
      goto("dashboard");
    }
  });

  onDestroy(unsubscribe);
</script>

<div class="is-flex is-justify-content-center is-align-items-center" style="height: 100vh !important;">
  <Moon size="60" color="blue" unit="px" duration="1s" />
</div>
