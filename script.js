/* =========================================================
   Happy Birthday, Ryan!
   ---------------------------------------------------------
   ✏️  All the words live in CONFIG below — edit freely.
   Layers are shown in the order of CONFIG.layers.
   ========================================================= */

const CONFIG = {
  // Tag on the very first (unopened) box.
  firstTag: { title: 'For Ryan 🎁', hint: '— tap to open' },

  // Button shown under each layer once it's done.
  nextLabel: 'Unwrap the next layer 🎁',

  // Tag on every box after the first; rotates through this list.
  tagLines: ['Keep going…', 'There’s more…', 'Almost? Maybe…', 'Don’t stop now!', 'Ooh, what’s this?', 'One more peek…'],

  // Line shown above the box before each layer (one per layer).
  teasers: [
    'I got you something…',
    'Wait — there’s more inside!',
    'Layers on layers…',
    'This one feels… official.',
    'Do you smell coffee? ☕',
    'Somebody wrote you something…',
    'Another envelope?!',
    'Something tasty this way comes…',
    'Last one. Make it count!',
  ],

  // Wrapping paper per layer: [paper, paper shadow, ribbon, ribbon shadow]
  wraps: [
    ['#ff7a66', '#c94a3a', '#f5c45e', '#c98d22'],
    ['#2fb3a4', '#1b7a71', '#f5c45e', '#c98d22'],
    ['#8a4fb0', '#5a2c7a', '#ff9fb8', '#d0677f'],
    ['#f5c45e', '#c98d22', '#ff7a66', '#c94a3a'],
    ['#3b5bab', '#24386e', '#f5c45e', '#c98d22'],
    ['#ff9fb8', '#d0677f', '#fff6ea', '#d9c7b0'],
    ['#2fb3a4', '#1b7a71', '#ff7a66', '#c94a3a'],
    ['#ff7a66', '#c94a3a', '#3cc4b4', '#1b7a71'],
    ['#1f1a3a', '#0e0b20', '#f5c45e', '#c98d22'],
  ],

  layers: [
    // 1 — Wish jar (nothing is saved or sent anywhere)
    {
      type: 'wish',
      title: 'Make a birthday wish!',
      lead: 'Write it down, drop it in the jar, and let the magic do the rest.',
      placeholder: 'I wish…',
      button: 'Drop it in',
      safeLine: 'Your wish is safe with the jar ✨',
    },

    // 2 — Balloon pop
    {
      type: 'balloons',
      title: 'Pop the balloons!',
      lead: 'Pop the balloons to reveal a hidden truth…',
      colors: ['#ff7a66', '#f5c45e', '#3cc4b4', '#ff9fb8', '#7cb8ff', '#b98cff'],
      reveal: 'You don’t look a day over 25! 🎈',
    },

    // 3 — Fun fact
    {
      type: 'facts',
      eyebrow: 'Fun fact · October 16',
      title: 'Did you know?',
      lead: 'You share your birthday with some legends.',
      month: 'OCT',
      day: '16',
      facts: [
        { emoji: '📖', name: 'Dictionary Day', text: 'Celebrated every October 16 in honor of Noah Webster’s birthday — the man who gave America its dictionary.' },
        { emoji: '✒️', name: 'Oscar Wilde', text: 'The legendary wit and writer was born on October 16, 1854.' },
        { emoji: '🏰', name: 'The Walt Disney Company', text: 'Founded on October 16, 1923. Some birthdays come with a little magic.' },
      ],
    },

    // 4 — Coupon: skip a meeting
    {
      type: 'coupon',
      title: 'An official document',
      kicker: 'FREE PASS',
      text: 'Skip one meeting of your choice. No questions asked.*',
      fine: '*Some questions may be asked.',
      stub: 'Admit one',
      serial: 'No. 1016',
      claim: '✂️ Claim it',
      claimed: 'Claimed — use it wisely',
    },

    // 5 — Coupon: coffee
    {
      type: 'coupon',
      title: 'Caffeine incoming',
      kicker: '☕ COFFEE COUPON',
      text: 'One coffee of your choice, courtesy of Josh.',
      stub: 'Redeem with Josh',
      serial: 'No. 1016-B',
      claim: '✂️ Claim it',
      claimed: 'Claimed — Josh owes you',
    },

    // 6 — Message from Josh  ✏️ Josh: edit your message here (one string per paragraph)
    {
      type: 'letter',
      title: 'A message from Josh',
      body: [
        'Happy Birthday Bro and Congrats 👏 on achieving TSR < 9000!😱',
      ],
      signature: '— Josh',
      stamp: '🏆',
    },

    // 7 — Message from Phoebe
    {
      type: 'letter',
      title: 'A message from Phoebe',
      body: [
        'Happy birthday, Ryan! Thanks for being an awesome work brother. You’re funny, talented, and clearly have great taste in coworkers (jk… mostly 😄).',
        'Sending birthday wishes all the way from the other side of the world. Enjoy your day, you’ve earned it!',
      ],
      signature: '— Phoebe',
      stamp: '🌏',
    },

    // 8 — Lunch is on Bill
    {
      type: 'lunch',
      eyebrow: 'Breaking news 📣',
      title: '🍔 Lunch is on Bill today!',
      food: ['🍟', '🍔', '🥤'],
      sub: 'Thanks, Bill! 🙌',
    },

    // 9 — Grand finale
    {
      type: 'finale',
      title: 'Happy Birthday, Ryan!',
      emoji: '🎉',
      sub: 'Here’s to your best year yet.',
      again: 'Open it again ↺',
    },
  ],
};

