<script>
  import { user } from "../../store/user";
  import { localeS } from "../../store/locale";
  import LocaleSwitcher from "./LocaleSwitcher.svelte";
  import { _ } from "svelte-i18n";
  import Icon from "svelte-awesome/components/Icon.svelte";
  import {
    faAngleUp,
    faBook,
    faChartLine,
    faClipboard,
    faEye,
    faFile,
    faIndustry,
    faList,
    faRuler,
    faSignOutAlt,
    faSitemap,
    faTachometerAlt,
    faTruck,
    faUser,
    faUserCircle,
    faUserFriends,
    faWarehouse,
  } from "@fortawesome/free-solid-svg-icons";
  import { image_url } from "../../config";

  function toggleNavbar() {
    document.getElementById("navbar-menu").classList.toggle("is-active");
    document.getElementById("navbarBurger").classList.toggle("is-active");
  }
  function toggleProfile() {
    document.getElementById("dropdown").classList.toggle("is-active");
  }

  export let segment;
</script>

<aside class="menu p-4 has-border-right-gray has-background-light">
  <div class="has-border-bottom-gray has-text-centered">
    <img src="./images/logo/swan_logo_horizontal.svg" width="180" alt="" />
  </div>
  <p class="menu-label">General</p>
  <ul class="menu-list">
    <li>
      <a href="dashboard" class:is-active={segment == "dashboard"}>
        <Icon data={faTachometerAlt} /> Dashboard</a
      >
    </li>
    <li>
      <a
        href="consortium-members"
        class:is-active={segment == "consortium-members"}
      >
        <Icon data={faSitemap} /> Consortium Memebers</a
      >
    </li>
  </ul>
  <p class="menu-label">Administration</p>
  <ul class="menu-list">
    <li>
      <a href="purchase-orders" class:is-active={segment == "purchase-orders"}
        ><Icon data={faFile} /> Purchase Order</a
      >
    </li>
    <li>
      <a href="stocks" class:is-active={segment == "stocks"}
        ><Icon data={faChartLine} /> Stock</a
      >
    </li>
    <li>
      <a href="stock-releases" class:is-active={segment == "stock-releases"}
        ><Icon data={faClipboard} /> Stock Release</a
      >
    </li>
    <li>
      <a href="waybills" class:is-active={segment == "waybills"}
        ><Icon data={faTruck} /> Waybill</a
      >
    </li>
  </ul>
  <p class="menu-label">Other</p>
  <ul class="menu-list">
    <li>
      <a href="reports-list" class:is-active={segment == "reports-list"}
        ><Icon data={faBook} /> Reports</a
      >
    </li>
  </ul>
  <p class="menu-label">Settings</p>
  <ul class="menu-list">
    <li>
      <a href="items" class:is-active={segment == "items"}
        ><Icon data={faList} /> Items</a
      >
    </li>
    <li>
      <a href="units" class:is-active={segment == "units"}
        ><Icon data={faRuler} /> Units</a
      >
    </li>
    <li>
      <a href="warehouses" class:is-active={segment == "warehouses"}
        ><Icon data={faWarehouse} /> Warehouse</a
      >
    </li>
    <li>
      <a href="users" class:is-active={segment == "users"}
        ><Icon data={faUserFriends} /> Users</a
      >
    </li>
  </ul>

  <ul class="menu-list">
    <li>
      <a href="activity-logs" class:is-active={segment == "activity-logs"}
        ><Icon data={faEye} /> Activity Logs</a
      >
    </li>
  </ul>
  <br /><br />

  {#if $user.fetched && $user.loggedIn}
    <div class="dropdown is-up is-fullwidth is-hoverable" id="dropdown">
      <div class="dropdown-trigger is-fullwidth" style="width: 100%">
        <button
          on:click={toggleProfile}
          class="button is-flex is-justify-content-space-between"
          style="width: 100%"
          aria-haspopup="true"
          aria-controls="dropdown-menu7"
        >
          <span class="icon is-small">
            <Icon data={faUserCircle} />
          </span>

          <span class="has-text-weight-bold">{$user.data.name}</span>
          <span class="icon is-small">
            <Icon data={faAngleUp} />
          </span>
        </button>
      </div>
      <div class="dropdown-menu" id="dropdown-menu7" role="menu">
        <div class="dropdown-content" style="width: 15rem;">
          <br />
          <figure class="image is-128x128" style="margin: 0 auto;">
            {#if $user.data.avatar?.url}
              <img
                class="is-rounded"
                src="{image_url}{$user.data.avatar?.url}"
                alt=""
              />
            {:else}
              <img
                class="is-rounded"
                src="./images/profile/profile-placeholder.png"
                alt=""
              />
            {/if}
          </figure>
          <br />
          <ul class="menu-list px-4">
            <li>
              <a href="profile" class="is-active">
                <Icon data={faUser} /> Profile</a
              >
            </li>
            <li>
              <a href="logout" class="is-active">
                <Icon data={faSignOutAlt} /> Logout</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  {/if}
</aside>

<style>
  .menu {
    position: relative;
    width: 18rem;
    height: 100vh !important;
    overflow-y: scroll;
  }
  .menu .dropdown {
    position: fixed;
    width: 16rem;
    bottom: 10px;
    left: 10px;
  }

  .menu-list .is-active {
    background-color: rgb(234, 228, 255);
    color: #0000BF;
    font-weight: bold;
  }

  .menu-list {
    font-weight: normal;
  }
  :global(.menu-list a.is-active svg *) {
    color: #0000BF !important;
  }

  :global(.menu-list a svg *, .menu-list a *) {
    color: gray !important;
  }
  :global(.menu-list a svg) {
    margin-right: 1rem;
  }
</style>
