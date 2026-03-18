<script lang="ts">
  import { page } from "$app/state";
  import { createEnhanceHook } from '$lib/hooks/createEnhnaceHook';
  import { enhance } from '$app/forms';
  import { goto } from "$app/navigation";
  import { ArrowLeft, User, Briefcase, DollarSign, Percent, HandCoins } from "@lucide/svelte";

  let amount = '';
  let amountError = '';

  $: if (typeof amount === 'string' && /[^\d.]/.test(amount)) {
    amountError = 'Currency symbols are not allowed. Symbols were automatically removed.';
    amount = amount.replace(/[^\d.]/g, '');
    setTimeout(() => { amountError = ''; }, 3500);
  }

  let employee_id = '';
  let employee: any[] = [];
  let employeeSearch = '';

  let jobtype_id = '';
  let helper_deduction = '';
  let commission = "";

  let jobtype: any[] = [];
  let jobtypeSearch = '';
  let searching = false;

  let loading = false;
  const setLoading = (value: boolean) => (loading = value);

  async function searchEmployee(q: string) {
    if (q.length < 2) return (employee = []);
    searching = true;
    const res = await fetch(`http://127.0.0.1:8000/api/v1/employees?page=1&limit=10&name=${q}`);
    employee = await res.json();
    searching = false;
  }

  async function searchJobType(q: string) {
    if (q.length < 2) return (jobtype = []);
    searching = true;
    const res = await fetch(`http://127.0.0.1:8000/api/v1/job-type?page=1&limit=10&title=${q}`);
    jobtype = await res.json();
    searching = false;
  }
</script>

<div class="mb-6 flex items-center gap-4">
  <button class="btn btn-circle btn-ghost bg-base-200" on:click={() => goto('/dashboard/payroll')}>
    <ArrowLeft class="w-5 h-5" />
  </button>
  <div>
    <h1 class="text-3xl font-bold text-base-content">Create Payroll Rule</h1>
    <p class="text-sm text-base-content/60 mt-1">Define payment and commission structures for employees</p>
  </div>
</div>

