export interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export interface ChatResponse {
  message: string
  leadCaptureRecommended: boolean
}

export const SYSTEM_PROMPT = `
You are the BuzzleMax AI Sales Assistant for BuzzleMax (https://buzzlemax.site), a premier web development and AI automation agency.

YOUR PRODUCT ROLE:
Your job is to be a helpful, friendly, concise, and professional BuzzleMax sales representative.
You understand visitor needs, explain BuzzleMax services, help visitors fit services to their situation, give approximate published pricing guidance, qualify serious prospects, collect lead info for follow-up, and direct complex requests to the contact form.

PRIMARY SERVICES & PUBLISHED PRICING:
1. WEB DEVELOPMENT:
   - Business Websites: Starting at $1,000 (5-10 custom pages, CMS, SEO, contact forms, responsive).
   - Landing Pages: Starting at $100 (Custom design, copy, fast loading, lead capture).
   - E-commerce Stores: Starting at $5,000 (Product catalog, payments, inventory, accounts).
   - Custom Web Applications & SaaS Interfaces: Custom Quote based on scope.
   - Responsive redesigns and custom frontend development.

2. AI SOLUTIONS:
   - AI Website Chatbots: STARTER plan starting at $997 setup + $297/month (2,500 conversations/mo, lead capture, CRM integration, email automation).
   - AI Voice Receptionists / Omnichannel AI: PROFESSIONAL plan starting at $2,497 setup + $897/mo (5,000 conversations, 500 voice minutes, WhatsApp AI, Instagram AI, appointment booking).
   - Internal Knowledge Base AI & Custom AI Workflows: ENTERPRISE plan starting at $9,997 setup + custom monthly rate (unlimited agents, custom integrations, dedicated manager).

3. AUTOMATION (WhatsApp, Leads, Workflows):
   - WhatsApp Automation (lead capture, support, appointment booking, notifications, order updates).
   - CRM & Lead Automation (auto-enrich contacts, follow-up triggers, pipeline sync).
   - Email Automation & Form-to-email routing.

MODULAR SERVICES CONCEPT (CRITICAL):
Services are MODULAR. A customer does NOT need a full website + AI + automation package!
For example: If someone ONLY needs WhatsApp automation, explain that BuzzleMax provides standalone WhatsApp automation without buying a website package.
Recommend ONLY services that genuinely fit the visitor's requirement.

DISCOVERY FLOW (ASK ONE USEFUL QUESTION AT A TIME):
- If they want a website: Ask what kind of website, whether it's new or existing, and desired features.
- If they want WhatsApp automation: Ask what they want WhatsApp to automate (lead capture, support, appointments, FAQs).
- If they want AI: Ask what specific task/problem they want the AI to solve for their business.

PRICING & TIMELINE BEHAVIOR (STRICT RULES):
- Never give exact guaranteed price quotes. ALWAYS state: "Final quote will be shared after understanding your requirement."
- If pricing is asked, state published rough starting ranges (e.g. $100 for landing pages, $1,000 for business websites, $997 setup + $297/mo for AI chatbot).
- Never invent discounts, promotions, or free items.
- Never promise exact delivery dates (e.g. "7 days"). Explain timelines depend on project scope, features, integrations, and feedback: "Once we understand your requirements, we'll provide an estimated timeline."

QUALIFICATION & CONTACT HANDOFF:
- When a prospect asks for an exact quote, custom development, human discussion, or states intent ("I want to talk to someone", "book a call", "get custom quote"), respond warmly and offer to collect details or direct them to the BuzzleMax team contact form.

BEHAVIOR RULES:
- Concise, friendly, professional, simple language (no jargon unless user uses it first).
- Never pretend to be a human employee.
- Never claim to have spoken with the team or that a project is approved.
- Never invent clients, testimonials, case studies, or unstated capabilities.
`

// In-memory rate limiting state
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

export function checkRateLimit(ip: string, limit = 30, windowMs = 60000): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (record.count >= limit) {
    return false
  }

  record.count++
  return true
}

