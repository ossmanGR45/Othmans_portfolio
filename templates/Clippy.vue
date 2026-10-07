<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useWindowsStore } from '@/stores/windows'

const windowsStore = useWindowsStore()

// Visibility & mode
const isMinimized = ref(false)
const isClosed = ref(false)
const isBlinking = ref(false)
const isWiggling = ref(false)

// Eye pupil tracking
const pupilOffset = ref({ x: 0, y: 0 })

// Dialogue states
const dialogMode = ref('greeting') // 'greeting', 'fact', 'dismissed', 'mined'
const currentFactIndex = ref(0)

const funFacts = [
  "Did you know? Othman qualified and competed in both ICPC 2023 and 2024!",
  "Othman specializes in full-stack engineering with C# (ASP.NET Core) and cross-platform apps with Dart (Flutter)!",
  "Tip: You can drag, resize, and minimize windows just like in real Windows 95!",
  "Fun fact: Double-clicking any window's title bar toggles fullscreen!",
  "Othman graduated from the University of Jordan and engineered enterprise risk assessment systems!",
  "It looks like your company has open engineering positions. Othman happens to be looking for great opportunities!",
  "Need to reach out? The Mail icon on the desktop or Start menu sends messages directly!"
]

const currentFact = ref(funFacts[0])

// Blink animation timer
let blinkTimer = null
let lookTimer = null

onMounted(() => {
  // Check if previously dismissed in session
  const storedClosed = sessionStorage.getItem('win95-clippy-closed')
  if (storedClosed === 'true') {
    isMinimized.value = true
  }

  // Periodic blinking
  blinkTimer = setInterval(() => {
    isBlinking.value = true
    setTimeout(() => {
      isBlinking.value = false
    }, 200)
  }, 4000)

  // Subtle wandering gaze
  lookTimer = setInterval(() => {
    const rx = (Math.random() - 0.5) * 5
    const ry = (Math.random() - 0.5) * 4
    pupilOffset.value = { x: rx, y: ry }
  }, 3000)
})

onUnmounted(() => {
  if (blinkTimer) clearInterval(blinkTimer)
  if (lookTimer) clearInterval(lookTimer)
})

// Actions
const triggerWiggle = () => {
  isWiggling.value = true
  setTimeout(() => {
    isWiggling.value = false
  }, 600)
}

const onClippyClick = () => {
  triggerWiggle()
  if (isMinimized.value) {
    isMinimized.value = false
    dialogMode.value = 'greeting'
  } else {
    nextFact()
  }
}

const nextFact = () => {
  dialogMode.value = 'fact'
  currentFactIndex.value = (currentFactIndex.value + 1) % funFacts.length
  currentFact.value = funFacts[currentFactIndex.value]
}

const openWindow = (windowId) => {
  windowsStore.setWindowState({
    windowState: 'open',
    windowId: windowId
  })
  windowsStore.setActiveWindow(windowId)
  windowsStore.zIndexIncrement(windowId)
}

const minimizeClippy = () => {
  isMinimized.value = true
}

const closeClippy = () => {
  isClosed.value = true
  sessionStorage.setItem('win95-clippy-closed', 'true')
}

const restoreClippy = () => {
  isClosed.value = false
  isMinimized.value = false
  sessionStorage.removeItem('win95-clippy-closed', 'true')
  dialogMode.value = 'greeting'
}

defineExpose({
  restoreClippy
})
</script>

