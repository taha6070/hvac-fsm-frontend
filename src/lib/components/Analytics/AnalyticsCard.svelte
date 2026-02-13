<script>
  export let title = "Revenue";
  export let value = 12540;
  export let prefix = "$";
  export let change = 12.5; // percentage
  export let icon = "💰";

  let animated = 0;

  $: animate();

  function animate() {
    const duration = 800;
    const steps = 40;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      animated = Math.min(Math.round(current), value);
      if (current >= value) clearInterval(timer);
    }, duration / steps);
  }
</script>

<div
  class="group relative overflow-hidden rounded-2xl bg-base-100 border border-base-300 p-5 shadow-sm transition hover:shadow-xl"
>
  <!-- Gradient Accent -->
  <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary to-secondary"></div>

  <div class="flex items-center justify-between">
    <div>
      <p class="text-sm text-base-content/70">{title}</p>
      <h2 class="mt-1 text-3xl font-bold">
        {prefix}{animated.toLocaleString()}
      </h2>

      <div
        class="mt-2 inline-flex items-center gap-1 text-sm font-medium"
        class:text-success={change >= 0}
        class:text-error={change < 0}
      >
        <span>{change >= 0 ? "▲" : "▼"}</span>
        <span>{Math.abs(change)}%</span>
        <span class="text-base-content/50">vs last month</span>
      </div>
    </div>

    <div
      class="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-2xl transition group-hover:scale-110"
    >
      {icon}
    </div>
  </div>
</div>
