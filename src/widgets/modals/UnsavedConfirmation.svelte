<script>
  import { createEventDispatcher, onDestroy, onMount } from "svelte";

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
    <div on:click={dismiss} class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head has-backgroud-white py-2">
        <p class="modal-card-title"></p>
        <button on:click={dismiss} class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        <p class="modal-card-title has-text-weight-bold px-6">You have Unsaved Items. </p>
        <p class="px-6">Your changes will be lost. Are you sure you want to go back?</p>
      </section>
      <footer class="modal-card-foot has-text-right is-justify-content-right py-2">
        
        <button on:click={dismiss} class="button has-text-dark">No</button>
        <button on:click={confirm} class="button is-dark">Yes</button>
      </footer>
    </div>
  </div>

 