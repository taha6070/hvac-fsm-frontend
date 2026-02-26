<script lang="ts">
  export let data;
  import MarkDoneButton from '$lib/components/Technician/MarkDoneButton.svelte';
  import { page } from '$app/state';
  
  $:jobId=page.params.jbid;
  // Destructure for easier access
  $: ({ job, job_type, employee, project, client } = data.details);
   
    function handleUpdated(event) {
    console.log("Updated job:", event.detail);
  }

  function formatDate(dateString: string) {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
</script>

<div class="max-w-7xl mx-auto p-4">
  
  <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
    <div>
      <h1 class="text-3xl font-bold text-gray-800">Job Dashboard</h1>
      <p class="text-gray-500 font-mono">Job ID: {job.slug}</p>
    </div>
    <span class="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-green-100 text-green-700 text-sm font-semibold rounded-full uppercase tracking-wide">
      {job.status} 
    </span>
  </div>

<MarkDoneButton 
  jobId={jobId}
  on:updated={handleUpdated}
/>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

    <div class="lg:col-span-2 space-y-6">

      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Job Details</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <p class="font-medium text-gray-500 uppercase text-xs">Job Type</p>
            <p class="text-gray-800 text-base">{job_type.title}</p>
          </div>
          <div>
            <p class="font-medium text-gray-500 uppercase text-xs">Address</p>
            <p class="text-gray-800 text-base capitalize">{job.address}</p>
          </div>
          <div>
            <p class="font-medium text-gray-500 uppercase text-xs">Start Date</p>
            <p class="text-gray-800">{formatDate(job.start_date)}</p>
          </div>
          <div>
            <p class="font-medium text-gray-500 uppercase text-xs">End Date</p>
            <p class="text-gray-800">{formatDate(job.end_date)}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Products</h2>
        {#if job.products && job.products.length > 0}
          <div class="space-y-4">
            {#each job.products as product}
              <div class="flex justify-between items-center border-b border-gray-50 pb-3 last:border-0">
                <div>
                  <p class="font-medium text-gray-800">{product.name}</p>
                  <p class="text-xs text-gray-400 font-mono">ID: {product.id}</p>
                </div>
                <span class="font-bold text-green-600">${product.amount}</span>
              </div>
            {/each}
          </div>
        {:else}
          <div class="text-gray-400 italic text-sm py-4">No products associated with this job.</div>
        {/if}
      </div>

      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Services</h2>
        {#if job.service}
          <div class="text-gray-800">{job.service}</div>
        {:else}
          <div class="text-gray-400 text-sm italic">No specific services added.</div>
        {/if}
      </div>

    </div>

    <div class="space-y-6">

      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Assigned Technician</h2>
        <div class="flex items-center gap-3">
            <div class="avatar placeholder">
                <div class="bg-neutral text-neutral-content rounded-full w-10">
                    <span class="text-xs">{employee.name.charAt(0)}</span>
                </div>
            </div>
            <div>
                <p class="font-bold text-gray-800">{employee.name}</p>
                <p class="text-xs text-gray-500 capitalize">{employee.role} ({employee.detail.position})</p>
            </div>
        </div>
      </div>

      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 class="text-lg font-semibold text-gray-800 mb-4 text-info">Client Contact</h2>
        <p class="font-bold text-gray-800">{client.name}</p>
        <div class="mt-2 space-y-1">
            <p class="text-sm text-gray-600 flex items-center gap-2">
                📧 {client.email}
            </p>
            <p class="text-sm text-gray-600 flex items-center gap-2">
                📞 {client.phone}
            </p>
        </div>
      </div>

      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 bg-slate-50">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Project Overview</h2>
        <div class="space-y-3">
            <div>
                <p class="text-xs font-semibold text-gray-400 uppercase">Project Title</p>
                <p class="text-sm text-gray-700">{project.title}</p>
            </div>
            <div>
                <p class="text-xs font-semibold text-gray-400 uppercase">Service Category</p>
                <p class="text-sm text-gray-700">{project.service}</p>
            </div>
            <div>
                <p class="text-xs font-semibold text-gray-400 uppercase">Project Created</p>
                <p class="text-sm text-gray-700">{formatDate(project.created_at).split(',')[0]}</p>
            </div>
        </div>
      </div>

    </div>
  </div>
</div>