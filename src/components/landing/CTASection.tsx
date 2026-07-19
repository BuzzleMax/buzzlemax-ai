import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

type CTASectionProps = {
  onContactSales: (plan?: string) => void
}

export function CTASection({ onContactSales }: CTASectionProps) {

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden" aria-labelledby="cta-heading">
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary/30 blur-3xl"
        />
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center"
        >
          <h2 id="cta-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-foreground tracking-tight">
            Ready to{' '}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Transform
            </span>{' '}
            Your Business?
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Turn every chat, call, and message into qualified leads and booked appointments—powered by AI support, voice agents, CRM automation, and omnichannel workflows.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="w-full sm:w-auto text-base px-8 py-3 gap-2 group font-semibold shadow-lg hover:shadow-xl transition-shadow active:scale-95"
              onClick={() => onContactSales()}
            >
              Schedule Consultation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>

            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto text-base px-8 py-3 font-medium hover:shadow-lg transition-shadow active:scale-95"
              onClick={() => onContactSales()}
            >
              Schedule Demo
            </Button>

          </div>
        </motion.div>
      </div>
    </section>
  )
}

