<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  export let title = 'Are you sure?'
  export let message = 'This action cannot be undone.'
  export let icon = '⚠️'
  export let confirmLabel = 'Confirm'
  export let cancelLabel = 'Cancel'
  const dispatch = createEventDispatcher<{ confirm: void; cancel: void }>()
</script>
<div class="conf-shell">
  <div class="conf-icon">{icon}</div>
  <h2 class="conf-title">{title}</h2>
  <p class="conf-body">{message}</p>
  <div class="conf-actions">
    <button class="conf-btn conf-btn--confirm" on:click={() => dispatch('confirm')}>{ confirmLabel}</button>
    <button class="conf-btn conf-btn--cancel" on:click={() => dispatch('cancel')}>{cancelLabel}</button>
  </div>
</div>
<style>
.conf-shell{display:flex;flex-direction:column;align-items:center;gap:18px;padding:20px;text-align:center}.conf-icon{font-size:44px}.conf-title{font-family:'Orbitron',sans-serif;font-size:18px;color:#fff;margin:0}.conf-body{font-size:14px;color:#a8bfd8;line-height:1.6;margin:0;max-width:360px}.conf-actions{display:flex;gap:12px;margin-top:4px}.conf-btn{border:none;border-radius:8px;font-family:'Orbitron',sans-serif;font-size:12px;font-weight:700;letter-spacing:.08em;padding:11px 24px;cursor:pointer;transition:opacity .2s}.conf-btn--confirm{background:linear-gradient(135deg,#ff4444,#cc0000);color:#fff}.conf-btn--cancel{background:transparent;border:1px solid rgba(0,200,255,.3);color:#00c8ff}
</style>
