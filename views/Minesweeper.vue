<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useWindowsStore } from '@/stores/windows'

const windowsStore = useWindowsStore()

// Game settings / presets
const difficulties = {
  beginner: { rows: 9, cols: 9, mines: 10, label: 'Beginner (9x9)' },
  intermediate: { rows: 16, cols: 16, mines: 40, label: 'Intermediate (16x16)' }
}

const currentDifficulty = ref('beginner')
const rows = computed(() => difficulties[currentDifficulty.value].rows)
const cols = computed(() => difficulties[currentDifficulty.value].cols)
const totalMines = computed(() => difficulties[currentDifficulty.value].mines)

// Board state
// Cell: { row, col, isMine: bool, isRevealed: bool, isFlagged: bool, isQuestion: bool, isExploded: bool, isFalseFlag: bool, neighborMines: number }
const board = ref([])
const gameStatus = ref('ready') // 'ready', 'playing', 'won', 'lost'
const isAnticipating = ref(false) // mouse held down -> smiley shows 😮
const timer = ref(0)
let timerInterval = null
const soundEnabled = ref(true)

// Menu toggles
const showGameMenu = ref(false)
const showHelpMenu = ref(false)
const showWinModal = ref(false)
const showAboutModal = ref(false)

// Web Audio API retro SFX generator
let audioCtx = null
const initAudio = () => {
  if (!audioCtx && typeof window !== 'undefined') {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (AudioContext) audioCtx = new AudioContext()
  }
}

const playBeep = (freq, duration, type = 'square') => {
  if (!soundEnabled.value) return
  try {
    initAudio()
    if (!audioCtx) return
    if (audioCtx.state === 'suspended') audioCtx.resume()
    const osc = audioCtx.createOscillator()
    const gain = audioCtx.createGain()
    osc.type = type
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime)
    gain.gain.setValueAtTime(0.08, audioCtx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration)
    osc.connect(gain)
    gain.connect(audioCtx.destination)
    osc.start()
    osc.stop(audioCtx.currentTime + duration)
  } catch (e) {
    // Audio context may fail if muted or blocked
  }
}

const playBoom = () => {
  if (!soundEnabled.value) return
  try {
    initAudio()
    if (!audioCtx) return
    if (audioCtx.state === 'suspended') audioCtx.resume()
    const osc = audioCtx.createOscillator()
    const gain = audioCtx.createGain()
    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(140, audioCtx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(30, audioCtx.currentTime + 0.4)
    gain.gain.setValueAtTime(0.2, audioCtx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4)
    osc.connect(gain)
    gain.connect(audioCtx.destination)
    osc.start()
    osc.stop(audioCtx.currentTime + 0.4)
  } catch (e) {}
}

const playFanfare = () => {
  if (!soundEnabled.value) return
  const notes = [261.6, 329.6, 392.0, 523.3, 659.3, 783.9]
  notes.forEach((freq, idx) => {
    setTimeout(() => {
      playBeep(freq, 0.12, 'triangle')
    }, idx * 100)
  })
}

// Flags count calculation
const flaggedCount = computed(() => {
  let count = 0
  for (let r = 0; r < rows.value; r++) {
    for (let c = 0; c < cols.value; c++) {
      if (board.value[r] && board.value[r][c] && board.value[r][c].isFlagged) {
        count++
      }
    }
  }
  return count
})

const remainingMines = computed(() => {
  return totalMines.value - flaggedCount.value
})

const formatLedNumber = (num) => {
  if (num < -99) return '-99'
  if (num < 0) {
    return '-' + String(Math.abs(num)).padStart(2, '0')
  }
  return String(Math.min(999, Math.max(0, num))).padStart(3, '0')
}

// Board initialization
const initBoard = () => {
  stopTimer()
  timer.value = 0
  gameStatus.value = 'ready'
  isAnticipating.value = false
  showWinModal.value = false

  const newBoard = []
  for (let r = 0; r < rows.value; r++) {
    const row = []
    for (let c = 0; c < cols.value; c++) {
      row.push({
        row: r,
        col: c,
        isMine: false,
        isRevealed: false,
        isFlagged: false,
        isQuestion: false,
        isExploded: false,
        isFalseFlag: false,
        neighborMines: 0
      })
    }
    newBoard.push(row)
  }
  board.value = newBoard
}

// Plant mines (after first click to guarantee safety)
const plantMines = (safeRow, safeCol) => {
  let placed = 0
  const total = totalMines.value

  while (placed < total) {
    const r = Math.floor(Math.random() * rows.value)
    const c = Math.floor(Math.random() * cols.value)

    // Don't place on safe cell or its immediate neighbors
    const isAdjacentToFirstClick = Math.abs(r - safeRow) <= 1 && Math.abs(c - safeCol) <= 1
    if (!board.value[r][c].isMine && !isAdjacentToFirstClick) {
      board.value[r][c].isMine = true
      placed++
    }
  }

  // Calculate neighbor numbers
  for (let r = 0; r < rows.value; r++) {
    for (let c = 0; c < cols.value; c++) {
      if (!board.value[r][c].isMine) {
        let count = 0
        forEachNeighbor(r, c, (nr, nc) => {
          if (board.value[nr][nc].isMine) count++
        })
        board.value[r][c].neighborMines = count
      }
    }
  }
}

const forEachNeighbor = (r, c, callback) => {
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue
      const nr = r + dr
      const nc = c + dc
      if (nr >= 0 && nr < rows.value && nc >= 0 && nc < cols.value) {
        callback(nr, nc)
      }
    }
  }
}

