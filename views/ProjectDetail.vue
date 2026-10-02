<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  projectData: {
    type: Object,
    required: true,
    default: () => ({})
  },
  windowId: {
    type: String,
    default: ''
  }
});

const copied = ref(false);

const cloneCommand = computed(() => {
  if (props.projectData?.repoUrl) {
    return `git clone ${props.projectData.repoUrl}.git`;
  }
  return '';
});

const copyCloneCommand = async () => {
  if (!cloneCommand.value) return;
  try {
    await navigator.clipboard.writeText(cloneCommand.value);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2500);
  } catch (err) {
    console.error('Failed to copy', err);
  }
};

const openRepo = () => {
  if (props.projectData?.repoUrl) {
    window.open(props.projectData.repoUrl, '_blank');
  }
};

const openZip = () => {
  if (props.projectData?.repoUrl) {
    const branch = props.projectData.defaultBranch || 'main';
    window.open(`${props.projectData.repoUrl}/archive/refs/heads/${branch}.zip`, '_blank');
  }
};

const getImagePath = (iconImage) => {
  if (!iconImage) return '';
  const path = `../assets/win95Icons/${iconImage}`;
  const modules = import.meta.glob('../assets/win95Icons/*', { eager: true });
  const mod = modules[path];
  return mod ? mod.default : '';
};
</script>

<template>
  <div class="project-window-content">
    <!-- Win95 Retro Action Toolbar -->
    <div class="action-bar">
      <button class="win-btn" @click="openRepo" title="Open repository in new tab">
        <span class="btn-inner">
          <span class="btn-icon">🌐</span>
          <span>Open on GitHub</span>
        </span>
      </button>

      <button class="win-btn" @click="copyCloneCommand" title="Copy git clone command">
        <span class="btn-inner">
          <span class="btn-icon">📋</span>
          <span>{{ copied ? 'Copied!' : 'Copy Clone URL' }}</span>
        </span>
      </button>

      <button class="win-btn" @click="openZip" title="Download repository source as ZIP archive">
        <span class="btn-inner">
          <span class="btn-icon">📦</span>
          <span>Download ZIP</span>
        </span>
      </button>

      <button class="win-btn" @click="openRepo" title="Star repository on GitHub">
        <span class="btn-inner">
          <span class="btn-icon">⭐</span>
          <span>Star</span>
        </span>
      </button>
    </div>

    <!-- Notification Alert for Copy -->
    <div v-if="copied" class="copy-alert">
      ✓ Command copied to clipboard: <code>{{ cloneCommand }}</code>
    </div>

    <!-- Main Inset Display Box -->
    <div class="inset-scroll-box">
      <!-- Header Banner -->
      <div class="project-header">
        <img 
          :src="getImagePath(projectData.iconImage)" 
          :alt="projectData.title" 
          class="project-main-icon" 
        />
        <div class="project-header-text">
          <h2 class="project-title">{{ projectData.title }}</h2>
          <p class="project-subtitle">{{ projectData.subtitle }}</p>
          <div class="meta-pills">
            <span class="pill pill-lang" :style="{ borderColor: projectData.languageColor || '#000080' }">
              <span class="pill-dot" :style="{ backgroundColor: projectData.languageColor || '#000080' }"></span>
              {{ projectData.language || 'Code' }}
            </span>
            <span class="pill pill-branch">Branch: {{ projectData.defaultBranch || 'main' }}</span>
            <span class="pill pill-visibility">Public Repository</span>
            <span v-if="projectData.sizeBytes" class="pill pill-size">
              {{ (projectData.sizeBytes / 1024).toFixed(0) }} KB
            </span>
          </div>
        </div>
      </div>

      <div class="retro-divider"></div>

      <!-- Overview Section -->
      <div class="section-block">
        <h3 class="section-title">📌 Project Overview</h3>
        <p class="section-text leading-relaxed">
          {{ projectData.summary }}
        </p>
      </div>

      <!-- Key Features Section -->
      <div v-if="projectData.features && projectData.features.length" class="section-block">
        <h3 class="section-title">⚡ Key Highlights & Architecture</h3>
        <ul class="features-list">
          <li v-for="(feat, index) in projectData.features" :key="index" class="feature-item">
            <span class="bullet-retro">►</span>
            <span>{{ feat }}</span>
          </li>
        </ul>
      </div>

      <!-- Tech Stack Badges -->
      <div v-if="projectData.tags && projectData.tags.length" class="section-block">
        <h3 class="section-title">🛠️ Technologies & Libraries</h3>
        <div class="tags-container">
          <span v-for="tag in projectData.tags" :key="tag" class="tech-tag">
            {{ tag }}
          </span>
        </div>
      </div>

      <!-- MS-DOS Clone Command Inset Box -->
      <div class="section-block">
        <h3 class="section-title">💻 Clone & Run Locally</h3>
        <div class="dos-box">
          <div class="dos-bar">
            <span>MS-DOS Prompt (Command Line)</span>
            <button class="dos-copy-btn" @click="copyCloneCommand">Copy</button>
          </div>
          <div class="dos-terminal">
            <div class="dos-line"><span class="dos-prompt">C:\PROJECTS&gt;</span> {{ cloneCommand }}</div>
            <div v-for="(cmd, i) in (projectData.quickstart || [])" :key="i" class="dos-line">
              <span class="dos-prompt">C:\PROJECTS&gt;</span> {{ cmd }}
            </div>
            <div class="dos-line dos-cursor-line">
              <span class="dos-prompt">C:\PROJECTS&gt;</span> <span class="dos-cursor">_</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Repository Link Footer Box -->
      <div class="repo-link-box">
        <p class="repo-link-text">
          Source code hosted on GitHub:
          <a :href="projectData.repoUrl" target="_blank" class="github-link">
            {{ projectData.repoUrl }} ↗
          </a>
        </p>
      </div>
    </div>

    <!-- Win95 Status Bar -->
    <div class="win-status-bar">
      <div class="status-cell cell-ready">Ready</div>
      <div class="status-cell cell-info">{{ projectData.language || 'Source' }}</div>
      <div class="status-cell cell-info">ossmanGR45/{{ projectData.repoName }}</div>
    </div>
  </div>
