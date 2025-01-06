<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Labels from './Labels.svelte';
  import DigitStyle from './digits/DigitStyle.svelte';
  
  export let count: number;
  export let min = 1;
  export let max = 456;

  const dispatch = createEventDispatcher();
  let isHovered = false;

  function handleWheel(event: WheelEvent) {
    if (!isHovered) return;
    event.preventDefault();
    const direction = event.deltaY > 0 ? 1 : -1;
    const newCount = count - direction;
    
    if (newCount >= min && newCount <= max) {
      const oldCount = count;
      count = newCount;
      dispatch('countChange', { oldCount, newCount });
    }
  }

  $: digits = count.toString().split('');
</script>

<div class="player-count">
  <Labels korean="참가인원" english="NUMBER OF PLAYERS" />
  <div 
    class="number-display"
    class:hovered={isHovered}
    on:mouseenter={() => isHovered = true}
    on:mouseleave={() => isHovered = false}
    on:wheel|preventDefault={handleWheel}
    role="spinbutton"
    aria-label="Player count"
    aria-valuemin={min}
    aria-valuemax={max}
    aria-valuenow={count}
    tabindex="0"
  >
    <div class="digits-container">
      {#each digits as digit}
        <DigitStyle size="large" char={digit} />
      {/each}
    </div>
  </div>
</div>

<style>
  .number-display {
    @apply font-['SquidPrizeMoney'] font-bold tracking-normal;
    transition: text-shadow 0.2s ease;
    min-width: 3em;
    text-align: center;
  }

  .number-display.hovered {
    text-shadow: 0 0 15px rgba(183, 216, 197, 0.8);
    cursor: ns-resize;
  }

  .digits-container {
    display: inline-flex;
    justify-content: center;
  }
</style>