const startTimer = () => {
  stopTimer()
  timerInterval = setInterval(() => {
    if (timer.value < 999) {
      timer.value++
    }
  }, 1000)
}

const stopTimer = () => {
  if (timerInterval) {
    clearInterval(timerInterval)
    timerInterval = null
  }
}

// Reveal cell
const revealCell = (r, c) => {
  if (gameStatus.value === 'won' || gameStatus.value === 'lost') return

  const cell = board.value[r][c]
  if (cell.isRevealed || cell.isFlagged) return

  // First click setup
  if (gameStatus.value === 'ready') {
    plantMines(r, c)
    gameStatus.value = 'playing'
    startTimer()
  }

  // Hit a mine!
  if (cell.isMine) {
    cell.isExploded = true
    gameOver(false)
    return
  }

  // Safe cell
  cell.isRevealed = true
  playBeep(450, 0.03)

  // Empty cell - cascade flood fill
  if (cell.neighborMines === 0) {
    const queue = [[r, c]]
    while (queue.length > 0) {
      const [currR, currC] = queue.shift()
      forEachNeighbor(currR, currC, (nr, nc) => {
        const neighbor = board.value[nr][nc]
        if (!neighbor.isRevealed && !neighbor.isFlagged && !neighbor.isMine) {
          neighbor.isRevealed = true
          if (neighbor.neighborMines === 0) {
            queue.push([nr, nc])
          }
        }
      })
    }
  }

  checkWin()
}

// Toggle flag (Right click)
const toggleFlag = (r, c, event) => {
  if (event) event.preventDefault()
  if (gameStatus.value === 'won' || gameStatus.value === 'lost') return

  const cell = board.value[r][c]
  if (cell.isRevealed) return

  if (gameStatus.value === 'ready') {
    gameStatus.value = 'playing'
    startTimer()
  }

  if (!cell.isFlagged && !cell.isQuestion) {
    cell.isFlagged = true
    playBeep(600, 0.04)
  } else if (cell.isFlagged) {
    cell.isFlagged = false
    cell.isQuestion = true
    playBeep(700, 0.03)
  } else {
    cell.isQuestion = false
    playBeep(500, 0.03)
  }
}

