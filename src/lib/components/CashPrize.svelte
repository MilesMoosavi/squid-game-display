<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Labels from './Labels.svelte';
  import DigitStyle from './digits/DigitStyle.svelte';
  
  const dispatch = createEventDispatcher();
  export let amount = 0;
  export let min = 0;
  export let max = 45_600_000_000;
  
  let isHovered = false;

  function formatAmount(num: number): string {
    return num.toString().padStart(11, '0').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  function handleWheel(event: WheelEvent) {
    if (!isHovered) return;
    event.preventDefault();
    const direction = event.deltaY > 0 ? 1 : -1;
    const oldAmount = amount;
    const newAmount = amount - (direction * 100000000);
    
    if (newAmount >= min && newAmount <= max) {
      amount = newAmount;
      dispatch('amountChange', { oldAmount, newAmount });
    }
  }

  $: formattedAmount = formatAmount(amount);
  // Split the formatted amount into individual characters (including commas)
  $: characters = ('₩ ' + formattedAmount).split('');
</script>

<div class="cash-prize">
  <Labels korean="총 상금" english="CASH PRIZE" />
  <div 
    class="number-display"
    class:hovered={isHovered}
    on:mouseenter={() => isHovered = true}
    on:mouseleave={() => isHovered = false}
    on:wheel|preventDefault={handleWheel}
    role="spinbutton"
    aria-label="Cash prize amount"
    aria-valuemin={min}
    aria-valuemax={max}
    aria-valuenow={amount}
    tabindex="0"
  >
    <div class="digits-container">
      {#each characters as char}
        <DigitStyle 
          size="medium" 
          char={char}
          showUnderline={!isNaN(parseInt(char))}
        />
      {/each}
    </div>
  </div>
</div>

<style>
  .number-display {
    @apply font-['SquidPrizeMoney'] font-bold tracking-normal;
    transition: text-shadow 0.2s ease;
    min-width: 8em;
    text-align: center;
  }

  .number-display.hovered {
    text-shadow: 0 0 15px rgba(183, 216, 197, 0.8);
    cursor: ns-resize;
  }

  .digits-container {
    display: inline-flex;
    justify-content: center;
    letter-spacing: 0.04em;  /* Added letter spacing to match PlayerCount */
  }
</style>
