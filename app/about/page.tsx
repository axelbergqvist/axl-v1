'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import ExperienceItem from '../components/experienceItem'; // Adjust path as necessary
import RecentlyPlayed from '../components/RecentlyPlayed'; // Import the RecentlyPlayed component
import Nordnet from '/public/Nordnet.png';
import Kumpan from '/public/kumpan.png';
import Freelance from '/public/Freelance.png';
import Brobygrafiska from '/public/brobygrafiska.png';
import Berghs from '/public/berghs.png';
import Dissect from '/public/dissect.png';
import About from '/public/about.png';
import Image from 'next/image';

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
  const [recentlyPlayedTracks, setRecentlyPlayedTracks] = useState([]);

  useEffect(() => {
    async function fetchRecentlyPlayedTracks() {
      try {
        const response = await fetch('/api/recently-played');
        if (!response.ok) {
          throw new Error('Failed to fetch recently played tracks');
        }
        const data = await response.json();
        setRecentlyPlayedTracks(data);
      } catch (error) {
        console.error('Error fetching recently played tracks:', error);
      }
    }

    fetchRecentlyPlayedTracks();
  }, []);

  return (
    <motion.section
      className="p-0 max-w-screen-sm mx-auto"
      variants={parentVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex sm:flex-row flex-col gap-4 mb-24">
        <motion.p className="text-sm text-neutral-500 dark:text-neutral-400 w-3/12" variants={childVariants}>
          About
        </motion.p>

      <motion.h1 className="text-sm w-full" variants={childVariants}>
        {`I am a designer currently shaping the native mobile apps at Linear and crafting app icons for a variety of clients.`}
        <br /> <br />
        {`I focus on the intersection of form and function to create experiences that effortlessly become an extension of oneself. I believe in ideas over opinions, prototypes as the most valuable tool for collaboration, and exploring one hundred ideas to find the right one.`}
        <br /> <br />
        {`I am driven by curiosity and strive for a high level of craftsmanship and excellence in my work.`}
        <br /> <br />
        {`I am driven by curiosity and strive for a high level of craftsmanship and excellence in my work.`}
        <br /> <br />
        {`I am driven by curiosity and strive for a high level of craftsmanship and excellence in my work.`}
      </motion.h1>
      </div>

      <div className="flex sm:flex-row flex-col gap-4 mb-20">
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

      <div className="flex s sm:flex-row flex-col gap-4 mb-20">
        <motion.p className="text-sm text-neutral-500 dark:text-neutral-400 sm:w-3/12 w-full" variants={childVariants}>
          Experience
        </motion.p>

        <motion.div className="flex flex-col gap-4 w-full">
          <ExperienceItem
            role="Product Designer at Nordnet"
            company="Nordnet"
            date="2022 – Now"
            imageSrc={Nordnet}
          />
          <ExperienceItem
            role="UX Designer at Kumpan"
            company="Kumpan"
            date="2021"
            imageSrc={Kumpan}
          />
          <ExperienceItem
            role="UX & Graphic Designer at Freelance"
            company="Freelance"
            date="2016 – 2021"
            imageSrc={Freelance}
          />
        </motion.div>
      </div>

      <div className="flex  sm:flex-row flex-col  gap-4 mb-20">
        <motion.p className="text-sm text-neutral-500 dark:text-neutral-400 sm:w-3/12 w-full" variants={childVariants}>
          Recent tracks
        </motion.p>

        <motion.div variants={childVariants} className="flex flex-col gap-4 w-full">
          <RecentlyPlayed tracks={recentlyPlayedTracks} />
        </motion.div>
      </div>

      {/*
      <div className="flex sm:flex-row flex-col sm:gap-20 gap-6 mb-24">
        <motion.p className="text-sm text-neutral-500 dark:text-neutral-400 sm:w-3/12 w-full" variants={childVariants}>
          Building
        </motion.p>
        <motion.div className="flex flex-col gap-4 w-full">
          <ExperienceItem
            role="Dissect"
            company="Like Mobbin, but you get the Figma file"
            date=""
            imageSrc={Dissect}
            link="https://nordnet.com" // Example link
          />
        </motion.div>
      </div>
      */}
      
      {/*
      <div className="flex sm:flex-row flex-col sm:gap-20 gap-6 mb-24">
        <motion.p className="text-sm text-neutral-500 dark:text-neutral-400 w-3/12" variants={childVariants}>
          Education
        </motion.p>

        <motion.div className="flex flex-col gap-4 w-full">
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
           */}
          </motion.section>
  );
}