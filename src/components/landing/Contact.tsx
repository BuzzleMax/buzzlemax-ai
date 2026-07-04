import * as React from 'react'
import { motion, useInView } from 'framer-motion'
import { Loader2, Mail, Send } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { COMPANY_INFO } from '@/lib/constants'
import { validation } from '@/lib/validation'
import { sendContactFormEmail, type ContactFormData } from '@/services/email'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export function Contact() {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const contactEmail = COMPANY_INFO.contact.email
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [formData, setFormData] = React.useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleInputChange =
    (field: keyof ContactFormData) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }))
    }

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      subject: '',
      message: '',
    })
  }

  const validateForm = (): string | null => {
    const firstNameError = validation.required(formData.firstName, 'First Name')
    if (firstNameError) return firstNameError

    const lastNameError = validation.required(formData.lastName, 'Last Name')
    if (lastNameError) return lastNameError

    const emailError = validation.email(formData.email.trim())
    if (emailError) return emailError

    const subjectError = validation.required(formData.subject, 'Subject')
    if (subjectError) return subjectError

    const messageError = validation.required(formData.message, 'Message')
    if (messageError) return messageError

    return null
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const validationError = validateForm()
    if (validationError) {
      toast.error(validationError)
      return
    }

    setIsSubmitting(true)

    try {
      await sendContactFormEmail({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      })

      toast.success('Your message has been sent successfully. We’ll get back to you within 24 hours.')
      resetForm()
    } catch (error) {
      toast.error(
        (error as { message?: string })?.message || 'Failed to send message. Please try again.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-24 lg:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Get in{' '}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-10"
        >
          <motion.div variants={itemVariants}>
            <Card className="glass h-full overflow-hidden rounded-3xl border-white/20 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.45)]">
              <CardContent className="flex h-full flex-col justify-between p-6 sm:p-8 lg:p-10">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <span className="inline-flex w-fit items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                      Contact Us
                    </span>
                    <div className="space-y-3">
                      <h3 className="max-w-sm text-3xl font-bold tracking-tight sm:text-4xl">
                        Have a project in mind?
                      </h3>
                      <p className="max-w-md text-base leading-7 text-muted-foreground">
                        Send us an email and we’ll help you map the right AI automation setup for your business.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/15 bg-white/10 p-5 sm:p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/12 text-primary ring-1 ring-primary/15">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 space-y-2">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                          Email
                        </p>
                        <a
                          href={`mailto:${contactEmail}`}
                          className="block break-all text-lg font-semibold text-foreground transition-colors hover:text-primary sm:text-xl"
                        >
                          {contactEmail}
                        </a>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm leading-6 text-muted-foreground">
                    We typically respond within 24 hours.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="glass rounded-3xl border-white/15 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.4)]">
              <CardContent className="p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">First Name</label>
                      <Input
                        placeholder="John"
                        value={formData.firstName}
                        onChange={handleInputChange('firstName')}
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Last Name</label>
                      <Input
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={handleInputChange('lastName')}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email</label>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleInputChange('email')}
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Subject</label>
                    <Input
                      placeholder="How can we help you?"
                      value={formData.subject}
                      onChange={handleInputChange('subject')}
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Message</label>
                    <Textarea
                      placeholder="Tell us about your project..."
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange('message')}
                      disabled={isSubmitting}
                    />
                  </div>
                  <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
