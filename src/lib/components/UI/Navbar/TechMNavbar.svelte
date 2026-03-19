<script lang="ts">
	import { page } from '$app/state'; // Use $page from '$app/stores' if on Svelte 4
    import { goto } from '$app/navigation';
    async function logout() {
		await fetch('/api/logout', { method: 'POST' });
		goto('/auth/signin');
	}
    $:currentpage= page.url.pathname


	// Use the same link structure from your desktop navbar
	const links = [
		{
			name: 'Home',
			href: '/jobs',
			icon: 'M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z'
		},
		{
			name: 'Jobs',
			href: '/jobs',
			icon: 'M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h.01a1 1 0 100-2H10zm3 0a1 1 0 000 2h.01a1 1 0 100-2H13zm-3 4a1 1 0 000 2h.01a1 1 0 100-2H10z'
		},
		{
			name: 'Pays',
			href: '/pays',
			icon: 'M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z'
		}
	];
</script>

<footer
	class="flex lg:hidden items-center justify-around border-t border-gray-200 bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-50 h-16"
>
	{#each links as link}
		{@const isActive = currentpage === link.href}

		<a
			href={link.href}
			class="flex items-center gap-1 {isActive ? 'text-blue-600' : 'text-gray-500'}"
		>
			<svg
				class="h-5 w-5"
				fill={isActive ? 'currentColor' : 'none'}
				stroke="currentColor"
				stroke-width={isActive ? '0' : '2'}
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d={link.icon} />
			</svg>

			<span class="text-xs font-medium">{link.name}</span>
		</a>
	{/each}

	<div class="dropdown dropdown-top dropdown-end flex items-center text-gray-500">
		<div role="button" tabindex="0" class="flex items-center gap-1 cursor-pointer">
			<svg
				class="h-5 w-5"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
				/>
			</svg>

			<span class="text-xs font-medium">More</span>
		</div>

		<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
		<ul
			tabindex="0"
			class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mb-2 border border-base-300"
		>
			<li><a href="/profile">Profile Settings</a></li>
			<li><button on:click={logout}>Logout</button></li>
		</ul>
	</div>
</footer>

<div class="lg:hidden h-16"></div>