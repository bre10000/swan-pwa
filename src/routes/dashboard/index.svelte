<script>
  import Icon from "svelte-awesome/components/Icon.svelte";
  import {
    faChartLine,
    faList,
    faTruck,
  } from "@fortawesome/free-solid-svg-icons";

  import { onDestroy, onMount } from "svelte";
  import { user } from "../../store/user";
  import { numberWithCommas, checkValue } from "../../lib";
  import qs from "qs";
  import { get } from "../../lib/api";
  import { Chart } from "frappe-charts";
  import Pie from "svelte-chartjs/src/Pie.svelte"
  import { goto } from "@sapper/app";

  const unsubscribe = user.subscribe((value) => {
    if (!process.browser) {
      return;
    }

    if (!value.loggedIn && value.fetched) {
      goto("login");
    }
  });

  onDestroy(unsubscribe);

  let totalStock = 0;
  let totalStockQuantity = 0;

  let totalStockRelease = 0;
  let totalStockReleaseQuantity = 0;

  let stocks = [];
  let stock_releases = [];


  let dataStock = {};

  let datastockRelease = {};


  async function getStockReleases() {
    try {
      let params = {
        populate: [
          "consortium_member",
          "stock_release_items",
          "stock_release_items.purchase_order_item",
          "stock_release_items.stock_item",
          "stock_release_items.stock_item.stock",
        ],
        "pagination[limit]": -1,
      };
      params = qs.stringify(params, {
        encodeValuesOnly: true,
      });
      let response = await get("stock-releases", params);

      console.log("Get Stock Release ", response);

      stock_releases = response.data;

      stock_releases.forEach(element => {
        element.attributes.stock_release_items.data = element.attributes.stock_release_items?.data.filter( x => x.attributes.stock_item?.data?.attributes.stock?.data.id )
      });

      let array = generateGraphStockRelease();

      datastockRelease = {
        labels: array.map( x => x.name),
        datasets: [
          {
            // name: "Stock Amount (ETB)",
            data: array.map( x => x.value),
            backgroundColor: [
          "#F7464A",
          "#46BFBD",
          "#FDB45C",
          "#949FB1",
          "#4D5360",
          "#AC64AD"
        ],
        hoverBackgroundColor: [
          "#FF5A5E",
          "#5AD3D1",
          "#FFC870",
          "#A8B3C5",
          "#616774",
          "#DA92DB"
        ]
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
          "stock_items.purchase_order_item.purchase_order",
        ],
        "pagination[limit]": -1,
      };
      params = qs.stringify(params, {
        encodeValuesOnly: true,
      });
      let response = await get("stocks", params);

      console.log("Get Stock  ", response);

      stocks = response.data;

      stocks.forEach(element => {
        element.attributes.stock_items.data = element.attributes.stock_items.data.filter( x => x.attributes.purchase_order_item?.data?.attributes.purchase_order?.data.id );

      });

      let array = generateGraphStock();

      dataStock = {
        labels: array.map( x => x.name),
        datasets: [
          {
            // name: "Stock Amount (ETB)",
            data: array.map( x => x.value),
            backgroundColor: [
          "#F7464A",
          "#46BFBD",
          "#FDB45C",
          "#949FB1",
          "#4D5360",
          "#AC64AD"
        ],
        hoverBackgroundColor: [
          "#FF5A5E",
          "#5AD3D1",
          "#FFC870",
          "#A8B3C5",
          "#616774",
          "#DA92DB"
        ]
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
      

      let valueTotal = 0;
      element2.attributes.stock_items.data?.forEach((element) => {
        let value = 0;
        value +=
        parseFloat(element.attributes.purchase_order_item.data?.attributes.unitPrice) *
        parseFloat(element.attributes.received);
        console.log(value);
        temp += value;
        valueTotal += value
        tempQuantity += parseFloat(element.attributes.received);
      });

      let data = {
        name: element2.attributes.consortium_member.data?.attributes.name,
        value: valueTotal,
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
      
      let valueTotal = 0;
      element2.attributes.stock_release_items.data?.forEach((element) => {
        let value = 0;

        value +=
          element.attributes.purchase_order_item.data?.attributes.unitPrice *
          element.attributes.quantity;

        valueTotal += value
        temp += value;
        tempQuantity += parseFloat(element.attributes.quantity);
      });

      let data = {
        name: element2.attributes.consortium_member.data?.attributes.name,
        value: valueTotal,
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
        height: 340,
        // colors: ["#e9724d", "#d6d727", "#92cad1", "#79ccb3"],
      });
      let f2 = new Chart("#stockReleasesChart", {
        data: datastockRelease,
        type: "donut",
        height: 340,
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
  <h3 class="has-text-info">Dashboard</h3>
  <br>
  
  <div class="columns">
    <div  on:click={() => goto("consortium-members")} class="column card has-background-light no-shadow p-5">
      <Icon data={faChartLine} scale="2" /><br /><br />
      <h1 style="line-height: 1;color: #0000BF;" class="is-size-2 my-1">
        {numberWithCommas(totalStock)} ETB
      </h1>
      <p>{numberWithCommas(totalStockQuantity)} Items</p> 
      <p class="gray">Total Stock</p>
    </div>
    <div class="column is-narrow"><div class="px-2" /></div>
    <div  on:click={() => goto("consortium-members")}  class="column card has-background-light no-shadow p-5">
      <Icon data={faTruck} scale="2" /><br /><br />
      <h1 style="line-height: 1;color: #0000BF;" class="is-size-2 my-1">
        {numberWithCommas(totalStockRelease)} ETB
      </h1>
      <p>{numberWithCommas(totalStockReleaseQuantity)} Items</p> 
      <p class="gray">Total Stock Release</p>
    </div>
  </div>



  <br>
  <div class="columns">
    <div class="column p-6">
       <Pie data={dataStock}/>
    </div>
    <div class="column p-6">
       <Pie data={datastockRelease} />
    </div>
  </div>

 
 

  <!-- <div class="columns">
    <div class="column">
      <div id="stocksChart" class="px-4 chart" />
    </div>
    <div class="column">
      <div id="stockReleasesChart" class="px-4 chart" />
    </div>
  </div> -->

</div>

<style>
  .column.card {
    border-radius: 10px;
  }

  :global(.container.px-6.dashboard svg *) {
    color: #0000BF !important;
  }

  :global(.chart *) {
    color: white !important;
  }

  .has-background-lightblue{
    background-color: rgb(rgb(151, 151, 255)) !important;
  }
</style>
