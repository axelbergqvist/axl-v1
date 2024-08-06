'use client'

import Image from 'next/image';
import Nordnet from '../public/Nordnet.png'
import profilepic from 'public/profilepic.png';
import ImageZoom from './components/image-zoom';
import { motion } from 'framer-motion';

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
        <motion.p className="text-sm" variants={childVariants}>Axel Bergqvist</motion.p>
        <motion.p className="text-sm mb-6 text-neutral-500 dark:text-neutral-400" variants={childVariants}>Stockholm, Sweden</motion.p>
        <motion.h1 className="text-sm mb-16" variants={childVariants}>
          {`I’m a design engineer based in Vancouver, BC. I’m passionate about building delightful user interfaces that feel intuitive for everyone.`}
        </motion.h1>
      </motion.section>
      
      <motion.div className="flex flex-row items-center justify-between" variants={parentVariants} initial="hidden" animate="visible">
      <motion.div className="flex flex-row items-center" variants={parentVariants} initial="hidden" animate="visible">
        <motion.div className="border border-black/10 dark:border-white/10 rounded-lg mr-3 overflow-hidden size-8"variants={childVariants}>
          <Image className="object-cover" src={Nordnet} alt="Picture of me" />
        </motion.div>
        <div className="flex flex-col">
          <motion.p className="text-sm" variants={childVariants}>Product Designer</motion.p>
          <motion.p className="text-sm text-neutral-500 dark:text-neutral-400" variants={childVariants}>Nordnet</motion.p>
        </div>
      </motion.div>
      <motion.p className="text-sm text-neutral-500 dark:text-neutral-400" variants={childVariants}>2022 - Now</motion.p>
      </motion.div>

      <motion.div variants={childVariants} >
        <motion.div className="my-8">
          <ImageZoom/>
        </motion.div>
      </motion.div>
    </>
  );
}
