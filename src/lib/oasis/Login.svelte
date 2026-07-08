<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { login } from './oasisStore'

  const dispatch = createEventDispatcher<{ switchTo: 'signup' | 'forgot'; loggedIn: void }>()

  let username = ''
  let password = ''
  let rememberMe = false
  let showPwd = false
  let loading = false
  let error = ''

  async function submit() {
    if (!username || !password) { error = 'Please fill in all fields.'; return }
    loading = true
    error = ''
    try {
      await login(username, password)
      dispatch('loggedIn')
    } catch (e: any) {
      error = e?.message ?? 'Login failed. Please check your credentials.'
    } finally {
      loading = false
    }
  }
</script>

<div class="oasis-auth-form">
  <div class="oasis-auth-header">
    <h2 class="oasis-auth-title">Beam In</h2>
    <p class="oasis-auth-sub">
      Don't have an account?
      <a class="oasis-link" href="#" on:click|preventDefault={() => dispatch('switchTo', 'signup')}>Sign Up</a>
    </p>
  </div>

  {#if error}
    <div class="oasis-auth-error">{error}</div>
  {/if}

  <div class="oasis-field">
    <label class="oasis-label" for="oasis-login-username">Username</label>
    <input class="oasis-input" id="oasis-login-username" type="text" bind:value={username} placeholder="yourusername" autocomplete="username" />
  </div>

  <div class="oasis-field">
    <label class="oasis-label" for="oasis-login-password">Password</label>
    <div class="oasis-input-wrap">
      <input class="oasis-input" id="oasis-login-password" type={showPwd ? 'text' : 'password'} bind:value={password} placeholder="••••••••" autocomplete="current-password" />
      <button class="oasis-pwd-toggle" type="button" on:click={() => showPwd = !showPwd} aria-label={showPwd ? 'Hide password' : 'Show password'}>
        {showPwd ? '🙈' : '👁️'}
      </button>
    </div>
    <a class="oasis-link oasis-link--small" href="#" on:click|preventDefault={() => dispatch('switchTo', 'forgot')}>Forgot Password?</a>
  </div>

  <div class="oasis-field oasis-field--row">
    <input class="oasis-checkbox" id="oasis-remember" type="checkbox" bind:checked={rememberMe} />
    <label class="oasis-label oasis-label--inline" for="oasis-remember">Remember Me</label>
  </div>

  <button class="oasis-btn" type="button" disabled={loading} on:click={submit}>
    {loading ? 'Connecting…' : 'Beam In'}
  </button>
</div>

<style>
.oasis-auth-form { display:flex; flex-direction:column; gap:20px; }
.oasis-auth-header { text-align:center; }
.oasis-auth-title { font-family:'Orbitron',sans-serif; font-size:22px; color:#fff; margin:0 0 6px; }
.oasis-auth-sub { font-size:13px; color:#7a9bbf; margin:0; }
.oasis-auth-error { background:rgba(255,80,80,.12); border:1px solid rgba(255,80,80,.3); color:#ff6b6b; border-radius:8px; padding:10px 14px; font-size:13px; }
.oasis-field { display:flex; flex-direction:column; gap:6px; }
.oasis-field--row { flex-direction:row; align-items:center; gap:10px; }
.oasis-label { font-size:12px; font-weight:600; letter-spacing:.06em; color:#7a9bbf; text-transform:uppercase; }
.oasis-label--inline { text-transform:none; font-size:13px; color:#a8bfd8; }
.oasis-input-wrap { position:relative; }
.oasis-input { width:100%; background:rgba(255,255,255,.05); border:1px solid rgba(0,200,255,.2); border-radius:8px; padding:10px 14px; color:#fff; font-size:14px; outline:none; box-sizing:border-box; transition:border-color .2s; }
.oasis-input:focus { border-color:rgba(0,200,255,.5); }
.oasis-input-wrap .oasis-input { padding-right:44px; }
.oasis-pwd-toggle { position:absolute; right:10px; top:50%; transform:translateY(-50%); background:none; border:none; cursor:pointer; font-size:16px; padding:0; line-height:1; }
.oasis-checkbox { width:16px; height:16px; accent-color:#00c8ff; cursor:pointer; flex-shrink:0; }
.oasis-link { color:#00c8ff; text-decoration:none; cursor:pointer; }
.oasis-link--small { font-size:12px; margin-top:2px; }
.oasis-btn { background:linear-gradient(135deg,#00c8ff,#0080ff); border:none; border-radius:8px; color:#fff; font-family:'Orbitron',sans-serif; font-size:13px; font-weight:700; letter-spacing:.08em; padding:12px; cursor:pointer; transition:opacity .2s; }
.oasis-btn:disabled { opacity:.5; cursor:not-allowed; }
</style>
