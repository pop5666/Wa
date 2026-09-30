// js/game.js - แก้ไขปัญหาภาพซ้ำกัน/ภาพค้างเรียบร้อย 100%

const RAW_PATTERNS = [
    { name: "สุนัขจิ้งจอก", palette: ["#ffffff","#2c3e50","#e67e22","#d35400","#f1c40f"], matrix: [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,2,2,0,0,0,0,0,0,0,0,2,2,0,0,0],[0,2,3,2,0,0,0,0,0,0,2,3,2,0,0,0],[0,2,3,3,2,0,0,0,0,2,3,3,2,0,0,0],[0,0,2,3,3,2,2,2,2,3,3,2,0,0,0,0],[0,0,2,3,3,3,3,3,3,3,3,2,0,0,0,0],[0,0,2,3,1,3,3,3,1,3,3,2,0,0,0,0],[0,0,2,3,3,3,3,3,3,3,3,2,0,0,0,0],[0,0,2,3,3,1,1,1,3,3,3,2,0,0,0,0],[0,0,0,2,3,3,1,3,3,3,2,0,0,0,0,0],[0,0,0,2,4,4,3,3,4,4,2,0,0,0,0,0],[0,0,0,0,2,4,4,4,4,2,0,0,0,0,0,0],[0,0,0,0,0,2,2,1,2,2,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]] },
    { name: "แมวเหมียว", palette: ["#ffffff","#1e272e","#ffa801","#ffd32a","#ff5e57"], matrix: [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,1,1,0,0,0,0,0,0,0,0,1,1,0,0,0],[0,1,2,1,0,0,0,0,0,0,1,2,1,0,0,0],[0,1,2,2,1,1,1,1,1,1,2,2,1,0,0,0],[0,1,2,2,2,2,2,2,2,2,2,2,1,0,0,0],[0,1,2,1,2,2,2,2,2,1,2,2,1,0,0,0],[0,1,2,2,2,2,2,2,2,2,2,2,1,0,0,0],[0,0,1,2,2,4,2,2,4,2,2,1,0,0,0,0],[0,0,1,2,2,2,1,1,2,2,2,1,0,0,0,0],[0,0,0,1,2,3,3,3,3,2,1,0,0,0,0,0],[0,0,0,0,1,2,2,2,2,1,0,0,0,0,0,0],[0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]] },
    { name: "หมีแพนด้า", palette: ["#ffffff","#000000","#f5f6fa","#ff7875"], matrix: [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,1,1,1,0,0,0,0,1,1,1,0,0,0,0],[0,1,1,1,1,1,0,0,1,1,1,1,1,0,0,0],[0,1,1,1,1,2,2,2,2,1,1,1,1,0,0,0],[0,0,1,1,2,2,2,2,2,2,1,1,0,0,0,0],[0,0,2,2,1,1,2,2,1,1,2,2,0,0,0,0],[0,0,2,2,1,1,2,2,1,1,2,2,0,0,0,0],[0,0,2,2,2,2,1,1,2,2,2,2,0,0,0,0],[0,0,2,3,2,1,1,1,1,2,3,2,0,0,0,0],[0,0,0,2,2,2,2,2,2,2,2,0,0,0,0,0],[0,0,0,0,2,2,2,2,2,2,0,0,0,0,0,0],[0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]] },
    { name: "เพนกวิน", palette: ["#ffffff","#2f3542","#ffa502","#ffffff","#ff4757"], matrix: [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0],[0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0],[0,0,0,1,1,3,1,1,3,1,1,0,0,0,0,0],[0,0,0,1,1,3,1,1,3,1,1,0,0,0,0,0],[0,0,0,1,1,1,2,2,1,1,1,0,0,0,0,0],[0,0,1,1,1,3,3,3,3,1,1,1,0,0,0,0],[0,1,1,1,3,3,3,3,3,3,1,1,1,0,0,0],[0,1,1,1,3,3,3,3,3,3,1,1,1,0,0,0],[0,1,1,1,3,3,3,3,3,3,1,1,1,0,0,0],[0,0,1,1,1,3,3,3,3,1,1,1,0,0,0,0],[0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0],[0,0,0,0,2,2,0,0,2,2,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]] },
    { name: "กระต่ายน้อย", palette: ["#ffffff","#2c3e50","#f5f6fa","#ffa8a8"], matrix: [[0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0],[0,0,1,3,1,0,0,0,0,1,3,1,0,0,0,0],[0,0,1,3,1,0,0,0,0,1,3,1,0,0,0,0],[0,0,1,3,1,0,0,0,0,1,3,1,0,0,0,0],[0,0,0,1,1,2,2,2,2,1,1,0,0,0,0,0],[0,0,1,2,2,2,2,2,2,2,2,1,0,0,0,0],[0,0,1,2,1,2,2,2,1,2,2,1,0,0,0,0],[0,0,1,2,2,2,3,2,2,2,2,1,0,0,0,0],[0,0,1,2,2,1,1,1,2,2,2,1,0,0,0,0],[0,0,0,1,2,2,2,2,2,2,1,0,0,0,0,0],[0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]] },
    { name: "ช้างน้อย", palette: ["#ffffff","#2f3542","#747d8c","#a4b0be","#ff7875"], matrix: [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0],[0,0,0,1,1,2,2,2,2,1,1,0,0,0,0,0],[0,0,1,2,2,2,2,2,2,2,2,1,0,0,0,0],[0,1,2,2,1,2,2,2,1,2,2,2,1,0,0,0],[0,1,2,2,2,2,2,2,2,2,2,2,1,0,0,0],[0,1,2,2,2,2,1,1,2,2,2,2,1,0,0,0],[0,0,1,2,2,2,2,2,2,2,2,1,0,0,0,0],[0,0,0,1,1,2,2,2,2,1,1,0,0,0,0,0],[0,0,0,0,0,1,2,2,1,0,0,0,0,0,0,0],[0,0,0,0,0,1,2,2,1,0,0,0,0,0,0,0],[0,0,0,0,0,1,2,2,1,0,0,0,0,0,0,0],[0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]] },
    { name: "นกฮูกตาโต", palette: ["#ffffff","#2d3436","#636e72","#ffeaa7","#fdcb6e"], matrix: [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0],[0,1,2,2,1,1,1,1,1,1,2,2,1,0,0,0],[0,1,2,2,2,2,2,2,2,2,2,2,1,0,0,0],[0,1,2,3,3,2,2,2,2,3,3,2,1,0,0,0],[0,1,2,3,1,3,2,2,3,1,3,2,1,0,0,0],[0,1,2,3,3,2,4,4,2,3,3,2,1,0,0,0],[0,0,1,2,2,2,2,2,2,2,2,1,0,0,0,0],[0,0,1,2,3,3,3,3,3,3,2,1,0,0,0,0],[0,0,1,2,3,3,3,3,3,3,2,1,0,0,0,0],[0,0,0,1,2,2,2,2,2,2,1,0,0,0,0,0],[0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]] },
    { name: "สุนัขชิบะ", palette: ["#ffffff","#2d3436","#e17055","#ffeaa7","#ffffff"], matrix: [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,1,1,0,0,0,0,0,0,0,0,1,1,0,0,0],[0,1,2,1,0,0,0,0,0,0,1,2,1,0,0,0],[0,1,2,2,1,1,1,1,1,1,2,2,1,0,0,0],[0,1,2,2,2,2,2,2,2,2,2,2,1,0,0,0],[0,1,2,1,2,2,2,2,2,1,2,2,1,0,0,0],[0,1,2,2,2,2,2,2,2,2,2,2,1,0,0,0],[0,0,1,2,4,4,2,2,4,4,2,1,0,0,0,0],[0,0,1,2,4,4,1,1,4,4,2,1,0,0,0,0],[0,0,0,1,2,4,4,4,4,2,1,0,0,0,0,0],[0,0,0,0,1,2,2,2,2,1,0,0,0,0,0,0],[0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]] },
    { name: "หมีบราวน์", palette: ["#ffffff","#2d3436","#6d4c41","#d7ccc8","#ffe0b2"], matrix: [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,1,1,1,0,0,0,0,1,1,1,0,0,0,0],[0,1,2,2,2,1,0,0,1,2,2,2,1,0,0,0],[0,1,2,2,2,2,2,2,2,2,2,2,1,0,0,0],[0,1,2,2,2,2,2,2,2,2,2,2,1,0,0,0],[0,1,2,1,2,2,2,2,2,1,2,2,1,0,0,0],[0,1,2,2,2,3,3,3,2,2,2,2,1,0,0,0],[0,0,1,2,2,3,1,3,2,2,2,1,0,0,0,0],[0,0,1,2,2,3,3,3,2,2,2,1,0,0,0,0],[0,0,0,1,2,2,2,2,2,2,1,0,0,0,0,0],[0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]] },
    { name: "กบน้อย", palette: ["#ffffff","#1e272e","#44bd32","#7bed9f","#ff4757"], matrix: [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,1,1,1,0,0,0,0,1,1,1,0,0,0,0],[0,1,2,1,2,1,0,0,1,2,1,2,1,0,0,0],[0,1,1,1,1,1,2,2,1,1,1,1,1,0,0,0],[0,1,2,2,2,2,2,2,2,2,2,2,1,0,0,0],[0,1,2,2,2,2,2,2,2,2,2,2,1,0,0,0],[0,1,2,4,2,2,2,2,2,4,2,2,1,0,0,0],[0,0,1,2,2,2,1,1,2,2,2,1,0,0,0,0],[0,0,1,2,2,3,3,3,3,2,2,1,0,0,0,0],[0,0,0,1,2,2,2,2,2,2,1,0,0,0,0,0],[0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]] }
];

