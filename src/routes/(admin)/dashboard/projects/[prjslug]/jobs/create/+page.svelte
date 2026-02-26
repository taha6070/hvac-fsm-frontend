<script lang="ts">
    import { page } from "$app/state";
  import { createEnhanceHook } from '$lib/hooks/createEnhnaceHook';
  import { enhance } from '$app/forms';
  import { ArrowLeft } from "@lucide/svelte";
  import { goto } from "$app/navigation";

  let title = '';
  let status = '';
  let address = '';
  let start_date = '';
  let end_date = '';
  let employee_id = '';
  let jobtype_id='';
  let projectID=page.params.prjslug;

  let employee: any[] = [];
  let employeeSearch = '';

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
<button
  class="btn btn-ghost gap-2 "
  on:click={() => goto('/dashboard/projects')}
>
  <ArrowLeft />Go Back
</button>

<div class="min-h-screen flex items-center justify-center bg-base-200 px-4 py-8">
	<div class="w-full max-w-lg">
		<div class="card bg-base-100 shadow-xl border border-base-300">
			<div class="card-body gap-6">

				<h1 class="text-2xl font-bold text-center">Create A New Job</h1>

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




                      <select 
    bind:value={status}
    id="status"
    name="status"
  class="select select-primary"
  required>

    <option value="" disabled selected hidden>Status</option>
    <option value="assigned">Assigned</option>
    <option value="inprogress">inprogress</option>
        <option value="done">Completed</option>
</select>




					<!-- Address -->
					<div class="form-control">
						<label class="label">
							<span class="label-text font-medium">Address</span>
						</label>
						<input
							type="text"
							class="input input-bordered w-full"
							placeholder="123 Main St, New York"
							bind:value={address}
							name="address"
							required
						/>
					</div>
					     
					

	  <!-- Service Date -->

	        <div class="flex gap-4">
        <input type="datetime-local" name="start_date" class="input input-bordered w-full" bind:value={start_date} />
        <input type="datetime-local" name="end_date"  class="input input-bordered w-full" bind:value={end_date} />
      </div>

	  <input type="hidden" name="customer_id" value={employee_id} />
    <input type="hidden" name="project_id" value={projectID}>

      <!-- Employee Search -->

	  <div class="relative">
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






					<!-- Submit -->
					<button
						type="submit"
						class="btn btn-primary w-full"
						disabled={loading}
					>
						{loading ? 'Assigning Job…' : 'Create A Job'}
					</button>
				</form>

			</div>
		</div>
	</div>
</div>






