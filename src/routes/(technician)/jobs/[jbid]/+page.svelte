<script lang="ts">
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import { enhance } from '$app/forms';
  import { toast } from 'svelte-sonner';
  import { ArrowLeft, PackagePlus, CheckCircle } from '@lucide/svelte';

  export let data;
  export let form;

  // Destructure data
  $: ({ job, job_type, employee, project, client } = data.details);
  $: jobId = page.params.jbid;
  $: isDone = job.status === 'done';

  let loading = false;

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

<div class="max-w-7xl mx-auto p-4 space-y-6">
  
  <div class="flex flex-col gap-4">
    <button 
      class="btn btn-ghost btn-sm w-fit gap-2 px-0 hover:bg-transparent"
      on:click={() => goto('/jobs')}
    >
      <ArrowLeft size={18} /> Back to Jobs
    </button>

    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold text-gray-800 tracking-tight">Job Dashboard</h1>
        <p class="text-gray-500 font-mono text-sm">ID: {job.slug}</p>
      </div>
      
      <div class="flex items-center gap-3">
        <span 
          class="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border"
          class:bg-green-50={isDone}
          class:text-green-700={isDone}
          class:border-green-200={isDone}
          class:bg-blue-50={!isDone}
          class:text-blue-700={!isDone}
          class:border-blue-200={!isDone}
        >
          {job.status}
        </span>
      </div>
    </div>
  </div>

  <div class="grid grid-cols-1 md:flex items-center gap-3 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
    <form 
      method="POST" 
      action="?/markDone" 
      class="w-full md:w-auto"
      use:enhance={() => {
        loading = true;
        return async ({ result }) => {
          loading = false;
          if (result.type === 'success') toast.success("Work Order Completed!");
          if (result.type === 'failure') toast.error(result.data?.message || "Error occurred");
        };
      }}
    >
      <button 
        type="submit"
        disabled={loading || isDone}
        class="btn btn-success w-full text-white shadow-md flex items-center gap-2"
      >
        {#if loading}
          <span class="loading loading-spinner loading-xs"></span>
          Processing...
        {:else if isDone}
          <CheckCircle size={18} /> Job Completed
        {:else}
          <CheckCircle size={18} /> Mark Done
        {/if}
      </button>
    </form>

    <button
      class="btn btn-outline btn-primary w-full md:w-auto gap-2"
      disabled={isDone}
      on:click={() => goto(`/jobs/${jobId}/products`)}
    >
      <PackagePlus size={18} /> Add Products
    </button>

    {#if form?.message && !form.success}
      <p class="text-error text-xs font-medium ml-2">{form.message}</p>
    {/if}
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

    <div class="lg:col-span-2 space-y-6">

      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-50 bg-gray-50/50">
          <h2 class="text-lg font-semibold text-gray-800">Job Specification</h2>
        </div>
        <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div class="space-y-1">
            <p class="text-gray-400 uppercase text-[10px] font-bold">Job Type</p>
            <p class="text-gray-800 font-medium text-base">{job_type.title}</p>
          </div>
          <div class="space-y-1">
            <p class="text-gray-400 uppercase text-[10px] font-bold">Location</p>
            <p class="text-gray-800 font-medium text-base capitalize">{job.address}</p>
          </div>
          <div class="space-y-1">
            <p class="text-gray-400 uppercase text-[10px] font-bold">Start Date</p>
            <p class="text-gray-800">{formatDate(job.start_date)}</p>
          </div>
          <div class="space-y-1">
            <p class="text-gray-400 uppercase text-[10px] font-bold">End Date</p>
            <p class="text-gray-800">{formatDate(job.end_date)}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-50 flex justify-between items-center">
          <h2 class="text-lg font-semibold text-gray-800">Installed Products</h2>
          <span class="badge badge-ghost font-mono">{job.products?.length || 0}</span>
        </div>
        <div class="p-0">
          {#if job.products && job.products.length > 0}
            <table class="table w-full">
              <thead class="bg-gray-50/50 text-gray-500 uppercase text-[10px]">
                <tr>
                  <th class="pl-6">Product Name</th>
                  <th>ID</th>
                  <th class="text-right pr-6">Amount</th>
                </tr>
              </thead>
              <tbody>
                {#each job.products as product}
                  <tr class="hover:bg-gray-50/50 transition-colors">
                    <td class="pl-6 font-medium text-gray-800">{product.name}</td>
                    <td class="font-mono text-xs text-gray-400">#{product.id}</td>
                    <td class="text-right pr-6 font-bold text-green-600">${product.amount}</td>
                  </tr>
                {/each}
              </tbody>
            </table>
          {:else}
            <div class="p-8 text-center text-gray-400 italic text-sm">
              No products associated with this job yet.
            </div>
          {/if}
        </div>
      </div>

      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Service Description</h2>
        {#if job.service}
          <div class="p-4 bg-blue-50 rounded-xl text-blue-900 text-sm leading-relaxed border border-blue-100">
            {job.service}
          </div>
        {:else}
          <div class="text-gray-400 text-sm italic">No specific service notes added.</div>
        {/if}
      </div>
    </div>

    <div class="space-y-6">

      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Assigned Crew</h2>
        <div class="flex items-center gap-4">
            <div class="avatar placeholder">
                <div class="bg-blue-600 text-white rounded-full w-12 shadow-inner">
                    <span class="text-lg font-bold">{employee.name.charAt(0)}</span>
                </div>
            </div>
            <div>
                <p class="font-bold text-gray-800 text-lg">{employee.name}</p>
                <p class="text-xs text-gray-500 font-medium">{employee.role} • {employee.detail.position}</p>
            </div>
        </div>
      </div>

      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Client Contact</h2>
        <p class="font-bold text-gray-900 text-lg mb-2">{client.name}</p>
        <div class="space-y-2">
            <a href="mailto:{client.email}" class="text-sm text-blue-600 hover:underline flex items-center gap-2">
                📧 {client.email}
            </a>
            <a href="tel:{client.phone}" class="text-sm text-gray-600 flex items-center gap-2">
                📞 {client.phone}
            </a>
        </div>
      </div>

      <div class="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 text-white">
        <h2 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Project Overview</h2>
        <div class="space-y-4">
            <div>
                <p class="text-[10px] font-bold text-slate-500 uppercase">Title</p>
                <p class="font-bold text-gray-900 text-lg mb-2">{project.title}</p>
            </div>
            <div class="flex justify-between">
              <div>
                <p class="text-[10px] font-bold text-slate-500 uppercase">Category</p>
                <p class="text-sm text-gray-900">{project.service}</p>
              </div>
              <div class="text-right">
                <p class="text-[10px] font-bold text-slate-500 uppercase">Created</p>
                <p class="text-sm text-gray-900">{formatDate(project.created_at).split(',')[0]}</p>
              </div>
            </div>
        </div>
      </div>

    </div>
  </div>
</div>