<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { register } from './oasisStore'

  const dispatch = createEventDispatcher<{ switchTo: 'login' }>()

  let firstName = '', lastName = '', username = '', email = ''
  let password = '', confirmPassword = ''
  let acceptTerms = false
  let loading = false
  let error = ''
  let success = false

  async function submit() {
    if (!firstName || !lastName || !username || !email || !password) {
      error = 'Please fill in all fields.'; return
    }
    if (password !== confirmPassword) { error = 'Passwords do not match.'; return }
    if (password.length < 6) { error = 'Password must be at least 6 characters.'; return }
    if (!acceptTerms) { error = 'Please accept the Terms of Service.'; return }
    loading = true
    error = ''
    try {
      await register(firstName, lastName, username, email, password)
      success = true
    } catch (e: any) {
      error = e?.message ?? 'Registration failed. Please try again.'
    } finally {
      loading = false
    }
  }
</script>

<div class="oasis-auth-form">
  <div class="oasis-auth-header">
    <h2 class="oasis-auth-title">Sign Up</h2>
    <p class="oasis-auth-sub">
      Already have an account?
      <a class="oasis-link" href="#" on:click|preventDefault={() => dispatch('switchTo', 'login')}>Beam In</a>
    </p>
  </div>

  {#if error}
    <div class="oasis-auth-error">{error}</div>
  {/if}

  {#if !success}
    <div class="oasis-grid-2">
      <div class="oasis-field">
        <label class="oasis-label" for="su-first">First Name</label>
        <input class="oasis-input" id="su-first" type="text" bind:value={firstName} placeholder="John" />
      </div>
      <div class="oasis-field">
        <label class="oasis-label" for="su-last">Last Name</label>
        <input class="oasis-input" id="su-last" type="text" bind:value={lastName} placeholder="Doe" />
      </div>
    </div>

    <div class="oasis-grid-2">
      <div class="oasis-field">
        <label class="oasis-label" for="su-username">Username</label>
        <input class="oasis-input" id="su-username" type="text" bind:value={username} placeholder="johndoe" autocomplete="username" />
      </div>
      <div class="oasis-field">
        <label class="oasis-label" for="su-email">Email</label>
        <input class="oasis-input" id="su-email" type="email" bind:value={email} placeholder="name@example.com" autocomplete="email" />
      </div>
    </div>

    <div class="oasis-grid-2">
      <div class="oasis-field">
        <label class="oasis-label" for="su-pwd">Password</label>
        <input class="oasis-input" id="su-pwd" type="password" bind:value={password} placeholder="min 6 characters" autocomplete="new-password" />
      </div>
      <div class="oasis-field">
        <label class="oasis-label" for="su-cpwd">Confirm Password</label>
        <input class="oasis-input" id="su-cpwd" type="password" bind:value={confirmPassword} placeholder="••••••••" autocomplete="new-password" />
      </div>
    </div>

    <div class="oasis-field oasis-field--row">
      <input class="oasis-checkbox" id="su-terms" type="checkbox" bind:checked={acceptTerms} />
      <label class="oasis-label oasis-label--inline" for="su-terms">I accept the Terms of Service</label>
    </div>

    <button class="oasis-btn" type="button" disabled={loading} on:click={submit}>
      {loading ? 'Creating account…' : 'Create Account'}
    </button>
  {:else}
    <div class="oasis-auth-success">
      ✅ Account created!
      <a class="oasis-link" href="#" on:click|preventDefault={() => dispatch('switchTo', 'login')}>Beam In</a>
    </div>
  {/if}
</div>

<style>
.oasis-auth-form { display:flex; flex-direction:column; gap:18px; }
.oasis-auth-header { text-align:center; }
.oasis-auth-title { font-family:'Orbitron',sans-serif; font-size:22px; color:#fff; margin:0 0 6px; }
.oasis-auth-sub { font-size:13px; color:#7a9bbf; margin:0; }
.oasis-auth-error { background:rgba(255,80,80,.12); border:1px solid rgba(255,80,80,.3); color:#ff6b6b; border-radius:8px; padding:10px 14px; font-size:13px; }
.oasis-auth-success { background:rgba(72,220,130,.12); border:1px solid rgba(72,220,130,.3); color:#48dc82; border-radius:8px; padding:10px 14px; font-size:13px; }
.oasis-grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
.oasis-field { display:flex; flex-direction:column; gap:6px; }
.oasis-field--row { flex-direction:row; align-items:center; gap:10px; }
.oasis-label { font-size:12px; font-weight:600; letter-spacing:.06em; color:#7a9bbf; text-transform:uppercase; }
.oasis-label--inline { text-transform:none; font-size:13px; color:#a8bfd8; }
.oasis-input { width:100%; background:rgba(255,255,255,.05); border:1px solid rgba(0,200,255,.2); border-radius:8px; padding:10px 14px; color:#fff; font-size:14px; outline:none; box-sizing:border-box; transition:border-color .2s; }
.oasis-input:focus { border-color:rgba(0,200,255,.5); }
.oasis-checkbox { width:16px; height:16px; accent-color:#00c8ff; cursor:pointer; flex-shrink:0; }
.oasis-link { color:#00c8ff; text-decoration:none; cursor:pointer; }
.oasis-btn { background:linear-gradient(135deg,#00c8ff,#0080ff); border:none; border-radius:8px; color:#fff; font-family:'Orbitron',sans-serif; font-size:13px; font-weight:700; letter-spacing:.08em; padding:12px; cursor:pointer; transition:opacity .2s; }
.oasis-btn:disabled { opacity:.5; cursor:not-allowed; }
</style>
