import { sendContactSalesEmail } from '@/services/email'
import { trackChatEvent } from '@/lib/analytics'

export interface CapturedLeadData {
  name: string
  email: string
  requirement: string
  company?: string
  budget?: string
  timeline?: string
  serviceCategory?: string
}

let pendingLeadData: Partial<CapturedLeadData> | null = null

export function setPendingLeadData(data: Partial<CapturedLeadData>): void {
  pendingLeadData = {
    ...pendingLeadData,
    ...data,
  }
}

export function getPendingLeadData(): Partial<CapturedLeadData> | null {
  return pendingLeadData
}

export function clearPendingLeadData(): void {
  pendingLeadData = null
}

export async function submitCapturedChatLead(lead: CapturedLeadData): Promise<boolean> {
  try {
    const projectDetails = [
      `[Captured via BuzzleMax AI Chat Sales Assistant]`,
      `Requirement: ${lead.requirement}`,
      lead.serviceCategory ? `Category: ${lead.serviceCategory}` : null,
      lead.budget ? `Budget Range: ${lead.budget}` : null,
      lead.timeline ? `Timeline: ${lead.timeline}` : null,
    ]
      .filter(Boolean)
      .join('\n')

    await sendContactSalesEmail({
      name: lead.name || 'Chat Prospect',
      company: lead.company || 'Not provided',
      website: 'https://buzzlemax.site',
      email: lead.email,
      businessType: 'Service',
      interestedService: lead.serviceCategory || 'AI Chatbot & Automation',
      selectedPlan: 'Custom Solution',
      monthlyRevenue: lead.budget || null,
      projectDetails,
    })

    trackChatEvent('lead_info_submitted', {
      service: lead.serviceCategory,
      leadEmail: lead.email,
      leadName: lead.name,
    })

    return true
  } catch (error) {
    console.error('[BuzzleMax Chat Lead] Error submitting lead:', error)
    return false
  }
}