/* ========================================================= */

const INTERACTIVE = new Set(['wish', 'balloons']);
const PALETTE = ['#f5c45e', '#ff7a66', '#3cc4b4', '#ff9fb8', '#7cb8ff', '#fff6ea', '#b98cff'];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const motionOK = () => !reducedMotion.matches;
const wait = (ms) => (motionOK() ? ms : Math.min(ms, 60));

/* ---------- tiny DOM helper ---------- */
function h(tag, props = {}, ...children) {
  const el = document.createElement(tag);
  for (const [key, val] of Object.entries(props)) {
    if (val == null || val === false) continue;
    if (key === 'class') el.className = val;
    else if (key === 'style') el.style.cssText = val;
    else if (key.startsWith('on')) el.addEventListener(key.slice(2), val);
    else el.setAttribute(key, val === true ? '' : val);
  }
  for (const child of children.flat()) {
    if (child == null || child === false) continue;
    el.append(child.nodeType ? child : document.createTextNode(child));
  }
  return el;
}

/* =========================================================
   Confetti (hand-rolled, no dependencies)
   ========================================================= */
const Confetti = (() => {
  const canvas = document.getElementById('confetti');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let raf = null;
  let last = 0;
  let W = 0;
  let H = 0;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener('resize', resize);
  resize();

  function burst({
    x = W / 2, y = H / 2, xSpread = 0, count = 80, angle = 90, spread = 70,
    velocity = 12, colors = PALETTE, gravity = 0.3, scalar = 1, ticks = 220,
  } = {}) {
    if (!motionOK()) return;
    for (let i = 0; i < count && particles.length < 900; i++) {
      const a = ((angle + (Math.random() - 0.5) * spread) * Math.PI) / 180;
      const v = velocity * (0.45 + Math.random() * 0.55);
      const shape = Math.random();
      particles.push({
        x: x + (Math.random() - 0.5) * xSpread,
        y,
        vx: Math.cos(a) * v,
        vy: -Math.sin(a) * v,
        g: gravity,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.3,
        wobble: Math.random() * Math.PI * 2,
        ws: 0.05 + Math.random() * 0.1,
        w: (shape < 0.3 ? 4 : 7 + Math.random() * 4) * scalar,
        h: (shape < 0.3 ? 14 : shape < 0.6 ? 7 : 10 + Math.random() * 4) * scalar,
        round: shape >= 0.3 && shape < 0.45,
        color: colors[(Math.random() * colors.length) | 0],
        life: ticks * (0.75 + Math.random() * 0.5),
        max: 0,
      });
      particles[particles.length - 1].max = particles[particles.length - 1].life;
    }
    if (!raf) {
      last = performance.now();
      raf = requestAnimationFrame(tick);
    }
  }

  function tick(now) {
    const dt = Math.min((now - last) / 16.67, 3);
    last = now;
    ctx.clearRect(0, 0, W, H);
    particles = particles.filter((p) => p.life > 0 && p.y < H + 60);
    for (const p of particles) {
      p.vx *= Math.pow(0.985, dt);
      p.vy = p.vy * Math.pow(0.985, dt) + p.g * dt;
      p.x += (p.vx + Math.sin(p.wobble) * 0.6) * dt;
      p.y += p.vy * dt;
      p.rot += p.vr * dt;
      p.wobble += p.ws * dt;
      p.life -= dt;

      ctx.save();
      ctx.globalAlpha = Math.min(1, p.life / (p.max * 0.3));
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.scale(1, Math.cos(p.wobble * 2));
      ctx.fillStyle = p.color;
      if (p.round) {
        ctx.beginPath();
        ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      }
      ctx.restore();
    }
    if (particles.length) {
      raf = requestAnimationFrame(tick);
    } else {
      raf = null;
      ctx.clearRect(0, 0, W, H);
    }
  }

  function celebrate() {
    if (!motionOK()) return;
    burst({ x: W / 2, y: H * 0.5, count: 170, spread: 110, velocity: 17 });
    setTimeout(() => {
      burst({ x: -10, y: H * 0.75, angle: 60, spread: 50, count: 120, velocity: 22 });
      burst({ x: W + 10, y: H * 0.75, angle: 120, spread: 50, count: 120, velocity: 22 });
    }, 260);
    setTimeout(() => {
      burst({ x: W / 2, y: -20, xSpread: W, angle: 270, spread: 40, count: 160, velocity: 3, gravity: 0.12, ticks: 420 });
    }, 750);
  }

  return { burst, celebrate };
})();

