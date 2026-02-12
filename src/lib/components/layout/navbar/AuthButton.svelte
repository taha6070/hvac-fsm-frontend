<script lang="ts">
	import { ChevronRight } from '@lucide/svelte';

	interface Props {
		href: string;
		label: string;
		class?: string;
	}

	let { href, label, class: className = 'btn btn-sm btn-primary' }: Props = $props();
</script>

<a {href} class="group {className}">
	{label}
	<ChevronRight class="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
</a>
