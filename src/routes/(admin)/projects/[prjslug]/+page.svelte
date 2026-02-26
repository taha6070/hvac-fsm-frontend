<script lang="ts">
    import { ArrowLeft } from '@lucide/svelte';
    import { page } from '$app/state';
    import { goto } from '$app/navigation';
  export let data;
  import AnalyticsCard from '$lib/components/Analytics/AnalyticsCard.svelte';

  const { project } = data;
  $:projectId=page.params.prjslug
async function generatePays(projectId:string) {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/v1/pays/generate?project_id=${Number(projectId)}`,
      {
        method: "POST",
        headers: {
          "Accept": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status} `);
    }

    const data = await response.json();
    console.log("✅ Success:", data);
    return data;

  } catch (error) {
    console.error("❌ Failed:", error);
  }
}
</script>

<button
  class="btn btn-ghost gap-2 "
  on:click={() => goto('/projects')}
>
  <ArrowLeft />Go Back
</button>
<div class="mt-6"></div>
  <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
  <AnalyticsCard title="Total Invoice" value={project.total_invoice} prefix="$" change={12.4} icon="💰" />
  <AnalyticsCard title="Revenue" value={1823} change={8.1} icon="👥" />
  <AnalyticsCard title="Payroll" value={312} change={-3.2} icon="📦" />
</div>



<div class="mt-5">
<button class="btn btn-primary" on:click={() => goto(`/projects/${projectId}/helperjobs/`)}>
Technician Jobs
</button>

<button class="btn btn-primary" on:click={() => goto(`/projects/${projectId}/jobs/create`)}>
  Create Job
</button>

<button class="btn btn-primary" on:click={() => goto(`/projects/${projectId}/pays`)}>
  Show Pays
</button>

<button class="btn btn-primary" on:click={() => goto(`/projects/${projectId}/fixed-pays`)}>
  Show Fixed Pays
</button>


<button class="btn btn-primary" on:click={() => generatePays(projectId)}>
  Generate Pay
</button>


</div>

<div class="mt-8"></div>




  <!-- Jobs Section -->
  <div class="card bg-base-100 shadow-xl border border-base-300">
    <div class="card-body">

      <div class="flex justify-between items-center">
        <h2 class="text-xl font-bold">Assigned Jobs</h2>
        <span class="badge badge-info">{project.jobs.length} Jobs</span>
      </div>

      <div class="overflow-x-auto mt-4">
        <table class="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Employee</th>
              <th>Type</th>
              <th>Status</th>
              <th>Start</th>
              <th>End</th>
              <th>Edit</th>
            </tr>
          </thead>

          <tbody>
            {#each project.jobs as job, i}
              <tr>
                <td>{i + 1}</td>
                <td class="font-semibold">{job.employee}</td>
                <td>
                  <span class="badge badge-outline">{job.job_type}</span>
                </td>
                <td>
                  <span
                    class="badge"
                    class:badge-warning={job.status === 'inprogress'}
                    class:badge-success={job.status === 'completed'}
                    class:badge-info={job.status === 'pending'}
                  >
                    {job.status}
                  </span>
                </td>
                <td>{new Date(job.start_date).toLocaleString()}</td>
                <td>{new Date(job.end_date).toLocaleString()}</td>
          <td>
            <a href="job/{job.slug}">View Job</a>
          </td>


              </tr>
            {/each}
          </tbody>
        </table>
      </div>

    </div>
  </div>

