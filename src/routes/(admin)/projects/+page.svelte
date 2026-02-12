<script lang="ts">
    import ProjectTable from '$lib/components/entities/Projects/ProjectTable.svelte';
export let data;
</script>

<div class="p-6 space-y-6">
  <div class="flex items-center justify-between">
    <h1 class="text-2xl font-bold">Jobs Management</h1>

    <button class="btn btn-primary btn-sm">
    <a href="/projects/create">  + Create Job</a>
    </button>
  </div>

  <ProjectTable jobs={data.jobs} />
</div>
