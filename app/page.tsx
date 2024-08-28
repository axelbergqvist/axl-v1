'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import profilepic from 'public/profilepic.png';
import WorktestDark2 from '/public/worktest8.png'; // Example image
import WorktestDark3 from '/public/worktest9.png'; // Example image
import WorktestDark4 from '/public/worktest10.png'; // Example image

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import './image-zoom.css';
import './custom-zoom.css';
import CustomZoomContent from './components/CustomZoomContent';
import useTheme from './hooks/useTheme'; // Import the theme hook
import Confetti from './components/Confetti'; // Import the Confetti component
import confetti from 'canvas-confetti'; // Import the confetti function from canvas-confetti
import WorkContainer from './components/WorkContainer'; // Import the WorkContainer component

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

  // Example data
  const workData = {
    year: 2023,
    imageSrc: WorktestDark2, // Change this to the desired image
    title: 'Nordnet order experience',
    description: 'UI Kit is a pixel-perfect Figma design system made for complex products. It gathers carefully crafted classic components.',
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
          <motion.div variants={childVariants} className="max-w-screen-sm mx-auto">
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="mb-6 rounded-full cursor-pointer h-16 w-16 overflow-hidden"
              onClick={handleProfilePicClick}
            >
              <Image
                src={profilepic}
                alt="Picture of me"
                className="h-16 w-16"
              />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.p className="text-sm mb-0.5 max-w-screen-sm mx-auto" variants={childVariants}>
          Axel Bergqvist
        </motion.p>
        <motion.p className="text-sm mb-6 text-neutral-500 dark:text-neutral-400 max-w-screen-sm mx-auto" variants={childVariants}>
          Product Designer
        </motion.p>
        <motion.h1 className="text-sm mb-24 max-w-screen-sm mx-auto" variants={childVariants}>
          {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ligula est, gravida ac ex id, iaculis tempor nisl. Proin ac quam vitae diam accumsan tincidunt quis vel nisl.`}
        </motion.h1>
        
        <WorkContainer
        year="2023"
        imageSrc={WorktestDark2} // Use the imported image
        title="Nordnet — Order Experience"
        description="UI Kit is a pixel-perfect Figma design system made for complex products. It gathers carefully crafted classic components such as buttons, dropdowns or text fields as well as more technical."
        childVariants={childVariants}
        >
      </WorkContainer>

      <WorkContainer
        year="2024"
        imageSrc={WorktestDark4} // Use the imported image
        title="Dissect.com"
        description="UI Kit is a pixel-perfect Figma design system made for complex products. It gathers carefully crafted classic components."
        childVariants={childVariants}
        >
      </WorkContainer>

      <WorkContainer
        year="2021"
        imageSrc={WorktestDark3} // Use the imported image
        title="Sleep Cycle — Investor Relations"
        description="UI Kit is a pixel-perfect Figma design system made for complex products. It gathers carefully crafted classic components."
        childVariants={childVariants}
        >
      </WorkContainer>


      </motion.section>
      <Confetti /> {/* Render the Confetti component */}
    </>
  );
}
