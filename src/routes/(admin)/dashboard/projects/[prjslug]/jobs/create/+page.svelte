<script lang="ts">
  import { page } from "$app/state";
  import { createEnhanceHook } from "$lib/hooks/createEnhnaceHook";
  import { enhance } from "$app/forms";
  import {
    ArrowLeft,
    MapPin,
    Calendar,
    User,
    Briefcase,
    ChevronDown,
  } from "@lucide/svelte";
  import { goto } from "$app/navigation";
  import { PUBLIC_API_URL } from "$env/static/public";
  let status = "";
  let address = "";
  let start_date = "";
  let end_date = "";
  let employee_id = "";
  let jobtype_id = "";
  let projectID = page.params.prjslug;

  let employee: any[] = [];
  let employeeSearch = "";

  let jobtype: any[] = [];
  let jobtypeSearch = "";
  let searching = false;

  let loading = false;
  const setLoading = (value: boolean) => (loading = value);

  async function searchEmployee(q: string) {
    if (q.length < 2) return (employee = []);
    searching = true;
    const res = await fetch(
      `${PUBLIC_API_URL}/employees?page=1&limit=10&name=${q}`,
    );
    employee = await res.json();
    searching = false;
  }

  async function searchJobType(q: string) {
    if (q.length < 2) return (jobtype = []);
    searching = true;
    const res = await fetch(
      `${PUBLIC_API_URL}/job-type?page=1&limit=10&title=${q}`,
    );
    jobtype = await res.json();
    searching = false;
  }
</script>

<div class="mb-6 flex items-center gap-4">
  <button
    class="btn btn-circle btn-ghost bg-base-200"
    on:click={() => goto(`/dashboard/projects/${projectID}`)}
  >
    <ArrowLeft class="w-5 h-5" />
  </button>
  <div>
    <h1 class="text-3xl font-bold text-base-content">Create Team Lead Job</h1>
    <p class="text-sm text-base-content/60 mt-1">
      Assign a new job and select a team lead
    </p>
  </div>
</div>

