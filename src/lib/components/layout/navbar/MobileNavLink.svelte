<script lang="ts">
	import type { ComponentType } from 'svelte';

	interface Props {
		href: string;
		label: string;
		icon: any;
		onclick?: () => void;
	}

	let { href, label, icon: Icon, onclick }: Props = $props();
</script>

<a {href} class="btn h-11 w-full justify-start btn-ghost" {onclick}>
	<Icon class="size-4" />
	{label}
</a>
