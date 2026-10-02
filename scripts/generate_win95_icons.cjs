const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function createPNG(width, height, getPixel) {
  const rowSize = 1 + width * 4;
  const raw = Buffer.alloc(height * rowSize);
  for (let y = 0; y < height; y++) {
    raw[y * rowSize] = 0;
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = getPixel(x, y) || [0, 0, 0, 0];
      const offset = y * rowSize + 1 + x * 4;
      raw[offset] = r;
      raw[offset + 1] = g;
      raw[offset + 2] = b;
      raw[offset + 3] = a;
    }
  }

  const deflated = zlib.deflateSync(raw);

  function crc32(buf) {
    let c = 0 ^ (-1);
    for (let i = 0; i < buf.length; i++) {
      let byte = buf[i];
      for (let k = 0; k < 8; k++) {
        c = ((c ^ byte) & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
        byte >>>= 1;
      }
    }
    return (c ^ (-1)) >>> 0;
  }

  function makeChunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type, 'ascii');
    const body = Buffer.concat([typeBuf, data]);
    const crcBuf = Buffer.alloc(4);
    crcBuf.writeUInt32BE(crc32(body), 0);
    return Buffer.concat([len, body, crcBuf]);
  }

  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  return Buffer.concat([
    sig,
    makeChunk('IHDR', ihdr),
    makeChunk('IDAT', deflated),
    makeChunk('IEND', Buffer.alloc(0))
  ]);
}

// Win95 Palette Constants
const C = {
  TRANS: [0, 0, 0, 0],
  BLACK: [0, 0, 0, 255],
  WHITE: [255, 255, 255, 255],
  GRAY_LIGHT: [223, 223, 223, 255],
  GRAY: [192, 192, 192, 255],
  GRAY_DARK: [128, 128, 128, 255],
  BLUE_NAVY: [0, 0, 128, 255],
  BLUE_ROYAL: [0, 102, 204, 255],
  BLUE_LIGHT: [102, 178, 255, 255],
  CYAN: [0, 255, 255, 255],
  TEAL: [0, 128, 128, 255],
  GREEN_DARK: [0, 128, 0, 255],
  GREEN: [0, 204, 68, 255],
  GREEN_LIGHT: [128, 255, 128, 255],
  RED_DARK: [128, 0, 0, 255],
  RED: [255, 0, 0, 255],
  RED_LIGHT: [255, 102, 102, 255],
  YELLOW_DARK: [180, 140, 0, 255],
  YELLOW: [255, 220, 0, 255],
  YELLOW_LIGHT: [255, 255, 150, 255],
  GOLD: [218, 165, 32, 255],
  PURPLE: [128, 0, 128, 255],
  PURPLE_LIGHT: [180, 100, 220, 255],
  ORANGE: [255, 140, 0, 255],
  BROWN: [139, 69, 19, 255],
  MANILA_FOLDER: [240, 215, 140, 255],
  MANILA_DARK: [200, 170, 90, 255],
};

function createGrid(w, h) {
  const g = [];
  for (let y = 0; y < h; y++) {
    const row = [];
    for (let x = 0; x < w; x++) row.push(C.TRANS);
    g.push(row);
  }
  return g;
}

function fillRect(g, x, y, w, h, col) {
  for (let j = y; j < y + h; j++) {
    for (let i = x; i < x + w; i++) {
      if (j >= 0 && j < g.length && i >= 0 && i < g[0].length) {
        g[j][i] = col;
      }
    }
  }
}

function drawLine(g, x0, y0, x1, y1, col) {
  const dx = Math.abs(x1 - x0);
  const dy = Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;
  let cx = x0, cy = y0;
  while (true) {
    if (cy >= 0 && cy < g.length && cx >= 0 && cx < g[0].length) {
      g[cy][cx] = col;
    }
    if (cx === x1 && cy === y1) break;
    const e2 = 2 * err;
    if (e2 > -dy) { err -= dy; cx += sx; }
    if (e2 < dx) { err += dx; cy += sy; }
  }
}

