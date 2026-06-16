'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function RequestAppButton() {
  const [open, setOpen] = useState(false);
  const [request, setRequest] = useState('');

  // 🔒 lock background scroll
  useEffect(() => {
    if (!open) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // ⌨️ ESC to close
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <>
      {/* TRIGGER */}
      <button
        onClick={() => setOpen(true)}
        className="
          h-12 px-5 rounded-full
          bg-white dark:bg-neutral-800
          shadow-[0_4px_24px_rgba(0,0,0,0.08)]
          text-sm text-neutral-600 dark:text-neutral-300
        "
      >
        Request App Yo
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="
                fixed inset-0 z-50
                bg-neutral-200/60
                backdrop-blur-sm
              "
            />

            {/* MODAL WRAPPER */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-8">
              <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                className="
                  relative
                  w-full max-w-[420px]
                  rounded-[32px]
                  overflow-hidden
                  bg-white
                  dark:bg-neutral-900
                  shadow-[0_30px_120px_rgba(0,0,0,0.25)]
                "
              >
                {/* CLOSE BUTTON (ANIMATED) */}
                <motion.button
                  onClick={() => setOpen(false)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="
                    absolute top-4 right-4 z-20
                    w-11 h-11
                    rounded-full
                    bg-white/80 dark:bg-neutral-800/80
                    backdrop-blur-xl
                    shadow-[0_6px_24px_rgba(0,0,0,0.12)]
                    flex items-center justify-center
                    text-neutral-600 dark:text-neutral-300
                  "
                  aria-label="Close"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6L6 18" />
                    <path d="M6 6l12 12" />
                  </svg>
                </motion.button>

                {/* HERO */}
                <div className="relative h-[220px] bg-[#F5F5F5] overflow-hidden">
                  <video
                    className="
                      absolute inset-0
                      w-full h-full
                      object-cover
                      scale-[1.6]
                      translate-y-10
                    "
                    src="/dissect/RequestHero.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />

                  <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white to-transparent pointer-events-none" />
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                </div>

                {/* CONTENT */}
                <div className="p-8">
                  <h2 className="text-[26px] font-medium text-neutral-700 dark:text-white">
                    Request an app
                  </h2>

                  <p className="mt-1 text-neutral-400 text-sm">
                    Suggest a product you'd like dissected.
                  </p>

                  {/* TEXTAREA (ANIMATED) */}
                  <motion.textarea
                    value={request}
                    onChange={(e) => setRequest(e.target.value)}
                    placeholder="Airbnb, Notion, Stripe..."
                    className="
                      mt-6 w-full h-24
                      rounded-3xl
                      bg-neutral-100 dark:bg-neutral-800
                      p-4 text-sm
                      outline-none
                      resize-none
                    "
                  />

                  {/* SUBMIT (ANIMATED) */}
                  <div className="flex justify-end mt-5">
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className="
                        h-12 px-6 rounded-full font-medium
                        bg-neutral-800 text-white
                        dark:bg-white dark:text-black
                        text-sm
                      "
                    >
                      Submit
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}