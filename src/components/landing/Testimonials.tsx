import * as React from 'react'
import { motion, useInView } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'Founder',
    quote:
      'Our AI chatbot instantly handles support and qualifies leads. We saw booked meetings increase while our team stopped chasing “maybe” prospects.',
    initials: 'SM',
    color: 'bg-blue-500',
  },
  {
    name: 'David Chen',
    role: 'RevOps Manager',
    quote:
      'Voice agents turned calls into appointments, and the CRM updates happen automatically. It’s the first automation that truly matches our pipeline.',
    initials: 'DC',
    color: 'bg-emerald-500',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Customer Support Lead',
    quote:
      'Internal Knowledge Base AI answers customers with our own documentation. Deflection is higher and escalations include the full context.',
    initials: 'ER',
    color: 'bg-purple-500',
  },
]


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
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

export function Testimonials() {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-muted/30" aria-labelledby="testimonials-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 id="testimonials-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Loved by{' '}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Businesses
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Built for teams that want measurable pipeline growth—AI support, voice agents, lead qualification, and CRM automation.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div key={testimonial.name} variants={cardVariants}>
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-border/50 hover:border-primary/30 relative">
                <CardContent className="pt-6">
                  <Quote className="absolute top-6 right-6 h-8 w-8 text-primary/10" />
                  <p className="text-muted-foreground leading-relaxed mb-6 relative z-10">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className={cn(testimonial.color, 'text-white font-semibold')}>
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