function drawCircle(g, cx, cy, r, col, fillCol = null) {
  for (let y = -r; y <= r; y++) {
    for (let x = -r; x <= r; x++) {
      const d = Math.sqrt(x * x + y * y);
      if (fillCol && d <= r - 0.5) {
        const px = cx + x, py = cy + y;
        if (py >= 0 && py < g.length && px >= 0 && px < g[0].length) g[py][px] = fillCol;
      } else if (Math.abs(d - r) < 0.7) {
        const px = cx + x, py = cy + y;
        if (py >= 0 && py < g.length && px >= 0 && px < g[0].length) g[py][px] = col;
      }
    }
  }
}

// 1. PROJECTS FOLDER (Classic Win95 Folder with Octocat/Code badge)
function makeProjectsFolder() {
  const g = createGrid(32, 32);
  // Folder tab
  fillRect(g, 4, 6, 10, 4, C.MANILA_DARK);
  fillRect(g, 5, 7, 8, 3, C.MANILA_FOLDER);
  // Back folder flap
  fillRect(g, 4, 9, 24, 6, C.MANILA_DARK);
  fillRect(g, 5, 10, 22, 5, C.MANILA_FOLDER);
  // White document sheets sticking out
  fillRect(g, 7, 6, 18, 10, C.GRAY_DARK);
  fillRect(g, 8, 7, 16, 9, C.WHITE);
  // Code lines on paper
  for (let l = 8; l <= 13; l += 2) {
    fillRect(g, 10, l, 10, 1, C.BLUE_NAVY);
  }
  // Front folder body (tilted front)
  fillRect(g, 3, 14, 26, 14, C.MANILA_DARK);
  fillRect(g, 4, 15, 24, 12, C.MANILA_FOLDER);
  // Folder 3D highlight & shadow
  drawLine(g, 3, 14, 28, 14, C.WHITE);
  drawLine(g, 3, 14, 3, 27, C.WHITE);
  drawLine(g, 28, 14, 28, 27, C.BLACK);
  drawLine(g, 3, 27, 28, 27, C.BLACK);
  // GitHub Octocat silhouette / Badge in front
  drawCircle(g, 16, 21, 5, C.BLACK, C.GRAY_LIGHT);
  // Cat ears
  fillRect(g, 12, 17, 2, 2, C.BLACK);
  fillRect(g, 18, 17, 2, 2, C.BLACK);
  // Cat face details
  fillRect(g, 14, 20, 1, 2, C.BLACK);
  fillRect(g, 17, 20, 1, 2, C.BLACK);
  fillRect(g, 15, 23, 2, 1, C.BLACK);
  return g;
}

// 2. COMPASS (Campus Compass)
function makeCompass() {
  const g = createGrid(32, 32);
  // Outer gold brass ring with shading
  drawCircle(g, 16, 16, 13, C.YELLOW_DARK, C.GOLD);
  drawCircle(g, 16, 16, 12, C.BLACK, C.YELLOW_LIGHT);
  drawCircle(g, 16, 16, 11, C.WHITE, C.WHITE);
  // Dial tick marks (N, S, E, W)
  fillRect(g, 16, 6, 1, 3, C.RED);
  fillRect(g, 16, 23, 1, 3, C.BLACK);
  fillRect(g, 6, 16, 3, 1, C.BLACK);
  fillRect(g, 23, 16, 3, 1, C.BLACK);
  // 'N' letter
  fillRect(g, 15, 10, 1, 3, C.RED_DARK);
  fillRect(g, 17, 10, 1, 3, C.RED_DARK);
  fillRect(g, 16, 11, 1, 1, C.RED_DARK);
  // Compass Needle (North = Red diamond, South = Blue/Gray diamond)
  // North tip
  drawLine(g, 16, 7, 13, 16, C.RED_DARK);
  drawLine(g, 16, 7, 19, 16, C.RED_DARK);
  fillRect(g, 15, 11, 3, 5, C.RED);
  fillRect(g, 16, 9, 1, 2, C.RED_LIGHT);
  // South tip
  drawLine(g, 16, 25, 13, 16, C.BLACK);
  drawLine(g, 16, 25, 19, 16, C.BLACK);
  fillRect(g, 15, 16, 3, 6, C.BLUE_NAVY);
  fillRect(g, 16, 19, 1, 5, C.BLUE_ROYAL);
  // Center brass pin
  drawCircle(g, 16, 16, 2, C.BLACK, C.GOLD);
  fillRect(g, 16, 16, 1, 1, C.WHITE);
  // Top brass suspension loop
  drawCircle(g, 16, 2, 2, C.YELLOW_DARK, null);
  return g;
}

