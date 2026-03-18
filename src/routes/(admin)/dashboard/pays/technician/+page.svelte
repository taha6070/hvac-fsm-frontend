<script>
    let employee_id = "";
    let employee_name = "";
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();

    let employees = [];
    let payroll = null;
    let loading = false;
    let searching = false;

    const months = [
        { value: 1, label: "January" },
        { value: 2, label: "February" },
        { value: 3, label: "March" },
        { value: 4, label: "April" },
        { value: 5, label: "May" },
        { value: 6, label: "June" },
        { value: 7, label: "July" },
        { value: 8, label: "August" },
        { value: 9, label: "September" },
        { value: 10, label: "October" },
        { value: 11, label: "November" },
        { value: 12, label: "December" }
    ];

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);

    async function searchEmployee() {
        if (!employee_name.trim()) return;

        searching = true;
        payroll = null;

        try {
            const res = await fetch(
                `http://127.0.0.1:8000/api/v1/employees?page=1&limit=10&name=${employee_name}`
            );
            employees = await res.json();
        } catch (err) {
            console.error(err);
        }

        searching = false;
    }

    async function fetchPayroll() {
        if (!employee_id) return;

        loading = true;
        payroll = null;

        try {
            const res = await fetch(
                `http://127.0.0.1:8000/api/v1/pays/employee/${employee_id}/monthly-pays?year=${year}&month=${month}`
            );
            payroll = await res.json();
        } catch (err) {
            console.error(err);
        }

        loading = false;
    }
</script>

<div class="min-h-screen bg-base-200 flex items-center justify-center p-6">
    <div class="card w-full max-w-2xl bg-base-100 shadow-xl border border-base-300">

        <div class="card-body">

            <!-- Header -->
            <div class="flex items-center justify-between">
                <h2 class="card-title text-2xl font-bold text-primary">
                    💼 Employee Monthly Payroll
                </h2>
                <div class="badge badge-outline badge-primary">
                    HR Panel
                </div>
            </div>

            <!-- Employee Search -->
            <div class="mt-6">
                <label class="label">
                    <span class="label-text font-semibold">
                        Search Employee
                    </span>
                </label>

                <div class="flex gap-2">
                    <input
                        type="text"
                        placeholder="Enter employee name..."
                        class="input input-bordered w-full"
                        bind:value={employee_name}
                        on:keydown={(e) => e.key === "Enter" && searchEmployee()}
                    />

                    <button
                        class="btn btn-primary"
                        on:click={searchEmployee}
                        disabled={searching}
                    >
                        {#if searching}
                            <span class="loading loading-spinner loading-sm"></span>
                        {:else}
                            Search
                        {/if}
                    </button>
                </div>

                <!-- Search Results -->
                {#if employees.length > 0}
                    <div class="mt-3 bg-base-200 rounded-lg p-2 max-h-48 overflow-y-auto border">
                        {#each employees as emp}
                            <div
                                class="p-3 hover:bg-base-300 rounded cursor-pointer transition"
                                on:click={() => {
                                    employee_id = emp.id;
                                    employee_name = emp.name;
                                    employees = [];
                                }}
                            >
                                <p class="font-semibold">{emp.name}</p>
                                <p class="text-xs opacity-60">
                                    {emp.emp_id}
                                </p>
                            </div>
                        {/each}
                    </div>
                {/if}
            </div>

            <!-- Filters -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">

                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">
                            Select Month
                        </span>
                    </label>
                    <select
                        class="select select-bordered w-full"
                        bind:value={month}
                    >
                        {#each months as m}
                            <option value={m.value}>
                                {m.label}
                            </option>
                        {/each}
                    </select>
                </div>

                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">
                            Select Year
                        </span>
                    </label>
                    <select
                        class="select select-bordered w-full"
                        bind:value={year}
                    >
                        {#each years as y}
                            <option value={y}>
                                {y}
                            </option>
                        {/each}
                    </select>
                </div>

            </div>

            <!-- Action Button -->
            <div class="mt-6">
                <button
                    class="btn btn-success w-full text-white"
                    on:click={fetchPayroll}
                    disabled={loading || !employee_id}
                >
                    {#if loading}
                        <span class="loading loading-spinner loading-sm"></span>
                    {:else}
                        Show Payroll
                    {/if}
                </button>
            </div>

            <!-- Result -->
            {#if payroll}
                <div class="mt-8">

                    <div class="stats shadow w-full bg-base-200 rounded-xl">

                        <div class="stat">
                            <div class="stat-title">
                                Employee
                            </div>
                            <div class="stat-value text-lg text-primary">
                                {payroll.employee_name}
                            </div>
                            <div class="stat-desc">
                                {months.find(m => m.value == month)?.label} {year}
                            </div>
                        </div>

                        <div class="stat">
                            <div class="stat-title">
                                Total Amount
                            </div>
                            <div class="stat-value text-success text-4xl">
{payroll.total_amount != null ? `$${payroll.total_amount.toLocaleString()}` : "N/A"}                            </div>
                            <div class="stat-desc">
                                Monthly Salary
                            </div>
                        </div>

                    </div>

                </div>
            {/if}

        </div>
    </div>
</div>