/* =========================================================
   Sound (Web Audio, synthesized — muted by default)
   ========================================================= */
const Sound = (() => {
  let ctx = null;
  let master = null;
  let noise = null;
  let muted = true;

  function audio() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = 0.7;
      master.connect(ctx.destination);
      noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
      const data = noise.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  function envelope(gain, t, peak, dur) {
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(peak, t + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  }

  function noiseHit(t, { type = 'bandpass', freq = 1200, q = 0.8, peak = 0.4, dur = 0.1 }) {
    const src = ctx.createBufferSource();
    src.buffer = noise;
    const filter = ctx.createBiquadFilter();
    filter.type = type;
    filter.frequency.value = freq;
    filter.Q.value = q;
    const gain = ctx.createGain();
    envelope(gain, t, peak, dur);
    src.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    src.start(t, Math.random() * 0.5);
    src.stop(t + dur + 0.02);
  }

  function tone(t, { freq = 440, to = null, type = 'sine', peak = 0.2, dur = 0.3 }) {
    const osc = ctx.createOscillator();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    if (to) osc.frequency.exponentialRampToValueAtTime(to, t + dur);
    const gain = ctx.createGain();
    envelope(gain, t, peak, dur);
    osc.connect(gain);
    gain.connect(master);
    osc.start(t);
    osc.stop(t + dur + 0.02);
  }

  const play = (fn) => () => {
    if (muted || !audio()) return;
    fn(ctx.currentTime);
  };

  return {
    pop: play((t) => {
      noiseHit(t, { freq: 1400, q: 0.7, peak: 0.55, dur: 0.09 });
      tone(t, { freq: 240, to: 60, peak: 0.35, dur: 0.08 });
    }),
    unwrap: play((t) => {
      for (let i = 0; i < 6; i++) {
        noiseHit(t + i * 0.07 + Math.random() * 0.03, {
          type: 'highpass', freq: 2200 + Math.random() * 2500, q: 0.5,
          peak: 0.12 + Math.random() * 0.1, dur: 0.06 + Math.random() * 0.05,
        });
      }
    }),
    chime: play((t) => {
      [1046.5, 1318.5, 1568, 2093].forEach((f, i) => tone(t + i * 0.09, { freq: f, peak: 0.12, dur: 0.9 }));
    }),
    stamp: play((t) => {
      tone(t, { freq: 140, to: 50, peak: 0.45, dur: 0.14 });
      noiseHit(t, { type: 'lowpass', freq: 600, q: 0.5, peak: 0.3, dur: 0.08 });
    }),
    fanfare: play((t) => {
      [523.25, 659.25, 783.99].forEach((f, i) => tone(t + i * 0.12, { freq: f, type: 'triangle', peak: 0.16, dur: 0.25 }));
      [523.25, 659.25, 783.99, 1046.5].forEach((f) => tone(t + 0.4, { freq: f, type: 'triangle', peak: 0.1, dur: 1.2 }));
    }),
    setMuted(value) {
      muted = value;
      if (!muted) audio();
    },
    get muted() { return muted; },
  };
})();

/* =========================================================
   Layer renderers — each returns the nodes for the card body.
   `done()` reveals the "next" button (interactive layers only).
   ========================================================= */
const JAR_SVG = `
<svg class="jar" viewBox="0 0 160 200" aria-hidden="true" focusable="false">
  <defs>
    <linearGradient id="jarGlass" x1="0" x2="1">
      <stop offset="0" stop-color="#fff" stop-opacity=".22"/>
      <stop offset=".5" stop-color="#fff" stop-opacity=".05"/>
      <stop offset="1" stop-color="#fff" stop-opacity=".16"/>
    </linearGradient>
    <radialGradient id="jarGlow" cx=".5" cy=".62" r=".55">
      <stop offset="0" stop-color="#fff1c2" stop-opacity=".95"/>
      <stop offset=".55" stop-color="#f5c45e" stop-opacity=".4"/>
      <stop offset="1" stop-color="#f5c45e" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <ellipse class="jar-light" cx="80" cy="130" rx="62" ry="64" fill="url(#jarGlow)"/>
  <path d="M50 30 h60 c0 12 26 16 26 44 v92 c0 14 -10 24 -24 24 h-64 c-14 0 -24 -10 -24 -24 v-92 c0 -28 26 -32 26 -44z"
        fill="url(#jarGlass)" stroke="rgba(255,255,255,.55)" stroke-width="2.5"/>
  <g class="jar-notes"></g>
  <circle class="firefly" cx="60" cy="120" r="2.6" fill="#fff1c2" style="--d:.1s"/>
  <circle class="firefly" cx="100" cy="100" r="2" fill="#fff1c2" style="--d:.6s"/>
  <circle class="firefly" cx="88" cy="150" r="2.4" fill="#fff1c2" style="--d:.3s"/>
  <circle class="firefly" cx="48" cy="160" r="1.8" fill="#fff1c2" style="--d:.9s"/>
  <circle class="firefly" cx="112" cy="140" r="2.2" fill="#fff1c2" style="--d:1.2s"/>
  <path d="M36 82 v70" stroke="rgba(255,255,255,.35)" stroke-width="5" stroke-linecap="round"/>
  <rect x="46" y="22" width="68" height="10" rx="4" fill="#f5c45e"/>
  <g class="jar-lid">
    <rect x="48" y="6" width="64" height="16" rx="5" fill="#c98d22"/>
    <rect x="48" y="6" width="64" height="5" rx="2.5" fill="#f5c45e"/>
  </g>
</svg>`;

function sparkleAround(container, count = 12) {
  if (!motionOK()) return;
  for (let i = 0; i < count; i++) {
    const s = h('span', {
      class: 'sparkle',
      'aria-hidden': 'true',
      style: `left:${5 + Math.random() * 90}%;top:${10 + Math.random() * 85}%;--size:${10 + Math.random() * 14}px;--d:${(Math.random() * 0.6).toFixed(2)}s`,
    }, '✦');
    container.append(s);
    setTimeout(() => s.remove(), 1900);
  }
}

const RENDERERS = {
  wish(layer, { done }) {
    const jarWrap = h('div', { class: 'jar-wrap' });
    jarWrap.innerHTML = JAR_SVG;

    const input = h('textarea', {
      id: 'wishInput', class: 'wish-input', rows: '2', maxlength: '140',
      placeholder: layer.placeholder, autocomplete: 'off',
    });
    const form = h('form', { class: 'wish-form', autocomplete: 'off' },
      h('label', { for: 'wishInput', class: 'sr-only' }, 'Your birthday wish'),
      input,
      h('button', { class: 'btn', type: 'submit' }, layer.button),
    );
    const safe = h('p', { class: 'wish-safe', hidden: true }, layer.safeLine);

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) {
        form.classList.remove('is-shake');
        void form.offsetWidth;
        form.classList.add('is-shake');
        input.focus();
        return;
      }
      // The wish only ever lives in this note element — it is never stored or sent.
      input.value = '';
      input.blur();
      form.classList.add('is-sent');
      Sound.unwrap();
      const note = h('div', { class: 'wish-note', 'aria-hidden': 'true' }, text);
      jarWrap.append(note);

      setTimeout(() => {
        note.remove();
        const notes = jarWrap.querySelector('.jar-notes');
        const folded = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        const count = notes.childElementCount;
        folded.setAttribute('x', String(62 + ((count * 13) % 30)));
        folded.setAttribute('y', String(170 - count * 4));
        folded.setAttribute('width', '18');
        folded.setAttribute('height', '10');
        folded.setAttribute('rx', '2');
        folded.setAttribute('fill', '#fff8ec');
        folded.setAttribute('transform', `rotate(${-15 + Math.random() * 30} 70 175)`);
        notes.append(folded);
        jarWrap.classList.add('is-glowing');
        Sound.chime();
        sparkleAround(jarWrap, 14);
        form.hidden = true;
        safe.hidden = false;
        done();
      }, wait(1100));
    });

    return [h('p', { class: 'card-lead' }, layer.lead), jarWrap, form, safe];
  },

  balloons(layer, { done }) {
    const offsets = [0, -18, 6, 10, -10, 2];
    let remaining = layer.colors.length;
    const count = h('p', { class: 'balloon-count', 'aria-live': 'polite' }, `${remaining} to go`);
    const reveal = h('p', { class: 'balloon-reveal', hidden: true }, layer.reveal);
    const cluster = h('div', { class: 'balloons' });

    layer.colors.forEach((color, i) => {
      const balloon = h('button', {
        class: 'balloon',
        type: 'button',
        'aria-label': `Pop balloon ${i + 1}`,
        style: `--c:${color};--y:${offsets[i % offsets.length]}px;--d:${(-i * 0.47).toFixed(2)}s`,
      },
      h('span', { class: 'balloon-body' }),
      h('span', { class: 'pop-word', 'aria-hidden': 'true' }, 'POP!'));

      balloon.addEventListener('click', () => {
        if (balloon.disabled) return;
        balloon.disabled = true;
        balloon.classList.add('is-popped');
        Sound.pop();
        const r = balloon.querySelector('.balloon-body').getBoundingClientRect();
        Confetti.burst({
          x: r.left + r.width / 2, y: r.top + r.height / 2, count: 22, spread: 360,
          velocity: 7, colors: [color, '#fff6ea'], gravity: 0.25, scalar: 0.8, ticks: 80,
        });
        remaining -= 1;
        count.textContent = remaining ? `${remaining} to go` : 'All popped!';
        if (!remaining) {
          setTimeout(() => {
            cluster.classList.add('is-cleared');
            count.hidden = true;
            reveal.hidden = false;
            const rr = reveal.getBoundingClientRect();
            Confetti.burst({ x: rr.left + rr.width / 2, y: rr.top + rr.height / 2, count: 90, spread: 100, velocity: 13 });
            Sound.chime();
            done();
          }, wait(450));
        }
      });
      cluster.append(balloon);
    });

    return [h('p', { class: 'card-lead' }, layer.lead), cluster, count, reveal];
  },

  facts(layer) {
    return [
      h('p', { class: 'card-lead' }, layer.lead),
      h('div', { class: 'date-badge', 'aria-hidden': 'true' },
        h('span', { class: 'date-badge-month' }, layer.month),
        h('span', { class: 'date-badge-day' }, layer.day)),
      h('ul', { class: 'facts' },
        layer.facts.map((fact, i) => h('li', { class: 'fact', style: `--i:${i}` },
          h('span', { class: 'fact-emoji', 'aria-hidden': 'true' }, fact.emoji),
          h('div', {},
            h('strong', { class: 'fact-name' }, fact.name),
            h('p', { class: 'fact-text' }, fact.text))))),
    ];
  },

  coupon(layer) {
    const wrap = h('div', { class: 'coupon-wrap' },
      h('div', { class: 'coupon' },
        h('div', { class: 'coupon-main' },
          h('p', { class: 'coupon-kicker' }, layer.kicker),
          h('p', { class: 'coupon-text' }, layer.text),
          layer.fine && h('p', { class: 'coupon-fine' }, layer.fine),
          h('span', { class: 'coupon-stamp', 'aria-hidden': 'true' }, 'Claimed ✓')),
        h('div', { class: 'coupon-stub', 'aria-hidden': 'true' },
          h('span', {}, layer.stub),
          h('span', { class: 'coupon-no' }, layer.serial))));

    const claim = h('button', { class: 'btn btn-ghost btn-small', type: 'button' }, layer.claim);
    claim.addEventListener('click', () => {
      wrap.classList.add('is-claimed');
      claim.disabled = true;
      claim.textContent = layer.claimed;
      Sound.stamp();
      const r = wrap.getBoundingClientRect();
      Confetti.burst({ x: r.right - 60, y: r.bottom - 30, count: 30, spread: 120, velocity: 8, scalar: 0.8, ticks: 120 });
    });
    return [wrap, claim];
  },

  letter(layer) {
    const isShort = layer.body.join(' ').length < 120;
    return [
      h('div', { class: `letter${isShort ? ' letter--short' : ''}` },
        layer.stamp && h('span', { class: 'letter-stamp', 'aria-hidden': 'true' }, layer.stamp),
        h('div', { class: 'letter-body' }, layer.body.map((p) => h('p', {}, p))),
        h('p', { class: 'letter-sign' }, layer.signature)),
    ];
  },

  lunch(layer) {
    const [left, main, right] = layer.food;
    setTimeout(() => {
      const r = document.querySelector('.lunch-scene')?.getBoundingClientRect();
      if (r) Confetti.burst({ x: r.left + r.width / 2, y: r.bottom - 20, count: 50, spread: 140, velocity: 10, ticks: 140 });
    }, wait(600));
    return [
      h('div', { class: 'lunch-scene', 'aria-hidden': 'true' },
        h('span', { class: 'lunch-shadow' }),
        h('span', { class: 'lunch-food lunch-food--left' }, left),
        h('span', { class: 'lunch-food lunch-food--main' }, main),
        h('span', { class: 'lunch-food lunch-food--right' }, right)),
      h('p', { class: 'lunch-sub' }, layer.sub),
    ];
  },

  finale(layer) {
    spawnFloatingBalloons();
    setTimeout(() => {
      Confetti.celebrate();
      Sound.fanfare();
    }, wait(250));
    return [h('p', { class: 'finale-sub' }, layer.sub)];
  },
};