<div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
  <div class="card bg-base-100 shadow-xl border border-base-200 lg:col-span-2">
    <div class="card-body">
      <h2 class="card-title text-xl font-semibold border-b border-base-200 pb-2 mb-4">Rule Details</h2>

      <form
        method="POST"
        use:enhance={createEnhanceHook({
          successToast: true,
          failureToast: true,
          successRedirect: "",
          setLoading
        })}
        class="space-y-6"
      >
        <input type="hidden" name="employee_id" bind:value={employee_id} />
        <input type="hidden" name="jobtype_id" bind:value={jobtype_id} />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Employee Search -->
          <div class="form-control w-full relative">
            <label class="label" for="employeeSearch">
              <span class="label-text font-medium text-base-content/80">Employee <span class="text-error">*</span></span>
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                <User class="h-5 w-5" />
              </div>
              <input id="employeeSearch" class="input input-bordered w-full pl-10 focus:input-primary transition-all" placeholder="Search employee..." bind:value={employeeSearch} on:input={(e) => searchEmployee(e.currentTarget.value)} required />
            </div>

            {#if employee.length}
              <div class="absolute top-20 z-10 bg-base-100 shadow-xl rounded-xl w-full border border-base-300 max-h-60 overflow-auto">
                <ul class="menu p-2 w-full">
                  {#each employee as e}
                    <li>
                      <button type="button" class="flex flex-col items-start hover:bg-base-200" on:click={() => { employee_id = e.id; employeeSearch = e.name; employee = []; }}>
                        <span class="font-medium">{e.name}</span>
                        <span class="text-xs text-base-content/60">{e.email}</span>
                      </button>
                    </li>
                  {/each}
                </ul>
              </div>
            {/if}
          </div>

          <!-- Job Type Search -->
          <div class="form-control w-full relative">
            <label class="label" for="jobTypeSearch">
              <span class="label-text font-medium text-base-content/80">Job Type <span class="text-error">*</span></span>
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                <Briefcase class="h-5 w-5" />
              </div>
              <input id="jobTypeSearch" class="input input-bordered w-full pl-10 focus:input-primary transition-all" placeholder="Search Job Type..." bind:value={jobtypeSearch} on:input={(e) => searchJobType(e.currentTarget.value)} required />
            </div>
            
            {#if jobtype.length}
              <div class="absolute top-20 z-10 bg-base-100 shadow-xl rounded-xl w-full border border-base-300 max-h-60 overflow-auto">
                <ul class="menu p-2 w-full">
                  {#each jobtype as j}
                    <li>
                      <button type="button" class="hover:bg-base-200" on:click={() => { jobtype_id = j.id; jobtypeSearch = j.title; jobtype = []; }}>
                        <span class="font-medium">{j.title}</span>
                      </button>
                    </li>
                  {/each}
                </ul>
              </div>
            {/if}
          </div>
        </div>

        <div class="divider">Compensation</div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Base Amount -->
          <div class="form-control w-full">
            <label class="label" for="baseAmount">
              <span class="label-text font-medium text-base-content/80">Base Amount <span class="text-error">*</span></span>
              <span class="label-text-alt text-base-content/50">Fixed Pay</span>
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                <DollarSign class="h-5 w-5" />
              </div>
              <input id="baseAmount" type="text" inputmode="decimal" class="input input-bordered w-full pl-10 focus:input-primary transition-all {amountError ? 'input-error' : ''}" placeholder="e.g. 500" bind:value={amount} name="amount" required />
            </div>
            {#if amountError}
              <label class="label p-0 mt-1" for="baseAmount">
                <span class="label-text-alt text-error font-medium">{amountError}</span>
              </label>
            {/if}
          </div>

          <!-- Commission -->
          <div class="form-control w-full">
            <label class="label" for="commissionSelect">
              <span class="label-text font-medium text-base-content/80">Commission</span>
              <span class="label-text-alt text-base-content/50">Optional</span>
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                <Percent class="h-5 w-5" />
              </div>
              <select id="commissionSelect" bind:value={commission} name="commission" class="select select-bordered w-full pl-10 focus:select-primary transition-all">
                <option value="" disabled selected hidden>Will this apply?</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
          </div>
          
          <!-- Helper Deduction -->
          <div class="form-control w-full">
            <label class="label" for="helperDeduction">
              <span class="label-text font-medium text-base-content/80">Helper Deduction</span>
              <span class="label-text-alt text-base-content/50">Optional</span>
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                <HandCoins class="h-5 w-5" />
              </div>
              <select id="helperDeduction" bind:value={helper_deduction} name="helper_deduction" class="select select-bordered w-full pl-10 focus:select-primary transition-all">
                <option value="" disabled selected hidden>Will this apply?</option>
                <option value="true">True (Deduct if helper present)</option>
                <option value="false">False (No deduction)</option>
              </select>
            </div>
          </div>
        </div>

        <div class="flex justify-end gap-3 mt-8">
          <button type="button" class="btn btn-ghost" on:click={() => goto('/dashboard/payroll')}>
            Cancel
          </button>
          <button type="submit" class="btn btn-primary min-w-[150px]" disabled={loading}>
            {#if loading}
              <span class="loading loading-spinner loading-sm"></span> Creating...
            {:else}
              Create Payroll Rule
            {/if}
          </button>
        </div>
      </form>
    </div>
  </div>

  <div class="card bg-base-100 shadow-xl border border-base-200 h-fit">
    <div class="card-body">
      <h2 class="card-title text-lg font-bold mb-2">Instructions</h2>
      <ul class="list-disc list-inside text-sm text-base-content/80 space-y-2">
        <li>A payroll rule links a <strong>Job Type</strong> to a specific <strong>Employee</strong>'s pay rate.</li>
        <li>The <strong>Base Amount</strong> is flat pay. Do not include currency symbols.</li>
        <li><strong>Commission</strong> is a percentage-based bonus paid on top of the base amount. Leave empty if none applies.</li>
        <li><strong>Helper Deduction</strong> automatically subtracts a portion of the pay if a helper is assigned to assist the employee on the job.</li>
      </ul>
      
      <div class="divider my-4"></div>
      
      {#if employeeSearch && employee_id}
        <div class="bg-primary/10 rounded-xl p-4 border border-primary/20">
          <div class="flex items-center gap-3">
            <div class="avatar placeholder">
              <div class="bg-primary text-primary-content rounded-full w-10">
                <span class="text-sm font-bold">{employeeSearch.charAt(0).toUpperCase()}</span>
              </div>
            </div>
            <div class="flex flex-col">
              <span class="font-bold text-base-content text-sm">Selected Employee</span>
              <span class="text-[13px] text-base-content/80">{employeeSearch}</span>
            </div>
          </div>
        </div>
      {:else}
        <div class="alert mt-2 py-3 px-3 rounded-lg text-sm bg-base-200 border-none flex flex-row items-center gap-3">
          <User class="w-5 h-5 text-base-content/50" />
          <span>No employee selected. Search and select above.</span>
        </div>
      {/if}
    </div>
  </div>
</div>






