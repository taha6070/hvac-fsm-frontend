<script lang="ts">
  import { goto } from '$app/navigation';
  import { Search, UserPlus, Phone, Mail, ShieldCheck } from '@lucide/svelte';

  export let data;

  let searchInput = data.searchTerm;

  function handleSearch() {
    const url = new URL(window.location.href);
    if (searchInput) url.searchParams.set('name', searchInput);
    else url.searchParams.delete('name');
    
    url.searchParams.set('page', '1'); // Reset to first page
    goto(url.toString(), { keepFocus: true, noScroll: true });
  }

  function changePage(page: number) {
    const url = new URL(window.location.href);
    url.searchParams.set('page', page.toString());
    goto(url.toString(), { keepFocus: true, noScroll: true });
  }
</script>

<div class="p-6 max-w-7xl mx-auto space-y-6">
  <div class="flex flex-col md:flex-row justify-between items-center gap-4">
    <div>
      <h1 class="text-2xl font-bold text-gray-800">Employee Management</h1>
      <p class="text-sm text-gray-500">Manage crew, admins, and technicians</p>
      <button class="btn btn-primary" on:click={() => goto(`/dashboard/employee/create`)}>
  Create Employee
</button>
    </div>

    <div class="join w-full max-w-md shadow-sm">
      <input 
        type="text" 
        placeholder="Search by name..." 
        class="input input-bordered join-item w-full focus:input-primary" 
        bind:value={searchInput}
        on:keydown={(e) => e.key === 'Enter' && handleSearch()}
      />
      <button class="btn btn-primary join-item" on:click={handleSearch}>
        <Search size={18} />
      </button>
    </div>
  </div>

  <div class="card bg-base-100 shadow-xl border border-base-300 overflow-hidden">
    <div class="overflow-x-auto">
      <table class="table table-zebra w-full">
        <thead class="bg-base-200/50">
          <tr>
            <th>Employee</th>
            <th>Contact</th>
            <th>Role & Team</th>
            <th>ID</th>
            <th class="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {#each data.employees as emp}
            <tr class="hover">
              <td>
                <div class="flex items-center gap-3">
                  <div class="avatar placeholder">
                    <div class="bg-neutral text-neutral-content rounded-full w-10">
                      <span>{emp.name.charAt(0)}</span>
                    </div>
                  </div>
                  <div>
                    <div class="font-bold">{emp.name}</div>
                    <div class="text-xs opacity-50">{emp?.detail?.position ?? 'No position set'}</div>
                  </div>
                </div>
              </td>
              <td>
                <div class="flex flex-col gap-1 text-xs">
                  <span class="flex items-center gap-1"><Mail size={12}/> {emp.email}</span>
                  <span class="flex items-center gap-1"><Phone size={12}/> {emp.phone_no}</span>
                </div>
              </td>
              <td>
                <div class="flex flex-col gap-1">
                  <span class="badge badge-sm badge-outline font-bold uppercase">{emp.role}</span>
                  {#if emp.team_title}
                    <span class="text-[10px] text-primary font-medium">Team: {emp.team_title}</span>
                  {/if}
                </div>
              </td>
              <td class="font-mono text-xs">{emp.emp_id}</td>
              <td class="text-right">
                <button class="btn btn-ghost btn-xs text-primary" on:click={() => goto(`/dashboard/employee/${emp.id}`)}>
                Edit
                </button>
              </td>
            </tr>
          {:else}
            <tr>
              <td colspan="5" class="text-center py-20 text-gray-400 italic">
                No employees found matching "{searchInput}"
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    {#if data.totalPages > 1}
      <div class="p-4 bg-base-200/30 border-t border-base-300 flex justify-between items-center">
        <span class="text-xs text-gray-500">
          Showing Page {data.currentPage} of {data.totalPages}
        </span>
        <div class="join">
          <button 
            class="join-item btn btn-sm" 
            disabled={data.currentPage <= 1}
            on:click={() => changePage(data.currentPage - 1)}
          >«</button>
          <button class="join-item btn btn-sm btn-active">{data.currentPage}</button>
          <button 
            class="join-item btn btn-sm" 
            disabled={data.currentPage >= data.totalPages}
            on:click={() => changePage(data.currentPage + 1)}
          >»</button>
        </div>
      </div>
    {/if}
  </div>
</div>