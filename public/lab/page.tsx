'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import WorktestDark2 from '/public/worktest8.png';
import WorktestDark3 from '/public/worktest9.png';
import WorktestDark4 from '/public/worktest10.png';

import img1 from '/public/img/img1.png';
import img2 from '/public/img/img2.png';
import img3 from '/public/img/img3.png';
import img4 from '/public/img/img4.png';
import img5 from '/public/img/img5.png';
import img6 from '/public/img/img6.png';
import img7 from '/public/img/img7.png';
import img8 from '/public/img/img8.png';
import img9 from '/public/img/img9.png';
import img10 from '/public/img/img10.png';
import img11 from '/public/img/img11.png';
import img12 from '/public/img/img12.png';
import img13 from '/public/img/img13.png';
import img14 from '/public/img/img14.png';
import img15 from '/public/img/img15.png';

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import './image-zoom.css';
import './custom-zoom.css';

const parentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.03,
    },
  },
};

const childVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
};

// Sample data - duplicate images to create a grid
const gridItems = [
  { id: 1, image: img1, title: 'google_calendar_but_pretty.jpg' },
  { id: 2, image: img2, title: 'add-to-bag.jpg' },
  { id: 3, image: img3, title: 'slow-down.jpg' },
  { id: 4, image: img4, title: 'sauce?.jpg' },
  { id: 5, image: img5, title: 'hmmm.jpg' },
  { id: 6, image: img6, title: 'Project Six' },
  { id: 7, image: img7, title: 'Project Seven' },
  { id: 8, image: img8, title: 'Project Eight' },
  { id: 9, image: img9, title: 'Project Nine' },
  { id: 10, image: img10, title: 'Project Ten' },
  { id: 11, image: img11, title: 'Project Eleven' },
  { id: 12, image: img12, title: 'Project Twelve' },
  { id: 13, image: img13, title: 'Project Thirteen' },
  { id: 14, image: img14, title: 'Project Fourteen' },
  { id: 15, image: img15, title: 'Project Fifteen' },
];

export default function Page() {
  const [gridCols, setGridCols] = useState(6);
  const [showTitles, setShowTitles] = useState(true);
  const [crazyMode, setCrazyMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const minCols = isMobile ? 1 : 4;
  const maxCols = isMobile ? 4 : 12;

  // Generate random starting positions and velocities for each item
  const dvdAnimations = gridItems.map(() => ({
    startX: Math.random() * 80,
    startY: Math.random() * 80,
    duration: 3 + Math.random() * 2,
  }));

  return (
    
    <motion.section
      className="px-4 py-8"
      variants={parentVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Controls */}
      <motion.div 
        variants={childVariants}
        className="flex items-center gap-8 mb-8 max-w-3xl flex-wrap"
      >
        {/* Grid Size Slider */}
        <div className="flex items-center gap-4 flex-1 min-w-[250px]">
          <label htmlFor="grid-slider" className="text-sm text-neutral-600 dark:text-neutral-400 whitespace-nowrap">
            Grid size
          </label>
          <input
            id="grid-slider"
            type="range"
            min={minCols}
            max={maxCols}
            value={Math.min(Math.max(gridCols, minCols), maxCols)}
            onChange={(e) => setGridCols(Number(e.target.value))}
            className="flex-1 h-1 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-neutral-900 dark:accent-neutral-100"
          />
          <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100 w-6 text-right">
            {Math.min(Math.max(gridCols, minCols), maxCols)}
          </span>
        </div>

        {/* Show Titles Toggle */}
        <div className="flex items-center gap-3">
          <label htmlFor="title-toggle" className="text-sm text-neutral-600 dark:text-neutral-400 whitespace-nowrap">
            Show titles
          </label>
          <button
            id="title-toggle"
            onClick={() => setShowTitles(!showTitles)}
            className={`relative w-11 h-6 rounded-full transition-colors ${
              showTitles ? 'bg-neutral-900 dark:bg-neutral-100' : 'bg-neutral-200 dark:bg-neutral-700'
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white dark:bg-neutral-900 transition-transform ${
                showTitles ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Crazy Mode Toggle */}
        <div className="flex items-center gap-3">
          <label htmlFor="crazy-toggle" className="text-sm text-neutral-600 dark:text-neutral-400 whitespace-nowrap">
            🤪 Crazy mode
          </label>
          <button
            id="crazy-toggle"
            onClick={() => setCrazyMode(!crazyMode)}
            className={`relative w-11 h-6 rounded-full transition-colors ${
              crazyMode ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500' : 'bg-neutral-200 dark:bg-neutral-700'
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                crazyMode ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </motion.div>

      <div className={`grid gap-4 ${crazyMode ? 'relative' : ''}`} style={{ gridTemplateColumns: `repeat(${Math.min(Math.max(gridCols, minCols), maxCols)}, minmax(0, 1fr))` }}>
        {gridItems.map((item, index) => (
          <motion.div
            key={item.id}
            variants={childVariants}
            className="flex flex-col gap-2"
            style={crazyMode ? {
              position: 'fixed',
              zIndex: 50,
              width: '200px',
            } : {}}
            animate={crazyMode ? {
              x: [
                `${dvdAnimations[index].startX}vw`,
                `${100 - dvdAnimations[index].startX}vw`,
                `${dvdAnimations[index].startX}vw`,
              ],
              y: [
                `${dvdAnimations[index].startY}vh`,
                `${100 - dvdAnimations[index].startY}vh`,
                `${dvdAnimations[index].startY}vh`,
              ],
              filter: [
                'hue-rotate(0deg)',
                'hue-rotate(180deg)',
                'hue-rotate(360deg)',
              ]
            } : {}}
            transition={crazyMode ? {
              x: {
                duration: dvdAnimations[index].duration,
                repeat: Infinity,
                ease: "linear",
              },
              y: {
                duration: dvdAnimations[index].duration * 0.7,
                repeat: Infinity,
                ease: "linear",
              },
              filter: {
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }
            } : {}}
          >
            <Zoom>
              <div 
                className="w-full overflow-hidden rounded-xl cursor-pointer hover:opacity-90 transition-opacity" 
                style={{ border: '0.5px solid rgba(0, 0, 0, 0.1)' }}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  className="w-full h-auto"
                />
              </div>
            </Zoom>
            {showTitles && !crazyMode && (
              <p className="text-xs text-neutral-500 dark:text-neutral-300">
                {item.title}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}