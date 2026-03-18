<script lang="ts">
  import { goto } from '$app/navigation';
  import { Search, Mail, Phone, MapPin, Tag, ExternalLink } from '@lucide/svelte';

  export let data;

  let searchInput = data.searchTerm;

  function handleSearch() {
    const url = new URL(window.location.href);
    if (searchInput) url.searchParams.set('name', searchInput);
    else url.searchParams.delete('name');
    
    url.searchParams.set('page', '1'); // Always reset to page 1 on new search
    goto(url.toString(), { keepFocus: true, noScroll: true });
  }

  function changePage(pageNumber: number) {
    const url = new URL(window.location.href);
    url.searchParams.set('page', pageNumber.toString());
    goto(url.toString(), { keepFocus: true, noScroll: true });
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }
</script>

<div class="p-6 max-w-7xl mx-auto space-y-6">
  <div class="flex flex-col md:flex-row justify-between items-center gap-4">
    <div>
      <h1 class="text-2xl font-bold text-gray-800">Client Contacts</h1>
      <p class="text-sm text-gray-500">Manage leads and existing customers</p>
    </div>

    <div class="join w-full max-w-md shadow-sm">
      <input 
        type="text" 
        placeholder="Filter by name..." 
        class="input input-bordered join-item w-full focus:input-primary" 
        bind:value={searchInput}
        on:keydown={(e) => e.key === 'Enter' && handleSearch()}
      />
      <button class="btn btn-primary join-item" on:click={handleSearch}>
        <Search size={18} />
      </button>
    </div>
  </div>

  <div class="card bg-base-100 shadow-xl border border-base-300 overflow-hidden">
    <div class="overflow-x-auto">
      <table class="table table-zebra w-full">
        <thead class="bg-base-200/50">
          <tr>
            <th>Name</th>
            <th>Contact Info</th>
            <th>Location</th>
            <th>Source</th>
            <th>Actions</th>
            <th class="text-right">Added</th>
          </tr>
        </thead>
        <tbody>
          {#each data.contacts as contact}
            <tr class="hover">
              <td>
                <div class="flex items-center gap-3">
                  <div class="avatar placeholder">
                    <div class="bg-indigo-100 text-indigo-700 rounded-lg w-10 font-bold">
                      <span>{contact.name.charAt(0)}</span>
                    </div>
                  </div>
                  <div class="font-bold text-gray-700">{contact.name}</div>
                </div>
              </td>
              <td>
                <div class="flex flex-col gap-1 text-xs">
                  <span class="flex items-center gap-2 text-gray-600">
                    <Mail size={12} class="text-gray-400" /> {contact.email}
                  </span>
                  <span class="flex items-center gap-2 text-gray-600">
                    <Phone size={12} class="text-gray-400" /> {contact.phone_no}
                  </span>
                </div>
              </td>
              <td>
                {#if contact.address}
                  <span class="flex items-center gap-1 text-xs text-gray-500">
                    <MapPin size={12} /> {contact.address}
                  </span>
                {:else}
                  <span class="text-xs italic text-gray-300">No address</span>
                {/if}
              </td>
              <td>
                {#if contact.detail?.tags?.added}
                  <span class="badge badge-sm badge-ghost gap-1 uppercase font-bold text-[10px]">
                    <Tag size={10} /> {contact.detail.tags.added}
                  </span>
                {/if}
              </td>
              <td>
                <button class="btn btn-sm btn-primary" on:click={() => goto(`/dashboard/contacts/${contact.id}`)}>
                  View
                </button>
              </td>
              <td class="text-right text-xs text-gray-400">
                {formatDate(contact.created_at)}
              </td>
            </tr>
          {:else}
            <tr>
              <td colspan="5" class="text-center py-24">
                <div class="flex flex-col items-center opacity-40">
                  <Search size={48} />
                  <p class="mt-2 font-medium">No contacts found for "{searchInput}"</p>
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    {#if data.totalPages > 1}
      <div class="p-4 bg-gray-50 border-t border-base-300 flex justify-between items-center">
        <div class="text-xs font-semibold text-gray-500">
          Page {data.currentPage} of {data.totalPages}
        </div>
        <div class="join">
          <button 
            class="join-item btn btn-sm btn-outline" 
            disabled={data.currentPage <= 1}
            on:click={() => changePage(data.currentPage - 1)}
          >«</button>
          
          <button class="join-item btn btn-sm btn-active">{data.currentPage}</button>
          
          <button 
            class="join-item btn btn-sm btn-outline" 
            disabled={data.currentPage >= data.totalPages}
            on:click={() => changePage(data.currentPage + 1)}
          >»</button>
        </div>
      </div>
    {/if}
  </div>
</div>