'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import ScrambleText from '../components/ScrambleText';
import Zoom from 'react-medium-image-zoom';
import CustomZoomContent from '../components/CustomZoomContent';
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
      <motion.div className="mb-4" variants={childVariants}>
        <ScrambleText text="Lab" className="text-sm text-neutral-500 dark:text-neutral-400" />
      </motion.div>

      <motion.h1 className="text-sm mb-24" variants={childVariants}>
        {`Besides my main projects, I explore different areas of interest in my free time. This is the best way to discover useful solutions, train my eyes for details, and develop more specific insights in certain topics.`}
      </motion.h1>
      <motion.div variants={childVariants}>
        <Zoom ZoomContent={CustomZoomContent}>
          <Image
            className="mb-4 rounded-md w-full border border-neutral-200 dark:border-neutral-800"
            src={imageSrc} // Use the chosen image
            alt="Picture of me"
            layout="responsive"
            width={600}
            height={400}
          />
        </Zoom>
        <motion.p className="text-sm text-neutral-500 dark:text-neutral-400 mb-24">
          Amex Watch App
        </motion.p>
      </motion.div>
      
      <motion.div variants={childVariants}>
        <Zoom ZoomContent={CustomZoomContent}>
          <Image
            className="mb-4 rounded-md w-full border border-neutral-200 dark:border-neutral-800"
            src={imageSrc} // Use the chosen image
            alt="Picture of me"
            layout="responsive"
            width={600}
            height={400}
          />
        </Zoom>
        <motion.p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
          Amex Watch App
        </motion.p>
      </motion.div>

    </motion.section>
  );
}
