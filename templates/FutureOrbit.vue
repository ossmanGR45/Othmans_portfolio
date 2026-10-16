<script setup>
import { computed, ref } from 'vue'

defineProps({ motionEnabled: Boolean })
const active = ref(0)
const systems = [
  { name: 'BACKEND', code: '.NET', title: 'Structure beneath the surface.', description: 'Clean architecture, secure APIs, and resilient enterprise systems.', tags: ['C#', 'ASP.NET Core', 'SQL Server'] },
  { name: 'MOBILE', code: 'Flutter', title: 'One codebase. Every screen.', description: 'Reactive, cross-platform experiences with thoughtful state management.', tags: ['Dart', 'Flutter', 'Firebase'] },
  { name: 'ALGORITHMS', code: 'C++', title: 'Complexity, simplified.', description: 'Competitive programming instincts applied to real engineering problems.', tags: ['Graphs', 'Dynamic programming', 'JCPC'] }
]
const selected = computed(() => systems[active.value])
</script>

<template>
  <div class="orbit-console" :class="{ paused: !motionEnabled }">
    <div class="console-label"><span class="signal-dot"></span> ENGINEERING CORE <span>SYS.01</span></div>
    <div class="orbital-scene" aria-hidden="true">
      <div class="orbit-grid"></div>
      <div class="orbit-ring ring-one"></div>
      <div class="orbit-ring ring-two"></div>
      <div class="orbit-ring ring-three"></div>
      <div class="orbit-axis axis-one"></div><div class="orbit-axis axis-two"></div>
      <div class="core-halo"></div>
      <div class="core-sphere"><span>{{ selected.code }}</span><small>ENGINEERING / OQ</small></div>
      <span class="orbital-coordinate coord-top">COMPILE · CREATE · ITERATE</span>
      <span class="orbital-coordinate coord-bottom">{{ String(active + 1).padStart(2, '0') }} / 03 ACTIVE LAYER</span>
    </div>
    <div class="system-tabs" role="group" aria-label="Explore engineering disciplines">
      <button v-for="(system, index) in systems" :key="system.name" :aria-pressed="active === index" @click="active = index"><span>0{{ index + 1 }}</span>{{ system.name }}</button>
    </div>
    <div class="system-detail" aria-live="polite">
      <Transition name="system" mode="out-in">
        <div :key="active"><h2>{{ selected.title }}</h2><p>{{ selected.description }}</p><div class="system-tags"><span v-for="tag in selected.tags" :key="tag">{{ tag }}</span></div></div>
      </Transition>
    </div>
    <div class="console-footer"><span>● EXPLORE THE CORE</span><span>SELECT A LAYER ↑</span></div>
  </div>
</template>

