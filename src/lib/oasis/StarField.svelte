<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  let canvas: HTMLCanvasElement
  let animId = 0

  onMount(() => {
    const ctx = canvas.getContext('2d')!
    const stars = Array.from({ length: 160 }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.2 + 0.2,
      o: Math.random(),
      s: (Math.random() - 0.5) * 0.002,
    }))

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const s of stars) {
        s.o += s.s
        if (s.o < 0.1 || s.o > 1) s.s = -s.s
        ctx.beginPath()
        ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200,220,255,${s.o.toFixed(2)})`
        ctx.fill()
      }
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  })
</script>

<canvas bind:this={canvas} class="star-canvas" />

<style>
  .star-canvas {
    position: fixed; inset: 0; z-index: 0;
    pointer-events: none; width: 100%; height: 100%;
  }
</style>
