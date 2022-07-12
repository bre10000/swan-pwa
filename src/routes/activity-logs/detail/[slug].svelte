<script context="module">
    export async function preload(params) {
        return { slug: parseInt(params.params.slug) };
    }
</script>

<script>
    import { get, post, put } from "../../../lib/api";
    import { faAngleLeft, faSave } from "@fortawesome/free-solid-svg-icons";
    import Icon from "svelte-awesome/components/Icon.svelte";
    import qs from "qs";
    import { numberWithCommas } from "../../../lib";

    export let slug;

    let activity_log;

    async function getItem() {
        try {
            let params = {
                populate: "*",
            };
            params = qs.stringify(params, {
                encodeValuesOnly: true,
            });

            let response = await get("activity-logs/" + slug, params);

            console.log("Get Activity Log by ID ", response);

            activity_log = response.data;
        } catch (e) {
            console.log("Error get Activity Log by ID ", e);
        }
    }

    $: if (slug) {
        getItem();
    }
</script>

<svelte:head>
    <title>Edit Activity Log</title>
</svelte:head>

<br /><br />
<div class="container px-6">
    <a href="activity-logs" class="has-text-dark"
        ><span class="icon is-small"><Icon data={faAngleLeft} /></span> Back</a
    >
    <br /><br />
    <div class="card px-6">
        <br /><br />
        <h3 class="my-0">Activity Log Details</h3>
        <p class="gray py-0">Here is the saved state.</p>
        <br />

        {#if activity_log}
            <div class="columns has-text-weight-bold">
                <div class="column is-narrow">{activity_log.id}</div>
                <div class="column">
                    {activity_log.attributes.users_permissions_user.data
                        ?.attributes.name}
                </div>
                <div class="column">
                    {activity_log.attributes.users_permissions_user.data
                        ?.attributes.email}
                </div>
                <div class="column">{activity_log.attributes.type}</div>
                <div class="column">{activity_log.attributes.action}</div>
            </div>
            <br /><br />

            {#if activity_log.attributes.type == "Purchase Order Item"}
                <div class="columns">
                    <div class="column is-narrow">
                        <div
                            class="tag is-rounded has-text-weight-bold is-large"
                        >
                            {activity_log.attributes.data.id}
                        </div>
                    </div>
                    <div class="column is-3">
                        {activity_log.attributes.data.attributes.item?.data
                            ?.attributes.name} <br />
                        <span class="gray is-size-7"
                            >{activity_log.attributes.data.attributes
                                .remark}</span
                        >
                    </div>
                    <div class="column has-text-centered">
                        <div class="tag is-rounded is-small">PO #</div>
                        <br />
                        {activity_log.attributes.data.attributes.purchase_order.data?.id}
                    </div>
                    <div class="column has-text-centered">
                        <div class="tag is-rounded is-small">Unit</div>
                        <br />
                        {activity_log.attributes.data.attributes.unit}
                    </div>
                    <div class="column has-text-centered">
                        <div class="tag is-rounded is-small">Pieces</div>
                        <br />
                        {activity_log.attributes.data.attributes.pieces}
                    </div>
                    <div class="column has-text-centered">
                        <div class="tag is-rounded is-small">Quantity</div>
                        <br />
                        {numberWithCommas(
                            activity_log.attributes.data.attributes.quantity
                        )}
                    </div>
                    <div class="column has-text-centered">
                        <div class="tag is-rounded is-small">Currency</div>
                        <br />
                        {activity_log.attributes.data.attributes.currency}
                    </div>
                    <div class="column has-text-centered">
                        <div class="tag is-rounded is-small">Unit Price</div>
                        <br />
                        {numberWithCommas(
                            activity_log.attributes.data.attributes.unitPrice
                        )}
                    </div>
                    <div class="column has-text-centered">
                        <div
                            class="tag is-rounded is-small has-text-weight-bold"
                        >
                            Total
                        </div>
                        <br />
                        {numberWithCommas(
                            activity_log.attributes.data.attributes.unitPrice *
                                activity_log.attributes.data.attributes.quantity
                        )}
                    </div>
                </div>
            {:else if activity_log.attributes.type == "Purchase Order"}
                <div class="columns">
                    <div class="column is-narrow">
                        <div
                            class="tag is-rounded has-text-weight-bold is-large"
                        >
                            {activity_log.attributes.data.id}
                        </div>
                    </div>

                    <div class="column is-3">
                        {activity_log.attributes.data.attributes
                            .consortium_member?.data?.attributes.name}
                    </div>
                    <div class="column has-text-centered">
                        <div class="tag is-rounded is-small">PO #</div>
                        <br />
                        {activity_log.attributes.data.attributes.poNumber}
                    </div>
                    <div class="column has-text-centered">
                        <div class="tag is-rounded is-small">Date</div>
                        <br />
                        {activity_log.attributes.data.attributes.date}
                    </div>
                </div>

                <hr />

                {#if activity_log.attributes.data.attributes.purchase_order_items}
                    {#each activity_log.attributes.data.attributes.purchase_order_items.data as child}
                        <div class="columns">
                            <div class="column is-narrow">
                                <div
                                    class="tag is-rounded has-text-weight-bold is-large"
                                >
                                    {child.id}
                                </div>
                            </div>
                            <div class="column is-3">
                                {child.attributes.item?.data?.attributes.name}
                                <br />
                                <span class="gray is-size-7"
                                    >{child.attributes.remark}</span
                                >
                            </div>
                            <div class="column has-text-centered">
                                <div class="tag is-rounded is-small">Unit</div>
                                <br />
                                {child.attributes.unit}
                            </div>
                            <div class="column has-text-centered">
                                <div class="tag is-rounded is-small">
                                    Pieces
                                </div>
                                <br />
                                {child.attributes.pieces}
                            </div>
                            <div class="column has-text-centered">
                                <div class="tag is-rounded is-small">
                                    Quantity
                                </div>
                                <br />
                                {numberWithCommas(child.attributes.quantity)}
                            </div>
                            <div class="column has-text-centered">
                                <div class="tag is-rounded is-small">
                                    Currency
                                </div>
                                <br />
                                {child.attributes.currency}
                            </div>
                            <div class="column has-text-centered">
                                <div class="tag is-rounded is-small">
                                    Unit Price
                                </div>
                                <br />
                                {numberWithCommas(child.attributes.unitPrice)}
                            </div>
                            <div class="column has-text-centered">
                                <div
                                    class="tag is-rounded is-small has-text-weight-bold"
                                >
                                    Total
                                </div>
                                <br />
                                {numberWithCommas(
                                    child.attributes.unitPrice *
                                        child.attributes.quantity
                                )}
                            </div>
                        </div>
                        <hr />
                    {/each}
                {/if}
            {:else if activity_log.attributes.type == "Stock"}
                <div class="columns">
                    <div class="column is-narrow">
                        <div
                            class="tag is-rounded has-text-weight-bold is-large"
                        >
                            {activity_log.attributes.data.id}
                        </div>
                    </div>

                    <div class="column is-3">
                        {activity_log.attributes.data.attributes
                            .consortium_member?.data?.attributes.name}
                    </div>
                    <div class="column has-text-centered">
                        <div class="tag is-rounded is-small">Warehouse</div>
                        <br />
                        {activity_log.attributes.data.attributes.warehouse?.data
                            ?.attributes.name}
                    </div>
                    <div class="column has-text-centered">
                        <div class="tag is-rounded is-small">Date</div>
                        <br />
                        {activity_log.attributes.data.attributes.date}
                    </div>
                </div>

                <hr />

                {#if activity_log.attributes.data.attributes.stock_items}
                    {#each activity_log.attributes.data.attributes.stock_items.data as child}
                        <div class="columns">
                            <div class="column is-narrow">
                                <div
                                    class="tag is-rounded has-text-weight-bold is-large"
                                >
                                    {child.id}
                                </div>
                            </div>
                            <div class="column has-text-centered">
                                <div class="tag is-rounded is-small">PO#</div>
                                <br />
                                {child.attributes.purchase_order_item.data
                                    ?.attributes.purchase_order.data?.attributes
                                    .poNumber}
                            </div>
                            <div class="column is-3">
                                {child.attributes.purchase_order_item.data
                                    ?.attributes.item?.data?.attributes.name}
                                <br />
                                <span class="gray is-size-7"
                                    >{child.attributes.remark}</span
                                >
                            </div>
                            <div class="column has-text-centered">
                                <div class="tag is-rounded is-small">Unit</div>
                                <br />
                                {child.attributes.purchase_order_item.data
                                    ?.attributes.unit}
                            </div>
                            <div class="column has-text-centered">
                                <div class="tag is-rounded is-small">
                                    Pieces
                                </div>
                                <br />
                                {child.attributes.purchase_order_item.data
                                    ?.attributes.pieces}
                            </div>
                            <div class="column has-text-centered">
                                <div class="tag is-rounded is-small">
                                    Quantity
                                </div>
                                <br />
                                {numberWithCommas(
                                    child.attributes.purchase_order_item.data
                                        ?.attributes.quantity
                                )}
                            </div>
                            <div class="column has-text-centered">
                                <div class="tag is-rounded is-small">
                                    Currency
                                </div>
                                <br />
                                {child.attributes.purchase_order_item.data
                                    ?.attributes.currency}
                            </div>
                            <div class="column has-text-centered">
                                <div class="tag is-rounded is-small">
                                    Unit Price
                                </div>
                                <br />
                                {numberWithCommas(
                                    child.attributes.purchase_order_item.data
                                        ?.attributes.unitPrice
                                )}
                            </div>
                            <div class="column has-text-centered">
                                <div class="tag is-rounded is-small">Total</div>
                                <br />
                                {numberWithCommas(
                                    child.attributes.purchase_order_item.data
                                        ?.attributes.unitPrice *
                                        child.attributes.purchase_order_item
                                            .data?.attributes.quantity
                                )}
                            </div>
                            <div class="column has-text-centered">
                                <div
                                    class="tag is-rounded is-small has-text-weight-bold"
                                >
                                    Received
                                </div>
                                <br />
                                {numberWithCommas(child.attributes.received)}
                            </div>
                        </div>
                        <hr />
                    {/each}
                {/if}
            {:else if activity_log.attributes.type == "Stock Item"}
                <div class="columns">
                    <div class="column is-narrow">
                        <div
                            class="tag is-rounded has-text-weight-bold is-large"
                        >
                            {activity_log.attributes.data.id}
                        </div>
                    </div>
                    <div class="column has-text-centered">
                        <div class="tag is-rounded is-small">PO#</div>
                        <br />
                        {activity_log.attributes.data.attributes
                            .purchase_order_item?.data?.attributes
                            .purchase_order?.data?.attributes.poNumber}
                    </div>
                    <div class="column is-3">
                        {activity_log.attributes.data.attributes
                            .purchase_order_item?.data?.attributes.item?.data
                            ?.attributes.name} <br />
                        <span class="gray is-size-7"
                            >{activity_log.attributes.data.attributes
                                .remark}</span
                        >
                    </div>
                    <div class="column has-text-centered">
                        <div class="tag is-rounded is-small">Unit</div>
                        <br />
                        {activity_log.attributes.data.attributes
                            .purchase_order_item.data?.attributes.unit}
                    </div>
                    <div class="column has-text-centered">
                        <div class="tag is-rounded is-small">Pieces</div>
                        <br />
                        {activity_log.attributes.data.attributes
                            .purchase_order_item.data?.attributes.pieces}
                    </div>
                    <div class="column has-text-centered">
                        <div class="tag is-rounded is-small">Quantity</div>
                        <br />
                        {numberWithCommas(
                            activity_log.attributes.data.attributes
                                .purchase_order_item.data?.attributes.quantity
                        )}
                    </div>
                    <div class="column has-text-centered">
                        <div class="tag is-rounded is-small">Currency</div>
                        <br />
                        {activity_log.attributes.data.attributes
                            .purchase_order_item.data?.attributes.currency}
                    </div>
                    <div class="column has-text-centered">
                        <div class="tag is-rounded is-small">Unit Price</div>
                        <br />
                        {numberWithCommas(
                            activity_log.attributes.data.attributes
                                .purchase_order_item.data?.attributes.unitPrice
                        )}
                    </div>
                    <div class="column has-text-centered">
                        <div class="tag is-rounded is-small">Total</div>
                        <br />
                        {numberWithCommas(
                            activity_log.attributes.data.attributes
                                .purchase_order_item.data?.attributes
                                .unitPrice *
                                activity_log.attributes.data.attributes
                                    .purchase_order_item.data?.attributes
                                    .quantity
                        )}
                    </div>
                    <div class="column has-text-centered">
                        <div
                            class="tag is-rounded is-small has-text-weight-bold"
                        >
                            Received
                        </div>
                        <br />
                        {numberWithCommas(
                            activity_log.attributes.data.attributes.received
                        )}
                    </div>
                </div>
            {:else if activity_log.attributes.type == "Stock Release"}
                <div class="columns">
                    <div class="column is-narrow">
                        <div
                            class="tag is-rounded has-text-weight-bold is-large"
                        >
                            {activity_log.attributes.data.id}
                        </div>
                    </div>

                    <div class="column is-3">
                        {activity_log.attributes.data.attributes
                            .consortium_member?.data?.attributes.name}
                    </div>

                    <div class="column has-text-centered">
                        <div class="tag is-rounded is-small">Date</div>
                        <br />
                        {activity_log.attributes.data.attributes.date}
                    </div>
                </div>

                <hr />

                {#if activity_log.attributes.data.attributes.stock_release_items}
                    {#each activity_log.attributes.data.attributes.stock_release_items.data as child}
                        <div class="columns">
                            <div class="column is-narrow">
                                <div
                                    class="tag is-rounded has-text-weight-bold is-large"
                                >
                                    {child.id}
                                </div>
                            </div>
                            <div class="column has-text-centered">
                                <div class="tag is-rounded is-small">PO#</div>
                                <br />
                                {child.attributes.purchase_order_item?.data
                                    ?.attributes.purchase_order.data?.attributes
                                    .poNumber}
                            </div>
                            <div class="column is-3">
                                {child.attributes.purchase_order_item?.data
                                    ?.attributes.item?.data?.attributes.name}
                                <br />
                                <span class="gray is-size-7"
                                    >{child.attributes.remark}</span
                                >
                            </div>
                            <div class="column has-text-centered">
                                <div class="tag is-rounded is-small">Unit</div>
                                <br />
                                {child.attributes.purchase_order_item?.data
                                    ?.attributes.unit}
                            </div>
                            <div class="column has-text-centered">
                                <div class="tag is-rounded is-small">
                                    Pieces
                                </div>
                                <br />
                                {child.attributes.purchase_order_item?.data
                                    ?.attributes.pieces}
                            </div>
                            <div class="column has-text-centered">
                                <div class="tag is-rounded is-small">
                                    Quantity
                                </div>
                                <br />
                                {numberWithCommas(
                                    child.attributes.purchase_order_item?.data
                                        ?.attributes.quantity
                                )}
                            </div>
                            <div class="column has-text-centered">
                                <div class="tag is-rounded is-small">
                                    Currency
                                </div>
                                <br />
                                {child.attributes.purchase_order_item?.data
                                    ?.attributes.currency}
                            </div>
                            <div class="column has-text-centered">
                                <div class="tag is-rounded is-small">
                                    Unit Price
                                </div>
                                <br />
                                {numberWithCommas(
                                    child.attributes.purchase_order_item?.data
                                        ?.attributes.unitPrice
                                )}
                            </div>
                            <div class="column has-text-centered">
                                <div class="tag is-rounded is-small">Total</div>
                                <br />
                                {numberWithCommas(
                                    child.attributes.purchase_order_item?.data
                                        ?.attributes.unitPrice *
                                        child.attributes.purchase_order_item
                                            ?.data?.attributes.quantity
                                )}
                            </div>
                            <div class="column has-text-centered">
                                <div
                                    class="tag is-rounded is-small has-text-weight-bold"
                                >
                                    Quantity
                                </div>
                                <br />
                                {numberWithCommas(child.attributes.quantity)}
                            </div>
                        </div>
                        <hr />
                    {/each}
                {/if}
            {:else if activity_log.attributes.type == "Stock Release Item"}
                <div class="columns">
                    <div class="column is-narrow">
                        <div
                            class="tag is-rounded has-text-weight-bold is-large"
                        >
                            {activity_log.attributes.data.id}
                        </div>
                    </div>
                    <div class="column has-text-centered">
                        <div class="tag is-rounded is-small">SRF #</div>
                        <br />
                        {activity_log.attributes.data.attributes
                            .stock_release?.data?.id}
                    </div>
                    <div class="column has-text-centered">
                        <div class="tag is-rounded is-small">PO#</div>
                        <br />
                        {activity_log.attributes.data.attributes
                            .purchase_order_item?.data?.attributes
                            .purchase_order?.data?.attributes.poNumber}
                    </div>
                    <div class="column is-3">
                        {activity_log.attributes.data.attributes
                            .purchase_order_item?.data?.attributes.item?.data
                            ?.attributes.name} <br />
                        <span class="gray is-size-7"
                            >{activity_log.attributes.data.attributes
                                .remark}</span
                        >
                    </div>
                    <div class="column has-text-centered">
                        <div class="tag is-rounded is-small">Unit</div>
                        <br />
                        {activity_log.attributes.data.attributes
                            .purchase_order_item.data?.attributes.unit}
                    </div>
                    <div class="column has-text-centered">
                        <div class="tag is-rounded is-small">Pieces</div>
                        <br />
                        {activity_log.attributes.data.attributes
                            .purchase_order_item.data?.attributes.pieces}
                    </div>
                    <div class="column has-text-centered">
                        <div class="tag is-rounded is-small">Quantity</div>
                        <br />
                        {numberWithCommas(
                            activity_log.attributes.data.attributes
                                .purchase_order_item.data?.attributes.quantity
                        )}
                    </div>
                    <div class="column has-text-centered">
                        <div class="tag is-rounded is-small">Currency</div>
                        <br />
                        {activity_log.attributes.data.attributes
                            .purchase_order_item.data?.attributes.currency}
                    </div>
                    <div class="column has-text-centered">
                        <div class="tag is-rounded is-small">Unit Price</div>
                        <br />
                        {numberWithCommas(
                            activity_log.attributes.data.attributes
                                .purchase_order_item.data?.attributes.unitPrice
                        )}
                    </div>
                    <div class="column has-text-centered">
                        <div class="tag is-rounded is-small">Total</div>
                        <br />
                        {numberWithCommas(
                            activity_log.attributes.data.attributes
                                .purchase_order_item.data?.attributes
                                .unitPrice *
                                activity_log.attributes.data.attributes
                                    .purchase_order_item.data?.attributes
                                    .quantity
                        )}
                    </div>
                    <div class="column has-text-centered">
                        <div
                            class="tag is-rounded is-small has-text-weight-bold"
                        >
                            Quantity
                        </div>
                        <br />
                        {numberWithCommas(
                            activity_log.attributes.data.attributes.quantity
                        )}
                    </div>
                </div>
            {:else if activity_log.attributes.type == "Waybill"}
                <div class="columns">
                    <div class="column is-narrow">
                        <div
                            class="tag is-rounded has-text-weight-bold is-large"
                        >
                            {activity_log.attributes.data.id}
                        </div>
                    </div>

                    <div class="column is-3">
                        {activity_log.attributes.data.attributes
                            .consortium_member?.data?.attributes.name}
                    </div>
                    <div class="column has-text-centered">
                        <div class="tag is-rounded is-small">Destination</div>
                        <br />
                        {activity_log.attributes.data.attributes.destination}
                    </div>

                    <div class="column has-text-centered">
                        <div class="tag is-rounded is-small">Date</div>
                        <br />
                        {activity_log.attributes.data.attributes.date}
                    </div>
                </div>

                <hr />

                {#if activity_log.attributes.data.attributes.waybill_items}
                    {#each activity_log.attributes.data.attributes.waybill_items.data as child}
                        <div class="columns">
                            <div class="column is-narrow">
                                <div
                                    class="tag is-rounded has-text-weight-bold is-large"
                                >
                                    {child.id}
                                </div>
                            </div>
                            <div class="column is-3">
                                {child.attributes.stock_release_item?.data
                                    ?.attributes.purchase_order_item?.data
                                    ?.attributes.item?.data?.attributes.name}
                                <br />
                                <span class="gray is-size-7"
                                    >{child.attributes.remark}</span
                                >
                            </div>
                            <div class="column has-text-centered">
                                <div class="tag is-rounded is-small">PO#</div>
                                <br />
                                {child.attributes.stock_release_item?.data
                                    ?.attributes.purchase_order_item?.data
                                    ?.attributes.purchase_order?.data
                                    ?.attributes.poNumber}
                            </div>
                            <div class="column has-text-centered">
                                <div class="tag is-rounded is-small">Unit</div>
                                <br />
                                {child.attributes.stock_release_item?.data
                                    ?.attributes.purchase_order_item?.data
                                    ?.attributes.unit}
                            </div>
                            <div class="column has-text-centered">
                                <div class="tag is-rounded is-small">
                                    Pieces
                                </div>
                                <br />
                                {child.attributes.stock_release_item?.data
                                    ?.attributes.purchase_order_item?.data
                                    ?.attributes.pieces}
                            </div>

                            <div class="column has-text-centered">
                                <div class="tag is-rounded is-small">
                                    Currency
                                </div>
                                <br />
                                {child.attributes.stock_release_item?.data
                                    ?.attributes.purchase_order_item?.data
                                    ?.attributes.currency}
                            </div>
                            <div class="column has-text-centered">
                                <div class="tag is-rounded is-small">
                                    Unit Price
                                </div>
                                <br />
                                {numberWithCommas(
                                    child.attributes.stock_release_item?.data
                                        ?.attributes.purchase_order_item?.data
                                        ?.attributes.unitPrice
                                )}
                            </div>
                            <div class="column has-text-centered">
                                <div class="tag is-rounded is-small">Total</div>
                                <br />
                                {numberWithCommas(
                                    child.attributes.stock_release_item?.data
                                        ?.attributes.purchase_order_item?.data
                                        ?.attributes.unitPrice *
                                        child.attributes.stock_release_item?.data
                                            ?.attributes.quantity
                                )}
                            </div>
                            <div class="column has-text-centered">
                                <div
                                    class="tag is-rounded is-small has-text-weight-bold"
                                >
                                    Quantity
                                </div>
                                <br />
                                {numberWithCommas(
                                    child.attributes.stock_release_item?.data
                                        ?.attributes.quantity
                                )}
                            </div>
                        </div>
                        <hr />
                    {/each}
                {/if}
            {:else if activity_log.attributes.type == "Waybill Item"}
                <div class="columns">
                    <div class="column is-narrow">
                        <div
                            class="tag is-rounded has-text-weight-bold is-large"
                        >
                            {activity_log.attributes.data.id}
                        </div>
                    </div>
                    <div class="column is-3">
                        {activity_log.attributes.data.attributes
                            .stock_release_item?.data?.attributes
                            .purchase_order_item?.data?.attributes.item?.data
                            ?.attributes.name} <br />
                        <span class="gray is-size-7"
                            >{activity_log.attributes.data.attributes
                                .remark}</span
                        >
                    </div>
                    <div class="column has-text-centered">
                        <div class="tag is-rounded is-small">PO#</div>
                        <br />
                        {activity_log.attributes?.data.attributes
                            .stock_release_item?.data?.attributes
                            .purchase_order_item?.data?.attributes.purchase_order
                            ?.data?.attributes.poNumber}
                    </div>
                    <div class="column has-text-centered">
                        <div class="tag is-rounded is-small">Unit</div>
                        <br />
                        {activity_log.attributes.data.attributes
                            .stock_release_item?.data?.attributes
                            .purchase_order_item?.data?.attributes.unit}
                    </div>
                    <div class="column has-text-centered">
                        <div class="tag is-rounded is-small">Pieces</div>
                        <br />
                        {activity_log.attributes.data.attributes
                            .stock_release_item?.data?.attributes
                            .purchase_order_item?.data?.attributes.pieces}
                    </div>

                    <div class="column has-text-centered">
                        <div class="tag is-rounded is-small">Currency</div>
                        <br />
                        {activity_log.attributes.data.attributes
                            .stock_release_item?.data?.attributes
                            .purchase_order_item?.data?.attributes.currency}
                    </div>
                    <div class="column has-text-centered">
                        <div class="tag is-rounded is-small">Unit Price</div>
                        <br />
                        {numberWithCommas(
                            activity_log.attributes.data.attributes
                                .stock_release_item?.data?.attributes
                                .purchase_order_item?.data?.attributes.unitPrice
                        )}
                    </div>
                    <div class="column has-text-centered">
                        <div class="tag is-rounded is-small">Total</div>
                        <br />
                        {numberWithCommas(
                            activity_log.attributes.data.attributes
                                .stock_release_item?.data?.attributes
                                .purchase_order_item?.data?.attributes
                                .unitPrice *
                                activity_log.attributes.data.attributes
                                    .stock_release_item?.data?.attributes
                                    .quantity
                        )}
                    </div>
                    <div class="column has-text-centered">
                        <div
                            class="tag is-rounded is-small has-text-weight-bold"
                        >
                            Quantity
                        </div>
                        <br />
                        {numberWithCommas(
                            activity_log.attributes.data.attributes
                                .stock_release_item?.data?.attributes.quantity
                        )}
                    </div>
                </div>
                <hr />
            {/if}
        {/if}

        <br /><br /><br />
    </div>
</div>
