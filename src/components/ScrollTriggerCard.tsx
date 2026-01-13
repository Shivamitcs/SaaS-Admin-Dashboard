import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ReactNode } from 'react'

interface ScrollTriggerCardProps {
  children: ReactNode
  className?: string
  delay?: number
}

export default function ScrollTriggerCard({
  children,
  className = '',
  delay = 0,
}: ScrollTriggerCardProps) {
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
    }
  }, [delay])

  return (
    <div ref={cardRef} className={className}>
      {children}
    </div>
  )
}

