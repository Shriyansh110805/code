'use strict';

/* ═══════════════════ LEVEL DEFINITIONS ═══════════════════ */
const LEVELS = [
  {
    id: 1,
    title: 'Primary Colors',
    desc: 'Select the 3 PRIMARY colors of light (RGB) from the swatches below.',
    type: 'select-multiple',
    timeLimit: 28,
    hint: 'RGB primaries are the colors screens use. They are pure Red, pure Green, and pure Blue — nothing in between.',
    fact: '<strong>RGB primary colors</strong> are Red, Green, and Blue — the primaries of light and screens. Mixing all three at full brightness gives White. This is called <em>additive</em> color mixing.',
    data: {
      swatches: [
        { hex: '#FF0000', label: 'Red',    primary: true  },
        { hex: '#FF7700', label: 'Orange', primary: false },
        { hex: '#FFDD00', label: 'Yellow', primary: false },
        { hex: '#00CC00', label: 'Green',  primary: true  },
        { hex: '#0000FF', label: 'Blue',   primary: true  },
        { hex: '#8800CC', label: 'Violet', primary: false },
      ],
      selectCount: 3,
    },
    points: 200,
  },
  {
    id: 2,
    title: 'RGB Color Mixing',
    desc: 'Drag the sliders to match the target color as closely as possible.',
    type: 'slider',
    timeLimit: 40,
    hint: 'The target is a purple — you need high Red, zero Green, and high Blue.',
    fact: '<strong>RGB (additive) mixing</strong> is how screens work. Red + Green = Yellow, Red + Blue = Magenta, Green + Blue = Cyan, and all three = White.',
    data: {
      target: { r: 148, g: 0, b: 211 },
      label: 'Purple',
      tolerance: 35,
    },
    points: 250,
  },
  {
    id: 3,
    title: 'Complementary Colors',
    desc: 'The base color is shown. Click the complementary color on the wheel — directly opposite on the color wheel.',
    type: 'wheel-click',
    timeLimit: 30,
    hint: 'Complementary colors are 180° apart. Orange is opposite Blue on the wheel.',
    fact: '<strong>Complementary colors</strong> sit opposite each other on the wheel. Together they create maximum contrast and visual vibration.',
    data: {
      baseColor: '#0044FF',
      baseHue: 220,
      baseLabel: 'Blue',
      answerHue: 40,
      answerLabel: 'Orange',
      tolerance: 25,
    },
    points: 250,
  },
  {
    id: 4,
    title: 'Analogous Colors',
    desc: 'Drag colors into the slots to build an analogous harmony — colors that sit next to each other on the color wheel.',
    type: 'drag-slots',
    timeLimit: 45,
    hint: 'Analogous colors share a neighboring hue. All 3 must be within a 90° arc on the color wheel.',
    fact: '<strong>Analogous colors</strong> are groups of 3 adjacent on the wheel. They create a harmonious, natural feel — like warm sunset reds, oranges, and yellows.',
    data: {
      chips: [
        { hex: '#FF3300', hue: 8,   label: 'Red-Orange' },
        { hex: '#FF8800', hue: 32,  label: 'Orange'     },
        { hex: '#FFCC00', hue: 48,  label: 'Yellow'     },
        { hex: '#0044FF', hue: 220, label: 'Blue'       },
        { hex: '#CC00FF', hue: 282, label: 'Violet'     },
        { hex: '#00CC44', hue: 141, label: 'Green'      },
      ],
      slotCount: 3,
      validate: 'analogous',
      arcMax: 90,
    },
    points: 300,
  },
  {
    id: 5,
    title: 'Triadic Harmony',
    desc: 'Place 3 colors that form a triadic harmony — evenly spaced at 120° apart on the color wheel.',
    type: 'drag-slots',
    timeLimit: 50,
    hint: 'Triadic colors divide the wheel into 3 equal parts (120° each). Red, Yellow, Blue is the classic triadic set.',
    fact: '<strong>Triadic harmony</strong> uses 3 colors equally spaced (120° apart) — creating vibrant, balanced palettes used in classic art and design.',
    data: {
      chips: [
        { hex: '#FF0000', hue: 0,   label: 'Red'     },
        { hex: '#FFDD00', hue: 48,  label: 'Yellow'  },
        { hex: '#FF7700', hue: 30,  label: 'Orange'  },
        { hex: '#0000FF', hue: 240, label: 'Blue'    },
        { hex: '#00CC44', hue: 141, label: 'Green'   },
        { hex: '#CC00FF', hue: 282, label: 'Violet'  },
      ],
      slotCount: 3,
      validate: 'triadic',
      gapMin: 95,
      gapMax: 145,
    },
    points: 350,
  },
  {
    id: 6,
    title: 'Color Properties',
    desc: 'Two versions of the same color are shown. Which of the three HSL properties changed?',
    type: 'mcq',
    timeLimit: 25,
    hint: 'Hue = the color name itself. Saturation = vivid vs washed-out. Brightness = light vs dark. Look at what feels different about Color B.',
    fact: '<strong>Saturation</strong> is how vivid or gray a color looks. High saturation = pure and intense. Low saturation = muted and gray. It is one of the 3 dimensions of every color (Hue · Saturation · Lightness).',
    data: {
      colorA: { h: 200, s: 90, l: 50 },
      colorB: { h: 200, s: 16, l: 50 },
      question: 'What changed between Color A and Color B?',
      choices: [
        { text: '🎨  Hue' },
        { text: '⚡  Saturation' },
        { text: '☀️  Brightness' },
      ],
      correct: 1,
    },
    points: 200,
  },
  {
    id: 7,
    title: 'Warm vs Cool',
    desc: 'Click each swatch to assign it Warm or Cool. Tap again to cycle. Get all 6 right!',
    type: 'sort-bins',
    timeLimit: 45,
    hint: 'Reds, oranges, and yellows are warm — they advance and feel energetic. Blues, cyans, and purples are cool — they recede and feel calm.',
    fact: '<strong>Warm colors</strong> (red, orange, yellow) advance visually and raise energy. <strong>Cool colors</strong> (blue, cyan, purple) recede and create calm. Game designers mix both for emotional contrast.',
    data: {
      chips: [
        { hex: '#ff3300', hue: 8,   label: 'Red',    bin: 'warm' },
        { hex: '#ff8800', hue: 32,  label: 'Orange', bin: 'warm' },
        { hex: '#ffd700', hue: 48,  label: 'Yellow', bin: 'warm' },
        { hex: '#0055ee', hue: 222, label: 'Blue',   bin: 'cool' },
        { hex: '#00aacc', hue: 188, label: 'Cyan',   bin: 'cool' },
        { hex: '#7700cc', hue: 274, label: 'Purple', bin: 'cool' },
      ],
    },
    points: 250,
  },
  {
    id: 8,
    title: 'Tint, Shade, or Tone?',
    desc: 'Color B is a modified version of Color A. Which modification was applied?',
    type: 'mcq',
    timeLimit: 25,
    hint: 'Tint = Color + White (becomes lighter). Shade = Color + Black (becomes darker). Tone = Color + Gray (becomes more muted/desaturated).',
    fact: '<strong>Tints</strong> (+White), <strong>Shades</strong> (+Black), and <strong>Tones</strong> (+Gray) let artists build a full palette from a single hue. This is how monochromatic color schemes work.',
    data: {
      colorA: { h: 15, s: 90, l: 42 },
      colorB: { h: 15, s: 90, l: 74 },
      question: 'Color B is a ___ of Color A:',
      choices: [
        { text: '🌸  Tint  (+White)' },
        { text: '🌑  Shade  (+Black)' },
        { text: '🌫️  Tone  (+Gray)' },
      ],
      correct: 0,
    },
    points: 200,
  },
  {
    id: 9,
    title: 'Color Psychology',
    desc: 'Pick the color that best represents the concept shown. Think about real-world brands and emotions.',
    type: 'mcq',
    timeLimit: 30,
    hint: 'Think about which color ALL major banks and tech companies use. It signals reliability, intelligence, and calm.',
    fact: '<strong>Blue = Trust.</strong> Used by PayPal, Chase, Facebook, Samsung, and LinkedIn. Blue signals reliability and intelligence — that is why it dominates finance and tech branding worldwide.',
    data: {
      question: 'Which color is most associated with Trust & Reliability?',
      choices: [
        { text: 'Red',    hex: '#e60000' },
        { text: 'Blue',   hex: '#0066cc' },
        { text: 'Yellow', hex: '#ffd700' },
        { text: 'Purple', hex: '#7700cc' },
      ],
      correct: 1,
    },
    points: 200,
  },
  {
    id: 10,
    title: 'Monochromatic Harmony',
    desc: 'Fill all 3 slots with colors from the SAME hue family — only tints and shades of one base color.',
    type: 'drag-slots',
    timeLimit: 45,
    hint: 'Monochromatic = ONE hue, different brightness levels. The 3 blue chips all share the same base hue (~210°). Avoid Red, Green, and Violet.',
    fact: '<strong>Monochromatic harmony</strong> uses tints, shades, and tones of a single hue. It creates a clean, cohesive look — perfect for minimal UI, SaaS dashboards, and professional design systems.',
    data: {
      chips: [
        { hex: '#cce4ff', hue: 210, label: 'Sky Blue'  },
        { hex: '#5599ff', hue: 218, label: 'Blue'      },
        { hex: '#003399', hue: 214, label: 'Deep Blue' },
        { hex: '#ff3300', hue: 8,   label: 'Red'       },
        { hex: '#22cc44', hue: 134, label: 'Green'     },
        { hex: '#cc00ff', hue: 285, label: 'Violet'    },
      ],
      slotCount: 3,
      validate: 'mono',
      hueRange: 25,
    },
    points: 300,
  },
];

