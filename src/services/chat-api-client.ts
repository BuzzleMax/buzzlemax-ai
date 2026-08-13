// Browser-safe types (shared with sales-engine on the server)
export interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export interface ChatResponse {
  message: string
  leadCaptureRecommended: boolean
  isFallback?: boolean
  quickActions?: QuickAction[]
}

export interface QuickAction {
  label: string
  prompt: string
}

// Health state for cooldown mechanism
let consecutiveFailures = 0
let lastFailureTime = 0
let isCooldownMode = false
const COOLDOWN_DURATION = 60000 // 1 minute cooldown
const MAX_CONSECUTIVE_FAILURES = 3 // Enter cooldown after 3 failures
const REQUEST_TIMEOUT = 15000 // 15 second timeout

// Dynamic pricing context for client fallback
function getPricingContext() {
  return {
    web: {
      landing: '$300 (25,000 Rupees)',
      business: '$1,000 (90,000 Rupees)', 
      ecommerce: '$5,000 (4.5 Lakhs Rupees)',
      custom: 'Custom Quote based on scope'
    },
    ai: {
      custom: '₹5,000 starting price'
    }
  }
}

// ────────────────────────────────────────────────────────────────
// Layer 1: Gemini API with retry logic
// ────────────────────────────────────────────────────────────────
async function callGeminiAPI(messages: ChatMessage[]): Promise<ChatResponse> {
  const apiEndpoint = import.meta.env.VITE_CHAT_API_URL || 
    'https://buzzlemax-ai-worker.swapnanildowarah10.workers.dev/api/chat'
  
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT)
  
  try {
    const res = await fetch(apiEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (res.ok) {
      const data = (await res.json()) as ChatResponse
      if (data && typeof data.message === 'string') {
        // Reset failure counter on success
        consecutiveFailures = 0
        isCooldownMode = false
        return data
      }
    } else {
      // Handle structured error responses from Worker
      const errorData = await res.json().catch(() => ({}))
      if (errorData.error) {
        throw new Error(`Worker error: ${errorData.error}`)
      }
      throw new Error(`HTTP ${res.status}`)
    }
  } catch (error) {
    clearTimeout(timeoutId)
    throw error
  }
  
  throw new Error('Invalid response from API')
}

