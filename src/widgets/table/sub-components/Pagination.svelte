<script>

  export let current_page = 1;
  export let pageCount = 10;

  let pageGroup = 0;

  $: {
      let pg = 0;
      while(current_page-(pageCount*pg) > 0){
          pg++;
      }
      pageGroup = pg-1;
  }

  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function range(size, sAt = 0) {
    let startAt = (sAt * pageCount);
    let cSize = size;
    if((startAt + cSize) > pageCount){
        cSize = pageCount - (startAt+cSize);
        if(cSize<=0){
            cSize = 1;
        }
    }
    if(cSize > pageCount){
        cSize = pageCount;
    }
    return [...Array(cSize).keys()].map(i => i + startAt +1);
  }

  function getPages() {
    let temp = [];
    for (let index = 1; index <= pageCount; index++) {
      temp.push(index);
      
    }
    return temp;
  }

  function changePage(page, event) {
    event.preventDefault()
    if (page !== current_page && page > 0 && page <= pageCount) {
      current_page = page;
      dispatch('change', page);
    }
  }

</script>


<nav class="pagination is-centered" role="navigation" aria-label="pagination">
  <a on:click="{(event) => changePage(current_page - 1, event)}" href={'#'} class="pagination-previous">Previous</a>
  <a on:click="{(event) => changePage(current_page + 1, event)}" href={'#'} class="pagination-next">Next page</a>
  <ul class="pagination-list">

    {#each getPages() as page}
      <li><a on:click="{(event) => changePage(page, event)}" href={'#'} class="pagination-link" class:is-current={current_page == page} aria-label="Goto page {page}">{page}</a></li>
    {/each}
    
  </ul>
</nav>

<style>
  .is-current {
    background-color: #0000BF;
    border: none;
  }
  
</style>
