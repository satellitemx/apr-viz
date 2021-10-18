<script>
  import { AccordionItem,FileUploader } from "carbon-components-svelte";
  import { Files } from "../store/store";
</script>

<AccordionItem open title="Step 1 - Pick a file">
  <FileUploader
    bind:files={$Files}
    status="complete"
    accept={[".ndjson"]}
    labelDescription="Only a single .ndjson file is accepted. "
    buttonLabel="Pick file"
  />
</AccordionItem>
