<script>
	import { Accordion } from "carbon-components-svelte";
	import PickFileStep from "./steps/PickFileStep.svelte";
	import ViewStep from "./steps/ViewStep.svelte";
</script>

<main>
	<Accordion>
		<PickFileStep />
		<ViewStep />
	</Accordion>
</main>