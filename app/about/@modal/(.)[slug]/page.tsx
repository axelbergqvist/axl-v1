'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

const caseStudies: Record<string, {
  title: string;
  description: string;
  services: string;
  year: string;
  imageCount: number;
  hero?: string;
  heroAlt?: string;
  images?: string[];
  experience?: { role: string; company: string; period: string }[];
  education?: { degree: string; school: string; year: string }[];
  awards?: { title: string; body: string; year: string }[];
  links?: { label: string; href: string }[];
}> = {
  eaves: {
    title: 'Lab',
    description: `Beam (Y Combinator W22) is an infrastructure platform to simplify the development and deployment of AI projects. I joined the team during their YC program to help build the MVP and launch the product, contributing to raising a $3.5 million seed round led by Tiger Global.\n\nThe designs shown are early explorations of a new concept for the product and website.`,
    services: 'Product Design, Web Design',
    year: '2021 - 2024',
    imageCount: 4,
    hero: '/hero1.png',
    images: ['/lab/lab1.png', '/lab/lab2.png', '/lab/lab3.png', '/lab/lab4.png'],
  },
  bio: {
    title: 'About',
    description: `I'm a designer and creative technologist that's been in the game for over a decade. I owe my career to the Bay Area where I was born, raised, and gained interest in technology by proximity and osmosis.

In my youth, my household had a tight budget, but that constraint helped me get creative in my hobbies. I built low-end gaming rigs, learned how to overclock CPUs, and scoured the internet for pirated and cracked software and games. In high school, I didn't know what I wanted to be, but I knew I enjoyed myself most in physics class when I was building catapults or propeller-powered cars. This led me to study industrial design.`,
    services: '',
    year: '',
    imageCount: 0,
    hero: '/hero2.png',
    heroAlt: '/hero2.1.png',
    experience: [
      { role: 'Co-Founder', company: 'Eaves', period: '2025 - Present' },
      { role: 'Product Designer', company: 'Nordnet', period: '2022 – Present' },
      { role: 'Freelance Designer', company: '', period: '2017 – 2022' },
    ],
    education: [
      { degree: 'UX & Digital Product Design', school: 'Berghs School of Communication', year: '2021 - 2021' },
      { degree: 'Digital Design', school: 'Brobygrafiska', year: '2020 – 2022' },
    ],
    awards: [
      { title: 'Brands & Communication Design', body: 'Red Dot Award', year: '2025' },
    ],
    links: [
      { label: 'LinkedIn', href: 'https://linkedin.com/in/yourhandle' },
      { label: 'Read.cv', href: 'https://read.cv/yourhandle' },
      { label: 'Twitter / X', href: 'https://x.com/yourhandle' },
    ],
  },
};

function useSwoosh() {
  const ctx = useRef<AudioContext | null>(null);
  return useCallback((direction: 'open' | 'close') => {
    if (typeof window === 'undefined') return;
    if (!ctx.current) ctx.current = new AudioContext();
    const ac = ctx.current;
    const duration = 0.32;
    const sampleRate = ac.sampleRate;
    const buf = ac.createBuffer(1, sampleRate * duration, sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      const t = i / sampleRate;
      const progress = t / duration;
      const env = direction === 'open'
        ? Math.pow(progress, 0.3) * Math.exp(-progress * 5)
        : Math.pow(1 - progress, 0.3) * Math.exp(-(1 - progress) * 5);
      const noise = (Math.random() * 2 - 1);
      const mod = Math.sin(2 * Math.PI * 180 * t) * 0.3 + 0.7;
      data[i] = noise * mod * env * 0.04;
    }
    const highpass = ac.createBiquadFilter();
    highpass.type = 'highpass';
    highpass.frequency.value = 600;
    const lowpass = ac.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.value = 2800;
    lowpass.Q.value = 0.2;
    const gain = ac.createGain();
    gain.gain.value = 0.6;
    const src = ac.createBufferSource();
    src.buffer = buf;
    src.connect(highpass);
    highpass.connect(lowpass);
    lowpass.connect(gain);
    gain.connect(ac.destination);
    src.start();
  }, []);
}

const FAKE_SUMMARIES: Record<string, string> = {
  eaves: "Axel helped build and launch Beam, an AI infrastructure platform, during its Y Combinator W22 batch, contributing to a $3.5M seed round led by Tiger Global. The work shown reflects early design explorations for a reimagined version of the product and website.",
  bio: "Axel is a Bay Area–raised designer and creative technologist with over a decade of experience, currently co-founding Eaves while working as a Product Designer at Nordnet. His path from tinkering with hardware and pirated software as a kid led him through industrial design into product design, earning recognition including a Red Dot Award.",
};

