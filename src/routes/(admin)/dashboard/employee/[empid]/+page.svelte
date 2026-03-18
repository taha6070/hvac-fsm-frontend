<script lang="ts">
    import { enhance } from '$app/forms';
    import { User, Mail, Phone, Briefcase, Hash, Calendar, Edit2, X, Users, Settings } from '@lucide/svelte';
    import type { PageData, ActionData } from './$types';

    export let data: PageData;
    export let form: ActionData;

    $: employee = data.employee;
    $: teams = data.teams || [];

    let isEditModalOpen = false;
    let loading = false;

    // Helper to format date
    const formatDate = (dateString: string) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    function openModal() {
        isEditModalOpen = true;
    }

    function closeModal() {
        isEditModalOpen = false;
    }

    // React to form updates
    $: if (form?.success) {
        closeModal();
    }
</script>

<div class="p-6 max-w-5xl mx-auto space-y-6">
    <!-- Header Page Title -->
    <div class="flex items-center justify-between">
        <div>
            <h1 class="text-3xl font-bold flex items-center gap-3">
                <Users class="text-primary w-8 h-8" />
                Employee Profile
            </h1>
            <p class="text-base-content/60 mt-1">Manage details and assignment for {employee.name}</p>
        </div>
        <button on:click={openModal} class="btn btn-primary shadow-sm hover:shadow-md transition-all gap-2">
            <Edit2 size={18} />
            Edit Profile
        </button>
    </div>

    <!-- Success/Error Global Messages -->
    {#if form?.success}
        <div class="alert alert-success shadow-sm rounded-xl">
            <span>{form.message}</span>
        </div>
    {/if}
    {#if form?.error && !isEditModalOpen}
        <div class="alert alert-error shadow-sm rounded-xl">
            <span>{form.error}</span>
        </div>
    {/if}

    <!-- Employee Profile Card -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        
        <!-- Left Column: Avatar & Quick Info -->
        <div class="card bg-base-100 shadow-xl border border-base-200">
            <div class="card-body items-center text-center p-8">
                <div class="avatar placeholder mb-4">
                    <div class="bg-primary/10 text-primary rounded-full w-32 shadow-inner ring-4 ring-base-100 ring-offset-2 ring-offset-primary/20">
                        <span class="text-4xl font-semibold">{employee.name.charAt(0).toUpperCase()}</span>
                    </div>
                </div>
                
                <h2 class="card-title text-2xl font-bold">{employee.name}</h2>
                <div class="badge badge-primary badge-outline mt-2 px-3 py-3 rounded-full font-medium">
                    {employee.detail?.position || employee.role || 'Employee'}
                </div>
                
                <div class="divider w-full"></div>
                
                <div class="flex flex-col w-full gap-3 text-sm">
                    <div class="flex items-center gap-3 p-3 rounded-lg bg-base-200/50 hover:bg-base-200 transition-colors">
                        <Mail size={18} class="text-primary" />
                        <span class="font-medium truncate" title={employee.email}>{employee.email}</span>
                    </div>
                    <div class="flex items-center gap-3 p-3 rounded-lg bg-base-200/50 hover:bg-base-200 transition-colors">
                        <Phone size={18} class="text-primary" />
                        <span class="font-medium">{employee.phone_no || 'N/A'}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Right Column: Detailed Info -->
        <div class="md:col-span-2 space-y-6">
            <div class="card bg-base-100 shadow-xl border border-base-200">
                <div class="card-body p-8 space-y-6">
                    <h3 class="text-xl font-bold border-b border-base-200 pb-2 mb-4">Professional Details</h3>
                    
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div class="space-y-1">
                            <label class="text-xs font-bold text-base-content/50 uppercase tracking-wider flex items-center gap-2" for="emp_id">
                                <Hash size={14} /> Employee ID
                            </label>
                            <p class="font-semibold text-lg" id="emp_id">{employee.emp_id}</p>
                        </div>
                        
                        <div class="space-y-1">
                            <label class="text-xs font-bold text-base-content/50 uppercase tracking-wider flex items-center gap-2" for="role">
                                <Settings size={14} /> System Role
                            </label>
                            <p class="font-semibold text-lg capitalize" id="role">{employee.role}</p>
                        </div>
                        
                        <div class="space-y-1">
                            <label class="text-xs font-bold text-base-content/50 uppercase tracking-wider flex items-center gap-2" for="team">
                                <Users size={14} /> Assigned Team
                            </label>
                            <div class="flex items-center gap-2 mt-1">
                                {#if employee.team_title}
                                    <span class="badge badge-neutral shadow-sm rounded-md py-3 px-3" id="team">
                                        {employee.team_title}
                                    </span>
                                {:else}
                                    <span class="badge badge-ghost text-base-content/50 italic">Unassigned</span>
                                {/if}
                            </div>
                        </div>

                        <div class="space-y-1">
                            <label class="text-xs font-bold text-base-content/50 uppercase tracking-wider flex items-center gap-2" for="date_joined">
                                <Calendar size={14} /> Date Joined
                            </label>
                            <p class="font-medium text-base-content/80" id="date_joined">{formatDate(employee.created_at)}</p>
                        </div>
                    </div>
                    
                    {#if employee.team_description}
                        <div class="mt-4 p-4 rounded-xl bg-info/10 border border-info/20">
                            <p class="text-sm font-medium text-info-content/80">
                                <strong>Team Note:</strong> {employee.team_description}
                            </p>
                        </div>
                    {/if}
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Edit Employee Modal -->
{#if isEditModalOpen}
    <div class="modal modal-open modal-bottom sm:modal-middle">
        <div class="modal-box p-0 max-w-2xl bg-base-100 shadow-2xl rounded-2xl overflow-hidden">
            <!-- Modal Header -->
            <div class="bg-base-200/50 px-6 py-4 flex items-center justify-between border-b border-base-300">
                <h3 class="font-bold text-xl flex items-center gap-2">
                    <Edit2 class="text-primary" size={20} />
                    Edit Profile: {employee.name}
                </h3>
                <button on:click={closeModal} class="btn btn-sm btn-circle btn-ghost">
                    <X size={20} />
                </button>
            </div>

            <!-- Modal Body -->
            <div class="p-6">
                {#if form?.error}
                    <div class="alert alert-error mb-6 shadow-sm rounded-lg py-3">
                        <span class="text-sm font-medium">{form.error}</span>
                    </div>
                {/if}

                <form 
                    method="POST" 
                    action="?/updateEmployee"
                    class="space-y-5"
                    use:enhance={() => {
                        loading = true;
                        return async ({ update, result }) => {
                            await update();
                            loading = false;
                        };
                    }}
                >
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div class="form-control w-full">
                            <label class="label font-semibold text-sm py-1" for="name">Name</label>
                            <input type="text" id="name" name="name" bind:value={employee.name} class="input input-bordered w-full bg-base-100 hover:border-base-content/30 transition-colors" />
                        </div>
                        
                        <div class="form-control w-full">
                            <label class="label font-semibold text-sm py-1" for="email">Email</label>
                            <input type="email" id="email" name="email" bind:value={employee.email} class="input input-bordered w-full bg-base-100 hover:border-base-content/30 transition-colors" />
                        </div>

                        <div class="form-control w-full">
                            <label class="label font-semibold text-sm py-1" for="phone_no">Phone Number</label>
                            <input type="text" id="phone_no" name="phone_no" bind:value={employee.phone_no} class="input input-bordered w-full bg-base-100 hover:border-base-content/30 transition-colors" placeholder="+1234567890" />
                        </div>

                        <div class="form-control w-full">
                            <label class="label font-semibold text-sm py-1" for="position">Job Position</label>
                            <input type="text" id="position" name="position" value={employee.detail?.position || ''} class="input input-bordered w-full bg-base-100 hover:border-base-content/30 transition-colors" placeholder="e.g. Senior Technician" />
                        </div>

                        <div class="form-control w-full">
                            <label class="label font-semibold text-sm py-1" for="role">System Role</label>
                            <select id="role" name="role" class="select select-bordered w-full bg-base-100 hover:border-base-content/30 transition-colors">
                                <option value="technician" selected={employee.role === 'technician'}>Technician</option>
                                <option value="admin" selected={employee.role === 'admin'}>Admin</option>
                                <option value="helper" selected={employee.role === 'helper'}>Helper</option>
                            </select>
                        </div>

                        <div class="form-control w-full">
                            <label class="label font-semibold text-sm py-1" for="team_id">Assigned Team</label>
                            <select id="team_id" name="team_id" class="select select-bordered w-full bg-base-100 hover:border-base-content/30 transition-colors">
                                <option value="">-- No Team (Unassigned) --</option>
                                {#each teams as team}
                                    <option value={team.id} selected={employee.team_id === team.id}>
                                        {team.title}
                                    </option>
                                {/each}
                            </select>
                        </div>
                    </div>

                    <div class="divider my-2 mt-6">Security</div>

                    <div class="form-control w-full max-w-sm mx-auto">
                        <label class="label font-semibold text-sm py-1" for="password">Change Password <span class="text-xs font-normal text-base-content/50 ml-2">(leave blank to keep current)</span></label>
                        <input type="password" id="password" name="password" class="input input-bordered w-full focus:input-primary transition-all" placeholder="••••••••" />
                    </div>

                    <div class="modal-action bg-base-200/50 -mx-6 -mb-6 px-6 py-4 border-t border-base-300 rounded-b-2xl mt-8">
                        <button type="button" class="btn btn-ghost" on:click={closeModal} disabled={loading}>Cancel</button>
                        <button type="submit" class="btn btn-primary px-8" disabled={loading}>
                            {#if loading}
                                <span class="loading loading-spinner loading-sm"></span>
                            {/if}
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <!-- Backdrop -->
        <button class="modal-backdrop cursor-default" on:click={closeModal} aria-label="Close modal"></button>
    </div>
{/if}
