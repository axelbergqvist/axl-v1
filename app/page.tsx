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
  <div className="flex items-center justify-center min-h-screen">
    <p className="text-xl text-neutral-400">Hello</p>
  </div>
);
}