<script lang="ts">
  import DigitStyle from './DigitStyle.svelte';
  import { slide } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';

  export let size: "large" | "medium" = "large";
  export let value: string;

  let currentValue = parseInt(value);
  
  // Create a continuous strip of numbers
  $: digitStrip = [
    ((currentValue + 1) + 10) % 10,  // Next number (above)
    currentValue,                     // Current number
    ((currentValue - 1) + 10) % 10   // Previous number (below)
  ];
  
  let scrollOffset = 0;

  $: if (value !== currentValue.toString()) {
    const newValue = parseInt(value);
    const direction = newValue > currentValue ? -1 : 1; // Inverted for correct visual movement
    scrollOffset = direction * 100;
    
    setTimeout(() => {
      currentValue = newValue;
      scrollOffset = 0;
    }, 200);
  }

  const dispatch = createEventDispatcher();
  let isDragging = false;
  let startY = 0;
  let currentY = 0;
  let velocity = 0;
  let lastY = 0;
  let lastTime = 0;

  function handleMouseDown(event: MouseEvent) {
    isDragging = true;
    startY = event.clientY;
    currentY = startY;
    lastY = startY;
    lastTime = Date.now();
    dispatch('dragstart');
  }

  function handleMouseMove(event: MouseEvent) {
    if (!isDragging) return;
    
    const now = Date.now();
    const deltaTime = now - lastTime;
    const deltaY = event.clientY - lastY;
    
    velocity = (deltaY / deltaTime) * 0.5; // Reduced velocity calculation
    currentY = event.clientY;
    
    const movement = (startY - currentY) / 400; // Increased divisor for less sensitivity
    dispatch('drag', { movement, velocity });

    lastY = currentY;
    lastTime = now;
  }

  function handleMouseUp() {
    if (!isDragging) return;
    isDragging = false;
    
    const flick = velocity * 2; // Significantly reduced flick multiplier
    dispatch('dragend', { flick });
  }
</script>

<div class="digit-frame {size}"
  on:mousedown={handleMouseDown}
  on:mousemove={handleMouseMove}
  on:mouseup={handleMouseUp}
  on:mouseleave={handleMouseUp}
>
  <div class="bar top-bar"></div>
  
  <div class="digit-viewport">
    <div class="digit-strip" style="transform: translateY({scrollOffset}%)">
      {#each digitStrip as digit}
        <div class="digit-wrapper">
          <DigitStyle {size} char={digit.toString()} showUnderline={false} />
        </div>
      {/each}
    </div>
  </div>
  
  <div class="bar bottom-bar"></div>
</div>

<style>
  .digit-frame {
    position: relative;
    display: inline-block;
    width: 0.8em;
    text-align: center;
    margin: 0 0.04em;
    line-height: 1;
    font-family: 'SquidPrizeMoney', monospace;
    font-weight: bold;
    transition: text-shadow 0.2s ease;
    cursor: ns-resize;
    user-select: none; /* Prevent text selection during drag */
  }

  .digit-viewport {
    position: relative;
    height: 1em;
    overflow: hidden;
  }

  .digit-strip {
    position: absolute;
    width: 100%;
    display: flex;
    flex-direction: column;
    transform-origin: center center;
    transition: transform 0.2s cubic-bezier(0.4, 0.0, 0.2, 1);
    top: 0;
  }

  .bar {
    position: absolute;
    left: 50%;
    transform: translateX(-57.5%);
    width: 0.75em;
    height: 2px;
    background: currentColor;
    z-index: 2;
    box-shadow: 0 0 15px rgba(183, 216, 197, 0.8);
    transition: box-shadow 0.2s ease;
  }

  .top-bar {
    top: -12px;
  }

  .bottom-bar {
    bottom: -2px;
  }

  .large {
    font-size: calc(5vw);
  }

  .medium {
    font-size: calc(4vw);
  }

  :global(.digit-frame .digit-content) {
    text-shadow: 0 0 15px rgba(183, 216, 197, 0.8);
  }

  .digit-wrapper {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
