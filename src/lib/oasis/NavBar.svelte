<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import AvatarConnect from './AvatarConnect.svelte'

  let menuOpen = false
  let scrolled = false

  const links = [
    { href: '#mission', label: 'Mission' },
    { href: '#disciplines', label: 'Disciplines' },
    { href: '#courses', label: 'Courses' },
    { href: '#origins', label: 'Origins' },
    { href: '#forum', label: 'Forum' },
    { href: '#features', label: 'Features' },
    { href: '#ecosystem', label: 'Ecosystem' },
    { href: '#karma', label: 'Karma' },
  ]

  function onScroll() { scrolled = window.scrollY > 40 }
  onMount(() => window.addEventListener('scroll', onScroll))
  onDestroy(() => window.removeEventListener('scroll', onScroll))
</script>

<nav class="nav" class:scrolled>
  <a class="nav-brand" href="#">
    <span class="brand-icon">⚖</span>
    <span>JUSTICE <em>LEAGUE</em> ACADEMY</span>
  </a>
  <button class="nav-toggle" class:open={menuOpen} on:click={() => menuOpen = !menuOpen} aria-label="Menu">
    <span /><span /><span />
  </button>
  <ul class="nav-links" class:open={menuOpen}>
    {#each links as link}
      <li><a href={link.href} on:click={() => menuOpen = false}>{link.label}</a></li>
    {/each}
  </ul>
  <div class="nav-right">
    <AvatarConnect />
  </div>
</nav>

<style>
  .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 18px 40px; display: flex; align-items: center; justify-content: space-between; background: rgba(3,7,20,.88); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(59,130,246,.12); transition: padding .3s; }
  .nav.scrolled { padding: 12px 40px; }
  .nav-brand { font-family: 'Orbitron', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: .16em; color: #fff; text-decoration: none; display: flex; align-items: center; gap: 10px; white-space: nowrap; }
  .brand-icon { color: #3b82f6; font-size: 16px; }
  :global(.nav-brand em) { color: #a855f7; font-style: normal; }
  .nav-links { display: flex; gap: 16px; list-style: none; padding: 0; }
  .nav-links :global(a) { font-family: 'Share Tech Mono', monospace; font-size: 11px; letter-spacing: .07em; color: #a8bfd8; text-decoration: none; text-transform: uppercase; transition: color .2s; }
  .nav-links :global(a:hover) { color: #3b82f6; }
  .nav-right { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
  .nav-toggle { display: none; flex-direction: column; justify-content: center; gap: 5px; width: 32px; height: 32px; background: none; border: none; cursor: pointer; }
  .nav-toggle span { display: block; width: 100%; height: 2px; background: #a8bfd8; transition: transform .25s, opacity .25s; }
  .nav-toggle.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .nav-toggle.open span:nth-child(2) { opacity: 0; }
  .nav-toggle.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
  @media (max-width: 1000px) {
    .nav-toggle { display: flex; }
    .nav-links { position: fixed; top: 0; right: 0; height: 100vh; width: min(78vw,320px); flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 14px; padding: 76px 32px 24px; overflow-y: auto; background: rgba(3,7,20,.97); backdrop-filter: blur(12px); border-left: 1px solid rgba(59,130,246,.12); transform: translateX(100%); transition: transform .3s ease; }
    .nav-links.open { transform: translateX(0); }
    .nav { padding: 14px 20px; }
  }
</style>
