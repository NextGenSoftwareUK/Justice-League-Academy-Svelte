<script lang="ts">
  import { addKarma } from '../../lib/oasis/oasisStore'

  const threads = [
    { icon: '⚖', title: 'How do I challenge an unlawful arrest? A practical guide from a JLA law grad', author: 'LexGuardian', time: '1 hour ago', replies: 41 },
    { icon: '🥋', title: 'Krav Maga vs Jiu-Jitsu for real-world self-defence — community debate', author: 'IronWill_JLA', time: '4 hours ago', replies: 88 },
    { icon: '🧠', title: 'Marcus Aurelius reading group — Week 7: On justice and anger', author: 'StoicMind', time: '1 day ago', replies: 29 },
    { icon: '🌍', title: 'Starting a community legal clinic — who has done this? Share your experience', author: 'CivicBuilder', time: '2 days ago', replies: 56 },
  ]
</script>

<section class="section" id="forum">
  <div class="section-kicker" style="color:#a855f7">STUDENT COMMUNITY</div>
  <h2 class="section-title">Academy Forum</h2>
  <span class="section-line" style="background:linear-gradient(90deg,#a855f7,transparent)" />
  <p class="section-sub">Debate ideas, share breakthroughs, ask your mentors questions. Every substantive post earns karma and contributes to the collective wisdom of JLA.</p>

  <div class="forum-list">
    {#each threads as t}
      <div class="thread-row">
        <div class="thread-icon">{t.icon}</div>
        <div class="thread-body">
          <div class="thread-title">{t.title}</div>
          <div class="thread-meta"><span class="thread-author">{t.author}</span> · {t.time}</div>
        </div>
        <div class="thread-stats">
          <div class="reply-count">{t.replies}</div>
          <div class="reply-label">replies</div>
        </div>
      </div>
    {/each}
  </div>

  <div class="forum-cta">
    <button class="btn-violet" on:click={() => addKarma(50, 'Forum post created')}>✦ Start a Thread</button>
    <button class="btn-outline-violet">Browse Forum</button>
  </div>
</section>

<style>
  .section { padding: 100px 40px; max-width: 1200px; margin: 0 auto; }
  .section-kicker { font-family: 'Share Tech Mono',monospace; font-size: 11px; letter-spacing: .22em; margin-bottom: 16px; }
  .section-title { font-family: 'Orbitron',sans-serif; font-size: clamp(24px,3.5vw,44px); font-weight: 900; color: #fff; margin: 0 0 16px; }
  .section-line { display: block; width: 60px; height: 3px; border-radius: 2px; margin-bottom: 24px; }
  .section-sub { font-family: 'Rajdhani',sans-serif; font-size: 17px; color: #a8bfd8; line-height: 1.7; margin: 0 0 40px; max-width: 680px; }
  .forum-list { display: flex; flex-direction: column; gap: 2px; margin-bottom: 40px; }
  .thread-row { display: grid; grid-template-columns: 48px 1fr auto; gap: 16px; align-items: center; background: rgba(10,21,53,.8); border: 1px solid rgba(168,85,247,.12); border-radius: 12px; padding: 20px 24px; transition: border-color .2s; }
  .thread-row:hover { border-color: rgba(168,85,247,.3); }
  .thread-icon { font-size: 24px; }
  .thread-title { font-family: 'Rajdhani',sans-serif; font-size: 16px; font-weight: 600; color: #fff; margin-bottom: 4px; }
  .thread-meta { font-family: 'Share Tech Mono',monospace; font-size: 10px; color: #a8bfd8; letter-spacing: .06em; }
  .thread-author { color: #a855f7; }
  .thread-stats { text-align: center; }
  .reply-count { font-family: 'Orbitron',sans-serif; font-size: 20px; font-weight: 900; color: #a855f7; }
  .reply-label { font-family: 'Share Tech Mono',monospace; font-size: 9px; letter-spacing: .1em; color: #a8bfd8; }
  .forum-cta { display: flex; gap: 16px; flex-wrap: wrap; }
  .btn-violet { background: linear-gradient(135deg,#a855f7,#3b82f6); color: #fff; padding: 14px 32px; border-radius: 10px; font-family: 'Orbitron',sans-serif; font-size: 12px; font-weight: 700; letter-spacing: .1em; border: none; cursor: pointer; }
  .btn-outline-violet { border: 1px solid rgba(168,85,247,.35); color: #a855f7; background: none; padding: 14px 32px; border-radius: 10px; font-family: 'Orbitron',sans-serif; font-size: 12px; font-weight: 700; letter-spacing: .1em; cursor: pointer; }
</style>
