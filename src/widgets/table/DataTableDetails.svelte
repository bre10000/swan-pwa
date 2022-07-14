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
		faPrint,
		faArrowUp,
	} from "@fortawesome/free-solid-svg-icons";
	import SelectedColumns from "./sub-components/SelectedColumns.svelte";
	import { prevent_default, stop_propagation } from "svelte/internal";
	import { checkInput, numberWithCommas, checkValue } from "../../lib";

	const dispatch = createEventDispatcher();
	export let columns;
	export let rows;
	export let columnsDetails;
	export let detailVariable;

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

	const selectRow = (row) => {
		row.selected = true;
		dispatch("selectRow", row);
	};
	const selectAllRows = () => {
		select_all = !select_all;
		c_rows.forEach((element) => {
			element.selected = select_all;
		});
		dispatch("selectAllRows", {
			c_rows,
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
	const printRow = (row) => {
		// event.preventDefault();
		// document.getElementById(row.id).classList.toggle("is-active");
		dispatch("printRow", {
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

	function getStockBalance(item) {
		let temp = 0;
		if (item.attributes.stock_release_items?.data) {
			item.attributes.stock_release_items?.data
				?.filter((x) => checkInput(x.attributes.stock_release.data))
				.forEach((element) => {
					temp = temp + element.attributes.quantity;
				});
		}

		return numberWithCommas(item.attributes.received - temp);
	}

	function getStockReleaseBalance(item) {
		let temp = 0;
		if (item.attributes.waybill_items?.data) {
			item.attributes.waybill_items?.data
				?.filter((x) => checkInput(x.attributes.waybill.data))
				.forEach((element) => {
					temp = temp + parseInt(element.attributes.quantity);
				});
		}

		return numberWithCommas(item.attributes.quantity - temp);
	}
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
				{#each rows as row, n}
					<tr
						class:has-background-info={row.selected}
						class:has-text-white={row.selected}
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
							<td
								on:click={() => {
									handleClickCell(row, col.key);
								}}
							>
								{#if col.key == "id" && detailVariable == "stock_items"}
									<span
										class="has-text-info"
										style="font-weight: 900;"
									>
										{@html row[col.key]
											? row[col.key]
											: "-"}
									</span>
								{:else if col.key == "id"}
									<span class="has-text-info">
										{@html row[col.key]
											? row[col.key]
											: "-"}
									</span>
								{:else if col.key == "consortium_member"}
									<span
										class="has-text-info"
										style="font-weight: 600 !important;"
									>
										{@html row.attributes[col.key]?.data
											?.attributes.name
											? row.attributes[col.key]?.data
													?.attributes.name
											: "-"}
									</span>
								{:else if col.key == "warehouse"}
									<span>
										{@html row.attributes[col.key]?.data
											?.attributes.name
											? row.attributes[col.key]?.data
													?.attributes.name
											: "-"}
									</span>
								{:else}
									{@html row.attributes[col.key]
										? row.attributes[col.key]
										: "-"}
								{/if}
							</td>
						{/each}
						{#if options.showActions}
							<td class="has-text-right px-4 is-flex">
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

								{#if options.showPrint}
									<button
										on:click|stopPropagation={() =>
											printRow(row)}
										class="button is-light is-small"
									>
										<span class="icon"
											><Icon
												data={faPrint}
												scale="1"
											/></span
										>
									</button>
								{/if}

								{#if options.showDetails}
									<button
										on:click|stopPropagation={() =>
											showDetails(row)}
										class="button is-light is-small"
									>
										<span class="icon"
											><Icon
												data={row.showDetails
													? faArrowDown
													: faArrowUp}
												scale="1"
											/></span
										>
									</button>
								{/if}
							</td>
						{/if}
					</tr>
					{#if row.attributes[detailVariable]?.data}
						{#each row.attributes[detailVariable].data as item, index}
							<tr
								class="has-background-light has-border-bottom-gray"
							>
								<td
									colspan={columns.filter((x) => x.selected)
										.length + 1}
								>
									{#if detailVariable == "purchase_order_items"}
										<div class="columns">
											<div
												class="column is-narrow light-gray"
											>
												#{index + 1}
											</div>
											{#each columnsDetails as col}
												{#if col.key == "item_id"}
													<div
														class:has-background-lightgreen={col.key ==
															"item_id"}
														class="column is-narrow gray has-text-centered px-4"
													>
														<span
															class="is-small tag is-info is-light"
															>PO Item ID</span
														> <br />

														{item.id}
													</div>
												{:else if col.key == "item"}
													<div
														class="column is-3 px-4"
													>
														<span class=""
															>{item.attributes[
																col.key
															]?.data?.attributes
																.name}</span
														>
														<br />
														<span class="gray"
															>{item.attributes[
																col.key
															]?.data?.attributes
																.category}</span
														>
														<!-- <br />
														<span class="gray">
															SOF - {item
																.attributes.sof
																? item
																		.attributes
																		.sof
																: "-"}
														</span> -->
													</div>
												{:else if col.key == "unit"}
													<div
														class="column has-text-centered"
													>
														<span
															class="is-small tag"
															>{col.title}</span
														> <br />
														<span class=""
															>{item.attributes
																.item?.data
																?.attributes
																.unit
																? item
																		.attributes
																		.item
																		?.data
																		?.attributes
																		.unit
																: "-"}</span
														>
													</div>
												{:else if col.key == "pieces"}
													<div
														class="column has-text-centered"
													>
														<span
															class="is-small tag"
															>{col.title}</span
														> <br />
														<span class=""
															>{item.attributes
																.item?.data
																?.attributes
																.pieces
																? item
																		.attributes
																		.item
																		?.data
																		?.attributes
																		.pieces
																: "-"}</span
														>
													</div>
												{:else if col.key == "unitPrice" || col.key == "quantity"}
													<div
														class="column has-text-centered"
													>
														<span
															class="is-small tag"
															>{col.title}</span
														> <br />
														{item.attributes[
															col.key
														]
															? numberWithCommas(
																	parseFloat(
																		item
																			.attributes[
																			col
																				.key
																		]
																	)
															  )
															: "-"}
													</div>
												{:else if col.key == "total"}
													<div
														class="column has-text-centered"
													>
														<span
															class="is-small tag"
															>{col.title}</span
														> <br />
														{item.attributes
															.unitPrice
															? numberWithCommas(
																	parseFloat(
																		item
																			.attributes
																			.unitPrice
																	) *
																		parseFloat(
																			item
																				.attributes
																				.quantity
																		)
															  )
															: "-"}
													</div>
												{:else}
													<div
														class="column has-text-centered"
													>
														<span
															class="is-small tag"
															>{col.title}</span
														> <br />
														{item.attributes[
															col.key
														]
															? item.attributes[
																	col.key
															  ]
															: "-"}
													</div>
												{/if}
											{/each}
										</div>
									{:else if detailVariable == "stock_items"}
										<div class="columns">
											<div
												class="column is-narrow light-gray"
											>
												#{index + 1} <br />
												<i class="has-text-light"
													>{item.id}</i
												>
											</div>
											{#each columnsDetails as col}
												{#if col.key == "id"}
													<div
														class="column is-narrow gray"
													>
														<span
															class="is-small tag"
															>Item ID</span
														> <br />
														{item[col.key]}
													</div>
												{:else if col.key == "item"}
													<div class="column is-2">
														<span class=""
															>{item.attributes
																.purchase_order_item
																?.data
																?.attributes[
																col.key
															]?.data?.attributes
																.name} -
															<span class="gray"
																>{item
																	.attributes
																	.purchase_order_item
																	?.data
																	?.attributes[
																	col.key
																]?.data
																	?.attributes
																	.category}</span
															>
															<br />

															<span
																class="has-text-info has-text-weight-bold"
															>
																PO Item ID -
																{item.attributes
																	.purchase_order_item
																	?.data?.id}
															</span>
															<br />
															<span class="gray">
																SOF - {item
																	.attributes
																	.purchase_order_item
																	?.data
																	?.attributes
																	.sof
																	? item
																			.attributes
																			.purchase_order_item
																			?.data
																			?.attributes
																			.sof
																	: "-"}
															</span>
															<br />
															{#if item.attributes.has_expiry}
																<span
																	class="has-text-weight-bold"
																	class:has-text-success={new Date(
																		item.attributes.expiry_date
																	).getTime() >
																		Date.now()}
																	class:has-text-danger={new Date(
																		item.attributes.expiry_date
																	).getTime() <
																		Date.now()}
																>
																	EXP.D -
																	{item
																		.attributes
																		.expiry_date
																		? item
																				.attributes
																				.expiry_date
																		: "-"}
																	({item
																		.attributes
																		.expiry_date
																		? numberWithCommas(
																				parseInt(
																					(new Date(
																						item.attributes.expiry_date
																					).getTime() -
																						new Date().getTime()) /
																						86400000
																				)
																		  )
																		: "-"} Days)
																</span>
															{/if}
														</span>
													</div>
												{:else if col.key == "unit"}
													<div
														class="column has-text-centered"
													>
														<span
															class="is-small tag"
															>{col.title}</span
														> <br />
														{item.attributes
															.purchase_order_item
															?.data?.attributes
															.item?.data
															?.attributes[
															col.key
														]
															? item.attributes
																	.purchase_order_item
																	?.data
																	?.attributes
																	.item?.data
																	?.attributes[
																	col.key
															  ]
															: "-"}
													</div>
												{:else if col.key == "pieces"}
													<div
														class="column has-text-centered"
													>
														<span
															class="is-small tag"
															>{col.title}</span
														> <br />
														{item.attributes
															.purchase_order_item
															?.data?.attributes
															.item?.data
															?.attributes[
															col.key
														]
															? numberWithCommas(
																	item
																		.attributes
																		.purchase_order_item
																		?.data
																		?.attributes
																		.item
																		?.data
																		?.attributes[
																		col.key
																	]
															  )
															: "-"}
													</div>
												{:else if col.key == "total"}
													<div
														class="column has-text-centered"
													>
														<span
															class="is-small tag"
															>{col.title}</span
														> <br />
														{item.attributes
															.received
															? numberWithCommas(
																	parseFloat(
																		item
																			.attributes
																			.received
																	) *
																		parseFloat(
																			item
																				.attributes
																				.purchase_order_item
																				?.data
																				?.attributes
																				.unitPrice
																		)
															  )
															: "-"}
													</div>
												{:else if col.key == "poNumber"}
													<div
														class="column has-background-lightgreen has-text-centered"
													>
														<span
															class="is-small tag is-info is-light"
															>{col.title}</span
														> <br />
														{item.attributes
															.purchase_order_item
															?.data?.attributes
															.purchase_order.data
															.attributes
															.poNumber}
													</div>
												{:else if col.key != "received" && col.key != "poNumber" && col.key != "balance"}
													<div
														class="column has-text-centered"
													>
														<span
															class="is-small tag"
															>{col.title}</span
														> <br />
														{item.attributes
															.purchase_order_item
															?.data?.attributes[
															col.key
														]}
													</div>
												{:else if col.key == "balance"}
													<div
														class="column has-text-centered"
													>
														<span
															class="is-small tag"
															>{col.title}</span
														> <br />
														{getStockBalance(item)}
													</div>
												{:else}
													<div
														class="column has-text-centered"
													>
														<span
															class="is-small tag"
															>{col.title}</span
														> <br />
														{item.attributes[
															col.key
														]
															? item.attributes[
																	col.key
															  ]
															: "-"}
													</div>
												{/if}
											{/each}
										</div>
									{:else if detailVariable == "stock_release_items"}
										<div class="columns">
											<div
												class="column is-narrow light-gray"
											>
												#{index + 1} <br />
												<i class="has-text-light"
													>{item.id}</i
												>
											</div>
											{#each columnsDetails as col}
												{#if col.key == "id"}
													<div
														class="column is-narrow light-gray"
													>
														#{index + 1} <br />
														<i
															class="has-text-light"
															>{item.id}</i
														>
													</div>
												{:else if col.key == "item"}
													<div
														class="column is-2 is-narrow"
													>
														<span class=""
															>{item.attributes
																.purchase_order_item
																?.data
																?.attributes[
																col.key
															]?.data?.attributes
																.name}

															<span class="gray"
																>{item
																	.attributes
																	.purchase_order_item
																	?.data
																	?.attributes[
																	col.key
																]?.data
																	?.attributes
																	.category}</span
															> <br />
															<span
																class="has-text-info has-text-weight-bold"
																>PO Item ID - {item
																	.attributes
																	.purchase_order_item
																	?.data?.id}
															</span> <br />

															<span class="gray">
																SOF - {item
																	.attributes
																	.purchase_order_item
																	?.data
																	?.attributes
																	.sof
																	? item
																			.attributes
																			.purchase_order_item
																			?.data
																			?.attributes
																			.sof
																	: "-"}
															</span>
														</span>
													</div>
												{:else if col.key == "unit" || col.key == "pieces"}
													<div
														class="column has-text-centered"
													>
														<span
															class="is-small tag"
															>{col.title}</span
														> <br />
														{item.attributes
															.purchase_order_item
															?.data?.attributes
															.item?.data
															?.attributes[
															col.key
														]
															? item.attributes
																	.purchase_order_item
																	?.data
																	?.attributes
																	.item?.data
																	?.attributes[
																	col.key
															  ]
															: "-"}
													</div>
												{:else if col.key == "unitPrice"}
													<div
														class="column has-text-centered"
													>
														<span
															class="is-small tag"
															>{col.title}</span
														> <br />
														{item.attributes
															.purchase_order_item
															?.data?.attributes[
															col.key
														]
															? numberWithCommas(
																	item
																		.attributes
																		.purchase_order_item
																		?.data
																		?.attributes[
																		col.key
																	]
															  )
															: "-"}
													</div>
												{:else if col.key == "currency"}
													<div
														class="column has-text-centered"
													>
														<span
															class="is-small tag"
															>{col.title}</span
														> <br />
														{item.attributes
															.purchase_order_item
															?.data?.attributes[
															col.key
														]
															? item.attributes
																	.purchase_order_item
																	?.data
																	?.attributes[
																	col.key
															  ]
															: "-"}
													</div>
												{:else if col.key == "total"}
													<div
														class="column has-text-centered"
													>
														<span
															class="is-small tag"
															>{col.title}</span
														> <br />
														{item.attributes
															.purchase_order_item
															?.data?.attributes
															.unitPrice
															? numberWithCommas(
																	parseFloat(
																		item
																			.attributes
																			.purchase_order_item
																			?.data
																			?.attributes
																			.unitPrice
																	) *
																		parseFloat(
																			item
																				.attributes
																				.quantity
																		)
															  )
															: "-"}
													</div>
												{:else if col.key == "poNumber"}
													<div
														class="column has-text-centered has-background-lightgreen"
													>
														<span
															class="is-small tag is-info is-light"
															>{col.title}</span
														> <br />
														{item.attributes
															.purchase_order_item
															?.data?.attributes
															?.purchase_order
															.data.attributes
															.poNumber}
													</div>
												{:else if col.key == "batch_number"}
													<div
														class="column has-text-centered has-background-lightgreen"
													>
														<span
															class="is-small tag is-info is-light"
															>{col.title}</span
														> <br />
														<span
															class="has-text-info"
															style="font-weight: 900;"
														>
															{item.attributes
																.stock_item
																?.data
																?.attributes
																?.stock.data.id
																? item
																		.attributes
																		.stock_item
																		?.data
																		?.attributes
																		?.stock
																		.data.id
																: "-"}
														</span>
													</div>
												{:else if col.key == "quantity"}
													<div
														class="column has-text-centered"
													>
														<span
															class="is-small tag"
															>{col.title}</span
														> <br />
														{item.attributes[
															col.key
														]
															? numberWithCommas(
																	item
																		.attributes[
																		col.key
																	]
															  )
															: "-"}
													</div>
												{:else if col.key == "remaining"}
													<div
														class="column has-text-centered"
													>
														<span
															class="is-small tag"
															>{col.title}</span
														> <br />
														{getStockReleaseBalance(
															item
														)}
													</div>
												{:else}
													<div
														class="column has-text-centered"
													>
														<span
															class="is-small tag"
															>{col.title}</span
														> <br />
														{item.attributes[
															col.key
														]
															? item.attributes[
																	col.key
															  ]
															: "-"}
													</div>
												{/if}
											{/each}
										</div>
									{:else if detailVariable == "waybill_items"}
										<div class="columns">
											<div
												class="column is-narrow light-gray"
											>
												#{index + 1} <br />
												<i class="has-text-light"
													>{item.id}</i
												>
											</div>
											{#each columnsDetails as col}
												{#if col.key == "id"}
													<div
														class="column is-narrow gray"
													>
														{item[col.key]}
													</div>
												{:else if col.key == "item"}
													<div class="column is-2">
														<span class=""
															>{item.attributes
																.stock_release_item
																.data
																?.attributes
																.purchase_order_item
																?.data
																?.attributes[
																col.key
															]?.data?.attributes
																.name} -
														</span>
														<span class="gray"
															>{item.attributes
																.stock_release_item
																.data
																?.attributes
																.purchase_order_item
																?.data
																?.attributes[
																col.key
															]?.data?.attributes
																.category}</span
														>
														<br />
														<span
															class="has-text-info has-text-weight-bold"
														>
															PO Item ID -
															{item.attributes
																.stock_release_item
																.data
																?.attributes
																.purchase_order_item
																?.data?.id}
														</span>
														<br />
														<span class="gray">
															SOF - {item
																.attributes
																.stock_release_item
																.data
																?.attributes
																.purchase_order_item
																?.data
																?.attributes.sof
																? item
																		.attributes
																		.stock_release_item
																		.data
																		?.attributes
																		.purchase_order_item
																		?.data
																		?.attributes
																		.sof
																: "-"}
														</span>
													</div>
												{:else if col.key == "unit" || col.key == "pieces"}
													<div
														class="column has-text-centered"
													>
														<span
															class="is-small tag"
															>{col.title}</span
														> <br />
														{item.attributes
															.stock_release_item
															.data?.attributes
															.purchase_order_item
															?.data?.attributes
															.item?.data
															?.attributes[
															col.key
														]
															? item.attributes
																	.stock_release_item
																	.data
																	?.attributes
																	.purchase_order_item
																	?.data
																	?.attributes
																	.item?.data
																	?.attributes[
																	col.key
															  ]
															: "-"}
													</div>
												{:else if col.key == "total"}
													<div
														class="column has-text-centered"
													>
														<span
															class="is-small tag"
															>{col.title}</span
														> <br />
														{item.attributes
															.quantity
															? numberWithCommas(
																	parseFloat(
																		item
																			.attributes
																			.stock_release_item
																			.data
																			?.attributes
																			.purchase_order_item
																			?.data
																			?.attributes
																			.unitPrice
																	) *
																		parseFloat(
																			item
																				.attributes
																				.quantity
																				? item
																						.attributes
																						.quantity
																				: 0
																		)
															  )
															: "-"}
													</div>
												{:else if col.key == "poNumber"}
													<div
														class="column has-text-centered has-background-lightgreen"
													>
														<span
															class="is-small tag is-info is-light"
															>{col.title}</span
														> <br />
														{item.attributes
															.stock_release_item
															.data?.attributes
															.purchase_order_item
															?.data?.attributes
															?.purchase_order
															.data.attributes
															.poNumber}
													</div>
												{:else if col.key == "currency"}
													<div
														class="column has-text-centered"
													>
														<span
															class="is-small tag"
															>{col.title}</span
														> <br />
														{item.attributes
															.stock_release_item
															.data?.attributes
															.purchase_order_item
															?.data?.attributes
															.currency}
													</div>
												{:else if col.key == "unitPrice"}
													<div
														class="column has-text-centered"
													>
														<span
															class="is-small tag"
															>{col.title}</span
														> <br />
														{item.attributes
															.stock_release_item
															.data?.attributes
															.purchase_order_item
															?.data?.attributes
															.unitPrice
															? item.attributes
																	.stock_release_item
																	.data
																	?.attributes
																	.purchase_order_item
																	?.data
																	?.attributes
																	.unitPrice
															: "-"}
													</div>
												{:else if col.key == "srfNo"}
													<div
														class="column has-text-centered has-background-lightgreen"
													>
														<span
															class="is-small tag is-info is-light"
															>{col.title}</span
														> <br />
														{item.attributes
															.stock_release_item
															.data?.attributes
															.stock_release.data
															?.id
															? item.attributes
																	.stock_release_item
																	.data
																	?.attributes
																	.stock_release
																	.data?.id
															: "-"}
													</div>
												{:else if col.key == "quantity"}
													<div
														class="column has-text-centered"
													>
														<span
															class="is-small tag"
															>{col.title}</span
														> <br />
														{item.attributes[
															col.key
														]
															? item.attributes[
																	col.key
															  ]
															: "-"}
													</div>
												{:else}
													<div
														class="column has-text-centered"
													>
														<span
															class="is-small tag"
															>{col.title}</span
														> <br />
														{item.attributes
															.stock_release_item
															.data?.attributes[
															col.key
														]}
													</div>
												{/if}
											{/each}
										</div>
									{/if}
								</td>
							</tr>
						{/each}
					{/if}
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
	input.checkbox {
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