/* ═══════════════════ GAME STATE ═══════════════════ */
let state = {
  levelIndex: 0,
  lives: 3,
  score: 0,
  timerInterval: null,
  timeLeft: 0,
  hintUsed: false,
  answer: null,
  slotContents: [],
  _primarySet: [],
  _wheelAnswerHue: 0,
  _wheelTolerance: 25,
  binAssignments: {},
};

/* ═══════════════════ UTILITY ═══════════════════ */
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function goHome() {
  clearInterval(state.timerInterval);
  showScreen('homeScreen');
}

function showHow() {
  const box = document.getElementById('howToBox');
  box.style.display = box.style.display === 'block' ? 'none' : 'block';
}

function hslToHex(h, s, l) {
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = n => {
    const k = (n + h / 30) % 12;
    const c = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * c).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function rgbDistance(a, b) {
  return Math.sqrt((a.r-b.r)**2 + (a.g-b.g)**2 + (a.b-b.b)**2);
}

function angleDiff(a, b) {
  let d = Math.abs(a - b) % 360;
  return d > 180 ? 360 - d : d;
}

function spawnParticles(x, y) {
  const colors = ['#60a5fa','#f0538e','#10b981','#fbbf24','#a78bfa'];
  const burst = document.createElement('div');
  burst.className = 'star-burst';
  burst.style.cssText = `left:${x}px;top:${y}px;`;
  document.body.appendChild(burst);
  for (let i = 0; i < 22; i++) {
    const p = document.createElement('div');
    p.className = 'star-p';
    const angle = (i / 22) * 360;
    const dist  = 70 + Math.random() * 80;
    p.style.setProperty('--tx', `${Math.cos(angle * Math.PI/180) * dist}px`);
    p.style.setProperty('--ty', `${Math.sin(angle * Math.PI/180) * dist}px`);
    p.style.background = colors[i % colors.length];
    burst.appendChild(p);
  }
  setTimeout(() => burst.remove(), 1300);
}

/* ═══════════════════ HOME INIT ═══════════════════ */
(function initHome() {
  const grid  = document.getElementById('levelSelectGrid');
  const icons = ['🎨','🖌️','🔵','🌈','✨','🔬','🌡️','🎭','🧠','🎯'];
  const names = ['Primary','RGB Mix','Complement','Analogous','Triadic','Properties','Warm/Cool','Tint/Shade','Psychology','Monochrome'];
  LEVELS.forEach((lv, i) => {
    const btn = document.createElement('button');
    btn.className = 'level-btn';
    btn.innerHTML = `<span class="lvl-num">LV ${lv.id}</span><span class="lvl-icon">${icons[i]}</span><span class="lvl-name">${names[i]}</span>`;
    btn.onclick = () => startGame(i);
    grid.appendChild(btn);
  });

  // Progress bar init
  const prog = document.getElementById('levelProgress');
  LEVELS.forEach(() => {
    const d = document.createElement('div');
    d.className = 'prog-dot';
    prog.appendChild(d);
  });
})();

function updateProgressDots() {
  document.querySelectorAll('.prog-dot').forEach((d, i) => {
    d.classList.remove('done','active');
    if (i < state.levelIndex)       d.classList.add('done');
    else if (i === state.levelIndex) d.classList.add('active');
  });
}

/* ═══════════════════ GAME FLOW ═══════════════════ */
function startGame(levelIndex) {
  state.levelIndex = levelIndex;
  if (levelIndex === 0) { state.lives = 3; state.score = 0; }
  showScreen('gameScreen');
  loadLevel();
}

function loadLevel() {
  const lv = LEVELS[state.levelIndex];
  state.hintUsed     = false;
  state.answer       = null;
  state.slotContents = new Array((lv.data.slotCount || 3)).fill(null);

  // HUD
  document.getElementById('hudLevelNum').textContent = lv.id;
  document.getElementById('hintBtn').disabled = false;
  document.getElementById('hintBox').classList.remove('show');
  document.getElementById('hintBox').textContent = '';
  document.getElementById('levelTitle').textContent = lv.title;
  document.getElementById('levelDesc').textContent  = lv.desc;
  updateHud();
  updateProgressDots();

  // Challenge
  const area = document.getElementById('challengeArea');
  area.innerHTML = '';
  if (lv.type === 'select-multiple')  buildSelectMultiple(lv, area);
  else if (lv.type === 'slider')      buildSlider(lv, area);
  else if (lv.type === 'wheel-click') buildWheelClick(lv, area);
  else if (lv.type === 'drag-slots')  buildDragSlots(lv, area);
  else if (lv.type === 'mcq')         buildMcq(lv, area);
  else if (lv.type === 'sort-bins')   buildSortBins(lv, area);

  // Timer
  clearInterval(state.timerInterval);
  state.timeLeft = lv.timeLimit;
  updateTimerBar();
  state.timerInterval = setInterval(tickTimer, 1000);
}

function tickTimer() {
  state.timeLeft--;
  updateTimerBar();
  if (state.timeLeft <= 0) {
    clearInterval(state.timerInterval);
    loseLife("Time's up! Be quicker next time.");
  }
}

function updateTimerBar() {
  const lv  = LEVELS[state.levelIndex];
  const pct = (state.timeLeft / lv.timeLimit) * 100;
  const bar = document.getElementById('timerBar');
  bar.style.width = pct + '%';
  bar.classList.toggle('urgent', state.timeLeft <= 8);
  document.getElementById('timerSec').textContent = state.timeLeft + 's';
}

function updateHud() {
  // Hearts
  const hearts = document.querySelectorAll('.heart');
  hearts.forEach((h, i) => {
    h.textContent = i < state.lives ? '❤️' : '🖤';
    h.classList.toggle('lost', i >= state.lives);
  });
  document.getElementById('hudScore').textContent = state.score;
}

function useHint() {
  if (state.hintUsed) return;
  state.hintUsed = true;
  state.score = Math.max(0, state.score - 50);
  updateHud();
  const box = document.getElementById('hintBox');
  box.textContent = LEVELS[state.levelIndex].hint;
  box.classList.add('show');
  document.getElementById('hintBtn').disabled = true;
}

function loseLife(reason) {
  clearInterval(state.timerInterval);
  state.lives--;
  updateHud();
  document.getElementById('gameArea').classList.add('flash-wrong');
  setTimeout(() => document.getElementById('gameArea').classList.remove('flash-wrong'), 450);

  setTimeout(() => {
    document.getElementById('goSub').textContent =
      reason + (state.lives > 0 ? ` (${state.lives} ${state.lives === 1 ? 'life' : 'lives'} remaining)` : '');
    document.getElementById('goScore').textContent = state.score;
    document.getElementById('retryBtn').onclick = retryLevel;
    showScreen('gameOverScreen');
  }, 500);
}

function retryLevel() {
  if (state.lives <= 0) { state.lives = 3; state.score = 0; }
  showScreen('gameScreen');
  loadLevel();
}

function levelComplete() {
  clearInterval(state.timerInterval);
  const lv       = LEVELS[state.levelIndex];
  const timeBonus = state.timeLeft * 5;
  state.score    += lv.points + timeBonus;
  updateHud();

  spawnParticles(window.innerWidth / 2, window.innerHeight / 2);

  const isLast = state.levelIndex >= LEVELS.length - 1;
  document.getElementById('lcTitle').textContent = `Level ${lv.id} Complete!`;
  document.getElementById('lcScore').textContent = state.score;
  document.getElementById('lcSub').innerHTML =
    `+${lv.points} base pts &nbsp;·&nbsp; <span style="color:var(--green)">+${timeBonus} time bonus</span>`;
  document.getElementById('lcFact').innerHTML = lv.fact;
  document.getElementById('nextLevelBtn').textContent = isLast ? 'See Final Score →' : 'Next Level →';
  document.getElementById('nextLevelBtn').onclick     = isLast ? showWin : nextLevel;

  showScreen('levelCompleteScreen');
}

function nextLevel() {
  state.levelIndex++;
  if (state.levelIndex >= LEVELS.length) { showWin(); return; }
  showScreen('gameScreen');
  loadLevel();
}

function showWin() {
  document.getElementById('winScore').textContent = state.score;
  spawnParticles(window.innerWidth / 2, window.innerHeight / 3);
  showScreen('winScreen');
}

/* ═══════════════════ LEVEL 1 — SELECT MULTIPLE ═══════════════════ */
function buildSelectMultiple(lv, area) {
  const selected = new Set();
  state.answer   = selected;
  state._primarySet = lv.data.swatches.filter(s => s.primary).map(s => s.hex);

  const wrap = document.createElement('div');
  wrap.className = 'color-swatches';

  [...lv.data.swatches].sort(() => Math.random() - 0.5).forEach(sw => {
    const w    = document.createElement('div');
    w.className = 'swatch-wrap';

    const chip = document.createElement('div');
    chip.className = 'swatch';
    chip.style.background = sw.hex;
    chip.title = sw.label;

    const lbl  = document.createElement('span');
    lbl.className = 'swatch-label';
    lbl.textContent = sw.label;

    w.addEventListener('click', () => {
      if (selected.has(sw.hex)) {
        selected.delete(sw.hex);
        chip.classList.remove('selected');
      } else if (selected.size < lv.data.selectCount) {
        selected.add(sw.hex);
        chip.classList.add('selected');
      }
    });

    w.appendChild(chip);
    w.appendChild(lbl);
    wrap.appendChild(w);
  });
  area.appendChild(wrap);
}

/* ═══════════════════ LEVEL 2 — SLIDER ═══════════════════ */
function buildSlider(lv, area) {
  const { target, tolerance, label } = lv.data;

  const panel = document.createElement('div');
  panel.className = 'rgb-mixer-panel';
  panel.innerHTML = `
    <div class="color-compare">
      <div class="chip-group">
        <div class="color-chip" style="background:rgb(${target.r},${target.g},${target.b})"></div>
        <div class="chip-label">Target: ${label}</div>
      </div>
      <div class="compare-arrow">⇄</div>
      <div class="chip-group">
        <div class="color-chip" id="mixPreview" style="background:rgb(0,0,128)"></div>
        <div class="chip-label">Your Mix</div>
      </div>
    </div>
    <div class="sliders-panel">
      <div class="slider-row">
        <span class="slider-ch r">R</span>
        <input type="range" id="slR" min="0" max="255" value="0">
        <span class="slider-val" id="slRv">0</span>
      </div>
      <div class="slider-row">
        <span class="slider-ch g">G</span>
        <input type="range" id="slG" min="0" max="255" value="0">
        <span class="slider-val" id="slGv">0</span>
      </div>
      <div class="slider-row">
        <span class="slider-ch b">B</span>
        <input type="range" id="slB" min="0" max="255" value="128">
        <span class="slider-val" id="slBv">128</span>
      </div>
      <div class="match-row">
        <span>Match</span>
        <div class="match-track"><div class="match-fill" id="matchFill" style="width:0%"></div></div>
        <span id="matchPct">0%</span>
      </div>
    </div>
  `;
  area.appendChild(panel);

  function updateMix() {
    const r = +document.getElementById('slR').value;
    const g = +document.getElementById('slG').value;
    const b = +document.getElementById('slB').value;
    document.getElementById('slRv').textContent = r;
    document.getElementById('slGv').textContent = g;
    document.getElementById('slBv').textContent = b;
    document.getElementById('mixPreview').style.background = `rgb(${r},${g},${b})`;
    state.answer = { r, g, b };

    const dist   = rgbDistance({ r, g, b }, target);
    const maxD   = Math.sqrt(255**2 * 3);
    const pct    = Math.round((1 - dist / maxD) * 100);
    const fill   = document.getElementById('matchFill');
    fill.style.width      = pct + '%';
    fill.style.background = pct > 80 ? 'var(--green)' : pct > 50 ? 'var(--gold)' : 'var(--pink)';
    document.getElementById('matchPct').textContent = pct + '%';
  }

  ['slR','slG','slB'].forEach(id => document.getElementById(id).addEventListener('input', updateMix));
  updateMix();
}

/* ═══════════════════ LEVEL 3 — WHEEL CLICK ═══════════════════ */
function buildWheelClick(lv, area) {
  const { baseColor, baseHue, baseLabel, answerHue, tolerance } = lv.data;
  state.answer           = null;
  state._wheelAnswerHue  = answerHue;
  state._wheelTolerance  = tolerance;

  const layout = document.createElement('div');
  layout.className = 'wheel-layout';

  const chipsRow = document.createElement('div');
  chipsRow.className = 'wheel-chips-row';
  chipsRow.innerHTML = `
    <div class="chip-group">
      <div class="color-chip" style="background:${baseColor}"></div>
      <div class="chip-label">Base: ${baseLabel}</div>
    </div>
    <div class="compare-arrow" style="font-size:1.2rem;">↔</div>
    <div class="chip-group selected-group">
      <div id="selectedColorChip" style="width:72px;height:72px;border-radius:10px;background:rgba(255,255,255,0.04);border:2px dashed rgba(255,255,255,0.18);transition:background 0.2s,border-color 0.2s;"></div>
      <div class="chip-label" id="selectedColorLabel">Click the wheel</div>
    </div>
  `;

  const canvas = document.createElement('canvas');
  canvas.id = 'wheelCanvas';
  const SIZE = Math.min(window.innerWidth - 48, 270);
  canvas.width  = SIZE;
  canvas.height = SIZE;

  layout.appendChild(chipsRow);
  layout.appendChild(canvas);
  area.appendChild(layout);

  const ctx = canvas.getContext('2d');
  const cx = SIZE/2, cy = SIZE/2, r = SIZE/2 - 4;

  function drawWheel(selectedHue) {
    ctx.clearRect(0,0,SIZE,SIZE);
    for (let deg = 0; deg < 360; deg++) {
      const grad = ctx.createRadialGradient(cx,cy,r*0.3,cx,cy,r);
      grad.addColorStop(0, `hsl(${deg},20%,100%)`);
      grad.addColorStop(1, `hsl(${deg},100%,50%)`);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, (deg-1)*Math.PI/180 - Math.PI/2, (deg+1)*Math.PI/180 - Math.PI/2);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();
    }
    // Base marker
    drawMarker(baseHue, baseColor, 'B');
    // Selected marker
    if (selectedHue !== null) {
      const sa = (selectedHue - 90) * Math.PI/180;
      const sx = cx + Math.cos(sa)*(r*0.75);
      const sy = cy + Math.sin(sa)*(r*0.75);
      ctx.beginPath();
      ctx.arc(sx, sy, 13, 0, Math.PI*2);
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(sx, sy, 9, 0, Math.PI*2);
      ctx.fillStyle = hslToHex(selectedHue, 100, 50);
      ctx.fill();
    }
  }

  function drawMarker(hue, color, text) {
    const angle = (hue - 90)*Math.PI/180;
    const mx = cx + Math.cos(angle)*(r*0.75);
    const my = cy + Math.sin(angle)*(r*0.75);
    ctx.beginPath();
    ctx.arc(mx, my, 11, 0, Math.PI*2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 9px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, mx, my);
  }

  drawWheel(null);

  function getHue(px, py) {
    const dx = px-cx, dy = py-cy;
    const d2 = dx*dx+dy*dy;
    if (d2 > r*r || d2 < (r*0.28)*(r*0.28)) return null;
    let a = Math.atan2(dy, dx)*180/Math.PI + 90;
    return ((a % 360) + 360) % 360;
  }

  function onPick(px, py) {
    const scale = SIZE / canvas.getBoundingClientRect().width;
    const hue = getHue(px*scale, py*scale);
    if (hue === null) return;
    state.answer = hue;
    const hex = hslToHex(hue, 100, 50);
    document.getElementById('selectedColorChip').style.background = hex;
    document.getElementById('selectedColorChip').style.borderStyle = 'solid';
    document.getElementById('selectedColorLabel').textContent = `Hue: ${Math.round(hue)}°`;
    drawWheel(hue);
  }

  canvas.addEventListener('click', e => {
    const rect = canvas.getBoundingClientRect();
    onPick(e.clientX - rect.left, e.clientY - rect.top);
  });
  canvas.addEventListener('touchend', e => {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const t = e.changedTouches[0];
    onPick(t.clientX - rect.left, t.clientY - rect.top);
  }, { passive: false });
}

