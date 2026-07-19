export const COMPANY_INFO = {
  name: 'Buzzlemax AI',
  tagline: 'Premium AI Automation Agency',
  description:
    'Deploy AI chatbots, voice agents, omnichannel support, and CRM/email automation—built to qualify leads, book appointments, and run your workflows end-to-end.',
  contact: {
    email: 'buzzlemaxofficial@gmail.com',
  },
}

export const FEATURES = [
  {
    icon: 'MessageSquare',
    title: 'AI Chatbots & Customer Support AI',
    description:
      '24/7 instant answers, ticket deflection, and smart routing—powered to resolve customer questions and escalate only what matters.',
  },
  {
    icon: 'Sparkles',
    title: 'AI Voice Agents (Calls → Outcomes)',
    description:
      'Turn inbound and outbound calls into qualified conversations: capture intent, verify details, and progress prospects toward booked appointments.',
  },


  {
    icon: 'BarChart3',
    title: 'Lead Qualification & Analytics',
    description:
      'Score intent, track conversion signals, and get clear visibility into which messages and channels create booked meetings.',
  },
  {
    icon: 'Users',
    title: 'CRM Automation & Lead Workflows',
    description:
      'Auto-enrich contacts, update your pipeline, trigger follow-ups, and keep your CRM accurate without manual effort.',
  },
  {
    icon: 'Mail',
    title: 'Email Automation & Appointment Booking',
    description:
      'Personalized sequences that nurture leads, confirm availability, and book appointments directly—automatically.',
  },
  {
    icon: 'Shield',
    title: 'Enterprise-Grade Security',
    description:
      'Bank-level encryption and secure handling designed for sensitive business data and reliable automation at scale.',
  },
]


export const PRICING_PLANS = [
  {
    name: 'STARTER',
    setupFee: 997,
    price: 297,
    period: 'month',
    description: '',
    features: [
      'AI Website Chatbot',
      'Lead Capture System',
      'CRM Integration',
      'Email Automation',
      'Monthly AI Optimization',
      '1 Platform Integration',
      'Performance Dashboard',
      'Email Support',
    ],
    usage: [
      'Up to 2,500 AI conversations/month',
    ],
    cta: 'Schedule Free Strategy Call',
    popular: false,
  },
  {
    name: 'PROFESSIONAL',
    setupFee: 2497,
    price: 897,
    period: 'month',
    description: '',
    features: [
      'Everything in Starter plus:',
      'AI Voice Receptionist',
      'WhatsApp AI',
      'Instagram AI',
      'CRM Automation',
      'Appointment Booking',
      'Workflow Automation',
      'Multi-channel AI Support',
      'Advanced Analytics',
      'Priority Support',
    ],
    usage: [
      'Up to 5,000 AI conversations',
      'Up to 500 voice minutes',
    ],
    cta: 'Schedule Free Strategy Call',
    popular: true,
  },
  {
    name: 'ENTERPRISE',
    setupFee: 9997,
    price: 0,
    period: 'month',
    description: '',
    features: [
      'Unlimited AI Agents',
      'Internal Knowledge Base AI',
      'Custom AI Workflows',
      'API Integrations',
      'White Label Solutions',
      'Custom Development',
      'Dedicated Account Manager',
      'Priority Support',
    ],
    cta: 'Request Custom Proposal',
    popular: false,
    isEnterprise: true,
  },
]


export const STATS = [
  { label: 'Leads Qualified', value: '1' },
  { label: 'Appointments Booked', value: '1' },
  { label: 'Support Deflection', value: '63%' },
  { label: 'Avg. Response Time', value: '1.2s' },
]


export const CONTACT_STATUSES = [
  { value: 'new', label: 'New', color: 'bg-blue-500' },
  { value: 'contacted', label: 'Contacted', color: 'bg-yellow-500' },
  { value: 'qualified', label: 'Qualified', color: 'bg-purple-500' },
  { value: 'engaged', label: 'Engaged', color: 'bg-orange-500' },
  { value: 'converted', label: 'Converted', color: 'bg-green-500' },
  { value: 'inactive', label: 'Inactive', color: 'bg-red-500' },
]

export const BUSINESS_TYPES = [
  { value: 'retail', label: 'Retail' },
  { value: 'service', label: 'Service' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'technology', label: 'Technology' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'finance', label: 'Finance' },
  { value: 'other', label: 'Other' },
]

export const CONTACT_SOURCES = [
  { value: 'website', label: 'Website' },
  { value: 'referral', label: 'Referral' },
  { value: 'social_media', label: 'Social Media' },
  { value: 'campaign', label: 'Campaign' },
  { value: 'other', label: 'Other' },
]

export const PRIORITY_LEVELS = [
  { value: 'low', label: 'Low', color: 'bg-gray-500' },
  { value: 'medium', label: 'Medium', color: 'bg-blue-500' },
  { value: 'high', label: 'High', color: 'bg-orange-500' },
  { value: 'critical', label: 'Critical', color: 'bg-red-500' },
]
