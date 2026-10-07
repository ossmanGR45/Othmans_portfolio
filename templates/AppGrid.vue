<script setup>
import {useWindowsStore} from '@/stores/windows'
import { onMounted } from 'vue';

const windowsStore = useWindowsStore()

const gridHeight = ref("")

const openWindow = (windowId) => {
    if (windowId === 'FutureWindow') {
        windowsStore.triggerTimeWarp('future');
        return;
    }
    const payload = {
        windowState: "open",
        windowId: windowId
    }
    windowsStore.setWindowState(payload)
}

let lastClickTime = 0
let lastClickedId = null

const handleClick = (windowId) => {
    const now = Date.now()
    if (lastClickedId === windowId && now - lastClickTime < 500) {
        openWindow(windowId)
        lastClickedId = null
    } else {
        lastClickedId = windowId
        lastClickTime = now
    }
}

const openGithub = () => {
    window.open("https://github.com/ossmanGR45");
}

const getImagePath = (iconImage) => {
    if (!iconImage) return '';
    const path = `../assets/win95Icons/${iconImage}`;
    const modules = import.meta.glob("../assets/win95Icons/*", { eager: true });
    const mod = modules[path]
    return mod ? mod.default : '';
};

onMounted(() => {
    let gridH = windowsStore.getFullscreenWindowHeight
    gridHeight.value = gridH.substring(0, gridH.length - 2) - 60 + "px"
})
</script>

<template>
    <nav class="grid-container" :style="{ height: gridHeight }">
    <li v-for="window in windowsStore.windows" :key="window.windowId || window.key">
      <button
        class="icon"
        :class="{ 'future-icon-pulse': window.windowId === 'FutureWindow' }"
        v-if="window.showInAppGrid != false"
        @click="handleClick(window.windowId)"
        @touchstart="openWindow(window.windowId)"
        @dblclick="openWindow(window.windowId)"
        :title="window.altText || window.displayName"
      >
      <img class="icon-image" :src="getImagePath(window.iconImage)" :alt="window.altText" />
        <div class="border-box">
          <p class="icon-text">
            {{ window.displayName }}
          </p>
        </div>
      </button>
    </li>
  </nav>
</template>

<style scoped>
.future-icon-pulse {
  position: relative;
}

.future-icon-pulse .icon-image {
  filter: drop-shadow(0 0 6px rgba(0, 240, 255, 0.7));
  animation: cosmicPulse 2.5s ease-in-out infinite;
}

.future-icon-pulse .icon-text {
  color: #00ffff !important;
  text-shadow: 0 0 4px rgba(0, 240, 255, 0.8);
  font-weight: bold;
}

@keyframes cosmicPulse {
  0% { transform: scale(1); filter: drop-shadow(0 0 4px rgba(0, 240, 255, 0.6)); }
  50% { transform: scale(1.1); filter: drop-shadow(0 0 10px rgba(255, 0, 128, 0.9)); }
  100% { transform: scale(1); filter: drop-shadow(0 0 4px rgba(0, 240, 255, 0.6)); }
}
</style>