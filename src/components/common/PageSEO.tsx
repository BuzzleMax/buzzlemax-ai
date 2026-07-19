import * as React from 'react'

import { DEFAULT_OG_IMAGE, DEFAULT_SEO, SITE_URL, type SeoConfig } from '@/lib/site'

type PageSeoProps = SeoConfig & {
  jsonLd?: Record<string, unknown>
}

const MANAGED_META_NAMES = ['description', 'keywords', 'robots', 'twitter:title', 'twitter:description', 'twitter:image']
const MANAGED_META_PROPERTIES = ['og:title', 'og:description', 'og:url', 'og:type', 'og:image']

function upsertMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLMetaElement>(selector)

  if (!element) {
    element = document.createElement('meta')
    document.head.appendChild(element)
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element?.setAttribute(key, value)
  })
}

function upsertLink(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLLinkElement>(selector)

  if (!element) {
    element = document.createElement('link')
    document.head.appendChild(element)
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element?.setAttribute(key, value)
  })
}

export function PageSEO({
  title,
  description,
  path = DEFAULT_SEO.path,
  keywords = DEFAULT_SEO.keywords,
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  jsonLd,
}: PageSeoProps) {
  React.useEffect(() => {
    const previousTitle = document.title
    const previousMeta = new Map<string, string | null>()
    const previousLinks = new Map<string, string | null>()
    const canonicalUrl = new URL(path ?? '/', SITE_URL).toString()

    MANAGED_META_NAMES.forEach((name) => {
      previousMeta.set(name, document.head.querySelector(`meta[name="${name}"]`)?.getAttribute('content') ?? null)
    })
    MANAGED_META_PROPERTIES.forEach((property) => {
      previousMeta.set(property, document.head.querySelector(`meta[property="${property}"]`)?.getAttribute('content') ?? null)
    })
    previousLinks.set('canonical', document.head.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? null)

    document.title = title
    upsertMeta('meta[name="description"]', { name: 'description', content: description })
    upsertMeta('meta[name="keywords"]', { name: 'keywords', content: keywords?.join(', ') ?? '' })
    upsertMeta('meta[name="robots"]', { name: 'robots', content: 'index, follow' })
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title })
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description })
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl })
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: type })
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: image })
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title })
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description })
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: image })
    upsertLink('link[rel="canonical"]', { rel: 'canonical', href: canonicalUrl })

    let structuredDataNode: HTMLScriptElement | null = null

    if (jsonLd) {
      structuredDataNode = document.createElement('script')
      structuredDataNode.type = 'application/ld+json'
      structuredDataNode.dataset.traeSeo = 'page-jsonld'
      structuredDataNode.textContent = JSON.stringify(jsonLd)
      document.head.appendChild(structuredDataNode)
    }

    return () => {
      document.title = previousTitle

      MANAGED_META_NAMES.forEach((name) => {
      const value = previousMeta.get(name)
      if (value === null || value === undefined) return
      upsertMeta(`meta[name="${name}"]`, { name, content: value })
    })

    MANAGED_META_PROPERTIES.forEach((property) => {
      const value = previousMeta.get(property)
      if (value === null || value === undefined) return
      upsertMeta(`meta[property="${property}"]`, { property, content: value })
    })

      const previousCanonical = previousLinks.get('canonical')
      if (previousCanonical) {
        upsertLink('link[rel="canonical"]', { rel: 'canonical', href: previousCanonical })
      }

      structuredDataNode?.remove()
    }
  }, [description, image, jsonLd, keywords, path, title, type])

  return null
}
