// app/page.tsx or any other file where you use CustomVideoPlayer
'use client';  // Add this line to mark the file as a Client Component

import { motion } from 'framer-motion';
import Zoom from 'react-medium-image-zoom';
import CustomZoomContent from '../../components/CustomZoomContent';
import 'react-medium-image-zoom/dist/styles.css';
import '../../custom-zoom.css';
import CustomVideoPlayer from '../../components/CustomVideoPlayer';
import image09 from '../../../public/09.png'; // Import the chosen image
import Image from 'next/image';

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

const links = [
  { href: '#section1', text: 'Role' },
  { href: '#section2', text: 'Task' },
  { href: '#section3', text: 'Problem' },
  { href: '#section4', text: 'Solution' },
  { href: '#section6', text: 'Conclusion' },
];

export default function Page() {
  return (
    <motion.section
      className="p-0"
      variants={parentVariants}
      initial="hidden"
      animate="visible"
      >
      {/* Fixed sidebar with anchor links
      <motion.div className="fixed top-40 left-12 z-10 xl:visible invisible" variants={childVariants}>
        <ul className="space-y-1">
          <div className="mb-4">
            <a href="/" className="text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors duration-300">
              ← Work
            </a>
          </div>
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors duration-300">
                {link.text}
              </a>
            </li>
          ))}
        </ul>
      </motion.div>
*/}

      <div className="flex flex-col mb-16">
        <motion.div className="text mb-4" variants={childVariants}>
          <p>Nordnet Order</p>
        </motion.div>

        <motion.h1 className="text-sm w-full" variants={childVariants}>
          {`Besides my main projects, I explore different areas of interest in my free time. This is the best way to discover useful solutions, train my eyes for details, and develop more specific insights in certain topics.`}
        </motion.h1>
      </div>
      
      <motion.div variants={childVariants}>
        <div className="lg:w-[800px]flex justify-center mx-auto mb-16">
              <CustomVideoPlayer src="/07.mp4" />
        </div>
        <motion.p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">
          Problem
        </motion.p>
      </motion.div>

      <div className="flex flex-col sm:gap-2 gap-6 mb-16">
        <motion.p className="text-sm w-full" variants={childVariants}>
          {`When it comes to the visual aspects of design, the framework I believe in is applying taste and collaboration to extensive iteration. For me, this often manifests as a cyclical process of analyzing my work, figuring out what parts could be improved, tweaking a value slightly, and comparing the new version to the old.`}
          <br/><br/>
{`To get started, I created a scene to experiment with materials and lighting. Here is the first render I produced, with annotations of what was working and what wasn't, both from my analysis and feedback. This early iteration was more about the overall feel than anything scientific.`}
        </motion.p>
      </div>

      <div className="mb-12 w-full">
      <Zoom ZoomContent={CustomZoomContent}>
          <Image
            className="mb-6 rounded-lg w-full border border-[#efefef] dark:border-neutral-800"
            src={image09} // Use the chosen image
            alt="Picture of me"
            layout="responsive"
            width={600}
            height={400}
          />
        </Zoom>
        </div>

    </motion.section>
  );
}