/* ═══════════════════ LEVEL 4 & 5 — DRAG SLOTS ═══════════════════ */
function buildDragSlots(lv, area) {
  const { chips, slotCount } = lv.data;
  state.slotContents = new Array(slotCount).fill(null);

  const section = document.createElement('div');
  section.className = 'drag-section';

  const palLabel = document.createElement('p');
  palLabel.className = 'section-label';
  palLabel.textContent = 'Drag chips into the slots below';

  const palette = document.createElement('div');
  palette.className = 'drag-palette';
  palette.id = 'dragPalette';
  [...chips].sort(() => Math.random()-0.5).forEach(c => palette.appendChild(makeDragChip(c)));

  const slotsLabel = document.createElement('p');
  slotsLabel.className = 'slots-label';
  slotsLabel.textContent = `Your Selection (${slotCount} slots)`;

  const slotsRow = document.createElement('div');
  slotsRow.className = 'slots-row';
  for (let i = 0; i < slotCount; i++) {
    const sw   = document.createElement('div');
    sw.className = 'slot-wrap';
    const slot = document.createElement('div');
    slot.className = 'drop-slot';
    slot.dataset.slotIndex = i;
    const lbl  = document.createElement('div');
    lbl.className = 'slot-label';
    lbl.textContent = 'Slot ' + (i+1);
    setupDropTarget(slot, i);
    sw.appendChild(slot);
    sw.appendChild(lbl);
    slotsRow.appendChild(sw);
  }

  section.appendChild(palLabel);
  section.appendChild(palette);
  section.appendChild(slotsLabel);
  section.appendChild(slotsRow);
  area.appendChild(section);
}

