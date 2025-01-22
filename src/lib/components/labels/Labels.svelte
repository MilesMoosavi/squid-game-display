<script>
  export let korean = "";
  export let english = "";
</script>

<div class="labels-group">
  <div class="label-korean">* {korean} *</div>
  <div class="label-english">{english}</div>
</div>

<style lang="postcss">
  .labels-group {
    @apply mb-2 text-center;
  }
  .label-korean {
    @apply text-[calc(1.2vw)] mb-[0.3%] font-['SquidPrizeMoney'];
  }
  .label-english {
    @apply text-[calc(1vw)] font-['SquidPrizeMoney'];
  }
</style>