// Chording: double click or click on revealed number to open neighbors
const handleChording = (r, c) => {
  if (gameStatus.value !== 'playing') return
  const cell = board.value[r][c]
  if (!cell.isRevealed || cell.neighborMines === 0) return

  let flagCount = 0
  forEachNeighbor(r, c, (nr, nc) => {
    if (board.value[nr][nc].isFlagged) flagCount++
  })

  if (flagCount === cell.neighborMines) {
    forEachNeighbor(r, c, (nr, nc) => {
      const neighbor = board.value[nr][nc]
      if (!neighbor.isRevealed && !neighbor.isFlagged) {
        revealCell(nr, nc)
      }
    })
  }
}

const checkWin = () => {
  let unrevealedSafeCells = 0
  for (let r = 0; r < rows.value; r++) {
    for (let c = 0; c < cols.value; c++) {
      const cell = board.value[r][c]
      if (!cell.isMine && !cell.isRevealed) {
        unrevealedSafeCells++
      }
    }
  }

  if (unrevealedSafeCells === 0) {
    gameOver(true)
  }
}

const gameOver = (hasWon) => {
  stopTimer()
  if (hasWon) {
    gameStatus.value = 'won'
    // Flag all remaining mines
    for (let r = 0; r < rows.value; r++) {
      for (let c = 0; c < cols.value; c++) {
        if (board.value[r][c].isMine) {
          board.value[r][c].isFlagged = true
        }
      }
    }
    playFanfare()
    setTimeout(() => {
      showWinModal.value = true
    }, 400)
  } else {
    gameStatus.value = 'lost'
    playBoom()
    // Reveal all mines & mark false flags
    for (let r = 0; r < rows.value; r++) {
      for (let c = 0; c < cols.value; c++) {
        const cell = board.value[r][c]
        if (cell.isMine && !cell.isFlagged) {
          cell.isRevealed = true
        } else if (!cell.isMine && cell.isFlagged) {
          cell.isFalseFlag = true
        }
      }
    }
  }
}

const setDifficulty = (diff) => {
  currentDifficulty.value = diff
  showGameMenu.value = false
  initBoard()
}

// Navigation / Easter egg actions from win modal
const openProjects = () => {
  windowsStore.setWindowState({ windowState: 'open', windowId: 'ProjectsWindow' })
  windowsStore.setActiveWindow('ProjectsWindow')
  windowsStore.zIndexIncrement('ProjectsWindow')
  showWinModal.value = false
}

const openResume = () => {
  windowsStore.setWindowState({ windowState: 'open', windowId: 'ResumeWindow' })
  windowsStore.setActiveWindow('ResumeWindow')
  windowsStore.zIndexIncrement('ResumeWindow')
  showWinModal.value = false
}

const openContact = () => {
  windowsStore.setWindowState({ windowState: 'open', windowId: 'MailWindow' })
  windowsStore.setActiveWindow('MailWindow')
  windowsStore.zIndexIncrement('MailWindow')
  showWinModal.value = false
}

const getNumberColor = (num) => {
  const colors = {
    1: '#0000ff',
    2: '#008000',
    3: '#ff0000',
    4: '#000080',
    5: '#800000',
    6: '#008080',
    7: '#000000',
    8: '#808080'
  }
  return colors[num] || '#000'
}

// Global click dismiss menus
const handleGlobalClick = (e) => {
  if (!e.target.closest('.menu-item')) {
    showGameMenu.value = false
    showHelpMenu.value = false
  }
}

onMounted(() => {
  initBoard()
  window.addEventListener('click', handleGlobalClick)
})

onUnmounted(() => {
  stopTimer()
  window.removeEventListener('click', handleGlobalClick)
})
</script>