function spawnFloatingBalloons() {
  removeFloatingBalloons();
  const specs = [
    { c: '#ff7a66', x: '8%', d: '0s', t: '15s' },
    { c: '#3cc4b4', x: '82%', d: '-6s', t: '17s' },
    { c: '#f5c45e', x: '58%', d: '-11s', t: '19s' },
  ];
  for (const s of specs) {
    document.body.append(h('div', {
      class: 'float-balloon',
      'aria-hidden': 'true',
      style: `--c:${s.c};--x:${s.x};--d:${s.d};--t:${s.t}`,
    }, h('span', { class: 'balloon-body' })));
  }
}
function removeFloatingBalloons() {
  document.querySelectorAll('.float-balloon').forEach((el) => el.remove());
}

/* =========================================================
   Controller
   ========================================================= */
const els = {
  giftScene: document.getElementById('giftScene'),
  gift: document.getElementById('gift'),
  kicker: document.getElementById('giftKicker'),
  tagTitle: document.getElementById('tagTitle'),
  tagHint: document.getElementById('tagHint'),
  layer: document.getElementById('layer'),
  mute: document.getElementById('muteBtn'),
};

const TOTAL = CONFIG.layers.length;
let nextIndex = 0; // the layer the box will reveal when opened
let busy = false;

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: motionOK() ? 'smooth' : 'auto' });
}

