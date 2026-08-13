export var COMPANY_INFO = {
    name: 'Buzzlemax AI',
    tagline: 'Premium AI Automation Agency',
    description: 'Deploy AI chatbots, voice agents, omnichannel support, and CRM/email automation—built to qualify leads, book appointments, and run your workflows end-to-end.',
    contact: {
        email: 'buzzlemaxofficial@gmail.com',
    },
};
export var FEATURES = [
    {
        icon: 'MessageSquare',
        title: 'AI Chatbots & Customer Support AI',
        description: '24/7 instant answers, ticket deflection, and smart routing—powered to resolve customer questions and escalate only what matters.',
    },
    {
        icon: 'Sparkles',
        title: 'AI Voice Agents (Calls → Outcomes)',
        description: 'Turn inbound and outbound calls into qualified conversations: capture intent, verify details, and progress prospects toward booked appointments.',
    },
    {
        icon: 'BarChart3',
        title: 'Lead Qualification & Analytics',
        description: 'Score intent, track conversion signals, and get clear visibility into which messages and channels create booked meetings.',
    },
    {
        icon: 'Users',
        title: 'CRM Automation & Lead Workflows',
        description: 'Auto-enrich contacts, update your pipeline, trigger follow-ups, and keep your CRM accurate without manual effort.',
    },
    {
        icon: 'Mail',
        title: 'Email Automation & Appointment Booking',
        description: 'Personalized sequences that nurture leads, confirm availability, and book appointments directly—automatically.',
    },
    {
        icon: 'Shield',
        title: 'Enterprise-Grade Security',
        description: 'Bank-level encryption and secure handling designed for sensitive business data and reliable automation at scale.',
    },
];
export var PRICING_PLANS = [
    {
        name: 'ENTRY-LEVEL',
        setupFee: 0,
        setupFeeRupees: '₹5,000 starting price',
        price: 0,
        priceRupees: 'Custom pricing',
        period: 'one-time',
        description: 'Focused individual AI solutions',
        features: [
            'Custom AI chatbot',
            'FAQ AI assistant',
            'Simple customer-support AI',
            'Lead-capture AI',
            'Website sales assistant',
            'Basic WhatsApp AI',
            'Basic Instagram AI',
            'Simple custom AI assistant',
        ],
        usage: [
            'One focused AI solution',
            'Single platform',
            'Basic integrations',
        ],
        cta: 'Tell Us What You Need',
        popular: true,
    },
    {
        name: 'MULTI-PLATFORM',
        setupFee: 0,
        setupFeeRupees: 'Custom quote',
        price: 0,
        priceRupees: 'Custom pricing',
        period: 'custom',
        description: 'Multiple AI systems across platforms',
        features: [
            'Multiple AI assistants',
            'WhatsApp + Instagram AI',
            'AI voice receptionist',
            'CRM automation',
            'Advanced workflows',
            'Multi-channel support',
            'Custom integrations',
        ],
        usage: [
            'Multiple platforms',
            'Advanced automation',
            'Complex workflows',
        ],
        cta: 'Get Custom Quote',
        popular: false,
    },
    {
        name: 'ENTERPRISE',
        setupFee: 0,
        setupFeeRupees: 'Custom quote',
        price: 0,
        priceRupees: 'Custom pricing',
        period: 'custom',
        description: 'Large-scale AI systems',
        features: [
            'Unlimited AI agents',
            'Internal knowledge base AI',
            'Custom AI workflows',
            'API integrations',
            'White label solutions',
            'Custom development',
            'Dedicated account manager',
        ],
        usage: [
            'Enterprise scale',
            'Advanced integrations',
            'Custom requirements',
        ],
        cta: 'Request Custom Proposal',
        popular: false,
        isEnterprise: true,
    },
];
export var STATS = [
    { label: 'Leads Qualified', value: '1' },
    { label: 'Appointments Booked', value: '1' },
    { label: 'Support Deflection', value: '63%' },
    { label: 'Avg. Response Time', value: '1.2s' },
];
export var CONTACT_STATUSES = [
    { value: 'new', label: 'New', color: 'bg-blue-500' },
    { value: 'contacted', label: 'Contacted', color: 'bg-yellow-500' },
    { value: 'qualified', label: 'Qualified', color: 'bg-purple-500' },
    { value: 'engaged', label: 'Engaged', color: 'bg-orange-500' },
    { value: 'converted', label: 'Converted', color: 'bg-green-500' },
    { value: 'inactive', label: 'Inactive', color: 'bg-red-500' },
];
export var BUSINESS_TYPES = [
    { value: 'retail', label: 'Retail' },
    { value: 'service', label: 'Service' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'technology', label: 'Technology' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'finance', label: 'Finance' },
    { value: 'other', label: 'Other' },
];
export var CONTACT_SOURCES = [
    { value: 'website', label: 'Website' },
    { value: 'referral', label: 'Referral' },
    { value: 'social_media', label: 'Social Media' },
    { value: 'campaign', label: 'Campaign' },
    { value: 'other', label: 'Other' },
];
export var PRIORITY_LEVELS = [
    { value: 'low', label: 'Low', color: 'bg-gray-500' },
    { value: 'medium', label: 'Medium', color: 'bg-blue-500' },
    { value: 'high', label: 'High', color: 'bg-orange-500' },
    { value: 'critical', label: 'Critical', color: 'bg-red-500' },
];
