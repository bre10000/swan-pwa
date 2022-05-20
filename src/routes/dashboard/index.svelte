<script>
  import Icon from "svelte-awesome/components/Icon.svelte";
  import {
    faChartLine,
    faList,
    faTruck,
  } from "@fortawesome/free-solid-svg-icons";

  import { onDestroy } from "svelte";
  import { user } from "../../store/user";

  const unsubscribe = user.subscribe((value) => {
    if (!process.browser) {
      return;
    }

    if (!value.loggedIn && value.fetched) {
      goto("/login");
    }
  });

  onDestroy(unsubscribe);
</script>

<svelte:head>
  <title>Dashboard</title>
</svelte:head>

<br /><br />
<div class="container px-6 dashboard">
  <h3>Dashboard</h3>
  <br>

  <div class="columns">
    <div class="column card p-6">
      <Icon data={faChartLine} scale="2" /><br /><br />
      <h1 style="line-height: 1;color: blue;" class="is-size-2 my-1">
        69,704,767.31 ETB
      </h1>
      <p class="gray">Total Stock</p>
    </div>
    <div class="column is-narrow"><div class="px-2" /></div>
    <div class="column card p-6">
      <Icon data={faTruck} scale="2" /><br /><br />
      <h1 style="line-height: 1;color: blue;" class="is-size-2 my-1">
        174,382,092.16 ETB
      </h1>
      <p class="gray">Total Stock Release</p>
    </div>
  </div>
</div>

<style>
  .column.card {
    border-radius: 10px;
  }

  :global(.container.px-6.dashboard svg *) {
    color: blue !important;
  }
</style>
