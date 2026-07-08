<script lang="ts">
  import { fly } from 'svelte/transition'
  import { karmaToast } from './oasisStore'
</script>

{#if $karmaToast}
  <div class="karma-toast" transition:fly={{ y: 20, duration: 350 }}>
    <span class="kt-amount">+{$karmaToast.amount} ✦</span>
    <span class="kt-msg">{$karmaToast.message}</span>
  </div>
{/if}

<style>
  .karma-toast {
    position: fixed; bottom: 32px; right: 32px; z-index: 9999;
    background: linear-gradient(135deg, rgba(59,130,246,.15), rgba(168,85,247,.1));
    border: 1px solid rgba(59,130,246,.45); border-radius: 14px;
    padding: 16px 24px; display: flex; flex-direction: column; gap: 4px;
    backdrop-filter: blur(12px);
  }
  .kt-amount { font-family: 'Orbitron', sans-serif; font-size: 22px; font-weight: 900; color: #3b82f6; }
  .kt-msg { font-family: 'Share Tech Mono', monospace; font-size: 11px; letter-spacing: .1em; color: #a8bfd8; }
</style>
