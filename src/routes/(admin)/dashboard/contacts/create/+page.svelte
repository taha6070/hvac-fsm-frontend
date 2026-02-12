<script lang="ts">
	import { 
        Mail, Phone, MapPin, Send, User, 
        Wrench, Clock, Building2, ChevronRight 
    } from '@lucide/svelte';
	import { createEnhanceHook } from '$lib/hooks/createEnhnaceHook';
	import { enhance } from '$app/forms';
	import { PUBLIC_APP_NAME } from '$env/static/public';

	let name = $state('');
	let email = $state('');
	let phone = $state('');
	let address = $state('');
	let subject = $state('General Inquiry'); // Dropdown for HVAC context
	let message = $state('');
	let loading = $state(false);

	let setLoading = (value: boolean) => (loading = value);
	let disableSubmit = $derived(!name || !email || message || loading);
</script>

<div class="min-h-screen bg-base-300/50 p-4 md:p-8">
	<div class="mx-auto max-w-6xl">
		<div class="mb-8 flex flex-col gap-2">
			<div class="badge badge-primary font-bold tracking-wider">HVAC ERP SYSTEM</div>

			<div class="lg:col-span-2">
				<div class="card bg-base-100 shadow-xl border border-base-content/5">
					<form
						method="POST"
						use:enhance={createEnhanceHook({
							successToast: true,
							failureToast: true,
							setLoading
						})}
						class="card-body p-8"
					>
						<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div class="form-control">
								<label class="label pt-0" for="name"><span class="label-text font-bold">Contact Person</span></label>
								<label class="input input-bordered flex items-center gap-2 focus-within:outline-primary">
									<User size={16} class="opacity-40" />
									<input bind:value={name} name="name" type="text" placeholder="Full Name" required class="w-full" />
								</label>
							</div>

							<div class="form-control">
								<label class="label pt-0" for="email"><span class="label-text font-bold">Business Email</span></label>
								<label class="input input-bordered flex items-center gap-2 focus-within:outline-primary">
									<Mail size={16} class="opacity-40" />
									<input bind:value={email} name="email" type="email" placeholder="email@company.com" required class="w-full" />
								</label>
							</div>

							<div class="form-control">
								<label class="label pt-0" for="phone"><span class="label-text font-bold">Phone Number</span></label>
								<label class="input input-bordered flex items-center gap-2 focus-within:outline-primary">
									<Phone size={16} class="opacity-40" />
									<input bind:value={phone} name="phone" type="tel" placeholder="+1..." class="w-full" />
								</label>
							</div>




						</div>

						<div class="card-actions justify-end mt-8">
							<button type="submit" class="btn btn-primary btn-wide shadow-lg shadow-primary/30" disabled={disableSubmit}>
								{#if loading}
									<span class="loading loading-spinner"></span>
								{:else}
									Dispatch Inquiry <Send size={18} class="ml-2" />
								{/if}
							</button>
						</div>
					</form>

                </div>
            </div>
        </div>

        </div>

</div>