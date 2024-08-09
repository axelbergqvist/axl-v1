'use client'

import Image from 'next/image';
import { motion } from 'framer-motion';
import profilepic from 'public/profilepic.png';
import WorktestDark from '/public/worktest4-dark.png';
import WorktestLight from '/public/worktest4-light.png';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import './image-zoom.css';
import './custom-zoom.css';
import CustomZoomContent from './components/CustomZoomContent';
import useTheme from './hooks/useTheme'; // Import the theme hook
import Confetti from './components/Confetti'; // Import the Confetti component
import confetti from 'canvas-confetti'; // Import the confetti function from canvas-confetti


const parentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.05,
      type: "spring",
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
      type: "spring",
      stiffness: 400,
      damping: 70,
    },
  },
};

export default function Page() {
  const isDarkMode = useTheme(); // Use the theme hook to get the current mode

  const imageSrc = isDarkMode ? WorktestDark : WorktestLight; // Choose image based on theme

  const handleProfilePicClick = () => {
    // Find the canvas element where the confetti will be rendered
    const confettiCanvas = document.querySelector('canvas');
    if (confettiCanvas) {
      confetti.create(confettiCanvas, { resize: true })({
        particleCount: 100,
        spread: 70,
      });
    }
  };

  return (
    <>
      <motion.section
        className=""
        variants={parentVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={childVariants}>
          <motion.div
            initial={{ scale: 1 }}
            whileHover={{ scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="mb-6 rounded-full cursor-pointer bg-red-500 h-16 w-16 overflow-hidden"
            onClick={handleProfilePicClick}
          >
            <Image
              src={profilepic}
              alt="Picture of me"
              className="h-16 w-16"
            />
          </motion.div>
        </motion.div>
        <motion.p className="text-sm" variants={childVariants}>Axel Bergqvist</motion.p>
        <motion.p className="text-sm mb-6 text-neutral-500 dark:text-neutral-400" variants={childVariants}>Stockholm, Sweden</motion.p>
        <motion.h1 className="text-sm mb-16" variants={childVariants}>
          {`I’m a design engineer based in Vancouver, BC. I’m passionate about building delightful user interfaces that feel intuitive for everyone.`}
        </motion.h1>
        <motion.div variants={childVariants}>
          <Zoom ZoomContent={CustomZoomContent}>
            <Image
              className="mb-6 rounded-md w-full border border-neutral-200 dark:border-neutral-800"
              src={imageSrc} // Use the chosen image
              alt="Work test image"
              layout="responsive"
              width={600}
              height={400}
            />
          </Zoom>
        </motion.div>
      </motion.section>
      <Confetti /> {/* Render the Confetti component */}
    </>
  );
}
