import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface SparkEffectProps {
  x: number
  y: number
  color?: string
  onComplete?: () => void
}

export default function SparkEffect({ x, y, color = '#ffffff', onComplete }: SparkEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const particleCount = 20

    // Create particles
    const particles: HTMLDivElement[] = []
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div')
      particle.style.position = 'absolute'
      particle.style.width = '6px'
      particle.style.height = '6px'
      particle.style.borderRadius = '50%'
      particle.style.backgroundColor = color
      particle.style.left = `${x}px`
      particle.style.top = `${y}px`
      particle.style.opacity = '0'
      particle.style.pointerEvents = 'none'
      particle.style.boxShadow = `0 0 10px ${color}`
      container.appendChild(particle)
      particles.push(particle)
    }

    // Animate particles
    particles.forEach((particle, index) => {
      const angle = (Math.PI * 2 * index) / particleCount
      const distance = 50 + Math.random() * 100
      const targetX = Math.cos(angle) * distance
      const targetY = Math.sin(angle) * distance

      gsap.to(particle, {
        x: targetX,
        y: targetY,
        opacity: 1,
        scale: 1.5,
        duration: 0.6,
        delay: index * 0.02,
        ease: 'power2.out',
      })

      gsap.to(particle, {
        opacity: 0,
        scale: 0,
        duration: 0.4,
        delay: 0.6 + index * 0.02,
        ease: 'power2.in',
        onComplete: () => {
          if (index === particleCount - 1 && onComplete) {
            onComplete()
          }
        },
      })
    })

    return () => {
      particles.forEach((particle) => particle.remove())
    }
  }, [x, y, color, onComplete])

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-50" />
}

