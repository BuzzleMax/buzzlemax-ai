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