<template>
  <div class="minesweeper-app" @mousedown="isAnticipating = true" @mouseup="isAnticipating = false">
    <!-- Menu Bar -->
    <div class="minesweeper-menu-bar">
      <div class="menu-item">
        <button class="menu-btn" @click.stop="showGameMenu = !showGameMenu; showHelpMenu = false">
          <u>G</u>ame
        </button>
        <div v-if="showGameMenu" class="dropdown-menu">
          <div class="menu-entry" @click="initBoard"><u>N</u>ew (F2)</div>
          <div class="menu-separator"></div>
          <div class="menu-entry" :class="{ active: currentDifficulty === 'beginner' }" @click="setDifficulty('beginner')">
            <span class="check">{{ currentDifficulty === 'beginner' ? '✔' : '' }}</span> Beginner
          </div>
          <div class="menu-entry" :class="{ active: currentDifficulty === 'intermediate' }" @click="setDifficulty('intermediate')">
            <span class="check">{{ currentDifficulty === 'intermediate' ? '✔' : '' }}</span> Intermediate
          </div>
          <div class="menu-separator"></div>
          <div class="menu-entry" @click="soundEnabled = !soundEnabled">
            <span class="check">{{ soundEnabled ? '✔' : '' }}</span> <u>S</u>ound Effects
          </div>
        </div>
      </div>

      <div class="menu-item">
        <button class="menu-btn" @click.stop="showHelpMenu = !showHelpMenu; showGameMenu = false">
          <u>H</u>elp
        </button>
        <div v-if="showHelpMenu" class="dropdown-menu">
          <div class="menu-entry" @click="showAboutModal = true; showHelpMenu = false">
            About Minesweeper
          </div>
        </div>
      </div>
    </div>

    <!-- Main Window Inner Frame -->
    <div class="minesweeper-frame">
      <!-- Status Header (LED displays + Smiley) -->
      <div class="status-box inset-bevel">
        <!-- Mine Counter LED -->
        <div class="led-display" title="Mines remaining">
          {{ formatLedNumber(remainingMines) }}
        </div>

        <!-- Smiley Reset Button -->
        <button 
          class="smiley-btn outset-bevel" 
          @click="initBoard"
          :title="gameStatus === 'won' ? 'Awesome! Play again' : 'Reset game'"
        >
          <span v-if="gameStatus === 'won'">😎</span>
          <span v-else-if="gameStatus === 'lost'">😵</span>
          <span v-else-if="isAnticipating">😮</span>
          <span v-else>🙂</span>
        </button>

        <!-- Timer LED -->
        <div class="led-display" title="Time elapsed">
          {{ formatLedNumber(timer) }}
        </div>
      </div>

      <!-- Minesweeper Board Grid -->
      <div class="board-container inset-bevel">
        <div 
          class="board-grid" 
          :style="{
            gridTemplateColumns: `repeat(${cols}, 24px)`,
            gridTemplateRows: `repeat(${rows}, 24px)`
          }"
        >
          <template v-for="(row, r) in board" :key="`r-${r}`">
            <button
              v-for="(cell, c) in row"
              :key="`c-${r}-${c}`"
              class="cell-btn"
              :class="{
                'cell-revealed': cell.isRevealed,
                'cell-hidden': !cell.isRevealed,
                'cell-exploded': cell.isExploded,
                'cell-false-flag': cell.isFalseFlag
              }"
              @click="revealCell(r, c)"
              @contextmenu.prevent="toggleFlag(r, c, $event)"
              @dblclick="handleChording(r, c)"
            >
              <!-- Flagged -->
              <span v-if="cell.isFlagged && !cell.isFalseFlag" class="cell-flag">🚩</span>
              
              <!-- Question Mark -->
              <span v-else-if="cell.isQuestion && !cell.isRevealed" class="cell-question">❓</span>

              <!-- False Flag at Game Over -->
              <span v-else-if="cell.isFalseFlag" class="cell-false">❌</span>

              <!-- Exploded Mine -->
              <span v-else-if="cell.isExploded" class="cell-mine">💥</span>

              <!-- Revealed Mine -->
              <span v-else-if="cell.isRevealed && cell.isMine" class="cell-mine">💣</span>

              <!-- Revealed Number -->
              <span 
                v-else-if="cell.isRevealed && cell.neighborMines > 0" 
                class="cell-number"
                :style="{ color: getNumberColor(cell.neighborMines) }"
              >
                {{ cell.neighborMines }}
              </span>
            </button>
          </template>
        </div>
      </div>
    </div>

    <!-- Win Modal Dialog -->
    <div v-if="showWinModal" class="retro-modal-overlay">
      <div class="retro-modal outset-bevel">
        <div class="modal-title-bar">
          <span>🏆 Minesweeper Champion!</span>
          <button class="modal-close-btn" @click="showWinModal = false">×</button>
        </div>
        <div class="modal-body">
          <div class="modal-icon">😎</div>
          <div class="modal-content">
            <h4 class="font-bold text-sm">Outstanding Job!</h4>
            <p class="text-xs pt-1">
              You cleared all {{ totalMines }} mines in <b>{{ timer }} seconds</b>!
            </p>
            <p class="text-xs pt-2 text-gray-700">
              Just like solving competitive programming riddles in ICPC, this requires sharp logic! Want to inspect Othman's skills or get in touch?
            </p>
            <div class="modal-actions">
              <button class="retro-btn" @click="openProjects">View Projects</button>
              <button class="retro-btn" @click="openResume">Résumé</button>
              <button class="retro-btn" @click="openContact">Contact Othman</button>
              <button class="retro-btn" @click="showWinModal = false">Play Again</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- About Modal Dialog -->
    <div v-if="showAboutModal" class="retro-modal-overlay">
      <div class="retro-modal outset-bevel">
        <div class="modal-title-bar">
          <span>About Minesweeper</span>
          <button class="modal-close-btn" @click="showAboutModal = false">×</button>
        </div>
        <div class="modal-body">
          <div class="modal-icon">💣</div>
          <div class="modal-content">
            <h4 class="font-bold text-sm">Windows 95 Minesweeper</h4>
            <p class="text-xs pt-1">
              Built with Vue 3 & Web Audio API for Othman Qwakneh's portfolio.
            </p>
            <p class="text-xs pt-2 text-gray-700">
              <b>Controls:</b><br/>
              • Left-click to reveal a square<br/>
              • Right-click to place/remove flags 🚩<br/>
              • Double-click a revealed number to quickly clear neighbors ("Chording")<br/>
              • Click the smiley face 🙂 to restart
            </p>
            <div class="modal-actions pt-3">
              <button class="retro-btn" @click="showAboutModal = false">OK</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.minesweeper-app {
  background: #c0c0c0;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  font-family: 'MS Sans Serif', Tahoma, sans-serif;
  user-select: none;
  overflow: auto;
  padding: 6px;
}

