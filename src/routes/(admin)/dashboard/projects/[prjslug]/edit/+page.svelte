<script lang="ts">
  import { ArrowLeft, Save, Search, User, MapPin, Briefcase, Calendar, X } from '@lucide/svelte';
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  export let data;
  const { project, customer: initialCustomer } = data;

  // Form State
  let title = project.title || '';
  let addresss = project.addresss || ''; // Using spelling from API
  let service_type = project.service_type || '';
  let status = project.status || 'notstart';
  
  // Format dates for datetime-local input
  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    // Adjust for local timezone offset if needed, or simply slice the ISO string
    // '2026-03-17T22:52:00' -> '2026-03-17T22:52'
    return date.toISOString().slice(0, 16);
  };

  let start_date = formatDateForInput(project.start_date);
  let end_date = formatDateForInput(project.end_date);
  
  let customer_id = project.customer_id;
  let selectedCustomer = initialCustomer;

  // Contact Search State
  let searchQuery = '';
  let searchResults = [];
  let isSearching = false;
  let showDropdown = false;

  let isSaving = false;
  let errorMessage = '';

  // Handle contact search
  let searchTimeout;
  const handleSearch = () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(async () => {
      if (searchQuery.length < 2) {
        searchResults = [];
        showDropdown = false;
        return;
      }
      isSearching = true;
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/v1/contacts?page=1&limit=10&name=${encodeURIComponent(searchQuery)}`);
        if (res.ok) {
          searchResults = await res.json();
          showDropdown = searchResults.length > 0;
        }
      } catch (err) {
        console.error("Search failed:", err);
      } finally {
        isSearching = false;
      }
    }, 300);
  };

  const selectCustomer = (customer) => {
    selectedCustomer = customer;
    customer_id = customer.id;
    searchQuery = '';
    showDropdown = false;
  };

  const clearCustomer = () => {
    selectedCustomer = null;
    customer_id = null;
  };

  const handleSubmit = async () => {
    isSaving = true;
    errorMessage = '';

    const payload = {
      title,
      addresss,
      latitude: project.latitude || 0,
      longitude: project.longitude || 0,
      service_type,
      start_date: start_date ? new Date(start_date).toISOString() : null,
      end_date: end_date ? new Date(end_date).toISOString() : null,
      customer_id,
      status
    };

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/projects/${project.id}`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json" 
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Failed to update project. Status: ${response.status}`);
      }

      // Automatically go back to project details on success
      goto(`/dashboard/projects/${page.params.prjslug}`);
    } catch (err) {
      console.error("❌ Failed:", err);
      errorMessage = err.message || "An error occurred while saving the project.";
    } finally {
      isSaving = false;
    }
  };
</script>

<div class="mb-6 flex items-center gap-4">
  <button class="btn btn-circle btn-ghost bg-base-200" on:click={() => goto(`/dashboard/projects/${page.params.prjslug}`)}>
    <ArrowLeft class="w-5 h-5" />
  </button>
  <div>
    <h1 class="text-3xl font-bold text-base-content">Edit Project</h1>
    <p class="text-sm text-base-content/60 mt-1">Update details for {project.title}</p>
  </div>
</div>

{#if errorMessage}
  <div class="alert alert-error mb-6 shadow-md">
    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    <span>{errorMessage}</span>
  </div>
{/if}

<div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
  <div class="card bg-base-100 shadow-xl border border-base-200 lg:col-span-2">
    <div class="card-body">
      <h2 class="card-title text-xl font-semibold border-b border-base-200 pb-2 mb-4">Project Information</h2>
      
      <form on:submit|preventDefault={handleSubmit} class="space-y-6">
        
        <!-- General Details -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control w-full">
            <label class="label" for="projectTitle">
              <span class="label-text font-medium text-base-content/80">Project Title</span>
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                <Briefcase class="h-5 w-5" />
              </div>
              <input id="projectTitle" type="text" bind:value={title} placeholder="Enter project title" class="input input-bordered w-full pl-10 focus:input-primary transition-all" required />
            </div>
          </div>

          <div class="form-control w-full">
            <label class="label" for="serviceType">
              <span class="label-text font-medium text-base-content/80">Service Type</span>
            </label>
            <select id="serviceType" bind:value={service_type} class="select select-bordered w-full focus:select-primary transition-all">
              <option value="" disabled selected>Select service type</option>
              <option value="Installation">Installation</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Inspection">Inspection</option>
              <option value="Repair">Repair</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control w-full">
            <label class="label" for="projectAddress">
              <span class="label-text font-medium text-base-content/80">Address</span>
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                <MapPin class="h-5 w-5" />
              </div>
              <input id="projectAddress" type="text" bind:value={addresss} placeholder="123 Main St, City, State ZIP" class="input input-bordered w-full pl-10 focus:input-primary transition-all" required />
            </div>
          </div>

          <div class="form-control w-full">
            <label class="label" for="projectStatus">
              <span class="label-text font-medium text-base-content/80">Status</span>
            </label>
            <select id="projectStatus" bind:value={status} class="select select-bordered w-full focus:select-primary transition-all">
              <option value="notstart">Not Started</option>
              <option value="inprogress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
        </div>

        <!-- Dates -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control w-full">
            <label class="label" for="startDate">
              <span class="label-text font-medium text-base-content/80">Start Date & Time</span>
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                <Calendar class="h-5 w-5" />
              </div>
              <input id="startDate" type="datetime-local" bind:value={start_date} class="input input-bordered w-full pl-10 focus:input-primary transition-all" required />
            </div>
          </div>

          <div class="form-control w-full">
            <label class="label" for="endDate">
              <span class="label-text font-medium text-base-content/80">End Date & Time</span>
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                <Calendar class="h-5 w-5 text-base-content/40" />
              </div>
              <input id="endDate" type="datetime-local" bind:value={end_date} class="input input-bordered w-full pl-10 focus:input-primary transition-all" />
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="divider"></div>
        <div class="flex justify-end gap-3 mt-6">
          <button type="button" class="btn btn-ghost" on:click={() => goto(`/dashboard/projects/${page.params.prjslug}`)}>
            Cancel
          </button>
          <button type="submit" class="btn btn-primary min-w-[120px]" disabled={isSaving}>
            {#if isSaving}
              <span class="loading loading-spinner loading-sm"></span>
              Saving...
            {:else}
              <Save class="w-4 h-4 mr-2" />
              Save Changes
            {/if}
          </button>
        </div>
      </form>
    </div>
  </div>

  <div class="card bg-base-100 shadow-xl border border-base-200 h-fit">
    <div class="card-body">
      <h2 class="card-title text-xl font-semibold border-b border-base-200 pb-2 mb-4">Customer Details</h2>
      
      <div class="form-control w-full">
        {#if selectedCustomer}
          <!-- Selected Customer Card -->
          <div class="bg-base-200/50 rounded-xl p-4 border border-base-300 relative group transition-all hover:bg-base-200">
            <button class="absolute top-2 right-2 btn btn-xs btn-circle btn-ghost text-base-content/50 hover:text-error opacity-0 group-hover:opacity-100 transition-opacity" on:click={clearCustomer} title="Remove customer">
              <X class="w-4 h-4" />
            </button>
            <div class="flex items-center gap-3">
              <div class="avatar placeholder">
                <div class="bg-primary text-primary-content rounded-full w-10">
                  <span class="text-sm font-bold">{selectedCustomer.name.charAt(0).toUpperCase()}</span>
                </div>
              </div>
              <div class="flex flex-col">
                <span class="font-bold text-base-content">{selectedCustomer.name}</span>
                <span class="text-xs text-base-content/60">{selectedCustomer.phone_no || 'No phone'}</span>
                {#if selectedCustomer.email}
                  <span class="text-xs text-base-content/60 truncate w-40">{selectedCustomer.email}</span>
                {/if}
              </div>
            </div>
            <div class="mt-3 pt-3 border-t border-base-300/50 text-xs text-center text-success font-medium">
              ✓ Attached to project
            </div>
          </div>
        {:else}
          <!-- Customer Search -->
          <label class="label pt-0" for="customerSearch">
            <span class="label-text font-medium text-base-content/80">Search & Assign Customer</span>
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
              <Search class="h-4 w-4" />
            </div>
            <input 
              id="customerSearch"
              type="text" 
              bind:value={searchQuery} 
              on:input={handleSearch}
              placeholder="Search by name..." 
              class="input input-bordered w-full pl-10 focus:input-primary transition-all" 
            />
            
            {#if isSearching}
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                <span class="loading loading-spinner loading-xs text-primary"></span>
              </div>
            {/if}
            
            <!-- Search Results Dropdown -->
            {#if showDropdown && searchResults.length > 0}
              <ul class="absolute z-10 mt-1 w-full bg-base-100 border border-base-300 shadow-2xl max-h-60 rounded-box overflow-auto">
                {#each searchResults as contact}
                  <li>
                    <button class="w-full text-left px-4 py-3 hover:bg-base-200 transition-colors border-b border-base-200 last:border-0 flex items-center gap-3" type="button" on:click={() => selectCustomer(contact)}>
                      <div class="bg-base-300 rounded-full p-2 text-base-content/70">
                        <User class="w-4 h-4" />
                      </div>
                      <div class="flex flex-col">
                        <span class="font-semibold text-sm">{contact.name}</span>
                        <span class="text-xs text-base-content/60">{contact.phone_no}</span>
                      </div>
                    </button>
                  </li>
                {/each}
              </ul>
            {:else if showDropdown && searchResults.length === 0 && searchQuery.length > 0 && !isSearching}
              <div class="absolute z-10 mt-1 w-full bg-base-100 border border-base-300 shadow-lg p-4 rounded-box text-center text-sm text-base-content/60">
                No contacts found matching "{searchQuery}"
              </div>
            {/if}
          </div>
          <div class="alert mt-4 py-2 px-3 rounded-lg text-sm bg-info/10 text-info border-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>Search for a customer to link them to this project.</span>
          </div>
        {/if}
      </div>
      
    </div>
  </div>
</div>