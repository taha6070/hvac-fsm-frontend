<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import { ArrowBigDown } from '@lucide/svelte';
  import { Search, Calendar, DollarSign, UserCheck } from "@lucide/svelte"

  export let data;

  let searchTerm = data.params.employeeSearch;
  let startDate = data.params.startDate;
  let endDate = data.params.endDate;

  function updateURL(updates: Record<string, string>) {
    const url = new URL(window.location.href);
    Object.entries(updates).forEach(([k, v]) => {
        if (v) url.searchParams.set(k, v);
        else url.searchParams.delete(k);
    });
    goto(url.toString(), { keepFocus: true, noScroll: true });
  }

  function handleSearch() {
    updateURL({ search: searchTerm, emp_id: '' }); // Reset selection on new search
  }

  function selectEmployee(id: number) {
    updateURL({ emp_id: id.toString(), search: '' });
  }

  function fetchWeeklyPay() {
    if (startDate && endDate) {
      updateURL({ start_date: startDate, end_date: endDate });
    }
  }
</script>

<div class="max-w-4xl mx-auto p-6 space-y-8">
  <h1 class="text-3xl font-bold text-gray-800">Weekly Payroll Calculator</h1>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    
    <div class="card bg-base-100 shadow-xl border border-base-300 p-6">
      <h2 class="text-lg font-semibold mb-4 flex items-center gap-2">
        <Search size={20} class="text-primary" /> 1. Search Employee
      </h2>
      <div class="join w-full">
        <input 
          type="text" 
          placeholder="Enter name (e.g. Nick)" 
          class="input input-bordered join-item w-full"
          bind:value={searchTerm}
          on:keydown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button class="btn btn-primary join-item" on:click={handleSearch}>Find</button>
      </div>

      {#if data.employees.length > 0}
        <ul class="menu bg-base-200 w-full mt-4 rounded-box overflow-hidden">
          <li class="menu-title">Search Results</li>
          {#each data.employees as emp}
            <li>
              <button 
                class="flex justify-between items-center" 
                class:active={data.params.selectedEmpId === emp.id.toString()}
                on:click={() => selectEmployee(emp.id)}
              >
                <div>
                  <span class="font-bold">{emp.name}</span>
                  <p class="text-xs opacity-50">{emp.detail.position}</p>
                </div>
                <span class="text-xs font-mono">{emp.emp_id}</span>
              </button>
            </li>
          {/each}
        </ul>
      {/if}
    </div>

    <div class="card bg-base-100 shadow-xl border border-base-300 p-6">
      <h2 class="text-lg font-semibold mb-4 flex items-center gap-2">
        <Calendar size={20} class="text-secondary" /> 2. Select Date Range
      </h2>
      <div class="space-y-4">
        <div class="form-control">
          <label class="label text-xs font-bold uppercase" for="start">Start Date</label>
          <input id="start" type="date" class="input input-bordered w-full" bind:value={startDate} />
        </div>
        <div class="form-control">
          <label class="label text-xs font-bold uppercase" for="end">End Date</label>
          <input id="end" type="date" class="input input-bordered w-full" bind:value={endDate} />
        </div>
        <button 
          class="btn btn-secondary w-full" 
          disabled={!data.params.selectedEmpId || !startDate || !endDate}
          on:click={fetchWeeklyPay}
        >
          Calculate Weekly Pay
        </button>
      </div>
    </div>
  </div>

  {#if data.weeklyPayData}
    <div class="animate-in fade-in slide-in-from-bottom-4">
      <div class="card bg-blue-50 text-gray-950 shadow-2xl p-8 text-center">
        <h3 class="text-xl opacity-80 mb-2">Total Weekly Amount for</h3>
        <p class="text-4xl font-black mb-6">{data.weeklyPayData.employee_name}</p>
        
        <div class="text-6xl font-mono tracking-tighter">
          ${data.weeklyPayData.total_amount.toLocaleString()}
        </div>
        
        <div class="mt-6 flex justify-center gap-4 text-sm opacity-70 italic">
          <span>From: {startDate}</span>
          <span>To: {endDate}</span>
        </div>
      </div>
    </div>
  {:else if data.params.selectedEmpId && !data.weeklyPayData}
    <div class="alert alert-info shadow-lg">
      <UserCheck />
      <span>Employee selected. Please pick a date range to view earnings.</span>
    </div>
  {/if}
</div>