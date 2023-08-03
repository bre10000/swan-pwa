<script>
  import { createEventDispatcher, onDestroy, onMount } from "svelte";
  import { Moon } from "svelte-loading-spinners";

const dispatch = createEventDispatcher();

  function confirm() {
    dispatch("confirm");
  }
  function dismiss() {
    dispatch("dismiss");
  }


  onMount(() => {
    document.getElementById("content").classList.add('is-active');
  });

  onDestroy(() => {
    document.getElementById("content").classList.remove('is-active');
  });
</script>
<div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head has-backgroud-white py-2">
        <p class="modal-card-title has-text-centered has-font-weight-bold">Loading Purchase Orders</p>
      </header>
      <section class="modal-card-body">

        <div class="has-text-centered">
          <br /><br />
          <div class="is-flex is-justify-content-center">
              <Moon size="60" color="blue" unit="px" duration="1s" />
          </div>
          <br /><br />
      </div>
      </section>     
    </div>
  </div>

 