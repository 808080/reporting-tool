<script>
	import "@skeletonlabs/skeleton/themes/theme-gold-nouveau.css";
	import "@skeletonlabs/skeleton/styles/all.css";
	import "../app.postcss";
</script>

<main class="container h-full mx-auto flex justify-center items-center">
	<div class="card p-8 max-w-5xl max-h-screen min-h-min">
		<slot />
	</div>
</main>
