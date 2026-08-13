import { z } from 'zod';
export declare const validation: {
    email: (value: string) => string | null;
    password: (value: string) => string | null;
    fullName: (value: string) => string | null;
    companyName: (value: string) => string | null;
    required: (value: string, fieldName: string) => string | null;
};
export declare const CONTACT_SERVICE_OPTIONS: readonly ["Website", "Landing Page", "AI Chatbot", "Custom AI", "AI Automation", "Other"];
export declare const contactFormSchema: z.ZodObject<{
    firstName: z.ZodString;
    lastName: z.ZodString;
    email: z.ZodString;
    service: z.ZodEnum<[string, ...string[]]>;
    subject: z.ZodString;
    message: z.ZodString;
}, "strip", z.ZodTypeAny, {
    service?: string;
    message?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    subject?: string;
}, {
    service?: string;
    message?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    subject?: string;
}>;
export declare const salesServiceOptions: readonly ["AI Chatbots", "AI Voice Agents", "CRM Automation", "Email Automation", "Lead Qualification", "Appointment Booking", "Workflow Automation", "Landing Page", "Business Website", "E-commerce Store", "Custom Web Application", "Website Redesign", "Technical SEO & Performance"];
export declare const contactSalesSchema: z.ZodObject<{
    name: z.ZodString;
    company: z.ZodString;
    website: z.ZodEffects<z.ZodString, string, string>;
    email: z.ZodString;
    businessType: z.ZodEnum<[string, ...string[]]>;
    interestedService: z.ZodEnum<[string, ...string[]]>;
    selectedPlan: z.ZodEnum<[string, ...string[]]>;
    monthlyRevenue: z.ZodOptional<z.ZodNullable<z.ZodEnum<[string, ...string[]]>>>;
    projectDetails: z.ZodString;
}, "strip", z.ZodTypeAny, {
    website?: string;
    name?: string;
    email?: string;
    company?: string;
    businessType?: string;
    interestedService?: string;
    selectedPlan?: string;
    monthlyRevenue?: string;
    projectDetails?: string;
}, {
    website?: string;
    name?: string;
    email?: string;
    company?: string;
    businessType?: string;
    interestedService?: string;
    selectedPlan?: string;
    monthlyRevenue?: string;
    projectDetails?: string;
}>;
export type ContactFormSchema = z.infer<typeof contactFormSchema>;
export type ContactSalesSchema = z.infer<typeof contactSalesSchema>;
