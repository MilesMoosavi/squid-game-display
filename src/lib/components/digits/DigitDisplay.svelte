<script lang="ts">
  export let value = 0;
  export let size: "large" | "medium" = "large";
  export let position: number = 0;
  export let maxValue: number = 9;

  let isHovered = false;
  let isDragging = false;
  let startY = 0;
  let currentValue = value;

  function handleMouseEnter() {
    isHovered = true;
  }

  function handleMouseLeave() {
    isHovered = false;
  }

  function handleWheel(event: WheelEvent) {
    if (!isHovered) return;
    event.preventDefault();
    // Scroll up decreases, scroll down increases (natural scroll direction)
    const direction = event.deltaY > 0 ? 1 : -1;
    currentValue = (currentValue + direction + 10) % 10;
  }

  $: displayValue = currentValue;
</script>

<div 
  role="spinbutton"
  aria-label="Digit scroll control"
  aria-valuemin="0"
  aria-valuemax="9"
  aria-valuenow={currentValue}
  class="digit-container {size}-digits"
  class:hovered={isHovered}
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  on:wheel|preventDefault={handleWheel}
  tabindex="0"
>
  <div class="digit">
    {displayValue}
  </div>
</div>

<style>
  .digit-container {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.1em 0.2em;
    transition: all 0.2s ease;
  }

  .digit-container.hovered {
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
    cursor: ns-resize;
  }

  .digit {
    transition: transform 0.1s;
  }
</style>
