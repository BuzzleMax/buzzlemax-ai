import * as React from 'react'
import { motion, useInView } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import {
  Zap,
  Brain,
  Link2,
  TrendingUp,
  Lock,
  Handshake,
} from 'lucide-react'

const advantages = [
  {
    icon: Zap,
    title: 'Fast Deployment',
    description: 'Deploy production-ready AI solutions within days, not months.',
  },
  {
    icon: Brain,
    title: 'Custom AI Solutions',
    description: 'Every AI assistant is tailored specifically to the client\'s business goals.',
  },
  {
    icon: Link2,
    title: 'Powerful Integrations',
    description: 'Connect AI with WhatsApp, Instagram, CRM systems, websites, email, calendars, Slack, Discord, and more.',
  },
  {
    icon: TrendingUp,
    title: 'Growth Focused',
    description: 'Every solution is designed to increase conversions, reduce manual work, and improve customer experience.',
  },
  {
    icon: Lock,
    title: 'Secure & Reliable',
    description: 'Modern architecture, secure APIs, scalable infrastructure, and reliable performance.',
  },
  {
    icon: Handshake,
    title: 'Long-Term Partnership',
    description: 'Ongoing optimization, maintenance, updates, and dedicated support after deployment.',
  },
]

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

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export function WhyChooseUs() {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="why-choose-us" className="py-24 lg:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Why Businesses Choose{' '}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Buzzlemax AI
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We don't just build AI tools—we build automation systems that help businesses save time, generate more leads, and grow faster.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {advantages.map((advantage) => {
            const Icon = advantage.icon
            return (
              <motion.div
                key={advantage.title}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <Card className="h-full transition-all duration-300 hover:shadow-xl border-border/50 bg-background/80 backdrop-blur-sm group cursor-pointer">
                  <CardContent className="pt-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                      {advantage.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {advantage.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}