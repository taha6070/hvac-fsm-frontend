<script lang="ts">
  import { goto } from '$app/navigation';

  export let total: number;
  export let page: number;
  export let limit: number;

  $: totalPages = Math.ceil(total / limit);

  function go(p: number) {
    if (p < 1 || p > totalPages) return;
    goto(`?page=${p}&limit=${limit}`);
  }
</script>

<div class="flex justify-center items-center gap-1 mt-4">
  <button class="btn btn-sm" disabled={page === 1} on:click={() => go(page - 1)}>
    Prev
  </button>

  {#each Array(totalPages).fill(0).map((_, i) => i + 1) as p}
    <button
      class="btn btn-sm {p === page ? 'btn-primary' : 'btn-outline'}"
      on:click={() => go(p)}
    >
      {p}
    </button>
  {/each}

  <button
    class="btn btn-sm"
    disabled={page === totalPages}
    on:click={() => go(page + 1)}
  >
    Next
  </button>
</div>
