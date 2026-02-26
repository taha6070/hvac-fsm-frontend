<script lang="ts">
    import { page } from "$app/state";
  import { createEnhanceHook } from '$lib/hooks/createEnhnaceHook';
  import { enhance } from '$app/forms';

  let amount='';

  let employee_id='';
  let employee: any[] = [];
  let employeeSearch = '';

  let jobtype_id='';
  let jobtype: any[] = [];
  let jobtypeSearch = '';
  let searching = false;

  let loading = false;
  const setLoading = (value: boolean) => (loading = value);

  async function searchEmployee(q: string) {
    if (q.length < 2) return (employee = []);

    searching = true;

    const res = await fetch(
      `http://127.0.0.1:8000/api/v1/employees?page=1&limit=10&name=${q}`
    );

    employee = await res.json();
    searching = false;
  }
    async function searchJobType(q: string) {
    if (q.length < 2) return (jobtype = []);

    searching = true;

    const res = await fetch(
      `http://127.0.0.1:8000/api/v1/job-type?page=1&limit=10&title=${q}`
    );

    jobtype = await res.json();
    searching = false;
  }


</script>

<div class="min-h-screen flex items-center justify-center bg-base-200 px-4 py-8">
	<div class="w-full max-w-lg">
		<div class="card bg-base-100 shadow-xl border border-base-300">
			<div class="card-body gap-6">

				<h1 class="text-2xl font-bold text-center">Create A New Payroll Rule</h1>

				<form
					method="POST"
					use:enhance={createEnhanceHook({
						successToast: true,
						failureToast: true,
						successRedirect: "",
						setLoading
					})}
					class="space-y-4"
				>
					


      <!-- Employee Search -->

	  <div class="relative">

       	<label class="label">
		<span class="label-text font-medium">Employee</span>
	</label>
  <input
    class="input input-bordered w-full"
    placeholder="Search employee..."
    bind:value={employeeSearch}
    on:input={(e) => searchEmployee(e.currentTarget.value)}
  />

  <input type="hidden" name="employee_id" bind:value={employee_id} />

  {#if employee.length}
    <div class="absolute z-10 bg-base-100 shadow-lg rounded-xl w-full mt-2 border">
      {#each employee as e}
        <div
          class="p-3 hover:bg-base-200 cursor-pointer"
          on:click={() => {
            employee_id = e.id;
            employeeSearch = e.name;
            employee = [];
          }}
        >
          <p class="font-medium">{e.name}</p>
          <p class="text-sm opacity-60">{e.email}</p>
        </div>
      {/each}
    </div>
  {/if}

  <!-- JobType -->
   <div class="mt-4 ">

   </div>
   	<label class="label">
		<span class="label-text font-medium">Job Type</span>
	</label>

  <input
    class="input input-bordered w-full"
    placeholder="Search Jobtype..."
    bind:value={jobtypeSearch}
    on:input={(e) => searchJobType(e.currentTarget.value)}
  />

  <input type="hidden" name="jobtype_id" bind:value={jobtype_id} />

  {#if jobtype.length}
    <div class="absolute z-10 bg-base-100 shadow-lg rounded-xl w-full mt-2 border">
      {#each jobtype as j}
        <div
          class="p-3 hover:bg-base-200 cursor-pointer"
          on:click={() => {
            jobtype_id = j.id;
            jobtypeSearch = j.title;
            jobtype = [];
          }}
        >
          <p class="font-medium">{j.title}</p>
          <!-- <p class="text-sm opacity-60">{e.email}</p> -->
        </div>
      {/each}
    </div>
  {/if}
</div>




					<div class="form-control">
						<label class="label">
							<span class="label-text font-medium">Amount</span>
						</label>
						<input
							type="text"
							class="input input-bordered w-full"
							placeholder="Add Amount 500 not do not add $ sign"
							bind:value={amount}
							name="amount"
							required
						/>
					</div>




					<!-- Submit -->
					<button
						type="submit"
						class="btn btn-primary w-full"
						disabled={loading}
					>
						{loading ? 'Creating Payroll…' : 'Create A Payroll'}
					</button>
				</form>

			</div>
		</div>
	</div>
</div>






