'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function ClientOnlyWrapper({ children }) {
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      window.scrollTo(0, 0)
    }
  }, [pathname, mounted])

  if (!mounted) return null

  return <>{children}</>
}