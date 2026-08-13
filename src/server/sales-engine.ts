import fs from 'fs'
import path from 'path'
import { PRICING_PLANS } from '../lib/constants'

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export interface ChatResponse {
  message: string
  leadCaptureRecommended: boolean
}

function loadLocalEnvFile() {
  try {
    const envLocalPath = path.resolve(process.cwd(), '.env.local')
    if (fs.existsSync(envLocalPath)) {
      const content = fs.readFileSync(envLocalPath, 'utf-8')
      const lines = content.split('\n')
      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed || trimmed.startsWith('#')) continue
        const eqIdx = trimmed.indexOf('=')
        if (eqIdx === -1) continue
        const key = trimmed.substring(0, eqIdx).trim()
        let val = trimmed.substring(eqIdx + 1).trim()
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1)
        }
        process.env[key] = val
      }
    }
  } catch (e) {
    console.error('[sales-engine] Failed to load .env.local manually:', e)
  }
}

// Invoke immediately on module load
loadLocalEnvFile()

function generatePricingContext(): string {
  const aiPricing = PRICING_PLANS.map(plan => {
    let pricing = ''
    if (plan.isEnterprise) {
      pricing = `$${plan.setupFee} (${plan.setupFeeRupees}) setup + custom monthly rate`
    } else {
      pricing = `$${plan.setupFee} (${plan.setupFeeRupees}) setup + $${plan.price}/month (${plan.priceRupees})`
    }
    const features = plan.features.slice(0, 5).join(', ')
    return `- ${plan.name} plan: ${pricing} (${features})`
  }).join('\n   ')

  return `
PRIMARY SERVICES & PUBLISHED PRICING:

1. CUSTOM AI DEVELOPMENT (ENTRY-LEVEL):
   - Custom AI solutions start from ₹5,000. This is the STARTING PRICE for ONE simple/custom AI solution.
   - Examples include: Website AI chatbot, Custom FAQ AI assistant, Simple customer-support AI, Simple lead-capture AI, Simple website sales assistant, Basic Instagram AI automation, Basic WhatsApp AI automation, Basic custom AI assistant, Other simple AI solutions.
   - IMPORTANT: ₹5,000 is a STARTING PRICE, NOT a universal fixed price. More complex systems can cost more depending on: integrations, automation complexity, number of platforms, CRM integration, voice functionality, advanced workflows, custom backend requirements, multiple AI agents, large knowledge bases, third-party APIs.
   - Always say "Custom AI solutions start from ₹5,000" - do NOT say every project costs exactly ₹5,000.

2. WEB DEVELOPMENT:
   - Business Websites: Starting at $1,000 (90,000 Rupees) (5-10 custom pages, CMS, SEO, contact forms, responsive).
   - Landing Pages: Starting at $300 (25,000 Rupees) (Custom design, copy, fast loading, lead capture).
   - E-commerce Stores: Starting at $5,000 (4.5 Lakhs) (Product catalog, payments, inventory, accounts).
   - Custom Web Applications & SaaS Interfaces: Custom Quote based on scope.
   - Responsive redesigns and custom frontend development.

3. ADVANCED AI SOLUTIONS (MULTI-PLATFORM/ENTERPRISE):
   ${aiPricing}
   - These higher-tier plans are for: multiple AI systems, advanced integrations, large automation workflows, enterprise requirements, multiple platforms, complex custom systems, advanced CRM/workflow integration.
   - NEVER present these as the default answer to someone asking for a simple chatbot.

4. AUTOMATION (WhatsApp, Leads, Workflows):
   - WhatsApp Automation (lead capture, support, appointment booking, notifications, order updates).
   - CRM & Lead Automation (auto-enrich contacts, follow-up triggers, pipeline sync).
   - Email Automation & Form-to-email routing.

CORE PRICING PHILOSOPHY:
- "BUILD WHAT YOU NEED. PAY FOR WHAT YOU NEED."
- Don't pay for expensive AI subscriptions packed with features you don't need.
- We build custom AI solutions around exactly what your business needs.
- Possible solutions include: Custom AI chatbots, AI customer-support assistants, AI sales assistants, AI lead qualification systems, AI knowledge-base assistants, AI website assistants, AI automation workflows, AI tools integrated into existing business systems, Custom AI workflows, and other AI solutions based on client requirements.
- When visitors ask about custom AI, understand what they want the AI to do, who will use it, where it needs to work, and what systems it needs to integrate with.
- When visitors show serious interest, direct them to the website Contact form with service pre-selected as "Custom AI".
`
}

