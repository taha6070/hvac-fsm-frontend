<script>
    import { enhance } from '$app/forms';
    export let data;
    export let form;

    let loading = false;
</script>

<div class="p-6 max-w-lg mx-auto">
    <h1 class="text-2xl font-bold mb-2">Edit Payroll</h1>
    
    <p class="mb-6 text-gray-600">
        Updating rate for <strong>{data?.emp_name || 'User'}</strong> 
        ({data?.jobtype_title || 'Job'})
    </p>

    <div class="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <form 
            method="POST" 
            action="?/updatePayroll" 
            use:enhance={() => {
                loading = true;
                return async ({ update }) => {
                    loading = false;
                    update();
                };
            }}
            class="space-y-6"
        >
            <input type="hidden" name="emp_id" value={data.emp_id} />
            <input type="hidden" name="job_type" value={data.jobtype_id} />

            <div class="form-control">
                <label for="amount" class="label font-bold text-xs uppercase text-gray-400">Rate Amount</label>
                <input 
                    id="amount"
                    type="number" 
                    name="amount" 
                    value={data.amount} 
                    class="input input-bordered w-full text-lg" 
                    required 
                />
            </div>

            <div class="form-control flex flex-row items-center justify-between bg-gray-50 p-3 rounded-lg">
                <span class="text-sm font-semibold">Deduct Helper?</span>
                <input 
                    type="checkbox" 
                    name="deduct_helper" 
                    value="true"
                    checked={data.deduct_helper} 
                    class="toggle toggle-primary" 
                />
            </div>

            <button type="submit" class="btn btn-primary w-full" disabled={loading}>
                {#if loading} Saving... {:else} Update Payroll {/if}
            </button>
        </form>

        {#if form?.message}
            <p class="text-red-500 text-sm mt-4">{form.message}</p>
        {/if}
    </div>
</div>