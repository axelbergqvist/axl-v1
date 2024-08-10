'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

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

const ExperienceItem = ({ role, company, date, imageSrc, link }) => {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      variants={childVariants}
      whileHover={{ x: 4 }} // Hover animation
      transition={{ type: 'spring', stiffness: 400, damping: 30 }} // Optional: Add smoothness to the animation
      className="w-full flex flex-row items-center justify-between"
    >
      <motion.div className="flex flex-row items-center">
        <div className="border border-black/10 dark:border-white/10 rounded-lg mr-3 overflow-hidden size-8">
          <Image className="object-cover" src={imageSrc} alt="Company Image" />
        </div>
        <div className="flex flex-col">
          <p className="text-sm">{role}</p>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">{company}</p>
        </div>
      </motion.div>
      <p className="text-sm text-neutral-500 dark:text-neutral-400">{date}</p>
    </motion.a>
  );
};

export default ExperienceItem;