// 3. PAINT (JavaFX Drawing App)
function makePaint() {
  const g = createGrid(32, 32);
  // Wooden palette base
  drawCircle(g, 14, 18, 12, C.BLACK, C.MANILA_FOLDER);
  // Thumb hole
  drawCircle(g, 21, 22, 3, C.MANILA_DARK, C.TRANS);
  // Paint blobs
  drawCircle(g, 9, 12, 2, C.RED_DARK, C.RED);
  drawCircle(g, 15, 10, 2, C.BLUE_NAVY, C.CYAN);
  drawCircle(g, 21, 12, 2, C.GREEN_DARK, C.GREEN);
  drawCircle(g, 8, 18, 2, C.YELLOW_DARK, C.YELLOW);
  drawCircle(g, 10, 24, 2, C.PURPLE, C.PURPLE_LIGHT);
  // Paintbrush diagonal
  drawLine(g, 26, 4, 14, 22, C.BROWN);
  drawLine(g, 27, 4, 15, 22, C.MANILA_DARK);
  // Metal ferrule
  drawLine(g, 14, 22, 11, 26, C.GRAY_LIGHT);
  drawLine(g, 15, 22, 12, 26, C.WHITE);
  // Bristles & tip (wet with red paint)
  drawLine(g, 11, 26, 8, 29, C.BLACK);
  fillRect(g, 7, 28, 3, 3, C.RED);
  return g;
}

// 4. SHIELD (Risk Management System)
function makeShield() {
  const g = createGrid(32, 32);
  // Classic Heraldic / Security Shield shape
  for (let y = 4; y <= 18; y++) {
    fillRect(g, 6, y, 20, 1, C.BLUE_ROYAL);
  }
  for (let y = 19; y <= 27; y++) {
    const inset = y - 18;
    fillRect(g, 6 + inset, y, 20 - 2 * inset, 1, C.BLUE_ROYAL);
  }
  // Shield Golden rim
  for (let y = 4; y <= 18; y++) {
    g[y][5] = C.YELLOW_DARK;
    g[y][6] = C.GOLD;
    g[y][25] = C.GOLD;
    g[y][26] = C.YELLOW_DARK;
  }
  drawLine(g, 5, 4, 26, 4, C.YELLOW_DARK);
  drawLine(g, 6, 5, 25, 5, C.WHITE);
  for (let y = 19; y <= 27; y++) {
    const inset = y - 18;
    g[y][5 + inset] = C.GOLD;
    g[y][26 - inset] = C.YELLOW_DARK;
  }
  g[28][16] = C.BLACK;
  // Risk Matrix Quadrants inside shield
  fillRect(g, 8, 8, 7, 6, C.GREEN);
  fillRect(g, 17, 8, 7, 6, C.YELLOW);
  fillRect(g, 8, 16, 7, 6, C.ORANGE);
  fillRect(g, 17, 16, 7, 6, C.RED);
  // Divider grid lines
  fillRect(g, 15, 7, 2, 16, C.WHITE);
  fillRect(g, 7, 14, 18, 2, C.WHITE);
  // Checkmark on safe quadrant
  drawLine(g, 9, 11, 11, 13, C.BLACK);
  drawLine(g, 11, 13, 14, 9, C.BLACK);
  // Warning exclamation mark on danger quadrant
  fillRect(g, 20, 17, 2, 3, C.WHITE);
  fillRect(g, 20, 21, 2, 1, C.WHITE);
  return g;
}

