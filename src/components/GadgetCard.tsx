import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LucideIcon } from 'lucide-react'
import LottieAnimation from './LottieAnimation'

interface GadgetCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  color: string
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
  lottieData?: any
  delay?: number
}

export default function GadgetCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color,
  trend,
  trendValue,
  lottieData,
  delay = 0,
}: GadgetCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const valueRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (cardRef.current) {
      // ALWAYS VISIBLE - NO HIDING
      gsap.set(cardRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        rotationY: 0,
        z: 0,
        clearProps: 'all',
      })
    }

    // Animate value if it's a number
    if (typeof value === 'number' && valueRef.current) {
      const counter = { value: 0 }
      gsap.to(counter, {
        value: value,
        duration: 2,
        delay: delay + 0.5,
        ease: 'power2.out',
        onUpdate: () => {
          if (valueRef.current) {
            valueRef.current.textContent = Math.floor(counter.value).toLocaleString()
          }
        },
      })
    }
  }, [value, delay])

  return (
    <motion.div
      ref={cardRef}
      whileHover={{ 
        scale: 1.05, 
        y: -10,
        rotateY: 5,
        transition: { duration: 0.2 }
      }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 relative overflow-hidden group"
    >
      {/* Animated background */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ delay: delay + 0.5, duration: 1 }}
        className={`absolute top-0 right-0 w-40 h-40 ${color} rounded-full blur-3xl`}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </h3>
          <div className={`p-3 rounded-xl ${color} shadow-lg`}>
            <Icon size={24} className="text-white" />
          </div>
        </div>

        {lottieData && (
          <div className="mb-4 h-20 flex items-center justify-center">
            <LottieAnimation
              animationData={lottieData}
              className="w-20 h-20"
              delay={delay + 0.2}
            />
          </div>
        )}

        <div className="mb-2">
          {typeof value === 'number' ? (
            <div
              ref={valueRef}
              className="text-4xl font-bold text-gray-900 dark:text-gray-100"
            >
              0
            </div>
          ) : (
            <div className="text-4xl font-bold text-gray-900 dark:text-gray-100">
              {value}
            </div>
          )}
        </div>

        {subtitle && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            {subtitle}
          </p>
        )}

        {trend && trendValue && (
          <div
            className={`flex items-center gap-2 text-sm font-medium ${
              trend === 'up'
                ? 'text-green-600 dark:text-green-400'
                : trend === 'down'
                ? 'text-red-600 dark:text-red-400'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            <span>{trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'}</span>
            <span>{trendValue}</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}

