<script lang="ts">
	import { User, Book } from '@lucide/svelte';
	import NavLogo from './NavLogo.svelte';
	import MobileNavLink from './MobileNavLink.svelte';

	interface Props {
		open: boolean;
		onClose: () => void;
	}

	let { open = $bindable(), onClose }: Props = $props();

	const authLinks = [
		{ label: 'Sign In', href: '/auth/signin', icon: User },
		{ label: 'Sign Up', href: '/auth/signup', icon: User }
	];

	const navLinks = [
		{ label: 'About', href: '##', icon: Book },
		{ label: 'Documentation', href: '##', icon: Book },
		{ label: 'Pricing', href: '##', icon: Book }
	];
</script>

<div class="drawer lg:hidden">
	<input type="checkbox" class="drawer-toggle" bind:checked={open} />
	<div class="drawer-side z-50">
		<button aria-label="Close" class="drawer-overlay" onclick={onClose}></button>
		<div class="h-full w-70 border-r border-base-300 bg-base-100 p-0">
			<div class="flex h-full flex-col">
				<!-- Header -->
				<div class="flex items-center gap-2 border-b border-base-300 p-6">
					<NavLogo showText={true} textClass="text-base font-medium" />
				</div>

				<!-- Navigation -->
				<div class="flex-1 p-4">
					<nav class="space-y-2">
						<!-- Auth Links -->
						<div class="space-y-1">
							{#each authLinks as link}
								<MobileNavLink
									href={link.href}
									label={link.label}
									icon={link.icon}
									onclick={onClose}
								/>
							{/each}
						</div>

						<!-- Main Nav Links -->
						<div class="mt-4 border-t border-base-300 pt-4">
							{#each navLinks as link}
								<MobileNavLink
									href={link.href}
									label={link.label}
									icon={link.icon}
									onclick={onClose}
								/>
							{/each}
						</div>
					</nav>
				</div>
			</div>
		</div>
	</div>
</div>
