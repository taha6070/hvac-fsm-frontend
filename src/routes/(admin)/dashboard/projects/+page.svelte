<script lang="ts">
  import { goto } from '$app/navigation';
  export let data;

  let searchTerm = data.searchTitle;

  // Trigger search when user clicks button or presses Enter
  function handleSearch() {
    const url = new URL(window.location.href);
    url.searchParams.set('title', searchTerm);
    url.searchParams.set('page', '1'); // Reset to page 1 on new search
    goto(url.toString(), { keepFocus: true, noScroll: true });
  }

  function goToPage(page: number) {
    const url = new URL(window.location.href);
    url.searchParams.set('page', page.toString());
    goto(url.toString(), { keepFocus: true, noScroll: true });
  }

  function formatCurrency(val: number) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  }
async function deleteProject(id:Number) {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/v1/projects/a/${id}`, {
        method: "DELETE",
        headers: {
          "accept": "*/*"
        }
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

<div class="p-6 max-w-7xl mx-auto">
  <div class="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
    <h1 class="text-2xl font-bold">HVAC Projects</h1>

    <div class="join w-full max-w-sm">
      <input 
        type="text" 
        placeholder="Search by title..." 
        class="input input-bordered join-item w-full" 
        bind:value={searchTerm}
        on:keydown={(e) => e.key === 'Enter' && handleSearch()}
      />
      <button class="btn btn-primary join-item" on:click={handleSearch}>Search</button>
    </div>
  </div>

  <div class="card bg-base-100 shadow-xl border border-base-300">
    <div class="overflow-x-auto">
      <table class="table table-zebra w-full">
        <thead>
          <tr class="bg-base-200">
            <th>Project Title</th>
            <th>Type</th>
            <th>Invoice</th>
            <th>Status</th>
            <th>Address</th>
            <th class="text-right">Action</th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody>
          {#each data.projects as project}
            <tr class="hover">
              <td>
                <div class="font-bold">{project.title}</div>
                <div class="text-xs opacity-50 font-mono">{project.slug}</div>
              </td>
              <td>
                <span class="badge badge-ghost badge-sm">{project.service_type}</span>
              </td>
              <td class="font-semibold text-success">
                {formatCurrency(project.total_invoice)}
              </td>
              <td>
                <span class="badge badge-sm uppercase font-bold 
                  {project.status === 'inprogress' ? 'badge-warning' : 'badge-success'}">
                  {project.status}
                </span>
              </td>
              <td class="text-sm">{project.addresss}</td>
              <td class="text-right">
                <a href="/dashboard/projects/{project.id}" class="btn btn-ghost btn-xs">View</a>
              </td>
              <td>
<button
  class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-200"
  on:click={() => deleteProject(project.id)}
>
  Delete
</button>
              </td>
            </tr>
          {:else}
            <tr>
              <td colspan="6" class="text-center py-12 text-gray-400">
                No projects found matching "{searchTerm}"
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <div class="flex flex-col items-center p-4 border-t border-base-300 gap-2">
      <div class="text-xs opacity-60">
        Showing Page {data.currentPage} of {data.totalPages} ({data.totalCount} total)
      </div>
      <div class="join">
        <button 
          class="join-item btn btn-sm" 
          disabled={data.currentPage <= 1}
          on:click={() => goToPage(data.currentPage - 1)}
        >«</button>
        
        <button class="join-item btn btn-sm btn-active">
            {data.currentPage}
        </button>

        <button 
          class="join-item btn btn-sm" 
          disabled={data.currentPage >= data.totalPages}
          on:click={() => goToPage(data.currentPage + 1)}
        >»</button>
      </div>
    </div>
  </div>
</div>