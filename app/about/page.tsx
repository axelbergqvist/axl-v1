'use client';

import { motion, AnimatePresence, useSpring } from 'framer-motion';
import { useState, useRef, useCallback } from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

import Nordnet from '/public/Nordnet.png';
import Kumpan from '/public/kumpan.png';
import Freelance from '/public/Freelance.png';
import Brobygrafiska from '/public/brobygrafiska.png';
import Berghs from '/public/berghs.png';


// ─── DATA ─────────────────────────────────────────────────────────────────────
type Project = {
  title: string;
  description: string;
  href?: string;
  slug?: string;
  image: StaticImageData;
};

type YearGroup = {
  year: string;
  projects: Project[];
};

const archive: YearGroup[] = [
  {
    year: '2026',
    projects: [
      { title: 'Eaves', description: 'See what top investors, fund managers and politicians are buying and selling.', slug: 'eaves', image: Nordnet },
      { title: 'Side project', description: 'Brand & web', image: Freelance },
    ],
  },
  {
    year: '2025',
    projects: [
      { title: 'Nordnet', description: 'Product designer', href: '#', image: Nordnet },
      { title: 'Sleep Cycle', description: 'Investor relations website', href: '#', image: Kumpan },
    ],
  },
  {
    year: '2022',
    projects: [
      { title: 'Berghs', description: 'UX & Digital Product Design', image: Berghs },
      { title: 'Brobygrafiska', description: 'Digital Design', image: Brobygrafiska },
    ],
  },
];

// ─── SOUND — subtle Apple-style click ─────────────────────────────────────────
function useHoverSound() {
  const ctx = useRef<AudioContext | null>(null);

  return useCallback(() => {
    if (typeof window === 'undefined') return;
    if (!ctx.current) ctx.current = new AudioContext();
    const ac = ctx.current;

    const buf = ac.createBuffer(1, ac.sampleRate * 0.06, ac.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      const t = i / ac.sampleRate;
      const env = Math.exp(-t * 180);
      data[i] = env * (Math.sin(2 * Math.PI * 200 * t) * 0.4 + Math.sin(2 * Math.PI * 1800 * t) * 0.15) * 0.07;
    }

    const src = ac.createBufferSource();
    src.buffer = buf;
    src.connect(ac.destination);
    src.start();
  }, []);
}

// ─── HOVER ROW ──────────────────────────────────────────────────────────────
function HoverRow({
  project,
  onHover,
  onLeave,
  onMove,
  onHoverStart,
  onHoverEnd,
  onPressStart,
  onPressEnd,
  isHovered,
}: {
  project: Project;
  onHover: (el: HTMLDivElement, img: StaticImageData) => void;
  onLeave: () => void;
  onMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onPressStart: () => void;
  onPressEnd: () => void;
  isHovered: boolean;
}) {
  const playSound = useHoverSound();
  const rowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!rowRef.current || !isHovered) return;
    onMove(e);
  };

  const handleEnter = () => {
    if (rowRef.current) onHover(rowRef.current, project.image);
    onHoverStart();
    playSound();
  };

  const handleLeave = () => {
    onLeave();
    onHoverEnd();
  };

  const row = (
    <div ref={rowRef} className="relative">
      <motion.div
        className="relative flex flex-col px-3 py-3 cursor-pointer"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onMouseMove={handleMouseMove}
        onPointerDown={onPressStart}
        onPointerUp={onPressEnd}
        onPointerCancel={onPressEnd}
        onTapStart={onPressStart}
        onTapCancel={onPressEnd}
        onTap={onPressEnd}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 280, damping: 24 }}
      >
        <span className="text-[15px] font-medium text-[#666666]">
          {project.title}
        </span>
        <span className="text-[15px] text-[#999999]">
          {project.description}
        </span>
      </motion.div>
    </div>
  );

  if (project.slug) {
    return (
      <Link href={`/about/${project.slug}`} className="block">
        {row}
      </Link>
    );
  }

  return project.href ? (
    <a href={project.href} target="_blank" rel="noopener noreferrer" className="block">
      {row}
    </a>
  ) : (
    row
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
const parentVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, staggerChildren: 0.07 } },
};

const childVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function Page() {
  const [hoveredImage, setHoveredImage] = useState<StaticImageData | null>(null);
  const [imageTop, setImageTop] = useState(0);
  const [hoveredRowTop, setHoveredRowTop] = useState(0);
  const [hoveredRowHeight, setHoveredRowHeight] = useState(0);
  const [hoveredRowWidth, setHoveredRowWidth] = useState(0);
  const [hoveredRowLeft, setHoveredRowLeft] = useState(0);
  const [hoveredTitle, setHoveredTitle] = useState<string | null>(null);
  const [hoveredRowScale, setHoveredRowScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const hoverX = useSpring(0, { stiffness: 300, damping: 25 });
  const hoverY = useSpring(0, { stiffness: 300, damping: 25 });

  const handleHover = (el: HTMLDivElement, img: StaticImageData) => {
    if (!containerRef.current || !listRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const listRect = listRef.current.getBoundingClientRect();
    const rowRect = el.getBoundingClientRect();
    setImageTop(rowRect.top - containerRect.top + rowRect.height / 2);
    setHoveredRowTop(rowRect.top - listRect.top);
    setHoveredRowLeft(rowRect.left - listRect.left);
    setHoveredRowHeight(rowRect.height);
    setHoveredRowWidth(rowRect.width);
    setHoveredImage(img);
    setHoveredTitle(img.src);
  };

  const handleLeave = () => {
    hoverX.set(0);
    hoverY.set(0);
    setHoveredImage(null);
    setHoveredTitle(null);
    setHoveredRowScale(1);
  };

  const handleRowHoverStart = () => {
    setHoveredRowScale(1.02);
  };

  const handleRowHoverEnd = () => {
    setHoveredRowScale(1);
  };

  const handleRowPressStart = () => {
    setHoveredRowScale(0.98);
  };

  const handleRowPressEnd = () => {
    setHoveredRowScale(1.02);
  };

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    hoverX.set((e.clientX - cx) * 0.05);
    hoverY.set((e.clientY - cy) * 0.05);
  };

  const springY = useSpring(imageTop, { stiffness: 280, damping: 28 });
  if (springY.get() !== imageTop) springY.set(imageTop);

  return (
    <div ref={containerRef} className="relative flex flex-col items-center px-4 py-8 w-full">
      {/* Bio Section */}
      <div className="w-full max-w-[580px] mb-16 flex flex-col items-start gap-4 px-3">
        <div className="mt-20 w-10 h-10 rounded-full overflow-hidden bg-neutral-200 dark:bg-neutral-700 flex-shrink-0">
          <img 
            src="/profilepic.png" 
            alt="Axel Bergqvist" 
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-[15px] text-[#999999]">
          <span className="text-[15px] font-medium text-[#666666]">Axel Bergqvist</span> is a designer based in Atlanta building consumer products. His work hinges on restraint, reducing friction so interfaces feel more intuitive and obvious in hindsight. <Link href="/about/bio" className="text-[15px] font-medium text-[#666666]">More</Link>

        </p>
      </div>

      {/* List */}
      <motion.section
        ref={listRef}
        className="relative w-full max-w-[580px] shrink-0"
        variants={parentVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {hoveredImage && (
            <motion.div
                className="absolute left-0 bg-white pointer-events-none shadow-[0_8px_44px_rgba(0,0,0,0.05)]"
                initial={{ opacity: 0, top: hoveredRowTop, height: hoveredRowHeight, width: hoveredRowWidth, x: 0, y: 0, scale: 1 }}
                animate={{ opacity: 1, top: hoveredRowTop, height: hoveredRowHeight, width: hoveredRowWidth, scale: hoveredRowScale }}
                exit={{ opacity: 0 }}
                transition={{ type: 'spring', stiffness: 330, damping: 30, duration: 0.16 }}
                style={{ top: hoveredRowTop, left: hoveredRowLeft, height: hoveredRowHeight, width: hoveredRowWidth, x: hoverX, y: hoverY, borderRadius: '24px', padding: '0px 48px', transformOrigin: 'left center' }}
            />
          )}
        </AnimatePresence>
        {archive.map((group) => (
          <motion.div key={group.year} variants={childVariants} className="mb-8 grid grid-cols-[80px_minmax(0,1fr)] gap-8 items-start">
            <div className="text-sm text-neutral-400 dark:text-neutral-500 pt-3">
              {group.year}
            </div>
            <div className="space-y-4">
              {group.projects.map((project) => (
                <HoverRow
                  key={project.title}
                  project={project}
                  onHover={handleHover}
                  onLeave={handleLeave}
                  onMove={handleMove}
                  onHoverStart={handleRowHoverStart}
                  onHoverEnd={handleRowHoverEnd}
                  onPressStart={handleRowPressStart}
                  onPressEnd={handleRowPressEnd}
                  isHovered={hoveredTitle === project.image.src}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </motion.section>

      {/* Image — absolutely positioned slightly to the right */}
      <div className="hidden md:block absolute left-[calc(50%+310px)] top-0">
        <AnimatePresence mode="wait">
          {hoveredImage && (
            <motion.div
              key={hoveredImage.src}
              className="absolute"
              style={{ top: springY, translateY: '-50%', width: Math.min(hoveredImage.width, 480) }}
              initial={{ opacity: 0, filter: 'blur(6px)', scale: 0.96 }}
              animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
              exit={{ opacity: 0, filter: 'blur(6px)', scale: 0.96 }}
              transition={{ duration: 0.12, ease: 'easeOut' }}
            >
              <div className="rounded-xl overflow-hidden">
                <Image src={hoveredImage} alt="" className="w-full h-auto" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}