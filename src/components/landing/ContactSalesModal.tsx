import * as React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Mail, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { sendContactSalesEmail, type ContactSalesFormData } from '@/services/email'

interface ContactSalesModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedPlan?: string
}

export function ContactSalesModal({ open, onOpenChange, selectedPlan }: ContactSalesModalProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [status, setStatus] = React.useState<'idle' | 'success'>('idle')

  const [formData, setFormData] = React.useState<ContactSalesFormData>({
    name: '',
    company: '',
    website: '',
    email: '',
    phone: null,
    businessType: '',
    interestedService: '',
    selectedPlan: selectedPlan ?? '',
    monthlyRevenue: null,
    projectDetails: '',
  })

  React.useEffect(() => {
    if (!open) return
    setStatus('idle')
    setFormData((prev) => ({
      ...prev,
      selectedPlan: selectedPlan ?? prev.selectedPlan,
    }))
  }, [open, selectedPlan])

  const validate = (): string | null => {
    const name = formData.name.trim()
    const company = formData.company.trim()
    const website = formData.website.trim()
    const email = formData.email.trim()
    const businessType = formData.businessType.trim()
    const interestedService = formData.interestedService.trim()
    const selected = formData.selectedPlan.trim()
    const projectDetails = formData.projectDetails.trim()

    if (!name) return 'Name is required'
    if (!company) return 'Company is required'
    if (!website) return 'Business Website is required'
    if (!email) return 'Email is required'
    if (!businessType) return 'Business Type is required'
    if (!interestedService) return 'Interested Service is required'
    if (!selected) return 'Selected Plan is required'
    if (!projectDetails) return 'Project Details is required'

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) return 'Please enter a valid email address'

    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validationError = validate()
    if (validationError) {
      setStatus('idle')
      toast.error(validationError)
      return
    }

    setIsSubmitting(true)

    try {
      const payload: ContactSalesFormData = {
        name: formData.name.trim(),
        company: formData.company.trim(),
        email: formData.email.trim(),
        phone: formData.phone?.trim() || null,
        businessType: formData.businessType.trim(),
        interestedService: formData.interestedService.trim(),
        selectedPlan: formData.selectedPlan.trim(),
        monthlyRevenue: formData.monthlyRevenue?.trim() || null,
        website: formData.website.trim(),
        projectDetails: formData.projectDetails.trim(),
      }

      await sendContactSalesEmail(payload)

      setStatus('success')
      toast.success('Thank you! Your request has been sent successfully. We\'ll contact you within 24 hours.')

      setFormData({
        name: '',
        company: '',
        website: '',
        email: '',
        phone: null,
        businessType: '',
        interestedService: '',
        selectedPlan: selectedPlan ?? '',
        monthlyRevenue: null,
        projectDetails: '',
      })

      // Close modal after 2 seconds
      setTimeout(() => {
        onOpenChange(false)
      }, 2000)
    } catch (err) {
      setStatus('idle')
      toast.error(((err as { message?: string })?.message) || 'Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[720px] w-[calc(100%-2rem)] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Contact Sales</DialogTitle>
          <DialogDescription>
            Fill out the form below and our team will follow up with next steps. Typically within 24 hours.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4" />
            <a href="mailto:buzzlemaxofficial@gmail.com" className="hover:text-foreground transition-colors">
              buzzlemaxofficial@gmail.com
            </a>
          </div>

          {status === 'success' ? (
            <div className="rounded-md border border-primary/30 bg-primary/5 p-4 text-sm text-muted-foreground">
              Thank you! Your request has been sent successfully. We'll contact you within 24 hours.
            </div>
          ) : null}


          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={isSubmitting}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company *</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Business Website *</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://"
                  disabled={isSubmitting}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone (optional)</Label>
                <Input
                  id="phone"
                  value={formData.phone ?? ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value || null })}
                  placeholder="+1 ..."
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessType">Business Type *</Label>
                <Input
                  id="businessType"
                  value={formData.businessType}
                  onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                  placeholder="Retail / Service / Healthcare / etc."
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interestedService">Interested Service *</Label>
                <Input
                  id="interestedService"
                  value={formData.interestedService}
                  onChange={(e) => setFormData({ ...formData, interestedService: e.target.value })}
                  placeholder="AI Chatbot / Voice Agent / CRM automation..."
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="selectedPlan">Selected Plan *</Label>
                <Input
                  id="selectedPlan"
                  value={formData.selectedPlan}
                  onChange={(e) => setFormData({ ...formData, selectedPlan: e.target.value })}
                  placeholder="Starter / Professional / Enterprise"
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="monthlyRevenue">Monthly Revenue (optional)</Label>
                <Input
                  id="monthlyRevenue"
                  value={formData.monthlyRevenue ?? ''}
                  onChange={(e) => setFormData({ ...formData, monthlyRevenue: e.target.value || null })}
                  placeholder="$100,000"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="projectDetails">Project Details *</Label>
              <Textarea
                id="projectDetails"
                value={formData.projectDetails}
                onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                rows={6}
                disabled={isSubmitting}
                placeholder="What are you trying to automate? Channels, goals, timeline, and any constraints."
              />
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Request'
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}