/* Menu Bar */
.minesweeper-menu-bar {
  display: flex;
  align-items: center;
  background: #c0c0c0;
  font-size: 12px;
  border-bottom: 1px solid #808080;
  padding-bottom: 3px;
  margin-bottom: 6px;
}

.menu-item {
  position: relative;
}

.menu-btn {
  background: transparent;
  border: none;
  font-size: 12px;
  padding: 2px 6px;
  cursor: default;
  outline: none;
}

.menu-btn:hover {
  background: #000080;
  color: #fff;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: #c0c0c0;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 2px solid #000;
  border-bottom: 2px solid #000;
  box-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  z-index: 100;
  min-width: 150px;
  padding: 2px 0;
}

.menu-entry {
  padding: 3px 18px 3px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;
}

.menu-entry:hover {
  background: #000080;
  color: white;
}

.menu-entry .check {
  position: absolute;
  left: 5px;
  font-size: 10px;
}

.menu-separator {
  height: 1px;
  background: #808080;
  border-bottom: 1px solid #fff;
  margin: 3px 2px;
}

/* Outer Frame */
.minesweeper-frame {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  background: #c0c0c0;
  padding: 6px;
  border-top: 3px solid #fff;
  border-left: 3px solid #fff;
  border-right: 3px solid #808080;
  border-bottom: 3px solid #808080;
}

