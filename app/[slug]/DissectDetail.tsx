'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { AppEntry } from '@/lib/dissect';
import { useRef, useState, useEffect } from 'react';

export default function DissectDetail({ app }: { app: AppEntry }) {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef({ startX: 0, scrollLeft: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [backHovered, setBackHovered] = useState(false);
  const targetScroll = useRef(0);
  const rafId = useRef<number | null>(null);

  const animateScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const diff = targetScroll.current - el.scrollLeft;
    if (Math.abs(diff) > 0.5) {
      el.scrollLeft += diff * 0.12;
      rafId.current = requestAnimationFrame(animateScroll);
    } else {
      el.scrollLeft = targetScroll.current;
      rafId.current = null;
    }
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
    setIsDragging(true);
    dragState.current = {
      startX: e.pageX,
      scrollLeft: scrollRef.current.scrollLeft,
    };
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    const dx = e.pageX - dragState.current.startX;
    const newScrollLeft = dragState.current.scrollLeft - dx;
    scrollRef.current.scrollLeft = newScrollLeft;
    targetScroll.current = newScrollLeft;
  };

  const stopDragging = () => setIsDragging(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    targetScroll.current = el.scrollLeft;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const max = el.scrollWidth - el.clientWidth;
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      targetScroll.current = Math.min(Math.max(targetScroll.current + delta, 0), max);
      if (rafId.current === null) {
        rafId.current = requestAnimationFrame(animateScroll);
      }
    };

    const updateProgress = () => {
      const max = el.scrollWidth - el.clientWidth;
      setScrollProgress(max > 0 ? el.scrollLeft / max : 0);
    };

    updateProgress();
    el.addEventListener('wheel', handleWheel, { passive: false });
    el.addEventListener('scroll', updateProgress);
    window.addEventListener('resize', updateProgress);

    return () => {
      el.removeEventListener('wheel', handleWheel);
      el.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') router.push('/');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [router]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="min-h-screen bg-white dark:bg-neutral-900 relative"
    >
        
      {/* Back button - top left, chevron */}
      <motion.div
        whileHover={{ scale: 1.04 }}
  whileTap={{ scale: 0.96 }}
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
        className="fixed top-8 left-8 z-20 flex items-center gap-3"
        onMouseEnter={() => setBackHovered(true)}
        onMouseLeave={() => setBackHovered(false)}
      >
        <Link
          href="/"
          className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white backdrop-blur-2xl text-neutral-400 shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:text-neutral-600 transition-colors"
          aria-label="Back"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </Link>

        <AnimatePresence>
          {backHovered && (
            <motion.div
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -6 }}
              transition={{ duration: 0.15 }}
              className="px-3 py-1.5 rounded-xl bg-black/30 backdrop-blur-md text-white text-xs whitespace-nowrap pointer-events-none"
            >
              Press ESC
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Filmstrip - vertically centered */}
      <div
        ref={scrollRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
        className={`h-screen overflow-x-auto px-8 overflow-y-hidden select-none flex items-center ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={{ scrollbarWidth: 'none' }}
      >
        <div className="flex gap-10 px-12 pb-16 min-w-max pr-[460px]">
          {app.screens.map((screen) => (
            <div key={screen.src} className="flex flex-col gap-3 shrink-0">
              <span className="pl-24 text-xs text-neutral-400 flex items-center gap-1">
                <span className="opacity-60">#</span> {screen.label}
              </span>
              <div className="relative w-[280px] aspect-[9/19.5] rounded-[36px] overflow-hidden bg-neutral-100 shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-black/5">
                <Image
                  src={screen.src}
                  alt={screen.label}
                  fill
                  className="object-cover pointer-events-none"
                  unoptimized
                  priority
                />
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* Floating sidebar - animates in from right */}
<motion.aside
  initial={{ opacity: 0, x: 24 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ type: 'spring', stiffness: 320, damping: 30 }}
  className="fixed top-6 right-6 bottom-6 w-[400px] rounded-[32px] bg-neutral-900/70 dark:bg-neutral-900/80 backdrop-blur-2xl shadow-[0_20px_70px_rgba(0,0,0,0.25)] border border-white/10 px-8 py-10 overflow-y-auto z-10 text-white"
>
<div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center overflow-hidden mb-4">
  <Image
    src={`/dissect/${app.slug}/icon.png`}
    alt={app.meta.name}
    width={48}
    height={48}
    className="object-cover"
    unoptimized
  />
</div>

<h1 className="text-2xl font-medium text-white mb-2">{app.meta.name}</h1>
<p className="text-sm text-white/60 leading-relaxed mb-6">{app.meta.description}</p>

<motion.a
  href={app.meta.figmaUrl}
  target="_blank"
  rel="noopener noreferrer"
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
  className="w-full mb-8 h-12 rounded-full bg-white text-black text-sm font-medium flex items-center justify-center gap-2"
>
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="-1 -1 26 26" fill="none" stroke="black" strokeWidth="2">
  <path d="M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4z" />
  <path d="M4 12c0-2.208 1.792-4 4-4h4v8H8c-2.208 0-4-1.792-4-4z" />
  <path d="M4 4c0-2.208 1.792-4 4-4h4v8H8C5.792 8 4 6.208 4 4z" />
  <path d="M12 0h4c2.208 0 4 1.792 4 4s-1.792 4-4 4h-4V0z" />
  <path d="M20 12c0 2.208-1.792 4-4 4s-4-1.792-4-4 1.792-4 4-4 4 1.792 4 4z" />
</svg>
  Open in Figma
</motion.a>

<dl className="flex flex-col gap-5 text-sm">
  <div>
    <dt className="text-white/40 mb-1">Uploaded</dt>
    <dd className="text-white/90">{app.meta.uploaded}</dd>
  </div>
  <div>
    <dt className="text-white/40 mb-1">Screens</dt>
    <dd className="text-white/90">{app.screens.length}</dd>
  </div>
  <div>
    <dt className="text-white/40 mb-1">Base font</dt>
    <dd className="text-white/90">{app.meta.baseFont}</dd>
  </div>
  <div>
    <dt className="text-white/40 mb-1">Base radius</dt>
    <dd className="text-white/90">{app.meta.baseRadius}</dd>
  </div>
  <div>
    <dt className="text-white/40 mb-1">Resolution</dt>
    <dd className="text-white/90">{app.meta.resolution}</dd>
  </div>
</dl>

{app.meta.tags.length > 0 && (
  <div className="mt-6">
    <div className="text-white/40 text-sm mb-2">Tags</div>
    <div className="flex flex-wrap gap-2">
      {app.meta.tags.map((tag) => (
        <span
          key={tag}
          className="px-3 py-1.5 rounded-full bg-white/10 text-xs text-white/80"
        >
          {tag}
        </span>
      ))}
    </div>
  </div>
)}

{app.meta.colors.length > 0 && (
  <div className="mt-6">
    <div className="text-white/40 text-sm mb-2">Colors</div>
    <div className="flex flex-col gap-2">
      {app.meta.colors.map((color) => (
        <div key={color} className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full border border-white/20" style={{ backgroundColor: color }} />
          <span className="text-sm text-white/80 font-mono">{color}</span>
        </div>
      ))}
    </div>
  </div>
)}
      </motion.aside>
    </motion.div>
  );
}