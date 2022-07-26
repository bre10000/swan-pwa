<script>
	import { createEventDispatcher, onMount } from "svelte";
	import Pagination from "../sub-components/Pagination.svelte";
	import { csvGenerator } from "../../../utils/export/csvGenerator.js";
	import {
		getNumericFilter,
		getStringFilter,
		getWholeStringFilter,
	} from "../../../utils/filter/filterValues.js";

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
	import SelectedColumns from "../sub-components/SelectedColumns.svelte";
	import { prevent_default, stop_propagation } from "svelte/internal";
	import { numberWithCommas, checkValue } from "../../../lib";
	import { toast } from "@zerodevx/svelte-toast";
	import Select from "svelte-select";

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

	let c_rows = rows;

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

	$: if (filter_text && c_rows) {
		if (filter_text == " ") filter_text = "";
		c_rows = rows
			.filter((r) => searchByKey(r))
			.map((r) =>
				Object.assign({}, r, {
					$sortOn: r[sortBy],
				})
			)
			.sort((a, b) => {
				if (a.$sortOn > b.$sortOn) return sortOrder;
				else if (a.$sortOn < b.$sortOn) return -sortOrder;
				return 0;
			});
	}

	function searchByKey(r) {
		let temp = false;
		Object.keys(r).forEach((element) => {
			if (
				r[element]
					.toString()
					.toLowerCase()
					.includes(filter_text.toLowerCase())
			)
				temp = true;
		});
		return temp;
	}

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

	const changeChequeType = (row) => {
		// row.selected = !row.selected;
		dispatch("changeChequeType", row);
	};
	const changeBank = (row) => {
		// row.selected = !row.selected;
		dispatch("changeBank", row);
	};
	const changeBankBranch = (row) => {
		// row.selected = !row.selected;
		dispatch("changeBankBranch", row);
	};
	const selectRow = (row) => {
		// row.selected = !row.selected;
		// if(row.status !== "Done" && row.cheque_type && row.bank && row.bank_branch){
		dispatch("selectRow", row);
		// } else {
		//     toast.push("Order can't be selected because you havent filled the necessary fields", {
		//             duration: 20000,
		//             theme: {
		//                 "--toastBackground": "red",
		//                 "--toastBarBackground": "darkred",
		//             },
		//         });
		// }
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

	const downloadCSV = () => {
		let now = new Date();
		let fname = `${
			options.title
		} ${now.getFullYear()}-${now.getMonth()}-${now.getDate()} T${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}.csv`;

		let tableKeys = Object.keys(columnByKey);
		csvGenerator(c_rows, tableKeys, columnHeaders, fname);
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
				<button on:click={downloadCSV} class="button">
					<span class="icon">
						<Icon data={faFileCsv} scale="1" />
					</span>
					<span>Download CSV</span>
				</button>
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
		<table class="table is-hoverable is-borderless">
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
							<th
								class:isSortable={col.sortable}
								on:click={() => handleClickCol(col)}
							>
								{col.title}
								{#if sortBy === col.key}
									{sortOrder === 1 ? iconAsc : iconDesc}
								{/if}
							</th>
						{/each}
						{#if options.showActions}
							<th class="is-narrow" />
						{/if}
					</tr>
				</tfoot>
			{/if}

			<tbody>
				{#each rows as row}
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
									checked={row.selected}
									disabled={row.status == "Done"}
									on:click|stopPropagation={() => {
										selectRow(row);
									}}
								/>
							</td>
						{/if}
						{#each columns.filter((x) => x.selected) as col}
							<td
								on:click={() => {
									handleClickCell(row, col.key);
								}}
							>
								{#if col.key == "id"}
									{@html row?.id ? row[col.key] : "-"}
								{:else if col.key == "created_by"}
									{@html row.users_permissions_user?.data
										?.attributes.name
										? row.users_permissions_user.data
												?.attributes.name
										: "-"}
								{:else if col.key == "purchase_order"}
									{@html row.purchase_order?.attributes
										.poNumber
										? row.purchase_order?.attributes
												.poNumber
										: "-"}
								{:else if col.key == "item"}
									{@html row.item?.attributes.name
										? row.item?.attributes.name
										: "-"}
								{:else if col.key == "consortium_member"}
									{@html row.consortium_member?.attributes
										.name
										? row.consortium_member?.attributes.name
										: "-"}
								{:else if col.key == "status"}
									<button
										type="button"
										data-tooltip={row.message
											? row.message
											: "-"}
										class="button is-danger is-small has-tooltip-danger has-tooltip-multiline has-tooltip-left"
										class:is-success={row[col.key] ==
											"Done"}
										class:is-danger={row[col.key] ==
											"Error"}
										>{row.status ? row.status : "-"}</button
									>
								{:else if col.title == "Date"}
									{@html row[col.key]
										? new Date(
												row[col.key]
										  ).toDateString() +
										  " - " +
										  new Date(
												row[col.key]
										  ).toLocaleTimeString()
										: "-"}
								{:else if col.title == "Date "}
									{@html row?.date
										? new Date(row.date).toDateString()
										: "-"}
								{:else}
									{@html row[col.key] ? row[col.key] : "-"}
								{/if}
							</td>
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
		overflow: visible !important;
	}

	.table,
	tbody,
	thead,
	.container-fluid {
		overflow: visible !important;
	}

	.table-container {
		overflow-x: visible !important;
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
