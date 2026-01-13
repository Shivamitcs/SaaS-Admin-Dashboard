import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LucideIcon } from 'lucide-react'

interface ProgressCardProps {
  title: string
  value: number
  max: number
  icon: LucideIcon
  color: string
  delay?: number
}

export default function ProgressCard({
  title,
  value,
  max,
  icon: Icon,
  color,
  delay = 0,
}: ProgressCardProps) {
  const progressRef = useRef<HTMLDivElement>(null)
  const valueRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (cardRef.current) {
      // ALWAYS VISIBLE - NO HIDING
      gsap.set(cardRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationY: 0,
        clearProps: 'all',
      })

      // Animate progress bar
      const progress = (value / max) * 100
      if (progressRef.current) {
        gsap.fromTo(
          progressRef.current,
          { width: '0%' },
          {
            width: `${progress}%`,
            duration: 1.5,
            delay: delay,
            ease: 'power2.out',
          }
        )
      }

      // Animate value counter
      const counter = { value: 0 }
      gsap.to(counter, {
        value: value,
        duration: 1.5,
        delay: delay,
        ease: 'power2.out',
        onUpdate: () => {
          if (valueRef.current) {
            valueRef.current.textContent = Math.floor(counter.value).toString()
          }
        },
      })
    }
  }, [value, max, delay])

  return (
    <motion.div
      ref={cardRef}
      whileHover={{ scale: 1.02, y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {title}
        </h3>
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon size={20} className="text-white" />
        </div>
      </div>
      <div className="flex items-baseline gap-2 mb-3">
        <div
          ref={valueRef}
          className="text-3xl font-bold text-gray-900 dark:text-gray-100"
        >
          0
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          / {max}
        </div>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
        <motion.div
          ref={progressRef}
          className={`h-full ${color} rounded-full`}
          style={{ width: '0%' }}
        />
      </div>
    </motion.div>
  )
}

