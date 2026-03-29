<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { enhance } from "$app/forms";
  import { page } from "$app/state";
  import { PUBLIC_API_URL } from "$env/static/public";
  // Props
  let { data, form } = $props();

  // Constants & State
  const API_BASE = PUBLIC_API_URL;
  const PRJ_ID = page.params.prjslug;

  let installations = $state([]);
  let loading = $state(false);
  let error = $state(null);
  let search = $state("");
  let selectedProducts = $state([]);

  // Derived state for results (Svelte 5 way)
  let results = $derived(data.searchResults ?? []);

  async function fetchInstallations() {
    if (!PRJ_ID) return;
    try {
      loading = true;
      error = null;
      const res = await fetch(
        `${API_BASE}/installations/?page=1&limit=100&prj_id=${PRJ_ID}`,
        { headers: { Accept: "application/json" } },
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const responseData = await res.json();
      installations = responseData;
    } catch (err) {
      console.error(err);
      error = err.message || "Failed to load installations";
    } finally {
      loading = false;
    }
  }

  async function deleteInstallation(id: Number) {
    if (!confirm(`Really delete installation #${id}?`)) return;
    try {
      const res = await fetch(`${API_BASE}/installations/${id}`, {
        method: "DELETE",
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(`Delete failed: ${res.status}`);
      // Optimistic Update
      installations = installations.filter((item) => item.id !== id);
    } catch (err) {
      alert(`Could not delete: ${err.message}`);
    }
  }

  async function searchProducts() {
    if (search.length < 2) {
      const url = new URL(window.location.href);
      url.searchParams.delete("search");
      goto(url.toString(), {
        replaceState: true,
        noScroll: true,
        keepFocus: true,
      });
      return;
    }
    const url = new URL(window.location.href);
    url.searchParams.set("search", search);
    goto(url.toString(), {
      replaceState: true,
      noScroll: true,
      keepFocus: true,
    });
  }

  function addProduct(product: any) {
    if (selectedProducts.find((p) => p.id === product.id)) return;
    selectedProducts = [...selectedProducts, product];
    search = "";
    const url = new URL(window.location.href);
    url.searchParams.delete("search");
    goto(url.toString(), { replaceState: true, noScroll: true });
  }

  function removeProduct(id: number) {
    selectedProducts = selectedProducts.filter((p) => p.id !== id);
  }

  onMount(() => {
    fetchInstallations();
  });
</script>

<div class="space-y-6">
  <div
    class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 space-y-4"
  >
    <h2 class="text-lg font-semibold text-gray-800">
      Add Installation Products
    </h2>

    <div class="relative">
      <input
        type="text"
        bind:value={search}
        oninput={searchProducts}
        placeholder="Type product name (e.g. AC, line set)..."
        class="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
      />

      {#if results.length && search.length >= 2}
        <div
          class="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          {#each results as product}
            <button
              type="button"
              class="w-full flex justify-between items-center px-4 py-3 hover:bg-blue-50 border-b last:border-0 transition-colors"
              onclick={() => addProduct(product)}
            >
              <div class="text-left">
                <p class="font-medium text-gray-900">{product.name}</p>
                <p class="text-xs text-gray-500 capitalize">
                  Product ID: {product.id}
                </p>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-green-600 font-bold">${product.amount}</span>
                <span class="bg-blue-100 text-blue-600 rounded-full p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </span>
              </div>
            </button>
          {/each}
        </div>
      {/if}
    </div>

    {#if selectedProducts.length}
      <div class="mt-8">
        <h3
          class="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2"
        >
          Selected for Installation
        </h3>

        <form
          method="POST"
          action="?/saveProducts"
          use:enhance={() => {
            return async ({ result }) => {
              if (result.type === "success") {
                selectedProducts = [];
                fetchInstallations(); // Refresh the list below
              }
            };
          }}
        >
          <input type="hidden" name="projectId" value={PRJ_ID} />
          <input
            type="hidden"
            name="products"
            value={JSON.stringify(
              selectedProducts.map((p) => ({ prd_id: p.id })),
            )}
          />

          <div class="border border-gray-200 rounded-lg overflow-hidden">
            <table class="w-full text-sm">
              <thead class="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th class="text-left p-3 font-semibold text-gray-600"
                    >Product</th
                  >
                  <th class="text-left p-3 font-semibold text-gray-600"
                    >Amount</th
                  >
                  <th class="text-right p-3 font-semibold text-gray-600"
                    >Action</th
                  >
                </tr>
              </thead>
              <tbody>
                {#each selectedProducts as product}
                  <tr
                    class="border-b last:border-0 hover:bg-gray-50 transition-colors"
                  >
                    <td class="p-3 font-medium text-gray-800">{product.name}</td
                    >
                    <td class="p-3 text-gray-600">${product.amount}</td>
                    <td class="p-3 text-right">
                      <button
                        type="button"
                        class="text-red-500 hover:text-red-700 font-medium"
                        onclick={() => removeProduct(product.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                {/each}
              </tbody>
              <tfoot class="bg-gray-50 font-bold">
                <tr>
                  <td class="p-3" colspan="2"></td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div class="flex items-center justify-between mt-4">
            {#if form?.message}
              <p
                class="text-sm {form.success
                  ? 'text-green-600'
                  : 'text-red-600'}"
              >
                {form.message}
              </p>
            {/if}
            <button
              type="submit"
              class="ml-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold shadow-md transition-all active:scale-95"
            >
              Save Installation Products
            </button>
          </div>
        </form>
      </div>
    {/if}
  </div>

  <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
    <h2 class="text-lg font-semibold text-gray-800 mb-4">
      Current Installations (Project: {PRJ_ID})
    </h2>

    {#if loading}
      <div class="flex items-center gap-2 text-gray-500 italic">
        <span class="animate-pulse">Loading...</span>
      </div>
    {:else if error}
      <div class="p-3 bg-red-50 text-red-700 rounded-lg border border-red-100">
        {error}
      </div>
    {:else if installations.length === 0}
      <p class="text-gray-500 py-4">No installations found for this Project.</p>
    {:else}
      <div class="border border-gray-200 rounded-lg overflow-hidden">
        <table class="w-full text-sm text-left">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="p-3 font-semibold text-gray-600">Product</th>
              <th class="p-3 font-semibold text-gray-600">Amount</th>
              <th class="p-3 font-semibold text-gray-600 text-right">Actions</th
              >
            </tr>
          </thead>
          <tbody>
            {#each installations as item (item.id)}
              <tr
                class="border-b last:border-0 hover:bg-gray-50 transition-colors"
              >
                <td class="p-3">
                  <span class="font-medium text-gray-800">{item.prd_name}</span>
                  <div
                    class="text-[10px] text-gray-400 uppercase tracking-tighter"
                  >
                    ID: {item.prd_id}
                  </div>
                </td>
                <td class="p-3 text-gray-600 font-mono">${item.prd_amount}</td>
                <td class="p-3 text-right">
                  <button
                    class="bg-red-50 text-red-600 px-3 py-1 rounded-md hover:bg-red-100 transition-colors text-xs font-bold"
                    onclick={() => deleteInstallation(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
  </div>
</div>
