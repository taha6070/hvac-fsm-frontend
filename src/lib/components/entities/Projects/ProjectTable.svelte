<script lang="ts">
  export interface Job {
    id: number;
    title: string;
    service_type: string;
    addresss: string;
    start_date: string;
    end_date: string;
    created_at: string;
    status?: 'pending' | 'in_progress' | 'completed';
  }

  export let jobs: Job[] = [];

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'completed':
        return 'badge-success';
      case 'in_progress':
        return 'badge-warning';
      default:
        return 'badge-info';
    }
  };
</script>

<div class="overflow-x-auto rounded-xl border border-base-300 bg-base-100 shadow">
  <table class="table table-zebra">
    <thead class="bg-base-200">
      <tr>
        <th>#</th>
        <th>Customer</th>
        <th>Service</th>
        <th>Address</th>
        <th>Start</th>
        <th>End</th>
        <th>Status</th>
        <th>Edit</th>
      </tr>
    </thead>

    <tbody>
      {#each jobs as job, i}
        <tr class="hover">
          <td class="font-mono">{i + 1}</td>

          <td class="font-semibold">
            {job.title}
          </td>

          <td>
              {job.service_type}

          </td>

          <td class="max-w-xs truncate">
            {job.addresss}
          </td>

          <td>
            {new Date(job.start_date).toLocaleString()}
          </td>

          <td>
            {new Date(job.end_date).toLocaleString()}
          </td>

          <td>
            <span class={`badge ${getStatusBadge(job.status)}`}>
              {job.status ?? 'pending'}
            </span>
          </td>
          <td>
            <a href="/projects/{job.id}">View Job</a>
          </td>

        </tr>
      {/each}
    </tbody>
  </table>

  {#if jobs.length === 0}
    <div class="p-8 text-center text-base-content/60">
      No jobs found.
    </div>
  {/if}
</div>