let _dragData = null, _dragEl = null, _dragFrom = null;

function makeDragChip(chipData) {
  const el = document.createElement('div');
  el.className = 'drag-chip';
  el.style.background = chipData.hex;
  el.title = chipData.label;
  el.dataset.hex   = chipData.hex;
  el.dataset.hue   = chipData.hue;
  el.dataset.label = chipData.label;
  el.draggable = true;

  el.addEventListener('dragstart', e => {
    _dragData = chipData;
    _dragEl   = el;
    _dragFrom = el.dataset.fromSlot !== undefined ? +el.dataset.fromSlot : null;
    el.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
  });
  el.addEventListener('dragend', () => el.classList.remove('dragging'));
  setupTouchDrag(el, chipData);
  return el;
}

function setupDropTarget(slot, index) {
  slot.addEventListener('dragover',  e => { e.preventDefault(); slot.classList.add('drag-over'); });
  slot.addEventListener('dragleave', () => slot.classList.remove('drag-over'));
  slot.addEventListener('drop', e => {
    e.preventDefault();
    slot.classList.remove('drag-over');
    if (_dragData) placeChip(slot, index, _dragData, _dragEl, _dragFrom);
  });
}

function placeChip(slot, index, chipData, chipEl, fromSlot) {
  if (state.slotContents[index]) {
    const old = state.slotContents[index];
    if (fromSlot !== null) {
      const srcSlot = document.querySelectorAll('.drop-slot')[fromSlot];
      placeChipDirect(srcSlot, fromSlot, old);
    } else {
      document.getElementById('dragPalette').appendChild(makeDragChip(old));
    }
  }
  if (fromSlot !== null) {
    clearSlot(document.querySelectorAll('.drop-slot')[fromSlot], fromSlot);
  } else {
    chipEl && chipEl.parentNode && chipEl.remove();
  }
  placeChipDirect(slot, index, chipData);
  _dragData = _dragEl = _dragFrom = null;
}

