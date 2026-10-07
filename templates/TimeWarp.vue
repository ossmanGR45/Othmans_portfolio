<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useWindowsStore } from '@/stores/windows'

const windowsStore = useWindowsStore()
const canvasRef = ref(null)
let animId = null
let audioCtx = null

// Web Audio sound synthesizer for warp jump
const playWarpSound = (direction) => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (!AudioContext) return
    audioCtx = new AudioContext()
    if (audioCtx.state === 'suspended') audioCtx.resume()

    const now = audioCtx.currentTime

    // Oscillator 1: Charging warp sweep
    const osc1 = audioCtx.createOscillator()
    const gain1 = audioCtx.createGain()
    osc1.type = direction === 'future' ? 'sawtooth' : 'triangle'
    
    if (direction === 'future') {
      // Pitch sweeps up rapidly
      osc1.frequency.setValueAtTime(60, now)
      osc1.frequency.exponentialRampToValueAtTime(1400, now + 1.2)
    } else {
      // Pitch rewinds downward
      osc1.frequency.setValueAtTime(1200, now)
      osc1.frequency.exponentialRampToValueAtTime(80, now + 1.2)
    }

    gain1.gain.setValueAtTime(0.01, now)
    gain1.gain.linearRampToValueAtTime(0.18, now + 0.8)
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 1.6)

    osc1.connect(gain1)
    gain1.connect(audioCtx.destination)
    osc1.start(now)
    osc1.stop(now + 1.7)

    // Sub-bass impact at arrival (around 1.2s)
    const osc2 = audioCtx.createOscillator()
    const gain2 = audioCtx.createGain()
    osc2.type = 'sine'
    osc2.frequency.setValueAtTime(direction === 'future' ? 120 : 200, now + 1.1)
    osc2.frequency.exponentialRampToValueAtTime(30, now + 1.8)

    gain2.gain.setValueAtTime(0.001, now)
    gain2.gain.setValueAtTime(0.28, now + 1.15)
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 1.9)

    osc2.connect(gain2)
    gain2.connect(audioCtx.destination)
    osc2.start(now + 1.1)
    osc2.stop(now + 1.9)
  } catch (e) {
    // Audio context may be restricted by browser policy
  }
}

// Canvas Warp Starfield Simulation
onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')

  let width = (canvas.width = window.innerWidth)
  let height = (canvas.height = window.innerHeight)

  const handleResize = () => {
    if (!canvas) return
    width = canvas.width = window.innerWidth
    height = canvas.height = window.innerHeight
  }
  window.addEventListener('resize', handleResize)

  // Stars array
  const numStars = 600
  const stars = []
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: (Math.random() - 0.5) * width * 2,
      y: (Math.random() - 0.5) * height * 2,
      z: Math.random() * width,
      pz: Math.random() * width,
      color: Math.random() > 0.4 ? '#10b981' : (Math.random() > 0.5 ? '#34d399' : '#ffffff')
    })
  }

  playWarpSound(windowsStore.timeWarpDirection)

  const render = () => {
    ctx.fillStyle = 'rgba(5, 7, 15, 0.28)'
    ctx.fillRect(0, 0, width, height)

    const cx = width / 2
    const cy = height / 2
    const speed = 45 // Warp speed!

    for (let i = 0; i < numStars; i++) {
      const star = stars[i]
      star.pz = star.z
      star.z -= speed

      if (star.z <= 0) {
        star.z = width
        star.pz = width
        star.x = (Math.random() - 0.5) * width * 2
        star.y = (Math.random() - 0.5) * height * 2
      }

      const k = 250 / star.z
      const px = star.x * k + cx
      const py = star.y * k + cy

      const pk = 250 / star.pz
      const prevX = star.x * pk + cx
      const prevY = star.y * pk + cy

      if (px >= 0 && px <= width && py >= 0 && py <= height) {
        const size = Math.max(1, (1 - star.z / width) * 3)
        ctx.beginPath()
        ctx.moveTo(prevX, prevY)
        ctx.lineTo(px, py)
        ctx.strokeStyle = star.color
        ctx.lineWidth = size
        ctx.stroke()
      }
    }

    animId = requestAnimationFrame(render)
  }

  render()

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    if (animId) cancelAnimationFrame(animId)
  })
})
</script>

<template>
  <div class="time-warp-overlay">
    <canvas ref="canvasRef" class="warp-canvas"></canvas>

    <!-- Holographic Sci-Fi HUD -->
    <div class="hud-center">
      <div class="vortex-ring"></div>
      <div class="hud-box">
        <div class="hud-badge">
          {{ windowsStore.timeWarpDirection === 'future' ? 'QUANTUM TEMPORAL JUMP' : 'TEMPORAL REWIND' }}
        </div>
        <h1 class="hud-title">
          {{ windowsStore.timeWarpDirection === 'future' ? 'WARPING TO 2026' : 'RETURNING TO 1995' }}
        </h1>
        <div class="hud-progress-bar">
          <div class="hud-progress-fill"></div>
        </div>
        <p class="hud-sub">
          {{ windowsStore.timeWarpDirection === 'future' 
              ? 'Loading Ultra-Modern Portfolio Architecture...' 
              : 'Restoring 16-bit Desktop Environment...' }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.time-warp-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999999;
  background: #05070f;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  user-select: none;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.warp-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.hud-center {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.vortex-ring {
  position: absolute;
  width: 380px;
  height: 380px;
  border-radius: 50%;
  border: 2px dashed rgba(16, 185, 129, 0.5);
  animation: spin 3s linear infinite;
  box-shadow: 0 0 60px rgba(16, 185, 129, 0.35), inset 0 0 60px rgba(52, 211, 153, 0.25);
  pointer-events: none;
}

@keyframes spin {
  from { transform: rotate(0deg) scale(0.9); }
  50% { transform: rotate(180deg) scale(1.1); }
  to { transform: rotate(360deg) scale(0.9); }
}

.hud-box {
  background: rgba(10, 20, 15, 0.9);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(16, 185, 129, 0.5);
  box-shadow: 0 0 50px rgba(16, 185, 129, 0.35);
  border-radius: 16px;
  padding: 32px 48px;
  text-align: center;
  max-width: 90vw;
  animation: pulseHud 1.2s ease-in-out infinite alternate;
}

@keyframes pulseHud {
  from { box-shadow: 0 0 30px rgba(16, 185, 129, 0.3); }
  to { box-shadow: 0 0 60px rgba(52, 211, 153, 0.5); }
}

.hud-badge {
  display: inline-block;
  background: rgba(16, 185, 129, 0.15);
  color: #34d399;
  border: 1px solid rgba(52, 211, 153, 0.5);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2.5px;
  padding: 4px 12px;
  border-radius: 9999px;
  margin-bottom: 12px;
  text-transform: uppercase;
}

.hud-title {
  color: #ffffff;
  font-size: 32px;
  font-weight: 900;
  letter-spacing: 2px;
  margin: 0 0 16px 0;
  background: linear-gradient(135deg, #ffffff 0%, #34d399 50%, #10b981 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 20px rgba(16, 185, 129, 0.5);
}

.hud-progress-bar {
  width: 280px;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 9999px;
  overflow: hidden;
  margin: 0 auto 14px auto;
}

.hud-progress-fill {
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #059669, #10b981, #6ee7b7);
  animation: progressFill 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes progressFill {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(0%); }
}

.hud-sub {
  color: #94a3b8;
  font-size: 13px;
  letter-spacing: 0.5px;
  margin: 0;
}
</style>
