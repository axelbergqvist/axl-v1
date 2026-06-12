'use client';

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';


const caseStudies: Record<string, {
  title: string;
  description: string;
  services: string;
  year: string;
  imageCount: number;
}> = {
  eaves: {
    title: 'Beam',
    description: `Beam (Y Combinator W22) is an infrastructure platform to simplify the development and deployment of AI projects. I joined the team during their YC program to help build the MVP and launch the product, contributing to raising a $3.5 million seed round led by Tiger Global.\n\nThe designs shown are early explorations of a new concept for the product and website.`,
    services: 'Product Design, Web Design',
    year: '2021 - 2024',
    imageCount: 4,
  },
};

export default function CaseStudyModal({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const study = caseStudies[params.slug];

  const close = () => {
    setIsOpen(false);
    setTimeout(() => router.back(), 300);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, []);

  if (!study) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
<motion.div
  className="fixed inset-0 z-50 flex justify-center"
  onClick={close}
  initial={{ y: '100%', scale: 0.90 }}
  animate={{ y: 0, scale: 1 }}
  exit={{ y: '100%', scale: 0.96 }}
  transition={{ type: 'spring', stiffness: 300, damping: 32 }}
>
  <div     onClick={(e) => e.stopPropagation()}
className="relative w-full max-w-[900px] bg-white dark:bg-neutral-900 rounded-t-[24px] mt-[5vh] h-[95vh] shadow-xl overflow-y-auto">

<div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
  <motion.button
    onClick={close}
    whileHover={{ scale: 1.08 }}
    whileTap={{ scale: 0.92 }}
    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white text-xl"
    aria-label="Close"
  >
    ✕
  </motion.button>
</div>

              {/* Full bleed hero */}
{/* Full bleed hero */}
<div className="relative w-full aspect-[16/9] overflow-hidden">
  <Image
    src="/hero1.png"
    alt={study.title}
    fill
    className="object-cover"
    priority
  />
</div>
              <div className="px-8 md:px-16 pt-12 pb-24">
                <h1 className="text-3xl font-medium mb-6 text-[#222222] dark:text-white">
                  {study.title}
                </h1>

                <div className="text-[15px] text-[#666666] dark:text-neutral-400 leading-relaxed mb-10 whitespace-pre-line max-w-[640px]">
                  {study.description}
                </div>

                {/* Meta info */}
                <div className="grid grid-cols-2 gap-8 max-w-[400px] mb-16 pb-10 border-b border-neutral-200 dark:border-neutral-800">
                  <div>
                    <div className="text-[13px] text-[#999999] mb-1">Services</div>
                    <div className="text-[15px] text-[#666666] dark:text-neutral-300">{study.services}</div>
                  </div>
                  <div>
                    <div className="text-[13px] text-[#999999] mb-1">Year</div>
                    <div className="text-[15px] text-[#666666] dark:text-neutral-300">{study.year}</div>
                  </div>
                </div>

                {/* Image gallery */}
                <div className="flex flex-col gap-6">
                  {Array.from({ length: study.imageCount }).map((_, i) => (
                    <div
                      key={i}
                      className="w-full aspect-[4/3] rounded-xl bg-neutral-200 dark:bg-neutral-800"
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}