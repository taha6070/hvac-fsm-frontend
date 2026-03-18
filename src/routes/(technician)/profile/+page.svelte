<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import { Lock, ShieldCheck, Eye, EyeOff, AlertCircle } from '@lucide/svelte';

	export let form: ActionData;

	let loading = false;
	let showPassword = false;
</script>

<div class="max-w-2xl mx-auto p-4 md:p-10">
	<div class="mb-8">
		<h1 class="text-3xl font-bold flex items-center gap-3">
			<ShieldCheck class="text-primary" size={32} />
			Security Settings
		</h1>
		<p class="text-base-content/60 mt-2">
			Update your password to keep your account secure.
		</p>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
		<div class="text-sm text-base-content/70">
			<h3 class="font-bold text-base-content mb-2">Password Requirements</h3>
			<ul class="list-disc list-inside space-y-1">
				<li>At least 8 characters</li>
				<li>Mix of letters and numbers</li>
				<li>Must match confirmation</li>
			</ul>
		</div>

		<div class="md:col-span-2">
			<div class="bg-base-100 rounded-2xl border border-base-300 overflow-hidden">
				<div class="p-6">
					{#if form?.error}
						<div class="alert alert-error mb-6 py-3 rounded-xl shadow-sm">
							<AlertCircle size={18} />
							<span class="text-sm font-medium">{form.error}</span>
						</div>
					{/if}

					{#if form?.success}
						<div class="alert alert-success mb-6 py-3 rounded-xl shadow-sm">
							<ShieldCheck size={18} />
							<span class="text-sm font-medium">{form.message}</span>
						</div>
					{/if}

					<form
						method="POST"
						action="?/resetPassword"
						class="space-y-5"
						use:enhance={() => {
							loading = true;
							return async ({ update }) => {
								await update();
								loading = false;
							};
						}}
					>
						<div class="form-control w-full">
							<label class="label py-1" for="current_password">
								<span class="label-text font-semibold">Current Password</span>
							</label>
							<input
								type={showPassword ? 'text' : 'password'}
								id="current_password"
								name="current_password"
								placeholder="••••••••"
								class="input input-bordered w-full bg-base-200/50 focus:bg-base-100 transition-all"
								required
							/>
						</div>

						<hr class="border-base-300 my-2" />

						<div class="form-control w-full">
							<label class="label py-1" for="new_password">
								<span class="label-text font-semibold">New Password</span>
							</label>
							<input
								type={showPassword ? 'text' : 'password'}
								id="new_password"
								name="new_password"
								placeholder="••••••••"
								class="input input-bordered w-full"
								required
							/>
						</div>

						<div class="form-control w-full">
							<label class="label py-1" for="confirm_password">
								<span class="label-text font-semibold">Confirm New Password</span>
							</label>
							<input
								type={showPassword ? 'text' : 'password'}
								id="confirm_password"
								name="confirm_password"
								placeholder="••••••••"
								class="input input-bordered w-full"
								required
							/>
						</div>

						<div class="form-control w-fit">
							<label class="label cursor-pointer gap-3">
								<input type="checkbox" class="checkbox checkbox-sm checkbox-primary" bind:checked={showPassword} />
								<span class="label-text text-xs font-medium">Show passwords</span>
							</label>
						</div>

						<div class="pt-4">
							<button type="submit" class="btn btn-primary w-full md:w-fit md:px-10" disabled={loading}>
								{#if loading}
									<span class="loading loading-spinner loading-sm"></span>
								{/if}
								Update Password
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>