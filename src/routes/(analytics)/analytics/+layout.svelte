<script lang="ts">
    import "../../../layout.css";

    import { Toaster } from "svelte-sonner";
    let sidebarOpen = false;
    let { children } = $props();
</script>

<Toaster />

<div class="flex flex-col min-h-screen bg-base-200">

    <div class="flex flex-1 overflow-hidden">


        <main class="flex-1 overflow-y-auto p-6">
            {@render children()}
        </main>

    </div>
</div>