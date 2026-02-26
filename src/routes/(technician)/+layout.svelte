<script lang="ts">
    import "../../layout.css";
    import TechNavbar from "$lib/components/UI/Navbar/TechNavbar.svelte";
    import Sidebar from '$lib/components/UI/Sidebar/Sidebar.svelte';
    import { Toaster } from "svelte-sonner";
    let sidebarOpen = false;
    let { children } = $props();
</script>

<Toaster />

<div class="flex flex-col min-h-screen bg-base-200">

    <header class="h-16 z-50">
        <TechNavbar onToggle={() => (sidebarOpen = !sidebarOpen)} />
    </header>

    <div class="flex flex-1 overflow-hidden">

        <aside
            class="fixed lg:static inset-y-0 left-0 z-40 
            w-64 bg-base-100 border-r border-base-300
            transform transition-transform duration-300
            {sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            lg:translate-x-0"
        >
            <Sidebar />
        </aside>

        <main class="flex-1 overflow-y-auto p-6">
            {@render children()}
        </main>

    </div>
</div>