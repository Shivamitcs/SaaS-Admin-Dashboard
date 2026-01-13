import { useEffect, useRef, ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  stagger?: number
}

export default function AnimatedSection({
  children,
  className = '',
  stagger = 0.1,
}: AnimatedSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (sectionRef.current) {
      const section = sectionRef.current
      const children = section.children

      // Wait for DOM to be ready
      setTimeout(() => {
        // Check if section is in viewport
        const rect = section.getBoundingClientRect()
        const isInView = rect.top < window.innerHeight

        if (!isInView && children.length > 0) {
          // Set initial state for all children
          gsap.set(children, {
            opacity: 0,
            y: 80,
            scale: 0.8,
            rotationX: -15,
          })

          // Animate each child with stagger
          const animation = gsap.to(children, {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
            duration: 0.8,
            stagger: stagger,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
              once: true,
            },
          })

          return () => {
            animation.scrollTrigger?.kill()
          }
        } else {
          // If in view, make all visible immediately
          gsap.set(children, {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
          })
        }
      }, 150)
    }
  }, [stagger])

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  )
}

