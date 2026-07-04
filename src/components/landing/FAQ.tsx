import * as React from 'react'
import { motion, useInView } from 'framer-motion'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Card, CardContent } from '@/components/ui/card'

const faqs = [
  {
    q: 'How fast can we go live? ',
    a: 'Most teams launch their AI chat and lead qualification flow in days. We start with your top use case, connect the right channels, and then iterate for performance.',
  },
  {
    q: 'What exactly does “AI voice agents” do?',
    a: 'Voice agents capture intent on calls, verify key details, answer common questions, and progress prospects to booking—so your team spends time on high-fit leads only.',
  },
  {
    q: 'Do you integrate with our CRM and inbox?',
    a: 'Yes. We connect your lead sources and keep your CRM updated automatically—status changes, enriched details, follow-ups, and appointment scheduling triggers.',
  },
  {
    q: 'Can we choose which services to include?',
    a: 'Absolutely. Each plan includes the core capabilities; we tailor the setup to your business workflow and can expand with additional channels and automation.',
  },
  {
    q: 'Is training or ongoing management required?',
    a: 'No complex training needed. We configure the system to use your knowledge base and workflows, then monitor performance so your setup stays accurate and effective.',
  },
] as const

export function FAQ() {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="faq" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Quick answers about our AI automation, voice agents, lead qualification, and how the onboarding works.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          <div className="lg:col-span-2">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.6 }}
            >
              <Accordion type="single" defaultValue={0}>
                <div className="rounded-lg border border-border/50 overflow-hidden">

                  {faqs.map((item, idx) => (
                    <AccordionItem key={item.q} value={idx}>
                      <AccordionTrigger value={idx} className="px-5">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent value={idx} className="px-5">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </div>
              </Accordion>
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <Card className="h-full border-border/50 bg-muted/20">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Not seeing your question?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Tell us what you’re trying to automate—we’ll recommend the fastest path to a working solution.
                </p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-2 w-2 rounded-full bg-primary" />
                    <span>AI chatbots for support & lead qualification</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-2 w-2 rounded-full bg-primary" />
                    <span>Voice agents that convert calls to appointments</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-2 w-2 rounded-full bg-primary" />
                    <span>CRM + inbox automation end-to-end</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

