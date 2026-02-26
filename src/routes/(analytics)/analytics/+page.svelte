<script>
  import { 
    Activity, 
    CheckCircle, 
    AlertCircle, 
    Clock, 
    BarChart3, 
    LayoutDashboard, 
    Settings,
    Database,
    ArrowUpRight
  } from "@lucide/svelte"

  // Summary Data
  const stats = [
    { label: 'Total Requests', value: '70', icon: Database, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Success Rate', value: '86%', icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Avg Latency', value: '46ms', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Error Count', value: '10', icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  // Table Data
  const recentLogs = [
    { id: 1, path: '/api/v1/projects/1', method: 'GET', status: 200, time: '0.0380s', timestamp: '19:41:35' },
    { id: 2, path: '/api/v1/employees', method: 'POST', status: 400, time: '0.0182s', timestamp: '19:50:27' },
    { id: 3, path: '/api/v1/job-type', method: 'GET', status: 200, time: '0.0075s', timestamp: '19:47:08' },
    { id: 4, path: '/api/v1/login', method: 'POST', status: 401, time: '0.1613s', timestamp: '18:50:29' },
  ];

  let activeTab = 'Dashboard';
</script>

<div class="flex min-h-screen bg-slate-50 text-slate-900">
  <aside class="w-64 bg-white border-r border-slate-200 p-6 flex flex-col gap-8">
    <div class="flex items-center gap-2 px-2">
      <div class="bg-indigo-600 p-1.5 rounded-lg">
        <svelte:component this={Activity} class="text-white w-5 h-5" />
      </div>
      <span class="font-bold text-xl tracking-tight">LogPulse</span>
    </div>
    
    <nav class="flex flex-col gap-2">
      {#each [
        { name: 'Dashboard', icon: LayoutDashboard },
        { name: 'Analytics', icon: BarChart3 },
        { name: 'Logs', icon: Database },
        { name: 'Settings', icon: Settings }
      ] as item}
        <button 
          on:click={() => activeTab = item.name}
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
          {activeTab === item.name ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}"
        >
          <svelte:component this={item.icon} size="20" />
          {item.name}
        </button>
      {/each}
    </nav>
  </aside>

  <main class="flex-1 p-8 overflow-y-auto">
    <header class="mb-8 flex justify-between items-end">
      <div>
        <h1 class="text-2xl font-bold">System Overview</h1>
        <p class="text-slate-500">Real-time API performance metrics</p>
      </div>
      <div class="text-sm font-medium text-slate-400">Feb 12, 2026</div>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {#each stats as stat}
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div class="{stat.bg} p-3 rounded-xl">
            <svelte:component this={stat.icon} class="{stat.color} w-6 h-6" />
          </div>
          <div>
            <p class="text-sm text-slate-500 font-medium">{stat.label}</p>
            <p class="text-2xl font-bold">{stat.value}</p>
          </div>
        </div>
      {/each}
    </div>

    <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div class="p-6 border-b border-slate-100 flex justify-between items-center">
        <h3 class="font-bold text-lg text-slate-800">Recent Requests</h3>
        <button class="flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700">
          Export CSV <ArrowUpRight size="14" />
        </button>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead class="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
            <tr>
              <th class="px-6 py-4 font-semibold">Timestamp</th>
              <th class="px-6 py-4 font-semibold">Endpoint</th>
              <th class="px-6 py-4 font-semibold">Method</th>
              <th class="px-6 py-4 font-semibold">Status</th>
              <th class="px-6 py-4 font-semibold text-right">Latency</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            {#each recentLogs as log}
              <tr class="hover:bg-slate-50/80 transition-colors group">
                <td class="px-6 py-4 text-sm text-slate-400">{log.timestamp}</td>
                <td class="px-6 py-4 text-sm font-medium text-slate-700">{log.path}</td>
                <td class="px-6 py-4 text-sm">
                  <span class="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold text-slate-500">
                    {log.method}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm">
                  <span class="px-2.5 py-1 rounded-full text-xs font-semibold {
                    log.status < 300 ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'
                  }">
                    {log.status}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm text-slate-600 font-mono text-right">{log.time}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </main>
</div>

<style>
  /* Optional: Add custom fonts or transitions here */
</style>