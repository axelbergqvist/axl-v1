export default function Footer() {
  return (
    <footer className="my-16">
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-8">
        </p>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">
          Reach out
        </p>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="https://vercel.com/templates/next.js/portfolio-starter-kit"
          >
            <p className="text-sm">axelbergqvist@live.se</p>
          </a>
      <p className="mt-8 text-neutral-600 dark:text-neutral-400"></p>
      <div className="flex flex-row w-full justify-between items-end">
      <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            href="/colophon"
          >
            <p className="text-sm text-neutral-600 dark:text-neutral-400">View colophon</p>
          </a>
      </div>
    </footer>
  )
}