function placeChipDirect(slot, index, chipData) {
  slot.innerHTML = '';
  slot.classList.add('filled');
  const chip = makeDragChip(chipData);
  chip.dataset.fromSlot = index;
  slot.appendChild(chip);
  state.slotContents[index] = chipData;
}

function clearSlot(slot, index) {
  slot.innerHTML = '';
  slot.classList.remove('filled');
  state.slotContents[index] = null;
}

/* Touch drag */
let _tClone = null, _tOX = 0, _tOY = 0;

function setupTouchDrag(el, chipData) {
  el.addEventListener('touchstart', e => {
    const t    = e.touches[0];
    const rect = el.getBoundingClientRect();
    _tOX = t.clientX - rect.left;
    _tOY = t.clientY - rect.top;
    _dragData = chipData;
    _dragEl   = el;
    _dragFrom = el.dataset.fromSlot !== undefined ? +el.dataset.fromSlot : null;
    _tClone   = el.cloneNode(true);
    Object.assign(_tClone.style, {
      position:'fixed', width:rect.width+'px', height:rect.height+'px',
      opacity:'0.85', pointerEvents:'none', zIndex:'999',
      left:(t.clientX - _tOX)+'px', top:(t.clientY - _tOY)+'px',
      transition:'none',
    });
    document.body.appendChild(_tClone);
    el.classList.add('dragging');
  }, { passive: true });

  el.addEventListener('touchmove', e => {
    e.preventDefault();
    const t = e.touches[0];
    if (_tClone) { _tClone.style.left=(t.clientX-_tOX)+'px'; _tClone.style.top=(t.clientY-_tOY)+'px'; }
  }, { passive: false });

  el.addEventListener('touchend', e => {
    el.classList.remove('dragging');
    _tClone && _tClone.remove(); _tClone = null;
    const t  = e.changedTouches[0];
    const target = document.elementFromPoint(t.clientX, t.clientY);
    const slot = target && (target.classList.contains('drop-slot') ? target : target.closest?.('.drop-slot'));
    if (slot && _dragData) placeChip(slot, +slot.dataset.slotIndex, _dragData, _dragEl, _dragFrom);
    _dragData = _dragEl = _dragFrom = null;
  });
}

