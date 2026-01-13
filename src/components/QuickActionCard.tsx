import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SparkEffect from './SparkEffect'

interface QuickActionCardProps {
  title: string
  icon: LucideIcon
  color: string
  onClick: () => void
  delay?: number
}

export default function QuickActionCard({
  title,
  icon: Icon,
  color,
  onClick,
  delay = 0,
}: QuickActionCardProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [spark, setSpark] = useState<{ x: number; y: number } | null>(null)

  useEffect(() => {
    if (buttonRef.current) {
      // ALWAYS VISIBLE - NO HIDING
      gsap.set(buttonRef.current, {
        opacity: 1,
        scale: 1,
        rotationY: 0,
        clearProps: 'all',
      })
    }
  }, [delay])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = buttonRef.current?.getBoundingClientRect()
    if (rect) {
      const x = rect.left + rect.width / 2
      const y = rect.top + rect.height / 2
      setSpark({ x, y })
      onClick()
    }
  }

  // Extract color from className (e.g., "bg-blue-500" -> "#3b82f6")
  const getColorFromClass = (colorClass: string): string => {
    const colorMap: { [key: string]: string } = {
      'bg-blue-500': '#3b82f6',
      'bg-green-500': '#10b981',
      'bg-purple-500': '#8b5cf6',
      'bg-orange-500': '#f97316',
    }
    return colorMap[colorClass] || '#ffffff'
  }

  return (
    <>
      <motion.button
        ref={buttonRef}
        whileHover={{ 
          scale: 1.1, 
          rotateY: 5,
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        className={`${color} rounded-xl p-6 text-white relative overflow-hidden group w-full h-full flex flex-col items-center justify-center`}
      >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: delay + 0.2, type: 'spring', stiffness: 200 }}
        className="relative z-10"
      >
        <Icon size={32} className="mb-3" />
        <h3 className="font-semibold text-lg">{title}</h3>
      </motion.div>
      
      {/* Animated background effect */}
      <motion.div
        className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      />
    </motion.button>
    
    {/* Spark effect */}
    {spark && (
      <SparkEffect
        x={spark.x}
        y={spark.y}
        color={getColorFromClass(color)}
        onComplete={() => setSpark(null)}
      />
    )}
    </>
  )
}

