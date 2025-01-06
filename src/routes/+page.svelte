<script lang="ts">
  import PlayerCount from '$lib/components/PlayerCount.svelte';
  import CashPrize from '$lib/components/CashPrize.svelte';

  // Game configuration
  const CONFIG = {
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

  function handlePlayerCountChange(event: CustomEvent<{oldCount: number, newCount: number}>) {
    const { oldCount, newCount } = event.detail;
    const playerDiff = oldCount - newCount;
    
    // Calculate new cash prize, considering eliminated players
    const eliminatedPlayersContribution = playerDiff * CONFIG.cash.perPlayer;
    
    // Add final player's contribution when reaching 1 player
    const finalPlayerBonus = newCount === 1 ? CONFIG.cash.perPlayer : 0;
    
    const newCashPrize = cashPrize + eliminatedPlayersContribution + finalPlayerBonus;
    
    // Enforce cash prize bounds
    cashPrize = Math.min(Math.max(newCashPrize, CONFIG.cash.min), CONFIG.cash.max);
  }

  function handleCashPrizeChange(event: CustomEvent<{oldAmount: number, newAmount: number}>) {
    const { oldAmount, newAmount } = event.detail;
    const amountDiff = oldAmount - newAmount;
    
    // Calculate how many players this represents
    const playerDiff = Math.round(amountDiff / CONFIG.cash.perPlayer);
    const newPlayerCount = playerCount + playerDiff;
    
    // Update player count if within bounds
    if (newPlayerCount >= CONFIG.players.min && newPlayerCount <= CONFIG.players.max) {
      playerCount = newPlayerCount;
    } else {
      // If player count would be out of bounds, revert cash prize
      cashPrize = oldAmount;
    }
  }
</script>

<main class="min-h-screen flex items-center justify-center bg-black p-4">
  <div class="display-container">
    <div class="display-content">
      <PlayerCount 
        count={playerCount}
        min={CONFIG.players.min}
        max={CONFIG.players.max}
        on:countChange={handlePlayerCountChange}
      />
      <CashPrize 
        amount={cashPrize}
        min={CONFIG.cash.min}
        max={CONFIG.cash.max}
        on:amountChange={handleCashPrizeChange}
      />
    </div>
  </div>
</main>
