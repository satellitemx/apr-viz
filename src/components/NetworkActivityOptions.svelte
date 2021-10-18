<script>
  import { Checkbox,Form,FormGroup } from "carbon-components-svelte";
  import { NetworkActivityFilter } from "./../store/store.js";
</script>

<Form>
  <FormGroup legendText="Filter rules">
    <Checkbox
      bind:checked={$NetworkActivityFilter.hideIcloudPrivateRelay}
      labelText="Hide iCloud Private Relay"
    />
  </FormGroup>
</Form>
