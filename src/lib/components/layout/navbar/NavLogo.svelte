<script lang="ts">
	import { Zap } from '@lucide/svelte';
	import { PUBLIC_APP_NAME } from '$env/static/public';

	interface Props {
		showText?: boolean;
		showLogo?: boolean;
		href?: string;
		textClass?: string;
	}

	let { showText = true, showLogo = true, href = '/', textClass = '' }: Props = $props();
</script>

<a class="flex items-center gap-2" {href}>
	{#if showLogo}
	<button class="btn btn-square">
		<Zap class="size-4" />
	</button>
	{/if}
	{#if showText}
		<span class="text-sm font-semibold tracking-wide text-center {textClass}">
			{PUBLIC_APP_NAME}
		</span>
	{/if}
</a>