<div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
  <div class="card bg-base-100 shadow-xl border border-base-200 lg:col-span-2">
    <div class="card-body">
      <h2
        class="card-title text-xl font-semibold border-b border-base-200 pb-2 mb-4"
      >
        Job Details
      </h2>

      <form
        method="POST"
        use:enhance={createEnhanceHook({
          successToast: true,
          failureToast: true,
          successRedirect: "",
          setLoading,
        })}
        class="space-y-6"
      >
        <input type="hidden" name="customer_id" value={employee_id} />
        <input type="hidden" name="project_id" value={projectID} />
        <input type="hidden" name="employee_id" bind:value={employee_id} />
        <input type="hidden" name="jobtype_id" bind:value={jobtype_id} />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Status -->
          <div class="form-control w-full">
            <label class="label" for="status">
              <span class="label-text font-medium text-base-content/80"
                >Status <span class="text-error">*</span></span
              >
            </label>
            <select
              bind:value={status}
              id="status"
              name="status"
              class="select select-bordered w-full focus:select-primary transition-all"
              required
            >
              <option value="" disabled selected hidden
                >Select job status</option
              >
              <option value="assigned">Assigned</option>
              <option value="inprogress">In Progress</option>
              <option value="done">Completed</option>
            </select>
          </div>

          <!-- Address -->
          <!-- <div class="form-control w-full">
            <label class="label" for="address">
              <span class="label-text font-medium text-base-content/80"
                >Address <span class="text-error">*</span></span
              >
            </label>
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50"
              >
                <MapPin class="h-5 w-5" />
              </div>
              <input
                type="text"
                id="address"
                class="input input-bordered w-full pl-10 focus:input-primary transition-all"
                placeholder="123 Main St, City, State"
                bind:value={address}
                name="address"
                required
              />
            </div> -->
          <!-- </div> -->
        </div>

        <!-- Service Dates -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control w-full">
            <label class="label" for="start_date">
              <span class="label-text font-medium text-base-content/80"
                >Start Date <span class="text-error">*</span></span
              >
              <span class="label-text-alt text-base-content/60"
                >America/New_York</span
              >
            </label>
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50"
              >
                <Calendar class="h-5 w-5" />
              </div>
              <input
                type="datetime-local"
                id="start_date"
                name="start_date"
                class="input input-bordered w-full pl-10 focus:input-primary transition-all"
                bind:value={start_date}
                required
              />
            </div>
            {#if !start_date && typeof window !== "undefined"}
              <div class="label p-0 mt-1">
                <span class="label-text-alt text-error font-medium"
                  >Start date is required</span
                >
              </div>
            {/if}
          </div>

          <div class="form-control w-full">
            <label class="label" for="end_date">
              <span class="label-text font-medium text-base-content/80"
                >End Date</span
              >
              <span class="label-text-alt text-base-content/60"
                >America/New_York</span
              >
            </label>
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50"
              >
                <Calendar class="h-5 w-5 text-base-content/40" />
              </div>
              <input
                type="datetime-local"
                id="end_date"
                name="end_date"
                class="input input-bordered w-full pl-10 focus:input-primary transition-all"
                bind:value={end_date}
              />
            </div>
          </div>
        </div>

        <div class="divider"></div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Job Type Search -->
          <div class="form-control w-full relative">
            <label class="label" for="jobtype">
              <span class="label-text font-medium text-base-content/80"
                >Job Type</span
              >
            </label>
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50"
              >
                <Briefcase class="h-5 w-5" />
              </div>
              <input
                id="jobtype"
                class="input input-bordered w-full pl-10 focus:input-primary transition-all"
                placeholder="Search Job Type..."
                bind:value={jobtypeSearch}
                on:input={(e) => searchJobType(e.currentTarget.value)}
              />
            </div>

            {#if jobtype.length}
              <div
                class="absolute top-20 z-10 bg-base-100 shadow-2xl rounded-xl w-full border border-base-300 max-h-60 overflow-auto"
              >
                <ul class="menu p-2 w-full">
                  {#each jobtype as j}
                    <li>
                      <button
                        type="button"
                        class="hover:bg-base-200"
                        on:click={() => {
                          jobtype_id = j.id;
                          jobtypeSearch = j.title;
                          jobtype = [];
                        }}
                      >
                        <span class="font-medium">{j.title}</span>
                      </button>
                    </li>
                  {/each}
                </ul>
              </div>
            {/if}
          </div>

          <!-- Employee Search -->
          <div class="form-control w-full relative">
            <label class="label" for="employee_search">
              <span class="label-text font-medium text-base-content/80"
                >Team Lead (Employee)</span
              >
            </label>
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50"
              >
                <User class="h-5 w-5" />
              </div>
              <input
                id="employee_search"
                class="input input-bordered w-full pl-10 focus:input-primary transition-all"
                placeholder="Search employee..."
                bind:value={employeeSearch}
                on:input={(e) => searchEmployee(e.currentTarget.value)}
              />
            </div>

            {#if employee.length}
              <div
                class="absolute top-20 z-10 bg-base-100 shadow-2xl rounded-xl w-full border border-base-300 max-h-60 overflow-auto"
              >
                <ul class="menu p-2 w-full">
                  {#each employee as e}
                    <li>
                      <button
                        type="button"
                        class="flex flex-col items-start hover:bg-base-200"
                        on:click={() => {
                          employee_id = e.id;
                          employeeSearch = e.name;
                          employee = [];
                        }}
                      >
                        <span class="font-medium">{e.name}</span>
                        <span class="text-xs text-base-content/60"
                          >{e.email}</span
                        >
                      </button>
                    </li>
                  {/each}
                </ul>
              </div>
            {/if}
          </div>
        </div>

        <div class="flex justify-end gap-3 mt-8">
          <button
            type="button"
            class="btn btn-ghost"
            on:click={() => goto(`/dashboard/projects/${projectID}`)}
          >
            Cancel
          </button>
          <button
            type="submit"
            class="btn btn-primary min-w-[150px]"
            disabled={loading}
          >
            {#if loading}
              <span class="loading loading-spinner loading-sm"></span> Assigning...
            {:else}
              Create Job
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
        <li>A Team Lead Job must be assigned to an employee.</li>
        <li>
          Ensure the correct Job Type is selected from the dropdown so standard
          pay rates can apply.
        </li>
        <li>
          Start dates indicate when the technician should be on site. All times
          are America/New_York.
        </li>
      </ul>

      <div class="divider my-4"></div>

      {#if employeeSearch && employee_id}
        <div class="bg-primary/10 rounded-xl p-4 border border-primary/20">
          <div class="flex items-center gap-3">
            <div class="avatar placeholder">
              <div class="bg-primary text-primary-content rounded-full w-10">
                <span class="text-sm font-bold"
                  >{employeeSearch.charAt(0).toUpperCase()}</span
                >
              </div>
            </div>
            <div class="flex flex-col">
              <span class="font-bold text-base-content text-sm"
                >Selected Lead</span
              >
              <span class="text-[13px] text-base-content/80"
                >{employeeSearch}</span
              >
            </div>
          </div>
        </div>
      {:else}
        <div
          class="alert mt-2 py-3 px-3 rounded-lg text-sm bg-base-200 border-none flex flex-row items-center gap-3"
        >
          <User class="w-5 h-5 text-base-content/50" />
          <span
            >No employee selected yet. Ensure you assign a Team Lead before
            submitting.</span
          >
        </div>
      {/if}
    </div>
  </div>
</div>
