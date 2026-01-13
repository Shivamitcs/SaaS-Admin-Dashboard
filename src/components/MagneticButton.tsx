import { useRef, useEffect, ReactNode } from 'react'
import { gsap } from 'gsap'
import { motion } from 'framer-motion'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

export default function MagneticButton({
  children,
  className = '',
  strength = 0.3,
  onClick,
  type = 'button',
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const xTo = useRef<gsap.QuickTo>()
  const yTo = useRef<gsap.QuickTo>()

  useEffect(() => {
    if (buttonRef.current) {
      xTo.current = gsap.quickTo(buttonRef.current, 'x', {
        duration: 1,
        ease: 'power3.out',
      })
      yTo.current = gsap.quickTo(buttonRef.current, 'y', {
        duration: 1,
        ease: 'power3.out',
      })
    }
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current || !xTo.current || !yTo.current) return

    const { clientX, clientY } = e
    const { width, height, left, top } = buttonRef.current.getBoundingClientRect()
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
        <motion.button
          ref={buttonRef}
          type={type}
          onClick={onClick}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`relative ${className}`}
          style={{ transformStyle: 'preserve-3d', display: 'flex', width: '100%' }}
        >
          {children}
        </motion.button>
      )
}

