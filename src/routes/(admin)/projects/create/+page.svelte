<script lang="ts">
  import { createEnhanceHook } from '$lib/hooks/createEnhnaceHook';
  import { enhance } from '$app/forms';

  let title = '';
  let latitude = '';
  let longitude = '';
  let status = '';
  const serviceTypes = ['Installation', 'Maintenance', 'Inspection', 'Repair'];
  let service_type = '';
  let address = '';
  let start_date = '';
  let total_invoice = '';
  let end_date = '';
  let customer_id = '';

  let customers: any[] = [];
  let customerSearch = '';
  let searching = false;

  let loading = false;
  const setLoading = (value: boolean) => (loading = value);

  async function searchCustomers(q: string) {
    if (q.length < 2) return (customers = []);

    searching = true;

    const res = await fetch(
      `http://127.0.0.1:8000/api/v1/contacts?page=1&limit=10&name=${q}`
    );

    customers = await res.json();
    searching = false;
  }
</script>

<div class="min-h-screen flex items-center justify-center bg-base-200 px-4 py-8">
	<div class="w-full max-w-lg">
		<div class="card bg-base-100 shadow-xl border border-base-300">
			<div class="card-body gap-6">

				<h1 class="text-2xl font-bold text-center">Create A New Project</h1>

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
					<!-- GHL ID -->
					<div class="form-control">
						<label class="label">
							<span class="label-text font-medium">title</span>
						</label>
						<input
							type="text"
							class="input input-bordered w-full"
							placeholder="Name of the Customer"
							bind:value={title}
							name="title"
							required
						/>
					</div>



                      <select 
    bind:value={status}
    id="status"
    name="status"
  class="select select-primary"
  required>

    <option value="" disabled selected hidden>Status</option>
    <option value="inprogress">In Progress</option>
    <option value="done">Completed</option>
        <option value="notstart">Not Started</option>
</select>


					<!-- Total Invoice -->
					<div class="form-control">
						<label class="label">
							<span class="label-text font-medium">Total Invoice</span>
						</label>
						<input
							type="text"
							class="input input-bordered w-full"
							placeholder="1500 DONOT ADD ANY $ sign It will break the system"
							bind:value={total_invoice}
							name="total_invoice"
							required
						/>
					</div>

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
					     
					
					
					
		<select class="select select-bordered w-full"  name="service_type" bind:value={service_type}>
        <option value="" disabled>Select Service</option>
        {#each serviceTypes as s}
          <option value={s}>{s}</option>
        {/each}
      </select>

	  <!-- Service Date -->

	        <div class="flex gap-4">
        <input type="datetime-local" name="start_date" class="input input-bordered w-full" bind:value={start_date} />
        <input type="datetime-local" name="end_date"  class="input input-bordered w-full" bind:value={end_date} />
      </div>

	  <input type="hidden" name="customer_id" value={customer_id} />


	  <div class="relative">
  <input
    class="input input-bordered w-full"
    placeholder="Search customer..."
    bind:value={customerSearch}
    on:input={(e) => searchCustomers(e.currentTarget.value)}
  />

  <input type="hidden" name="customer_id" bind:value={customer_id} />

  {#if customers.length}
    <div class="absolute z-10 bg-base-100 shadow-lg rounded-xl w-full mt-2 border">
      {#each customers as c}
        <div
          class="p-3 hover:bg-base-200 cursor-pointer"
          on:click={() => {
            customer_id = c.id;
            customerSearch = c.name;
            customers = [];
          }}
        >
          <p class="font-medium">{c.name}</p>
          <p class="text-sm opacity-60">{c.email}</p>
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
						{loading ? 'Adding Project…' : 'Create A Project'}
					</button>
				</form>

			</div>
		</div>
	</div>
</div>






