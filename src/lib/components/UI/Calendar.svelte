<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Calendar Dashboard</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100">

  <!-- Header -->
  <header class="bg-white shadow p-4 flex items-center justify-between">
    <div>
      <h1 class="text-2xl font-semibold text-gray-800">Calendar Dashboard</h1>
      <p class="text-sm text-gray-500">Meeting & Job Scheduling</p>
    </div>
    <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
      + Add Meeting
    </button>
  </header>

  <!-- Main -->
  <main class="p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">

    <!-- Calendar -->
    <section class="lg:col-span-3 bg-white rounded-xl shadow p-6">

      <!-- Month Nav -->
      <div class="flex items-center justify-between mb-4">
        <div>
          <h2 class="text-xl font-semibold">February 2026</h2>
          <p class="text-sm text-gray-500">Today's Schedule</p>
        </div>
        <div class="flex gap-2">
          <button class="px-3 py-1 bg-gray-200 rounded">←</button>
          <button class="px-3 py-1 bg-gray-200 rounded">→</button>
        </div>
      </div>

      <!-- Weekdays -->
      <div class="grid grid-cols-7 text-center text-gray-500 font-medium mb-2">
        <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div>
        <div>Thu</div><div>Fri</div><div>Sat</div>
      </div>

      <!-- Days -->
      <div class="grid grid-cols-7 gap-2">

        <!-- Empty -->
        <div></div><div></div><div></div>

        <!-- Days -->
        <div class="bg-gray-50 p-2 rounded-lg">
          <span class="text-sm font-medium">1</span>
        </div>

        <div class="bg-gray-50 p-2 rounded-lg">
          <span class="text-sm font-medium">2</span>
        </div>

        <div class="bg-gray-50 p-2 rounded-lg">
          <span class="text-sm font-medium">3</span>
        </div>

        <div class="bg-gray-50 p-2 rounded-lg">
          <span class="text-sm font-medium">4</span>
        </div>

        <!-- Week -->
        <div class="bg-gray-50 p-2 rounded-lg">
          <span class="text-sm font-medium">5</span>
          <div class="mt-1 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
            10:00 AM Meeting
          </div>
        </div>

        <div class="bg-gray-50 p-2 rounded-lg">
          <span class="text-sm font-medium">6</span>
        </div>

        <div class="bg-gray-50 p-2 rounded-lg">
          <span class="text-sm font-medium">7</span>
        </div>

        <div class="bg-gray-50 p-2 rounded-lg">
          <span class="text-sm font-medium">8</span>
          <div class="mt-1 bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
            HVAC Installation
          </div>
        </div>

        <div class="bg-gray-50 p-2 rounded-lg">
          <span class="text-sm font-medium">9</span>
        </div>

        <div class="bg-gray-50 p-2 rounded-lg">
          <span class="text-sm font-medium">10</span>
          <div class="mt-1 bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded">
            System Inspection
          </div>
        </div>

        <div class="bg-gray-50 p-2 rounded-lg">
          <span class="text-sm font-medium">11</span>
        </div>

        <div class="bg-gray-50 p-2 rounded-lg">
          <span class="text-sm font-medium">12</span>
        </div>

        <div class="bg-gray-50 p-2 rounded-lg">
          <span class="text-sm font-medium">13</span>
        </div>

        <div class="bg-gray-50 p-2 rounded-lg">
          <span class="text-sm font-medium">14</span>
        </div>

        <!-- Continue -->
        <div class="bg-gray-50 p-2 rounded-lg"><span>15</span></div>
        <div class="bg-gray-50 p-2 rounded-lg"><span>16</span></div>
        <div class="bg-gray-50 p-2 rounded-lg"><span>17</span></div>
        <div class="bg-gray-50 p-2 rounded-lg"><span>18</span></div>
        <div class="bg-gray-50 p-2 rounded-lg"><span>19</span></div>
        <div class="bg-gray-50 p-2 rounded-lg"><span>20</span></div>
        <div class="bg-gray-50 p-2 rounded-lg"><span>21</span></div>
        <div class="bg-gray-50 p-2 rounded-lg"><span>22</span></div>
        <div class="bg-gray-50 p-2 rounded-lg"><span>23</span></div>
        <div class="bg-gray-50 p-2 rounded-lg"><span>24</span></div>
        <div class="bg-gray-50 p-2 rounded-lg"><span>25</span></div>
        <div class="bg-gray-50 p-2 rounded-lg"><span>26</span></div>
        <div class="bg-gray-50 p-2 rounded-lg"><span>27</span></div>
        <div class="bg-gray-50 p-2 rounded-lg"><span>28</span></div>

      </div>
    </section>

    <!-- Sidebar -->
    <aside class="bg-white rounded-xl shadow p-6">
      <h3 class="font-semibold text-lg mb-4">Today's Meetings</h3>

      <div class="space-y-4">
        <div class="p-3 bg-blue-50 rounded-lg">
          <p class="font-medium">Client Strategy Call</p>
          <p class="text-sm text-gray-500">10:00 AM – 11:00 AM</p>
        </div>

        <div class="p-3 bg-green-50 rounded-lg">
          <p class="font-medium">HVAC Installation</p>
          <p class="text-sm text-gray-500">1:30 PM – 4:00 PM</p>
        </div>

        <div class="p-3 bg-yellow-50 rounded-lg">
          <p class="font-medium">System Inspection</p>
          <p class="text-sm text-gray-500">5:00 PM – 6:00 PM</p>
        </div>
      </div>
    </aside>

  </main>

</body>
</html>