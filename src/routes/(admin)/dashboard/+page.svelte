<script>
    export let data;
    console.log(data)
</script>

{#each data.jobs as job}
{#if job.slug }
    
    {job.slug}

{:else }
<h1>no job</h1>
{/if}

{/each}

{data.jobs}