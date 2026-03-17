<script lang="ts">
  import { ArrowLeft } from '@lucide/svelte';
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  
  export let data;
  const { project, technicianJobs, totalTechJobs } = data;
  
  // Use project ID from the project data returned by the API
  $: projectId = project.id; 

  async function generatePays(id: number) {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/pays/generate?project_id=${id}`, {
        method: "POST",
        headers: { "Accept": "application/json" }
      });
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      alert("Payroll generated successfully!");
    } catch (err) {
      console.error("❌ Failed:", err);
    }
  }
</script>

<button class="btn btn-ghost gap-2" on:click={() => goto('/dashboard/projects')}>
  <ArrowLeft />Go Back
</button>

<div class="mt-5 flex gap-2 flex-wrap">
  <button class="btn btn-primary" on:click={() => goto(`/dashboard/projects/${page.params.prjslug}/helperjobs/create`)}>Technician/helper Jobs (fixed)</button>
  <button class="btn btn-primary" on:click={() => goto(`/dashboard/projects/${page.params.prjslug}/jobs/create`)}>Create Team lead Job</button>
  <button class="btn btn-primary" on:click={() => goto(`/dashboard/projects/${page.params.prjslug}/pays`)}>Show Pays</button>
  <button class="btn btn-primary" on:click={() => generatePays(projectId)}>Generate Pay</button>
</div>

<div class="card bg-base-100 shadow-xl border border-base-300 mt-8">
  <div class="card-body">
    <h2 class="text-xl font-bold">Assigned Jobs <span>(Team Leads)</span></h2>
    <div class="overflow-x-auto">
      <table class="table table-zebra">
        <thead>
          <tr><th>#</th><th>Employee</th><th>Type</th><th>Status</th><th>Start</th><th>Edit</th></tr>
        </thead>
        <tbody>
          {#each project.jobs as job, i}
            <tr>
              <td>{i + 1}</td>
              <td>{job.employee}</td>
              <td><span class="badge badge-outline">{job.job_type}</span></td>
              <td>
                <span class="badge" class:badge-warning={job.status==='inprogress'} class:badge-success={job.status==='completed'}>
                  {job.status}
                </span>
              </td>
              <td>{new Date(job.start_date).toLocaleString()}</td>
              <td><a href="/jobs/{job.job_slug}">View</a></td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>

<div class="card bg-base-100 shadow-xl border border-base-300 mt-8">
  <div class="card-body">
    <h2 class="text-xl font-bold">Technician / helper Jobs </h2>
    <span class="badge badge-info">{totalTechJobs} Jobs</span>
    <div class="overflow-x-auto">
      <table class="table table-zebra">
        <thead>
          <tr><th>#</th><th>Employee</th><th>Type</th><th>Status</th><th>Start</th></tr>
        </thead>
        <tbody>
          {#each technicianJobs as job, i}
            <tr>
              <td>{i + 1}</td>
              <td>{job.emp_name}</td>
              <td><span class="badge badge-outline">{job.job_type}</span></td>
              <td>{job.status}</td>
              <td>{new Date(job.start_date).toLocaleString()}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>