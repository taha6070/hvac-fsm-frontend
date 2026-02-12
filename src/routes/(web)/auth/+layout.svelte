<script>
    
	let { children } = $props();
</script>

<section class="w-full bg-background min-h-screen">
	<div class="mx-auto w-full max-w-screen-2xl px-4 md:px-8">
		{@render children()}
	</div>
</section>