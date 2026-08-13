export declare const SITE_URL = "https://buzzlemax.ai";
export declare const DEFAULT_OG_IMAGE = "https://buzzlemax.ai/images/og-image.svg";
export declare const NAV_LINKS: readonly [{
    readonly label: "Features";
    readonly href: "/#features";
}, {
    readonly label: "Solutions";
    readonly href: "/#solutions";
}, {
    readonly label: "How It Works";
    readonly href: "/#how-it-works";
}, {
    readonly label: "Pricing";
    readonly href: "/#pricing";
}, {
    readonly label: "Web Development";
    readonly href: "/web-development";
}, {
    readonly label: "FAQ";
    readonly href: "/#faq";
}, {
    readonly label: "Contact";
    readonly href: "/#contact";
}];
export declare const FOOTER_LINK_GROUPS: {
    readonly Product: ({
        readonly label: "Features";
        readonly href: "/#features";
    } | {
        readonly label: "Solutions";
        readonly href: "/#solutions";
    } | {
        readonly label: "How It Works";
        readonly href: "/#how-it-works";
    } | {
        readonly label: "Pricing";
        readonly href: "/#pricing";
    } | {
        readonly label: "Web Development";
        readonly href: "/web-development";
    } | {
        readonly label: "FAQ";
        readonly href: "/#faq";
    } | {
        readonly label: "Contact";
        readonly href: "/#contact";
    })[];
    readonly Resources: ({
        readonly label: "Features";
        readonly href: "/#features";
    } | {
        readonly label: "Solutions";
        readonly href: "/#solutions";
    } | {
        readonly label: "How It Works";
        readonly href: "/#how-it-works";
    } | {
        readonly label: "Pricing";
        readonly href: "/#pricing";
    } | {
        readonly label: "Web Development";
        readonly href: "/web-development";
    } | {
        readonly label: "FAQ";
        readonly href: "/#faq";
    } | {
        readonly label: "Contact";
        readonly href: "/#contact";
    })[];
    readonly Company: readonly [{
        readonly label: "Email Us";
        readonly href: `mailto:${string}`;
    }, {
        readonly label: "Book Strategy Call";
        readonly href: "/#pricing";
    }];
};
export declare const AI_SERVICE_OPTIONS: readonly ["AI Chatbots", "AI Voice Agents", "CRM Automation", "Email Automation", "Lead Qualification", "Appointment Booking", "Workflow Automation"];
export declare const WEB_DEVELOPMENT_SERVICE_OPTIONS: readonly ["Landing Page", "Business Website", "E-commerce Store", "Custom Web Application", "Website Redesign", "Technical SEO & Performance"];
export declare const SALES_PLAN_OPTIONS: readonly [...string[], "Web Development", "Custom Solution"];
export declare const BUSINESS_TYPE_OPTIONS: string[];
export declare const REVENUE_OPTIONS: readonly ["Under $10k / month", "$10k - $50k / month", "$50k - $100k / month", "$100k - $500k / month", "$500k+ / month", "Prefer not to say"];
export type SeoConfig = {
    title: string;
    description: string;
    path?: string;
    keywords?: string[];
    image?: string;
    type?: 'website' | 'article';
};
export declare const DEFAULT_SEO: SeoConfig;
export declare const WEB_DEVELOPMENT_SEO: SeoConfig;
