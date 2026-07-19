import { z } from 'zod'

import {
  AI_SERVICE_OPTIONS,
  BUSINESS_TYPE_OPTIONS,
  REVENUE_OPTIONS,
  SALES_PLAN_OPTIONS,
  WEB_DEVELOPMENT_SERVICE_OPTIONS,
} from '@/lib/site'

export const validation = {
  email: (value: string): string | null => {
    if (!value) return 'Email is required'
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) return 'Please enter a valid email address'
    return null
  },

  password: (value: string): string | null => {
    if (!value) return 'Password is required'
    if (value.length < 8) return 'Password must be at least 8 characters'
    return null
  },

  fullName: (value: string): string | null => {
    if (!value) return 'Full name is required'
    if (value.trim().length < 2) return 'Full name must be at least 2 characters'
    return null
  },

  companyName: (value: string): string | null => {
    if (!value) return 'Company name is required'
    if (value.trim().length < 2) return 'Company name must be at least 2 characters'
    return null
  },

  required: (value: string, fieldName: string): string | null => {
    if (!value || !value.trim()) return `${fieldName} is required`
    return null
  },
}

const websiteSchema = z
  .string()
  .trim()
  .min(1, 'Business website is required')
  .refine((value) => {
    try {
      new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`)
      return true
    } catch {
      return false
    }
  }, 'Enter a valid website URL')

export const contactFormSchema = z.object({
  firstName: z.string().trim().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().trim().min(2, 'Last name must be at least 2 characters'),
  email: z.string().trim().email('Please enter a valid email address'),
  subject: z.string().trim().min(3, 'Subject must be at least 3 characters'),
  message: z
    .string()
    .trim()
    .min(20, 'Message must be at least 20 characters')
    .max(1200, 'Message must be 1200 characters or fewer'),
})

export const salesServiceOptions = [...AI_SERVICE_OPTIONS, ...WEB_DEVELOPMENT_SERVICE_OPTIONS] as const

export const contactSalesSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters'),
  company: z.string().trim().min(2, 'Company must be at least 2 characters'),
  website: websiteSchema,
  email: z.string().trim().email('Please enter a valid email address'),
  businessType: z.enum(BUSINESS_TYPE_OPTIONS as unknown as [string, ...string[]], {
    message: 'Select a business type',
  }),
  interestedService: z.enum(salesServiceOptions as unknown as [string, ...string[]], {
    message: 'Select an interested service',
  }),
  selectedPlan: z.enum(SALES_PLAN_OPTIONS as unknown as [string, ...string[]], {
    message: 'Select a plan',
  }),
  monthlyRevenue: z
    .enum(REVENUE_OPTIONS as unknown as [string, ...string[]])
    .nullable()
    .optional(),
  projectDetails: z
    .string()
    .trim()
    .min(30, 'Project details must be at least 30 characters')
    .max(1500, 'Project details must be 1500 characters or fewer'),
})

export type ContactFormSchema = z.infer<typeof contactFormSchema>
export type ContactSalesSchema = z.infer<typeof contactSalesSchema>
