<script>
	import { createEventDispatcher, onMount } from "svelte";
	import Pagination from "./sub-components/Pagination.svelte";
	import { csvGenerator } from "../../utils/export/csvGenerator.js";
	import {
		getNumericFilter,
		getStringFilter,
		getWholeStringFilter,
	} from "../../utils/filter/filterValues.js";

	import Icon from "svelte-awesome/components/Icon.svelte";
	import {
		faSearch,
		faFileCsv,
		faFilePdf,
		faEllipsisH,
		faArrowDown,
		faList,
		faTrash,
		faEdit,
		faAngleUp,
		faAngleDown,
	} from "@fortawesome/free-solid-svg-icons";
	import SelectedColumns from "./sub-components/SelectedColumns.svelte";
	import { prevent_default, stop_propagation } from "svelte/internal";
	import { image_url } from "../../config";

	const dispatch = createEventDispatcher();
	export let columns;
	export let rows;

	export let sortBy = "";
	export let sortOrder = 1;
	export let iconAsc = "▲";
	export let iconDesc = "▼";

	export let pagination;

	export let options = {
		title: "Data Table",
		showSearch: false,
		showFilterHeader: false,
		showSelect: true,
		showDetails: true,
		showActions: true,
		showFooter: false,
	};

	let total = 0;

	let filter_text = "";
	let filterValues = {};
	let filterSettings = {};

	let columnByKey = {};
	let columnHeaders = [];

	let select_all = false;
	columns.forEach((col) => {
		columnByKey[col.key] = col;
		columnHeaders[col.title] = col;
	});

	const calculateFilterValues = () => {
		filterValues = {};
		columns.forEach((c) => {
			if (c.filterType === "numeric") {
				filterValues[c.key] = getNumericFilter(rows, c.key, c.interval);
			} else if (c.filterType === "string") {
				filterValues[c.key] = getStringFilter(rows, c.key);
			} else if (c.filterType === "whole-string") {
				filterValues[c.key] = getWholeStringFilter(rows, c.key);
			} else if (c.filterType === "array") {
				filterValues[c.key] = c.filterValues;
			}
		});
	};

	const handleClickCol = (col) => {
		// updateSortOrder(col.key);
		if (sortBy === col.key) {
			sortOrder *= -1;
		}
		sortBy = col.key;
		dispatch("clickCol", {
			key: sortBy + ":" + (sortOrder == 1 ? "asc" : "desc"),
		});
	};

	const handleClickRow = (row) => {
		dispatch("clickRow", { row });
	};

	const selectRow = (row) => {
		// row.selected = !row.selected;
		dispatch("selectRow", row);
	};
	const selectAllRows = () => {
		select_all = !select_all;
		rows.forEach((element) => {
			element.selected = select_all;
		});
		dispatch("selectAllRows", {
			rows,
			select_all,
		});
	};
	const handleClickCell = (row, key) => {
		dispatch("clickCell", {
			row,
			key,
		});
	};
	if (options.showFilterHeader) {
		calculateFilterValues();
	}
	const editRow = (row, event) => {
		event.preventDefault();
		document.getElementById(row.id).classList.toggle("is-active");
		dispatch("editRow", {
			row,
		});
	};
	const deleteRow = (row, event) => {
		event.preventDefault();
		document.getElementById(row.id).classList.toggle("is-active");
		dispatch("deleteRow", {
			row,
		});
	};
	const showDetails = (row) => {
		row.showDetails = row.showDetails ? !row.showDetails : true;
		dispatch("showDetails", {
			row,
		});
	};
	const showActionDropdown = (row) => {
		document.getElementById(row.id).classList.toggle("is-active");
		dispatch("showActionDropdown", {
			row,
		});
	};

	const changePage = (newPage) => {
		dispatch("changePage", {
			newPage,
		});
	};
</script>

