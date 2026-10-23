import React from 'react';

// Hand-composed skyline: flat shapes only, in the spirit of 1930s travel posters
const GROUND = 600;
const NAVY_FAR = '#123c92';
const CREAM = '#f8f0dc';

const Capsule = ({ x, w, h, c }) => {
  const y0 = GROUND - h;
  const r = w / 2;
  const bands = [0, 1, 2].map((k) => y0 + r + 26 + k * 34);
  return (
    <g>
      <path d={`M${x} ${GROUND}V${y0 + r}a${r} ${r} 0 0 1 ${w} 0V${GROUND}z`} fill={c} />
      {bands.map((y) => <rect key={y} x={x - 16} y={y} width={w + 16} height="6" rx="3" fill={CREAM} opacity=".9" />)}
      {[0, 1, 2, 3].map((k) => <circle key={k} cx={x + w / 2} cy={y0 + r + 62 + k * 34} r="4" fill={CREAM} opacity=".7" />)}
    </g>
  );
};

const Saucer = ({ x, w, h, c }) => {
  const cx = x + w / 2;
  const y0 = GROUND - h;
  return (
    <g>
      <rect x={cx - 9} y={y0} width="18" height={h} fill={c} />
      <ellipse cx={cx} cy={y0} rx={w * 0.95} ry={w * 0.2} fill={c} />
      <ellipse cx={cx} cy={y0 + 2} rx={w * 0.95} ry="4" fill={CREAM} />
      <path d={`M${cx - w * 0.32} ${y0 - 6}a${w * 0.32} ${w * 0.3} 0 0 1 ${w * 0.64} 0z`} fill="#8fd0ff" />
    </g>
  );
};

const Ring = ({ x, w, h, c }) => {
  const cx = x + w / 2;
  const y0 = GROUND - h;
  return (
    <g>
      <rect x={x} y={y0} width={w} height={h} rx={w / 2} fill={c} />
      <ellipse cx={cx} cy={y0 + h * 0.28} rx={w * 1.9} ry={w * 0.5} fill="none" stroke="#f6b93b" strokeWidth="6" transform={`rotate(-16 ${cx} ${y0 + h * 0.28})`} />
      <circle cx={cx} cy={y0 - 4} r={w * 0.42} fill="#e8372c" />
    </g>
  );
};

const Spire = ({ x, w, h, c }) => {
  const cx = x + w / 2;
  const y0 = GROUND - h;
  return (
    <g>
      <path d={`M${x} ${GROUND}Q${cx - 6} ${y0 + h * 0.45} ${cx} ${y0}Q${cx + 6} ${y0 + h * 0.45} ${x + w} ${GROUND}z`} fill={c} />
      <path d={`M${x + w * 0.2} ${GROUND - 70}H${x + w * 0.8}`} stroke={CREAM} strokeWidth="6" strokeLinecap="round" />
      <path d={`M${x + w * 0.3} ${GROUND - 120}H${x + w * 0.7}`} stroke={CREAM} strokeWidth="6" strokeLinecap="round" />
      <circle cx={cx} cy={y0 - 2} r="9" fill="#e8372c" />
    </g>
  );
};

const Bubble = ({ x, w, h, c }) => (
  <g>
    <rect x={x - 3} y={GROUND - h} width="6" height={h} fill={c} />
    <circle cx={x} cy={GROUND - h} r={w} fill={c} />
    <path d={`M${x - w * 0.6} ${GROUND - h - 2}a${w * 0.6} ${w * 0.6} 0 0 1 ${w * 0.6} ${-w * 0.6}`} fill="none" stroke={CREAM} strokeWidth="5" strokeLinecap="round" />
  </g>
);

