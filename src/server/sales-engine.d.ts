export interface ChatMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
}
export interface ChatResponse {
    message: string;
    leadCaptureRecommended: boolean;
}
export declare const SYSTEM_PROMPT: string;
export declare function checkRateLimit(ip: string, limit?: number, windowMs?: number): boolean;
export declare function processChatRequest(messages: ChatMessage[], clientIp?: string): Promise<ChatResponse>;