// ────────────────────────────────────────────────────────────────
// Main API caller with Layer 1 retry + Layer 2/3 fallback
// ────────────────────────────────────────────────────────────────
export async function sendChatMessage(messages: ChatMessage[]): Promise<ChatResponse> {
  // Check if we're in cooldown mode
  if (isCooldownMode) {
    const now = Date.now()
    if (now - lastFailureTime < COOLDOWN_DURATION) {
      if (import.meta.env.DEV) {
        console.warn('[BuzzleMax Chat] In cooldown mode, using fallback')
      }
      return getBuzzleMaxFallback(messages)
    } else {
      // Cooldown expired, try API again
      isCooldownMode = false
      consecutiveFailures = 0
    }
  }

  // Layer 1: Try Gemini with single retry
  for (let attempt = 0; attempt <= 1; attempt++) {
    try {
      if (import.meta.env.DEV && attempt > 0) {
        console.warn('[BuzzleMax Chat] Retrying Gemini API (attempt 2)')
      }
      
      const response = await callGeminiAPI(messages)
      return response
    } catch (error) {
      if (import.meta.env.DEV) {
        console.warn(`[BuzzleMax Chat] Gemini API attempt ${attempt + 1} failed:`, error)
      }
      
      // Only retry on specific errors
      const shouldRetry = error instanceof Error && (
        error.message.includes('429') ||
        error.message.includes('500') ||
        error.message.includes('502') ||
        error.message.includes('503') ||
        error.message.includes('504') ||
        error.message.includes('timeout') ||
        error.message.includes('AbortError') ||
        error.message.includes('fetch')
      )
      
      if (!shouldRetry || attempt === 1) {
        break
      }
      
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  }

  // Track failure for cooldown
  consecutiveFailures++
  lastFailureTime = Date.now()
  
  if (consecutiveFailures >= MAX_CONSECUTIVE_FAILURES) {
    isCooldownMode = true
    if (import.meta.env.DEV) {
      console.warn('[BuzzleMax Chat] Entering cooldown mode after multiple failures')
    }
  }

  // Layer 2: Local BuzzleMax fallback
  if (import.meta.env.DEV) {
    console.warn('[BuzzleMax Chat] Gemini failed, using local fallback')
  }
  
  return getBuzzleMaxFallback(messages)
}

// ────────────────────────────────────────────────────────────────
// Layer 2: Local BuzzleMax Fallback Knowledge Base
// ────────────────────────────────────────────────────────────────
function getBuzzleMaxFallback(messages: ChatMessage[]): ChatResponse {
  const userText = [...messages].reverse().find((m) => m.role === 'user')?.content?.toLowerCase() ?? ''
  const allText = messages.map((m) => m.content.toLowerCase()).join(' ')
  const pricing = getPricingContext()

  // Human handoff
  if (userText.includes('talk to someone') || userText.includes('speak to human') || userText.includes('call me') || userText.includes('contact') || userText.includes('email')) {
    return {
      message: "I'd love to connect you with the BuzzleMax team! You can reach out via the contact form and someone will follow up with you.",
      leadCaptureRecommended: true,
      isFallback: true,
    }
  }

  // Services overview
  if (userText.includes('services') || userText.includes('offer') || userText.includes('what do you') || userText.includes('capabilities') || userText.includes('what can you')) {
    return {
      message: "BuzzleMax provides custom solutions for businesses:\n\n• 🌐 **Custom Websites** — Business websites, landing pages, e-commerce stores\n• 🤖 **AI Chatbots** — Website chatbots, FAQ assistants, lead-generation AI\n• 📱 **WhatsApp AI** — Custom WhatsApp automation and chatbots\n• 📸 **Instagram Automation** — AI-powered Instagram automation\n• 📞 **AI Voice Assistants** — Voice AI for customer support\n• ⚙️ **Custom AI Workflows** — Tailored AI automation solutions\n• 🤖 **Custom AI Solutions** — Any AI solution built around your needs\n\nCustom AI solutions start from ₹5,000. What are you looking to build?",
      leadCaptureRecommended: false,
      isFallback: true,
      quickActions: [
        { label: '🤖 Custom AI — from ₹5,000', prompt: 'I want a custom AI solution' },
        { label: '🌐 Website', prompt: 'I need a website' },
        { label: '💬 AI Chatbot', prompt: 'I need an AI chatbot' },
        { label: '📱 WhatsApp AI', prompt: 'I need WhatsApp automation' },
        { label: '📞 AI Voice', prompt: 'I need an AI voice assistant' },
        { label: '💰 Pricing', prompt: 'What are your prices?' },
        { label: '✉️ Contact BuzzleMax', prompt: 'I want to contact BuzzleMax' },
      ]
    }
  }

  // Website-related queries
  if (userText.includes('website') || userText.includes('site') || userText.includes('landing page') || userText.includes('web development')) {
    return {
      message: "BuzzleMax builds custom websites and landing pages tailored to your business needs. We offer:\n\n• **Landing Pages** — from $300 (25,000 Rupees)\n• **Business Websites** — from $1,000 (90,000 Rupees)\n• **E-commerce Stores** — from $5,000 (4.5 Lakhs)\n• **Custom Web Apps** — Custom quote based on scope\n\nWhat type of website are you looking for?",
      leadCaptureRecommended: false,
      isFallback: true,
      quickActions: [
        { label: '🌐 Landing Page', prompt: 'I need a landing page' },
        { label: '🏢 Business Website', prompt: 'I need a business website' },
        { label: '🛒 E-commerce', prompt: 'I need an e-commerce store' },
        { label: '💰 Pricing', prompt: 'What are your website prices?' },
      ]
    }
  }

  // AI chatbot queries
  if (userText.includes('chatbot') || userText.includes('bot') || (userText.includes('ai') && !userText.includes('voice'))) {
    return {
      message: `Custom AI solutions at BuzzleMax start from ${pricing.ai.custom}. This is the starting price for a focused AI solution like a website chatbot, FAQ assistant, or lead-generation AI. The final price depends on what you need the AI to do.\n\nWhat would you like the AI to handle for your business?`,
      leadCaptureRecommended: false,
      isFallback: true,
      quickActions: [
        { label: '💬 Customer Support', prompt: 'I need a customer support chatbot' },
        { label: '🎯 Lead Generation', prompt: 'I need a lead generation AI' },
        { label: '❓ FAQ Assistant', prompt: 'I need an FAQ assistant' },
        { label: '💰 Pricing', prompt: 'How much does an AI chatbot cost?' },
      ]
    }
  }

  // WhatsApp AI queries
  if (userText.includes('whatsapp')) {
    return {
      message: `BuzzleMax provides custom WhatsApp AI solutions starting from ${pricing.ai.custom}. You don't need a full website package — WhatsApp automation is available as a standalone solution.\n\nWhat would you like WhatsApp to automate?\n• Lead capture\n• Customer support\n• Appointment booking\n• FAQs and notifications`,
      leadCaptureRecommended: false,
      isFallback: true,
      quickActions: [
        { label: '📱 Lead Capture', prompt: 'I need WhatsApp for lead capture' },
        { label: '💬 Customer Support', prompt: 'I need WhatsApp for customer support' },
        { label: '📅 Appointments', prompt: 'I need WhatsApp for appointment booking' },
        { label: '💰 Pricing', prompt: 'How much does WhatsApp AI cost?' },
      ]
    }
  }

  // Instagram automation queries
  if (userText.includes('instagram')) {
    return {
      message: `BuzzleMax builds custom Instagram AI automation starting from ${pricing.ai.custom}. This can include automated responses, lead capture, and engagement automation based on your requirements.\n\nWhat would you like to automate on Instagram?`,
      leadCaptureRecommended: false,
      isFallback: true,
      quickActions: [
        { label: '📸 DM Automation', prompt: 'I need Instagram DM automation' },
        { label: '🎯 Lead Capture', prompt: 'I need Instagram for lead capture' },
        { label: '💰 Pricing', prompt: 'How much does Instagram automation cost?' },
      ]
    }
  }

  // AI voice assistant queries
  if (userText.includes('voice') || userText.includes('call') || userText.includes('phone')) {
    return {
      message: `BuzzleMax builds custom AI voice solutions starting from ${pricing.ai.custom}. The final price depends on the voice provider, call flow, integrations, and how advanced you want the system to be.\n\nWould you like the voice AI mainly for:\n• Answering calls\n• Qualifying leads\n• Customer support\n• Appointment booking`,
      leadCaptureRecommended: false,
      isFallback: true,
      quickActions: [
        { label: '📞 Answer Calls', prompt: 'I need voice AI to answer calls' },
        { label: '🎯 Lead Qualification', prompt: 'I need voice AI for lead qualification' },
        { label: '💬 Customer Support', prompt: 'I need voice AI for customer support' },
        { label: '💰 Pricing', prompt: 'How much does AI voice cost?' },
      ]
    }
  }

  // Pricing queries
  if (userText.includes('price') || userText.includes('cost') || userText.includes('how much') || userText.includes('quote') || userText.includes('estimate')) {
    if (userText.includes('website') || allText.includes('website')) {
      return {
        message: `Our web development pricing:\n• **Landing Pages** — from ${pricing.web.landing}\n• **Business Websites** — from ${pricing.web.business}\n• **E-commerce Stores** — from ${pricing.web.ecommerce}\n• **Custom Web Apps** — ${pricing.web.custom}\n\nFinal quote will be shared after understanding your requirement.`,
        leadCaptureRecommended: false,
        isFallback: true,
      }
    }
    return {
      message: `Custom AI solutions at BuzzleMax start from ${pricing.ai.custom}. This is the starting price for a focused individual AI solution like a website chatbot, FAQ assistant, or simple automation. More complex systems with multiple platforms or advanced integrations are quoted based on requirements.\n\nWhat specific project are you thinking about?`,
      leadCaptureRecommended: false,
      isFallback: true,
      quickActions: [
        { label: '🤖 Custom AI — from ₹5,000', prompt: 'I want a custom AI solution' },
        { label: '🌐 Website', prompt: 'I need a website' },
        { label: '💬 AI Chatbot', prompt: 'I need an AI chatbot' },
        { label: '📱 WhatsApp AI', prompt: 'I need WhatsApp automation' },
      ]
    }
  }

  // Budget discussions
  if (userText.includes('budget') || userText.includes('₹') || userText.includes('rs') || userText.includes('rupees') || userText.includes('only have') || userText.includes('afford')) {
    const budgetMatch = userText.match(/₹?\s?(\d{3,6})/)?.[1]
    if (budgetMatch) {
      const budget = parseInt(budgetMatch)
      if (budget < 10000) {
        return {
          message: `With a budget of ₹${budget.toLocaleString()}, we can focus on a single, well-defined AI solution. For example, a simple website chatbot or FAQ assistant could fit within this range. What specific task would you like the AI to handle?`,
          leadCaptureRecommended: false,
          isFallback: true,
        }
      }
      if (budget < 25000) {
        return {
          message: `₹${budget.toLocaleString()} is a good starting budget for a focused AI solution. We can build a custom chatbot, WhatsApp automation, or similar system within this range. What would you like to build?`,
          leadCaptureRecommended: false,
          isFallback: true,
        }
      }
    }
    return {
      message: "BuzzleMax offers flexible pricing starting from ₹5,000 for custom AI solutions. We focus on building what you actually need, not expensive packages with features you won't use. What's your budget range and what are you looking to build?",
      leadCaptureRecommended: false,
      isFallback: true,
    }
  }

  // Custom AI / complex queries
  if (userText.includes('custom') || userText.includes('complex') || userText.includes('enterprise') || userText.includes('workflow') || userText.includes('automation')) {
    return {
      message: "Custom projects are our specialty! BuzzleMax builds custom AI solutions, automation workflows, and integrations tailored to your specific business needs. Custom AI solutions start from ₹5,000.\n\nWhat would you like to build or automate?",
      leadCaptureRecommended: false,
      isFallback: true,
      quickActions: [
        { label: '🤖 Custom AI — from ₹5,000', prompt: 'I want a custom AI solution' },
        { label: '⚙️ Automation', prompt: 'I need business automation' },
        { label: '🔗 Integration', prompt: 'I need system integration' },
        { label: '✉️ Contact BuzzleMax', prompt: 'I want to discuss my project' },
      ]
    }
  }

  // Timeline queries
  if (userText.includes('how long') || userText.includes('timeline') || userText.includes('when') || userText.includes('days') || userText.includes('finish') || userText.includes('delivery')) {
    return {
      message: "Timelines vary based on project scope, features, integrations, and feedback cycles. Once we understand your requirements, we'll provide an estimated timeline — we never promise fixed dates before scoping the work.\n\nWhat type of project are you considering?",
      leadCaptureRecommended: false,
      isFallback: true,
    }
  }

  // Layer 3: Contact fallback for unhandled queries
  return {
    message: "I'd love to help with that. Tell the BuzzleMax team what you're looking to build and we'll help you figure out the right solution.",
    leadCaptureRecommended: true,
    isFallback: true,
    quickActions: [
      { label: '🤖 Custom AI — from ₹5,000', prompt: 'I want a custom AI solution' },
      { label: '🌐 Website', prompt: 'I need a website' },
      { label: '💬 AI Chatbot', prompt: 'I need an AI chatbot' },
      { label: '📱 WhatsApp AI', prompt: 'I need WhatsApp automation' },
      { label: '📞 AI Voice', prompt: 'I need an AI voice assistant' },
      { label: '💰 Pricing', prompt: 'What are your prices?' },
      { label: '✉️ Contact BuzzleMax', prompt: 'I want to contact BuzzleMax' },
    ]
  }
}
