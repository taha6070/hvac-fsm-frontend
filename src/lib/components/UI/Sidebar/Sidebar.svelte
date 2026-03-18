<script>
  export let open = true;

  const menu = [
    { name: 'Dashboard', href: '/dashboard/projects', icon: 'dashboard' },
    { name: 'Projects', href: '/dashboard/projects', icon: 'folder' },
    { name: 'Jobs', href: '/jobs', icon: 'briefcase' },
    { name: 'Employees', href: '/dashboard/employee', icon: 'users' },
    { name: 'Pays', href: '/dashboard/pays', icon: 'receipt' },
    { name: 'Settings', href: '/dashboard/settings', icon: 'settings' }
  ];

  const icons = {
    dashboard: `
      <path d="M3 13h8V3H3v10zm10 8h8V11h-8v10zM3 21h8v-6H3v6zm10-18v6h8V3h-8z"/>
    `,
    folder: `
      <path d="M10 4l2 2h8a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2h6z"/>
    `,
    briefcase: `
      <path d="M10 4h4a2 2 0 012 2v2h4a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2v-8a2 2 0 012-2h4V6a2 2 0 012-2zm4 4V6h-4v2h4z"/>
    `,
    users: `
      <path d="M17 20v-2a4 4 0 00-3-3.87M9 20v-2a4 4 0 013-3.87M16 7a4 4 0 11-8 0 4 4 0 018 0z"/>
    `,
    receipt: `
      <path d="M4 2h16v20l-4-2-4 2-4-2-4 2V2zm4 6h8M8 10h8M8 14h6"/>
    `,
    settings: `
      <path d="M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z"/>
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.6 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 008 4.6a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
    `
  };
</script>

<aside
  class={`h-screen w-64 bg-base-100 border-r border-base-300 p-4 flex flex-col transition-all duration-300 ${
    open ? 'block' : 'hidden'
  } lg:block`}
>
  <!-- Brand -->
  <div class="mb-8 flex items-center gap-2 px-2">
    <div class="btn btn-circle btn-sm btn-primary"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
    d="M14.7 2.3a1 1 0 011.4 0l5.6 5.6a1 1 0 010 1.4l-7.5 7.5-2-2 7.5-7.5-5.6-5.6zM11 11l-6 6v3h3l6-6-3-3z" />
</svg>
</div>
    <span class="text-lg font-bold">HVAC FSM</span>
  </div>

  <!-- Menu -->
  <ul class="menu menu-lg rounded-box flex-1">
    {#each menu as item}
      <li>
        <a
          href={item.href}
          class="flex items-center gap-3 rounded-xl hover:bg-base-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            {@html icons[item.icon]}
          </svg>
          <span>{item.name}</span>
        </a>
      </li>
    {/each}
  </ul>

  <!-- Footer -->
  <div class="mt-auto pt-4 border-t border-base-300">
    <a
      href="/logout"
      class="btn btn-ghost w-full justify-start rounded-xl"
    >
      Logout
    </a>
  </div>
</aside>
