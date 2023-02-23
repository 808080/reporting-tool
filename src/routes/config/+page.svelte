<script lang="ts">
	import type { TReport } from "../../utils/types";
	import type { ActionData } from "./$types";

	export let form: ActionData;

	const report = form as TReport;
</script>

<form
	class="text-center"
	action="/report"
	method="POST"
	enctype="multipart/form-data"
>
	<h4 class="mb-10">
		Fine, now please specify names of columns for "X" and "Y" dimensions (or
		leave them default)
	</h4>

	<label class="label text-xl flex items-center mb-7">
		<span class="md:w-1/3">Column with "X" data:</span>
		<input
			class="input"
			type="text"
			name="x"
			placeholder="Default name is “X”"
		/>
	</label>

	<label class="label text-xl flex items-center">
		<span class="md:w-1/3">Column with "Y" data:</span>
		<input
			class="input"
			type="text"
			name="y"
			placeholder="Default name is “Y”"
		/>
	</label>

	<input type="hidden" name="report" value={JSON.stringify(report)} />

	<button type="submit" class="btn btn-xl variant-filled-primary mt-8">
		Next
	</button>
</form>
