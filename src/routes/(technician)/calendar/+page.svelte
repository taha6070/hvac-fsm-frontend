<script>
  import Calendar from "$lib/components/Calendar/Calendar.svelte";

  const days = [
    { date: 1, events: [] },
    { date: 2, events: [] },
    {
      date: 5,
      events: [
        { title: 'Client Meeting', time: '10:00 AM', type: 'meeting' }
      ]
    },
    {
      date: 8,
      events: [
        { title: 'HVAC Installation', time: '1:00 PM', type: 'install' }
      ]
    },
    {
      date: 10,
      events: [
        { title: 'System Inspection', time: '5:00 PM', type: 'inspection' }
      ]
    },
        { date: 11, events: [] },

    { date: 12, events: [] },
    { date: 13, events: [] },
    { date: 14, events: [] },
    { date: 15, events: [] },
    { date: 16, events: [] },
    { date: 17, events: [] },
    { date: 18, events: [] },




  ];

  const todaysMeetings = [
    { title: 'Client Strategy Call', time: '10:00 AM – 11:00 AM', type: 'meeting' },
    { title: 'HVAC Install', time: '1:30 PM – 4:00 PM', type: 'install' }
  ];
</script>

<Calendar
  month="February"
  year={2026}
  {days}
  {todaysMeetings}
/>