// 5. BRAIN (Local Hybrid RAG Pipeline)
function makeBrain() {
  const g = createGrid(32, 32);
  // Microchip substrate background
  fillRect(g, 4, 4, 24, 24, C.GREEN_DARK);
  fillRect(g, 5, 5, 22, 22, C.TEAL);
  // Chip pins around border
  for (let i = 7; i <= 24; i += 3) {
    fillRect(g, i, 2, 2, 2, C.GOLD);
    fillRect(g, i, 28, 2, 2, C.GOLD);
    fillRect(g, 2, i, 2, 2, C.GOLD);
    fillRect(g, 28, i, 2, 2, C.GOLD);
  }
  // Central Silicon Chip
  fillRect(g, 8, 8, 16, 16, C.BLACK);
  fillRect(g, 9, 9, 14, 14, C.GRAY_DARK);
  // AI Neural / Brain lobes on the chip (glowing cyan / magenta)
  // Left hemisphere
  drawCircle(g, 13, 14, 4, C.CYAN, C.BLUE_ROYAL);
  drawCircle(g, 13, 18, 3, C.CYAN, C.BLUE_ROYAL);
  // Right hemisphere
  drawCircle(g, 19, 14, 4, C.PURPLE_LIGHT, C.PURPLE);
  drawCircle(g, 19, 18, 3, C.PURPLE_LIGHT, C.PURPLE);
  // Center fissure
  drawLine(g, 16, 10, 16, 21, C.BLACK);
  // Neural synapse nodes
  fillRect(g, 11, 13, 2, 2, C.WHITE);
  fillRect(g, 19, 13, 2, 2, C.WHITE);
  fillRect(g, 13, 18, 2, 2, C.YELLOW);
  fillRect(g, 18, 18, 2, 2, C.YELLOW);
  // Circuit traces connecting outward
  drawLine(g, 9, 16, 5, 16, C.GOLD);
  drawLine(g, 23, 16, 27, 16, C.GOLD);
  drawLine(g, 16, 9, 16, 5, C.GOLD);
  return g;
}

// 6. SERVER (Local RAG FastAPI Backend)
function makeServer() {
  const g = createGrid(32, 32);
  // Main Server Tower Rack
  fillRect(g, 6, 4, 20, 24, C.GRAY_DARK);
  fillRect(g, 7, 5, 18, 22, C.GRAY);
  drawLine(g, 6, 4, 25, 4, C.WHITE);
  drawLine(g, 6, 4, 6, 27, C.WHITE);
  drawLine(g, 26, 4, 26, 27, C.BLACK);
  drawLine(g, 6, 28, 26, 28, C.BLACK);
  // Server Units (Rack 1, 2, 3)
  for (let y = 7; y <= 21; y += 7) {
    fillRect(g, 8, y, 16, 5, C.BLACK);
    fillRect(g, 9, y + 1, 14, 3, C.GRAY_LIGHT);
    // CD-ROM / drive bay
    fillRect(g, 10, y + 2, 5, 1, C.GRAY_DARK);
    // Status LEDs
    fillRect(g, 17, y + 2, 2, 1, C.GREEN);
    fillRect(g, 20, y + 2, 1, 1, C.CYAN);
  }
  // High-voltage FastAPI Lightning bolt over the server
  const bolt = [
    [18, 5], [16, 12], [19, 12], [14, 23], [17, 15], [14, 15]
  ];
  for (let i = 0; i < bolt.length - 1; i++) {
    drawLine(g, bolt[i][0], bolt[i][1], bolt[i+1][0], bolt[i+1][1], C.YELLOW);
    drawLine(g, bolt[i][0] + 1, bolt[i][1], bolt[i+1][0] + 1, bolt[i+1][1], C.WHITE);
  }
  return g;
}

