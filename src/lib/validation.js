var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { z } from 'zod';
import { AI_SERVICE_OPTIONS, BUSINESS_TYPE_OPTIONS, REVENUE_OPTIONS, SALES_PLAN_OPTIONS, WEB_DEVELOPMENT_SERVICE_OPTIONS, } from '@/lib/site';
export var validation = {
    email: function (value) {
        if (!value)
            return 'Email is required';
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value))
            return 'Please enter a valid email address';
        return null;
    },
    password: function (value) {
        if (!value)
            return 'Password is required';
        if (value.length < 8)
            return 'Password must be at least 8 characters';
        return null;
    },
    fullName: function (value) {
        if (!value)
            return 'Full name is required';
        if (value.trim().length < 2)
            return 'Full name must be at least 2 characters';
        return null;
    },
    companyName: function (value) {
        if (!value)
            return 'Company name is required';
        if (value.trim().length < 2)
            return 'Company name must be at least 2 characters';
        return null;
    },
    required: function (value, fieldName) {
        if (!value || !value.trim())
            return "".concat(fieldName, " is required");
        return null;
    },
};
var websiteSchema = z
    .string()
    .trim()
    .min(1, 'Business website is required')
    .refine(function (value) {
    try {
        new URL(/^https?:\/\//i.test(value) ? value : "https://".concat(value));
        return true;
    }
    catch (_a) {
        return false;
    }
}, 'Enter a valid website URL');
export var CONTACT_SERVICE_OPTIONS = [
    'Website',
    'Landing Page',
    'AI Chatbot',
    'Custom AI',
    'AI Automation',
    'Other',
];
export var contactFormSchema = z.object({
    firstName: z.string().trim().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().trim().min(2, 'Last name must be at least 2 characters'),
    email: z.string().trim().email('Please enter a valid email address'),
    service: z.enum(CONTACT_SERVICE_OPTIONS, {
        message: 'Please select a service',
    }),
    subject: z.string().trim().min(3, 'Subject must be at least 3 characters'),
    message: z
        .string()
        .trim()
        .min(20, 'Message must be at least 20 characters')
        .max(1200, 'Message must be 1200 characters or fewer'),
});
export var salesServiceOptions = __spreadArray(__spreadArray([], AI_SERVICE_OPTIONS, true), WEB_DEVELOPMENT_SERVICE_OPTIONS, true);
export var contactSalesSchema = z.object({
    name: z.string().trim().min(2, 'Name must be at least 2 characters'),
    company: z.string().trim().min(2, 'Company must be at least 2 characters'),
    website: websiteSchema,
    email: z.string().trim().email('Please enter a valid email address'),
    businessType: z.enum(BUSINESS_TYPE_OPTIONS, {
        message: 'Select a business type',
    }),
    interestedService: z.enum(salesServiceOptions, {
        message: 'Select an interested service',
    }),
    selectedPlan: z.enum(SALES_PLAN_OPTIONS, {
        message: 'Select a plan',
    }),
    monthlyRevenue: z
        .enum(REVENUE_OPTIONS)
        .nullable()
        .optional(),
    projectDetails: z
        .string()
        .trim()
        .min(30, 'Project details must be at least 30 characters')
        .max(1500, 'Project details must be 1500 characters or fewer'),
});
