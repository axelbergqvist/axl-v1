'use client'

import Image from 'next/image';
import profilepic from 'public/profilepic.png';
import ImageZoom from './components/image-zoom';
import { motion } from 'framer-motion';

const parentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.05, // Stagger effect with 0.05 seconds delay
      type: "spring", // Apply spring animation to the parent's transition
      stiffness: 100, // Adjust stiffness for the spring
      damping: 10, // Adjust damping for the spring
    },
  },
};

const childVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: 'blur(10px)', // Initial state with blur
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',  // Final state without blur
    transition: {
      duration: 0.5, // Adjust duration for each child's animation
      type: "spring", // Apply spring animation to each child's transition
      stiffness: 400, // Adjust stiffness for the spring
      damping: 70, // Adjust damping for the spring
    },
  },
};

export default function Page() {
  return (
    <>
      <motion.section
        className=""
        variants={parentVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={childVariants}>
          <Image className="mb-6 rounded-full h-16 w-16" src={profilepic} alt="Picture of me" />
        </motion.div>
        <motion.p className="text-sm mb-0.5" variants={childVariants}>Axel Bergqvist</motion.p>
        <motion.p className="text-sm mb-6 text-neutral-500 dark:text-neutral-400" variants={childVariants}>Stockholm, Sweden</motion.p>
        <motion.h1 className="text-sm mb-16" variants={childVariants}>
          {`I’m a design engineer based in Vancouver, BC. I’m passionate about building delightful user interfaces that feel intuitive for everyone.`}
        </motion.h1>
        {/* You can add more content here if needed */}
      </motion.section>

      {/* Apply the same animation to the new div */}
      <motion.div variants={childVariants} >
        <motion.div className="my-8">
          <ImageZoom/>
        </motion.div>
      </motion.div>
    </>
  );
}
