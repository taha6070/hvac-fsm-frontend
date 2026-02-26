<script>
  export let projectId;
  export let onSubmit;

  const API_BASE = 'http://127.0.0.1:8000';
  const AUTH_COOKIE_NAMES = ['access_token', 'auth_token', 'token', 'jwt'];

  function getCookie(name) {
    return document.cookie
      .split('; ')
      .find(row => row.startsWith(`${name}=`))
      ?.split('=')[1];
  }

  function getAuthHeaders() {
    const token = AUTH_COOKIE_NAMES.map(getCookie).find(Boolean);
    return token ? { Authorization: `Bearer ${decodeURIComponent(token)}` } : {};
  }

  let search = '';
  let loading = false;
  let results = [];
  let selectedProducts = [];

  async function searchProducts() {
    if (search.length < 2) return;

    loading = true;

    const res = await fetch(`${API_BASE}/api/v1/products?name=${encodeURIComponent(search)}`, {
      credentials: 'include',
      headers: getAuthHeaders()
    });

    results = await res.json();
    loading = false;
  }

  function addProduct(product) {
    if (selectedProducts.find(p => p.id === product.id)) return;

    selectedProducts = [...selectedProducts, product];
  }

  function removeProduct(id) {
    selectedProducts = selectedProducts.filter(p => p.id !== id);
  }

  async function submitProducts() {
    const payload = {
      prj_id: projectId,
      products: selectedProducts.map(p => ({ prd_id: p.id }))
    };

    if (onSubmit) onSubmit(payload);

    await fetch(`${API_BASE}/api/v1/installations/`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify(payload)
    });

    alert('Products added successfully');
    selectedProducts = [];
  }
</script>

<div class="bg-white rounded-xl shadow p-5 space-y-4">

  <h2 class="text-lg font-semibold">Add Products</h2>

  <!-- Search -->
  <input
    type="text"
    bind:value={search}
    on:input={searchProducts}
    placeholder="Search product..."
    class="w-full border px-3 py-2 rounded-lg focus:ring focus:ring-blue-300"
  />

  {#if loading}
    <p class="text-sm text-gray-500">Searching...</p>
  {/if}

  <!-- Search Results -->
  {#if results.length}
    <div class="border rounded-lg overflow-hidden">
      {#each results as product}
        <div
          class="flex justify-between items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
          on:click={() => addProduct(product)}
        >
          <div>
            <p class="font-medium">{product.name}</p>
            <p class="text-xs text-gray-500">${product.amount}</p>
          </div>
          <span class="text-blue-600 font-semibold">+</span>
        </div>
      {/each}
    </div>
  {/if}

  <!-- Selected Products Table -->
  {#if selectedProducts.length}
    <table class="w-full border rounded-lg overflow-hidden">
      <thead class="bg-gray-100">
        <tr>
          <th class="text-left p-2">Product</th>
          <th class="text-left p-2">Amount</th>
          <th class="text-right p-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {#each selectedProducts as product}
          <tr class="border-t">
            <td class="p-2">{product.name}</td>
            <td class="p-2">${product.amount}</td>
            <td class="p-2 text-right">
              <button
                class="text-red-500 hover:underline"
                on:click={() => removeProduct(product.id)}
              >
                Remove
              </button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>

    <!-- Submit -->
    <button
      on:click={submitProducts}
      class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
    >
      Save Products
    </button>
  {/if}

</div>
