import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface KPICardProps {
  title: string
  value: number
  change: number
  icon: LucideIcon
  color: string
  delay?: number
}

export default function KPICard({
  title,
  value,
  change,
  icon: Icon,
  color,
  delay = 0,
}: KPICardProps) {
  const valueRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const isPositive = change >= 0

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
    }

    // Animate counter
    const counter = { value: 0 }
    gsap.to(counter, {
      value: value,
      duration: 2,
      delay: delay + 0.3,
      ease: 'power2.out',
      onUpdate: () => {
        if (valueRef.current) {
          valueRef.current.textContent = Math.floor(counter.value).toLocaleString()
        }
      },
    })
  }, [value, delay])

  return (
    <motion.div
      ref={cardRef}
      whileHover={{ 
        scale: 1.05, 
        y: -8,
        rotateY: 2,
        transition: { duration: 0.2 }
      }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all relative overflow-hidden"
    >
      {/* Animated background gradient */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.05, scale: 1 }}
        transition={{ delay: delay + 0.3, duration: 0.8 }}
        className={`absolute top-0 right-0 w-32 h-32 ${color} rounded-full blur-3xl`}
      />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </h3>
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: delay + 0.2, type: 'spring', stiffness: 200 }}
            className={`p-2 rounded-lg ${color}`}
          >
            <Icon size={20} className="text-white" />
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: delay + 0.1 }}
          className="flex items-baseline gap-2"
        >
          <div
            ref={valueRef}
            className="text-3xl font-bold text-gray-900 dark:text-gray-100"
          >
            0
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: delay + 0.4 }}
            className={`text-sm font-medium flex items-center gap-1 ${
              isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}
          >
            <span>{isPositive ? '↑' : '↓'}</span>
            <span>{Math.abs(change)}%</span>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