</template>

<style scoped>
.project-window-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: rgb(192, 192, 192);
  font-family: "MS Sans Serif", Tahoma, sans-serif;
  color: black;
  box-sizing: border-box;
}

/* Win95 Action Toolbar */
.action-bar {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
  padding: 4px 6px;
  background: rgb(192, 192, 192);
  border-bottom: 1px solid rgb(128, 128, 128);
}

.win-btn {
  background: rgb(192, 192, 192);
  border-top: 1.5px solid rgb(255, 255, 255);
  border-left: 1.5px solid rgb(255, 255, 255);
  border-right: 1.5px solid rgb(90, 90, 90);
  border-bottom: 1.5px solid rgb(90, 90, 90);
  box-shadow: 1px 1px 0px black;
  padding: 2px 6px;
  font-size: 11px;
  font-family: inherit;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
}

.win-btn:active {
  border-top: 1.5px solid rgb(0, 0, 0);
  border-left: 1.5px solid rgb(0, 0, 0);
  border-right: 1.5px solid rgb(255, 255, 255);
  border-bottom: 1.5px solid rgb(255, 255, 255);
  box-shadow: none;
  background: rgb(180, 180, 180);
}

.btn-inner {
  display: flex;
  align-items: center;
  gap: 4px;
}

.btn-icon {
  font-size: 12px;
}

.copy-alert {
  background: rgb(255, 255, 204);
  color: rgb(0, 102, 0);
  border: 1px solid rgb(180, 180, 100);
  padding: 4px 8px;
  font-size: 11px;
  margin: 4px 6px;
}

.copy-alert code {
  background: white;
  padding: 1px 4px;
  border: 1px solid rgb(200, 200, 200);
  font-family: "Courier New", monospace;
  font-size: 10px;
}

/* Inset Scrolling Content Box */
.inset-scroll-box {
  flex-grow: 1;
  background: white;
  border-top: 2px solid rgb(128, 128, 128);
  border-left: 2px solid rgb(128, 128, 128);
  border-right: 2px solid rgb(255, 255, 255);
  border-bottom: 2px solid rgb(255, 255, 255);
  box-shadow: inset 1px 1px 0px black;
  margin: 4px 6px;
  padding: 12px 14px;
  overflow-y: auto;
  min-height: 250px;
}

