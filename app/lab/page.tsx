'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import ScrambleText from '../components/ScrambleText';
import Zoom from 'react-medium-image-zoom';
import CustomZoomContent from '../components/CustomZoomContent';
import 'react-medium-image-zoom/dist/styles.css';
import '../image-zoom.css';
import '../custom-zoom.css';
import WorktestDark from '/public/worktest3-dark.png'; // Import the dark mode image
import Worktest2 from '/public/worktest4-dark.png'

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

export default function Page() {
  return (
    <motion.section
      className="p-0"
      variants={parentVariants}
      initial="hidden"
      animate="visible"
    >
        <div className="flex flex-col gap-4 mb-24">
        <motion.div className="text" variants={childVariants}>
        <ScrambleText text="Lab" className="text" />
        </motion.div>

      <motion.h1 className="text-sm w-full" variants={childVariants}>
      {`Besides my main projects, I explore different areas of interest in my free time. This is the best way to discover useful solutions, train my eyes for details, and develop more specific insights in certain topics.`}
      </motion.h1>
      </div>
      <motion.div variants={childVariants}>
        <Zoom ZoomContent={CustomZoomContent}>
          <Image
            className="mb-6 rounded-lg w-full border bg-neutral-50 dark:bg-[#191919] border-[#efefef] dark:border-neutral-800"
            src={WorktestDark} // Use the chosen image
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
            className="mb-6 rounded-lg w-full border border-neutral-200 dark:border-neutral-800"
            src={Worktest2} // Use the chosen image
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