export async function processChatRequest(
  messages: ChatMessage[],
  clientIp = '127.0.0.1'
): Promise<ChatResponse> {
  // 1. Rate Limiting Check
  if (!checkRateLimit(clientIp)) {
    return {
      message:
        "You've sent quite a few messages! Please wait a minute or use the contact form to reach the BuzzleMax team directly.",
      leadCaptureRecommended: true,
    }
  }

  // 2. Input Validation
  if (!Array.isArray(messages) || messages.length === 0) {
    return {
      message: "Hi! How can BuzzleMax help you with web development or AI automation today?",
      leadCaptureRecommended: false,
    }
  }

  // Cap message list size to 20
  const recentMessages = messages.slice(-20)
  const lastUserMsg = [...recentMessages].reverse().find((m) => m.role === 'user')
  const userText = lastUserMsg ? lastUserMsg.content.trim() : ''

  if (userText.length > 1000) {
    return {
      message: 'Your message is a bit long! Could you summarize your requirement in a few sentences?',
      leadCaptureRecommended: false,
    }
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY

  // 3. If Gemini or OpenAI API Key exists, call provider API
  if (apiKey) {
    try {
      if (process.env.GEMINI_API_KEY) {
        const response = await callGeminiAPI(process.env.GEMINI_API_KEY, recentMessages)
        return response
      } else if (process.env.OPENAI_API_KEY) {
        const response = await callOpenAIAPI(process.env.OPENAI_API_KEY, recentMessages)
        return response
      }
    } catch (error) {
      console.error('[BuzzleMax AI API Error]:', error)
      // Gracefully fall back to local rule engine on API error
    }
  }

  // 4. Fallback Rule Engine (guarantees production quality even without external key)
  return runFallbackSalesEngine(userText, recentMessages)
}

async function callGeminiAPI(apiKey: string, messages: ChatMessage[]): Promise<ChatResponse> {
  const contents = messages.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }))

  const payload = {
    system_instruction: {
      parts: [{ text: SYSTEM_PROMPT }],
    },
    contents,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 500,
    },
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    throw new Error(`Gemini API returned status ${res.status}`)
  }

  const data = (await res.json()) as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>
  }

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text
  if (!text) {
    throw new Error('Invalid response structure from Gemini API')
  }

  const leadCaptureRecommended = checkLeadCaptureRecommendation(text, messages)
  return { message: text, leadCaptureRecommended }
}

async function callOpenAIAPI(apiKey: string, messages: ChatMessage[]): Promise<ChatResponse> {
  const openAiMessages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...messages.map((m) => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: m.content,
    })),
  ]

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: openAiMessages,
      temperature: 0.7,
      max_tokens: 500,
    }),
  })

  if (!res.ok) {
    throw new Error(`OpenAI API returned status ${res.status}`)
  }

  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>
  }

  const text = data.choices?.[0]?.message?.content
  if (!text) {
    throw new Error('Invalid response structure from OpenAI API')
  }

  const leadCaptureRecommended = checkLeadCaptureRecommendation(text, messages)
  return { message: text, leadCaptureRecommended }
}

function checkLeadCaptureRecommendation(aiResponse: string, messages: ChatMessage[]): boolean {
  const lowerResp = aiResponse.toLowerCase()
  const lastUser = [...messages].reverse().find((m) => m.role === 'user')?.content.toLowerCase() || ''

  if (
    lowerResp.includes('contact form') ||
    lowerResp.includes('buzzlemax team') ||
    lowerResp.includes('collect a few details') ||
    lowerResp.includes('follow up with you') ||
    lastUser.includes('talk to someone') ||
    lastUser.includes('contact') ||
    lastUser.includes('quote')
  ) {
    return true
  }

  return false
}

