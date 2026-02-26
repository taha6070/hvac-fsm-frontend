<script>
import Product from "$lib/components/Products/product.svelte";
import { page } from "$app/state";

  $: projectId = page.params.jbid;

  function handleSubmit(payload) {
    console.log('Payload:', payload);
  }
</script>

<Product
  {projectId}
  onSubmit={handleSubmit}
/>