<br /><br />
<div class="container px-6 dashboard">
  <h3 class="has-text-info" >Reports</h3>
  <br />

  <div class="card no-shadow columns is-multiline p-5">


    <a href="reports/aggregate/waybill-destination" class="column is-4">
      <div>
          <div class="card">
            <div class="card-image p-2">
              <figure
                class="image is-4by3"
                style="background-image: url('images/reports/1.jpg');"
              />
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p class="title is-5">Waybill by Destination </p>
                  <p class="subtitle is-6">Filter by Destination and Date</p>
                </div>
              </div>
            </div>
        </div>
      </div>
    </a>
  
    <a href="reports/aggregate/item-waybill-category" class="column is-4">
      <div>
          <div class="card">
            <div class="card-image p-2">
              <figure
                class="image is-4by3"
                style="background-image: url('images/reports/2.jpg');"
              />
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p class="title is-5">Item Waybill by Category </p>
                  <p class="subtitle is-6">Filter by Consortium Member and Date</p>
                </div>
              </div>
            </div>
          </div>
      </div>
    </a>

    <!-- <a href="reports/aggregate/item-stock-release-consortium" class="column is-4">
      <div>
          <div class="card">
            <div class="card-image p-2">
              <figure
                class="image is-4by3"
                style="background-image: url('images/reports/3.jpg');"
              />
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p class="title is-5">Item Stock Release by Consortium Member </p>
                  <p class="subtitle is-6">Filter by Consortium Member and Date</p>
                </div>
              </div>
            </div>
          </div>
      </div>
    </a> -->

    <a href="reports/aggregate/stock-balance" class="column is-4">
      <div>
          <div class="card">
            <div class="card-image p-2">
              <figure
                class="image is-4by3"
                style="background-image: url('images/reports/4.jpg');"
              />
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p class="title is-5">Stock Balance </p>
                  <p class="subtitle is-6">Filter by Date</p>
                </div>
              </div>
            </div>
          </div>
      </div>
    </a>

    <a href="reports/aggregate/item-search" class="column is-4">
      <div>
          <div class="card">
            <div class="card-image p-2">
              <figure
                class="image is-4by3"
                style="background-image: url('images/reports/6.jpg');"
              />
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p class="title is-5">Item Search (Waybill)</p>
                  <p class="subtitle is-6">Filter by Consortium Member and Date</p>
                </div>
              </div>
            </div>
          </div>
      </div>
    </a>

    <a href="reports/aggregate/stock-warehouse" class="column is-4">
      <div>
          <div class="card">
            <div class="card-image p-2">
              <figure
                class="image is-4by3"
                style="background-image: url('images/reports/7.jpg');"
              />
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p class="title is-5">Stock by Warehouse </p>
                  <p class="subtitle is-6">Filter by Consortium Member and Date</p>
                </div>
              </div>
            </div>
          </div>
      </div>
    </a>


  </div>

  <br /><br /><br /><br /><br /><br /><br />
  <br /><br /><br />
</div>

<style>
  .image.is-4by3 {
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
    width: 150px;
    height: 100px;
    margin: 0 auto;
  }
  .card .card{
    height: 100%;
    flex-direction: column;
    display: flex;
    flex-grow: 1;
    box-shadow: none;
    border: 1px solid rgb(240, 240, 240);
  }
  .card .card:hover{    
    border: 2px solid #0000BF;
  }
  a.column div{
    height: 100%;
    flex-direction: column;
    display: flex;
    flex-grow: 1;
  } 
</style>
