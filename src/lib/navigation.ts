import { type NavigateFunction } from 'react-router-dom'

export function scrollToHash(hash: string, behavior: ScrollBehavior = 'smooth') {
  if (typeof window === 'undefined') return

  const normalizedHash = hash.startsWith('#') ? hash : `#${hash}`
  const element = document.querySelector<HTMLElement>(normalizedHash)

  if (!element) return

  window.requestAnimationFrame(() => {
    element.scrollIntoView({ behavior, block: 'start' })
    if (window.location.hash !== normalizedHash) {
      window.history.replaceState(null, '', normalizedHash)
    }
  })
}

export function navigateToHref(navigate: NavigateFunction, href: string, onComplete?: () => void) {
  if (href.startsWith('mailto:')) {
    window.location.href = href
    onComplete?.()
    return
  }

  if (href.startsWith('/#')) {
    const [, hash = ''] = href.split('#')
    navigate(`/${hash ? `#${hash}` : ''}`)
    onComplete?.()
    return
  }

  if (href.startsWith('#')) {
    scrollToHash(href)
    onComplete?.()
    return
  }

  navigate(href)
  onComplete?.()
}

export function normalizeWebsite(value: string) {
  const trimmedValue = value.trim()
  if (!trimmedValue) return ''

  if (/^https?:\/\//i.test(trimmedValue)) {
    return trimmedValue
  }

  return `https://${trimmedValue}`
}
