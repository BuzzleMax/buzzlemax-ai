import { motion } from 'framer-motion'

export interface SpotlightProps {
  className?: string
  animationDuration?: number
  type?: 'neutral' | 'purple'
}

export function Spotlight({
  className = '',
  animationDuration = 20,
}: SpotlightProps) {
  return (
    <div className={`absolute inset-0 -z-10 ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-[#1F2937]/5 via-background via-60% to-[#4B5563]/3" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,_var(--tw-gradient-stops))] from-[#6B7280]/15 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_30%_60%,_var(--tw-gradient-stops))] from-[#4B5563]/10 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_30%_at_70%_70%,_var(--tw-gradient-stops))] from-[#374151]/8 via-transparent to-transparent" />
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          rotate: [0, 45, 0],
          x: ['0%', '2%', '0%'],
          y: ['0%', '-2%', '0%'],
        }}
        transition={{
          duration: animationDuration,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute left-1/3 top-1/3 -translate-x-1/2 -translate-y-1/2 h-[40rem] w-[40rem] rounded-full bg-gradient-to-br from-[#6B7280]/20 via-[#9CA3AF]/10 to-transparent blur-[100px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, -60, 0],
          x: ['0%', '-2%', '0%'],
          y: ['0%', '3%', '0%'],
        }}
        transition={{
          duration: animationDuration * 1.2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute right-1/3 bottom-1/3 translate-x-1/2 translate-y-1/2 h-[35rem] w-[35rem] rounded-full bg-gradient-to-tr from-[#4B5563]/20 via-[#9CA3AF]/10 to-transparent blur-[80px]"
      />
      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: animationDuration * 0.8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[25rem] w-[25rem] rounded-full bg-[#9CA3AF]/10 blur-[120px]"
      />
    </div>
  )
}

export function PurpleSpotlight({
  className = '',
  animationDuration = 25,
}: SpotlightProps) {
  return (
    <div className={`absolute inset-0 -z-10 ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/8 via-background via-60% to-[#A855F7]/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,_var(--tw-gradient-stops))] from-[#8B5CF6]/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_30%_60%,_var(--tw-gradient-stops))] from-[#A855F7]/10 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_30%_at_70%_70%,_var(--tw-gradient-stops))] from-[#7C3AED]/8 via-transparent to-transparent" />
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          rotate: [0, 45, 0],
          x: ['0%', '2%', '0%'],
          y: ['0%', '-2%', '0%'],
        }}
        transition={{
          duration: animationDuration,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute left-1/3 top-1/3 -translate-x-1/2 -translate-y-1/2 h-[40rem] w-[40rem] rounded-full bg-gradient-to-br from-[#7C3AED]/25 via-[#8B5CF6]/15 to-transparent blur-[100px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, -60, 0],
          x: ['0%', '-2%', '0%'],
          y: ['0%', '3%', '0%'],
        }}
        transition={{
          duration: animationDuration * 1.2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute right-1/3 bottom-1/3 translate-x-1/2 translate-y-1/2 h-[35rem] w-[35rem] rounded-full bg-gradient-to-tr from-[#A855F7]/20 via-[#8B5CF6]/10 to-transparent blur-[80px]"
      />
      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: animationDuration * 0.8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[25rem] w-[25rem] rounded-full bg-[#8B5CF6]/10 blur-[120px]"
      />
    </div>
  )
}

