<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state'; // If using Svelte 5, otherwise use import { page } from '$app/stores';

  export let data;

  const filters = [
    { label: 'Today', value: 'today' },
    { label: '3D', value: '3d' },
    { label: '5D', value: '5d' },
    { label: '7D', value: '7d' },
    { label: '14D', value: '14d' },
    { label: 'Month', value: 'month' },
    { label: 'All', value:''}
  ];
  function applyFilter(filterValue: string) {
    const url = new URL(window.location.href);
    url.searchParams.set('date_filter', filterValue);
    url.searchParams.set('page', '1'); // Reset to page 1 on new filter
    goto(url.toString(), { keepFocus: true, noScroll: true });
  }

  const statusFilters = [
    { label: 'Assigned', value: 'assigned', color: 'bg-blue-500', text: 'text-blue-600', hover: 'hover:bg-blue-50' },
    { label: 'In Progress', value: 'inprogress', color: 'bg-yellow-500', text: 'text-yellow-700', hover: 'hover:bg-yellow-50' },
    { label: 'Done', value: 'done', color: 'bg-green-500', text: 'text-green-700', hover: 'hover:bg-green-50' }
  ];

  function setStatus(statusValue: string) {
    const url = new URL(window.location.href);
    
    // Toggle: if same status is clicked, clear filter (show all)
    if (url.searchParams.get('status') === statusValue) {
        url.searchParams.delete('status');
    } else {
        url.searchParams.set('status', statusValue);
    }
    
    url.searchParams.set('page', '1'); 
    goto(url.toString(), { keepFocus: true, noScroll: true });
  }






  // Reactive calculations
  $: totalPages = Math.ceil(data.totalCount / data.limit);
  $: currentPage = data.currentPage;

  function changePage(newPage: number) {
    if (newPage < 1 || newPage > totalPages) return;

    const url = new URL(window.location.href);
    url.searchParams.set('page', newPage.toString());
    
    // noScroll keeps the user at the table level instead of jumping to the top
    goto(url.toString(), { keepFocus: true, noScroll: true });
  }
</script>
<!-- filter on Today -->
<div class="flex items-center justify-between flex-wrap gap-4">

<div class="flex flex-wrap gap-2 p-4 bg-white rounded-xl shadow w-fit mb-6">
  {#each filters as filter}
    <button
      class="px-4 py-2 text-sm font-medium rounded-full transition-all"
      class:bg-blue-600={data.activeDateFilter === filter.value}
      class:text-white={data.activeDateFilter === filter.value}
      class:bg-gray-100={data.activeDateFilter !== filter.value}
      class:text-gray-700={data.activeDateFilter !== filter.value}
      class:hover:bg-blue-100={data.activeDateFilter !== filter.value}
      class:hover:text-blue-700={data.activeDateFilter !== filter.value}
      on:click={() => applyFilter(filter.value)}
    >
      {filter.label}
    </button>
  {/each}
</div>

<div class="flex items-center gap-2 bg-gray-100 p-1 rounded-xl w-fit mb-6">
  {#each statusFilters as s}
    {@const isActive = data.activeStatus === s.value}
    <button 
      on:click={() => setStatus(s.value)}
      class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
             {isActive ? 'bg-white shadow-sm ' + s.text : 'text-gray-500 ' + s.hover}"
    >
      <span class="w-2 h-2 rounded-full {s.color}"></span>
      {s.label}
    </button>
  {/each}
</div>



</div>


<div class="card bg-base-100 shadow border border-base-300">
  <div class="card-body">
    <h2 class="card-title">Jobs ({data.totalCount})</h2>
    </div>
</div>





<div class="p-6">

  <!-- Desktop Table -->
  <div class="hidden lg:block">
    <div class="card bg-base-100 shadow-xl border border-base-300">
      <div class="overflow-x-auto">
        <table class="table table-zebra w-full">
          <thead>
            <tr class="bg-base-200">
              <th>Project</th>
              <th>Type</th>
              <th>Status</th>
              <th>Start Date</th>
              <th class="text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {#each data.jobs as job}
              <tr class="hover">
                <td>
                  <div class="font-bold">{job.project}</div>
                </td>

                <td>{job.job_type}</td>

                <td>
                  <span class="badge badge-sm">{job.status}</span>
                </td>

                <td>
          <span class="badge badge-sm">
  {new Date(job.start_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })}
</span>                </td>

                <td class="text-right">
                  <button
                    class="btn btn-ghost btn-xs"
                    on:click={() => goto(`/jobs/${job.slug}`)}
                  >
                    View
                  </button>
                </td>
              </tr>
            {:else}
              <tr>
                <td colspan="4" class="text-center py-10">
                  No jobs found.
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>


  <!-- Mobile Cards -->
  <div class="block lg:hidden space-y-4">

    {#each data.jobs as job}
      <div class="card bg-base-100 border border-base-300 shadow-sm">
        <div class="card-body p-4">

          <div class="flex items-start justify-between">
            <div>
              <h2 class="font-bold text-base">{job.project}</h2>
              <p class="text-sm opacity-70">{job.job_type}</p>
            </div>

            <span class="badge badge-sm">{job.status}</span>
          </div>

                    <span class="badge badge-sm">
  {new Date(job.start_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })}
</span>
          <div class="card-actions justify-end mt-3">
            <button
              class="btn btn-primary btn-xs"
              on:click={() => goto(`/jobs/${job.slug}`)}
            >
              View
            </button>
          </div>

        </div>
      </div>

    {:else}
      <div class="text-center py-10 opacity-70">
        No jobs found.
      </div>
    {/each}

  </div>


    <div class="flex flex-col md:flex-row items-center justify-between p-4 border-t border-base-300 gap-4">
      <div class="text-sm text-base-content/70">
        Showing <span class="font-semibold">{(currentPage - 1) * data.limit + 1}</span> 
        to <span class="font-semibold">{Math.min(currentPage * data.limit, data.totalCount)}</span> 
        of <span class="font-semibold">{data.totalCount}</span> entries
      </div>

      <div class="join">
        <button 
          class="join-item btn btn-sm btn-outline" 
          disabled={currentPage <= 1}
          on:click={() => changePage(currentPage - 1)}
        >
          «
        </button>

        <button class="join-item btn btn-sm btn-active">
          Page {currentPage} of {totalPages}
        </button>

        <button 
          class="join-item btn btn-sm btn-outline" 
          disabled={currentPage >= totalPages}
          on:click={() => changePage(currentPage + 1)}
        >
          »
        </button>
      </div>
    </div>
  </div>
