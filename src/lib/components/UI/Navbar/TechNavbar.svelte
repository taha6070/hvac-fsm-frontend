<script>
  let menuOpen = false;
	import { goto } from '$app/navigation';

	async function logout() {
		await fetch('/api/logout', { method: 'POST' });
		goto('/auth/signin');
	}

  const links = [
    { name: 'Home', href: '/jobs' },
    { name: 'Jobs', href: '/jobs' },
    { pays: 'Pays', href:'/pays'}
   ];
</script>

<nav class="navbar bg-base-100 border-b border-base-300 px-4 lg:px-8 shadow-md">
  <!-- Left: Logo & Mobile Menu -->
  <div class="navbar-start">
    <!-- Mobile Hamburger -->
    <div class="dropdown lg:hidden">
      <label
        tabindex="0"
        class="btn btn-ghost btn-circle"
        on:click={() => (menuOpen = !menuOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </label>

      {#if menuOpen}
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content mt-3 z-[1] w-60 rounded-box bg-base-100 shadow-lg p-2"
        >
          {#each links as link}
            <li>
              <a href={link.href} class="hover:bg-base-200 rounded">{link.name}</a>
            </li>
          {/each}
        </ul>
      {/if}
    </div>

    <!-- Brand -->
    <a href="/" class="btn btn-ghost text-xl font-bold tracking-tight">
      HVAC<span class="text-accent">FSM</span>
    </a>
  </div>

  <!-- Center: Desktop Menu -->
  <div class="navbar-center hidden lg:flex">
    <ul class="menu menu-horizontal px-1 font-medium">
      {#each links as link}
        <li>
          <a
            href={link.href}
            class="rounded-full px-3 py-1 hover:bg-base-200 transition-colors"
          >
            {link.name}
          </a>
        </li>
      {/each}
    </ul>
  </div>

  <!-- Right: Quick Actions -->
  <div class="navbar-end hidden lg:flex gap-2">
  <button class="btn btn-ghost rounded-full" on:click={logout}>
	Logout
  </button>
      <!-- <a href="/settings" class="btn btn-primary rounded-full px-6">Settings</a> -->
  </div>
</nav>
