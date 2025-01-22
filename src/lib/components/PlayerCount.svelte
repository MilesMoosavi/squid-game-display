<script lang="ts">
  /**
   * @component
   * @description Displays the the amount of players in a game. 
   * Users may hover over the component, then scroll up or down to increment or decrement 
   * the player count. 
   * @requires Labels
   * @requires DigitStyle
   */
  import Labels from './Labels.svelte';
  import DigitStyle from './digits/DigitStyle.svelte';
  
  interface PlayerCountProps {
    count: number;
    config: {
      min: number;
      max: number;
    };
  }

  export let count: PlayerCountProps['count'];
  export let config: PlayerCountProps['config'];

  $: digits = count.toString().split('');

  function handleWheel(event: WheelEvent) {
    event.preventDefault();
    const delta = event.deltaY > 0 ? -1 : 1;
    const newCount = count + delta;
    
    if (newCount >= config.min && newCount <= config.max) {
      count = newCount;
    }
  }
</script>

<div class="player-count" on:wheel={handleWheel}>
  <Labels korean="참가인원" english="NUMBER OF PLAYERS" />
  <div class="number-display">
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