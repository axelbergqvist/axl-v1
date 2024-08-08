'use client';

import { motion } from 'framer-motion';
import ExperienceItem from '../components/experienceItem'; // Adjust path as necessary
import Nordnet from '/public/Nordnet.png';
import Kumpan from '/public/kumpan.png';
import Freelance from '/public/Freelance.png';
import Brobygrafiska from '/public/brobygrafiska.png'
import Berghs from '/public/berghs.png'
import Dissect from '/public/dissect.png'

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
  return (
    <motion.section
      className=""
      variants={parentVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 className="text-sm mb-16" variants={childVariants}>
        {`I’m a design engineer based in Vancouver, BC. I’m passionate about building delightful user interfaces that feel intuitive for everyone.`}
      </motion.h1>

      <div className="flex sm:flex-row flex-col sm:gap-20 gap-6 mb-20">
        <motion.p className="text-sm text-neutral-500 dark:text-neutral-400 w-3/12" variants={childVariants}>
          Experience
        </motion.p>

        <motion.div className="flex flex-col gap-6 w-full">
          <ExperienceItem
            role="Product Designer"
            company="Nordnet"
            date="2022 – Now"
            imageSrc={Nordnet}
            link="https://nordnet.com" // Example link
          />
          <ExperienceItem
            role="UX Designer"
            company="Kumpan"
            date="2021"
            imageSrc={Kumpan}
            link="https://nordnet.com" // Example link
          />
          <ExperienceItem
            role="UX & Graphic Designer"
            company="Freelance"
            date="2016 – 2021"
            imageSrc={Freelance}
            link="https://nordnet.com" // Example link
          />
        </motion.div>
      </div>

      <div className="flex sm:flex-row flex-col sm:gap-20 gap-6 mb-20">
        <motion.p className="text-sm text-neutral-500 dark:text-neutral-400 w-3/12" variants={childVariants}>
          What I like
        </motion.p>
        <motion.div className="flex flex-row gap-4 w-full">
          <motion.div className="flex flex-col gap-4 w-full">
            <motion.p className="text-sm" variants={childVariants}>Delightful interactions</motion.p>
            <motion.p className="text-sm" variants={childVariants}>Typography</motion.p>
            <motion.p className="text-sm" variants={childVariants}>Organized files</motion.p>
            <motion.p className="text-sm" variants={childVariants}>Motion design</motion.p>
          </motion.div>
          <motion.div className="flex flex-col gap-4 w-full">
            <motion.p className="text-sm" variants={childVariants}>Data-driven design</motion.p>
            <motion.p className="text-sm" variants={childVariants}>Clear communication</motion.p>
            <motion.p className="text-sm" variants={childVariants}>Teamwork</motion.p>
          </motion.div>
        </motion.div>
      </div>

      <div className="flex sm:flex-row flex-col sm:gap-20 gap-6 mb-20">
        <motion.p className="text-sm text-neutral-500 dark:text-neutral-400 w-3/12" variants={childVariants}>
          Building
        </motion.p>
        <motion.div className="flex flex-col gap-6 w-full">
          <ExperienceItem
            role="Dissect"
            company="Like Mobbin, but you get the Figma file"
            date="2024 — Now"
            imageSrc={Dissect}
            link="https://nordnet.com" // Example link
          />
        </motion.div>
      </div>
      
      <div className="flex sm:flex-row flex-col sm:gap-20 gap-6 mb-20">
        <motion.p className="text-sm text-neutral-500 dark:text-neutral-400 w-3/12" variants={childVariants}>
          Education
        </motion.p>

        <motion.div className="flex flex-col gap-6 w-full">
          <ExperienceItem
            role="Berghs School of Communication"
            company="UX & Digital Product Design"
            date="2021"
            imageSrc={Berghs}
            link="https://nordnet.com" // Example link
          />
          <ExperienceItem
            role="Brobygrafiska"
            company="Digital Design"
            date="2020 – 2022"
            imageSrc={Brobygrafiska}
            link="https://nordnet.com" // Example link
          />
        </motion.div>
      </div>




      
    </motion.section>
  );
}
