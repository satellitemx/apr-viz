<script>
  import { OutboundLink,OverflowMenu,OverflowMenuItem } from "carbon-components-svelte";
  import { useAppStore } from "../lib/itunes-api";

  export let bundleID;
  const { data, error } = useAppStore(bundleID);
  $: resultCount = $data?.resultCount
  $: results = $data?.results
</script>

{#if $error}
<OutboundLink href={`https://www.google.com/search?q=${bundleID}`}>{bundleID}</OutboundLink>
{/if}

{#if (resultCount === 1)}
  <OutboundLink href={results[0].trackViewUrl}>{results[0].trackName}</OutboundLink>
{/if}

{#if (resultCount > 1)}
  <OverflowMenu>
    {#each results as result (result.trackId)}
      <OverflowMenuItem href={result.trackViewUrl} text={result.trackName} />
    {/each}
  </OverflowMenu>
{/if}