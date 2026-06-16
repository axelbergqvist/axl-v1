'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CaseStudyModal({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  const close = () => {
    setIsOpen(false);
    setTimeout(() => router.back(), 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.div
            className="fixed inset-0 z-50 flex justify-center overflow-y-auto"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
          >
            <div className="relative w-full max-w-[900px] bg-white dark:bg-neutral-900 rounded-t-[24px] mt-[5vh] min-h-[95vh] shadow-2xl">
              <button
                onClick={close}
                className="sticky top-6 left-6 w-9 h-9 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center"
              >
                ✕
              </button>
              <div className="px-8 md:px-16 pb-24 -mt-9">
                <h1 className="text-3xl font-medium mb-2 mt-16">Case study: {params.slug}</h1>
                <p>Content for {params.slug} goes here.</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}