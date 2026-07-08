<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { forgotPassword } from './oasisStore'

  const dispatch = createEventDispatcher<{ switchTo: 'login' }>()

  let email = ''
  let loading = false
  let error = ''
  let sent = false

  async function submit() {
    if (!email) { error = 'Please enter your email address.'; return }
    loading = true
    error = ''
    try {
      await forgotPassword(email)
      sent = true
    } catch (e: any) {
      error = e?.message ?? 'Request failed. Please try again.'
    } finally {
      loading = false
    }
  }
</script>

<div class="oasis-auth-form">
  <div class="oasis-auth-header">
    <h2 class="oasis-auth-title">Forgot Password?</h2>
    <p class="oasis-auth-sub">Enter your email and we'll send a reset link if the account exists.</p>
  </div>

  {#if error}
    <div class="oasis-auth-error">{error}</div>
  {/if}

  {#if !sent}
    <div class="oasis-field">
      <label class="oasis-label" for="fp-email">Email</label>
      <input class="oasis-input" id="fp-email" type="email" bind:value={email} placeholder="name@example.com" autocomplete="email" />
    </div>
    <button class="oasis-btn" type="button" disabled={loading} on:click={submit}>
      {loading ? 'Sending…' : 'Send Reset Link'}
    </button>
  {:else}
    <div class="oasis-auth-success">✅ Reset link sent! Check your inbox.</div>
  {/if}

  <a class="oasis-link oasis-link--center" href="#" on:click|preventDefault={() => dispatch('switchTo', 'login')}>← Back to Login</a>
</div>

<style>
.oasis-auth-form { display:flex; flex-direction:column; gap:20px; }
.oasis-auth-header { text-align:center; }
.oasis-auth-title { font-family:'Orbitron',sans-serif; font-size:20px; color:#fff; margin:0 0 6px; }
.oasis-auth-sub { font-size:13px; color:#7a9bbf; margin:0; line-height:1.5; }
.oasis-auth-error { background:rgba(255,80,80,.12); border:1px solid rgba(255,80,80,.3); color:#ff6b6b; border-radius:8px; padding:10px 14px; font-size:13px; }
.oasis-auth-success { background:rgba(72,220,130,.12); border:1px solid rgba(72,220,130,.3); color:#48dc82; border-radius:8px; padding:14px; font-size:13px; }
.oasis-field { display:flex; flex-direction:column; gap:6px; }
.oasis-label { font-size:12px; font-weight:600; letter-spacing:.06em; color:#7a9bbf; text-transform:uppercase; }
.oasis-input { width:100%; background:rgba(255,255,255,.05); border:1px solid rgba(0,200,255,.2); border-radius:8px; padding:10px 14px; color:#fff; font-size:14px; outline:none; box-sizing:border-box; transition:border-color .2s; }
.oasis-input:focus { border-color:rgba(0,200,255,.5); }
.oasis-link { color:#00c8ff; text-decoration:none; cursor:pointer; font-size:13px; }
.oasis-link--center { text-align:center; }
.oasis-btn { background:linear-gradient(135deg,#00c8ff,#0080ff); border:none; border-radius:8px; color:#fff; font-family:'Orbitron',sans-serif; font-size:13px; font-weight:700; letter-spacing:.08em; padding:12px; cursor:pointer; transition:opacity .2s; }
.oasis-btn:disabled { opacity:.5; cursor:not-allowed; }
</style>