function showGift(index, { focus = true } = {}) {
  nextIndex = index;
  const [wrap, wrapDark, ribbon, ribbonDark] = CONFIG.wraps[index % CONFIG.wraps.length];
  const gift = els.gift;
  gift.className = 'gift';
  gift.style.setProperty('--wrap', wrap);
  gift.style.setProperty('--wrap-dark', wrapDark);
  gift.style.setProperty('--ribbon', ribbon);
  gift.style.setProperty('--ribbon-dark', ribbonDark);
  gift.style.setProperty('--k', String(Math.max(0.8, 1 - index * 0.025)));

  const isFirst = index === 0;
  const title = isFirst ? CONFIG.firstTag.title : CONFIG.tagLines[(index - 1) % CONFIG.tagLines.length];
  const hint = isFirst ? CONFIG.firstTag.hint : '— tap to open';
  els.tagTitle.textContent = title;
  els.tagHint.textContent = hint;
  gift.setAttribute('aria-label', `${title} — tap to open`);
  els.kicker.textContent = CONFIG.teasers[index] || 'There’s more inside…';

  els.layer.hidden = true;
  els.layer.replaceChildren();
  els.giftScene.hidden = false;
  // restart the kicker fade
  els.kicker.style.animation = 'none';
  void els.kicker.offsetWidth;
  els.kicker.style.animation = '';

  if (!isFirst) {
    gift.classList.add('is-entering');
    gift.addEventListener('animationend', () => gift.classList.remove('is-entering'), { once: true });
  }
  if (focus) gift.focus({ preventScroll: true });
}

