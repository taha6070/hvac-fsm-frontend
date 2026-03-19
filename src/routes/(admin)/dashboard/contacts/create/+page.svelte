<script lang="ts">
	import { Image, Eye, EyeOff, ChevronRight } from '@lucide/svelte';
	import { createEnhanceHook } from '$lib/hooks/createEnhnaceHook';
	import { enhance } from '$app/forms';
	import { PUBLIC_APP_NAME } from '$env/static/public';

	let email = $state('');
	let ghl_id = $state('');
	let name = $state('');
	let phone_no = $state('');
	let address = $state('');
	let loading = $state(false);
	const setLoading = (value: boolean) => (loading = value);
</script>

<div class="min-h-screen flex items-center justify-center bg-base-200 px-4 py-8">
	<div class="w-full max-w-lg">
		<div class="card bg-base-100 shadow-xl border border-base-300">
			<div class="card-body gap-6">

				<h1 class="text-2xl font-bold text-center">Add Customer</h1>

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
						<label class="label" for="ghl_id">
							<span class="label-text font-medium">GHL ID</span>
						</label>
						<input
							type="text"
							id="ghl_id"
							class="input input-bordered w-full"
							placeholder="GHL12345"
							bind:value={ghl_id}
							name="ghl_id"
							required
						/>
					</div>

					<!-- Name -->
					<div class="form-control">
						<label class="label" for="name">
							<span class="label-text font-medium">Name</span>
						</label>
						<input
							type="text"
							id="name"
							class="input input-bordered w-full"
							placeholder="John Doe"
							bind:value={name}
							name="name"
							required
						/>
					</div>

					<!-- Email -->
					<div class="form-control">
						<label class="label" for="email">
							<span class="label-text font-medium">Email</span>
						</label>
						<input
							type="email"
							id="email"
							class="input input-bordered w-full"
							placeholder="john@gmail.com"
							bind:value={email}
							name="email"
							required
						/>
					</div>

					<!-- Phone -->
					<div class="form-control">
						<label class="label" for="phone_no">
							<span class="label-text font-medium">Phone Number</span>
						</label>
						<input
							type="text"
							id="phone_no"
							class="input input-bordered w-full"
							placeholder="+1 234 567 890"
							bind:value={phone_no}
							name="phone_no"
							required
						/>
					</div>

					<!-- Address -->
					<div class="form-control">
						<label class="label" for="address">
							<span class="label-text font-medium">Address</span>
						</label>
						<input
							type="text"
							id="address"
							class="input input-bordered w-full"
							placeholder="123 Main St, New York"
							bind:value={address}
							name="address"
							required
						/>
					</div>

					<!-- Submit -->
					<button
						type="submit"
						class="btn btn-primary w-full"
						disabled={loading}
					>
						{loading ? 'Adding Customer…' : 'Add Customer'}
					</button>
				</form>

			</div>
		</div>
	</div>
</div>
