import * as React from 'react'
import { motion, useInView } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { PRICING_PLANS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { Check, Sparkles } from 'lucide-react'

type PricingProps = {
  onContactSales: (plan?: string) => void
}

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

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export function Pricing({ onContactSales }: PricingProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="pricing" className="py-24 lg:py-32 bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white tracking-tight">
            Premium AI Automation
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Custom-built solutions for measurable ROI, increased conversions, and scalable growth.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-20"
        >
          {PRICING_PLANS.map((plan) => (
            <motion.div
              key={plan.name}
              variants={cardVariants}
              className={cn('relative', plan.popular && 'md:-mt-4 md:mb-4')}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-white/20 blur-xl rounded-full" />
                    <div className="relative bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-xl border border-white/30 text-white px-6 py-2 rounded-full text-sm font-semibold tracking-wide shadow-2xl">
                      <span className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4" />
                        Most Popular
                      </span>
                    </div>
                  </motion.div>
                </div>
              )}
              <Card
                className={cn(
                  'h-full transition-all duration-500 backdrop-blur-xl border-white/10 bg-white/5 hover:bg-white/10',
                  plan.popular
                    ? 'border-white/20 shadow-2xl shadow-white/5 scale-105'
                    : 'border-white/5 hover:-translate-y-1 hover:shadow-xl hover:shadow-white/5'
                )}
              >
                <CardHeader className="text-center pb-8 pt-8">
                  <h3 className="text-xl font-semibold mb-8 text-white tracking-wider">
                    {plan.name}
                  </h3>
                  
                  {/* One-Time Setup Fee */}
                  <div className="mb-6">
                    <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">
                      {plan.isEnterprise ? 'Setup' : 'One-Time Setup'}
                    </p>
                    <div className="flex items-baseline justify-center gap-1">
                      {plan.isEnterprise && (
                        <span className="text-sm text-gray-400 mr-1">Starting at</span>
                      )}
                      <span className="text-4xl font-bold text-white tracking-tight">
                        ${plan.setupFee.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Monthly Management */}
                  <div className="mb-6">
                    <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">
                      Monthly
                    </p>
                    <div className="flex items-baseline justify-center gap-1">
                      {plan.isEnterprise && (
                        <span className="text-sm text-gray-400 mr-1">Starting at</span>
                      )}
                      <span className="text-4xl font-bold text-white tracking-tight">
                        ${plan.price.toLocaleString()}
                      </span>
                      <span className="text-gray-400">/month</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <li 
                        key={`${feature}-${index}`} 
                        className="flex items-start gap-3"
                      >
                        <Check className="h-5 w-5 text-white/80 shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-300 leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={cn(
                      'w-full font-semibold tracking-wide transition-all duration-300',
                      plan.popular
                        ? 'bg-white text-black hover:bg-white/90 shadow-lg shadow-white/20'
                        : 'bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-white/30'
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

        {/* Guarantee Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <p className="text-lg text-gray-300 leading-relaxed mb-8">
            Every solution is custom-built for your business. We focus on measurable ROI, increased conversions, reduced workload, and scalable AI automation.
          </p>
        </motion.div>

        {/* Comparison Line */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-8 py-6">
            <p className="text-sm text-gray-400 text-center leading-relaxed">
              Hiring one employee often costs <span className="text-white font-semibold">$3,000–$6,000/month</span>. A BuzzleMax AI employee works 24/7 for a fraction of that cost.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

