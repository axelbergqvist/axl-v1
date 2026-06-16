'use client';

import { useMemo } from 'react';

type IconItem = {
  label: string;
  color: string;
};

const ICONS: IconItem[] = [
  { label: 'N', color: '#000000' },
  { label: 'A', color: '#FF5A5F' },
  { label: 'S', color: '#1ED760' },
  { label: 'F', color: '#0A66C2' },
  { label: 'R', color: '#5B5BF6' },
  { label: 'L', color: '#FF6F3C' },
  { label: 'D', color: '#611F69' },
  { label: 'C', color: '#10A37F' },
  { label: 'G', color: '#E5E2DC' },
  { label: 'U', color: '#222222' },
  { label: 'P', color: '#FF0000' },
  { label: 'B', color: '#3FA66B' },
];

const COUNT = 12;
const STEP = 360 / COUNT;

// 🔥 KEY CHANGE: tighter = more “zoomed object”
const RADIUS = 140;

export default function IconCarousel() {
  const items = useMemo(
    () =>
      Array.from({ length: COUNT }, (_, i) => ({
        angle: i * STEP,
        icon: ICONS[i % ICONS.length],
      })),
    []
  );

  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        perspective: '520px', // 🔥 stronger zoom feel
      }}
    >
      {/* spinning system */}
      <div
        style={{
          transformStyle: 'preserve-3d',
          transform: 'rotateX(18deg) scale(2.4)', // 🔥 BIG GLOBAL ZOOM
          animation: 'spin 32s linear infinite',
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              transformStyle: 'preserve-3d',
              transform: `rotateY(${item.angle}deg) translateZ(${RADIUS}px)`,
            }}
          >
            <Tile icon={item.icon} />
          </div>
        ))}
      </div>

      {/* subtle vignette (makes it feel premium) */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-black/10" />

      <style jsx global>{`
        @keyframes spin {
          from {
            transform: rotateY(0deg) rotateX(18deg) scale(2.4);
          }
          to {
            transform: rotateY(360deg) rotateX(18deg) scale(2.4);
          }
        }
      `}</style>
    </div>
  );
}

function Tile({ icon }: { icon: IconItem }) {
  return (
    <div
      style={{
        width: 88,
        height: 88,
        borderRadius: 18,
        backgroundColor: icon.color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 600,
        fontSize: 22,
        boxShadow: '0 18px 50px rgba(0,0,0,0.18)',
        border: '1px solid rgba(0,0,0,0.08)',
        transform: 'rotateX(-18deg)',
      }}
    >
      {icon.label}
    </div>
  );
}