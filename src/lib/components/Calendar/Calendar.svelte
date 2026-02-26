<script>
  export let month = 'February';
  export let year = 2026;

  // days should be array of:
  // { date: 1, events: [{ title, time, type }] }
  export let days = [];

  // today's meetings
  export let todaysMeetings = [];
</script>

<div class="bg-gray-100 min-h-screen">

  <!-- Header -->
  <header class="bg-white shadow p-4 flex items-center justify-between">
    <div>
      <h1 class="text-2xl font-semibold text-gray-800">Calendar Dashboard</h1>
      <p class="text-sm text-gray-500">Meeting & Job Scheduling</p>
    </div>

    <button
      class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      on:click={() => alert('Hook this to modal')}
    >
      + Add Meeting
    </button>
  </header>

  <main class="p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">

    <!-- Calendar -->
    <section class="lg:col-span-3 bg-white rounded-xl shadow p-6">

      <div class="flex items-center justify-between mb-4">
        <div>
          <h2 class="text-xl font-semibold">{month} {year}</h2>
          <p class="text-sm text-gray-500">Monthly View</p>
        </div>

        <div class="flex gap-2">
          <button class="px-3 py-1 bg-gray-200 rounded">←</button>
          <button class="px-3 py-1 bg-gray-200 rounded">→</button>
        </div>
      </div>

      <!-- Weekdays -->
      <div class="grid grid-cols-7 text-center text-gray-500 font-medium mb-2">
        <div>Sun</div><div>Mon</div><div>Tue</div>
        <div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
      </div>

      <!-- Calendar Grid -->
      <div class="grid grid-cols-7 gap-2">

        {#each days as day}
          <div class="bg-gray-50 p-2 rounded-lg min-h-[90px]">
            <span class="text-sm font-medium">{day.date}</span>

            <div class="space-y-1 mt-1">
              {#each day.events as event}
                <div
                  class="text-xs px-2 py-1 rounded truncate"
                  class:bg-blue-100={event.type === 'meeting'}
                  class:text-blue-700={event.type === 'meeting'}
                  class:bg-green-100={event.type === 'install'}
                  class:text-green-700={event.type === 'install'}
                  class:bg-yellow-100={event.type === 'inspection'}
                  class:text-yellow-700={event.type === 'inspection'}
                >
                  {event.time} — {event.title}
                </div>
              {/each}
            </div>
          </div>
        {/each}

      </div>
    </section>

    <!-- Sidebar -->
    <aside class="bg-white rounded-xl shadow p-6">
      <h3 class="font-semibold text-lg mb-4">Today's Meetings</h3>

      <div class="space-y-4">
        {#if todaysMeetings.length === 0}
          <p class="text-sm text-gray-500">No meetings today 🎉</p>
        {:else}
          {#each todaysMeetings as meet}
            <div
              class="p-3 rounded-lg"
              class:bg-blue-50={meet.type === 'meeting'}
              class:bg-green-50={meet.type === 'install'}
              class:bg-yellow-50={meet.type === 'inspection'}
            >
              <p class="font-medium">{meet.title}</p>
              <p class="text-sm text-gray-500">{meet.time}</p>
            </div>
          {/each}
        {/if}
      </div>
    </aside>

  </main>

</div>