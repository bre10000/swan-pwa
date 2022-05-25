<script>
  import Icon from "svelte-awesome/components/Icon.svelte";
  import {
    faChartLine,
    faList,
    faTruck,
  } from "@fortawesome/free-solid-svg-icons";

  import { onDestroy, onMount } from "svelte";
  import { user } from "../../store/user";
  import { numberWithCommas } from "../../lib";
  import qs from "qs";
  import { get } from "../../lib/api";
  import { Chart } from "frappe-charts";

  const unsubscribe = user.subscribe((value) => {
    if (!process.browser) {
      return;
    }

    if (!value.loggedIn && value.fetched) {
      goto("/login");
    }
  });

  onDestroy(unsubscribe);

  let totalStock = 0;
  let totalStockQuantity = 0;

  let totalStockRelease = 0;
  let totalStockReleaseQuantity = 0;

  let stocks = [];
  let stock_releases = [];


  let dataStock = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        name: "Views",
        values: [1158, 2580, 7594, 3429, 5791, 1042, 548, 6498],
      },
      { name: "Likes", values: [458, 126, 247, 483, 436, 701, 20, 1100] },
    ],
  };

  let datastockRelease = {
    labels: ["18-25", "25-35", "35-45", "45-55", "55+"],
    datasets: [
      { name: "Views", values: [1158, 2580, 7594, 3429, 5791] },
      { name: "Likes", values: [458, 126, 247, 483, 436] },
    ],
  };


  async function getStockReleases() {
    try {
      let params = {
        populate: [
          "consortium_member",
          "stock_release_items",
          "stock_release_items.purchase_order_item",
        ],
        "pagination[limit]": -1,
      };
      params = qs.stringify(params, {
        encodeValuesOnly: true,
      });
      let response = await get("stock-releases", params);

      console.log("Get Stock Release ", response);

      stock_releases = response.data;

      let array = generateGraphStockRelease();

      datastockRelease = {
        labels: array.map( x => x.name),
        datasets: [
          {
            name: "Stock Amount (ETB)",
            values: array.map( x => x.value),
          },
        ],
      }

      setupCharts();

      
    } catch (e) {
      console.log("Error Stock Release ", e);
    }
  }

  async function getStocks() {
    try {
      let params = {
        populate: [
          "consortium_member",
          "stock_items",
          "stock_items.purchase_order_item",
        ],
        "pagination[limit]": -1,
      };
      params = qs.stringify(params, {
        encodeValuesOnly: true,
      });
      let response = await get("stocks", params);

      console.log("Get Stock  ", response);

      stocks = response.data;

      let array = generateGraphStock();

      dataStock = {
        labels: array.map( x => x.name),
        datasets: [
          {
            name: "Stock Amount (ETB)",
            values: array.map( x => x.value),
          },
        ],
      }

      setupCharts();

    } catch (e) {
      console.log("Error Stock  ", e);
    }
  }

  function generateGraphStock() {
    let temp = 0;
    let tempQuantity = 0;

    let array = [];
    stocks.forEach((element2) => {
      let value = 0;

      element2.attributes.stock_items.data?.forEach((element) => {
        value +=
          element.attributes.purchase_order_item.data?.attributes.unitPrice *
          element.attributes.received;
        temp += value;
        tempQuantity += parseInt(element.attributes.received);
      });

      let data = {
        name: element2.attributes.consortium_member.data?.attributes.name,
        value: value,
      };

      if (array.filter((x) => x.name == data.name).length > 0) {
        array.filter((x) => x.name == data.name)[0].value += data.value;
      } else {
        array.push(data);
      }
    });

    totalStock = temp;
    totalStockQuantity = tempQuantity;

    return array;
  }

  function generateGraphStockRelease() {
    let temp = 0;
    let tempQuantity = 0;

    let array = [];
    stock_releases.forEach((element2) => {
      let value = 0;

      element2.attributes.stock_release_items.data?.forEach((element) => {
        value +=
          element.attributes.purchase_order_item.data?.attributes.unitPrice *
          element.attributes.quantity;
        temp += value;
        tempQuantity += parseInt(element.attributes.quantity);
      });

      let data = {
        name: element2.attributes.consortium_member.data?.attributes.name,
        value: value,
      };

      if (array.filter((x) => x.name == data.name).length > 0) {
        array.filter((x) => x.name == data.name)[0].value += data.value;
      } else {
        array.push(data);
      }
    });

    totalStockRelease = temp;
    totalStockReleaseQuantity = tempQuantity;

    return array;
  }



  function setupCharts() {
    try {
      let f = new Chart("#stocksChart", {
        data: dataStock,
        type: "donut",
        height: 380,
        // colors: ["#e9724d", "#d6d727", "#92cad1", "#79ccb3"],
      });
      let f2 = new Chart("#stockReleasesChart", {
        data: datastockRelease,
        type: "donut",
        height: 380,
      });
    } catch (e) {
      console.warn("Error Setting up charts", e);
    }
  }


  onMount(() => {
    getStocks();
    getStockReleases();
  });
</script>

<svelte:head>
  <title>Dashboard</title>
</svelte:head>

<br /><br />
<div class="container px-6 dashboard">
  <h3>Dashboard</h3>
  <br />

  <div class="columns">
    <div class="column card p-6">
      <Icon data={faChartLine} scale="2" /><br /><br />
      <h1 style="line-height: 1;color: blue;" class="is-size-2 my-1">
        {numberWithCommas(totalStock)} ETB
      </h1>
      <p>{numberWithCommas(totalStockQuantity)} Items</p> 
      <p class="gray">Total Stock</p>
    </div>
    <div class="column is-narrow"><div class="px-2" /></div>
    <div class="column card p-6">
      <Icon data={faTruck} scale="2" /><br /><br />
      <h1 style="line-height: 1;color: blue;" class="is-size-2 my-1">
        {numberWithCommas(totalStockRelease)} ETB
      </h1>
      <p>{numberWithCommas(totalStockReleaseQuantity)} Items</p> 
      <p class="gray">Total Stock Release</p>
    </div>
  </div>



  <br><br><br>

  <div class="columns">
    <div class="column">
      <div id="stocksChart" class="px-6 chart" />
    </div>
    <div class="column">
      <div id="stockReleasesChart" class="px-6 chart" />
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

  :global(.chart *) {
    color: white !important;
  }
</style>
