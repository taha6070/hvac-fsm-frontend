<script lang="ts">
    import "../../layout.css";
    import TechNavbar from "$lib/components/UI/Navbar/TechNavbar.svelte";
    import Sidebar from '$lib/components/UI/Sidebar/Sidebar.svelte';
    import TechMNavbar from "$lib/components/UI/Navbar/TechMNavbar.svelte";
    import { Toaster } from "svelte-sonner";
    
    let sidebarOpen = false;
    let { children } = $props();
</script>

<Toaster />

<div class="flex flex-col min-h-screen bg-base-200">
    
    <header class="h-16 z-50 hidden lg:block">
        <TechNavbar onToggle={() => (sidebarOpen = !sidebarOpen)} />
    </header>

    <header class="h-16 z-50 lg:hidden bg-base-100 border-b border-base-300 flex items-center px-4 justify-between">
        <span class="font-bold text-xl uppercase tracking-tight">HVAC<span class="text-primary">FSM</span></span>
        </header>

    <div class="flex flex-1 overflow-hidden relative">

        <aside
            class="hidden lg:block w-64 bg-base-100 border-r border-base-300"
        >
            <Sidebar />
        </aside>

        <main class="flex-1 overflow-y-auto p-4 md:p-6 pb-24 lg:pb-6">
            {@render children()}
        </main>

    </div>

    <div class="lg:hidden">
        <TechMNavbar />
    </div>
</div>