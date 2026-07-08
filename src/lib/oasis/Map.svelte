<script lang="ts">
  interface Location { id: string; name: string; type: string; x: number; y: number; description: string }
  let selected: Location | null = null
  const locations: Location[] = [
    { id: '1', name: 'OASIS Hub Alpha', type: 'Hub', x: 20, y: 30, description: 'Central hub for OASIS operations and avatar registration.' },
    { id: '2', name: 'Neon City', type: 'City', x: 55, y: 20, description: 'A sprawling cyberpunk metropolis in the OASIS.' },
    { id: '3', name: 'Enchanted Forest', type: 'Nature', x: 75, y: 60, description: 'Ancient woodland teeming with rare seeds and creatures.' },
    { id: '4', name: 'Battle Grounds', type: 'Quest Zone', x: 35, y: 70, description: 'Arena for quests, challenges, and PvP competitions.' },
    { id: '5', name: 'Crystal Spire', type: 'Hub', x: 85, y: 35, description: 'Trading post and NFT marketplace in the sky.' },
  ]
  const types = [{ icon: '🏙️', label: 'City' }, { icon: '🌲', label: 'Nature' }, { icon: '⚔️', label: 'Quest Zone' }, { icon: '🏛️', label: 'Hub' }]
  const icons: Record<string, string> = { Hub: '🏛️', City: '🏙️', Nature: '🌲', 'Quest Zone': '⚔️' }
  function locIcon(type: string) { return icons[type] ?? '📍' }
</script>
<div class="map-shell">
  <div class="map-header"><h2 class="map-title">🗺️ OASIS Map</h2><p class="map-sub">Explore the OASIS Omniverse.</p></div>
  <div class="map-viewport">
    <div class="map-grid-bg"></div>
    {#each locations as loc (loc.id)}
      <div class="map-pin" class:map-pin--selected={selected?.id === loc.id} style="left:{loc.x}%;top:{loc.y}%" on:click={() => selected = loc} title={loc.name}>
        <div class="map-pin-dot">{locIcon(loc.type)}</div>
      </div>
    {/each}
  </div>
  {#if selected}
    <div class="map-detail">
      <div class="map-detail-name">{selected.name}</div>
      <div class="map-detail-type">{selected.type}</div>
      <div class="map-detail-desc">{selected.description}</div>
      <button class="map-btn" on:click={() => selected = null}>Close</button>
    </div>
  {/if}
  <div class="map-legend">
    {#each types as t}
      <div class="map-legend-item"><span>{t.icon}</span><span>{t.label}</span></div>
    {/each}
  </div>
</div>
<style>
.map-shell{display:flex;flex-direction:column;gap:16px}.map-header{text-align:center}.map-title{font-family:'Orbitron',sans-serif;font-size:20px;color:#fff;margin:0 0 6px}.map-sub{font-size:13px;color:#7a9bbf;margin:0}.map-viewport{position:relative;height:300px;background:#030d1a;border:1px solid rgba(0,200,255,.2);border-radius:12px;overflow:hidden}.map-grid-bg{position:absolute;inset:0;background-image:linear-gradient(rgba(0,200,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(0,200,255,.05) 1px,transparent 1px);background-size:40px 40px}.map-pin{position:absolute;transform:translate(-50%,-50%);cursor:pointer;transition:transform .2s}.map-pin:hover{transform:translate(-50%,-50%) scale(1.2)}.map-pin--selected :global(.map-pin-dot){outline:2px solid #00c8ff;outline-offset:3px;border-radius:50%}.map-pin-dot{font-size:22px}.map-detail{background:rgba(255,255,255,.04);border:1px solid rgba(0,200,255,.2);border-radius:10px;padding:14px 16px;display:flex;align-items:center;gap:12px}.map-detail-name{font-family:'Orbitron',sans-serif;font-size:13px;color:#fff;flex:0 0 auto}.map-detail-type{font-size:11px;color:#5ba8ff;text-transform:uppercase;letter-spacing:.06em;flex:0 0 auto}.map-detail-desc{font-size:12px;color:#7a9bbf;flex:1}.map-btn{background:transparent;border:1px solid rgba(0,200,255,.3);border-radius:7px;color:#00c8ff;font-family:'Orbitron',sans-serif;font-size:11px;font-weight:700;padding:6px 14px;cursor:pointer}.map-legend{display:flex;gap:16px;flex-wrap:wrap}.map-legend-item{display:flex;align-items:center;gap:6px;font-size:12px;color:#7a9bbf}
</style>
