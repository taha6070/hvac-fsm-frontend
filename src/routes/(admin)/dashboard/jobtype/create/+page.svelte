<script lang="ts">
	import { Image, Eye, EyeOff, ChevronRight } from '@lucide/svelte';
	import { createEnhanceHook } from '$lib/hooks/createEnhnaceHook';
	import { enhance } from '$app/forms';
	import { PUBLIC_APP_NAME } from '$env/static/public';

	let title = $state('');
	let description = $state('');

	let loading = $state(false);
	const setLoading = (value: boolean) => (loading = value);
</script>

<div class="min-h-screen flex items-center justify-center bg-base-200 px-4 py-8">
	<div class="w-full max-w-lg">
		<div class="card bg-base-100 shadow-xl border border-base-300">
			<div class="card-body gap-6">

				<h1 class="text-2xl font-bold text-center">Add New Job Type</h1>

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
						<label class="label" for="title">
							<span class="label-text font-medium">Title</span>
						</label>
						<input
							id="title"
							type="text"
							class="input input-bordered w-full"
							placeholder="80 to 80 systems"
							bind:value={title}
							name="title"
							required
						/>
					</div>

					<!-- Name -->
					<div class="form-control">
						<label class="label" for="description">
							<span class="label-text font-medium">description</span>
						</label>
						<input
							id="description"
							type="text"
							class="input input-bordered w-full"
							placeholder="Ac Installtions for the system"
							bind:value={description}
							name="description"
							required
						/>
					</div>



					<!-- Submit -->
					<button
						type="submit"
						class="btn btn-primary w-full"
						disabled={loading}
					>
						{loading ? 'Adding JobType..' : 'Add JobType'}
					</button>
				</form>

			</div>
		</div>
	</div>
</div>
