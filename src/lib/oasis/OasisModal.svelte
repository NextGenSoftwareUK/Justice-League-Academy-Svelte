<script lang="ts">
  import { scale } from 'svelte/transition'
  export let open = false
  export let accentColor = 'rgba(59,130,246,.3)'

  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()
</script>

{#if open}
  <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
  <div class="backdrop" on:click={() => dispatch('close')} transition:scale={{ duration: 200, start: 0.96 }}>
    <div class="modal-box" style="border-color:{accentColor}" on:click|stopPropagation>
      <button class="modal-close" on:click={() => dispatch('close')}>✕</button>
      <slot />
    </div>
  </div>
{/if}

<style>
  .backdrop {
    position: fixed; inset: 0; z-index: 9000;
    background: rgba(3,7,20,.85); backdrop-filter: blur(8px);
    display: flex; align-items: center; justify-content: center; padding: 20px;
  }
  .modal-box {
    background: #0a1535; border: 1px solid; border-radius: 20px;
    padding: 40px 36px; max-width: 520px; width: 100%;
    position: relative; max-height: 90vh; overflow-y: auto;
  }
  .modal-close {
    position: absolute; top: 16px; right: 18px;
    background: none; border: none; color: #a8bfd8; font-size: 20px; cursor: pointer;
  }
</style>
