<script lang="ts">
  import { ArrowLeft } from "@lucide/svelte";
  import { page } from "$app/state";
  import { goto } from "$app/navigation";
  import { PUBLIC_API_URL } from "$env/static/public";

  export let data;
  const { project, technicianJobs, totalTechJobs } = data;

  // Use project ID from the project data returned by the API
  $: projectId = project.id;

  async function generatePays(id: number) {
    try {
      const response = await fetch(
        `${PUBLIC_API_URL}/pays/generate?project_id=${id}`,
        {
          method: "POST",
          headers: { Accept: "application/json" },
        },
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.detail || `Error: ${response.status}`;
        throw new Error(errorMessage);
      }

      alert("Payroll generated successfully!");
    } catch (err) {
      console.error("❌ Failed:", err);
      // alert the user with the detailed error message
      alert(err.message || "Failed to generate pays");
    }
  }
  async function deleteJob(slug: string) {
    if (!confirm("Are you sure you want to delete this job?")) return;

    try {
      const res = await fetch(`${PUBLIC_API_URL}/jobs/${slug}`, {
        method: "DELETE",
        headers: {
          accept: "*/*",
        },
      });

      if (!res.ok) {
        throw new Error("Delete failed");
      }
      window.location.reload();

      console.log("Project deleted");
    } catch (err) {
      console.error(err);
    }
  }
  async function deleteHelperJob(id: number) {
    if (!confirm("Are you sure you want to delete this helper job?")) return;

    try {
      const res = await fetch(`${PUBLIC_API_URL}/helper/jobs/${id}`, {
        method: "DELETE",
        headers: {
          accept: "*/*",
        },
      });

      if (!res.ok) {
        throw new Error("Delete failed");
      }
      window.location.reload();

      console.log("Project deleted");
    } catch (err) {
      console.error(err);
    }
  }
</script>

<div class="mb-6 flex justify-between items-center">
  <div class="flex items-center gap-4">
    <button
      class="btn btn-circle btn-ghost bg-base-200"
      on:click={() => goto("/dashboard/projects")}
    >
      <ArrowLeft />
    </button>
    <h1 class="text-3xl font-bold text-base-content">Project Details</h1>
  </div>
  <div class="flex gap-2">
    <button
      class="btn btn-outline"
      on:click={() => goto(`/dashboard/projects/${page.params.prjslug}/edit`)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4 mr-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        /></svg
      >
      Edit Project
    </button>
  </div>
</div>

<div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
  <div class="card bg-base-100 shadow-xl border border-base-200 lg:col-span-2">
    <div class="card-body">
      <div
        class="flex flex-col md:flex-row md:justify-between md:items-start gap-4"
      >
        <div>
          <h2 class="card-title text-2xl font-bold mb-1">{project.title}</h2>
          <p class="text-base-content/70 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              /><path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              /></svg
            >
            {project.address}
          </p>
        </div>
        <div
          class="badge badge-lg"
          class:badge-success={project.status === "done"}
          class:badge-warning={project.status === "inprogress"}
          class:badge-info={project.status === "notstart"}
          class:badge-ghost={project.status !== "done" &&
            project.status !== "inprogress" &&
            project.status !== "notstart"}
        >
          {project.status || "Unknown"}
        </div>
      </div>

      <div class="divider my-2"></div>

      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col">
          <span
            class="text-xs font-semibold uppercase text-base-content/50 mb-1"
            >Start Date</span
          >
          <span class="font-medium flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              /></svg
            >
            {project.start_date
              ? new Date(project.start_date).toLocaleDateString()
              : "N/A"}
          </span>
        </div>
        <div class="flex flex-col">
          <span
            class="text-xs font-semibold uppercase text-base-content/50 mb-1"
            >End Date</span
          >
          <span class="font-medium flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-error"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              /></svg
            >
            {project.end_date
              ? new Date(project.end_date).toLocaleDateString()
              : "N/A"}
          </span>
        </div>
      </div>
    </div>
  </div>

  <div class="card bg-base-100 shadow-xl border border-base-200">
    <div class="card-body">
      <h2 class="card-title text-lg font-bold mb-2">Quick Actions</h2>
      <div class="flex flex-col gap-2">
        <button
          class="btn btn-primary btn-sm justify-start"
          on:click={() =>
            goto(`/dashboard/projects/${page.params.prjslug}/jobs/create`)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            /></svg
          >
          Add Team Lead Job
        </button>
        <button
          class="btn btn-secondary btn-sm justify-start"
          on:click={() =>
            goto(
              `/dashboard/projects/${page.params.prjslug}/helperjobs/create`,
            )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            /></svg
          >
          Add Tech/Helper Job
        </button>
        <button
          class="btn btn-info btn-sm justify-start"
          on:click={() =>
            goto(`/dashboard/projects/${page.params.prjslug}/products`)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            /></svg
          >
          Add Products
        </button>
        <div class="divider my-0"></div>
        <button
          class="btn btn-accent btn-sm justify-start"
          on:click={() => generatePays(projectId)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            /></svg
          >
          Generate Pay
        </button>
        <button
          class="btn btn-outline btn-sm justify-start"
          on:click={() =>
            goto(`/dashboard/projects/${page.params.prjslug}/pays`)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            /></svg
          >
          View Pays
        </button>
      </div>
    </div>
  </div>
</div>

<div class="card bg-base-100 shadow-xl border border-base-300 mt-8">
  <div class="card-body">
    <h2 class="text-xl font-bold">Assigned Jobs <span>(Team Leads)</span></h2>
    <div class="overflow-x-auto">
      <table class="table table-zebra">
        <thead>
          <tr
            ><th>#</th><th>Employee</th><th>Type</th><th>Status</th><th
              >Start</th
            ><th>Edit</th><th>Delete</th></tr
          >
        </thead>
        <tbody>
          {#each project.jobs as job, i}
            <tr>
              <td>{i + 1}</td>
              <td>{job.employee}</td>
              <td><span class="badge badge-outline">{job.job_type}</span></td>
              <td>
                <span
                  class="badge"
                  class:badge-warning={job.status === "inprogress"}
                  class:badge-success={job.status === "completed"}
                >
                  {job.status}
                </span>
              </td>
              <td>{new Date(job.start_date).toLocaleString()}</td>
              <td><a href="/jobs/{job.job_slug}">View</a></td>
              <td>
                <button
                  class="btn btn-error btn-sm"
                  on:click={() => deleteJob(job.job_slug)}
                >
                  {job.job_slug}
                  Delete
                </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>

<div class="card bg-base-100 shadow-xl border border-base-300 mt-8">
  <div class="card-body">
    <h2 class="text-xl font-bold">Technician / helper Jobs</h2>
    <span class="badge badge-info">{totalTechJobs} Jobs</span>
    <div class="overflow-x-auto">
      <table class="table table-zebra">
        <thead>
          <tr
            ><th>#</th><th>Employee</th><th>Type</th><th>Status</th><th
              >Start</th
            ><th>Delete</th></tr
          >
        </thead>
        <tbody>
          {#each technicianJobs as job, i}
            <tr>
              <td>{i + 1}</td>
              <td>{job.emp_name}</td>
              <td><span class="badge badge-outline">{job.job_type}</span></td>
              <td>{job.status}</td>
              <td>{new Date(job.start_date).toLocaleString()}</td>
              <td>
                <button
                  class="btn btn-error btn-sm"
                  on:click={() => deleteHelperJob(job.id)}
                >
                  {job.id}
                  Delete
                </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>
