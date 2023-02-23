<script lang="ts">
	let name = "";
	let message = "";

	const handleSubmit = (e: Event) => {
		if (name.trim().length === 0) {
			e.preventDefault();
			message = "Come on! Type atleast anything!";
			return;
		}
	};
</script>

<form class="text-center" action="?/signin" method="POST">
	<h2 class="mb-10">Hi stranger! Please enter your name</h2>

	<label class="label">
		<input
			class="input text-xl"
			class:input-warning={!!message}
			type="text"
			name="username"
			on:focus={() => (message = "")}
			bind:value={name}
		/>
	</label>
	{#if message}
		<p class="text-orange-700 mt-2">{message}</p>
	{/if}

	<button
		type="submit"
		class="btn btn-xl variant-filled-primary mt-8"
		on:click={handleSubmit}
	>
		Next
	</button>
</form>
