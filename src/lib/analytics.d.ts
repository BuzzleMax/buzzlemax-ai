export type ChatEventType = 'chat_opened' | 'chat_started' | 'service_selected' | 'pricing_asked' | 'lead_info_submitted' | 'contact_cta_clicked';
export interface ChatEventPayload {
    service?: string;
    leadEmail?: string;
    leadName?: string;
    source?: string;
    metadata?: Record<string, unknown>;
}
export declare function trackChatEvent(event: ChatEventType, payload?: ChatEventPayload): void;
