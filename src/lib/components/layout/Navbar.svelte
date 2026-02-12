<script lang="ts">
	import { Menu } from '@lucide/svelte';
	import NavLogo from './navbar/NavLogo.svelte';
	import NavLink from './navbar/NavLink.svelte';
	import AuthButton from './navbar/AuthButton.svelte';
	import MobileDrawer from './navbar/MobileDrawer.svelte';

	let open = $state(false);

	const navLinks = [
		{ label: 'About', href: '##' },
		{ label: 'Docs', href: '##' },
		{ label: 'Pricing', href: '##' }
	];

	const authButtons = [
		{ label: 'Sign Up', href: '/auth/signup' },
		{ label: 'Sign In', href: '/auth/signin' }
	];
</script>

<div class="w-full" id="top">
	<div class="navbar border-b-3 border-base-300">
		<div class="mx-auto flex w-full container max-w-7xl items-center justify-between px-3 md:px-10">
			<!-- Logo - Desktop -->
			<div class="w-1/3">
				<NavLogo showText={true} textClass="hidden lg:flex" href="/" />
			</div>

			<!-- Logo - Mobile (center) -->
			<NavLogo showText={true} showLogo={false} textClass="lg:hidden" href="/" />

			<!-- Desktop Navigation -->
			<div class="hidden w-1/3 flex-1 items-center justify-center lg:flex">
				<nav class="flex gap-6">
					{#each navLinks as link}
						<NavLink href={link.href} label={link.label} />
					{/each}
				</nav>
			</div>

			<!-- Auth Buttons & Mobile Menu -->
			<div class="flex w-1/3 items-center justify-end gap-4">
				<div class="hidden gap-4 lg:flex">
					{#each authButtons as button}
						<AuthButton href={button.href} label={button.label} />
					{/each}
				</div>

				<!-- Mobile Menu Button -->
				<button class="btn btn-square btn-primary lg:hidden" onclick={() => (open = true)}>
					<Menu class="h-5 w-5" />
				</button>
			</div>
		</div>
	</div>

	<!-- Mobile Drawer -->
	<MobileDrawer bind:open onClose={() => (open = false)} />
</div>