<div class="container-fluid has-background-light table-container-main">
	{#if options.showSearch}
		<div class="columns is-align-items-centered px-3 mb-0 pt-2">
			<div class="column field pb-0 mb-0">
				<div class="control pb-0  has-icons-left">
					<input
						class="input"
						bind:value={filter_text}
						type="search"
						placeholder="Search"
					/>
					<span class="icon is-small is-left">
						<Icon data={faSearch} scale="1" />
					</span>
				</div>
			</div>
			<div class="column has-text-centered">
				<SelectedColumns bind:columns />
			</div>
			<div class="column has-text-right">
				<!-- <button on:click={downloadCSV} class="button">
					<span class="icon">
						<Icon data={faFileCsv} scale="1" />
					</span>
					<span>Download CSV</span>
				</button> -->
				<button class="button">
					<span class="icon">
						<Icon data={faFilePdf} scale="1" />
					</span>
					<span>Download PDF</span>
				</button>
			</div>
		</div>
	{/if}

	<div class="table-container py-0 my-0">
		<table class="table is-hoverable is-fullwidth is-borderless">
			<thead class="has-background-light">
				<tr>
					{#if options.showSelect}
						<th class="is-narrow">
							<label class="checkbox">
								<input
									on:click={() => {
										selectAllRows();
									}}
									type="checkbox"
									class="mr-2 checkbox is-light"
									style="transform: translateY(3px);"
								/>
							</label>
						</th>
					{/if}
					{#each columns.filter((x) => x.selected) as col}
						{#if (col.key !== "email") && (col.key !== "username")}
							<th
								class:isSortable={col.sortable}
								on:click={() => handleClickCol(col)}
							>
								{col.title}
								{#if sortBy === col.key}
									<!-- {sortOrder === 1 ? iconAsc : iconDesc} -->
									{#if sortOrder === 1}
										<span class="ml-4">
											<Icon data={faAngleUp} /></span
										>
									{:else}
										<span class="ml-4"
											><Icon data={faAngleDown} /></span
										>
									{/if}
								{/if}
							</th>
						{/if}
					{/each}
					{#if options.showActions}
						<th class="is-narrow"
							>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<Icon data={faList} scale="1" /> &nbsp;&nbsp;
							{#if options.showDetails}
								&nbsp;&nbsp;&nbsp;
							{/if}
						</th>
					{/if}
				</tr>

				{#if options.showFilterHeader}
					<tr>
						{#if options.showSelect}
							<td />
						{/if}
						{#each columns.filter((x) => x.selected) as col}
							<td>
								{#if options.showFilterHeader && filterValues[col.key] !== undefined}
									<div
										class="select is-small is-light"
										style="width: 100%;"
									>
										<select
											bind:value={filterSettings[col.key]}
											style="width: 100%;"
										>
											<option value={undefined}
												>Filter (Show all)</option
											>
											{#each filterValues[col.key] as option}
												<option value={option.value}
													>{option.name}</option
												>
											{/each}
										</select>
									</div>
								{/if}
							</td>
						{/each}
						{#if options.showActions}
							<th />
						{/if}
					</tr>
				{/if}
			</thead>
			{#if options.showFooter}
				<tfoot>
					<tr>
						{#if options.showSelect}
							<th class="is-narrow" />
						{/if}
						{#each columns.filter((x) => x.selected) as col}
							{#if (col.name !== "Email") && (col.name !== "Username")}
								<th
									class:isSortable={col.sortable}
									on:click={() => handleClickCol(col)}
								>
									{col.title}
									{#if sortBy === col.key}
										{sortOrder === 1 ? iconAsc : iconDesc}
									{/if}
								</th>
							{/if}
						{/each}
						{#if options.showActions}
							<th class="is-narrow" />
						{/if}
					</tr>
				</tfoot>
			{/if}

			<tbody>
				{#each rows as row, n}
					<tr
						class:has-backround-lightgreen={row.selected}
						on:click={() => {
							handleClickRow(row);
						}}
					>
						{#if options.showSelect}
							<td>
								<input
									type="checkbox"
									class="checkbox"
									bind:checked={row.selected}
									on:click|stopPropagation={() => {
										selectRow(row);
									}}
								/>
							</td>
						{/if}
						{#each columns.filter((x) => x.selected) as col}
							{#if (col.key !== "email") && (col.key !== "username")}
								<td
									on:click={() => {
										handleClickCell(row, col.key);
									}}
								>
									{#if col.key == "role"}
										{@html row[col.key]?.name
											? row[col.key]?.name
											: "-"}
									{:else if col.key == "name"}
										<div class="is-flex">
											<figure class="image is-64x64">
													{#if row["avatar"]?.url}
														<img
															class="is-rounded ml-0"
															src="{image_url}{row['avatar']
																?.url}"
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

											<div class="is-flex-grow-1">
												<p class="has-text-weight-bold mb-1 mt-1" style="line-height: 1;">{row["name"]}</p>
												<p class="gray mb-1 is-size-7" style="line-height: 1;">{row["username"]}</p>
												<p class="gray is-size-7" style="line-height: 1;">{row["email"]}</p>
											</div>
										</div>
									{:else if col.key == "email" || col.key == "username"}
										<!--  -->
									{:else if col.key == "blocked"}
										<span
											class="tag has-text-weight-bold p-2 mx-2"
											class:is-success={!row[col.key]}
											class:is-danger={row[col.key]}
										>
											{row[col.key] ? "Blocked" : "Active"}
										</span>
									{:else}
										{@html row[col.key] ? row[col.key] : "-"}
									{/if}
								</td>
							{/if}
						{/each}
						{#if options.showActions}
							<td class="has-text-right px-4">
								<div class="dropdown is-right" id={row.id}>
									<div class="dropdown-trigger">
										<button
											on:click|stopPropagation={() =>
												showActionDropdown(row)}
											class="button is-light is-small pl-1"
											aria-haspopup="true"
											aria-controls="dropdown-menu"
										>
											<span />
											<span
												class="icon is-small"
												aria-hidden="true"
												><Icon
													data={faEllipsisH}
												/></span
											>
										</button>
									</div>
									<div
										class="dropdown-menu action-dropdown"
										id="dropdown-menu"
										role="menu"
									>
										<div class="dropdown-content">
											<a
												href={"#"}
												on:click|stopPropagation={(
													event
												) => editRow(row, event)}
												class=" dropdown-item"
											>
												Edit
												<span class="icon is-small">
													<Icon
														data={faEdit}
														scale="1"
													/>
												</span>
											</a>
											<a
												href={"#"}
												on:click|stopPropagation={(
													event
												) => deleteRow(row, event)}
												class="dropdown-item has-text-danger"
											>
												Delete
												<span class="icon is-small">
													<Icon
														data={faTrash}
														scale="1"
													/>
												</span>
											</a>
										</div>
									</div>
								</div>

								{#if options.showDetails}
									<button
										on:clickstopPropagation={() =>
											showDetails(row)}
										class="button is-light is-small"
									>
										<span class="icon"
											><Icon
												data={faArrowDown}
												scale="1"
											/></span
										>
									</button>
								{/if}
							</td>
						{/if}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<div class="container-fluid py-4 px-5">
	{#if pagination}
		<Pagination
			current_page={pagination.page}
			pageCount={pagination.pageCount}
			on:change={(ev) => changePage(ev.detail)}
		/>
	{/if}
</div>

<style>
	.has-backround-lightgreen {
		background-color: #a6ffc4;
	}
	.has-backround-lightgreen:hover {
		background-color: #77ffa4 !important;
	}
	input.checkbox {
		/* transform: scale(1.5);		 */

		-webkit-appearance: none;
		background-color: #fafafa;
		border: 1px solid #cacece;
		padding: 9px;
		border-radius: 3px;
	}

	input.checkbox:checked {
		background-color: #1ed55b;
		border: 1px solid transparent;
		color: #ffffff;
	}
	input.checkbox:checked:after {
		content: "\2714";
		font-size: 14px;
		font-weight: bolder;
		position: absolute;
		top: 0px;
		left: 3px;
		color: #ffffff;
	}

	.table.is-borderless td,
	.table.is-borderless th {
		border: 0;
		border-bottom: 0.5px solid rgb(243, 243, 243);
	}

	.table-container {
		overflow: visible;
		height: max-content;
	}

	.action-dropdown .dropdown-content {
		margin-left: 50px !important;
	}
	.action-dropdown,
	.action-dropdown .dropdown-content,
	.action-dropdown .dropdown-item {
		width: 150px !important;
		z-index: 50 !important;
	}
	.action-dropdown .dropdown-item {
		padding: 0.4rem 1.5rem;
	}
</style>
