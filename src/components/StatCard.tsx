import { motion } from 'framer-motion'
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface StatCardProps {
  title: string
  value: string
  change: number
  icon: LucideIcon
  color: string
  delay?: number
  subtitle?: string
}

export default function StatCard({
  title,
  value,
  change,
  icon: Icon,
  color,
  delay = 0,
  subtitle,
}: StatCardProps) {
  const isPositive = change >= 0
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (cardRef.current) {
      // ALWAYS VISIBLE - NO HIDING
      gsap.set(cardRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        clearProps: 'all',
      })
    }
  }, [delay])

  return (
    <motion.div
      ref={cardRef}
      whileHover={{ 
        scale: 1.05, 
        y: -8,
        rotateY: 2,
        transition: { duration: 0.2 }
      }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 relative overflow-hidden"
    >
      {/* Animated background gradient */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.1, scale: 1 }}
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
          className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2"
        >
          {value}
        </motion.div>
        
        {subtitle && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
            {subtitle}
          </p>
        )}
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.4 }}
          className={`flex items-center gap-1 text-sm font-medium ${
            isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
          }`}
        >
          {isPositive ? (
            <TrendingUp size={16} />
          ) : (
            <TrendingDown size={16} />
          )}
          <span>{Math.abs(change)}%</span>
          <span className="text-gray-500 dark:text-gray-400 text-xs">vs last month</span>
        </motion.div>
      </div>
    </motion.div>
  )
}

