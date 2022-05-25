<script>
    import Icon from "svelte-awesome/components/Icon.svelte";
	import {
		faSearch,
		faAngleDown,
	} from "@fortawesome/free-solid-svg-icons";
import { xlink_attr } from "svelte/internal";

    export let columns;
    export let filterSelectedColumns = '';

    let filteredColumns = columns;

    $: if (filterSelectedColumns || true) {
            filteredColumns = columns.filter( x => x.title.toLowerCase().includes(filterSelectedColumns.toLowerCase()) )
    }
</script>
<div class="dropdown is-hoverable">
    <div class="dropdown-trigger">
        <button
            class="button"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
        >
            <span class="has-text-weight-semibold"
                >{columns.filter(x => x.selected ).length} Selected Columns</span
            >
            <span class="icon is-small">
                <Icon data={faAngleDown} scale="1" />
            </span>
        </button>
    </div>
    <div
        class="dropdown-menu"
        id="dropdown-menu"
        role="menu"
        style="min-width: 100%;"
    >
        <div class="dropdown-content py-0 has-text-left">
            <div class="control has-icons-right">
                <input
                    class="input is-light is-small"
                    bind:value={filterSelectedColumns}
                    type="search"
                    placeholder="Search"
                />
                <span class="icon is-small is-right is-primary">
                    <Icon data={faSearch} scale=".75" />
                </span>
            </div>
            {#each filteredColumns as col}
                <div
                    class="dropdown-item"
                    class:selected={col.selected}
                >
                    <label
                        class="checkbox is-flex is-align-items-centered"
                    >
                        <input bind:checked={col.selected} type="checkbox" class="mr-2 checkbox is-light" />
                        <span class="mt-1">{col.title}</span>
                    </label>
                </div>
            {/each}
        </div>
    </div>
</div>

<style>
    .dropdown-item:hover {
		background-color: rgb(242, 242, 242);
	}
	.dropdown-item.selected {
		background-color: rgb(79, 141, 255);
		color: white;
		font-weight: bold;
	}
	.dropdown-item.selected:hover span {
		color: white !important;
	}


    input.checkbox{
		/* transform: scale(1.5);		 */
		
		-webkit-appearance: none;
		background-color: #fafafa;
		border: 1px solid #cacece;
		padding: 9px;
		border-radius: 3px;
	}

	input.checkbox:checked {
		background-color: #2b75ff;
		border: 1px solid transparent;
		color: #ffffff;
	}
	input.checkbox:checked:after {
		content: '\2714';
		font-size: 14px;
		font-weight: bolder;
		position: absolute;
		top: 0px;
		left: 3px;
		color: #ffffff;
	}
</style>