export default function CaseStudyModal({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [emailCopied, setEmailCopied] = useState(false);
  const [heroToggled, setHeroToggled] = useState(false);
  const [summary, setSummary] = useState('');
  const [summarizing, setSummarizing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const study = caseStudies[params.slug];
  const playSwoosh = useSwoosh();

  const close = () => {
    playSwoosh('close');
    setIsOpen(false);
    setTimeout(() => router.back(), 300);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('axelbergqvist@live.se');
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email', err);
    }
  };

  const summarize = async () => {
    if (summarizing) return;

    // If we already have a summary, this click toggles the result view
    if (summary) {
      setShowResult((prev) => !prev);
      return;
    }

    setSummarizing(true);
    setShowResult(true);
    // simulate thinking time
    await new Promise((resolve) => setTimeout(resolve, 1200 + Math.random() * 800));
    setSummary(FAKE_SUMMARIES[params.slug] ?? 'No summary available.');
    setSummarizing(false);
  };

  useEffect(() => {
    playSwoosh('open');
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
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
          <motion.div className="fixed inset-0 z-50 bg-black/0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close} />
          <motion.div className="fixed inset-0 z-50 flex justify-center" onClick={close} initial={{ y: '100%', scale: 0.90 }} animate={{ y: 0, scale: 1 }} exit={{ y: '100%', scale: 0.96 }} transition={{ type: 'spring', stiffness: 300, damping: 32 }}>
            <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-[900px] bg-white dark:bg-neutral-900 rounded-t-[32px] mt-[5vh] h-[95vh] shadow-[0_8px_44px_rgba(0,0,0,0.05)] overflow-y-auto">

{/* Bottom bar */}
<div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-3 w-[280px]">
  <AnimatePresence>
    {showResult && (summary || summarizing) && (
      <motion.div layout initial={{ opacity: 0, y: 8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.95 }} transition={{ type: 'spring', stiffness: 400, damping: 28 }} className="max-w-[640px] px-6 py-4 rounded-3xl bg-black/35 backdrop-blur-xl text-white text-[15px] text-center">
        {summarizing ? (
          <span className="opacity-60">Summarizing…</span>
        ) : summary}
      </motion.div>
    )}
  </AnimatePresence>

  <motion.div layout transition={{ type: 'spring', stiffness: 400, damping: 30 }} className="flex items-center justify-center gap-3">
    <motion.button layout onClick={summarize} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }} className="h-14 px-5 rounded-full bg-black/35 backdrop-blur-md flex items-center justify-center text-white text-sm gap-2 whitespace-nowrap" aria-label="Summarize">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 1 7.107 9.993A9 9 0 1 1 3.8 9.155C5.007 5.6 8.29 3 12 3z" />
      </svg>
      {summary ? 'Done' : 'Summarize'}
    </motion.button>

    <AnimatePresence initial={false}>
      {!showResult && (
        <motion.button
          layout
          key="close-btn"
          onClick={close}
          initial={{ opacity: 0, scale: 0.5, width: 0, marginLeft: -12 }}
          animate={{ opacity: 1, scale: 1, width: 56, marginLeft: 0 }}
          exit={{ opacity: 0, scale: 0.5, width: 0, marginLeft: -12 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className="h-14 rounded-full bg-black/35 backdrop-blur-md flex items-center justify-center text-white text-2xl overflow-hidden shrink-0"
          aria-label="Close"
        >
          ✕
        </motion.button>
      )}
    </AnimatePresence>
  </motion.div>
</div>

              {study.hero && (
                <div className={`relative w-full aspect-[16/9] overflow-hidden ${study.heroAlt ? 'cursor-help' : ''}`} onClick={() => study.heroAlt && setHeroToggled((prev) => !prev)}>
                  <AnimatePresence mode="wait">
                    <motion.div key={heroToggled ? 'alt' : 'default'} initial={{ opacity: 0, scale: 1.03, filter: 'blur(6px)' }} animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} exit={{ opacity: 0, scale: 1.03, filter: 'blur(6px)' }} whileTap={study.heroAlt ? { scale: 1.04 } : undefined} transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }} className="absolute inset-0">
                      <Image src={study.heroAlt && heroToggled ? study.heroAlt : study.hero} alt={study.title} fill unoptimized className="object-cover" priority />
                    </motion.div>
                  </AnimatePresence>
                </div>
              )}

              <div className="px-8 md:px-16 pt-12 pb-24 flex flex-col items-center">
                <h1 className="w-full max-w-[640px] text-3xl font-medium mb-6 text-[#666666] dark:text-white">{study.title}</h1>

                <div className="text-[15px] text-[#666666] dark:text-neutral-400 leading-relaxed mb-10 whitespace-pre-line max-w-[640px] mx-auto">{study.description}</div>

                {(study.services || study.year) && (
                  <div className="w-full max-w-[640px] grid grid-cols-2 gap-8 mb-16 pb-10">
                    <div>
                      <div className="text-[15px] text-[#999999] mb-1">Services</div>
                      <div className="text-[15px] text-[#666666] dark:text-neutral-300">{study.services}</div>
                    </div>
                    <div>
                      <div className="text-[15px] text-[#999999] mb-1">Year</div>
                      <div className="text-[15px] text-[#666666] dark:text-neutral-300">{study.year}</div>
                    </div>
                  </div>
                )}

                {study.images && study.images.length > 0 && (
                  <div className="flex flex-col gap-6 w-full">
                    {study.images.map((src, i) => (
                      <div key={i} className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 border-[0.5px] border-black/5 dark:border-white/10">
                        <Image src={src} alt={`${study.title} image ${i + 1}`} fill unoptimized className="object-cover" />
                      </div>
                    ))}
                  </div>
                )}

                {study.experience && (
                  <div className="w-full max-w-[640px] mt-12">
                    <div className="text-[15px] text-[#999999] mb-1">Experience</div>
                    <div className="flex flex-col">
                      {study.experience.map((item, i) => (
                        <div key={i} className="flex justify-between items-baseline py-3">
                          <div className="flex items-baseline gap-2">
                            <span className="text-[15px] text-[#444444] dark:text-neutral-200">{item.role}</span>
                            <span className="text-[15px] text-[#999999]">{item.company}</span>
                          </div>
                          <span className="text-[15px] text-[#999999] tabular-nums shrink-0 ml-6">{item.period}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {study.education && (
                  <div className="w-full max-w-[640px] mt-10">
                    <div className="text-[15px] text-[#999999] mb-1">Education</div>
                    <div className="flex flex-col">
                      {study.education.map((item, i) => (
                        <div key={i} className="flex justify-between items-baseline py-3">
                          <div className="flex items-baseline gap-2">
                            <span className="text-[15px] text-[#444444] dark:text-neutral-200">{item.degree}</span>
                            <span className="text-[15px] text-[#999999]">{item.school}</span>
                          </div>
                          <span className="text-[15px] text-[#999999] tabular-nums shrink-0 ml-6">{item.year}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {study.awards && (
                  <div className="w-full max-w-[640px] mt-10">
                    <div className="text-[15px] text-[#999999] mb-1">Awards</div>
                    <div className="flex flex-col">
                      {study.awards.map((item, i) => (
                        <div key={i} className="flex justify-between items-baseline py-3">
                          <div className="flex items-baseline gap-2">
                            <span className="text-[15px] text-[#444444] dark:text-neutral-200">{item.title}</span>
                            <span className="text-[15px] text-[#999999]">{item.body}</span>
                          </div>
                          <span className="text-[15px] text-[#999999] tabular-nums shrink-0 ml-6">{item.year}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {study.links && (
                  <div className="w-full max-w-[640px] mt-10 mb-4">
                    <div className="text-[15px] text-[#999999] mb-1">Links</div>
                    <div className="flex flex-col">
                      {study.links.map((link, i) => (
                        <a key={i} href={link.href} target="_blank" rel="noopener noreferrer" className="flex justify-between items-center py-3 group">
                          <span className="text-[15px] text-[#444444] dark:text-neutral-200 group-hover:text-black dark:group-hover:text-white transition-colors duration-150">{link.label}</span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#cccccc] group-hover:text-[#999999] transition-colors duration-150 shrink-0" aria-hidden="true">
                            <path d="M7 7h10v10M7 17 17 7" />
                          </svg>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-12 flex justify-center w-full">
                  <motion.button onClick={copyEmail} layout whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ layout: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }, scale: { type: 'spring', stiffness: 400, damping: 20 } }} className="h-14 px-8 rounded-full bg-[#F9F9F9] dark:bg-neutral-800 hover:bg-[#F0F0F0] dark:hover:bg-neutral-700 text-[#666666] dark:text-neutral-400 hover:text-[#444444] dark:hover:text-neutral-300 transition-colors duration-200 flex items-center justify-center text-sm">
                    <AnimatePresence mode="popLayout" initial={false}>
                      {emailCopied ? (
                        <motion.span key="copied" layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="whitespace-nowrap">Email copied!</motion.span>
                      ) : (
                        <motion.span key="copy" layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="whitespace-nowrap">Copy email</motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>

              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}