import * as React from 'react'
import { motion, useInView } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { MessageSquare, Phone, Headphones, TrendingUp, Filter, Calendar, Database, Mail, MessageCircle, Instagram, BookOpen, Cog, ArrowRight, Check, Sparkles, PhoneCall } from 'lucide-react'
import { AI_SOLUTIONS_PLANS } from '@/lib/constants'

type AISolution = {
  id: string
  title: string
  description: string
  icon: React.ReactNode
}

type AISolutionsProps = {
  onContactSales: (plan?: string) => void
}

const solutions: AISolution[] = [
  {
    id: 'ai-chatbots',
    title: 'AI Chatbots',
    description: 'Intelligent conversational agents that handle customer inquiries, qualify leads, and provide 24/7 support across your website and messaging platforms.',
    icon: <MessageSquare className="h-6 w-6" />,
  },
  {
    id: 'ai-voice-agents',
    title: 'AI Voice Agents',
    description: 'Natural-sounding voice assistants that answer calls, schedule appointments, and convert conversations into qualified opportunities.',
    icon: <Phone className="h-6 w-6" />,
  },
  {
    id: 'customer-support-ai',
    title: 'Customer Support AI',
    description: 'Automated support systems that resolve common issues instantly while routing complex queries to your team with full context.',
    icon: <Headphones className="h-6 w-6" />,
  },
  {
    id: 'sales-ai',
    title: 'Sales AI',
    description: 'AI-powered sales assistants that engage prospects, follow up on leads, and close deals faster with personalized conversations.',
    icon: <TrendingUp className="h-6 w-6" />,
  },
  {
    id: 'lead-qualification',
    title: 'Lead Qualification',
    description: 'Smart lead scoring and qualification systems that identify high-intent prospects and automatically route them to your sales team.',
    icon: <Filter className="h-6 w-6" />,
  },
  {
    id: 'appointment-booking',
    title: 'Appointment Booking',
    description: 'Automated scheduling systems that handle bookings, send reminders, and sync with your calendar to eliminate back-and-forth emails.',
    icon: <Calendar className="h-6 w-6" />,
  },
  {
    id: 'crm-automation',
    title: 'CRM Automation',
    description: 'Streamline your customer relationship management with AI that updates records, tracks interactions, and maintains your pipeline automatically.',
    icon: <Database className="h-6 w-6" />,
  },
  {
    id: 'email-automation',
    title: 'Email Automation',
    description: 'Intelligent email workflows that nurture leads, follow up on conversations, and maintain relationships without manual effort.',
    icon: <Mail className="h-6 w-6" />,
  },
  {
    id: 'whatsapp-ai',
    title: 'WhatsApp AI',
    description: 'Automated WhatsApp business messaging that handles customer queries, processes orders, and drives engagement on the world\'s most popular chat platform.',
    icon: <MessageCircle className="h-6 w-6" />,
  },
  {
    id: 'instagram-ai',
    title: 'Instagram AI',
    description: 'AI-powered Instagram automation that responds to DMs, comments, and stories while maintaining your brand voice and converting followers to customers.',
    icon: <Instagram className="h-6 w-6" />,
  },
  {
    id: 'internal-knowledge-base',
    title: 'Internal Knowledge Base AI',
    description: 'Smart internal assistants that help your team find answers, access documentation, and get instant help with company processes and policies.',
    icon: <BookOpen className="h-6 w-6" />,
  },
  {
    id: 'custom-ai-automation',
    title: 'Custom AI Automation',
    description: 'Tailored AI solutions built for your unique business workflows, processes, and automation needs that don\'t fit standard categories.',
    icon: <Cog className="h-6 w-6" />,
  },
]

