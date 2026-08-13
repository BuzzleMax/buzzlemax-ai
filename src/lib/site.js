var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { COMPANY_INFO, BUSINESS_TYPES, PRICING_PLANS } from '@/lib/constants';
export var SITE_URL = 'https://buzzlemax.ai';
export var DEFAULT_OG_IMAGE = "".concat(SITE_URL, "/images/og-image.svg");
export var NAV_LINKS = [
    { label: 'Features', href: '/#features' },
    { label: 'Solutions', href: '/#solutions' },
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'Pricing', href: '/#pricing' },
    { label: 'Web Development', href: '/web-development' },
    { label: 'FAQ', href: '/#faq' },
    { label: 'Contact', href: '/#contact' },
];
export var FOOTER_LINK_GROUPS = {
    Product: NAV_LINKS.filter(function (link) {
        return ['Features', 'Solutions', 'How It Works', 'Pricing', 'Web Development'].includes(link.label);
    }),
    Resources: NAV_LINKS.filter(function (link) { return ['FAQ', 'Contact'].includes(link.label); }),
    Company: [
        { label: 'Email Us', href: "mailto:".concat(COMPANY_INFO.contact.email) },
        { label: 'Book Strategy Call', href: '/#pricing' },
    ],
};
export var AI_SERVICE_OPTIONS = [
    'AI Chatbots',
    'AI Voice Agents',
    'CRM Automation',
    'Email Automation',
    'Lead Qualification',
    'Appointment Booking',
    'Workflow Automation',
];
export var WEB_DEVELOPMENT_SERVICE_OPTIONS = [
    'Landing Page',
    'Business Website',
    'E-commerce Store',
    'Custom Web Application',
    'Website Redesign',
    'Technical SEO & Performance',
];
export var SALES_PLAN_OPTIONS = __spreadArray(__spreadArray([], PRICING_PLANS.map(function (plan) { return plan.name; }), true), [
    'Web Development',
    'Custom Solution',
], false);
export var BUSINESS_TYPE_OPTIONS = BUSINESS_TYPES.map(function (option) { return option.label; });
export var REVENUE_OPTIONS = [
    'Under $10k / month',
    '$10k - $50k / month',
    '$50k - $100k / month',
    '$100k - $500k / month',
    '$500k+ / month',
    'Prefer not to say',
];
export var DEFAULT_SEO = {
    title: 'Buzzlemax AI | Premium AI Automation Agency',
    description: 'Deploy custom AI chatbots, voice agents, and workflow automation to qualify leads, book appointments, and scale your business operations.',
    path: '/',
    keywords: [
        'AI automation',
        'AI chatbots',
        'voice agents',
        'CRM automation',
        'lead qualification',
        'appointment booking',
        'business automation',
    ],
};
export var WEB_DEVELOPMENT_SEO = {
    title: 'Custom Web Development | Buzzlemax AI',
    description: 'Build premium landing pages, websites, e-commerce stores, and custom web apps designed for speed, trust, conversions, and long-term growth.',
    path: '/web-development',
    keywords: [
        'web development agency',
        'landing page design',
        'custom website development',
        'e-commerce development',
        'SaaS website design',
        'conversion rate optimization',
    ],
};
