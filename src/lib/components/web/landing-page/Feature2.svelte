<script lang="ts">
	import {
		Cloud,
		ChartLine,
		Brain,
		Codesandbox,
		Bird,
		Cat,
		Dog,
		Heart,
		Handshake
	} from '@lucide/svelte';

	let activeIndex = $state(0);

	const features = [
		{
			title: 'Cloud Storage',
			description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
			icon: Cloud,
			image: Bird,
			link: '##'
		},
		{
			title: 'Real-Time Analytics',
			description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
			icon: ChartLine,
			image: Cat,
			link: '##'
		},
		{
			title: 'AI-Powered Insights',
			description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
			icon: Brain,
			image: Dog,
			link: '##'
		},
		{
			title: 'Live Preview',
			description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
			icon: Codesandbox,
			image: Heart,
			link: '##'
		}
	];

	const handleScroll = (index: number) => {
		activeIndex = index;
		const targetElement = document.getElementById(`item${index + 1}`);
		if (targetElement) {
			targetElement.scrollIntoView({
				behavior: 'smooth',
				block: 'nearest',
				inline: 'center'
			});
		}
	};
</script>

<section class="flex w-full flex-col gap-y-10 py-10">
	<div class="mb-3 flex flex-col items-center gap-y-2 text-center">
		<p class="badge px-3 text-center badge-neutral">
			<Handshake class="size-3" />
			Why Choose Us
		</p>
		<h4 class="text-3xl font-semibold text-primary sm:text-4xl lg:text-5xl">
			Built for modern developers
		</h4>
		<p class="text-sm text-base-content/70 lg:text-lg">
			Streamline your workflow with <span class="underline">intelligent tools</span> that adapt to your
			needs and scale with your ambitions
		</p>
	</div>
	<!-- Carousel Images -->
	<div class="flex w-full flex-col-reverse lg:flex-row lg:gap-10">
		<div class="flex w-full flex-col items-center justify-start gap-2 py-2 lg:w-[75%]">
			{#each features as feature, index}
				<button
					onclick={() => handleScroll(index)}
					class="hover:border-content-foreground flex w-full flex-1 cursor-pointer items-center justify-center gap-3 rounded-lg border-2 border-base-300 p-10 transition-all duration-150 hover:shadow-md"
					class:border-primary={activeIndex === index}
					class:shadow={activeIndex === index}
				>
					<div class="btn btn-square btn-neutral">
						<feature.icon class="size-5 flex-none" />
					</div>
					<div class="flex w-full flex-col items-start gap-1">
						<p class="text-sm font-semibold">{feature.title}</p>
						<p class="text-left text-xs text-muted-foreground">
							{feature.description}
						</p>
					</div>
				</button>
			{/each}
		</div>
		<div class="flex h-87.5 w-full flex-col lg:h-auto lg:w-[55%]">
			<div class="carousel h-full w-full rounded-lg border-2 border-base-300">
				{#each features as feature, index}
					<div
						id="item{index + 1}"
						class="carousel-item flex h-full w-full flex-col rounded-lg bg-base-200"
					>
						<!-- Main icon display -->
						<div class="flex flex-1 items-center justify-center p-8">
							<div class="rounded-full bg-primary p-5 lg:p-8">
								<feature.icon class="size-8 text-primary-content lg:size-16" />
							</div>
						</div>
						<!-- Summary at bottom -->
						<div class="flex items-center justify-start gap-x-3 rounded-b-lg bg-base-100 p-6">
							<div class="btn btn-square btn-neutral">
								<feature.icon class="size-5 flex-none" />
							</div>
							<div class="flex flex-col text-left">
								<h3 class="text-content mb-2 text-lg font-semibold">{feature.title}</h3>
								<p class="text-sm text-base-content/70">{feature.description}</p>
							</div>
						</div>
					</div>
				{/each}
			</div>
			<div class="-auto flex items-center justify-center gap-x-3 p-3">
				{#each features as galleryDot, index}
					<button
						class="size-3 rounded-full bg-base-300 transition-all duration-300 ease-in-out"
						class:bg-primary={activeIndex === index}
						class:w-5={activeIndex === index}
						aria-label={galleryDot.title}
						onclick={() => handleScroll(index)}
					></button>
				{/each}
			</div>
		</div>
	</div>
</section>
