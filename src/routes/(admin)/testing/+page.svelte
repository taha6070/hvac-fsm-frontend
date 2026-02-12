<script>
    /** @type {import('./$types').ActionData} */
    export let form;
</script>

<div class="container">
    <h1>Admin Panel</h1>

    <form method="POST">
        <button type="submit">Call Admin API</button>
    </form>

    {#if form}
        <div class="response" class:error={!form.success}>
            <p><strong>Server says:</strong> {form.message}</p>
            {#if form.status}
                <span>Status Code: {form.status}</span>
            {/if}
        </div>
    {/if}
</div>

<style>
    .response {
        margin-top: 20px;
        padding: 1rem;
        border: 1px solid #ccc;
        background: #f4f4f4;
    }
    .error {
        border-color: red;
        color: red;
    }
</style>