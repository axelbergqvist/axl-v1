'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';

import { AppEntry } from '@/lib/dissect';
import RequestAppButton from './RequestAppButton';

const spring = { type: 'spring' as const, stiffness: 320, damping: 40, mass: 1 };

function Phone({
  src,
  alt,
  animate,
  z,
}: {
  src: string;
  alt: string;
  animate: { x: number; rotate: number };
  z: number;
}) {
  return (
    <motion.div
      animate={animate}
      transition={spring}
      style={{
        position: 'absolute',
        width: 200,
        height: 440,
        borderRadius: 32,
        overflow: 'hidden',
        boxShadow: '0 4px 24px rgba(0,0,0,.04)',
        border: '.5px solid rgba(0,0,0,0.05)',
        transformOrigin: 'bottom center',
        zIndex: z,
      }}
    >
      <Image src={src} alt={alt} fill className="object-cover" unoptimized />
    </motion.div>
  );
}

export default function DissectIndexClient({
  apps,
}: {
  apps: AppEntry[];
}) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#fafafa] px-6 py-16">
      <div className="mx-auto flex max-w-[560px] flex-col gap-10">

        {/* Header */}
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-5 flex h-9 w-9 items-center justify-center rounded-xl bg-[#efefef]">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-neutral-500"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </div>

          <p className="mb-2 text-[15px] font-semibold leading-snug text-neutral-900">
            The best of recent design
            <br />
            found on X updated daily.
          </p>

          <p className="mb-5 text-xs text-neutral-500">
            Subscribe to a weekly email digest joining 32 people today.
          </p>

          <RequestAppButton />
        </div>

        {apps.map((app) => {
          const isHovered = hoveredSlug === app.slug;

          return (
            <Link
              key={app.slug}
              href={`/dissect/${app.slug}`}
              className="block"
              onMouseEnter={() => setHoveredSlug(app.slug)}
              onMouseLeave={() => setHoveredSlug(null)}
            >
              <div
                className="relative overflow-hidden rounded-[36px] bg-[#f3f3f3]"
                style={{ height: 720, width: 640, maxWidth: '100%' }}
              >
                <div
                  className="absolute left-0 right-0 flex items-center justify-center"
                  style={{ top: 16, bottom: 80 }}
                >
                  {app.screens[2] && (
                    <Phone
                      src={app.screens[2].src}
                      alt={app.screens[2].label}
                      z={1}
                      animate={isHovered ? { x: 80, rotate: 8 } : { x: 16, rotate: 0 }}
                    />
                  )}

                  {app.screens[1] && (
                    <Phone
                      src={app.screens[1].src}
                      alt={app.screens[1].label}
                      z={2}
                      animate={isHovered ? { x: 0, rotate: 4 } : { x: 8, rotate: 0 }}
                    />
                  )}

                  {app.screens[0] && (
                    <Phone
                      src={app.screens[0].src}
                      alt={app.screens[0].label}
                      z={3}
                      animate={isHovered ? { x: -80, rotate: -4 } : { x: 0, rotate: 0 }}
                    />
                  )}
                </div>

                {/* Pills */}
                <div className="absolute bottom-8 left-0 right-0 z-20 flex items-center justify-center gap-[6px]">

                  <div
                    className="flex items-center gap-1.5 rounded-full backdrop-blur"
                    style={{
                      height: 36,
                      paddingLeft: 12,
                      paddingRight: 12,
                      backgroundColor: 'rgba(102,102,102,0.30)',
                    }}
                  >
                    <div className="flex h-[20px] w-[20px] flex-shrink-0 items-center justify-center overflow-hidden">
                      <Image
                        src={`/dissect/${app.slug}/icon.png`}
                        alt={app.meta.name}
                        width={20}
                        height={20}
                        className="rounded-[3px]"
                        unoptimized
                      />
                    </div>
                    <span className="text-[14px] font-medium text-white">
                      {app.meta.name}
                    </span>
                  </div>

                  <div
                    className="flex items-center rounded-full backdrop-blur"
                    style={{
                      height: 36,
                      paddingLeft: 12,
                      paddingRight: 12,
                      backgroundColor: 'rgba(102,102,102,0.30)',
                    }}
                  >
                    <span className="text-[14px] font-medium text-white">
                      {app.screens.length} screens
                    </span>
                  </div>

                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}