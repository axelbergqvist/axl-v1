// app/page.tsx or any other file where you use CustomVideoPlayer
'use client';  // Add this line to mark the file as a Client Component

import { motion } from 'framer-motion';
import Zoom from 'react-medium-image-zoom';
import CustomZoomContent from '../../components/CustomZoomContent';
import 'react-medium-image-zoom/dist/styles.css';
import '../../custom-zoom.css';
import CustomVideoPlayer from '../../components/CustomVideoPlayer';

const parentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
      type: 'spring',
      stiffness: 100,
      damping: 10,
    },
  },
};

const childVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      type: 'spring',
      stiffness: 400,
      damping: 70,
    },
  },
};

const links = [
  { href: '#section1', text: 'Role' },
  { href: '#section2', text: 'Task' },
  { href: '#section3', text: 'Problem' },
  { href: '#section4', text: 'Solution' },
  { href: '#section6', text: 'Conclusion' },
];

export default function Page() {
  return (
    <motion.section
      className="p-0"
      variants={parentVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Fixed sidebar with anchor links */}
      <motion.div className="fixed top-40 left-16 z-10 xl:visible invisible" variants={childVariants}>
        <ul className="space-y-2">
          <div className="pb-6">
            <a href="/" className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors duration-300">
              ← Work
            </a>
          </div>
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors duration-300">
                {link.text}
              </a>
            </li>
          ))}
        </ul>
      </motion.div>

      <div className="flex flex-col sm:gap-2 gap-6 mb-24">
        <motion.div className="text-sm text-neutral-500 dark:text-neutral-400 sm:w-3/12 w-full" variants={childVariants}>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 w-full">Nordnet Order</p>
        </motion.div>

        <motion.h1 className="text-sm w-full" variants={childVariants}>
          {`Besides my main projects, I explore different areas of interest in my free time. This is the best way to discover useful solutions, train my eyes for details, and develop more specific insights in certain topics.`}
        </motion.h1>
      </div>
      
      <motion.div variants={childVariants}>
        <div className="flex justify-center">
          <Zoom ZoomContent={CustomZoomContent}>
            <div className="lg:w-[1000px] w-full mx-auto">
              <CustomVideoPlayer src="/07.mp4" />
            </div>
          </Zoom>
        </div>
        <motion.p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
          Amex Watch App
        </motion.p>
      </motion.div>
    </motion.section>
  );
}
