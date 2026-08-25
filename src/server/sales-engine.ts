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

1. CUSTOM AI SOLUTION
   - Starting from ₹5,000.
   - This is for a single focused/custom AI solution such as: Website AI chatbot, FAQ & support AI, Lead-generation AI, Website sales assistant, WhatsApp AI, Instagram AI, Simple custom AI assistant.
   - IMPORTANT: ₹5,000 is a STARTING PRICE for ONE focused AI solution. More complex systems cost more.

2. AI WORKFLOW
   - Custom quote.
   - For connecting AI to existing business tools/workflows, including: WhatsApp + AI, Instagram + AI, Lead automation, CRM integration, Appointment workflows, Customer workflows, Custom business automation.

3. CUSTOM AI SYSTEM
   - Custom quote.
   - For complex requirements including: Multiple AI assistants, AI voice solutions, Knowledge-base AI, Advanced API integrations, Multi-platform systems, Custom AI development, Advanced automation.

4. STARTER AI CHATBOT
   - One-time setup: $997 / ₹90,000
   - Monthly: $297/mo / ₹25,000/mo
   - Up to 2,500 AI conversations/month.
   - Includes: AI Website Chatbot, Lead Capture System, CRM Integration, Email Automation, Monthly AI Optimization, 1 Platform Integration, Performance Dashboard, Email Support.

5. PROFESSIONAL
   - One-time setup: $2,497
   - Monthly: $897/mo
   - Up to 5,000 AI conversations
   - Up to 500 voice minutes
   - Includes everything in Starter plus: AI Voice Receptionist, WhatsApp AI, Instagram AI, CRM Automation, Appointment Booking, Workflow Automation, Multi-channel AI Support, Advanced Analytics, Priority Support.

6. ENTERPRISE
   - Custom pricing.
   - Includes: Unlimited AI Agents, Internal Knowledge Base AI, Custom AI Workflows, API Integrations, White Label Solutions, Custom Development, Dedicated Account Manager, Priority Support.

7. CUSTOM AI AUDIT CALL
   - Starting at ₹5,000 (~$60).
   - This is an audit/strategy service and is NOT the same thing as purchasing a complete enterprise AI system.

CORE PRICING PHILOSOPHY:
- "BUILD WHAT YOU NEED. PAY FOR WHAT YOU NEED."
- Don't pay for expensive AI subscriptions packed with features you don't need.
- We build custom AI solutions around exactly what your business needs.
- When visitors ask about custom AI, understand what they want the AI to do, who will use it, where it needs to work, and what systems it needs to integrate with.
- When visitors show serious interest, direct them to the website Contact form with service pre-selected as "Custom AI".

AI SALES BEHAVIOR RULES:
- The AI must NOT immediately show the ₹90,000 Starter plan whenever someone simply says "I need an AI chatbot."
- Instead, it should first understand what the visitor actually needs.
- If the visitor has a small budget, the AI should NOT tell them that the minimum is ₹90,000.
- The AI should prioritize the LOWEST RELEVANT price that actually matches the customer's requirements.
- The AI must NEVER falsely claim that every AI project costs ₹90,000.
- It should distinguish between: ₹5,000 starting custom AI solution (one focused AI solution), Custom AI Workflow (custom quote), Custom AI System (custom quote), $997 / ₹90,000 Starter AI Chatbot (more complete business chatbot package with integrations and ongoing optimization), $2,497 + $897/mo Professional (advanced multi-platform AI package), Enterprise (custom pricing), ₹5,000 Custom AI Audit Call (strategy/audit service, not the full implementation).
- If the customer only needs one simple AI, recommend the ₹5,000 starting custom solution when appropriate.
- If the customer clearly needs the features included in Starter, Professional, or Enterprise, explain those plans instead.
- Do not pressure visitors into expensive plans.
- Do not invent prices, features, discounts, or guarantees.
- Use INR pricing naturally when the visitor appears to be in India or mentions rupees.
- Use USD pricing when the visitor asks in USD.
- If requirements are unclear, ask a short clarification question instead of immediately recommending the most expensive plan.
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
- User: "I need an AI chatbot."
  AI: "Absolutely. I can help with that. Is this for a website, WhatsApp, Instagram, voice, or another platform? And do you need one focused AI solution or multiple AI systems?"

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
- If pricing is asked, state published rough starting ranges (e.g. ₹5,000 for custom AI solutions, $300/25,000 Rupees for landing pages, $1,000/90,000 Rupees for business websites, $997/₹90,000 setup + $297/₹25,000 monthly for Starter AI Chatbot, $2,497 setup + $897 monthly for Professional, or ₹5,000 for an AI Audit Call).
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
    }
  }

  // 4. Honest error response if providers fail or key is missing
  return {
    message: "Sorry, the AI is temporarily unavailable. Please try again in a moment.",
    leadCaptureRecommended: true,
  }
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

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`

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
