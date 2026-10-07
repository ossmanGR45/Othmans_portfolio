<script setup>
import { defineEmits } from 'vue'

const emit = defineEmits(['open'])

const enterPortal = () => {
  emit('open')
}
</script>

<template>
  <div class="portal-wrapper" @click="enterPortal" title="Click to enter the 2026 Future Portal">
    <!-- Outer energy rings -->
    <div class="portal-ring ring-outer"></div>
    <div class="portal-ring ring-mid"></div>
    <div class="portal-ring ring-inner"></div>

    <!-- Swirling core vortex -->
    <div class="portal-core">
      <div class="portal-swirl"></div>
      <div class="portal-spark"></div>
      <div class="portal-center-icon">🌀</div>
    </div>

    <!-- Holographic Retro-Future Badge -->
    <div class="portal-badge">
      <div class="portal-tag">
        <span class="portal-dot"></span>
        TEMPORAL GATEWAY
      </div>
      <div class="portal-title">Take Me to the Future</div>
      <div class="portal-desc">Enter 2026 Edition ➔</div>
    </div>
  </div>
</template>

<style scoped>
.portal-wrapper {
  position: absolute;
  top: 48%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 6;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  font-family: 'MS Sans Serif', Tahoma, sans-serif;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.portal-wrapper:hover {
  transform: translate(-50%, -50%) scale(1.08);
}

/* Concentric rotating energy rings */
.portal-ring {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}

.ring-outer {
  width: 140px;
  height: 140px;
  border: 2px dashed rgba(16, 185, 129, 0.7);
  box-shadow: 0 0 25px rgba(16, 185, 129, 0.4), inset 0 0 25px rgba(52, 211, 153, 0.25);
  animation: spinCw 10s linear infinite;
}

.ring-mid {
  width: 110px;
  height: 110px;
  border: 2px dotted rgba(52, 211, 153, 0.85);
  box-shadow: 0 0 20px rgba(52, 211, 153, 0.5);
  animation: spinCcw 6s linear infinite;
}

.ring-inner {
  width: 82px;
  height: 82px;
  border: 1.5px solid rgba(110, 231, 183, 0.9);
  animation: spinCw 4s linear infinite;
}

/* Swirling core */
.portal-core {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: radial-gradient(circle, #6ee7b7 0%, #10b981 40%, #064e3b 80%, #022c22 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 35px rgba(16, 185, 129, 0.8), 0 0 60px rgba(52, 211, 153, 0.5);
  position: relative;
  overflow: hidden;
  animation: pulseCore 2.5s ease-in-out infinite alternate;
}

.portal-swirl {
  position: absolute;
  inset: -10px;
  background: conic-gradient(from 0deg, transparent, rgba(255, 255, 255, 0.6), transparent 60%);
  animation: spinCw 2s linear infinite;
}

.portal-center-icon {
  position: relative;
  z-index: 2;
  font-size: 28px;
  filter: drop-shadow(0 0 6px #ffffff);
  animation: spinCcw 4s linear infinite;
}

/* Badge card below portal */
.portal-badge {
  margin-top: 18px;
  background: rgba(10, 24, 18, 0.92);
  border: 1.5px solid #10b981;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.6), 0 0 20px rgba(16, 185, 129, 0.4);
  padding: 6px 14px;
  border-radius: 6px;
  text-align: center;
  backdrop-filter: blur(8px);
}

.portal-tag {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: 9px;
  font-weight: bold;
  letter-spacing: 1.5px;
  color: #34d399;
  text-transform: uppercase;
}

.portal-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #34d399;
  box-shadow: 0 0 6px #34d399;
  animation: blink 1s infinite alternate;
}

.portal-title {
  color: #ffffff;
  font-weight: bold;
  font-size: 13px;
  margin: 2px 0 1px 0;
  text-shadow: 0 0 8px rgba(16, 185, 129, 0.8);
  letter-spacing: 0.5px;
}

.portal-desc {
  color: #a7f3d0;
  font-size: 10px;
  font-weight: 500;
}

/* Animations */
@keyframes spinCw {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes spinCcw {
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
}

@keyframes pulseCore {
  from { transform: scale(0.96); box-shadow: 0 0 25px rgba(16, 185, 129, 0.7); }
  to { transform: scale(1.06); box-shadow: 0 0 45px rgba(52, 211, 153, 0.95); }
}

@keyframes blink {
  from { opacity: 0.4; }
  to { opacity: 1; }
}
</style>
