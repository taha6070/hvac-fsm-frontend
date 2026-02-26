<script lang="ts">
	import { Image, Eye, EyeOff, ChevronRight } from '@lucide/svelte';
  import { createEnhanceHook } from '$lib/hooks/createEnhnaceHook';
  import { enhance } from '$app/forms';
  import { PUBLIC_APP_NAME } from '$env/static/public';

    let email = $state('');
    let name= $state('');
	let password = $state('');
	let confirmPassword = $state('');
	let showPassword = $state(false);
	let showConfirmPassword = $state(false);
	let passwordsMatch = $derived(password === confirmPassword);
    let phone=$state('')
    let role=$state('');
	let loading = $state(false);
	let disableSubmit = $derived(!email || !password || !confirmPassword);
	const setLoading = (value: boolean) => (loading = value);
</script>

<div
	class="flex h-full w-full max-w-5xl flex-col items-center justify-center py-8 md:py-12"
>
	<div class="flex w-full flex-col gap-6">
		<div class="card w-full overflow-hidden rounded-lg bg-base-200 p-0 shadow-xl">
			<div class="grid p-0 md:grid-cols-2">
        <form method="POST" use:enhance={createEnhanceHook({
						successToast: true, // Display a success toast on successful form submission
						failureToast: true, // Display an error toast on unsuccessful form submission
						successRedirect: "", // Specify form redirect here - eg. "/some-page"
						setLoading // Manages loading indicator
					})} >
          <div class="flex flex-col gap-4 p-10">
            <div class="flex flex-col items-center text-center">
              <h1 class="text-2xl font-bold">Create A New Employee</h1>
              <p class="text-balance text-base-content/70">
                Create a new <span class="font-semibold">{PUBLIC_APP_NAME} Employee</span>  account
              </p>
            </div>
            <div class="grid gap-3">
              <label class="label" for="email">
							  <span class="label-text">Full Name</span>
						  </label>
              <input bind:value={name} class="input input-primary w-full" placeholder="John Doe" id="name" type="text" name="name" required />
            </div>
                        
            <div class="grid gap-3">
              <label class="label" for="email">
							  <span class="label-text">Email</span>
						  </label>
              <input bind:value={email} class="input input-primary w-full" placeholder="me@example.com" id="email" type="email" name="email" required />
            </div>
            
            <!-- Phone -->
                        
            <div class="grid gap-3">
              <label class="label" for="phone">
							  <span class="label-text">Phone</span>
						  </label>
              <input bind:value={phone} class="input input-primary w-full" placeholder="1(234) 222 9012" id="phone" type="text" name="phone" required />
            </div>
                        
            <!-- Role -->

<div class="grid gap-3">
  <label class="label" for="role">
    <span class="label-text">Role</span>
  </label>
  


  <select 
    bind:value={role}
    id="role"
    name="role"
  class="select select-primary"
  required>

    <option value="" disabled selected hidden>Choose Role</option>
    <option value="technician">Technician</option>
    <option value="admin">Admin</option>
    <option value="helper">Fixed Technician</option>

</select>






</div>


            <div class="grid gap-3">
              <label class="label" for="password">
							  <span class="label-text">Password</span>
						  </label>
              <label class="input input-primary w-full">
                <input
                  placeholder="Password"
                  bind:value={password}
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                />
                {#if showPassword}
                  <Eye
                    class="size-5 cursor-pointer"
                    tabindex={-1}
                    type="button"
                    onclick={() => (showPassword = !showPassword)}
                  />
                {:else}
                  <EyeOff
                    class="size-5 cursor-pointer"
                    tabindex={-1}
                    type="button"
                    onclick={() => (showPassword = !showPassword)}
                  />
                {/if}
              </label>
            </div>
            <div class="grid gap-3">
              <label class="label" for="confirmPassword">
							  <span class="label-text">Confirm Password</span>
						  </label>
              <label class="input input-primary w-full">
                <input
                  placeholder="Confirm Password"
                  bind:value={confirmPassword}
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  required
                />
                {#if showConfirmPassword}
                  <Eye
                    class="size-5 cursor-pointer"
                    tabindex={-1}
                    type="button"
                    onclick={() => (showConfirmPassword = !showConfirmPassword)}
                  />
                {:else}
                  <EyeOff
                    class="size-5 cursor-pointer"
                    tabindex={-1}
                    type="button"
                    onclick={() => (showConfirmPassword = !showConfirmPassword)}
                  />
                {/if}
              </label>
            </div>
            <button
              type="submit"
              class="btn w-full btn-primary"
              disabled={loading || !passwordsMatch || disableSubmit}
            >
              {#if loading}
                <span class="loading loading-md loading-spinner"></span>
              {:else}
                Create An Account
                <ChevronRight class="h-4 w-4" />
              {/if}
            </button>
        
            </div>
            </form>
            </div>
    </div></div>
</div>