/* Inset / Outset Bevels */
.inset-bevel {
  border-top: 3px solid #808080;
  border-left: 3px solid #808080;
  border-right: 3px solid #fff;
  border-bottom: 3px solid #fff;
}

.outset-bevel {
  border-top: 2px solid #fff;
  border-left: 2px solid #fff;
  border-right: 2px solid #808080;
  border-bottom: 2px solid #808080;
}

/* Status Header */
.status-box {
  width: 100%;
  box-sizing: border-box;
  background: #c0c0c0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 6px;
  margin-bottom: 6px;
}

/* Digital 7-Segment LED */
.led-display {
  background: #000;
  color: #ff0000;
  font-family: 'Courier New', Courier, monospace;
  font-weight: 900;
  font-size: 22px;
  line-height: 24px;
  letter-spacing: 2px;
  padding: 1px 4px;
  border-top: 1px solid #808080;
  border-left: 1px solid #808080;
  border-right: 1px solid #fff;
  border-bottom: 1px solid #fff;
  width: 48px;
  text-align: right;
  text-shadow: 0 0 4px rgba(255, 0, 0, 0.6);
}

/* Smiley Button */
.smiley-btn {
  background: #c0c0c0;
  width: 28px;
  height: 28px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  outline: none;
}

.smiley-btn:active {
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
}

/* Board Container & Cells */
.board-container {
  padding: 0;
  background: #c0c0c0;
  display: inline-block;
  overflow: auto;
  max-width: 100%;
}

.board-grid {
  display: grid;
  gap: 0px;
}

.cell-btn {
  width: 24px;
  height: 24px;
  box-sizing: border-box;
  font-weight: bold;
  font-size: 14px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: #c0c0c0;
  outline: none;
  cursor: default;
}

/* Hidden cell: 3D raised */
.cell-hidden {
  border-top: 2px solid #fff;
  border-left: 2px solid #fff;
  border-right: 2px solid #808080;
  border-bottom: 2px solid #808080;
}

.cell-hidden:active {
  border: 1px solid #808080;
  border-top: 1px solid #808080;
}

/* Revealed cell: Flat sunken */
.cell-revealed {
  border: 1px solid #808080;
  background: #c0c0c0;
}

.cell-exploded {
  background: #ff0000 !important;
  border: 1px solid #808080;
}

.cell-false-flag {
  border: 1px solid #808080;
}

.cell-flag {
  font-size: 12px;
}

.cell-question {
  font-size: 11px;
  font-weight: bold;
  color: #000;
}

.cell-mine {
  font-size: 12px;
}

.cell-number {
  font-family: 'MS Sans Serif', Arial, sans-serif;
  font-weight: 900;
  font-size: 14px;
}

/* Modal Dialog */
.retro-modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.retro-modal {
  background: #c0c0c0;
  width: 320px;
  max-width: 90%;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
}

.modal-title-bar {
  background: #000080;
  color: white;
  padding: 3px 4px 3px 6px;
  font-weight: bold;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-close-btn {
  background: #c0c0c0;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #000;
  border-bottom: 1px solid #000;
  font-weight: bold;
  font-size: 12px;
  width: 16px;
  height: 14px;
  line-height: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #000;
}

.modal-body {
  padding: 12px;
  display: flex;
  gap: 12px;
}

.modal-icon {
  font-size: 32px;
  flex-shrink: 0;
}

.modal-content {
  flex-grow: 1;
}

.modal-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 12px;
}

.retro-btn {
  background: #c0c0c0;
  border-top: 2px solid #fff;
  border-left: 2px solid #fff;
  border-right: 2px solid #000;
  border-bottom: 2px solid #000;
  padding: 3px 8px;
  font-size: 11px;
  cursor: pointer;
  outline: none;
}

.retro-btn:active {
  border-top: 2px solid #000;
  border-left: 2px solid #000;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
}
</style>
