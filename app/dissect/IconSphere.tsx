'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

const icons = [
  '/dissect/chatgpt/icon.png',
  '/dissect/shop/icon.png',
  '/dissect/doji/icon.png',
  '/dissect/chatgpt/icon.png',
  '/dissect/shop/icon.png',
  '/dissect/doji/icon.png',
  '/dissect/chatgpt/icon.png',
  '/dissect/shop/icon.png',
  '/dissect/doji/icon.png',
  '/dissect/chatgpt/icon.png',
  '/dissect/shop/icon.png',
  '/dissect/doji/icon.png',
];

export default function IconSphere() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    let rotation = 0;

    const animate = () => {
      rotation += 0.0025;

      const nodes =
        containerRef.current?.querySelectorAll<HTMLElement>('[data-icon]');

      if (nodes) {
        nodes.forEach((node, i) => {
          const phi = Math.acos(-1 + (2 * i) / icons.length);
          const theta = Math.sqrt(icons.length * Math.PI) * phi;

          const x =
            Math.cos(theta + rotation) *
            Math.sin(phi) *
            110;

          const y =
            Math.sin(theta + rotation) *
            Math.sin(phi) *
            110;

          const z =
            Math.cos(phi) * 110;

          const scale = (z + 160) / 320;
          const opacity = (z + 160) / 320;

          node.style.transform = `
            translate3d(${x}px, ${y}px, ${z}px)
            scale(${scale})
          `;

          node.style.opacity = `${opacity}`;
          node.style.zIndex = `${Math.floor(scale * 100)}`;
        });
      }

      frame = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      ref={containerRef}
      className="
        absolute
        inset-0
        flex
        items-center
        justify-center
        [perspective:1000px]
      "
    >
      {icons.map((src, i) => (
        <div
          key={i}
          data-icon
          className="
            absolute
            w-12
            h-12
            rounded-2xl
            overflow-hidden
            shadow-lg
            bg-white
            border
            border-black/5
            will-change-transform
          "
        >
          <Image
            src={src}
            alt=""
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      ))}
    </div>
  );
}