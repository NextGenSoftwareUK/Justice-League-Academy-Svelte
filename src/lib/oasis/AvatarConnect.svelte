<script lang="ts">
  import { session, login, logout } from './oasisStore'
  import OasisModal from './OasisModal.svelte'

  let open = false
  let loading = false
  let error = ''
  let username = ''
  let password = ''

  async function doLogin() {
    if (!username || !password) { error = 'Please fill in both fields.'; return }
    loading = true; error = ''
    try {
      await login(username, password)
      open = false; username = ''; password = ''
    } catch {
      error = 'Login failed. Please check your credentials.'
    } finally { loading = false }
  }
</script>

{#if $session}
  <div class="avatar-badge">
    <span class="avatar-icon">⬡</span>
    <span class="avatar-name">{$session.username}</span>
    <span class="karma-pill">{$session.karma.toLocaleString()} ✦</span>
    <button class="logout-btn" on:click={logout}>✕</button>
  </div>
{:else}
  <button class="connect-btn" on:click={() => open = true}>⬡ CONNECT AVATAR</button>
{/if}

<OasisModal {open} accentColor="rgba(59,130,246,.3)" on:close={() => open = false}>
  <div class="modal-icon">⬡</div>
  <h2 class="modal-title">Connect Your Avatar</h2>
  <p class="modal-sub">Sign in to your OASIS avatar to earn karma across Justice League Academy.</p>
  <input bind:value={username} class="oasis-input" placeholder="Avatar username" />
  <input bind:value={password} class="oasis-input" type="password" placeholder="Password" />
  {#if error}<p class="error-msg">{error}</p>{/if}
  <button class="btn-primary" disabled={loading} on:click={doLogin}>
    {loading ? 'Connecting…' : 'Connect Avatar'}
  </button>
</OasisModal>

<style>
  .connect-btn { background: none; border: 1px solid rgba(59,130,246,.4); border-radius: 999px; padding: 8px 18px; color: #3b82f6; font-family: 'Share Tech Mono', monospace; font-size: 11px; letter-spacing: .1em; cursor: pointer; transition: background .2s; }
  .connect-btn:hover { background: rgba(59,130,246,.08); }
  .avatar-badge { display: flex; align-items: center; gap: 8px; }
  .avatar-icon { color: #3b82f6; font-size: 16px; }
  .avatar-name { font-family: 'Share Tech Mono', monospace; font-size: 12px; color: #fff; letter-spacing: .06em; }
  .karma-pill { background: rgba(59,130,246,.12); border: 1px solid rgba(59,130,246,.3); border-radius: 999px; padding: 2px 10px; font-family: 'Share Tech Mono', monospace; font-size: 11px; color: #3b82f6; }
  .logout-btn { background: none; border: none; color: #a8bfd8; cursor: pointer; font-size: 14px; }
  .modal-icon { font-size: 40px; text-align: center; color: #3b82f6; margin-bottom: 16px; }
  .modal-title { font-family: 'Orbitron', sans-serif; font-size: 20px; font-weight: 700; color: #fff; text-align: center; margin: 0 0 8px; }
  .modal-sub { font-size: 14px; color: #a8bfd8; text-align: center; line-height: 1.6; margin: 0 0 24px; }
  .oasis-input { width: 100%; background: rgba(255,255,255,.05); border: 1px solid rgba(59,130,246,.2); border-radius: 8px; padding: 11px 14px; color: #fff; font-size: 14px; outline: none; box-sizing: border-box; margin-bottom: 12px; display: block; font-family: inherit; }
  .btn-primary { width: 100%; padding: 14px; background: linear-gradient(135deg,#3b82f6,#a855f7); border: none; border-radius: 10px; color: #fff; font-family: 'Orbitron', sans-serif; font-size: 13px; font-weight: 700; letter-spacing: .08em; cursor: pointer; margin-top: 4px; }
  .btn-primary:disabled { opacity: .5; cursor: not-allowed; }
  .error-msg { color: #f87171; font-size: 13px; text-align: center; margin-bottom: 8px; }
</style>