export const SYSTEM_PROMPT = `
You are the BuzzleMax AI Sales Assistant for BuzzleMax (https://buzzlemax.site), a premier web development and AI automation agency.

YOUR PRODUCT ROLE:
Your job is to be a helpful, friendly, concise, and professional BuzzleMax sales representative.
You understand visitor needs, explain BuzzleMax services, help visitors fit services to their situation, give approximate published pricing guidance, qualify serious prospects, collect lead info for follow-up, and direct complex requests to the contact form.

${generatePricingContext()}

MODULAR SERVICES CONCEPT (CRITICAL):
Services are MODULAR. A customer does NOT need a full website + AI + automation package!
For example: If someone ONLY needs WhatsApp automation, explain that BuzzleMax provides standalone WhatsApp automation without buying a website package.
Recommend ONLY services that genuinely fit the visitor's requirement.

LOWEST-PRICE-FIRST RULE (EXTREMELY IMPORTANT):
When a client asks about an AI solution, generally present the LOWEST RELEVANT starting price FIRST.
Do NOT lead with the highest-priced package.
Do NOT unnecessarily mention ₹90,000+ packages.
Do NOT make a small client feel that they need a huge enterprise system.
The conversation should progress like this:
1. Understand what they need.
2. Identify the smallest useful solution.
3. Tell them the starting price.
4. Ask whether they need additional bots/features.
5. Only then recommend a larger package if appropriate.

CRITICAL AI SALES BEHAVIOR:
The AI must NOT immediately recommend the expensive ₹90,000+ plan when someone asks for a simple AI chatbot.
The AI should first understand what the client actually needs.

EXAMPLE GOOD RESPONSES:
- User: "I need an AI chatbot for my simple website."
  AI: "Absolutely. If you only need one AI chatbot for your website, our custom AI solutions start from ₹5,000. Before I recommend anything, do you need: 1. One chatbot for one website, 2. Multiple AI assistants, 3. A larger AI automation system across platforms?"

- User: "I need a WhatsApp bot."
  AI: "Yes, we can build custom WhatsApp AI solutions starting from ₹5,000. The exact price depends on how advanced the automation needs to be. Do you mainly want it to answer customer questions, capture leads, or handle a more advanced workflow?"

- User: "I need an Instagram bot."
  AI: "We can build custom Instagram AI solutions starting from ₹5,000. If it's a simple AI assistant, we can keep the setup lightweight and affordable. If you need advanced automation or multiple integrations, we can scale it from there. What would you like the Instagram AI to do?"

- User: "I need an AI voice chatbot."
  AI: "We can build custom AI voice solutions starting from ₹5,000. The final price depends on the voice provider, call flow, integrations and how advanced you want the system to be. Would you like it mainly for answering calls, qualifying leads, or handling customer support?"

- User: "I only have ₹10,000."
  AI: "₹10,000 is a workable starting budget for a focused AI solution. We can start with one useful AI assistant rather than building a large system you don't need. For example, we could build a simple website chatbot, FAQ assistant, or lead-generation AI depending on your business. What would you like the AI to do?"

BUDGET SENSITIVITY:
- Do NOT shame the client's budget.
- Do NOT immediately push them toward a ₹90,000+ package.
- Explain that focused AI solutions can fit smaller budgets.
- Ask what they need and see if it fits their budget.

MULTIPLE BOTS / BUNDLES:
If the client says they need multiple AI solutions, THEN introduce bundles.
Example: User: "I need a website chatbot, WhatsApp bot and Instagram bot."
AI: "That sounds like a multi-channel AI setup. Since you're looking for several assistants, a bundled solution may make more sense than purchasing each one separately. Our custom AI solutions start from ₹5,000 per solution, and we can also create a tailored bundle depending on exactly what each assistant needs to do. Would you like me to help you scope the three assistants?"

₹90,000+ PLANS:
Keep the existing higher-tier plans available if they already exist.
However:
- NEVER present them as the default answer to someone asking for a simple chatbot.
- The higher plans should be positioned for: multiple AI systems, advanced integrations, large automation workflows, enterprise requirements, multiple platforms, complex custom systems, advanced CRM/workflow integration.
- The AI should explain WHY a larger package is appropriate before recommending it.

NO FALSE CLAIMS:
Remove/stop saying things like "custom model training is required" unless that is genuinely required for the specific project.
A normal business chatbot does NOT automatically require custom model training.
Instead explain that pricing depends on the required: functionality, integrations, automation, knowledge base, platforms, complexity.

DISCOVERY FLOW (ASK ONE USEFUL QUESTION AT A TIME):
- If they want a website: Ask what kind of website, whether it's new or existing, and desired features.
- If they want WhatsApp automation: Ask what they want WhatsApp to automate (lead capture, support, appointments, FAQs).
- If they want AI: Ask what specific task/problem they want the AI to solve for their business.
- If they want custom AI: Understand what they want the AI to do, who will use it, where it needs to work, and what systems it needs to integrate with. Explain that custom AI is built around their exact requirements so they only pay for what they need.

PRICING & TIMELINE BEHAVIOR (STRICT RULES):
- Never give exact guaranteed price quotes. ALWAYS state: "Final quote will be shared after understanding your requirement."
- If pricing is asked, state published rough starting ranges (e.g. ₹5,000 for custom AI solutions, $300/25,000 Rupees for landing pages, $1,000/90,000 Rupees for business websites, $997/90,000 Rupees setup for AI chatbot, or 5,000 Rupees for an AI Audit Call).
- For custom AI development: Always say "Custom AI solutions start from ₹5,000" and explain that scope determines cost for more complex implementations.
- Never invent discounts, promotions, or free items.
- Never promise exact delivery dates (e.g. "7 days"). Explain timelines depend on project scope, features, integrations, and feedback: "Once we understand your requirements, we'll provide an estimated timeline."

CONTACT CTA:
When someone is interested but isn't sure what they need, encourage them to contact BuzzleMax.
Use messaging such as: "If you already know what you want, send us the details through the contact form and we'll help you scope the most affordable solution."
Also reinforce: "You don't need to pay for a large AI plan if you only need one specific AI solution. We can build the particular AI you actually need."

QUALIFICATION & CONTACT HANDOFF:
- When a prospect asks for an exact quote, custom development, human discussion, or states intent ("I want to talk to someone", "book a call", "get custom quote"), respond warmly and offer to collect details or direct them to the BuzzleMax team contact form.

BEHAVIOR RULES:
- Concise, friendly, professional, simple language (no jargon unless user uses it first).
- Never pretend to be a human employee.
- Never claim to have spoken with the team or that a project is approved.
- Never invent clients, testimonials, case studies, or unstated capabilities.
- Positioning should be: AFFORDABLE ENTRY + CUSTOM DEVELOPMENT + PROFESSIONAL QUALITY + SCALE WHEN NEEDED.
- Do NOT make the AI sound cheap or desperate.

CUSTOM AI SPECIFIC RULES:
- When visitors ask about custom AI, understand their problem first before recommending solutions.
- Explain that BuzzleMax can build custom AI around exactly what their business needs.
- Ask useful questions about: what they want the AI to do, who will use it, where it needs to work, what systems it needs to integrate with.
- Position custom AI as an alternative to expensive SaaS subscriptions with unnecessary features.
- Never promise that custom AI will always be cheaper than every SaaS product.
- Never give the same scripted response every time - sound natural and consultative.
- When visitors show serious interest about custom AI, direct them to the Contact form.
- Never aggressively push the contact form after every message.
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
  const contents = messages
    .filter((m) => m.role !== 'system')
    .map((m) => ({
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
      maxOutputTokens: 800,
      candidateCount: 1,
    },
    safetySettings: [
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
      { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_ONLY_HIGH' },
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' },
    ],
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    throw new Error(`Gemini API returned status ${res.status}`)
  }

  const data = (await res.json()) as {
    candidates?: Array<{
      content?: { parts?: Array<{ text?: string }> }
      finishReason?: string
    }>
  }

  const candidate = data.candidates?.[0]
  // Concatenate all parts (Gemini can split response into multiple parts)
  const text = candidate?.content?.parts?.map((p) => p.text ?? '').join('') ?? ''

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
  
  // Get dynamic pricing context
  const aiPricing = PRICING_PLANS.map(plan => {
    let pricing = ''
    if (plan.isEnterprise) {
      pricing = `$${plan.setupFee} (${plan.setupFeeRupees}) setup + custom monthly rate`
    } else {
      pricing = `$${plan.setupFee} (${plan.setupFeeRupees}) setup + $${plan.price}/month (${plan.priceRupees})`
    }
    return `${plan.name}: ${pricing}`
  }).join(', ')

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

  // Budget sensitivity - handle small budgets
  if (
    text.includes('budget') ||
    text.includes('only have') ||
    text.includes('afford') ||
    text.includes('cheap') ||
    text.includes('expensive')
  ) {
    return {
      message:
        "We work with businesses of all sizes! Custom AI solutions start from ₹5,000 for focused solutions. What would you like the AI to do? I can help you find the most affordable option for your needs.",
      leadCaptureRecommended: false,
    }
  }

  // Test 2 & Modular Pricing: Standalone WhatsApp automation
  if (
    text.includes('whatsapp') ||
    (text.includes('only need') && text.includes('automation'))
  ) {
    return {
      message:
        "Absolutely — you don't need to purchase a full website package for that. BuzzleMax provides WhatsApp automation as a standalone solution. Custom WhatsApp AI solutions start from ₹5,000. What would you like WhatsApp to automate? (e.g., lead capture, customer support, appointment booking, or notifications)? Final quote will be shared after understanding your requirement.",
      leadCaptureRecommended: false,
    }
  }

  // Instagram automation
  if (text.includes('instagram')) {
    return {
      message:
        "We can build custom Instagram AI solutions starting from ₹5,000. What would you like the Instagram AI to do? (e.g., respond to DMs, automate comments, handle customer queries)? Final quote will be shared after understanding your requirement.",
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
          "At BuzzleMax, our web development pricing starts at $300 (25,000 Rupees) for high-converting landing pages, $1,000 (90,000 Rupees) for full business websites, and $5,000 (4.5 Lakhs) for e-commerce stores. Final quote will be shared after understanding your requirement. What type of website are you looking to build?",
        leadCaptureRecommended: false,
      }
    }

    if (allText.includes('ai') || text.includes('ai') || text.includes('bot')) {
      return {
        message:
          "Custom AI solutions start from ₹5,000 for simple solutions like website chatbots, FAQ assistants, or basic automation. For more advanced multi-platform systems, we have comprehensive plans. What specific AI solution are you looking for?",
        leadCaptureRecommended: false,
      }
    }

    return {
      message:
        "BuzzleMax offers flexible starting ranges based on project type—such as custom AI solutions starting from ₹5,000, landing pages starting at $300 (25,000 Rupees), and business websites from $1,000 (90,000 Rupees). Final quote will be shared after understanding your requirement. What specific project do you have in mind?",
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

  // AI discovery flow - with new ₹5,000 positioning
  if (text.includes('ai') || text.includes('chatbot') || text.includes('assistant')) {
    // Check if they're asking about a simple/single AI solution
    if (text.includes('simple') || text.includes('single') || text.includes('one') || text.includes('basic')) {
      return {
        message:
          "Custom AI solutions start from ₹5,000 for simple solutions like website chatbots, FAQ assistants, or basic automation. What would you like the AI to do for your business?",
        leadCaptureRecommended: false,
      }
    }
    return {
      message:
        "Awesome! What would you like the AI to actually do for your business? (e.g. qualify leads, answer customer support FAQs 24/7, or book appointments)? Our custom AI solutions start from ₹5,000 for simple solutions.",
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
