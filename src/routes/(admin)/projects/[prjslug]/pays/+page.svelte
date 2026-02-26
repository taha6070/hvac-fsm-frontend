<script lang="ts">
    import { ArrowLeft } from '@lucide/svelte';
    import { goto } from '$app/navigation';
    import { page } from '$app/state';
    export let data;
    $:prj_id=page.params.prjslug;

    function formatCurrency(amount: number | null) {
        if (amount === null) return '—';
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    }

    function formatDate(dateString: string) {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    }
</script>

<button
  class="btn btn-ghost gap-2 "
  on:click={() => goto(`/projects/${prj_id}`)}
>
  <ArrowLeft />Go Back
</button>

<div class="card bg-base-100 shadow-xl border border-base-300 mx-4 my-6">
    <div class="card-body p-0">
        <div class="flex justify-between items-center p-6">
            <h2 class="card-title text-xl font-bold">Project Payments (ID: {data.prjId})</h2>
            <div class="badge badge-secondary">{data.pays.length} Records</div>
        </div>

        <div class="overflow-x-auto">
            <table class="table table-zebra w-full">
                <thead class="bg-base-200">
                    <tr>
                        <th class="w-16">ID</th>
                        <th>Employee</th>
                        <th>Calculated</th>
                        <th>Total</th>
                        <th>Paid</th>
                        <th>Due Date</th>
                        <th>Created</th>
                        <th class="text-right">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {#each data.pays as pay}
                        <tr class="hover">
                            <td class="font-mono text-xs">{pay.pay_id}</td>
                            <td>
                                <div class="font-bold">{pay.employee_name}</div>
                            </td>
                            <td class="text-info font-medium">
                                {formatCurrency(pay.calculated_amount)}
                            </td>
                            <td>
                                {formatCurrency(pay.total_amount)}
                            </td>
                            <td>
                                {#if pay.amount_paid}
                                    <div class="badge badge-success gap-2">
                                        {formatCurrency(pay.amount_paid)}
                                    </div>
                                {:else}
                                    <div class="badge badge-ghost opacity-50 italic">Pending</div>
                                {/if}
                            </td>
                            <td>
                                <span class="text-sm">{formatDate(pay.due_date)}</span>
                            </td>
                            <td>
                                <span class="text-xs opacity-60">{formatDate(pay.created_at)}</span>
                            </td>
                            <td class="text-right">
                                <button class="btn btn-ghost btn-xs">Details</button>
                            </td>
                        </tr>
                    {:else}
                        <tr>
                            <td colspan="8" class="text-center py-12 text-base-content/50">
                                No payment records found for this project.
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
</div>