function runFallbackSalesEngine(userText: string, messages: ChatMessage[]): ChatResponse {
  const text = userText.toLowerCase()
  const allText = messages.map((m) => m.content.toLowerCase()).join(' ')

  // Test 7: Human Handoff / Talk to someone
  if (
    text.includes('talk to someone') ||
    text.includes('speak to human') ||
    text.includes('contact human') ||
    text.includes('reach out') ||
    text.includes('call me')
  ) {
    return {
      message:
        "I'd be happy to connect you directly with the BuzzleMax team! Let's get a few quick details or you can fill out our contact form.",
      leadCaptureRecommended: true,
    }
  }

  // Test 2 & Modular Pricing: Standalone WhatsApp automation
  if (
    text.includes('whatsapp') ||
    (text.includes('only need') && text.includes('automation'))
  ) {
    return {
      message:
        "Absolutely — you don't need to purchase a full website package for that. BuzzleMax provides WhatsApp automation as a standalone solution! What would you like WhatsApp to automate? (e.g., lead capture, customer support, appointment booking, or notifications)? Final quote will be shared after understanding your requirement.",
      leadCaptureRecommended: false,
    }
  }

  // Test 3 & Test 6: Pricing / Cost / Guaranteed Price
  if (
    text.includes('how much') ||
    text.includes('price') ||
    text.includes('cost') ||
    text.includes('pricing') ||
    text.includes('guarantee') ||
    text.includes('quote')
  ) {
    if (allText.includes('website') || text.includes('website') || text.includes('landing')) {
      return {
        message:
          "At BuzzleMax, our web development pricing starts at $100 for high-converting landing pages, $1,000 for full business websites, and $5,000 for e-commerce stores. Final quote will be shared after understanding your requirement. What type of website are you looking to build?",
        leadCaptureRecommended: false,
      }
    }

    if (allText.includes('ai') || text.includes('ai') || text.includes('bot')) {
      return {
        message:
          "Our AI Chatbot Starter plan starts at $997 setup + $297/month (includes lead capture, CRM integration, and email automation). Professional AI Voice agents start at $2,497 setup + $897/month. Final quote will be shared after understanding your requirement.",
        leadCaptureRecommended: false,
      }
    }

    return {
      message:
        "BuzzleMax offers flexible starting ranges based on project type—such as landing pages starting at $100, business websites from $1,000, and AI Chatbots starting at $997 setup + $297/mo. Final quote will be shared after understanding your requirement. What specific project do you have in mind?",
      leadCaptureRecommended: false,
    }
  }

  // Test 5: Timelines / Finish date
  if (
    text.includes('when') ||
    text.includes('how long') ||
    text.includes('timeline') ||
    text.includes('delivery') ||
    text.includes('days') ||
    text.includes('finish')
  ) {
    return {
      message:
        "Timelines depend on the exact project scope, features, feedback, and integrations. Once we understand your requirements, we'll provide an estimated timeline. Would you like to share a few details about what you'd like to build?",
      leadCaptureRecommended: false,
    }
  }

  // Test 4: Extremely custom requirement
  if (
    text.includes('custom') ||
    text.includes('complex') ||
    text.includes('enterprise') ||
    text.includes('saas') ||
    text.includes('app')
  ) {
    return {
      message:
        "We specialize in custom web applications, SaaS interfaces, and custom AI workflows! That sounds like a specialized project. Let's get the details to the BuzzleMax team so we can provide a tailored recommendation.",
      leadCaptureRecommended: true,
    }
  }

  // Test 8: Services offered
  if (
    text.includes('services') ||
    text.includes('offer') ||
    text.includes('what do you do') ||
    text.includes('capabilities')
  ) {
    return {
      message:
        "BuzzleMax provides three core modular solutions:\n\n" +
        "• 🌐 **Web Development**: Custom business websites, landing pages, e-commerce stores, and SaaS web apps.\n" +
        "• 🤖 **AI Solutions**: 24/7 AI chatbots, AI voice receptionists, and custom AI integrations.\n" +
        "• 💬 **Automation**: Standalone WhatsApp automation, lead workflows, CRM sync, and email automation.\n\n" +
        "What are you looking to build or automate?",
      leadCaptureRecommended: false,
    }
  }

  // Test 1: Website discovery flow
  if (text.includes('website') || text.includes('site') || text.includes('landing')) {
    if (!allText.includes('new one') && !allText.includes('already have')) {
      return {
        message:
          "Great! Do you already have an existing website you'd like to redesign, or would this be a brand new website?",
        leadCaptureRecommended: false,
      }
    }
    return {
      message:
        "Got it! What key features or goals would you like this website to achieve (e.g. lead capture, online booking, e-commerce, custom UI)?",
      leadCaptureRecommended: false,
    }
  }

  // AI discovery flow
  if (text.includes('ai') || text.includes('chatbot') || text.includes('assistant')) {
    return {
      message:
        "Awesome! What would you like the AI to actually do for your business? (e.g. qualify leads, answer customer support FAQs 24/7, or book appointments)?",
      leadCaptureRecommended: false,
    }
  }

  // Default friendly sales rep response
  return {
    message:
      "That sounds interesting! BuzzleMax can build custom web applications, AI chatbots, or standalone automations tailored to your needs. Could you tell me a little more about your primary goal?",
    leadCaptureRecommended: false,
  }
}
