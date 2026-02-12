<script>
	import RedditIcon from '$lib/assets/icons/reddit.svg';
	import DiscordIcon from '$lib/assets/icons/discord.svg';
	import Twitter from '$lib/assets/icons/twitter.svelte';
	import { Zap } from '@lucide/svelte';
	import { PUBLIC_APP_NAME } from '$env/static/public';
</script>

<div class="mx-auto w-full border-t border-base-300">
	<div class="container mx-auto max-w-7xl px-10 pt-12">
		<!-- Main Footer Content -->
		<div class="mb-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
			<!-- Company Info Section -->
			<div class="space-y-4">
				<div class="flex items-center gap-3">
					<Zap class="h-6 w-6 text-primary" />
					<h2 class="text-xl font-bold text-base-content">{PUBLIC_APP_NAME}</h2>
				</div>
				<p class="max-w-md text-sm text-base-content/70">
					Building your next Sveltekit application has never been easier. Get started today for
					free.
				</p>
				<div class="flex items-center gap-4">
					<a href="##"
						><img
							src={RedditIcon}
							alt="Reddit"
							class="size-5 text-base-content/70 transition-colors hover:text-primary"
						/></a
					>
					<a href="##"
						><img
							src={DiscordIcon}
							alt="Discord"
							class="size-5 text-base-content/70 transition-colors hover:text-primary"
						/></a
					>
					<a href="##"
						><Twitter
							className="size-5 fill-base-content/70 hover:fill-primary transition-colors"
						/>
					</a>
				</div>
			</div>

			<!-- Links Section -->
			<div class="flex flex-col gap-8 sm:col-span-2 sm:flex-row sm:justify-end sm:gap-24">
				<!-- Product Links -->
				<div class="space-y-4">
					<h3 class="font-semibold text-base-content">Product</h3>
					<ul class="space-y-3">
						<li>
							<a href="##" class="text-sm text-base-content/70 transition-colors hover:text-primary"
								>Overview</a
							>
						</li>
						<li>
							<a href="##" class="text-sm text-base-content/70 transition-colors hover:text-primary"
								>Features</a
							>
						</li>
						<li>
							<a href="##" class="text-sm text-base-content/70 transition-colors hover:text-primary"
								>Pricing</a
							>
						</li>
						<li>
							<a href="##" class="text-sm text-base-content/70 transition-colors hover:text-primary"
								>Templates</a
							>
						</li>
						<li>
							<a href="##" class="text-sm text-base-content/70 transition-colors hover:text-primary"
								>API</a
							>
						</li>
					</ul>
				</div>

				<!-- Company Links -->
				<div class="space-y-4">
					<h3 class="font-semibold text-base-content">Company</h3>
					<ul class="space-y-3">
						<li>
							<a href="##" class="text-sm text-base-content/70 transition-colors hover:text-primary"
								>About</a
							>
						</li>
						<li>
							<a href="##" class="text-sm text-base-content/70 transition-colors hover:text-primary"
								>Blog</a
							>
						</li>
						<li>
							<a href="##" class="text-sm text-base-content/70 transition-colors hover:text-primary"
								>Careers</a
							>
						</li>
						<li>
							<a href="##" class="text-sm text-base-content/70 transition-colors hover:text-primary"
								>Press</a
							>
						</li>
						<li>
							<a href="##" class="text-sm text-base-content/70 transition-colors hover:text-primary"
								>Partners</a
							>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="divider mb-0"></div>
<!-- Bottom Footer -->
<div
	class="container mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-10 py-5 text-sm text-base-content/70 sm:flex-row sm:items-center"
>
	<p>© {new Date().getFullYear()} {PUBLIC_APP_NAME}.com. All rights reserved.</p>
	<div class="flex items-center gap-4">
		<a href="##" class="transition-colors hover:text-primary">Terms of Service</a>
		<a href="##" class="transition-colors hover:text-primary">Privacy Policy</a>
	</div>
</div>
