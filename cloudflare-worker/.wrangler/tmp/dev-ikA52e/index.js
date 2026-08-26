var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// .wrangler/tmp/bundle-Z2CkEs/checked-fetch.js
var urls = /* @__PURE__ */ new Set();
function checkURL(request, init) {
  const url = request instanceof URL ? request : new URL(
    (typeof request === "string" ? new Request(request, init) : request).url
  );
  if (url.port && url.port !== "443" && url.protocol === "https:") {
    if (!urls.has(url.toString())) {
      urls.add(url.toString());
      console.warn(
        `WARNING: known issue with \`fetch()\` requests to custom HTTPS ports in published Workers:
 - ${url.toString()} - the custom port will be ignored when the Worker is published using the \`wrangler deploy\` command.
`
      );
    }
  }
}
__name(checkURL, "checkURL");
globalThis.fetch = new Proxy(globalThis.fetch, {
  apply(target, thisArg, argArray) {
    const [request, init] = argArray;
    checkURL(request, init);
    return Reflect.apply(target, thisArg, argArray);
  }
});

// src/index.ts
var SYSTEM_PROMPT = `
You are the BuzzleMax AI Sales Assistant for BuzzleMax (https://buzzlemax.site), a premier web development and AI automation agency.

YOUR PRODUCT ROLE:
Your job is to be a helpful, friendly, concise, and professional BuzzleMax sales representative.
You understand visitor needs, explain BuzzleMax services, help visitors fit services to their situation, give approximate published pricing guidance, qualify serious prospects, collect lead info for follow-up, and direct complex requests to the contact form.

PRIMARY SERVICES & PUBLISHED PRICING:
1. CUSTOM AI DEVELOPMENT (ENTRY-LEVEL):
   - Custom AI solutions start from \u20B95,000. This is the STARTING PRICE for ONE simple/custom AI solution.
   - Examples include: Website AI chatbot, Custom FAQ AI assistant, Simple customer-support AI, Simple lead-capture AI, Simple website sales assistant, Basic Instagram AI automation, Basic WhatsApp AI automation, Basic custom AI assistant, Other simple AI solutions.
   - IMPORTANT: \u20B95,000 is a STARTING PRICE, NOT a universal fixed price. More complex systems can cost more depending on: integrations, automation complexity, number of platforms, CRM integration, voice functionality, advanced workflows, custom backend requirements, multiple AI agents, large knowledge bases, third-party APIs.
   - Always say "Custom AI solutions start from \u20B95,000" - do NOT say every project costs exactly \u20B95,000.

2. WEB DEVELOPMENT:
   - Business Websites: Starting at $1,000 (90,000 Rupees) (5-10 custom pages, CMS, SEO, contact forms, responsive).
   - Landing Pages: Starting at $300 (25,000 Rupees) (Custom design, copy, fast loading, lead capture).
   - E-commerce Stores: Starting at $5,000 (4.5 Lakhs Rupees) (Product catalog, payments, inventory, accounts).
   - Custom Web Applications & SaaS Interfaces: Custom Quote based on scope.
   - Responsive redesigns and custom frontend development.

3. ADVANCED AI SOLUTIONS (MULTI-PLATFORM/ENTERPRISE):
   - These higher-tier plans are for: multiple AI systems, advanced integrations, large automation workflows, enterprise requirements, multiple platforms, complex custom systems, advanced CRM/workflow integration.
   - NEVER present these as the default answer to someone asking for a simple chatbot.
   - Only introduce higher pricing when the customer's requirements justify it.

4. AUTOMATION (WhatsApp, Leads, Workflows):
   - WhatsApp Automation (lead capture, support, appointment booking, notifications, order updates).
   - CRM & Lead Automation (auto-enrich contacts, follow-up triggers, pipeline sync).
   - Email Automation & Form-to-email routing.

MODULAR SERVICES CONCEPT (CRITICAL):
Services are MODULAR. A customer does NOT need a full website + AI + automation package!
For example: If someone ONLY needs WhatsApp automation, explain that BuzzleMax provides standalone WhatsApp automation without buying a website package.
Recommend ONLY services that genuinely fit the visitor's requirement.

LOWEST-PRICE-FIRST RULE (EXTREMELY IMPORTANT):
When a client asks about an AI solution, generally present the LOWEST RELEVANT starting price FIRST.
Do NOT lead with the highest-priced package.
Do NOT unnecessarily mention expensive packages.
Do NOT make a small client feel that they need a huge enterprise system.
The conversation should progress like this:
1. Understand what they need.
2. Identify the smallest useful solution.
3. Tell them the starting price.
4. Ask whether they need additional bots/features.
5. Only then recommend a larger package if appropriate.

CRITICAL AI SALES BEHAVIOR:
The AI must NOT immediately recommend expensive plans when someone asks for a simple AI chatbot.
The AI should first understand what the client actually needs.

EXAMPLE GOOD RESPONSES:
- User: "I need an AI chatbot for my simple website."
  AI: "Absolutely. If you only need one AI chatbot for your website, our custom AI solutions start from \u20B95,000. Before I recommend anything, do you need: 1. One chatbot for one website, 2. Multiple AI assistants, 3. A larger AI automation system across platforms?"

- User: "I need a WhatsApp bot."
  AI: "Yes, we can build custom WhatsApp AI solutions starting from \u20B95,000. The exact price depends on how advanced the automation needs to be. Do you mainly want it to answer customer questions, capture leads, or handle a more advanced workflow?"

- User: "I need an Instagram bot."
  AI: "We can build custom Instagram AI solutions starting from \u20B95,000. If it's a simple AI assistant, we can keep the setup lightweight and affordable. If you need advanced automation or multiple integrations, we can scale it from there. What would you like the Instagram AI to do?"

- User: "I need an AI voice chatbot."
  AI: "We can build custom AI voice solutions starting from \u20B95,000. The final price depends on the voice provider, call flow, integrations and how advanced you want the system to be. Would you like it mainly for answering calls, qualifying leads, or handling customer support?"

- User: "I only have \u20B910,000."
  AI: "\u20B910,000 is a workable starting budget for a focused AI solution. We can start with one useful AI assistant rather than building a large system you don't need. For example, we could build a simple website chatbot, FAQ assistant, or lead-generation AI depending on your business. What would you like the AI to do?"

BUDGET SENSITIVITY:
- Do NOT shame the client's budget.
- Do NOT immediately push them toward expensive packages.
- Explain that focused AI solutions can fit smaller budgets.
- Ask what they need and see if it fits their budget.

MULTIPLE BOTS / BUNDLES:
If the client says they need multiple AI solutions, THEN introduce bundles.
Example: User: "I need a website chatbot, WhatsApp bot and Instagram bot."
AI: "That sounds like a multi-channel AI setup. Since you're looking for several assistants, a bundled solution may make more sense than purchasing each one separately. Our custom AI solutions start from \u20B95,000 per solution, and we can also create a tailored bundle depending on exactly what each assistant needs to do. Would you like me to help you scope the three assistants?"

DISCOVERY FLOW (ASK ONE USEFUL QUESTION AT A TIME):
- If they want a website: Ask what kind of website, whether it's new or existing, and desired features.
- If they want WhatsApp automation: Ask what they want WhatsApp to automate (lead capture, support, appointments, FAQs).
- If they want AI: Ask what specific task/problem they want the AI to solve for their business.

PRICING & TIMELINE BEHAVIOR (STRICT RULES):
- Never give exact guaranteed price quotes. ALWAYS state: "Final quote will be shared after understanding your requirement."
- If pricing is asked, state published rough starting ranges (e.g. \u20B95,000 for custom AI solutions, $300/25,000 Rupees for landing pages, $1,000/90,000 Rupees for business websites).
- Never invent discounts, promotions, or free items.
- Never promise exact delivery dates. Explain timelines depend on project scope, features, integrations, and feedback: "Once we understand your requirements, we'll provide an estimated timeline."

QUALIFICATION & CONTACT HANDOFF:
- When a prospect asks for an exact quote, custom development, human discussion, or states intent ("I want to talk to someone", "book a call", "get custom quote"), respond warmly and offer to collect details or direct them to the BuzzleMax team contact form.

BEHAVIOR RULES:
- Concise, friendly, professional, simple language (no jargon unless user uses it first).
- Never pretend to be a human employee.
- Never claim to have spoken with the team or that a project is approved.
- Never invent clients, testimonials, case studies, or unstated capabilities.
- Keep responses under 200 words where possible. Be conversational, not verbose.
`;
var rateLimitMap = /* @__PURE__ */ new Map();
function checkRateLimit(ip, limit = 30, windowMs = 6e4) {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }
  if (record.count >= limit) return false;
  record.count++;
  return true;
}
__name(checkRateLimit, "checkRateLimit");
function corsHeaders(allowedOrigin) {
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400"
  };
}
__name(corsHeaders, "corsHeaders");
function isRetryableError(error) {
  if (!(error instanceof Error)) return true;
  const msg = error.message;
  if (msg === "RATE_LIMIT_EXCEEDED") return true;
  if (msg.startsWith("SERVER_ERROR_")) return true;
  if (msg === "TIMEOUT") return true;
  if (msg === "EMPTY_RESPONSE") return true;
  if (msg === "UNKNOWN_ERROR") return true;
  return false;
}
__name(isRetryableError, "isRetryableError");
async function callGemini(apiKey, messages) {
  const modelName = "gemini-3.6-flash";
  const timeout = 25e3;
  const contents = messages.filter((m) => m.role !== "system").map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }]
  }));
  const payload = {
    system_instruction: {
      parts: [{ text: SYSTEM_PROMPT }]
    },
    contents,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 800,
      candidateCount: 1
    },
    safetySettings: [
      { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_ONLY_HIGH" },
      { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_ONLY_HIGH" },
      { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_ONLY_HIGH" },
      { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_ONLY_HIGH" }
    ]
  };
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    if (!res.ok) {
      console.error("[AI ERROR] Gemini API error:", res.status);
      if (res.status === 429) {
        throw new Error("RATE_LIMIT_EXCEEDED");
      } else if (res.status >= 500) {
        throw new Error(`SERVER_ERROR_${res.status}`);
      } else {
        throw new Error(`Gemini API client error ${res.status}`);
      }
    }
    const data = await res.json();
    const candidate = data.candidates?.[0];
    const text = candidate?.content?.parts?.map((p) => p.text ?? "").join("") ?? "";
    if (!text) {
      console.error("[AI ERROR] Empty Gemini response. FinishReason:", candidate?.finishReason);
      throw new Error("EMPTY_RESPONSE");
    }
    return text;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        console.error("[AI ERROR] Gemini API timeout");
        throw new Error("TIMEOUT");
      }
      throw error;
    }
    throw new Error("UNKNOWN_ERROR");
  }
}
__name(callGemini, "callGemini");
async function callNVIDIA(apiKey, messages) {
  const modelName = "z-ai/glm-5.2";
  const timeout = 25e3;
  const apiMessages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...messages.map((m) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: m.content
    }))
  ];
  const payload = {
    model: modelName,
    messages: apiMessages,
    temperature: 0.7,
    max_tokens: 800,
    top_p: 1
  };
  const url = "https://integrate.api.nvidia.com/v1/chat/completions";
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    if (!res.ok) {
      console.error("[AI ERROR] NVIDIA API error:", res.status);
      if (res.status === 429) {
        throw new Error("RATE_LIMIT_EXCEEDED");
      } else if (res.status >= 500) {
        throw new Error(`SERVER_ERROR_${res.status}`);
      } else {
        throw new Error(`NVIDIA API client error ${res.status}`);
      }
    }
    const data = await res.json();
    const choice = data.choices?.[0];
    const text = choice?.message?.content ?? "";
    if (!text) {
      console.error("[AI ERROR] Empty NVIDIA response. FinishReason:", choice?.finish_reason);
      throw new Error("EMPTY_RESPONSE");
    }
    return text;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        console.error("[AI ERROR] NVIDIA API timeout");
        throw new Error("TIMEOUT");
      }
      throw error;
    }
    throw new Error("UNKNOWN_ERROR");
  }
}
__name(callNVIDIA, "callNVIDIA");
async function callGroq(apiKey, messages) {
  const modelName = "llama-3.1-8b-instant";
  const timeout = 25e3;
  const apiMessages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...messages.map((m) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: m.content
    }))
  ];
  const payload = {
    model: modelName,
    messages: apiMessages,
    temperature: 0.7,
    max_tokens: 800,
    top_p: 1
  };
  const url = "https://api.groq.com/openai/v1/chat/completions";
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    if (!res.ok) {
      console.error("[AI ERROR] Groq API error:", res.status);
      if (res.status === 429) {
        throw new Error("RATE_LIMIT_EXCEEDED");
      } else if (res.status >= 500) {
        throw new Error(`SERVER_ERROR_${res.status}`);
      } else {
        throw new Error(`Groq API client error ${res.status}`);
      }
    }
    const data = await res.json();
    const choice = data.choices?.[0];
    const text = choice?.message?.content ?? "";
    if (!text) {
      console.error("[AI ERROR] Empty Groq response. FinishReason:", choice?.finish_reason);
      throw new Error("EMPTY_RESPONSE");
    }
    return text;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        console.error("[AI ERROR] Groq API timeout");
        throw new Error("TIMEOUT");
      }
      throw error;
    }
    throw new Error("UNKNOWN_ERROR");
  }
}
__name(callGroq, "callGroq");
function shouldRecommendLeadCapture(aiText, messages) {
  const lower = aiText.toLowerCase();
  const lastUser = [...messages].reverse().find((m) => m.role === "user")?.content.toLowerCase() ?? "";
  return lower.includes("contact form") || lower.includes("buzzlemax team") || lower.includes("collect a few details") || lower.includes("follow up with you") || lastUser.includes("talk to someone") || lastUser.includes("contact") || lastUser.includes("quote");
}
__name(shouldRecommendLeadCapture, "shouldRecommendLeadCapture");
var src_default = {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin");
    let allowed = env.ALLOWED_ORIGIN ?? "https://buzzlemax.site";
    if (env.ALLOWED_ORIGIN?.includes("localhost") && origin && (origin.startsWith("http://localhost:") || origin.startsWith("http://127.0.0.1:"))) {
      allowed = origin;
    }
    const cors = corsHeaders(allowed);
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }
    if (request.method === "GET" && url.pathname === "/health") {
      return new Response(
        JSON.stringify({
          status: "ok",
          providers: {
            gemini: !!env.GEMINI_API_KEY,
            nvidia: !!env.NVIDIA_API_KEY,
            groq: !!env.GROQ_API_KEY
          }
        }),
        { status: 200, headers: { "Content-Type": "application/json", ...cors } }
      );
    }
    if (request.method !== "POST" || url.pathname !== "/api/chat") {
      return new Response(JSON.stringify({ error: "Not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json", ...cors }
      });
    }
    const clientIp = request.headers.get("CF-Connecting-IP") ?? "unknown";
    if (!checkRateLimit(clientIp)) {
      return new Response(
        JSON.stringify({
          message: "You've sent quite a few messages! Please wait a minute or use the contact form to reach the BuzzleMax team.",
          leadCaptureRecommended: true
        }),
        { status: 429, headers: { "Content-Type": "application/json", ...cors } }
      );
    }
    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...cors }
      });
    }
    const messages = body?.messages;
    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({
          message: "Hi! How can BuzzleMax help you with web development or AI automation today?",
          leadCaptureRecommended: false
        }),
        { status: 200, headers: { "Content-Type": "application/json", ...cors } }
      );
    }
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    if (lastUser && lastUser.content.length > 1e3) {
      return new Response(
        JSON.stringify({
          message: "Your message is a bit long! Could you summarize your requirement in a few sentences?",
          leadCaptureRecommended: false
        }),
        { status: 200, headers: { "Content-Type": "application/json", ...cors } }
      );
    }
    if (!env.GEMINI_API_KEY) {
      console.error("[AI ERROR] Missing primary AI configuration");
      return new Response(
        JSON.stringify({
          error: "MISSING_AI_CONFIGURATION",
          message: "AI service configuration is unavailable."
        }),
        { status: 500, headers: { "Content-Type": "application/json", ...cors } }
      );
    }
    const recentMessages = messages.slice(-20);
    let aiText = null;
    let providerUsed = "none";
    try {
      console.log("[AI] Attempting Gemini");
      aiText = await callGemini(env.GEMINI_API_KEY, recentMessages);
      providerUsed = "gemini";
      console.log("[AI] Gemini succeeded");
    } catch (geminiError) {
      const retryable = isRetryableError(geminiError);
      console.error(
        "[AI ERROR] Gemini failed:",
        geminiError instanceof Error ? geminiError.message : String(geminiError),
        retryable ? "\u2014 advancing to fallback" : "\u2014 non-retryable"
      );
      if (retryable) {
        if (env.NVIDIA_API_KEY) {
          try {
            console.log("[AI] Falling back to NVIDIA");
            aiText = await callNVIDIA(env.NVIDIA_API_KEY, recentMessages);
            providerUsed = "nvidia";
            console.log("[AI] NVIDIA succeeded");
          } catch (nvidiaError) {
            console.error(
              "[AI ERROR] NVIDIA failed:",
              nvidiaError instanceof Error ? nvidiaError.message : String(nvidiaError),
              "\u2014 advancing to Groq"
            );
            if (env.GROQ_API_KEY) {
              try {
                console.log("[AI] Falling back to Groq (emergency)");
                aiText = await callGroq(env.GROQ_API_KEY, recentMessages);
                providerUsed = "groq";
                console.log("[AI] Groq succeeded");
              } catch (groqError) {
                console.error(
                  "[AI ERROR] Groq failed:",
                  groqError instanceof Error ? groqError.message : String(groqError),
                  "\u2014 all providers exhausted"
                );
              }
            } else {
              console.log("[AI] No Groq emergency fallback configured");
            }
          }
        } else {
          console.log("[AI] No NVIDIA configured \u2014 attempting Groq directly");
          if (env.GROQ_API_KEY) {
            try {
              console.log("[AI] Falling back to Groq (emergency, NVIDIA not configured)");
              aiText = await callGroq(env.GROQ_API_KEY, recentMessages);
              providerUsed = "groq";
              console.log("[AI] Groq succeeded");
            } catch (groqError) {
              console.error(
                "[AI ERROR] Groq failed:",
                groqError instanceof Error ? groqError.message : String(groqError),
                "\u2014 all providers exhausted"
              );
            }
          } else {
            console.log("[AI] No fallback providers configured");
          }
        }
      }
    }
    if (!aiText) {
      console.error("[AI ERROR] All AI providers failed \u2014 returning honest response");
      return new Response(
        JSON.stringify({
          message: "Sorry, the AI is temporarily unavailable. Please try again in a moment.",
          leadCaptureRecommended: true
        }),
        { status: 200, headers: { "Content-Type": "application/json", ...cors } }
      );
    }
    const leadCaptureRecommended = shouldRecommendLeadCapture(aiText, recentMessages);
    console.log("[AI] Response generated via", providerUsed);
    return new Response(JSON.stringify({ message: aiText, leadCaptureRecommended }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...cors }
    });
  }
};

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    const body = JSON.stringify(error);
    const headers = {
      "Content-Type": "application/json",
      "MF-Experimental-Error-Stack": "true"
    };
    const encoded = encodeURIComponent(body);
    if (encoded.length <= 8192) {
      headers["MF-Experimental-Error-Stack-Payload"] = encoded;
    }
    return new Response(body, { status: 500, headers });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-Z2CkEs/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = src_default;

// node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-Z2CkEs/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  scheduledTime;
  cron;
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=index.js.map
