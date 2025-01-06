<script lang="ts">
  export let size: "large" | "medium" = "large";
  export let char: string;
  export let showUnderline = true;
</script>

<span class="digit-wrapper {size}" class:show-underline={showUnderline && !isNaN(parseInt(char))}>
  <span class="digit-content">{char}</span>
  {#if showUnderline && !isNaN(parseInt(char))}
    <span class="underline-bar"></span>
  {/if}
</span>

<style>
  .digit-wrapper {
    position: relative;
    display: inline-block;
    width: 0.8em; /* Fixed width container */
    text-align: center;
    margin: 0 0.04em;
    line-height: 1;
  }

  .digit-content {
    position: relative;
    display: block;
    transform: translateY(0);
    transition: transform 0.2s ease;
  }

  .underline-bar {
    position: absolute;
    left: 50%;
    bottom: -2px;
    transform: translateX(-57.5%);
    width: 0.75em;
    height: 2px;
    background-color: currentColor;
  }

  .large {
    font-size: calc(5vw);
  }

  .medium {
    font-size: calc(4vw);
  }
</style>