const EXTRA_PALETTES = [
    ["#ffffff","#2d3436","#e84393","#fd79a8","#ffeaa7"],
    ["#ffffff","#2d3436","#0984e3","#74b9ff","#ffeaa7"],
    ["#ffffff","#2d3436","#6c5ce7","#a29bfe","#ffeaa7"],
    ["#ffffff","#2d3436","#00b894","#55efc4","#ffeaa7"],
    ["#ffffff","#2d3436","#d63031","#ff7675","#ffeaa7"]
];

let levels = [];
for (let i = 1; i <= 50; i++) {
    const base = RAW_PATTERNS[(i - 1) % RAW_PATTERNS.length];
    const palette = i <= 10 ? base.palette : EXTRA_PALETTES[i % EXTRA_PALETTES.length];
    
    levels.push({
        id: i,
        name: `${base.name} #${i}`,
        size: 16,
        palette: palette,
        matrix: base.matrix,
        totalCells: base.matrix.flat().filter(x => x > 0).length
    });
}

let currentLevel = null;
let selectedColor = 1;
let userProgress = {};
let galleryMap = new Map();
let scale = 1;
let panX = 0, panY = 0;
let isDragging = false;
let startX = 0, startY = 0;

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playPopSound() {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(450, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(850, audioCtx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.08);
}

const canvas = document.getElementById('game-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;
const container = document.getElementById('canvas-container');

function init() {
    renderLevels();
    setupCanvasEvents();
}

// ฟังก์ชันระบายรูปบน Canvas ตัวย่อของแต่ละการ์ดอย่างถูกต้องและไม่ใช้องค์ประกอบซ้ำ
function drawThumb(c, levelData) {
    c.width = 96;
    c.height = 96;
    const cCtx = c.getContext('2d');
    if (!cCtx) return;
    cCtx.imageSmoothingEnabled = false;
    cCtx.clearRect(0, 0, 96, 96);

    const cellSize = 96 / levelData.size;
    for (let r = 0; r < levelData.size; r++) {
        for (let cIdx = 0; cIdx < levelData.size; cIdx++) {
            const val = levelData.matrix[r][cIdx];
            if (val > 0) {
                cCtx.fillStyle = levelData.palette[val];
                cCtx.fillRect(cIdx * cellSize, r * cellSize, cellSize, cellSize);
            }
        }
    }
}

function renderLevels() {
    const grid = document.getElementById('levels-grid');
    if (!grid) return;
    grid.innerHTML = '';

    levels.forEach(lvl => {
        const card = document.createElement('div');
        card.className = 'level-card';
        card.onclick = () => { playPopSound(); startLevel(lvl); };

        const thumb = document.createElement('canvas');
        thumb.className = 'level-thumb';
        
        card.appendChild(thumb);
        grid.appendChild(card);

        // วาดรูปของแต่ละด่านทันที
        drawThumb(thumb, lvl);
    });
}

function renderGallery() {
    const galleryGrid = document.getElementById('view-gallery');
    if (!galleryGrid) return;
    
    galleryGrid.querySelectorAll('.level-card').forEach(el => el.remove());

    const emptyText = document.getElementById('gallery-empty');

    if (galleryMap.size === 0) {
        if (emptyText) emptyText.style.display = 'block';
        return;
    }

    if (emptyText) emptyText.style.display = 'none';

    galleryMap.forEach(lvl => {
        const card = document.createElement('div');
        card.className = 'level-card';

        const thumb = document.createElement('canvas');
        thumb.className = 'level-thumb';

        card.appendChild(thumb);
        galleryGrid.appendChild(card);

        drawThumb(thumb, lvl);
    });
}

function sortLevels(type) {
    playPopSound();
    if (type === 'easy') {
        levels.sort((a, b) => a.totalCells - b.totalCells);
    } else {
        levels.sort((a, b) => b.totalCells - a.totalCells);
    }
    renderLevels();
}

function startLevel(lvl) {
    currentLevel = lvl;
    userProgress = {};
    selectedColor = 1;
    
    document.getElementById('screen-main').classList.remove('active');
    document.getElementById('screen-game').classList.add('active');
    document.getElementById('game-title').innerText = lvl.name;

    resetView();
    renderPalette();
    updateProgress();
    draw();
}

function resetView() {
    if (!container || !currentLevel) return;
    scale = Math.min(container.clientWidth, container.clientHeight) / (currentLevel.size * 24);
    panX = (container.clientWidth - currentLevel.size * 20 * scale) / 2;
    panY = (container.clientHeight - currentLevel.size * 20 * scale) / 2;
}

function renderPalette() {
    const bar = document.getElementById('palette-bar');
    if (!bar || !currentLevel) return;
    bar.innerHTML = '';

    currentLevel.palette.forEach((color, idx) => {
        if (idx === 0) return;

        const item = document.createElement('div');
        item.className = `color-item ${selectedColor === idx ? 'selected' : ''}`;
        item.style.backgroundColor = color;
        item.innerText = idx;
        item.onclick = () => {
            playPopSound();
            selectedColor = idx;
            renderPalette();
        };

        bar.appendChild(item);
    });
}

function updateProgress() {
    if (!currentLevel) return;
    const filledCount = Object.keys(userProgress).length;
    const totalCount = currentLevel.totalCells;
    const percent = Math.floor((filledCount / totalCount) * 100);

    const progressEl = document.getElementById('game-progress');
    if (progressEl) progressEl.innerText = `${percent}%`;

    if (percent >= 100 && !galleryMap.has(currentLevel.id)) {
        galleryMap.set(currentLevel.id, currentLevel);
        showWinModal();
    }
}

function showWinModal() {
    playPopSound();
    
    const winCanvas = document.getElementById('win-canvas');
    if (winCanvas) {
        drawThumb(winCanvas, currentLevel);
    }

    document.getElementById('stat-completed').innerText = galleryMap.size;
    showModal('modal-win');
}

function draw() {
    if (!currentLevel || !ctx) return;

    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(panX, panY);
    ctx.scale(scale, scale);

    const cellSize = 20;

    for (let r = 0; r < currentLevel.size; r++) {
        for (let c = 0; c < currentLevel.size; c++) {
            const targetVal = currentLevel.matrix[r][c];
            const key = `${r}_${c}`;
            const paintedVal = userProgress[key];

            if (targetVal === 0) continue;

            if (paintedVal) {
                ctx.fillStyle = currentLevel.palette[paintedVal];
                ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
            } else {
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
                ctx.strokeStyle = '#cbd5e1';
                ctx.lineWidth = 0.5;
                ctx.strokeRect(c * cellSize, r * cellSize, cellSize, cellSize);

                ctx.fillStyle = '#64748b';
                ctx.font = '10px sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(targetVal, c * cellSize + cellSize / 2, r * cellSize + cellSize / 2);
            }
        }
    }

    ctx.restore();
}

function handlePaint(clientX, clientY) {
    if (!currentLevel) return;
    const rect = canvas.getBoundingClientRect();
    const x = (clientX - rect.left - panX) / scale;
    const y = (clientY - rect.top - panY) / scale;

    const cellSize = 20;
    const c = Math.floor(x / cellSize);
    const r = Math.floor(y / cellSize);

    if (r >= 0 && r < currentLevel.size && c >= 0 && c < currentLevel.size) {
        const targetVal = currentLevel.matrix[r][c];
        const key = `${r}_${c}`;
        if (targetVal === selectedColor && !userProgress[key]) {
            userProgress[key] = selectedColor;
            playPopSound();
            updateProgress();
            draw();
        }
    }
}

function setupCanvasEvents() {
    if (!container) return;

    container.addEventListener('mousedown', e => {
        isDragging = true;
        startX = e.clientX - panX;
        startY = e.clientY - panY;
        handlePaint(e.clientX, e.clientY);
    });

    window.addEventListener('mousemove', e => {
        if (isDragging) {
            panX = e.clientX - startX;
            panY = e.clientY - startY;
            draw();
        }
    });

    window.addEventListener('mouseup', () => isDragging = false);

    container.addEventListener('touchstart', e => {
        if (e.touches.length === 1) {
            isDragging = true;
            startX = e.touches[0].clientX - panX;
            startY = e.touches[0].clientY - panY;
            handlePaint(e.touches[0].clientX, e.touches[0].clientY);
        }
    }, { passive: false });

    container.addEventListener('touchmove', e => {
        if (isDragging && e.touches.length === 1) {
            panX = e.touches[0].clientX - startX;
            panY = e.touches[0].clientY - startY;
            handlePaint(e.touches[0].clientX, e.touches[0].clientY);
            draw();
        }
    }, { passive: false });

    container.addEventListener('touchend', () => isDragging = false);
}

function exitGame() {
    playPopSound();
    document.getElementById('screen-game').classList.remove('active');
    document.getElementById('screen-main').classList.add('active');
}

function nextLevel() {
    hideModal('modal-win');
    const nextId = (currentLevel.id % levels.length) + 1;
    const nextLvl = levels.find(l => l.id === nextId);
    if (nextLvl) startLevel(nextLvl);
}

function switchTab(tab, evt) {
    playPopSound();
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    if (evt && evt.target) evt.target.classList.add('active');

    document.getElementById('view-levels').style.display = tab === 'levels' ? 'flex' : 'none';
    document.getElementById('view-gallery').style.display = tab === 'gallery' ? 'grid' : 'none';
    document.getElementById('view-stats').style.display = tab === 'stats' ? 'block' : 'none';

    if (tab === 'gallery') {
        renderGallery();
    }
}

function showModal(id) { document.getElementById(id).classList.add('active'); }
function hideModal(id) { document.getElementById(id).classList.remove('active'); }
function toggleAudio() { playPopSound(); alert('เปิด/ปิด เสียงผ่อนคลาย'); }

window.onload = init;
