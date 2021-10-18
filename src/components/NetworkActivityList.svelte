<script>
	import {
	DataTable,
	Pagination,
	Tag
	} from "carbon-components-svelte";
	import { formatDate } from "../lib/format";
	import { FilteredNetworkActivities } from "./../store/store.js";
	import BundleIDView from "./BundleIDView.svelte";
	import Gut from "./Gut.svelte";
	import NetworkActivityOptions from './NetworkActivityOptions.svelte';

  const headers = [
    { key: "timestamp", value: "Time" },
    { key: "type", value: "Type" },
    { key: "domain", value: "Domain" },
    { key: "additional", value: "Additional Information" },
    { key: "hits", value: "Hits" },
    { key: "app", value: "App" },
  ];
  $: rows = window?.map((activity) => ({
    id: activity.timeStamp,
    bundleID: activity.bundleID,
    timestamp: formatDate(activity.timeStamp),
    type:
      activity.initiatedType === "AppInitiated"
        ? "User initiated"
        : "App initiated",
    domain: activity.domain,
    hits: activity.hits,
    additional: [activity.domainOwner, activity.context]
      .filter((v) => !!v)
      .join("/"),
  }));

  let page = 1;
  let pageSize = 5;

  const handlePaginationUpdate = ({ detail }) => {
    pageSize = detail.pageSize
    page = 1
  }

  $: count = $FilteredNetworkActivities?.length;
  $: window = $FilteredNetworkActivities?.slice(
    (page - 1) * pageSize,
    page * pageSize
  );
</script>

<DataTable size="short" {headers} {rows}>
  <strong slot="title">
    Network Activities
    {#if count}
      <Tag>{count}</Tag>
    {/if}
  </strong>
  <div slot="description">
    <p>
      Each activity describes a connection made by a specified app to a
      particular domain.
    </p>
    <Gut />
    <NetworkActivityOptions />
  </div>
  <div slot="cell" let:row let:cell>
    {#if cell.key === "app"}
      <BundleIDView bundleID={row.bundleID} />
    {:else}
      {cell.value}
    {/if}
  </div>
</DataTable>

<Pagination
  totalItems={count}
  bind:page
  {pageSize}
  pageSizes={[5, 10, 20]}
  on:update={handlePaginationUpdate}
/>
