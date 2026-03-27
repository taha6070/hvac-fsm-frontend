<script lang="ts">
  export let data;
    import { ArrowLeft } from '@lucide/svelte';
    import { page } from '$app/state';
    import { goto } from '$app/navigation';

    $:projectId=page.params.prjslug;
  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleString();
  }
</script>

<button
  class="btn btn-ghost gap-2 "
  on:click={() => goto(`/dashboard/projects/${projectId}`)}
>
  <ArrowLeft />Go Back
</button>




<div class="mt-5">
<button class="btn btn-primary" on:click={() => goto(`/dashboard/projects/${projectId}/helperjobs/create`)}>
    Create Technician Jobs
</button>
</div>


<div class="mt-5 "></div>
  <!-- Jobs Section -->
  <div class="card bg-base-100 shadow-xl border border-base-300">
    <div class="card-body">

      <div class="flex justify-between items-center">
        <h2 class="text-xl font-bold">Technician Jobs</h2>
        <span class="badge badge-info">{data.total} Jobs</span>
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
            {#each data.jobs as job, i}
              <tr>
                <td>{i + 1}</td>
                <td class="font-semibold">{job.emp_name}</td>
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
                <!-- <td>{new Date(job.end_date).toLocaleString()}</td> -->
                 <td>10/20/2025</td>
          <td>
            <!-- <a href="job/{job.}">View Job</a> -->
             <a href="/dashboard/projects/{projectId}/helperjobs/{job.id}">edit</a>
          </td>


              </tr>
            {/each}
          </tbody>
        </table>
      </div>

    </div>
  </div>

