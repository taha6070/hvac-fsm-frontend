<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state'; // Using Svelte 5 style or use $page for Svelte 4
  import { enhance } from '$app/forms';

  export let data;
  export let form;

  let search = '';
  let selectedProducts: any[] = [];

  // Results come from the load function in +page.server.ts
  $: results = data.searchResults ?? [];

  async function searchProducts() {
    if (search.length < 2) {
      // Clear search results from URL if input is short
      const url = new URL(window.location.href);
      url.searchParams.delete('search');
      goto(url.toString(), { replaceState: true, noScroll: true, keepFocus: true });
      return;
    }

    const url = new URL(window.location.href);
    url.searchParams.set('search', search);
    
    // This triggers the server 'load' function without a full page reload
    goto(url.toString(), { 
      replaceState: true, 
      noScroll: true, 
      keepFocus: true 
    });
  }

  function addProduct(product: any) {
    if (selectedProducts.find((p) => p.id === product.id)) return;
    selectedProducts = [...selectedProducts, product];
    // Clear search after adding to clean up UI
    search = '';
    const url = new URL(window.location.href);
    url.searchParams.delete('search');
    goto(url.toString(), { replaceState: true, noScroll: true });
  }

  function removeProduct(id: number) {
    selectedProducts = selectedProducts.filter((p) => p.id !== id);
  }
</script>

<div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 space-y-4">
  <h2 class="text-lg font-semibold text-gray-800">Add Installation Products</h2>

  <div class="relative">
    <input
      type="text"
      bind:value={search}
      on:input={searchProducts}
      placeholder="Type product name (e.g. AC, line set)..."
      class="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
    />
    
    {#if results.length && search.length >= 2}
      <div class="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
        {#each results as product}
          <button
            type="button"
            class="w-full flex justify-between items-center px-4 py-3 hover:bg-blue-50 border-b last:border-0 transition-colors"
            on:click={() => addProduct(product)}
          >
            <div class="text-left">
              <p class="font-medium text-gray-900">{product.name}</p>
              <p class="text-xs text-gray-500 capitalize">Product ID: {product.id}</p>
            </div>
            <div class="flex items-center gap-2">
                <span class="text-green-600 font-bold">${product.amount}</span>
                <span class="bg-blue-100 text-blue-600 rounded-full p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                </span>
            </div>
          </button>
        {/each}
      </div>
    {/if}
  </div>

  {#if selectedProducts.length}
    <div class="mt-8 animate-in fade-in slide-in-from-top-2">
      <h3 class="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Selected for Installation</h3>
      
      <form method="POST" action="?/saveProducts" use:enhance={() => {
        return async ({ result }) => {
          if (result.type === 'success') {
            selectedProducts = []; // Clear list after successful save
          }
        };
      }}>
        <input type="hidden" name="projectId" value={data.details.job.id} />
        <input
          type="hidden"
          name="products"
          value={JSON.stringify(selectedProducts.map((p) => ({ prd_id: p.id })))}
        />

        <div class="border border-gray-200 rounded-lg overflow-hidden">
          <table class="w-full text-sm">
            <thead class="bg-gray-50 border-b border-gray-200">
              <tr>
                <th class="text-left p-3 font-semibold text-gray-600">Product</th>
                <th class="text-left p-3 font-semibold text-gray-600">Amount</th>
                <th class="text-right p-3 font-semibold text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {#each selectedProducts as product}
                <tr class="border-b last:border-0 hover:bg-gray-50 transition-colors">
                  <td class="p-3 font-medium text-gray-800">{product.name}</td>
                  <td class="p-3 text-gray-600">${product.amount}</td>
                  <td class="p-3 text-right">
                    <button
                      type="button"
                      class="text-red-500 hover:text-red-700 font-medium"
                      on:click={() => removeProduct(product.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              {/each}
            </tbody>
            <tfoot class="bg-gray-50 font-bold">
                <tr>
                    <td class="p-3">Total</td>
                    <td class="p-3 text-green-700" colspan="2">
                        ${selectedProducts.reduce((sum, p) => sum + p.amount, 0)}
                    </td>
                </tr>
            </tfoot>
          </table>
        </div>

        <div class="flex items-center justify-between mt-4">
            {#if form?.message}
                <p class="text-sm {form.success ? 'text-green-600' : 'text-red-600'}">
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