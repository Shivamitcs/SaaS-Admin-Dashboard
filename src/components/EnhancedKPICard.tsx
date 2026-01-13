import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { LucideIcon } from 'lucide-react'
import React from 'react'

interface EnhancedKPICardProps {
  title: string
  value: number
  change: number
  icon: LucideIcon
  color: string
  delay?: number
}

export default function EnhancedKPICard({
  title,
  value,
  change,
  icon: Icon,
  color,
  delay = 0,
}: EnhancedKPICardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const valueRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const borderRef = useRef<HTMLDivElement>(null)
  const isPositive = change >= 0

  useEffect(() => {
    if (!cardRef.current) return

    const card = cardRef.current
    let ctx = gsap.context(() => {
      // Counter animation
      if (valueRef.current) {
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
      }
    }, card)

    return () => ctx.revert()
  }, [value, delay])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || !glowRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    gsap.to(glowRef.current, {
      x: x - rect.width / 2,
      y: y - rect.height / 2,
      duration: 0.5,
      ease: 'power2.out',
    })

    // Tilt effect
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const rotateX = (e.clientY - centerY) / 20
    const rotateY = (centerX - e.clientX) / 20

    gsap.to(cardRef.current, {
      rotationX: rotateX,
      rotationY: rotateY,
      transformPerspective: 1000,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = () => {
    if (!cardRef.current || !glowRef.current) return

    gsap.to(cardRef.current, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: 'power2.out',
    })

    gsap.to(glowRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'power2.out',
    })
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 relative overflow-hidden group"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Animated glow effect */}
      <div
        ref={glowRef}
        className={`absolute w-64 h-64 ${color} rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
        style={{ transform: 'translate(-50%, -50%)' }}
      />

      {/* Animated border */}
      <div
        ref={borderRef}
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${color.replace('bg-', 'rgba(').replace('-500', ', 0.3)')}, transparent)`,
          backgroundSize: '200% 100%',
          animation: 'shimmer 2s infinite',
        }}
      />

      {/* Gradient shift background */}
      <motion.div
        className={`absolute inset-0 ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          backgroundImage: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          backgroundSize: '200% 100%',
        }}
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
            className={`p-2 rounded-lg ${color} shadow-lg`}
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

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </motion.div>
  )
}