<style scoped>
.orbit-console { position: relative; min-width: 0; background: linear-gradient(145deg, #10231db3, #07110ed9); border: 1px solid #75e8ba30; border-radius: 20px; padding: 22px; box-shadow: 0 24px 100px #0005, inset 0 1px #baf8df12; overflow: hidden; }
.console-label, .console-footer { display: flex; align-items: center; gap: 8px; font: 9px ui-monospace, monospace; letter-spacing: 1.7px; color: #a0c4b5; }
.console-label > span:last-child { margin-left: auto; color: #597b6c; }
.signal-dot { width: 5px; height: 5px; border-radius: 50%; background: #7efbc5; box-shadow: 0 0 10px #7efbc5; }
.orbital-scene { height: 300px; position: relative; display: grid; place-items: center; isolation: isolate; }
.orbit-grid { position: absolute; inset: 0; background-image: linear-gradient(#6aebb00b 1px, transparent 1px), linear-gradient(90deg, #6aebb00b 1px, transparent 1px); background-size: 28px 28px; mask-image: radial-gradient(ellipse, black, transparent 72%); }
.orbit-ring { position: absolute; width: 240px; height: 240px; border: 1px solid #7deab34a; border-radius: 50%; animation: orbit 22s linear infinite; }
.orbit-ring::after { content: ''; position: absolute; top: 31px; left: 31px; width: 7px; height: 7px; background: #b9ffe0; border-radius: 50%; box-shadow: 0 0 16px #5bf6af; }
.ring-two { width: 282px; height: 180px; transform: rotate(-35deg); border-color: #74d3ff45; animation: orbit-slant 18s linear infinite reverse; }
.ring-three { width: 185px; height: 185px; border-style: dashed; border-color: #89d7b630; animation-duration: 40s; }
.orbit-axis { position: absolute; width: 300px; height: 1px; background: linear-gradient(90deg, transparent, #73dfb025, transparent); }
.axis-two { transform: rotate(90deg); }
.core-halo { position: absolute; width: 180px; height: 180px; background: #3beaa61c; filter: blur(30px); animation: breathe 5s ease-in-out infinite; }
.core-sphere { display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 8px; width: 128px; height: 128px; border-radius: 50%; border: 1px solid #91ffce80; background: radial-gradient(circle at 32% 25%, #397b62, #0b3023 48%, #06150f 78%); box-shadow: inset -10px -10px 30px #0008, inset 2px 2px 20px #a4ffcd30, 0 0 55px #27e39b20; }
.core-sphere > span { font: 600 25px ui-monospace, monospace; color: #d0ffeb; letter-spacing: -1px; }
.core-sphere small { font: 6px ui-monospace, monospace; letter-spacing: 1.5px; color: #89c4aa; }
.orbital-coordinate { position: absolute; font: 7px ui-monospace, monospace; letter-spacing: 2px; color: #739b89; }
.coord-top { top: 20px; }.coord-bottom { bottom: 14px; }
.system-tabs { display: flex; gap: 5px; }
.system-tabs button { flex: 1; border: 1px solid #85e9bb20; background: #02150b40; color: #87a598; padding: 11px 3px; border-radius: 6px; font: 8px ui-monospace, monospace; cursor: pointer; transition: background .2s, color .2s, border-color .2s; }
.system-tabs button span { margin-right: 5px; opacity: .5; }
.system-tabs button[aria-pressed=true] { background: #6beeb51a; border-color: #7ffbc77a; color: #b7ffdc; }
.system-tabs button:focus-visible { outline: 2px solid #bdffe2; outline-offset: 3px; }
.system-detail { min-height: 127px; padding: 20px 0 14px; }
.system-detail h2 { color: #e2f6ec; font-size: 16px; margin: 0 0 7px; font-weight: 600; letter-spacing: -.3px; }
.system-detail p { font-size: 12px; line-height: 1.7; color: #8eaa9d; margin: 0 0 13px; }
.system-tags { display: flex; flex-wrap: wrap; gap: 8px; font: 9px ui-monospace, monospace; color: #9ae7c4; }
.system-tags span + span::before { content: '/'; margin-right: 8px; color: #476556; }
.console-footer { justify-content: space-between; border-top: 1px solid #83e5b51a; padding-top: 14px; font-size: 7px; letter-spacing: 1px; color: #708e7f; }
.system-enter-active, .system-leave-active { transition: opacity .16s, transform .16s; }
.system-enter-from { opacity: 0; transform: translateY(5px); }.system-leave-to { opacity: 0; transform: translateY(-5px); }
@keyframes orbit { to { transform: rotate(360deg); } }
@keyframes orbit-slant { from { transform: rotate(-35deg) rotateX(40deg) rotate(0); } to { transform: rotate(-35deg) rotateX(40deg) rotate(360deg); } }
@keyframes breathe { 50% { transform: scale(1.3); opacity: .5; } }
.paused *, .paused *::after { animation-play-state: paused !important; transition: none !important; }
@media (prefers-reduced-motion: reduce) { *, *::after { animation: none !important; transition: none !important; } }
@media (max-width: 400px) { .orbit-console { padding: 16px; }.orbital-scene { height: 270px; }.ring-two { width: 245px; } }
</style>