<template>
  <div v-if="!isClosed" class="clippy-container" :class="{ 'clippy-minimized': isMinimized }">
    <!-- Speech Bubble (when not minimized) -->
    <div v-if="!isMinimized" class="clippy-bubble">
      <!-- Title bar with controls -->
      <div class="bubble-header">
        <span class="bubble-title">📎 Assistant</span>
        <div class="bubble-controls">
          <button class="bubble-ctrl-btn" @click="minimizeClippy" title="Minimize">_</button>
          <button class="bubble-ctrl-btn" @click="closeClippy" title="Close">×</button>
        </div>
      </div>

      <!-- Dialogue body -->
      <div class="bubble-body">
        <template v-if="dialogMode === 'greeting'">
          <p class="greeting-text">
            It looks like you're browsing <b>Othman's Portfolio</b>.
          </p>
          <p class="sub-greeting">
            Would you like some help finding what you're looking for?
          </p>
          <div class="clippy-options">
            <button class="clippy-option-btn future-btn" @click="windowsStore.triggerTimeWarp('future')">
              🚀 Take me to the Future!
            </button>
            <button class="clippy-option-btn" @click="openWindow('ProjectsWindow')">
              💼 View Projects
            </button>
            <button class="clippy-option-btn" @click="openWindow('ResumeWindow')">
              📄 Check Résumé
            </button>
            <button class="clippy-option-btn" @click="openWindow('MinesweeperWindow')">
              💣 Play Minesweeper
            </button>
            <button class="clippy-option-btn" @click="openWindow('ICPC2024Window')">
              🏆 ICPC Achievements
            </button>
            <button class="clippy-option-btn" @click="openWindow('MailWindow')">
              ✉️ Send Message
            </button>
            <button class="clippy-option-btn fact-btn" @click="nextFact">
              💡 Tell me a fun fact!
            </button>
          </div>
        </template>

        <template v-else-if="dialogMode === 'fact'">
          <p class="fact-text">
            {{ currentFact }}
          </p>
          <div class="clippy-options">
            <button class="clippy-option-btn fact-btn" @click="nextFact">
              💡 Another fact!
            </button>
            <button class="clippy-option-btn" @click="openWindow('ProjectsWindow')">
              💼 See Projects
            </button>
            <button class="clippy-option-btn" @click="openWindow('MinesweeperWindow')">
              💣 Play Minesweeper
            </button>
            <button class="clippy-option-btn" @click="dialogMode = 'greeting'">
              🔙 Back to menu
            </button>
          </div>
        </template>
      </div>

      <!-- Bubble pointer tail -->
      <div class="bubble-tail"></div>
    </div>

    <!-- Clippy Avatar -->
    <div 
      class="clippy-character" 
      :class="{ 'wiggle-anim': isWiggling }"
      @click="onClippyClick"
      title="Click me for tips and trivia!"
    >
      <svg class="clippy-svg" viewBox="0 0 100 125" width="85" height="106">
        <defs>
          <radialGradient id="clippy-metal" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#ffffff" />
            <stop offset="25%" stop-color="#d6dadf" />
            <stop offset="65%" stop-color="#8f96a3" />
            <stop offset="100%" stop-color="#555a64" />
          </radialGradient>

          <filter id="clippy-shadow" x="-20%" y="-20%" width="150%" height="150%">
            <feDropShadow dx="2" dy="3" stdDeviation="2" flood-color="#000" flood-opacity="0.35" />
          </filter>
        </defs>

        <!-- Paperclip wire loop -->
        <g filter="url(#clippy-shadow)">
          <!-- Outer loop path -->
          <path
            d="M 50,115
               C 32,115 22,98 22,70
               C 22,38 35,12 60,12
               C 78,12 88,24 88,44
               C 88,68 76,96 56,96
               C 42,96 34,85 34,68
               C 34,48 42,32 58,32
               C 70,32 76,40 76,52
               C 76,64 68,76 56,76
               C 48,76 44,70 44,62"
            fill="none"
            stroke="url(#clippy-metal)"
            stroke-width="7.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>

        <!-- Left Eyebrow -->
        <path
          d="M 33,26 Q 44,20 52,24"
          fill="none"
          stroke="#1a1a1a"
          stroke-width="2.8"
          stroke-linecap="round"
        />

        <!-- Right Eyebrow -->
        <path
          d="M 64,23 Q 74,18 83,25"
          fill="none"
          stroke="#1a1a1a"
          stroke-width="2.8"
          stroke-linecap="round"
        />

        <!-- Left Eye Sclera -->
        <ellipse cx="44" cy="36" rx="9" ry="12" fill="#ffffff" stroke="#1f2421" stroke-width="2" />
        <!-- Left Eye Pupil -->
        <template v-if="!isBlinking">
          <ellipse 
            :cx="45 + pupilOffset.x" 
            :cy="37 + pupilOffset.y" 
            rx="4.2" 
            ry="5.5" 
            fill="#111111" 
          />
          <circle 
            :cx="43 + pupilOffset.x" 
            :cy="34 + pupilOffset.y" 
            r="1.8" 
            fill="#ffffff" 
          />
        </template>
        <line v-else x1="36" y1="36" x2="52" y2="36" stroke="#111" stroke-width="2.5" stroke-linecap="round" />

        <!-- Right Eye Sclera -->
        <ellipse cx="69" cy="35" rx="9" ry="12" fill="#ffffff" stroke="#1f2421" stroke-width="2" />
        <!-- Right Eye Pupil -->
        <template v-if="!isBlinking">
          <ellipse 
            :cx="70 + pupilOffset.x" 
            :cy="36 + pupilOffset.y" 
            rx="4.2" 
            ry="5.5" 
            fill="#111111" 
          />
          <circle 
            :cx="68 + pupilOffset.x" 
            :cy="33 + pupilOffset.y" 
            r="1.8" 
            fill="#ffffff" 
          />
        </template>
        <line v-else x1="61" y1="35" x2="77" y2="35" stroke="#111" stroke-width="2.5" stroke-linecap="round" />
      </svg>

      <!-- Minimized Label Badge -->
      <div v-if="isMinimized" class="minimized-badge">
        <span>📎 Clippy</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.clippy-container {
  position: absolute;
  right: 18px;
  bottom: 45px;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-family: 'MS Sans Serif', Tahoma, sans-serif;
  user-select: none;
  pointer-events: auto;
}

