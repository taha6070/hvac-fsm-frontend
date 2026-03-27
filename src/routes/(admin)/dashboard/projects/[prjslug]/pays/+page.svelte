<script lang="ts">
    import { ArrowLeft, Wallet, Users } from "@lucide/svelte";
    import { goto } from '$app/navigation';

    export let data;

    $: ({ standardPays, helperPays,contractorPays , prjId } = data);

    function formatCurrency(amount: number | null) {
        if (amount === null || amount === undefined) return '—';
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    }

    function formatDate(dateString: string) {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    }
    async function HelperPayUpdate(id:Number) {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/helper/pays/${id}`, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: "paid"
        })
      });

      const data = await response.json();
      console.log("Response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Request failed");
      }

      alert("Status updated to paid");
      window.location.reload()
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update status");
    }
  }
    async function TechnicianPayUpdate(id:Number) {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/pays/${id}`, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: "paid"
        })
      });

      const data = await response.json();
      console.log("Response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Request failed");
      }

      alert("Status updated to paid");
      window.location.reload()
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update status");
    }
  }
  async function ContractorPayUpdate(id:Number) {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/contractor/pays/${id}`, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: "paid"
        })
      });

      const data = await response.json();
      console.log("Response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Request failed");
      }

      alert("Status updated to paid");
      window.location.reload()
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update status");
    }
  }
</script>

<div class="p-6 max-w-7xl mx-auto space-y-8">
    <div class="flex items-center justify-between">
        <button class="btn btn-ghost gap-2 pl-0" on:click={() => history.back()}>
            <ArrowLeft size={20} /> Back
        </button>
        <h1 class="text-2xl font-bold italic">Payroll Overview: {prjId}</h1>
    </div>

    <div class="card bg-base-100 shadow-xl border border-base-300 overflow-hidden">
        <div class="bg-primary/10 px-6 py-4 flex justify-between items-center border-b border-base-300">
            <h2 class="text-lg font-bold flex items-center gap-2 text-primary">
                <Wallet size={18} /> Contractor Payroll 
            </h2>
            <span class="badge badge-primary">{contractorPays.length} Records</span>
        </div>
        <div class="overflow-x-auto">
            <table class="table table-zebra w-full">
                <thead class="bg-base-200/50">
                    <tr>
                        <th>Employee</th>
                        <th>Calculated</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Due Date</th>
                        <th class="text-right">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {#each contractorPays as pay}
                        <tr>
                            <td class="font-bold">{pay.employee || pay.employee_name}</td>
                            <td class="text-info">{formatCurrency(pay.calculated_amount)}</td>
                            <td class="font-semibold">{formatCurrency(pay.total_amount)}</td>
                            <td>
                                {#if pay.status}
                                    <span class="text-success font-bold">{pay.status}</span>
                                {:else}
                                    <span class="text-error italic text-xs">Pending</span>
                                {/if}
                            </td>
                            <td class="text-xs">{formatDate(pay.due_date)}</td>
                            <td class="text-right ">
                                <button class="btn btn-ghost btn-xs text-secondary" on:click={()=>ContractorPayUpdate(pay.pay_id)}>Paid</button>
                            </td>
                        </tr>
                    {:else}
                        <tr><td colspan="5" class="text-center py-4 opacity-50">No standard payroll found.</td></tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>

    <div class="card bg-base-100 shadow-xl border border-base-300 overflow-hidden">
        <div class="bg-primary/10 px-6 py-4 flex justify-between items-center border-b border-base-300">
            <h2 class="text-lg font-bold flex items-center gap-2 text-primary">
                <Wallet size={18} /> Standard Payroll (Team Leads)
            </h2>
            <span class="badge badge-primary">{standardPays.length} Records</span>
        </div>
        <div class="overflow-x-auto">
            <table class="table table-zebra w-full">
                <thead class="bg-base-200/50">
                    <tr>
                        <th>Employee</th>
                        <th>Calculated</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Due Date</th>
                        <th class="text-right">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {#each standardPays as pay}
                        <tr>
                            <td class="font-bold">{pay.employee || pay.employee_name}</td>
                            <td class="text-info">{formatCurrency(pay.calculated_amount)}</td>
                            <td class="font-semibold">{formatCurrency(pay.total_amount)}</td>
                            <td>
                                {#if pay.status}
                                    <span class="text-success font-bold">{pay.status}</span>
                                {:else}
                                    <span class="text-error italic text-xs">Pending</span>
                                {/if}
                            </td>
                            <td class="text-xs">{formatDate(pay.due_date)}</td>
                            <td class="text-right ">
                                <button class="btn btn-ghost btn-xs text-secondary" on:click={()=>TechnicianPayUpdate(pay.pay_id)}>Paid</button>
                                {pay.pay_id}
                            </td>
                        </tr>
                    {:else}
                        <tr><td colspan="5" class="text-center py-4 opacity-50">No standard payroll found.</td></tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>



    <div class="card bg-base-100 shadow-xl border border-base-300 overflow-hidden">
        <div class="bg-secondary/10 px-6 py-4 flex justify-between items-center border-b border-base-300">
            <h2 class="text-lg font-bold flex items-center gap-2 text-secondary">
                <Users size={18} /> Technician/Helper Pays
            </h2>
            <span class="badge badge-secondary">{helperPays.length} Records</span>
        </div>
        <div class="overflow-x-auto">
            <table class="table table-zebra w-full">
                <thead class="bg-base-200/50">
                    <tr>
                        <th>Technician</th>
                        <th>Calculated</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Due Date</th>
                        <th class="text-right">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {#each helperPays as pay}
                        <tr>
                        
                            <td class="font-bold">{pay.employee_name || pay.emp_name}</td>
                            <td class="text-secondary font-medium">{formatCurrency(pay.calculated_amount)}</td>
                            <td class="font-semibold">{formatCurrency(pay.total_amount)}</td>

                            <td>
                                {#if pay.status}
                                    <span class="text-success font-bold">{pay.status}</span>
                                {:else}
                                    <span class="text-error italic text-xs">Pending</span>
                                {/if}
                            </td>
                            <td class="text-xs">{formatDate(pay.due_date)}</td>
                            <td class="text-right">
                                <button class="btn btn-ghost btn-xs text-secondary" on:click={()=>HelperPayUpdate(pay.pay_id)}>Paid</button>
                            </td>
                        </tr>
                    {:else}
                        <tr><td colspan="5" class="text-center py-4 opacity-50">No technician payroll found.</td></tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
</div>