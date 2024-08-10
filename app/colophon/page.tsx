'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import 'react-medium-image-zoom/dist/styles.css';
import '../image-zoom.css';
import '../custom-zoom.css';
import useTheme from '../hooks/useTheme'; // Import the theme hook
import WorktestLight from '/public/worktest3-light.png';
import WorktestDark from '/public/worktest3-dark.png'; // Import the dark mode image

const parentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.05,
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

export default function Page() {
  const isDarkMode = useTheme(); // Use the theme hook to get the current mode

  const imageSrc = isDarkMode ? WorktestDark : WorktestLight; // Choose image based on theme

  return (
    <motion.section
      className="p-0"
      variants={parentVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="mb-3" variants={childVariants}>
        <motion.p className="text-sm text-neutral-500 dark:text-neutral-400">
          Typography
        </motion.p>
      </motion.div>
      <motion.p className="text-sm mb-12" variants={childVariants}>
        {`This website is using Geist, a typeface by Vercel. It is inspired by the renowed Swiss design movement and embodies principles of simplicity, mimimalism and speed.`}
      </motion.p>

      <motion.div className="mb-3" variants={childVariants}>
        <motion.p className="text-sm text-neutral-500 dark:text-neutral-400">
          Tech
        </motion.p>
      </motion.div>
      <motion.p className="text-sm mb-12" variants={childVariants}>
        {`Built with Next.js, Tailwind and hosted on Vercel with a lot of support by ChatGPT and Copilot, since I am by no means a software engineer.`}
      </motion.p>

      <motion.div className="mb-3" variants={childVariants}>
        <motion.p className="text-sm text-neutral-500 dark:text-neutral-400">
          Design
        </motion.p>
      </motion.div>
      <motion.p className="text-sm mb-12" variants={childVariants}>
        {`All designs, mockups and prototypes made in Figma.`}
      </motion.p>

      <motion.div className="mb-3" variants={childVariants}>
        <motion.p className="text-sm text-neutral-500 dark:text-neutral-400">
          Inspiration
        </motion.p>
      </motion.div>
          <motion.div className="flex flex-col gap-3 w-full mb-24">
            <motion.p className="text-sm" variants={childVariants}>benji.org</motion.p>
            <motion.p className="text-sm" variants={childVariants}>sanalabs.com</motion.p>
            <motion.p className="text-sm" variants={childVariants}>linusrogge.com</motion.p>
            <motion.p className="text-sm" variants={childVariants}>luyuhang.net</motion.p>
            <motion.p className="text-sm" variants={childVariants}>rainbow.me</motion.p>
            <motion.p className="text-sm" variants={childVariants}>rauno.me</motion.p>
            <motion.p className="text-sm" variants={childVariants}>fabianschultz.com</motion.p>
            <motion.p className="text-sm" variants={childVariants}>nelson.co</motion.p>

          </motion.div>
    </motion.section>
  );
}
