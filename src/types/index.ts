// Contact Sales Submission type for the marketing website
export interface ContactSalesSubmission {
  name: string
  company: string
  email: string
  website: string
  phone: string | null
  business_type: string
  interested_service: string
  selected_plan: string
  monthly_revenue: string | null
  project_details: string
}

// Toast notification type (used by sonner)
export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  type: ToastType
  title: string
  description?: string
  duration?: number
}

// Theme mode type (used by landing page)
export type ThemeMode = 'light' | 'dark' | 'system'