// 7. COMPUTER (Windows 95 Portfolio)
function makeComputer() {
  const g = createGrid(32, 32);
  // Monitor casing
  fillRect(g, 5, 4, 22, 17, C.GRAY_DARK);
  fillRect(g, 6, 5, 20, 15, C.GRAY);
  drawLine(g, 5, 4, 26, 4, C.WHITE);
  drawLine(g, 5, 4, 5, 20, C.WHITE);
  drawLine(g, 27, 4, 27, 20, C.BLACK);
  drawLine(g, 5, 21, 27, 21, C.BLACK);
  // Screen bevel & CRT glass
  fillRect(g, 8, 7, 16, 11, C.BLACK);
  fillRect(g, 9, 8, 14, 9, C.TEAL);
  // Windows 95 logo flying flag on screen
  fillRect(g, 11, 10, 4, 3, C.RED);
  fillRect(g, 16, 10, 4, 3, C.GREEN);
  fillRect(g, 11, 13, 4, 3, C.BLUE_ROYAL);
  fillRect(g, 16, 13, 4, 3, C.YELLOW);
  // Monitor stand
  fillRect(g, 13, 21, 6, 3, C.GRAY_DARK);
  fillRect(g, 10, 24, 12, 2, C.GRAY);
  // Keyboard
  fillRect(g, 4, 26, 24, 4, C.GRAY);
  drawLine(g, 4, 26, 27, 26, C.WHITE);
  drawLine(g, 27, 26, 27, 29, C.BLACK);
  drawLine(g, 4, 29, 27, 29, C.BLACK);
  for (let k = 6; k <= 24; k += 2) {
    fillRect(g, k, 27, 1, 1, C.GRAY_DARK);
  }
  return g;
}

// 8. MONITOR / HCI (Project HCI)
function makeMonitor() {
  const g = createGrid(32, 32);
  // CRT Monitor
  fillRect(g, 4, 3, 24, 18, C.GRAY);
  drawLine(g, 4, 3, 27, 3, C.WHITE);
  drawLine(g, 4, 3, 4, 20, C.WHITE);
  drawLine(g, 28, 3, 28, 20, C.BLACK);
  drawLine(g, 4, 21, 28, 21, C.BLACK);
  // Glass Display
  fillRect(g, 7, 5, 18, 13, C.BLACK);
  fillRect(g, 8, 6, 16, 11, C.BLUE_NAVY);
  // Window UI inside display
  fillRect(g, 9, 7, 14, 2, C.GRAY_LIGHT); // title bar
  fillRect(g, 9, 9, 14, 7, C.WHITE); // content
  fillRect(g, 11, 11, 5, 1, C.BLUE_ROYAL);
  fillRect(g, 11, 13, 8, 1, C.GRAY_DARK);
  // Monitor Stand
  fillRect(g, 12, 21, 8, 2, C.GRAY_DARK);
  fillRect(g, 9, 23, 14, 2, C.GRAY);
  // Computer Mouse at bottom-right
  fillRect(g, 23, 22, 6, 9, C.WHITE);
  drawLine(g, 23, 22, 28, 22, C.GRAY_LIGHT);
  drawLine(g, 29, 22, 29, 30, C.BLACK);
  drawLine(g, 23, 30, 29, 30, C.BLACK);
  // Mouse buttons & cord
  drawLine(g, 26, 22, 26, 25, C.BLACK);
  drawLine(g, 23, 25, 28, 25, C.BLACK);
  drawLine(g, 26, 21, 24, 18, C.GRAY_DARK);
  return g;
}