/* Bubble Styling */
.clippy-bubble {
  position: relative;
  background: #ffffe1;
  border: 1px solid #000;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.35);
  border-radius: 4px;
  width: 230px;
  margin-bottom: 8px;
  padding: 0;
  font-size: 11px;
  animation: popIn 0.25s ease-out;
}

@keyframes popIn {
  from {
    transform: scale(0.85);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.bubble-header {
  background: #000080;
  color: white;
  padding: 2px 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;
  font-weight: bold;
}

.bubble-title {
  display: flex;
  align-items: center;
  gap: 3px;
}

.bubble-controls {
  display: flex;
  gap: 3px;
}

.bubble-ctrl-btn {
  background: #c0c0c0;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #000;
  border-bottom: 1px solid #000;
  color: #000;
  font-size: 10px;
  line-height: 8px;
  width: 14px;
  height: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
}

.bubble-body {
  padding: 8px 10px;
  color: #000;
}

.greeting-text {
  font-size: 12px;
  margin-bottom: 3px;
}

.sub-greeting {
  font-size: 11px;
  color: #333;
  margin-bottom: 8px;
}

.fact-text {
  font-size: 11px;
  line-height: 1.4;
  margin-bottom: 8px;
  color: #111;
  background: #fff8c4;
  padding: 6px;
  border: 1px dashed #cca000;
  border-radius: 2px;
}

.clippy-options {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.clippy-option-btn {
  background: #f0f0f0;
  border: 1px solid #707070;
  padding: 3px 6px;
  text-align: left;
  font-size: 11px;
  cursor: pointer;
  border-radius: 2px;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: background 0.15s, border-color 0.15s;
}

.clippy-option-btn:hover {
  background: #000080;
  color: #ffffff;
  border-color: #000080;
}

.fact-btn {
  background: #fff2b2;
  border-color: #d8b800;
  font-weight: bold;
}

.fact-btn:hover {
  background: #000080;
  color: white;
}

.future-btn {
  background: linear-gradient(90deg, #e0f2fe, #f3e8ff);
  border-color: #0284c7;
  font-weight: bold;
  color: #0369a1;
}

.future-btn:hover {
  background: linear-gradient(90deg, #0284c7, #7c3aed);
  border-color: #0284c7;
  color: #ffffff;
}

/* Pointer tail pointing down to Clippy */
.bubble-tail {
  position: absolute;
  bottom: -9px;
  right: 32px;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 9px solid #000;
}

.bubble-tail::after {
  content: '';
  position: absolute;
  top: -10px;
  left: -7px;
  width: 0;
  height: 0;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-top: 8px solid #ffffe1;
}

/* Character Avatar */
.clippy-character {
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3));
  transition: transform 0.2s;
}

.clippy-character:hover {
  transform: translateY(-2px) scale(1.03);
}

.clippy-svg {
  display: block;
  user-select: none;
}

.wiggle-anim {
  animation: wiggle 0.6s ease-in-out;
}

@keyframes wiggle {
  0% { transform: rotate(0deg); }
  20% { transform: rotate(-10deg) scale(1.08); }
  40% { transform: rotate(10deg) scale(1.08); }
  60% { transform: rotate(-6deg); }
  80% { transform: rotate(4deg); }
  100% { transform: rotate(0deg); }
}

.minimized-badge {
  background: #c0c0c0;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #000;
  border-bottom: 1px solid #000;
  font-size: 10px;
  font-weight: bold;
  padding: 1px 4px;
  margin-top: 2px;
}
</style>