export function AISolutions({ onContactSales }: AISolutionsProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const pricingRef = React.useRef<HTMLDivElement>(null)
  const isPricingInView = useInView(pricingRef, { once: true, margin: '-100px' })

  const scrollToContactSales = () => {
    onContactSales()
  }

  return (
    <section id="solutions" className="py-24 lg:py-32 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Section heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            AI Solutions We Build
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Custom AI systems built to automate sales, customer support, operations, and business workflows.
          </p>
        </motion.div>

        {/* ── Solution cards grid ── */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-24"
        >
          {solutions.map((solution, idx) => (
            <motion.div
              key={solution.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
            >
              <Card
                className={cn(
                  'h-full border-border/50 bg-background/60 backdrop-blur transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group cursor-pointer'
                )}
              >
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      {solution.icon}
                    </div>
                    <CardTitle className="text-lg">{solution.title}</CardTitle>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{solution.description}</p>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="ghost"
                    className="w-full justify-between px-4 text-primary hover:text-primary hover:bg-primary/5 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground"
                    onClick={scrollToContactSales}
                  >
                    <span>Learn More</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* ── AI Pricing Plans ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="mb-4 inline-flex w-fit items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            AI Plans & Pricing
          </span>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 mt-3">
            Transparent AI Automation Pricing
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that matches your scale. All plans include a one-time custom setup fee and a monthly management retainer.
          </p>
        </motion.div>

        <motion.div
          ref={pricingRef}
          initial={{ opacity: 0 }}
          animate={isPricingInView ? { opacity: 1 } : undefined}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-12"
        >
          {AI_SOLUTIONS_PLANS.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isPricingInView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className={cn('relative', plan.popular && 'md:-mt-4 md:mb-4')}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
                  <div className="relative bg-gradient-to-r from-primary/80 to-primary/60 backdrop-blur border border-primary/40 text-primary-foreground px-6 py-2 rounded-full text-sm font-semibold tracking-wide shadow-xl">
                    <span className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      Most Popular
                    </span>
                  </div>
                </div>
              )}
              <Card
                className={cn(
                  'h-full transition-all duration-500 border-border/50 bg-background/60 backdrop-blur',
                  plan.popular
                    ? 'border-primary/30 shadow-2xl shadow-primary/10 scale-105'
                    : 'border-border/30 hover:-translate-y-1 hover:shadow-xl'
                )}
              >
                <CardHeader className="text-center pb-6 pt-8">
                  <h4 className="text-xl font-bold mb-6 tracking-wider text-foreground">{plan.name}</h4>

                  {/* Setup fee */}
                  <div className="mb-5">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                      {plan.isEnterprise ? 'Setup' : 'One-Time Setup'}
                    </p>
                    <div className="flex flex-col items-center gap-0.5">
                      {plan.isEnterprise ? (
                        <span className="text-2xl font-bold">{plan.setupFeeRupees}</span>
                      ) : (
                        <>
                          <span className="text-4xl font-bold tracking-tight">
                            ${plan.setupFee.toLocaleString()}
                          </span>
                          {plan.setupFeeRupees && (
                            <span className="text-xs text-muted-foreground">({plan.setupFeeRupees})</span>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  {/* Monthly fee */}
                  {plan.price > 0 && (
                    <div className="mb-2">
                      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Monthly</p>
                      <div className="flex flex-col items-center gap-0.5">
                        <span className="text-4xl font-bold tracking-tight">
                          ${plan.price.toLocaleString()}
                          <span className="text-base font-normal text-muted-foreground">/mo</span>
                        </span>
                        {plan.priceRupees && (
                          <span className="text-xs text-muted-foreground">({plan.priceRupees})</span>
                        )}
                      </div>
                    </div>
                  )}
                </CardHeader>

                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {plan.usage && plan.usage.length > 0 && (
                    <div className="mb-6 pt-4 border-t border-border/50">
                      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Usage Included</p>
                      <ul className="space-y-2">
                        {plan.usage.map((u, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="h-3.5 w-3.5 text-primary/60 shrink-0 mt-0.5" />
                            <span className="text-xs text-muted-foreground">{u}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <Button
                    className={cn(
                      'w-full font-semibold tracking-wide transition-all duration-300',
                      plan.popular
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg'
                        : 'bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-primary-foreground'
                    )}
                    size="lg"
                    onClick={() => onContactSales(plan.name)}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* ── AI Audit Call banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="rounded-2xl border border-primary/20 bg-primary/5 backdrop-blur px-8 py-7 flex flex-col sm:flex-row items-center gap-6 justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-primary/15 flex items-center justify-center text-primary shrink-0">
                <PhoneCall className="h-6 w-6" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Custom AI Audit Call</p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Have custom requirements? Book a 1-on-1 AI strategy audit with our team — starting at <span className="font-semibold text-foreground">$300 (~$60)</span>. We'll map out exactly what to build for your business.
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              className="shrink-0 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground"
              onClick={scrollToContactSales}
            >
              Book Audit Call
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}