<script lang="ts">
  import { OASISClient } from '@oasisomniverse/web4-api'
  interface AvatarResult { id: string; username: string; firstName: string; lastName: string; karma: number }
  let query = '', loading = false, error = '', searched = false
  let results: AvatarResult[] = []
  async function search() {
    if (!query.trim()) return
    loading = true; error = ''; searched = false; results = []
    try {
      const oasis = new OASISClient({ baseUrl: 'https://api.web4.oasisomniverse.one' })
      const res: any = await (oasis.avatar as any).searchAvatars({ searchQuery: query })
      results = Array.isArray(res?.result) ? res.result : []
      searched = true
    } catch (e: any) { error = e?.message ?? 'Search failed.' }
    finally { loading = false }
  }
</script>
<div class="sa-shell">
  <div class="sa-header">
    <h2 class="sa-title">🔍 Search Avatars</h2>
    <p class="sa-sub">Find other OASIS avatars by username or name.</p>
  </div>
  <div class="sa-search-row">
    <input class="oasis-input" type="text" bind:value={query} placeholder="Search by username…" on:keydown={(e) => e.key === 'Enter' && search()} />
    <button class="oasis-btn" disabled={loading || !query.trim()} on:click={search}>{loading ? '…' : 'Search'}</button>
  </div>
  {#if error}<div class="oasis-auth-error">{error}</div>{/if}
  {#if results.length > 0}
    <div class="sa-results">
      {#each results as a (a.id)}
        <div class="sa-card">
          <div class="sa-avatar-icon">👤</div>
          <div class="sa-info"><div class="sa-username">{a.username}</div><div class="sa-name">{a.firstName} {a.lastName}</div></div>
          <div class="sa-karma">{a.karma} karma</div>
        </div>
      {/each}
    </div>
  {:else if searched && !loading}
    <div class="sa-empty">No avatars found for "{query}".</div>
  {/if}
</div>
<style>
.sa-shell{display:flex;flex-direction:column;gap:18px}.sa-header{text-align:center}.sa-title{font-family:'Orbitron',sans-serif;font-size:20px;color:#fff;margin:0 0 6px}.sa-sub{font-size:13px;color:#7a9bbf;margin:0}.sa-search-row{display:flex;gap:10px}.oasis-input{flex:1;background:rgba(255,255,255,.05);border:1px solid rgba(0,200,255,.2);border-radius:8px;padding:10px 14px;color:#fff;font-size:14px;outline:none;transition:border-color .2s;font-family:inherit}.oasis-input:focus{border-color:rgba(0,200,255,.5)}.oasis-btn{background:linear-gradient(135deg,#00c8ff,#0080ff);border:none;border-radius:8px;color:#fff;font-family:'Orbitron',sans-serif;font-size:12px;font-weight:700;letter-spacing:.08em;padding:10px 20px;cursor:pointer;white-space:nowrap;transition:opacity .2s}.oasis-btn:disabled{opacity:.4;cursor:not-allowed}.oasis-auth-error{background:rgba(255,80,80,.12);border:1px solid rgba(255,80,80,.3);color:#ff6b6b;border-radius:8px;padding:10px 14px;font-size:13px}.sa-results{display:flex;flex-direction:column;gap:10px}.sa-card{display:flex;align-items:center;gap:14px;padding:14px 16px;background:rgba(255,255,255,.04);border:1px solid rgba(0,200,255,.12);border-radius:10px}.sa-avatar-icon{font-size:28px}.sa-info{flex:1}.sa-username{font-family:'Orbitron',sans-serif;font-size:13px;color:#fff}.sa-name{font-size:12px;color:#7a9bbf;margin-top:2px}.sa-karma{font-size:12px;color:#48dc82;font-weight:600;white-space:nowrap}.sa-empty{text-align:center;color:#4a6a88;font-size:14px;padding:24px}
</style>
