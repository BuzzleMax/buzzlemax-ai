export type ChatEventType =
  | 'chat_opened'
  | 'chat_started'
  | 'service_selected'
  | 'pricing_asked'
  | 'lead_info_submitted'
  | 'contact_cta_clicked'

export interface ChatEventPayload {
  service?: string
  leadEmail?: string
  leadName?: string
  source?: string
  metadata?: Record<string, unknown>
}

export function trackChatEvent(event: ChatEventType, payload?: ChatEventPayload): void {
  // Safe console logging in dev only — uses Vite's import.meta.env (browser-safe, no process.env)
  if (import.meta.env.DEV) {
    console.log(`[BuzzleMax Analytics] Event: ${event}`, payload ?? {})
  }

  try {
    if (typeof window !== 'undefined') {
      const windowObj = window as unknown as Record<string, unknown>
      if (typeof windowObj.gtag === 'function') {
        ;(windowObj.gtag as (cmd: string, eventName: string, params?: Record<string, unknown>) => void)(
          'event',
          `chat_${event}`,
          {
            event_category: 'AI Chatbot',
            ...payload,
          }
        )
      }
    }
  } catch {
    // Silently ignore analytics dispatcher errors
  }
}
