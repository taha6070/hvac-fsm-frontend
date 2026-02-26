<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state';

  export let data;

  // Local state for search inputs
  let searchTerm = '';
  let jobTypeFilter = page.url.searchParams.get('jobtype') || '';

  // 1. Reactive filtering for Employee (Client-side)
  $: filteredJobs = data.jobs.filter(job => 
    job.employee.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 2. Function to trigger API search via URL update
  function handleSearch() {
    const url = new URL(window.location.href);
    if (jobTypeFilter) {
      url.searchParams.set('jobtype', jobTypeFilter);
    } else {
      url.searchParams.delete('jobtype');
    }
    url.searchParams.set('page', '1'); // Reset to page 1 on new search
    goto(url.toString(), { keepFocus: true, noScroll: true });
  }
</script>

<div class="mt-5 flex justify-between items-center">
  <button class="btn btn-primary" on:click={() => goto(`/dashboard/payroll/create`)}>
    Create New Payroll Rule
  </button>
  
  <div class="flex gap-2">
    <input 
      type="text" 
      placeholder="Search Employee..." 
      class="input input-bordered w-full max-w-xs" 
      bind:value={searchTerm}
    />
    
    <div class="join">
      <input 
        type="text" 
        placeholder="Job Type (e.g. 80)" 
        class="input input-bordered join-item w-32" 
        bind:value={jobTypeFilter}
        on:keydown={(e) => e.key === 'Enter' && handleSearch()}
      />
      <button class="btn btn-square join-item" on:click={handleSearch}>
        Go
      </button>
    </div>
  </div>
</div>

<div class="card bg-base-100 shadow-xl border border-base-300 mt-5">
  <div class="card-body">
    <div class="flex justify-between items-center">
      <h2 class="text-xl font-bold">Payroll Records</h2>
      <span class="badge badge-info">{filteredJobs.length} records shown</span>
    </div>

    <div class="overflow-x-auto mt-4">
      <table class="table table-zebra">
        <thead>
          <tr>
            <th>#</th>
            <th>Employee</th>
            <th>Job Type</th>
            <th>Amount</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {#each filteredJobs as job, i}
            <tr>
              <td>{job.id}</td>
              <td class="font-semibold">{job.employee}</td>
              <td><span class="badge badge-outline">{job.jobtype}</span></td>
              <td class="font-mono text-success">${job.amount}</td>
              <td>{job.emp_role}</td>
              <td>
                <a href="/dashboard/payroll/edit/{job.id}" class="link link-primary">Edit</a>
              </td>
            </tr>
          {:else}
            <tr>
              <td colspan="7" class="text-center py-4">No matching records found.</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>