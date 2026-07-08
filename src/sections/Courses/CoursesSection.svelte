<script lang="ts">
  import { addKarma } from '../../lib/oasis/oasisStore'
  import OasisModal from '../../lib/oasis/OasisModal.svelte'

  let modalOpen = false
  let selectedCourse = ''

  const courses = [
    { icon: '⚖', title: 'Constitutional Law Fundamentals', discipline: 'LAW & JUSTICE', level: 'Beginner', karma: 400, duration: '6 weeks', color: '#3b82f6' },
    { icon: '🥋', title: 'Krav Maga Self-Defence', discipline: 'MARTIAL ARTS', level: 'All levels', karma: 350, duration: '8 weeks', color: '#a855f7' },
    { icon: '🧠', title: 'Stoic Resilience Training', discipline: 'MENTAL MASTERY', level: 'Beginner', karma: 300, duration: '4 weeks', color: '#22d3ee' },
    { icon: '🌍', title: 'Community Leadership Blueprint', discipline: 'GLOBAL LEADERSHIP', level: 'Intermediate', karma: 500, duration: '10 weeks', color: '#34d399' },
    { icon: '🏛', title: 'How Democracy Works', discipline: 'CIVIC EDUCATION', level: 'Beginner', karma: 250, duration: '3 weeks', color: '#f59e0b' },
    { icon: '🛡', title: 'Digital Security & Privacy', discipline: 'PERSONAL PROTECTION', level: 'All levels', karma: 300, duration: '5 weeks', color: '#f87171' },
  ]

  function enrol(title: string) {
    selectedCourse = title
    modalOpen = true
  }
</script>

<section class="section-full" id="courses">
  <div class="section">
    <div class="section-kicker">FEATURED TRAINING</div>
    <h2 class="section-title">Current Courses</h2>
    <span class="section-line" />
    <p class="section-sub">Live-instructed and self-paced courses, all assessed and verified on the OASIS blockchain. Every completed course is a permanent credential on your avatar.</p>

    <div class="courses-grid">
      {#each courses as c}
        <div class="course-card">
          <div class="course-top">
            <span class="course-discipline" style="color:{c.color}">{c.discipline}</span>
            <span class="course-level">{c.level}</span>
          </div>
          <div class="course-icon">{c.icon}</div>
          <h3 class="course-title">{c.title}</h3>
          <div class="course-meta">
            <span>⏱ {c.duration}</span>
            <span style="color:{c.color}">+{c.karma} karma</span>
          </div>
          <button class="course-btn" style="background:linear-gradient(135deg,{c.color},#a855f7)"
            on:click={() => enrol(c.title)}>
            Enrol Now
          </button>
        </div>
      {/each}
    </div>
  </div>
</section>

<OasisModal open={modalOpen} accentColor="rgba(59,130,246,.3)" on:close={() => modalOpen = false}>
  <div class="modal-icon">⚖</div>
  <h2 class="modal-title">Enrol in Course</h2>
  <p class="modal-sub">You're enrolling in: <strong style="color:#3b82f6">{selectedCourse}</strong></p>
  <form action="https://formsubmit.co/davidellams@hotmail.com" method="POST"
    on:submit={() => { addKarma(50, `Course enrolment: ${selectedCourse}`); modalOpen = false }}>
    <input type="hidden" name="_subject" value="JLA — Course Enrolment">
    <input type="hidden" name="_captcha" value="false">
    <input type="hidden" name="_template" value="table">
    <input type="hidden" name="course" value={selectedCourse}>
    <input class="oasis-input" name="name" placeholder="Your full name" required />
    <input class="oasis-input" name="email" type="email" placeholder="your@email.com" required />
    <select class="oasis-input" name="experience">
      <option value="">Your experience level…</option>
      <option value="none">Complete beginner</option>
      <option value="some">Some background knowledge</option>
      <option value="intermediate">Intermediate practitioner</option>
      <option value="advanced">Advanced / professional</option>
    </select>
    <button type="submit" class="btn-submit">Confirm Enrolment</button>
  </form>
</OasisModal>

<style>
  .section-full { background: linear-gradient(180deg,transparent,rgba(59,130,246,.03),transparent); }
  .section { padding: 100px 40px; max-width: 1200px; margin: 0 auto; }
  .section-kicker { font-family: 'Share Tech Mono',monospace; font-size: 11px; letter-spacing: .22em; color: #3b82f6; margin-bottom: 16px; }
  .section-title { font-family: 'Orbitron',sans-serif; font-size: clamp(24px,3.5vw,44px); font-weight: 900; color: #fff; margin: 0 0 16px; }
  .section-line { display: block; width: 60px; height: 3px; background: linear-gradient(90deg,#3b82f6,transparent); border-radius: 2px; margin-bottom: 24px; }
  .section-sub { font-family: 'Rajdhani',sans-serif; font-size: 17px; color: #a8bfd8; line-height: 1.7; margin: 0 0 48px; max-width: 680px; }
  .courses-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(300px,1fr)); gap: 24px; }
  .course-card { background: var(--bg-card,#0a1535); border: 1px solid rgba(59,130,246,.15); border-radius: 16px; padding: 28px; display: flex; flex-direction: column; transition: border-color .3s; }
  .course-card:hover { border-color: rgba(59,130,246,.35); }
  .course-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
  .course-discipline { font-family: 'Share Tech Mono',monospace; font-size: 10px; letter-spacing: .12em; }
  .course-level { font-family: 'Share Tech Mono',monospace; font-size: 10px; letter-spacing: .1em; color: #a8bfd8; background: rgba(255,255,255,.06); border-radius: 999px; padding: 3px 10px; }
  .course-icon { font-size: 32px; margin-bottom: 12px; }
  .course-title { font-family: 'Orbitron',sans-serif; font-size: 14px; font-weight: 700; color: #fff; letter-spacing: .04em; margin: 0 0 14px; line-height: 1.4; flex: 1; }
  .course-meta { display: flex; justify-content: space-between; font-family: 'Share Tech Mono',monospace; font-size: 11px; color: #a8bfd8; margin-bottom: 20px; }
  .course-btn { padding: 12px; border: none; border-radius: 8px; color: #fff; font-family: 'Orbitron',sans-serif; font-size: 12px; font-weight: 700; letter-spacing: .08em; cursor: pointer; transition: opacity .2s; }
  .course-btn:hover { opacity: .85; }
  .modal-icon { font-size: 40px; text-align: center; margin-bottom: 12px; }
  .modal-title { font-family: 'Orbitron',sans-serif; font-size: 20px; font-weight: 700; color: #fff; text-align: center; margin: 0 0 8px; }
  .modal-sub { font-size: 14px; color: #a8bfd8; text-align: center; line-height: 1.6; margin: 0 0 24px; }
  .oasis-input { width: 100%; background: rgba(255,255,255,.05); border: 1px solid rgba(59,130,246,.2); border-radius: 8px; padding: 11px 14px; color: #fff; font-size: 14px; outline: none; box-sizing: border-box; margin-bottom: 12px; display: block; font-family: inherit; }
  :global(option) { background: #0a1535; }
  .btn-submit { width: 100%; padding: 14px; background: linear-gradient(135deg,#3b82f6,#a855f7); border: none; border-radius: 10px; color: #fff; font-family: 'Orbitron',sans-serif; font-size: 13px; font-weight: 700; letter-spacing: .08em; cursor: pointer; margin-top: 4px; }
</style>
