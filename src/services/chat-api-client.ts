// Browser-safe types (shared with sales-engine on the server)
export interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export interface ChatResponse {
  message: string
  leadCaptureRecommended: boolean
}

// ────────────────────────────────────────────────────────────────
// Main API caller — hits the Vite dev-server middleware at POST /api/chat
// ────────────────────────────────────────────────────────────────
export async function sendChatMessage(messages: ChatMessage[]): Promise<ChatResponse> {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    })

    if (res.ok) {
      const data = (await res.json()) as ChatResponse
      if (data && typeof data.message === 'string') {
        return data
      }
    }
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn('[BuzzleMax Chat] /api/chat unreachable, using local fallback:', error)
    }
  }

  // ────────────────────────────────────────────────────────────────
  // Client-only fallback rule engine (no Node.js / process.env)
  // Runs entirely in the browser when the API route is unreachable.
  // ────────────────────────────────────────────────────────────────
  return clientFallbackResponse(messages)
}

function clientFallbackResponse(messages: ChatMessage[]): ChatResponse {
  const userText = [...messages].reverse().find((m) => m.role === 'user')?.content?.toLowerCase() ?? ''
  const allText = messages.map((m) => m.content.toLowerCase()).join(' ')

  // Human handoff
  if (userText.includes('talk to someone') || userText.includes('speak to human') || userText.includes('call me')) {
    return {
      message: "I'd love to connect you with the BuzzleMax team! You can reach out via the contact form below or email buzzlemaxofficial@gmail.com and someone will follow up with you.",
      leadCaptureRecommended: true,
    }
  }

  // WhatsApp / standalone automation
  if (userText.includes('whatsapp') || (userText.includes('only need') && userText.includes('automation'))) {
    return {
      message:
        "Absolutely — you don't need to purchase a full website package for that. BuzzleMax provides WhatsApp automation as a standalone solution!\n\nWhat would you like WhatsApp to automate?\n• Lead capture\n• Customer support\n• Appointment booking\n• FAQs / notifications\n\nFinal quote will be shared after understanding your requirement.",
      leadCaptureRecommended: false,
    }
  }

  // Pricing / cost / guarantee
  if (userText.includes('how much') || userText.includes('price') || userText.includes('cost') || userText.includes('guarantee') || userText.includes('quote') || userText.includes('estimate')) {
    if (allText.includes('website') || userText.includes('website') || userText.includes('landing')) {
      return {
        message:
          "Our web development pricing starts at:\n• **Landing Pages** — from $100\n• **Business Websites** — from $1,000\n• **E-commerce Stores** — from $5,000\n• **Custom Web Apps** — custom quote\n\nFinal quote will be shared after understanding your requirement.",
        leadCaptureRecommended: false,
      }
    }
    if (allText.includes('ai') || userText.includes('chatbot') || userText.includes('bot')) {
      return {
        message:
          "Our AI Automation plans start at:\n• **Starter** — $997 setup + $297/month (AI chatbot, lead capture, CRM integration)\n• **Professional** — $2,497 setup + $897/month (adds voice AI, WhatsApp AI, appointment booking)\n• **Enterprise** — Custom quote\n\nFinal quote will be shared after understanding your requirement.",
        leadCaptureRecommended: false,
      }
    }
    return {
      message:
        "BuzzleMax offers flexible starting prices — landing pages from $100, business websites from $1,000, and AI chatbot plans from $997 setup + $297/mo. Final quote will be shared after understanding your requirement.\n\nWhat specific project are you thinking about?",
      leadCaptureRecommended: false,
    }
  }

  // Timeline
  if (userText.includes('how long') || userText.includes('timeline') || userText.includes('when') || userText.includes('days') || userText.includes('finish')) {
    return {
      message:
        "Timelines vary based on project scope, features, integrations, and feedback cycles. Once we understand your requirements, we'll provide an estimated timeline — we never promise a fixed date before scoping the work.",
      leadCaptureRecommended: false,
    }
  }

  // Custom/complex requirement
  if (userText.includes('custom') || userText.includes('complex') || userText.includes('enterprise') || userText.includes('saas')) {
    return {
      message:
        "Custom projects are our specialty! Let's get the details to the BuzzleMax team so we can put together a tailored recommendation for you.",
      leadCaptureRecommended: true,
    }
  }

  // Services overview
  if (userText.includes('services') || userText.includes('offer') || userText.includes('what do you') || userText.includes('capabilities')) {
    return {
      message:
        "BuzzleMax provides three core modular solutions:\n\n• 🌐 **Web Development** — custom business websites, landing pages, e-commerce stores, and SaaS web apps\n• 🤖 **AI Solutions** — 24/7 AI chatbots, AI voice receptionists, and custom AI integrations\n• 💬 **Automation** — standalone WhatsApp automation, lead workflows, CRM sync, and email automation\n\nYou can choose any one of these independently. What are you looking to build or automate?",
      leadCaptureRecommended: false,
    }
  }

  // Website discovery
  if (userText.includes('website') || userText.includes('site') || userText.includes('landing')) {
    if (!allText.includes('new one') && !allText.includes('already have')) {
      return {
        message: "Great! Do you already have an existing website you'd like to redesign, or would this be a brand new one?",
        leadCaptureRecommended: false,
      }
    }
    return {
      message: "What key features or goals would you like this website to achieve? (e.g. lead capture, online booking, e-commerce, portfolio)",
      leadCaptureRecommended: false,
    }
  }

  // AI discovery
  if (userText.includes('ai') || userText.includes('chatbot') || userText.includes('assistant') || userText.includes('voice')) {
    return {
      message: "What would you like the AI to actually do for your business? For example:\n• Answer customer support questions 24/7\n• Qualify and capture leads\n• Book appointments automatically\n• Handle WhatsApp or Instagram messages",
      leadCaptureRecommended: false,
    }
  }

  // Automation discovery
  if (userText.includes('automate') || userText.includes('automation') || userText.includes('workflow')) {
    return {
      message: "What repetitive process would you like to automate? Common ones include:\n• Lead capture and follow-up\n• CRM updates\n• Email sequences\n• Customer support responses\n• Appointment confirmations",
      leadCaptureRecommended: false,
    }
  }

  // Default greeting
  return {
    message:
      "That sounds interesting! Could you tell me a bit more about what you'd like to build or automate? BuzzleMax specializes in web development, AI solutions, and business automation — all available as standalone or combined solutions.",
    leadCaptureRecommended: false,
  }
}
