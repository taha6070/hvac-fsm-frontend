<script>
  import { createEventDispatcher } from 'svelte';

  export let jobId; // pass the job id dynamically
  export let baseUrl = "http://127.0.0.1:8000/api/v1/jobs/technican";

  const dispatch = createEventDispatcher();

  let loading = false;
  let toast = "";
  let toastType = "success"; // success | error

  async function markDone() {
    loading = true;
    toast = "";

    try {
      const response = await fetch(`${baseUrl}/${jobId}`, {
        method: "PATCH",
        credentials: "include", // 👈 IMPORTANT

        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          status: "done"
        })
      });

      if (!response.ok) {
        throw new Error("Failed to update job");
      }

      const data = await response.json();

      toastType = "success";
      toast = "Job marked as done successfully ✅";

      // Optional: notify parent component
      dispatch("updated", data);

    } catch (error) {
      toastType = "error";
      toast = "Something went wrong ❌";
      console.error(error);
    } finally {
      loading = false;

      // Auto hide toast after 3 seconds
      setTimeout(() => toast = "", 3000);
    }
  }
</script>

<button on:click={markDone} disabled={loading}>
  {#if loading}
    Updating...
  {:else}
    Mark Done
  {/if}
</button>

{#if toast}
  <div class={`toast ${toastType}`}>
    {toast}
  </div>
{/if}

<style>
  button {
    padding: 8px 16px;
    background-color: #22c55e;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }

  button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .toast {
    margin-top: 10px;
    padding: 10px;
    border-radius: 6px;
    color: white;
    font-size: 14px;
  }

  .toast.success {
    background-color: #16a34a;
  }

  .toast.error {
    background-color: #dc2626;
  }
</style>


