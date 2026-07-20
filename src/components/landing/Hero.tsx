import * as React from 'react'
import { motion, useInView } from 'framer-motion'
import { Play, Bot, BarChart3, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { COMPANY_INFO } from '@/lib/constants'
import { cn } from '@/lib/utils'


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
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
}

const featureCards = [
  { title: 'AI Chatbots', description: 'Instant support & lead qualification', icon: Bot },
  { title: 'AI Voice Agents', description: 'Calls converted into booked appointments', icon: BarChart3 },
  { title: 'CRM Automation', description: 'Pipeline updates + follow-ups—automatically', icon: Zap },
]


type HeroProps = {
  onContactSales: (plan?: string) => void
}

export function Hero({ onContactSales }: HeroProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const [isAnimated, setIsAnimated] = React.useState(false)

  React.useEffect(() => {
    if (isInView && !isAnimated) {
      setIsAnimated(true)
    }
  }, [isInView, isAnimated])

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-[#7C3AED]/[0.05] via-background via-45% to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_72%_52%_at_50%_34%,rgba(139,92,246,0.21),transparent_68%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_58%_42%_at_28%_30%,rgba(124,58,237,0.15),transparent_72%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_54%_38%_at_72%_30%,rgba(168,85,247,0.14),transparent_74%)]" />
        <motion.div
          animate={{
            x: ['-2%', '2%', '-2%'],
            y: ['0%', '-3%', '0%'],
            scale: [1, 1.04, 1],
            opacity: [0.75, 0.9, 0.75],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-1/2 top-[34%] h-[30rem] w-[calc(100vw-4rem)] max-w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.27)_0%,rgba(124,58,237,0.18)_34%,rgba(168,85,247,0.08)_58%,transparent_78%)] blur-[110px] sm:h-[42rem] sm:w-[calc(100vw-3rem)] sm:max-w-[70rem] lg:h-[54rem] lg:max-w-[82rem]"
          style={{ willChange: 'transform, opacity' }}
        />
        <motion.div
          animate={{
            x: ['1%', '-2%', '1%'],
            y: ['2%', '-1%', '2%'],
            scale: [1.02, 0.98, 1.02],
            opacity: [0.6, 0.72, 0.6],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-[42%] top-[32%] h-[26rem] w-[calc(100vw-5rem)] max-w-[48rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.24)_0%,rgba(139,92,246,0.12)_44%,transparent_74%)] blur-[130px] sm:h-[34rem] sm:w-[calc(100vw-4rem)] sm:max-w-[56rem] lg:h-[46rem] lg:max-w-[66rem]"
          style={{ willChange: 'transform, opacity' }}
        />
        <motion.div
          animate={{
            x: ['2%', '-1%', '2%'],
            y: ['-1%', '2%', '-1%'],
            scale: [0.98, 1.03, 0.98],
            opacity: [0.48, 0.6, 0.48],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-[58%] top-[30%] h-[24rem] w-[calc(100vw-5.5rem)] max-w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.24)_0%,rgba(139,92,246,0.10)_46%,transparent_76%)] blur-[140px] sm:h-[32rem] sm:w-[calc(100vw-4rem)] sm:max-w-[50rem] lg:h-[42rem] lg:max-w-[58rem]"
          style={{ willChange: 'transform, opacity' }}
        />
        {/* <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_36%,transparent_0%,rgba(2,6,23,0.03)_58%,rgba(2,6,23,0.08)_100%)]" /> */}
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-6">
              <span className="mr-2 h-2 w-2 rounded-full bg-primary animate-pulse" />
              {COMPANY_INFO.tagline}
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
            id="hero-heading"
          >
            <span className="block text-foreground">Transform Your</span>
            <span className="block bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Business with AI
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {COMPANY_INFO.description}
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="w-full sm:w-auto text-base px-8 py-3 font-semibold shadow-lg hover:shadow-xl transition-shadow"
              onClick={() => onContactSales()}
            >
              Schedule Consultation
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto text-base px-8 py-3 gap-2 font-medium"
              onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Play className="h-4 w-4 fill-current" />
              Watch Demo
            </Button>
          </motion.div>
        </motion.div>

        <div className="relative mt-16 lg:mt-24 h-64 sm:h-80 lg:h-96">
          {featureCards.map((card, index) => {
            const floatY = index % 2 === 0 ? ['-10px', '10px', '-10px'] : ['10px', '-10px', '10px']
            const floatDuration = index % 2 === 0 ? 4 : 5
            const Icon = card.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isAnimated ? { opacity: 1, scale: 1, y: floatY } : { opacity: 0, scale: 0.8 }}
                transition={{
                  scale: { duration: 0.6, delay: 0.8 + index * 0.2 },
                  y: { duration: floatDuration, repeat: Infinity, ease: 'easeInOut' },
                }}
                className={cn(
                  'absolute glass rounded-2xl p-4 shadow-2xl border border-white/10',
                  index === 0 && 'left-4 sm:left-10 top-0 w-56 sm:w-64',
                  index === 1 && 'left-1/2 -translate-x-1/2 top-4 sm:top-8 w-60 sm:w-72',
                  index === 2 && 'right-4 sm:right-10 top-0 w-56 sm:w-64'
                )}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{card.title}</h4>
                    <p className="text-xs text-muted-foreground">{card.description}</p>
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <span className="text-xs text-muted-foreground font-medium">AI Powered</span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
