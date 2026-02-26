<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state';

  export let data;

  let searchInput = data.searchQuery;

  function handleSearch() {
    const url = new URL(window.location.href);
    if (searchInput) {
      url.searchParams.set('employee', searchInput);
    } else {
      url.searchParams.delete('employee');
    }
    url.searchParams.set('page', '1'); // Reset pagination on new search
    goto(url.toString(), { keepFocus: true, noScroll: true });
  }

  function formatDate(dateString: string) {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }
</script>

<div class="p-6">
  <div class="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
    <h1 class="text-2xl font-bold">Total Pays</h1>
    
    <div class="join w-full max-w-md">
      <input 
        type="text" 
        placeholder="Search employee name..." 
        class="input input-bordered join-item w-full" 
        bind:value={searchInput}
        on:keydown={(e) => e.key === 'Enter' && handleSearch()}
      />
      <button class="btn btn-primary join-item" on:click={handleSearch}>
        Search
      </button>
    </div>
  </div>

  <div class="card bg-base-100 shadow-xl border border-base-300">
    <div class="overflow-x-auto">
      <table class="table table-zebra w-full">
        <thead>
          <tr class="bg-base-200">
            <th>ID</th>
            <th>Employee</th>
            <th>Calculated</th>
            <th>Total Amount</th>
            <th>Paid</th>
            <th>Due Date</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {#each data.pays as pay}
            <tr>
              <td class="font-mono text-xs">{pay.id}</td>
              <td class="font-semibold">{pay.employee}</td>
              <td class="text-info">${pay.calculated_amount}</td>
              <td>
                <span class="text-amber-900" >{pay.total_amount ? `$${pay.total_amount}` : '—'}</span>
              </td>
              <td>
                {#if pay.amount_paid}
                  <span class="badge badge-success text-white">${pay.amount_paid}</span>
                {:else}
                  <span class="badge badge-ghost opacity-50">Unpaid</span>
                {/if}
              </td>
              <td>{formatDate(pay.due_date)}</td>
              <td class="text-xs opacity-70">{formatDate(pay.created_at)}</td>
            </tr>
          {:else}
            <tr>
              <td colspan="7" class="text-center py-10 text-base-content/50">
                No payment records found for "{searchInput || 'all'}"
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>