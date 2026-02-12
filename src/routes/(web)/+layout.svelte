<script>
	import '../../app.css';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
  import { Toaster } from 'svelte-sonner';

	let { children } = $props();
</script>

<Toaster />
<main>
	<Navbar />
	<section class="w-full bg-background">
<div class="mx-auto container flex w-full max-w-7xl items-center justify-center bg-background px-5 md:px-10" >
			{@render children()}
		</div>
	</section>
	<Footer />
</main>