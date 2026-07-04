import * as React from 'react'
import { motion, useInView } from 'framer-motion'
import { Zap, Search, Rocket } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

const steps = [
  {
    number: '01',
    title: 'Connect Your Channels & Data',
    description:
      'Integrate your CRM, inboxes, scheduling, and internal knowledge. We configure workflows so AI can qualify leads and resolve customers.',
    icon: Zap,
  },
  {
    number: '02',
    title: 'AI Qualifies & Books Appointments',
    description:
      'AI chatbots and voice agents capture intent, answer support questions, and move qualified prospects to booking—automatically.',
    icon: Search,
  },
  {
    number: '03',
    title: 'Automate Follow-ups & Reporting',
    description:
      'Email and CRM automation nurture leads, update your pipeline, and produce analytics your team can act on immediately.',
    icon: Rocket,
  },
]


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.3,
    },
  },
}

const stepVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export function HowItWorks() {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="how-it-works" className="py-24 lg:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            How It{' '}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get up and running in minutes with our simple three-step process.
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 -translate-y-1/2 h-0.5 bg-border" />

          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8"
          >
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                variants={stepVariants}
                className="relative"
              >
                <div className="flex flex-col items-center text-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg mb-6"
                  >
                    <step.icon className="h-8 w-8" />
                    <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-bold text-foreground border-2 border-background">
                      {step.number}
                    </span>
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed max-w-sm">
                    {step.description}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 -right-8 w-16">
                    <Separator className="bg-border" />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