// 9. GEAR (QM Enterprise Architecture Backend)
function makeGear() {
  const g = createGrid(32, 32);
  // Two Interlocking Metallic Gears
  // Large Gear Center (14, 14), R=9
  drawCircle(g, 14, 14, 9, C.BLACK, C.GRAY);
  // Gear teeth for large gear
  const teeth = [
    [13, 3, 3, 3], [13, 22, 3, 3],
    [3, 13, 3, 3], [22, 13, 3, 3],
    [6, 6, 3, 3], [20, 20, 3, 3],
    [6, 20, 3, 3], [20, 6, 3, 3]
  ];
  teeth.forEach(([x, y, w, h]) => {
    fillRect(g, x, y, w, h, C.GRAY);
    drawLine(g, x, y, x + w - 1, y, C.WHITE);
    drawLine(g, x, y, x, y + h - 1, C.WHITE);
    drawLine(g, x + w - 1, y, x + w - 1, y + h - 1, C.BLACK);
    drawLine(g, x, y + h - 1, x + w - 1, y + h - 1, C.BLACK);
  });
  // Center axle hole
  drawCircle(g, 14, 14, 4, C.BLACK, C.BLUE_NAVY);
  drawCircle(g, 14, 14, 2, C.WHITE, C.WHITE);

  // Small Interlocking Gold Gear (23, 23), R=6
  drawCircle(g, 23, 23, 6, C.BLACK, C.GOLD);
  const smallTeeth = [
    [22, 15, 2, 2], [22, 29, 2, 2],
    [15, 22, 2, 2], [29, 22, 2, 2]
  ];
  smallTeeth.forEach(([x, y, w, h]) => {
    fillRect(g, x, y, w, h, C.GOLD);
    drawLine(g, x, y, x + w - 1, y, C.YELLOW_LIGHT);
  });
  drawCircle(g, 23, 23, 2, C.BLACK, C.GRAY_DARK);
  return g;
}

// 10. REPORT (Reporting - E-Gov Flutter App)
function makeReport() {
  const g = createGrid(32, 32);
  // Clipboard wooden backing
  fillRect(g, 6, 3, 20, 26, C.BROWN);
  drawLine(g, 6, 3, 25, 3, C.MANILA_FOLDER);
  drawLine(g, 6, 3, 6, 28, C.MANILA_FOLDER);
  drawLine(g, 26, 3, 26, 28, C.BLACK);
  drawLine(g, 6, 29, 26, 29, C.BLACK);
  // Metal Clip on top
  fillRect(g, 11, 2, 10, 4, C.GRAY_DARK);
  fillRect(g, 12, 3, 8, 2, C.GRAY_LIGHT);
  fillRect(g, 14, 1, 4, 2, C.BLACK);
  // White Report Sheet
  fillRect(g, 8, 6, 16, 21, C.WHITE);
  // Document lines & checkboxes
  for (let y = 9; y <= 21; y += 4) {
    // Checkbox
    fillRect(g, 10, y, 3, 3, C.BLACK);
    fillRect(g, 11, y + 1, 1, 1, C.WHITE);
    // Green check on top items
    if (y < 17) {
      g[y][12] = C.GREEN_DARK;
      g[y+1][11] = C.GREEN_DARK;
    }
    // Text lines
    fillRect(g, 15, y + 1, 7, 1, C.BLUE_NAVY);
  }
  // Red Alert / Notification stamp badge (bottom right)
  drawCircle(g, 22, 22, 5, C.BLACK, C.RED);
  // Exclamation mark in badge
  fillRect(g, 22, 19, 1, 4, C.WHITE);
  fillRect(g, 22, 24, 1, 1, C.WHITE);
  return g;
}

const icons = {
  'projects.png': makeProjectsFolder(),
  'compass.png': makeCompass(),
  'paint.png': makePaint(),
  'shield.png': makeShield(),
  'brain.png': makeBrain(),
  'server.png': makeServer(),
  'computer.png': makeComputer(),
  'monitor.png': makeMonitor(),
  'gear.png': makeGear(),
  'report.png': makeReport()
};

const targetDir = path.join(__dirname, '..', 'assets', 'win95Icons');

for (const [name, grid] of Object.entries(icons)) {
  const png = createPNG(32, 32, (x, y) => grid[y][x]);
  const outPath = path.join(targetDir, name);
  fs.writeFileSync(outPath, png);
  console.log('Saved icon:', name, 'size:', png.length, 'bytes');
}
