<script lang="ts">
    import { ArrowLeft } from '@lucide/svelte';
    import { goto } from '$app/navigation';
  export let data;

  const { jobtype } = data;
</script>

<button
  class="btn btn-ghost gap-2 "
  on:click={() => goto('/projects')}
>
  <ArrowLeft />Go Back
</button>
  <!-- Jobs Section -->
  <div class="card bg-base-100 shadow-xl border border-base-300">
    <div class="card-body">

      <div class="flex justify-between items-center">
        <h2 class="text-xl font-bold">Assigned Jobs</h2>
        <span class="badge badge-info">{jobtype.length} Jobs</span>
      </div>

      <div class="overflow-x-auto mt-4">
        <table class="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>description</th>
              <th>created at</th>
              <th>updated at</th>
            </tr>
          </thead>

          <tbody>
            {#each jobtype as job, i}
              <tr>
                <td>{i + 1}</td>
                <td class="font-semibold">{job.title}</td>
                <td>
                  {job.job_type}
                </td>

                <td>{new Date(job.created_at).toLocaleString()}</td>
                <td>{new Date(job.updated_at).toLocaleString()}</td>
          <td>
            <a href="/dashboard/job/{job.slug}">View Job</a>
          </td>


              </tr>
            {/each}
          </tbody>
        </table>
      </div>

    </div>
  </div>

