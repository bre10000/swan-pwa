<script context="module">
	import { isLoading, waitLocale } from "svelte-i18n";
	import { startClient } from "../i18n";
	import { localeS } from "../store/locale";

	localeS.fetch();
	startClient();
	export async function preload(page) {
		return waitLocale();
	}
</script>

<script>
	import { fade } from "svelte/transition";
	import { stores } from "@sapper/app";
	import PageLoadingBar from "sapper-page-loading-bar/PageLoadingBar.svelte";
	import Nav from "../components/layout/Nav.svelte";
	import { user } from "../store/user";
	import { onMount } from "svelte";
	import Icon from "svelte-awesome/components/Icon.svelte";
	import { faSpinner } from "@fortawesome/free-solid-svg-icons";
	import { SvelteToast, toast } from "@zerodevx/svelte-toast";

	export let segment;
	const { preloading } = stores();

	let app;

	console.log("Version - 0.0.2");

	function has(nodeList, selector) {
		return Array.from(nodeList).filter((e) => e.querySelector(selector));
	}

	onMount(() => {
		user.createUser();

		app = new SvelteToast({
			// Set where the toast container should be appended into
			target: document.body,
		});

		document.addEventListener("click", (event) => {
			let triggers = document.getElementsByClassName("dropdown");

			for (let element of triggers) {
				if (
					element !== event.target &&
					!has(element, event.target).length
				) {
					element.classList.remove("is-active");
				}
			}
		});
	});
</script>

{#if $isLoading}
	<div class="has-text-centered">
		<br /><br />
		<h1 class="is-size-1">
			<Icon spin={true} data={faSpinner} scale="2" />
		</h1>
		<p class="has-text-purple">Loading</p>
		<!-- <a href="advertise/add-campaign" class="button is-gradient is-medium has-text-white my-2 is-outlined is-rounded px-5 py-2 has-text-weight-bold">Post Campaign</a> -->
		<br /><br />
	</div>
{:else}
	{#if segment == "login"}
		<main class="has-background-light login-page">
			<slot />
		</main>

	{:else if segment == "reports"}
		<main class="has-background-light">
			<slot />
		</main>

	{:else if !segment || segment == "logout"}
		
		<slot />
	{:else}
		<div class="is-flex">
			<Nav {segment} />
			<div
				class="content is-flex-grow-1 has-background-lightgray"
				id="content"
				transition:fade
			>
				<slot />
			</div>
		</div>
	{/if}

	<PageLoadingBar {preloading} color1="#8e8fff" color2="#5052A2" />
{/if}

<style>
	.login-page {
		background-color: #ffffff;
		background-image: url("data:image/svg+xml,%3Csvg width='32' height='64' viewBox='0 0 32 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 28h20V16h-4v8H4V4h28v28h-4V8H8v12h4v-8h12v20H0v-4zm12 8h20v4H16v24H0v-4h12V36zm16 12h-4v12h8v4H20V44h12v12h-4v-8zM0 36h8v20H0v-4h4V40H0v-4z' fill='%23cccccc' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E");
	}
</style>
