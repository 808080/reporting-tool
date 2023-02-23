<script lang="ts">
	import { FileDropzone } from "@skeletonlabs/skeleton";
	import type { PageData } from "./$types";

	export let data: PageData;
	let form: HTMLFormElement;
	let message = "";

	const accept =
		".csv, text/csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel";

	const uploadHandler = async (e: Event) => {
		message = "";
		const target = e.target as HTMLInputElement;
		const file = target.files?.[0];
		if (!file) {
			e.preventDefault();
			message = "Failed to upload file";
			return;
		}

		if (!accept.split(", ").includes(file.type)) {
			e.preventDefault();
			message = "CSV and Excel formats allowed only";
			return;
		}

		if (file.size > 1024 * 1024) {
			e.preventDefault();
			message = "File size can't exceed 1MB";
			return;
		}

		form.submit();
	};
</script>

<div class="text-center">
	<h1 class="mb-2">Nice to meet you, {data.user}!</h1>
	<form action="/logout" method="POST">
		<button type="submit" class="underline">It's not me!</button>
	</form>

	<form
		bind:this={form}
		action="/config"
		method="POST"
		enctype="multipart/form-data"
	>
		<FileDropzone {accept} name="import" on:change={uploadHandler} class="mt-8">
			<svelte:fragment slot="lead">
				<svg
					style="display: inline;"
					width="50"
					aria-hidden="true"
					focusable="false"
					role="img"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 384 512"
				>
					<path
						fill="currentColor"
						d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM216 408c0 13.3-10.7 24-24 24s-24-10.7-24-24V305.9l-31 31c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l72-72c9.4-9.4 24.6-9.4 33.9 0l72 72c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-31-31V408z"
					/>
				</svg>
			</svelte:fragment>

			<svelte:fragment slot="message">
				<strong>Choose a file</strong> or drop it here
			</svelte:fragment>

			<svelte:fragment slot="meta">
				CSV and Excel allowed. Data format: 2 columns with digits.
			</svelte:fragment>
		</FileDropzone>
	</form>

	{#if message}
		<p class="text-orange-700 mt-2">{message}</p>
	{/if}
</div>
