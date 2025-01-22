<script lang="ts">
  /**
   * @component
   * @description Displays the cash prize amount with Korean game show styling
   * @requires Labels
   * @requires DigitStyle
   */
  import Labels from './Labels.svelte';
  import DigitStyle from './digits/DigitStyle.svelte';
  
  export let amount: number;

  function formatAmount(num: number): string {
    // Add thousands separators (commas) to a zero-padded 11-digit number
    return num.toString().padStart(11, '0').replace(/\B(?=(\d{3})+(?!\d))/g, ',');  }

  $: formattedAmount = formatAmount(amount);
  $: characters = ('₩ ' + formattedAmount).split('');
</script>

<div class="cash-prize">
  <Labels korean="총 상금" english="CASH PRIZE" />
  <div class="number-display">
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
    letter-spacing: 0.04em;
  }
</style>
