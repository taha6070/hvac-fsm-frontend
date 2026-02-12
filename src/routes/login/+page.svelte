<script lang="ts">
	let email = '';
	let password = '';
	let remember = false;
	let showPassword = false;
	let loading = false;

	function handleSubmit() {
		loading = true;

		// simulate API call
		setTimeout(() => {
			loading = false;
			console.log({ email, password, remember });
		}, 1200);
	}
</script>
<div class="min-h-screen flex items-center justify-center bg-base-200 px-4">
	<div class="w-full max-w-md">

		<!-- Card -->
		<div class="card bg-base-100 shadow-xl border border-base-300">
			<div class="card-body gap-6">

				<!-- Header -->
				<div class="text-center space-y-1">
					<h1 class="text-2xl font-bold">Welcome back ☕</h1>
					<p class="text-sm text-base-content/70">
						Sign in to continue to CaramelLatte
					</p>
				</div>

				<!-- Form -->
				<form class="space-y-4" on:submit|preventDefault={handleSubmit}>
					
					<!-- Email -->
					<div class="form-control">
						<label class="label">
							<span class="label-text font-medium">Email</span>
						</label>
						<input
							type="email"
							placeholder="you@example.com"
							class="input input-bordered w-full"
							bind:value={email}
							required
						/>
					</div>

					<!-- Password -->
					<div class="form-control">
						<label class="label">
							<span class="label-text font-medium">Password</span>
						</label>

						<div class="relative">
							<input
								type={showPassword ? 'text' : 'password'}
								placeholder="••••••••"
								class="input input-bordered w-full pr-12"
								bind:value={password}
								required
							/>

							<button
								type="button"
								class="btn btn-ghost btn-sm absolute right-2 top-1/2 -translate-y-1/2"
								on:click={() => (showPassword = !showPassword)}
							>
								{showPassword ? 'Hide' : 'Show'}
							</button>
						</div>
					</div>

					<!-- Options -->
					<div class="flex items-center justify-between text-sm">
						<label class="flex items-center gap-2 cursor-pointer">
							<input
								type="checkbox"
								class="checkbox checkbox-sm"
								bind:checked={remember}
							/>
							<span>Remember me</span>
						</label>

						<a href="/forgot-password" class="link link-hover">
							Forgot password?
						</a>
					</div>

					<!-- Submit -->
					<button
						type="submit"
						class="btn btn-primary w-full"
						disabled={loading}
					>
						{loading ? 'Signing in…' : 'Sign In'}
					</button>
				</form>

				<!-- Footer -->
				<div class="divider">OR</div>

				<button class="btn btn-outline w-full">
					Continue with Google
				</button>

				<p class="text-center text-sm">
					Don’t have an account?
					<a href="/signup" class="link link-primary font-medium">
						Create one
					</a>
				</p>

			</div>
		</div>

	</div>
</div>
