<script lang="ts">
  import { writable } from 'svelte/store';

  let ghl_id = '';
  let name = '';
  let email = '';
  let phone_no = '';
  let address = '';
  let detail: Record<string, any> = {};
  let tags: string[] = [];
  let newTag = '';

  let loading = false;
  let success = false;

  // Add a tag
  function addTag() {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      tags = [...tags, newTag.trim()];
      newTag = '';
    }
  }

  // Remove a tag
  function removeTag(index: number) {
    tags = tags.filter((_, i) => i !== index);
  }

  function handleSubmit() {
    loading = true;

    const payload = {
      ghl_id,
      name,
      email,
      phone_no,
      address,
      detail,
      tags
    };

    console.log('Submitting Customer:', payload);

    setTimeout(() => {
      loading = false;
      success = true;
    }, 1200);
  }
</script>

<div class="min-h-screen flex items-center justify-center bg-base-200 px-4 py-8">
  <div class="w-full max-w-lg">
    <div class="card bg-base-100 shadow-xl border border-base-300">
      <div class="card-body gap-6">

        <h1 class="text-2xl font-bold text-center">Add Customer</h1>

        {#if success}
          <div class="alert alert-success">
            Customer added successfully!
          </div>
          <button class="btn btn-primary w-full mt-4" on:click={() => (success = false)}>
            Add Another Customer
          </button>
        {:else}

          <form class="space-y-4" on:submit|preventDefault={handleSubmit}>

            <!-- GHL ID -->
            <div class="form-control">
              <label class="label"><span class="label-text font-medium">GHL ID</span></label>
              <input
                type="text"
                class="input input-bordered w-full"
                placeholder="GHL12345"
                bind:value={ghl_id}
                required
              />
            </div>

            <!-- Name -->
            <div class="form-control">
              <label class="label"><span class="label-text font-medium">Name</span></label>
              <input
                type="text"
                class="input input-bordered w-full"
                placeholder="John Doe"
                bind:value={name}
                required
              />
            </div>

            <!-- Email -->
            <div class="form-control">
              <label class="label"><span class="label-text font-medium">Email</span></label>
              <input
                type="email"
                class="input input-bordered w-full"
                placeholder="john@gmail.com"
                bind:value={email}
                required
              />
            </div>

            <!-- Phone Number -->
            <div class="form-control">
              <label class="label"><span class="label-text font-medium">Phone Number</span></label>
              <input
                type="text"
                class="input input-bordered w-full"
                placeholder="+1 234 567 890"
                bind:value={phone_no}
                required
              />
            </div>

            <!-- Address -->
            <div class="form-control">
              <label class="label"><span class="label-text font-medium">Address</span></label>
              <input
                type="text"
                class="input input-bordered w-full"
                placeholder="123 Main St, New York"
                bind:value={address}
                required
              />
            </div>

            <!-- Detail (JSON) -->
            <!-- <div class="form-control">
              <label class="label"><span class="label-text font-medium">Detail (JSON)</span></label>
              <textarea
                class="textarea textarea-bordered w-full"
                placeholder='{"key":"value"}'
                bind:value={JSON.stringify(detail, null, 2)}
                on:input={(e) => {
                  try {
                    detail = JSON.parse(e.target.value);
                  } catch {
                    // ignore invalid JSON
                  }
                }}
                rows="4"
              ></textarea>
            </div> -->

            <!-- Tags -->
            <div class="form-control">
              <label class="label"><span class="label-text font-medium">Tags</span></label>
              <div class="flex gap-2 flex-wrap mb-2">
                {#each tags as tag, index}
                  <div class="badge badge-accent gap-2">
                    {tag}
                    <button type="button" class="ml-1 text-xs text-white" on:click={() => removeTag(index)}>×</button>
                  </div>
                {/each}
              </div>
              <div class="flex gap-2">
                <input
                  type="text"
                  class="input input-bordered flex-1"
                  placeholder="Add tag"
                  bind:value={newTag}
                  on:keydown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <button type="button" class="btn btn-primary" on:click={addTag}>Add</button>
              </div>
            </div>

            <!-- Submit -->
            <button type="submit" class="btn btn-primary w-full" disabled={loading}>
              {loading ? 'Adding Customer…' : 'Add Customer'}
            </button>

          </form>

        {/if}

      </div>
    </div>
  </div>
</div>
