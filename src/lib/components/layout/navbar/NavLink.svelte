<script lang="ts">
	interface Props {
		href: string;
		label: string;
		class?: string;
	}

	let { href, label, class: className = 'btn btn-ghost btn-sm' }: Props = $props();
</script>

<a {href} class={className}>{label}</a>