function openGift() {
  if (busy) return;
  busy = true;
  const gift = els.gift;
  gift.classList.remove('is-entering');
  gift.classList.add('is-opening');
  Sound.unwrap();

  // paper scraps flying out
  const r = gift.getBoundingClientRect();
  const [wrap, wrapDark, ribbon] = CONFIG.wraps[nextIndex % CONFIG.wraps.length];
  setTimeout(() => {
    Confetti.burst({
      x: r.left + r.width / 2, y: r.top + r.height * 0.35, count: 45, spread: 120,
      velocity: 12, colors: [wrap, wrapDark, ribbon], scalar: 1.2, ticks: 120,
    });
  }, wait(380));

  setTimeout(() => showLayer(nextIndex), wait(1050));
}

function showLayer(index) {
  const layer = CONFIG.layers[index];
  const isLast = index === TOTAL - 1;
  const interactive = INTERACTIVE.has(layer.type);

  const actions = h('div', { class: 'card-actions' },
    isLast
      ? h('button', { class: 'btn', type: 'button', onclick: restart }, layer.again)
      : h('button', { class: 'btn', type: 'button', onclick: goNext }, CONFIG.nextLabel));
  actions.hidden = interactive;

  const done = () => {
    if (!actions.hidden) return;
    actions.hidden = false;
    setTimeout(() => actions.scrollIntoView({ block: 'nearest', behavior: motionOK() ? 'smooth' : 'auto' }), 50);
  };

  const title = h('h2', { class: 'card-title', tabindex: '-1' });
  if (layer.type === 'finale') {
    title.append(h('span', { class: 'finale-grad' }, layer.title), ' ', h('span', { class: 'finale-emoji' }, layer.emoji));
    title.addEventListener('click', () => {
      const r = title.getBoundingClientRect();
      Confetti.burst({ x: r.left + r.width / 2, y: r.top + r.height / 2, count: 90, spread: 360, velocity: 12 });
      Sound.pop();
    });
  } else {
    title.textContent = layer.title;
  }

  const card = h('article', { class: `card card--${layer.type}` },
    layer.eyebrow && h('p', { class: 'card-eyebrow' }, layer.eyebrow),
    title,
    RENDERERS[layer.type](layer, { done }),
    actions);

  els.giftScene.hidden = true;
  els.layer.replaceChildren(card);
  els.layer.hidden = false;
  scrollToTop();
  title.focus({ preventScroll: true });
  busy = false;
}

function leaveCard(then) {
  if (busy) return;
  busy = true;
  const card = els.layer.querySelector('.card');
  card?.classList.add('is-leaving');
  setTimeout(() => {
    busy = false;
    then();
  }, wait(320));
}

function goNext() {
  leaveCard(() => {
    scrollToTop();
    showGift(nextIndex + 1);
  });
}

function restart() {
  leaveCard(() => {
    removeFloatingBalloons();
    scrollToTop();
    showGift(0);
  });
}

els.gift.addEventListener('click', openGift);

els.mute.addEventListener('click', () => {
  const nowMuted = !Sound.muted;
  Sound.setMuted(nowMuted);
  els.mute.setAttribute('aria-pressed', String(!nowMuted));
  els.mute.setAttribute('aria-label', nowMuted ? 'Turn sound on' : 'Turn sound off');
  els.mute.title = nowMuted ? 'Sound off' : 'Sound on';
  els.mute.firstElementChild.textContent = nowMuted ? '🔇' : '🔊';
  if (!nowMuted) Sound.pop();
});

showGift(0, { focus: false });
