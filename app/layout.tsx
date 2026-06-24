import './global.css'
import { Navbar } from './components/nav'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/footer'
import { baseUrl } from './sitemap'
import ClientOnlyWrapper from './components/ClientOnlyWrapper'

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Axel Bergqvist',
    template: '%s | Axel Bergqvist',
  },
  description: 'Product Designer based in Stockholm.',
  openGraph: {
    title: 'Axel Bergqvist',
    description: 'Product Designer based in Stockholm.',
    url: baseUrl,
    siteName: 'Axel Bergqvist',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const cx = (...classes: string[]) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className="text-black bg-[#fcfcfc] dark:text-white dark:bg-neutral-900 overflow-visible"
    >
      <body className="ml-[-8px] mr-2 mt-6 sm:mx-auto overflow-visible">
        <ClientOnlyWrapper>
          <main className="flex-auto min-w-0 flex flex-col px-2 md:px-0 overflow-visible antialiased">
            {children}
            <Analytics />
            <SpeedInsights />
          </main>
        </ClientOnlyWrapper>
      </body>
    </html>
  )
}