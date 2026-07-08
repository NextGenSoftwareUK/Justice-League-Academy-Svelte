<script lang="ts">
  import { session } from './oasisStore'

  let fields = { title: '', firstName: '', lastName: '', username: $session?.username ?? '', email: '', address: '' }
  let dirty = false
  let saving = false
  let status = ''
  let statusError = false

  function markDirty() { dirty = true }

  async function save() {
    saving = true
    status = ''
    try {
      await new Promise(r => setTimeout(r, 600))
      dirty = false
      statusError = false
      status = 'Changes saved.'
      setTimeout(() => { status = '' }, 3000)
    } catch (e: any) {
      statusError = true
      status = e?.message ?? 'Save failed.'
    } finally {
      saving = false
    }
  }

  function discard() {
    fields = { title: '', firstName: '', lastName: '', username: $session?.username ?? '', email: '', address: '' }
    dirty = false
    status = ''
  }
</script>

<div class="avp-shell">
  {#if !$session}
    <div class="avp-empty">Please <strong>Beam In</strong> to view your avatar.</div>
  {:else}
    <div class="avp-layout">
      <aside class="avp-summary">
        <div class="avp-avatar-img"><span class="avp-avatar-icon">👤</span></div>
        <div class="avp-name">{$session.username}</div>
        <div class="avp-stats">
          <div class="avp-stat">
            <span class="avp-stat-icon">⚡</span>
            <div>
              <div class="avp-stat-value">{$session.karma}</div>
              <div class="avp-stat-label">Karma</div>
            </div>
          </div>
        </div>
      </aside>

      <div class="avp-fields">
        <div class="avp-section-label">PROFILE</div>
        <div class="avp-field-row">
          <label class="avp-label" for="avp-title">Title</label>
          <input class="avp-input" id="avp-title" type="text" bind:value={fields.title} placeholder="Dr, Mr, Ms…" on:input={markDirty} />
        </div>
        <div class="avp-field-row">
          <label class="avp-label" for="avp-first">First Name</label>
          <input class="avp-input" id="avp-first" type="text" bind:value={fields.firstName} placeholder="First name" on:input={markDirty} />
        </div>
        <div class="avp-field-row">
          <label class="avp-label" for="avp-last">Last Name</label>
          <input class="avp-input" id="avp-last" type="text" bind:value={fields.lastName} placeholder="Last name" on:input={markDirty} />
        </div>
        <div class="avp-field-row">
          <label class="avp-label" for="avp-username">Username</label>
          <input class="avp-input" id="avp-username" type="text" bind:value={fields.username} placeholder="Username" on:input={markDirty} />
        </div>

        <div class="avp-section-label" style="margin-top:18px">CONTACT</div>
        <div class="avp-field-row">
          <label class="avp-label" for="avp-email">Email</label>
          <input class="avp-input" id="avp-email" type="email" bind:value={fields.email} placeholder="name@example.com" on:input={markDirty} />
        </div>
        <div class="avp-field-row">
          <label class="avp-label" for="avp-address">Address</label>
          <input class="avp-input" id="avp-address" type="text" bind:value={fields.address} placeholder="Optional" on:input={markDirty} />
        </div>

        {#if status}
          <div class="avp-status" class:avp-status--error={statusError}>{status}</div>
        {/if}

        {#if dirty}
          <div class="avp-actions">
            <button class="avp-btn" on:click={save} disabled={saving}>{saving ? 'Saving…' : 'Save Changes'}</button>
            <button class="avp-btn avp-btn--ghost" on:click={discard}>Discard</button>
          </div>
        {/if}
      </div>
    </div>
  {/if}
</div>

<style>
.avp-shell { color:#fff; }
.avp-empty { text-align:center; padding:40px; color:#7a9bbf; font-size:14px; }
.avp-layout { display:grid; grid-template-columns:180px 1fr; gap:28px; }
.avp-summary { display:flex; flex-direction:column; align-items:center; gap:14px; }
.avp-avatar-img { width:88px; height:88px; border-radius:50%; background:rgba(0,200,255,.1); border:2px solid rgba(0,200,255,.3); display:flex; align-items:center; justify-content:center; }
.avp-avatar-icon { font-size:40px; }
.avp-name { font-family:'Orbitron',sans-serif; font-size:13px; color:#fff; text-align:center; word-break:break-all; }
.avp-stats { display:flex; flex-direction:column; gap:8px; width:100%; }
.avp-stat { display:flex; align-items:center; gap:8px; background:rgba(0,200,255,.06); border-radius:8px; padding:8px 10px; }
.avp-stat-icon { font-size:16px; }
.avp-stat-value { font-family:'Orbitron',sans-serif; font-size:14px; color:#00c8ff; }
.avp-stat-label { font-size:11px; color:#7a9bbf; text-transform:uppercase; letter-spacing:.06em; }
.avp-fields { display:flex; flex-direction:column; gap:12px; }
.avp-section-label { font-size:10px; font-weight:700; letter-spacing:.12em; color:#7a9bbf; text-transform:uppercase; margin-bottom:4px; }
.avp-field-row { display:grid; grid-template-columns:90px 1fr; align-items:center; gap:12px; }
.avp-label { font-size:12px; color:#7a9bbf; text-align:right; }
.avp-input { width:100%; background:rgba(255,255,255,.05); border:1px solid rgba(0,200,255,.2); border-radius:6px; padding:8px 12px; color:#fff; font-size:13px; outline:none; box-sizing:border-box; transition:border-color .2s; }
.avp-input:focus { border-color:rgba(0,200,255,.5); }
.avp-status { margin-top:4px; font-size:13px; color:#48dc82; }
.avp-status--error { color:#ff6b6b; }
.avp-actions { display:flex; gap:10px; margin-top:4px; }
.avp-btn { background:linear-gradient(135deg,#00c8ff,#0080ff); border:none; border-radius:6px; color:#fff; font-family:'Orbitron',sans-serif; font-size:11px; font-weight:700; letter-spacing:.08em; padding:9px 16px; cursor:pointer; transition:opacity .2s; }
.avp-btn:disabled { opacity:.5; cursor:not-allowed; }
.avp-btn--ghost { background:transparent; border:1px solid rgba(0,200,255,.3); color:#00c8ff; }
</style>
