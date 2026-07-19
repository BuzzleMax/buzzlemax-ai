import { COMPANY_INFO, BUSINESS_TYPES, PRICING_PLANS } from '@/lib/constants'

export const SITE_URL = 'https://buzzlemax.ai'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-image.svg`

export const NAV_LINKS = [
  { label: 'Features', href: '/#features' },
  { label: 'Solutions', href: '/#solutions' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Web Development', href: '/web-development' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Contact', href: '/#contact' },
] as const

export const FOOTER_LINK_GROUPS = {
  Product: NAV_LINKS.filter((link) =>
    ['Features', 'Solutions', 'How It Works', 'Pricing', 'Web Development'].includes(link.label)
  ),
  Resources: NAV_LINKS.filter((link) => ['FAQ', 'Contact'].includes(link.label)),
  Company: [
    { label: 'Email Us', href: `mailto:${COMPANY_INFO.contact.email}` },
    { label: 'Book Strategy Call', href: '/#pricing' },
  ],
} as const

export const AI_SERVICE_OPTIONS = [
  'AI Chatbots',
  'AI Voice Agents',
  'CRM Automation',
  'Email Automation',
  'Lead Qualification',
  'Appointment Booking',
  'Workflow Automation',
] as const

export const WEB_DEVELOPMENT_SERVICE_OPTIONS = [
  'Landing Page',
  'Business Website',
  'E-commerce Store',
  'Custom Web Application',
  'Website Redesign',
  'Technical SEO & Performance',
] as const

export const SALES_PLAN_OPTIONS = [
  ...PRICING_PLANS.map((plan) => plan.name),
  'Web Development',
  'Custom Solution',
] as const

export const BUSINESS_TYPE_OPTIONS = BUSINESS_TYPES.map((option) => option.label)

export const REVENUE_OPTIONS = [
  'Under $10k / month',
  '$10k - $50k / month',
  '$50k - $100k / month',
  '$100k - $500k / month',
  '$500k+ / month',
  'Prefer not to say',
] as const

export type SeoConfig = {
  title: string
  description: string
  path?: string
  keywords?: string[]
  image?: string
  type?: 'website' | 'article'
}

export const DEFAULT_SEO: SeoConfig = {
  title: 'Buzzlemax AI | Premium AI Automation Agency',
  description:
    'Deploy custom AI chatbots, voice agents, and workflow automation to qualify leads, book appointments, and scale your business operations.',
  path: '/',
  keywords: [
    'AI automation',
    'AI chatbots',
    'voice agents',
    'CRM automation',
    'lead qualification',
    'appointment booking',
    'business automation',
  ],
}

export const WEB_DEVELOPMENT_SEO: SeoConfig = {
  title: 'Custom Web Development | Buzzlemax AI',
  description:
    'Build premium landing pages, websites, e-commerce stores, and custom web apps designed for speed, trust, conversions, and long-term growth.',
  path: '/web-development',
  keywords: [
    'web development agency',
    'landing page design',
    'custom website development',
    'e-commerce development',
    'SaaS website design',
    'conversion rate optimization',
  ],
}
