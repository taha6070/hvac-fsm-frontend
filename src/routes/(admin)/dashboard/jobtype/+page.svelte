<script lang="ts">
    import { ArrowLeft } from '@lucide/svelte';
    import { goto } from '$app/navigation';
  export let data;

  const { jobtype } = data;
</script>
<div class="flex">
<div class="mt-4"></div>
<button class="btn btn-primary" on:click={() => goto(`/dashboard/jobtype/create`)}>
  Create JobType
</button>
</div>
<div class="mt-2.5"></div>

<!-- Jobs Section -->
  <div class="card bg-base-100 shadow-xl border border-base-300">
    <div class="card-body">

      <div class="flex justify-between items-center">
        <h2 class="text-xl font-bold">Job Type</h2>
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
              <th>Edit</th>

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
                <td>{new Date(job.update_at).toLocaleString()}</td>
          <td>
          <button class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-200">Delete</button>
          </td>


              </tr>
            {/each}
          </tbody>
        </table>
      </div>

    </div>
  </div>

