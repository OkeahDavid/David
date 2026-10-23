import React, { useMemo } from 'react';
import '../styles/Todayland.css';

// Deterministic pseudo-random so the skyline is identical on every render
const rng = (seed) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

const W = 1600;

const buildLayer = (seed, { minH, maxH, fill, glow, step }) => {
  const rand = rng(seed);
  const shapes = [];
  let x = -20;
  while (x < W + 20) {
    const w = 46 + rand() * 54;
    const h = minH + rand() * (maxH - minH);
    const kind = Math.floor(rand() * 5);
    const cx = x + w / 2;
    const top = 400 - h;
    const key = `${seed}-${x.toFixed(0)}`;
    const windows = [];
    if (glow) {
      for (let wy = top + 24; wy < 390; wy += 22) {
        for (let wx = x + 10; wx < x + w - 8; wx += 16) {
          if (rand() > 0.62) {
            windows.push(
              <rect key={`${key}-${wx}-${wy}`} x={wx} y={wy} width="6" height="9" rx="2"
                fill={rand() > 0.5 ? '#9fe8ff' : '#ffe27a'} opacity=".85" />
            );
          }
        }
      }
    }
    let crown = null;
    if (kind === 0) crown = <path d={`M${x} ${top} a${w / 2} ${w / 2} 0 0 1 ${w} 0z`} fill={fill} />;
    if (kind === 1) crown = (
      <g fill={fill}>
        <path d={`M${x + 6} ${top} L${cx} ${top - 70} L${x + w - 6} ${top}z`} />
        <circle cx={cx} cy={top - 74} r="5" fill="#ff4a3d" />
      </g>
    );
    if (kind === 2) crown = (
      <g>
        <ellipse cx={cx} cy={top - 6} rx={w * 0.85} ry="11" fill={fill} />
        <ellipse cx={cx} cy={top - 14} rx={w * 0.38} ry="9" fill={fill} />
        <ellipse cx={cx} cy={top - 6} rx={w * 0.85} ry="2.5" fill="#ff4a3d" opacity=".9" />
      </g>
    );
    if (kind === 3) crown = (
      <g>
        <rect x={cx - 3} y={top - 50} width="6" height="50" fill={fill} />
        <circle cx={cx} cy={top - 62} r="17" fill={fill} />
        <circle cx={cx - 5} cy={top - 67} r="5" fill="#fff" opacity=".35" />
      </g>
    );
    if (kind === 4) crown = (
      <g>
        <rect x={cx - 3} y={top - 44} width="6" height="44" fill={fill} />
        <ellipse cx={cx} cy={top - 36} rx={w * 0.75} ry="13" fill="none" stroke={fill} strokeWidth="5" transform={`rotate(-18 ${cx} ${top - 36})`} />
      </g>
    );
    shapes.push(
      <g key={key}>
        <rect x={x} y={top} width={w} height={h + 10} rx="3" fill={fill} />
        {crown}
        {windows}
      </g>
    );
    x += w + step * (0.4 + rand());
  }
  return shapes;
};

const Todayland = () => {
  const far = useMemo(() => buildLayer(7, { minH: 90, maxH: 210, fill: '#4f8df0', glow: false, step: 6 }), []);
  const mid = useMemo(() => buildLayer(23, { minH: 70, maxH: 170, fill: '#2a63cf', glow: true, step: 12 }), []);
  const near = useMemo(() => buildLayer(91, { minH: 40, maxH: 110, fill: '#17408f', glow: true, step: 26 }), []);

  return (
    <div className="todayland" aria-hidden="true">
      <div className="sky-glow" />
      <div className="stars" />
      <svg className="cloud cloud-a" viewBox="0 0 220 80"><path d="M30 70a24 24 0 0 1 4-47 34 34 0 0 1 64-8 30 30 0 0 1 50 14 22 22 0 0 1 40 12 20 20 0 0 1-8 29z" /></svg>
      <svg className="cloud cloud-b" viewBox="0 0 220 80"><path d="M30 70a24 24 0 0 1 4-47 34 34 0 0 1 64-8 30 30 0 0 1 50 14 22 22 0 0 1 40 12 20 20 0 0 1-8 29z" /></svg>
      <svg className="cloud cloud-c" viewBox="0 0 220 80"><path d="M30 70a24 24 0 0 1 4-47 34 34 0 0 1 64-8 30 30 0 0 1 50 14 22 22 0 0 1 40 12 20 20 0 0 1-8 29z" /></svg>
      <div className="monorail">
        <svg viewBox="0 0 120 30"><rect x="2" y="6" width="100" height="16" rx="8" fill="#e8eef3" /><rect x="10" y="9" width="70" height="7" rx="3.5" fill="#2a63cf" /><circle cx="102" cy="14" r="11" fill="#e5141a" /></svg>
      </div>
      <svg className="skyline" viewBox={`0 0 ${W} 400`} preserveAspectRatio="xMidYMax slice">
        <g className="layer far">{far}</g>
        <g className="layer mid">{mid}</g>
        <g className="layer near">{near}</g>
        <rect x="0" y="388" width={W} height="40" fill="#0e2d6e" />
      </svg>
    </div>
  );
};

export default Todayland;
