<script>
  import { DataTable,Pagination,Tag } from "carbon-components-svelte";
  import { formatDate } from "../lib/format.js";
  import { FilteredPermissionAccess } from "./../store/store.js";
  import BundleIDView from "./BundleIDView.svelte";

  const headers = [
    { key: "timespan", value: "Start/End" },
    { key: "permission", value: "Permission" },
    { key: "app", value: "App" },
  ];

  $: rows = window?.map((access) => ({
    id: access.identifier + access.start + access.end,
    bundleID: access.bundleID,
    permission: access.category,
    timespan: formatDate(access.start) + " - " + formatDate(access.end),
  }));

  let page = 1;
  let pageSize = 5;

  const handlePaginationUpdate = ({ detail }) => {
    pageSize = detail.pageSize
    page = detail.page
  }
  
  $: count = $FilteredPermissionAccess?.length;
  $: window = $FilteredPermissionAccess?.slice(
    (page - 1) * pageSize,
    page * pageSize
  );
</script>

<DataTable size="short" {headers} {rows}>
  <strong slot="title">
    Permission Access
    {#if count}
      <Tag>{count}</Tag>
    {/if}
  </strong>
  <div slot="description">
    <p>
      Each entry below represents the start or end of an access made by a
      particular app.
    </p>
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
