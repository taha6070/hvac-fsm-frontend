<script lang="ts">
	import { ChevronRight, Star} from '@lucide/svelte';
	import { fly } from 'svelte/transition';
	import { tick } from 'svelte';
	import { onMount } from 'svelte';

	let { title, subtitle } = $props();

	let ready = $state(false);

	// Avatar data
	const avatarData = [
		{ src: 'https://github.com/shadcn.png', alt: 'shadcn', fallback: 'CN' },
		{ src: 'https://github.com/leerob.png', alt: 'leerob', fallback: 'LR' },
		{ src: 'https://github.com/evilrabbit.png', alt: 'evilrabbit', fallback: 'ER' },
		{ src: 'https://github.com/shadcn.png', alt: 'shadcn', fallback: 'CN' },
		{ src: 'https://github.com/leerob.png', alt: 'leerob', fallback: 'LR' },
		{ src: 'https://github.com/shadcn.png', alt: 'shadcn', fallback: 'CN' }
	];

	onMount(() => {
		tick().then(() => {
			ready = true;
		});
	});
</script>

<section
	id="over-here"
	class="mx-auto flex h-[calc(100vh-4rem)] w-full flex-col items-center py-20 lg:flex-row lg:py-0"
>
	<div
		class="flex h-full w-full flex-col items-center justify-center gap-y-2 lg:w-1/2 lg:items-start"
	>

		<div class="flex flex-col text-center lg:text-left">
			<h1 class="text-4xl font-semibold text-primary sm:text-5xl lg:text-6xl 2xl:text-7xl">
				{@render title()}
			</h1>
			<h1 class="text-4xl font-semibold text-muted-foreground sm:text-5xl lg:text-6xl 2xl:text-7xl">
				{@render subtitle()}
			</h1>
		</div>
		<!-- Hero text and CTA buttons -->
		<div class="flex flex-col md:gap-y-4">
			<p
				class="sm:text-md mx-auto mt-2 max-w-[90%] text-center text-sm text-base-content/70 sm:w-[60%] lg:mx-0 lg:mt-4 lg:w-full lg:text-left lg:text-lg"
			>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Donec ut fermentum
				dolor. Suspendisse diam magna, congue vel nisi non, blandit consequat nibh
				<span class="hidden lg:flex">
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
				</span>
			</p>
			<div class="mt-3 flex flex-col items-center gap-y-2 lg:mt-4 lg:flex-row lg:gap-x-4">
				<button class="btn w-auto btn-primary sm:w-1/2 lg:w-auto">Browse Components</button>
				<button class="group btn w-1/2 btn-soft lg:w-auto">
					View Demo
					<ChevronRight
						class="size-4 transition-transform duration-200 group-hover:translate-x-1"
					/>
				</button>
			</div>
		</div>
		<!-- Avatars -->
		<div
			class="mt-5 flex flex-col items-center justify-center gap-y-3 md:flex-row md:gap-x-4 lg:justify-start"
		>
			<div class="avatar-group -space-x-2">
				{#each avatarData as avatar}
					<div class="avatar">
						<div
							class="w-8 rounded-full ring ring-base-content ring-offset-2 ring-offset-base-100 2xl:w-10"
						>
							<img src={avatar.src} alt={avatar.alt} />
						</div>
					</div>
				{/each}
			</div>
			<!-- Star Ratings -->
			<div class="flex flex-col">
				<div class="flex items-center gap-x-1">
					{#each Array(5) as _, i}
						<Star class="fill-warning stroke-warning" />
					{/each}
					<span class="ml-1 font-semibold tracking-wide text-base-content">5.0</span>
				</div>
				<p class="text-sm text-base-content/70">1000+ happy developers</p>
			</div>
		</div>
	</div>
	<div class="my-3 hidden h-full w-1/2 flex-row items-center justify-center gap-4 lg:flex">
		{#if ready}
			<div
				in:fly={{ delay: 200, duration: 500, y: 80 }}
				class="-mt-25 hidden h-[50vh] w-[50%] items-center justify-center rounded-lg shadow-xl xl:flex"
			>
				<img
					src="https://fqaelqkcucrxpgtsyuml.supabase.co/storage/v1/object/public/assets/general/adrian-infernus-GLf7bAwCdYg-unsplash.jpg"
					alt="textured colourful gradient"
					class="h-full w-full rounded-lg object-cover"
				/>
			</div>
			<div
				in:fly={{ delay: 200, duration: 500, y: -80 }}
				class="-mt-8 flex h-[50vh] w-[85%] items-center justify-center rounded-lg bg-base-300 shadow-xl xl:mt-0 xl:w-[50%]"
			>
				<img
					src="https://fqaelqkcucrxpgtsyuml.supabase.co/storage/v1/object/public/assets/general/adrian-infernus-GLf7bAwCdYg-unsplash.jpg"
					alt="textured colourful gradient"
					class="h-full w-full rotate-180 rounded-lg object-cover"
				/>
			</div>
		{/if}
	</div>
</section>
