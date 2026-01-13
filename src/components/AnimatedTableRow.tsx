import { useRef, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'

interface AnimatedTableRowProps {
  children: ReactNode
  index: number
  onClick?: () => void
}

export default function AnimatedTableRow({
  children,
  index,
  onClick,
}: AnimatedTableRowProps) {
  const rowRef = useRef<HTMLTableRowElement>(null)
  const highlightRef = useRef<HTMLDivElement>(null)
  const underlineRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = () => {
    if (!highlightRef.current || !underlineRef.current) return

    gsap.to(highlightRef.current, {
      opacity: 0.1,
      duration: 0.3,
      ease: 'power2.out',
    })

    gsap.fromTo(
      underlineRef.current,
      { scaleX: 0, transformOrigin: 'left' },
      {
        scaleX: 1,
        duration: 0.4,
        ease: 'power2.out',
      }
    )
  }

  const handleMouseLeave = () => {
    if (!highlightRef.current || !underlineRef.current) return

    gsap.to(highlightRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out',
    })

    gsap.to(underlineRef.current, {
      scaleX: 0,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  return (
    <motion.tr
      ref={rowRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="relative group cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
    >
      {/* Sliding highlight */}
      <div
        ref={highlightRef}
        className="absolute inset-0 bg-primary-500 opacity-0 pointer-events-none"
      />

      {/* Animated underline */}
      <div
        ref={underlineRef}
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 origin-left"
        style={{ transform: 'scaleX(0)' }}
      />

      {children}
    </motion.tr>
  )
}