/* ═══════════════════ LEVEL 6 & 8 & 9 — MCQ ═══════════════════ */
function buildMcq(lv, area) {
  const { colorA, colorB, question, choices } = lv.data;
  state.answer = null;

  const container = document.createElement('div');
  container.className = 'mcq-container';

  // Optional two-color comparison (Levels 6 & 8)
  if (colorA && colorB) {
    const hexA = hslToHex(colorA.h, colorA.s, colorA.l);
    const hexB = hslToHex(colorB.h, colorB.s, colorB.l);
    const row = document.createElement('div');
    row.className = 'mcq-chips-row';
    row.innerHTML = `
      <div class="chip-group">
        <div class="color-chip" style="background:${hexA};box-shadow:0 6px 24px ${hexA}66"></div>
        <div class="chip-label">Color A</div>
      </div>
      <div class="mcq-arrow">→</div>
      <div class="chip-group">
        <div class="color-chip" style="background:${hexB};box-shadow:0 6px 24px ${hexB}66"></div>
        <div class="chip-label">Color B</div>
      </div>
    `;
    container.appendChild(row);
  }

  const qEl = document.createElement('p');
  qEl.className = 'mcq-q-text';
  qEl.textContent = question;
  container.appendChild(qEl);

  const choicesEl = document.createElement('div');
  choicesEl.className = 'mcq-choices';

  choices.forEach((c, i) => {
    const btn = document.createElement('button');
    btn.className = 'mcq-btn';
    if (c.hex) {
      btn.innerHTML = `<div class="mcq-choice-swatch" style="background:${c.hex};box-shadow:0 3px 14px ${c.hex}66;"></div><span>${c.text}</span>`;
    } else {
      btn.textContent = c.text;
    }
    btn.addEventListener('click', () => {
      choicesEl.querySelectorAll('.mcq-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      state.answer = i;
    });
    choicesEl.appendChild(btn);
  });

  container.appendChild(choicesEl);
  area.appendChild(container);
}

/* ═══════════════════ LEVEL 7 — SORT BINS ═══════════════════ */
function buildSortBins(lv, area) {
  const { chips } = lv.data;
  state.binAssignments = {};
  chips.forEach(c => { state.binAssignments[c.hex] = null; });

  const topLabel = document.createElement('p');
  topLabel.className = 'section-label';
  topLabel.textContent = 'Click each swatch to assign it — tap again to cycle to the next option';
  area.appendChild(topLabel);

  const grid = document.createElement('div');
  grid.className = 'sort-grid';

  [...chips].sort(() => Math.random() - 0.5).forEach(c => {
    const wrap = document.createElement('div');
    wrap.className = 'sort-chip-wrap';

    const chip = document.createElement('div');
    chip.className = 'sort-chip';
    chip.style.background = c.hex;
    chip.style.boxShadow = `0 4px 20px ${c.hex}55`;

    const lbl = document.createElement('div');
    lbl.className = 'swatch-label';
    lbl.textContent = c.label;

    const pill = document.createElement('div');
    pill.className = 'sort-pill';
    pill.textContent = 'Tap to sort';

    wrap.addEventListener('click', () => {
      const cur = state.binAssignments[c.hex];
      const next = cur === null ? 'warm' : cur === 'warm' ? 'cool' : null;
      state.binAssignments[c.hex] = next;
      if (next === 'warm') {
        pill.textContent = '🔥 Warm';
        pill.className = 'sort-pill warm';
        wrap.style.borderColor = 'rgba(249,115,22,.55)';
      } else if (next === 'cool') {
        pill.textContent = '❄️ Cool';
        pill.className = 'sort-pill cool';
        wrap.style.borderColor = 'rgba(96,165,250,.55)';
      } else {
        pill.textContent = 'Tap to sort';
        pill.className = 'sort-pill';
        wrap.style.borderColor = '';
      }
    });

    wrap.appendChild(chip);
    wrap.appendChild(lbl);
    wrap.appendChild(pill);
    grid.appendChild(wrap);
  });

  area.appendChild(grid);
}

/* ═══════════════════ CHECK ANSWER ═══════════════════ */
function checkAnswer() {
  const lv = LEVELS[state.levelIndex];

  if (lv.type === 'select-multiple') {
    const sel = [...state.answer];
    if (sel.length < lv.data.selectCount) { flashMsg('Select ' + lv.data.selectCount + ' colors first!'); return; }
    const ok = state._primarySet.every(h => sel.includes(h)) && sel.every(h => state._primarySet.includes(h));
    if (ok) levelComplete(); else loseLife('Wrong selection! Those aren\'t all primary colors.');
    return;
  }

  if (lv.type === 'slider') {
    if (!state.answer) { flashMsg('Adjust the sliders first!'); return; }
    if (rgbDistance(state.answer, lv.data.target) <= lv.data.tolerance) levelComplete();
    else loseLife('Not close enough! Get that match meter higher.');
    return;
  }

  if (lv.type === 'wheel-click') {
    if (state.answer === null) { flashMsg('Click a color on the wheel first!'); return; }
    if (angleDiff(state.answer, state._wheelAnswerHue) <= state._wheelTolerance) levelComplete();
    else loseLife(`Not the complementary color! Hint: it's ${lv.data.answerLabel}.`);
    return;
  }

  if (lv.type === 'drag-slots') {
    const filled = state.slotContents.filter(Boolean);
    if (filled.length < lv.data.slotCount) { flashMsg('Fill all ' + lv.data.slotCount + ' slots first!'); return; }

    const hues = filled.map(c => c.hue);
    if (lv.data.validate === 'analogous') {
      const sorted = [...hues].sort((a,b) => a-b);
      let ok = false;
      for (let i = 0; i < sorted.length; i++) {
        const arc = [...sorted.slice(i), ...sorted.slice(0,i).map(h => h+360)];
        if (arc[arc.length-1] - arc[0] <= lv.data.arcMax) { ok = true; break; }
      }
      if (ok) levelComplete(); else loseLife('Not analogous! Colors must be neighbors on the wheel (within 90°).');
    } else if (lv.data.validate === 'mono') {
      const sorted = [...hues].sort((a,b) => a-b);
      const spread = sorted[sorted.length-1] - sorted[0];
      if (spread <= (lv.data.hueRange || 30)) levelComplete();
      else loseLife('Not monochromatic! All 3 must share the same hue. Try the 3 blue variations.');
    } else {
      const sorted = [...hues].sort((a,b) => a-b);
      const gaps = [sorted[1]-sorted[0], sorted[2]-sorted[1], 360-(sorted[2]-sorted[0])];
      if (gaps.every(g => g >= lv.data.gapMin && g <= lv.data.gapMax)) levelComplete();
      else loseLife('Not triadic! Colors must be ~120° apart. Try: Red, Yellow, Blue.');
    }
  }

  if (lv.type === 'mcq') {
    if (state.answer === null) { flashMsg('Pick an answer first!'); return; }
    if (state.answer === lv.data.correct) levelComplete();
    else loseLife('Not quite! The answer was: ' + lv.data.choices[lv.data.correct].text.replace(/^[\S]+\s+/,''));
    return;
  }

  if (lv.type === 'sort-bins') {
    const unassigned = lv.data.chips.filter(c => !state.binAssignments[c.hex]);
    if (unassigned.length > 0) { flashMsg('Assign all ' + lv.data.chips.length + ' colors first!'); return; }
    const allCorrect = lv.data.chips.every(c => state.binAssignments[c.hex] === c.bin);
    if (allCorrect) levelComplete();
    else loseLife('Some are in the wrong group! Reds/oranges/yellows = Warm. Blues/cyans/purples = Cool.');
    return;
  }
}

function flashMsg(msg) {
  const old = document.getElementById('flashMsg');
  if (old) old.remove();
  const el  = document.createElement('div');
  el.id     = 'flashMsg';
  el.textContent = msg;
  const sr  = document.querySelector('.submit-row');
  sr.parentNode.insertBefore(el, sr);
  setTimeout(() => el.remove(), 2200);
}
