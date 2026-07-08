<script lang="ts">
  import { addKarma } from '../../lib/oasis/oasisStore'

  const disciplines = [
    { icon: '⚖', name: 'Law & Justice', color: '#3b82f6', border: 'rgba(59,130,246,.2)', desc: 'Constitutional law, human rights, restorative justice, mediation and the philosophy of justice across cultures and traditions.', karma: 800 },
    { icon: '🥋', name: 'Martial Arts', color: '#a855f7', border: 'rgba(168,85,247,.2)', desc: 'Krav Maga, Jiu-Jitsu, Muay Thai, Judo and Tai Chi — grounded in discipline, respect and the ethical use of force.', karma: 600 },
    { icon: '🧠', name: 'Mental Mastery', color: '#22d3ee', border: 'rgba(34,211,238,.2)', desc: 'Stoicism, cognitive-behavioural training, emotional intelligence, resilience and mindset transformation.', karma: 700 },
    { icon: '🌍', name: 'Global Leadership', color: '#34d399', border: 'rgba(52,211,153,.2)', desc: 'Diplomacy, conflict resolution, community organising and the art of leading change at every scale.', karma: 900 },
    { icon: '🏛', name: 'Civic Education', color: '#f59e0b', border: 'rgba(245,158,11,.2)', desc: 'Democracy, voting systems, civic responsibility, activism and how to engage effectively with power structures.', karma: 500 },
    { icon: '🛡', name: 'Personal Protection', color: '#f87171', border: 'rgba(248,113,113,.2)', desc: 'Digital security, situational awareness, legal self-defence rights and protection for vulnerable individuals and communities.', karma: 650 },
  ]
</script>

<section class="section" id="disciplines">
  <div class="section-kicker">THE CURRICULUM</div>
  <h2 class="section-title">Six Core Disciplines</h2>
  <span class="section-line" />
  <p class="section-sub">Every discipline is taught by verified masters, examined via OASIS-logged assessments, and permanently recorded on your avatar profile as earned credentials.</p>

  <div class="disc-grid">
    {#each disciplines as d}
      <div class="disc-card" style="border-color:{d.border}">
        <div class="disc-icon" style="color:{d.color}">{d.icon}</div>
        <h3 class="disc-name" style="color:{d.color}">{d.name}</h3>
        <p class="disc-desc">{d.desc}</p>
        <div class="disc-footer">
          <span class="disc-karma" style="color:{d.color}">+{d.karma} karma on completion</span>
          <button class="disc-btn" style="border-color:{d.border};color:{d.color}"
            on:click={() => addKarma(50, `Enrolled in ${d.name}`)}>
            Enrol
          </button>
        </div>
      </div>
    {/each}
  </div>
</section>

<style>
  .section { padding: 100px 40px; max-width: 1200px; margin: 0 auto; }
  .section-kicker { font-family: 'Share Tech Mono',monospace; font-size: 11px; letter-spacing: .22em; color: #3b82f6; margin-bottom: 16px; }
  .section-title { font-family: 'Orbitron',sans-serif; font-size: clamp(24px,3.5vw,44px); font-weight: 900; color: #fff; margin: 0 0 16px; }
  .section-line { display: block; width: 60px; height: 3px; background: linear-gradient(90deg,#3b82f6,transparent); border-radius: 2px; margin-bottom: 24px; }
  .section-sub { font-family: 'Rajdhani',sans-serif; font-size: 17px; color: #a8bfd8; line-height: 1.7; margin: 0 0 48px; max-width: 680px; }
  .disc-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(300px,1fr)); gap: 24px; }
  .disc-card { background: var(--bg-card,#0a1535); border: 1px solid; border-radius: 16px; padding: 32px 28px; display: flex; flex-direction: column; transition: transform .3s; }
  .disc-card:hover { transform: translateY(-4px); }
  .disc-icon { font-size: 36px; margin-bottom: 14px; }
  .disc-name { font-family: 'Orbitron',sans-serif; font-size: 14px; font-weight: 700; letter-spacing: .06em; margin: 0 0 12px; }
  .disc-desc { font-size: 14px; color: #a8bfd8; line-height: 1.65; margin: 0 0 20px; flex: 1; }
  .disc-footer { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
  .disc-karma { font-family: 'Share Tech Mono',monospace; font-size: 10px; letter-spacing: .06em; }
  .disc-btn { background: none; border: 1px solid; border-radius: 999px; padding: 6px 20px; font-family: 'Share Tech Mono',monospace; font-size: 11px; letter-spacing: .1em; cursor: pointer; transition: opacity .2s; white-space: nowrap; }
  .disc-btn:hover { opacity: .75; }
</style>
