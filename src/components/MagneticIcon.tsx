import { useRef, useEffect, ReactNode } from 'react'
import { gsap } from 'gsap'
import { motion } from 'framer-motion'

interface MagneticIconProps {
  children: ReactNode
  strength?: number
  className?: string
}

export default function MagneticIcon({
  children,
  strength = 0.4,
  className = '',
}: MagneticIconProps) {
  const iconRef = useRef<HTMLDivElement>(null)
  const xTo = useRef<gsap.QuickTo>()
  const yTo = useRef<gsap.QuickTo>()

  useEffect(() => {
    if (iconRef.current) {
      xTo.current = gsap.quickTo(iconRef.current, 'x', {
        duration: 1,
        ease: 'power3.out',
      })
      yTo.current = gsap.quickTo(iconRef.current, 'y', {
        duration: 1,
        ease: 'power3.out',
      })
    }
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!iconRef.current || !xTo.current || !yTo.current) return

    const { clientX, clientY } = e
    const { width, height, left, top } = iconRef.current.getBoundingClientRect()
    const x = clientX - (left + width / 2)
    const y = clientY - (top + height / 2)

    xTo.current(x * strength)
    yTo.current(y * strength)
  }

  const handleMouseLeave = () => {
    if (!xTo.current || !yTo.current) return
    xTo.current(0)
    yTo.current(0)
  }

  return (
    <motion.div
      ref={iconRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.1 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

