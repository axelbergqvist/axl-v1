'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = {
  '/': {
    name: 'Work',
  },
  '/about': {
    name: 'About',
  },
  'https://vercel.com/templates/next.js/portfolio-starter-kit': {
    name: 'Lab',
  },
}

export function Navbar() {
  const pathname = usePathname();
  const isActive = (path) => path === pathname;
  return (
    <aside className="-ml-[8px] mb-24 z-100">
      <div className="lg:sticky lg:top-1 z-10">
        <nav
          className="flex flex-col items-center relative fade md:overflow-auto scroll-pr-6 md:relative "
          id="nav"
        >
          <div className="space-x-4 bg-black/85 dark:bg-neutral-700/40 rounded-full h-8 px-4 flex items-center fixed backdrop-blur-md border-0.5 border-white/15 shadow-lg shadow-black/20">
            {Object.entries(navItems).map(([path, { name }]) => {
              return (
                <Link
                  key={path}
                  href={path}
                  className={`${isActive(path) ? 'active' : ''} transition-all duration-300 text-xs text-neutral-400 dark:text-neutral-400 hover:text-neutral-500 dark:hover:text-neutral-40 align-middle`}
                >
                  {name}
                </Link>
              )
            })}
          </div>
        </nav>
      </div>
    </aside>
  )
}
