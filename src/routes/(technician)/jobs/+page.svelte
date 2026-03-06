<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state'; // If using Svelte 5, otherwise use import { page } from '$app/stores';

  export let data;

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
