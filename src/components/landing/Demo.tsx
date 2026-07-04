import * as React from 'react'
import { motion, useInView } from 'framer-motion'
import { Play, Maximize2, MessageSquare, BarChart3, Sparkles, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const demoFeatures = [
  {
    icon: MessageSquare,
    title: 'AI Chatbot for Support & Leads',
    description: 'Qualify prospects, resolve questions, and escalate with context.',
  },
  {
    icon: BarChart3,
    title: 'Voice Agent Call Qualification',
    description: 'Capture intent on calls and progress prospects to booking.',
  },
  {
    icon: Sparkles,
    title: 'Omnichannel Lead Routing',
    description: 'WhatsApp, Instagram, Messenger—handled by AI workflows.',
  },
  {
    icon: Shield,
    title: 'Internal Knowledge Base AI',
    description: 'RAG-powered answers that stay accurate with your docs.',
  },
]


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

export function Demo() {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="demo" className="py-24 lg:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            See{' '}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Buzzlemax AI
            </span>{' '}
            in Action
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Watch how our AI transforms your business workflow and helps you achieve more.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-12"
        >
          <motion.div variants={itemVariants} className="relative">
            <Card className="overflow-hidden border-border/50 shadow-2xl">
              <div className="relative aspect-video bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative z-10"
                >
                  <Button
                    size="lg"
                    className="h-16 w-16 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all"
                  >
                    <Play className="h-6 w-6 fill-current ml-1" />
                  </Button>
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3/4 h-3/4 bg-background/50 rounded-lg border-2 border-border/30 backdrop-blur-sm" />
                </div>
                <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm text-muted-foreground">
                  <Maximize2 className="h-4 w-4" />
                  <span>Interactive Demo</span>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {demoFeatures.map((feature) => {
              const Icon = feature.icon
              return (
                <motion.div key={feature.title} variants={itemVariants}>
                  <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-border/50">
                    <CardContent className="pt-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
