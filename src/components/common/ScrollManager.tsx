import * as React from 'react'
import { useLocation } from 'react-router-dom'

import { scrollToHash } from '@/lib/navigation'

export function ScrollManager() {
  const location = useLocation()

  React.useEffect(() => {
    if (location.hash) {
      const timer = window.setTimeout(() => {
        scrollToHash(location.hash)
      }, 60)

      return () => window.clearTimeout(timer)
    }

    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [location.hash, location.pathname])

  return null
}
