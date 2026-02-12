<script lang="ts">
	import { Blocks, Codesandbox, FolderCode, ChevronRight } from '@lucide/svelte';

	const featureData = [
		{
			title: 'Drag & Drop Builder',
			description: 'Build stunning pages with our intuitive visual editor - no coding required',
			icon: Blocks
		},
		{
			title: 'Live Preview',
			description: 'See your changes instantly with real-time preview across all devices',
			icon: Codesandbox
		},
		{
			title: 'Export Ready Code',
			description: 'Get clean, production-ready code that you can customize and deploy anywhere',
			icon: FolderCode
		}
	];
</script>

<section class="mb-10 flex h-full w-full flex-col items-center justify-center gap-y-3">
	<div class="badge px-2 badge-secondary">Features</div>
	<div class="mb-3 flex flex-col gap-y-2 text-center">
		<h4 class="text-3xl font-semibold text-primary sm:text-4xl lg:text-5xl">
			Everything you need to build faster
		</h4>
		<p class="text-sm text-base-content/70 lg:text-lg">
			Powerful tools and components designed to <span class="underline">accelerate</span> your development
			workflow
		</p>
	</div>
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
		{#each featureData as feature}
			<div
				class="group/card card w-full border-2 border-primary/10 bg-base-200 transition-all duration-150 hover:shadow-lg"
			>
				<div
					class="group-card card-body flex flex-col items-center justify-center gap-y-3 text-center"
				>
					<div
						class="flex size-12 items-center justify-center rounded-full border-2 border-base-300 bg-base-200 p-2 transition-colors duration-200 group-hover/card:bg-primary/10"
					>
						<feature.icon
							class="text-base-content/70 transition-colors duration-200 group-hover/card:text-primary"
						/>
					</div>
					<p class="text-lg font-semibold">{feature.title}</p>
					<p>{feature.description}</p>
					<a class="group btn btn-soft btn-primary" href="##">
						Read More
						<ChevronRight
							class="size-4 transition-transform duration-200 group-hover:translate-x-1"
						/>
					</a>
				</div>
			</div>
		{/each}
	</div>
</section>
