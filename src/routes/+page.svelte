<script lang="ts">
  import PlayerCount from '$lib/components/PlayerCount.svelte';
  import CashPrize from '$lib/components/CashPrize.svelte';
  import DigitScroller from '$lib/components/digits/DigitScroller.svelte';

  // Game configuration
  export const CONFIG = {
    players: {
      default: 456,
      min: 1,
      max: 456
    },
    cash: {
      default: 0,
      min: 0,
      max: 45_600_000_000,
      get perPlayer() {
        return this.max / CONFIG.players.max;
      }
    }
  };

  let playerCount = CONFIG.players.default;
  let cashPrize = CONFIG.cash.default;
  let testNumber = 57;  // Replace testDigits array
  
  // Option 1: Smooth and gradual (good for precise control)
  function handleTestWheel(event: WheelEvent) {
    event.preventDefault();
    const deltaTime = 16; // Assume consistent frame time
    const sensitivity = Math.abs(event.deltaY) / deltaTime * 0.1; // Very low multiplier
    if (sensitivity > 0.017) { // Very low threshold
      const direction = event.deltaY > 0 ? -1 : 1;
      testNumber = (testNumber + direction + 100) % 100;
    }
  }

  let isDragging = false;
  let dragVelocity = 0;
  let dragTimer: ReturnType<typeof setTimeout>;  // Fix timer type

  function handleDrag(event: CustomEvent) {
    const { movement, velocity } = event.detail;
    if (Math.abs(movement) >= 0.25) {  // Increased threshold from 1 to require more movement
      const direction = movement > 0 ? 1 : -1;
      testNumber = (testNumber + direction + 100) % 100;
    }
    dragVelocity = velocity;
  }

  function handleDragEnd(event: CustomEvent) {
    const { flick } = event.detail;
    if (Math.abs(flick) > 0.3) {  // Lower threshold for detecting flicks
      if (dragTimer) clearTimeout(dragTimer);
      
      const momentum = Math.sign(flick) * Math.min(Math.abs(flick), 0.8);  // Significantly reduced max momentum
      const animate = () => {
        dragVelocity *= 0.80; // Faster decay
        if (Math.abs(dragVelocity) > 0.3) {  // Higher threshold to stop sooner
          testNumber = (testNumber + Math.sign(dragVelocity) + 100) % 100;
          dragTimer = setTimeout(animate, 100);  // Slower updates
        }
      };
      dragVelocity = momentum;
      animate();
    }
  }

  $: testDigits = testNumber.toString().padStart(2, '0').split('');

  // Reactive statement to handle playerCount changes
  $: {
    // Ensure playerCount stays within bounds
    if (playerCount < CONFIG.players.min) playerCount = CONFIG.players.min;
    if (playerCount > CONFIG.players.max) playerCount = CONFIG.players.max;
    
    // Update cash prize based on player count
    cashPrize = CONFIG.cash.max - playerCount * CONFIG.cash.perPlayer;
  }
</script>

<main class="min-h-screen flex items-center justify-center bg-black p-4">
  <div class="display-container">
    <div class="display-content">
      <!-- Test Digits -->
      <div class="mb-8 flex items-center justify-center">
        <div class="text-white flex" 
          on:wheel={handleTestWheel}
          on:mouseenter={() => document.body.style.overflow = 'hidden'}
          on:mouseleave={() => document.body.style.overflow = 'auto'}
        >
          {#each testDigits as digit}
            <DigitScroller 
              value={digit} 
              size="large"
              on:drag={handleDrag}
              on:dragend={handleDragEnd}
            />
          {/each}
        </div>
      </div>

      <!-- Existing Components -->
      <PlayerCount 
        bind:count={playerCount}
        config={CONFIG.players}
      />
      <CashPrize bind:amount={cashPrize} />
    </div>
  </div>
</main>
