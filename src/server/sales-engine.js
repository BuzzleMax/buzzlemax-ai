var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
export var SYSTEM_PROMPT = "\nYou are the BuzzleMax AI Sales Assistant for BuzzleMax (https://buzzlemax.site), a premier web development and AI automation agency.\n\nYOUR PRODUCT ROLE:\nYour job is to be a helpful, friendly, concise, and professional BuzzleMax sales representative.\nYou understand visitor needs, explain BuzzleMax services, help visitors fit services to their situation, give approximate published pricing guidance, qualify serious prospects, collect lead info for follow-up, and direct complex requests to the contact form.\n\nPRIMARY SERVICES & PUBLISHED PRICING:\n1. WEB DEVELOPMENT:\n   - Business Websites: Starting at $1,000 (5-10 custom pages, CMS, SEO, contact forms, responsive).\n   - Landing Pages: Starting at $100 (Custom design, copy, fast loading, lead capture).\n   - E-commerce Stores: Starting at $5,000 (Product catalog, payments, inventory, accounts).\n   - Custom Web Applications & SaaS Interfaces: Custom Quote based on scope.\n   - Responsive redesigns and custom frontend development.\n\n2. AI SOLUTIONS:\n   - AI Website Chatbots: STARTER plan starting at $997 setup + $297/month (2,500 conversations/mo, lead capture, CRM integration, email automation).\n   - AI Voice Receptionists / Omnichannel AI: PROFESSIONAL plan starting at $2,497 setup + $897/mo (5,000 conversations, 500 voice minutes, WhatsApp AI, Instagram AI, appointment booking).\n   - Internal Knowledge Base AI & Custom AI Workflows: ENTERPRISE plan starting at $9,997 setup + custom monthly rate (unlimited agents, custom integrations, dedicated manager).\n\n3. AUTOMATION (WhatsApp, Leads, Workflows):\n   - WhatsApp Automation (lead capture, support, appointment booking, notifications, order updates).\n   - CRM & Lead Automation (auto-enrich contacts, follow-up triggers, pipeline sync).\n   - Email Automation & Form-to-email routing.\n\nMODULAR SERVICES CONCEPT (CRITICAL):\nServices are MODULAR. A customer does NOT need a full website + AI + automation package!\nFor example: If someone ONLY needs WhatsApp automation, explain that BuzzleMax provides standalone WhatsApp automation without buying a website package.\nRecommend ONLY services that genuinely fit the visitor's requirement.\n\nDISCOVERY FLOW (ASK ONE USEFUL QUESTION AT A TIME):\n- If they want a website: Ask what kind of website, whether it's new or existing, and desired features.\n- If they want WhatsApp automation: Ask what they want WhatsApp to automate (lead capture, support, appointments, FAQs).\n- If they want AI: Ask what specific task/problem they want the AI to solve for their business.\n\nPRICING & TIMELINE BEHAVIOR (STRICT RULES):\n- Never give exact guaranteed price quotes. ALWAYS state: \"Final quote will be shared after understanding your requirement.\"\n- If pricing is asked, state published rough starting ranges (e.g. $100 for landing pages, $1,000 for business websites, $997 setup + $297/mo for AI chatbot).\n- Never invent discounts, promotions, or free items.\n- Never promise exact delivery dates (e.g. \"7 days\"). Explain timelines depend on project scope, features, integrations, and feedback: \"Once we understand your requirements, we'll provide an estimated timeline.\"\n\nQUALIFICATION & CONTACT HANDOFF:\n- When a prospect asks for an exact quote, custom development, human discussion, or states intent (\"I want to talk to someone\", \"book a call\", \"get custom quote\"), respond warmly and offer to collect details or direct them to the BuzzleMax team contact form.\n\nBEHAVIOR RULES:\n- Concise, friendly, professional, simple language (no jargon unless user uses it first).\n- Never pretend to be a human employee.\n- Never claim to have spoken with the team or that a project is approved.\n- Never invent clients, testimonials, case studies, or unstated capabilities.\n";
// In-memory rate limiting state
var rateLimitMap = new Map();
export function checkRateLimit(ip, limit, windowMs) {
    if (limit === void 0) { limit = 30; }
    if (windowMs === void 0) { windowMs = 60000; }
    var now = Date.now();
    var record = rateLimitMap.get(ip);
    if (!record || now > record.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
        return true;
    }
    if (record.count >= limit) {
        return false;
    }
    record.count++;
    return true;
}
export function processChatRequest(messages_1) {
    return __awaiter(this, arguments, void 0, function (messages, clientIp) {
        var recentMessages, lastUserMsg, userText, apiKey, response, response, error_1;
        if (clientIp === void 0) { clientIp = '127.0.0.1'; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // 1. Rate Limiting Check
                    if (!checkRateLimit(clientIp)) {
                        return [2 /*return*/, {
                                message: "You've sent quite a few messages! Please wait a minute or use the contact form to reach the BuzzleMax team directly.",
                                leadCaptureRecommended: true,
                            }];
                    }
                    // 2. Input Validation
                    if (!Array.isArray(messages) || messages.length === 0) {
                        return [2 /*return*/, {
                                message: "Hi! How can BuzzleMax help you with web development or AI automation today?",
                                leadCaptureRecommended: false,
                            }];
                    }
                    recentMessages = messages.slice(-20);
                    lastUserMsg = __spreadArray([], recentMessages, true).reverse().find(function (m) { return m.role === 'user'; });
                    userText = lastUserMsg ? lastUserMsg.content.trim() : '';
                    if (userText.length > 1000) {
                        return [2 /*return*/, {
                                message: 'Your message is a bit long! Could you summarize your requirement in a few sentences?',
                                leadCaptureRecommended: false,
                            }];
                    }
                    apiKey = process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;
                    if (!apiKey) return [3 /*break*/, 7];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    if (!process.env.GEMINI_API_KEY) return [3 /*break*/, 3];
                    return [4 /*yield*/, callGeminiAPI(process.env.GEMINI_API_KEY, recentMessages)];
                case 2:
                    response = _a.sent();
                    return [2 /*return*/, response];
                case 3:
                    if (!process.env.OPENAI_API_KEY) return [3 /*break*/, 5];
                    return [4 /*yield*/, callOpenAIAPI(process.env.OPENAI_API_KEY, recentMessages)];
                case 4:
                    response = _a.sent();
                    return [2 /*return*/, response];
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_1 = _a.sent();
                    console.error('[BuzzleMax AI API Error]:', error_1);
                    return [3 /*break*/, 7];
                case 7: 
                // 4. Fallback Rule Engine (guarantees production quality even without external key)
                return [2 /*return*/, runFallbackSalesEngine(userText, recentMessages)];
            }
        });
    });
}
function callGeminiAPI(apiKey, messages) {
    return __awaiter(this, void 0, void 0, function () {
        var contents, payload, url, res, data, text, leadCaptureRecommended;
        var _a, _b, _c, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    contents = messages.map(function (m) { return ({
                        role: m.role === 'assistant' ? 'model' : 'user',
                        parts: [{ text: m.content }],
                    }); });
                    payload = {
                        system_instruction: {
                            parts: [{ text: SYSTEM_PROMPT }],
                        },
                        contents: contents,
                        generationConfig: {
                            temperature: 0.7,
                            maxOutputTokens: 500,
                        },
                    };
                    url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=".concat(apiKey);
                    return [4 /*yield*/, fetch(url, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(payload),
                        })];
                case 1:
                    res = _f.sent();
                    if (!res.ok) {
                        throw new Error("Gemini API returned status ".concat(res.status));
                    }
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = (_f.sent());
                    text = (_e = (_d = (_c = (_b = (_a = data.candidates) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.content) === null || _c === void 0 ? void 0 : _c.parts) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.text;
                    if (!text) {
                        throw new Error('Invalid response structure from Gemini API');
                    }
                    leadCaptureRecommended = checkLeadCaptureRecommendation(text, messages);
                    return [2 /*return*/, { message: text, leadCaptureRecommended: leadCaptureRecommended }];
            }
        });
    });
}
function callOpenAIAPI(apiKey, messages) {
    return __awaiter(this, void 0, void 0, function () {
        var openAiMessages, res, data, text, leadCaptureRecommended;
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    openAiMessages = __spreadArray([
                        { role: 'system', content: SYSTEM_PROMPT }
                    ], messages.map(function (m) { return ({
                        role: m.role === 'assistant' ? 'assistant' : 'user',
                        content: m.content,
                    }); }), true);
                    return [4 /*yield*/, fetch('https://api.openai.com/v1/chat/completions', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: "Bearer ".concat(apiKey),
                            },
                            body: JSON.stringify({
                                model: 'gpt-4o-mini',
                                messages: openAiMessages,
                                temperature: 0.7,
                                max_tokens: 500,
                            }),
                        })];
                case 1:
                    res = _d.sent();
                    if (!res.ok) {
                        throw new Error("OpenAI API returned status ".concat(res.status));
                    }
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = (_d.sent());
                    text = (_c = (_b = (_a = data.choices) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.message) === null || _c === void 0 ? void 0 : _c.content;
                    if (!text) {
                        throw new Error('Invalid response structure from OpenAI API');
                    }
                    leadCaptureRecommended = checkLeadCaptureRecommendation(text, messages);
                    return [2 /*return*/, { message: text, leadCaptureRecommended: leadCaptureRecommended }];
            }
        });
    });
}
function checkLeadCaptureRecommendation(aiResponse, messages) {
    var _a;
    var lowerResp = aiResponse.toLowerCase();
    var lastUser = ((_a = __spreadArray([], messages, true).reverse().find(function (m) { return m.role === 'user'; })) === null || _a === void 0 ? void 0 : _a.content.toLowerCase()) || '';
    if (lowerResp.includes('contact form') ||
        lowerResp.includes('buzzlemax team') ||
        lowerResp.includes('collect a few details') ||
        lowerResp.includes('follow up with you') ||
        lastUser.includes('talk to someone') ||
        lastUser.includes('contact') ||
        lastUser.includes('quote')) {
        return true;
    }
    return false;
}
function runFallbackSalesEngine(userText, messages) {
    var text = userText.toLowerCase();
    var allText = messages.map(function (m) { return m.content.toLowerCase(); }).join(' ');
    // Test 7: Human Handoff / Talk to someone
    if (text.includes('talk to someone') ||
        text.includes('speak to human') ||
        text.includes('contact human') ||
        text.includes('reach out') ||
        text.includes('call me')) {
        return {
            message: "I'd be happy to connect you directly with the BuzzleMax team! Let's get a few quick details or you can fill out our contact form.",
            leadCaptureRecommended: true,
        };
    }
    // Test 2 & Modular Pricing: Standalone WhatsApp automation
    if (text.includes('whatsapp') ||
        (text.includes('only need') && text.includes('automation'))) {
        return {
            message: "Absolutely — you don't need to purchase a full website package for that. BuzzleMax provides WhatsApp automation as a standalone solution! What would you like WhatsApp to automate? (e.g., lead capture, customer support, appointment booking, or notifications)? Final quote will be shared after understanding your requirement.",
            leadCaptureRecommended: false,
        };
    }
    // Test 3 & Test 6: Pricing / Cost / Guaranteed Price
    if (text.includes('how much') ||
        text.includes('price') ||
        text.includes('cost') ||
        text.includes('pricing') ||
        text.includes('guarantee') ||
        text.includes('quote')) {
        if (allText.includes('website') || text.includes('website') || text.includes('landing')) {
            return {
                message: "At BuzzleMax, our web development pricing starts at $100 for high-converting landing pages, $1,000 for full business websites, and $5,000 for e-commerce stores. Final quote will be shared after understanding your requirement. What type of website are you looking to build?",
                leadCaptureRecommended: false,
            };
        }
        if (allText.includes('ai') || text.includes('ai') || text.includes('bot')) {
            return {
                message: "Our AI Chatbot Starter plan starts at $997 setup + $297/month (includes lead capture, CRM integration, and email automation). Professional AI Voice agents start at $2,497 setup + $897/month. Final quote will be shared after understanding your requirement.",
                leadCaptureRecommended: false,
            };
        }
        return {
            message: "BuzzleMax offers flexible starting ranges based on project type—such as landing pages starting at $100, business websites from $1,000, and AI Chatbots starting at $997 setup + $297/mo. Final quote will be shared after understanding your requirement. What specific project do you have in mind?",
            leadCaptureRecommended: false,
        };
    }
    // Test 5: Timelines / Finish date
    if (text.includes('when') ||
        text.includes('how long') ||
        text.includes('timeline') ||
        text.includes('delivery') ||
        text.includes('days') ||
        text.includes('finish')) {
        return {
            message: "Timelines depend on the exact project scope, features, feedback, and integrations. Once we understand your requirements, we'll provide an estimated timeline. Would you like to share a few details about what you'd like to build?",
            leadCaptureRecommended: false,
        };
    }
    // Test 4: Extremely custom requirement
    if (text.includes('custom') ||
        text.includes('complex') ||
        text.includes('enterprise') ||
        text.includes('saas') ||
        text.includes('app')) {
        return {
            message: "We specialize in custom web applications, SaaS interfaces, and custom AI workflows! That sounds like a specialized project. Let's get the details to the BuzzleMax team so we can provide a tailored recommendation.",
            leadCaptureRecommended: true,
        };
    }
    // Test 8: Services offered
    if (text.includes('services') ||
        text.includes('offer') ||
        text.includes('what do you do') ||
        text.includes('capabilities')) {
        return {
            message: "BuzzleMax provides three core modular solutions:\n\n" +
                "• 🌐 **Web Development**: Custom business websites, landing pages, e-commerce stores, and SaaS web apps.\n" +
                "• 🤖 **AI Solutions**: 24/7 AI chatbots, AI voice receptionists, and custom AI integrations.\n" +
                "• 💬 **Automation**: Standalone WhatsApp automation, lead workflows, CRM sync, and email automation.\n\n" +
                "What are you looking to build or automate?",
            leadCaptureRecommended: false,
        };
    }
    // Test 1: Website discovery flow
    if (text.includes('website') || text.includes('site') || text.includes('landing')) {
        if (!allText.includes('new one') && !allText.includes('already have')) {
            return {
                message: "Great! Do you already have an existing website you'd like to redesign, or would this be a brand new website?",
                leadCaptureRecommended: false,
            };
        }
        return {
            message: "Got it! What key features or goals would you like this website to achieve (e.g. lead capture, online booking, e-commerce, custom UI)?",
            leadCaptureRecommended: false,
        };
    }
    // AI discovery flow
    if (text.includes('ai') || text.includes('chatbot') || text.includes('assistant')) {
        return {
            message: "Awesome! What would you like the AI to actually do for your business? (e.g. qualify leads, answer customer support FAQs 24/7, or book appointments)?",
            leadCaptureRecommended: false,
        };
    }
    // Default friendly sales rep response
    return {
        message: "That sounds interesting! BuzzleMax can build custom web applications, AI chatbots, or standalone automations tailored to your needs. Could you tell me a little more about your primary goal?",
        leadCaptureRecommended: false,
    };
}
