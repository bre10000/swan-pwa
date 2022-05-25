<script>
	import { goto } from '@sapper/app';	

  import { onDestroy } from "svelte";
import { user } from "../store/user";

    const unsubscribe = user.subscribe((value) => {
    if (!process.browser) {
      return;
    }

    if (!value.loggedIn && value.fetched) {
      goto("/login");
    } else if(value.loggedIn && value.fetched) {
      goto("/dashboard")
    } 
  });

  onDestroy(unsubscribe);
</script>

