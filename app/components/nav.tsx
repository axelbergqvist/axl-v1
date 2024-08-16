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
  '/lab': {
    name: 'Lab',
  },
}

export function Navbar() {
  const pathname = usePathname();
  const isActive = (path) => path === pathname;
  return (
    <aside className="z-10">
      <div className="lg:sticky lg:top-1">
        <nav
          className="flex flex-col items-center relative fade md:overflow-auto scroll-pr-6 md:relative "
          id="nav"
        >
          <div className="space-x-4 bg-black/85 dark:bg-neutral-700/40 rounded-full sm:h-8 h-9 px-4 flex items-center fixed backdrop-blur-md border border-white/15 shadow-lg shadow-black/20" style={{ borderWidth: '0.5px'}}>
            {Object.entries(navItems).map(([path, { name }]) => {
              return (
                <Link
                  key={path}
                  href={path}
                  className={`transition-all duration-300 text-xs ${isActive(path) ? 'text-white' : 'text-neutral-400 dark:text-neutral-400'} ${isActive(path) ? '' : 'hover:text-neutral-500 dark:hover:text-neutral-40'} align-middle`}
                >
                  {name}
                </Link>
              )
            })}
          </div>
        </nav>
      </div>
      <div className="h-32"></div>
    </aside>
  )
}
