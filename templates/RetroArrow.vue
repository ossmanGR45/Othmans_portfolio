<script setup>
import { ref, onMounted, watch } from 'vue'
import { useWindowsStore } from '@/stores/windows'

const windowsStore = useWindowsStore()
const isVisible = ref(false)

onMounted(() => {
  // Show arrow only if not previously dismissed
  if (!sessionStorage.getItem('win95-links-arrow-dismissed')) {
    isVisible.value = true
  }
})

const dismiss = () => {
  isVisible.value = false
  sessionStorage.setItem('win95-links-arrow-dismissed', 'true')
}

// Watch for start menu opening, and auto-dismiss the arrow
watch(() => windowsStore.activeWindow, (newVal) => {
  if (newVal === 'Menu') {
    dismiss()
  }
})
</script>

<template>
  <div v-if="isVisible" class="retro-arrow-container">
    <div class="tooltip-bubble">
      <div class="tooltip-header">
        <span>Help</span>
        <button class="close-btn" @click="dismiss">×</button>
      </div>
      <div class="tooltip-body">
        Links here!
      </div>
    </div>
    
    <svg class="arrow-svg" viewBox="0 0 100 100" width="80" height="80">
      <!-- Retro 95 style pixelated red arrow -->
      <!-- We use staircase path commands to draw pixelated edges -->
      <path 
        d="M 80,10 
           H 70 V 15 H 60 V 20 H 50 V 25 H 45 V 30 H 40 V 35 H 35 V 40 H 30 V 45 H 25 V 50 H 20 V 55
           L 10,45 V 75 H 40 L 30,65
           H 35 V 60 H 40 V 55 H 45 V 50 H 50 V 45 H 55 V 40 H 60 V 35 H 65 V 30 H 70 V 25 H 75 V 20 H 80 V 10 Z" 
        fill="#ff0000" 
        stroke="#000000"
        stroke-width="1.5"
        shape-rendering="crispEdges" 
      />
    </svg>
  </div>
</template>

<style scoped>
.retro-arrow-container {
  position: absolute;
  left: 70px;
  bottom: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: auto;
  animation: bobbing 1.5s infinite ease-in-out;
}

/* Tooltip / Help Callout Bubble in Windows 95 Style */
.tooltip-bubble {
  background: rgb(255, 255, 225); /* classic yellow help bubble */
  border: 1px solid black;
  box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.5);
  font-family: "MS Sans Serif", monospace;
  font-size: 11px;
  color: black;
  width: 90px;
  margin-bottom: 5px;
  display: flex;
  flex-direction: column;
  user-select: none;
}

.tooltip-header {
  background: rgb(0, 0, 128); /* Classic blue title bar */
  color: white;
  padding: 1px 3px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 9px;
}

.close-btn {
  background: rgb(192, 192, 192);
  color: black;
  border-top: 1.5px solid white;
  border-left: 1.5px solid white;
  border-right: 1.5px solid rgb(128, 128, 128);
  border-bottom: 1.5px solid rgb(128, 128, 128);
  width: 10px;
  height: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8px;
  cursor: pointer;
  padding: 0;
  line-height: 1;
}

.close-btn:active {
  border-top: 1.5px solid rgb(128, 128, 128);
  border-left: 1.5px solid rgb(128, 128, 128);
  border-right: 1.5px solid white;
  border-bottom: 1.5px solid white;
}

.tooltip-body {
  padding: 4px 6px;
  text-align: center;
  font-weight: bold;
}

.arrow-svg {
  filter: drop-shadow(2px 2px 0px rgba(0, 0, 0, 0.4));
}

@keyframes bobbing {
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  50% {
    transform: translateY(-6px) translateX(6px);
  }
}
</style>
