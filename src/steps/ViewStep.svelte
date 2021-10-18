<script>
  import { AccordionItem } from "carbon-components-svelte";
  import Gut from "../components/Gut.svelte";
  import NetworkActivityList from "../components/NetworkActivityList.svelte";
  import PermissionAccessList from "../components/PermissionAccessList.svelte";
  import { Activities } from "../store/store";

  $: disabled = !$Activities?.length;
</script>

<AccordionItem open={!disabled} {disabled} title="Step 2 - View your data">
  <PermissionAccessList />
  <Gut />
  <NetworkActivityList />
</AccordionItem>