/* Header */
.project-header {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 12px;
}

.project-main-icon {
  width: 36px;
  height: 36px;
  image-rendering: pixelated;
  flex-shrink: 0;
  margin-top: 2px;
}

.project-header-text {
  flex-grow: 1;
}

.project-title {
  font-size: 16px;
  font-weight: bold;
  margin: 0;
  color: black;
}

.project-subtitle {
  font-size: 11px;
  color: rgb(80, 80, 80);
  margin: 2px 0 6px 0;
}

.meta-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.pill {
  font-size: 10px;
  padding: 1px 6px;
  background: rgb(240, 240, 240);
  border: 1px solid rgb(180, 180, 180);
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.pill-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  display: inline-block;
}

.retro-divider {
  height: 2px;
  border-top: 1px solid rgb(128, 128, 128);
  border-bottom: 1px solid rgb(255, 255, 255);
  margin: 12px 0;
}

/* Section Blocks */
.section-block {
  margin-bottom: 14px;
}

.section-title {
  font-size: 12px;
  font-weight: bold;
  margin: 0 0 6px 0;
  color: rgb(0, 0, 128);
  text-decoration: underline;
}

.section-text {
  font-size: 11px;
  line-height: 1.5;
  color: rgb(30, 30, 30);
  margin: 0;
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-item {
  font-size: 11px;
  line-height: 1.5;
  color: rgb(30, 30, 30);
  margin-bottom: 4px;
  display: flex;
  align-items: flex-start;
  gap: 6px;
}

.bullet-retro {
  color: rgb(0, 0, 128);
  font-size: 9px;
  margin-top: 2px;
}

/* Tech Tags */
.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.tech-tag {
  background: rgb(230, 235, 245);
  border: 1px solid rgb(160, 175, 205);
  font-size: 10px;
  padding: 2px 7px;
  color: rgb(0, 30, 90);
  font-family: inherit;
  font-weight: bold;
}

/* DOS Command Terminal Box */
.dos-box {
  background: black;
  color: #00ff66;
  font-family: "Courier New", Courier, monospace;
  font-size: 11px;
  border: 2px solid rgb(128, 128, 128);
  margin-top: 6px;
}

.dos-bar {
  background: rgb(0, 0, 128);
  color: white;
  padding: 2px 6px;
  font-size: 10px;
  font-family: "MS Sans Serif", Tahoma, sans-serif;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dos-copy-btn {
  background: rgb(192, 192, 192);
  color: black;
  border: 1px solid black;
  font-size: 9px;
  padding: 1px 4px;
  cursor: pointer;
}

.dos-terminal {
  padding: 8px 10px;
  background: black;
}

.dos-line {
  line-height: 1.4;
  word-break: break-all;
}

.dos-prompt {
  color: #ffff33;
}

.dos-cursor {
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  50% { opacity: 0; }
}

/* Repo Link Footer Box */
.repo-link-box {
  background: rgb(245, 245, 245);
  border: 1px dashed rgb(180, 180, 180);
  padding: 6px 10px;
  margin-top: 10px;
  font-size: 11px;
}

.repo-link-text {
  margin: 0;
}

.github-link {
  color: rgb(0, 0, 200);
  font-weight: bold;
  text-decoration: underline;
}

/* Win95 Status Bar */
.win-status-bar {
  display: flex;
  flex-direction: row;
  height: 20px;
  border-top: 1.5px solid rgb(255, 255, 255);
  background: rgb(192, 192, 192);
  padding: 1px 2px;
  font-size: 11px;
}

.status-cell {
  border-top: 1px solid rgb(128, 128, 128);
  border-left: 1px solid rgb(128, 128, 128);
  border-right: 1px solid rgb(255, 255, 255);
  border-bottom: 1px solid rgb(255, 255, 255);
  padding: 1px 6px;
  display: flex;
  align-items: center;
}

.cell-ready {
  width: 70px;
}

.cell-info {
  flex-grow: 1;
}
</style>
