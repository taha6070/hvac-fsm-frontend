<script lang="ts">
	import Hero from '$lib/components/web/landing-page/Hero.svelte';
	import Feature from '$lib/components/web/landing-page/Feature.svelte';
	import Feature2 from '$lib/components/web/landing-page/Feature2.svelte';
</script>

<main class="flex w-full flex-col gap-y-12 lg:gap-y-24">
	<Hero>
		{#snippet title()}
			Beautiful UI
		{/snippet}
		{#snippet subtitle()}
			Made Simple
		{/snippet}
	</Hero>
	<Feature />
	<Feature2 />
</main>