const Dome = ({ x, w, h, c }) => {
  const r = w / 2;
  return (
    <g>
      <path d={`M${x} ${GROUND}V${GROUND - h + r}a${r} ${r} 0 0 1 ${w} 0V${GROUND}z`} fill={c} />
      <rect x={x} y={GROUND - 40} width={w} height="6" fill={CREAM} opacity=".9" />
      <rect x={x} y={GROUND - 70} width={w} height="6" fill={CREAM} opacity=".9" />
    </g>
  );
};

const parts = { capsule: Capsule, saucer: Saucer, ring: Ring, spire: Spire, bubble: Bubble, dome: Dome };

const far = [
  { t: 'capsule', x: 640, w: 120, h: 350, c: NAVY_FAR },
  { t: 'capsule', x: 1160, w: 140, h: 430, c: NAVY_FAR },
  { t: 'spire', x: 1330, w: 120, h: 400, c: NAVY_FAR },
  { t: 'dome', x: 300, w: 180, h: 250, c: NAVY_FAR },
];

const near = [
  { t: 'dome', x: -20, w: 150, h: 120, c: '#2b6fe0' },
  { t: 'capsule', x: 150, w: 90, h: 170, c: '#f6b93b' },
  { t: 'saucer', x: 350, w: 70, h: 190, c: '#e8372c' },
  { t: 'capsule', x: 520, w: 100, h: 250, c: '#16b1a6' },
  { t: 'capsule', x: 700, w: 110, h: 340, c: '#e8372c' },
  { t: 'ring', x: 870, w: 46, h: 440, c: CREAM },
  { t: 'saucer', x: 990, w: 80, h: 300, c: '#16b1a6' },
  { t: 'capsule', x: 1110, w: 130, h: 230, c: '#2b6fe0' },
  { t: 'spire', x: 1270, w: 90, h: 370, c: '#f6b93b' },
  { t: 'bubble', x: 1400, w: 30, h: 310, c: '#e8372c' },
  { t: 'dome', x: 1450, w: 170, h: 150, c: '#16b1a6' },
];

const rays = Array.from({ length: 28 }, (_, i) => i * (360 / 28));

const HeroArt = ({ animate }) => (
  <svg className="hero-art" viewBox="0 0 1600 640" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
    <g transform="translate(1120 330)">
      <g className="sun-rays">
        {rays.map((a) => <line key={a} x1="0" y1="-300" x2="0" y2={a % 2 ? -340 : -360} stroke="#f6b93b" strokeWidth="6" strokeLinecap="round" transform={`rotate(${a})`} />)}
      </g>
      <circle r="250" fill="#f6b93b" />
      <circle r="212" fill="none" stroke="#fbd47a" strokeWidth="3" />
      <circle r="270" fill="none" stroke="#2b6fe0" strokeWidth="3" />
    </g>

    <path id="track" d="M-60 360Q760 60 1680 280" fill="none" stroke={CREAM} strokeWidth="3" strokeDasharray="2 12" strokeLinecap="round" opacity=".7" />
    {animate && (
      <g>
        <g>
          <rect x="-34" y="-11" width="68" height="22" rx="11" fill="#e8372c" />
          <rect x="-22" y="-5" width="30" height="8" rx="4" fill={CREAM} />
          <circle cx="24" cy="0" r="6" fill={CREAM} />
          <animateMotion dur="16s" repeatCount="indefinite" rotate="auto" keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.45 0 0.55 1">
            <mpath href="#track" />
          </animateMotion>
        </g>
      </g>
    )}

    <g className="skyline-far">
      {far.map((p, i) => { const P = parts[p.t]; return <P key={i} {...p} />; })}
    </g>
    <g className="skyline-near">
      {near.map((p, i) => {
        const P = parts[p.t];
        return <g key={i} className="rise" style={{ '--i': i }}><P {...p} /></g>;
      })}
    </g>

    <rect x="0" y={GROUND} width="1600" height="40" fill={CREAM} />
    <rect x="0" y={GROUND} width="1600" height="6" fill="#e8372c" />
  </svg>
);

export default HeroArt;
