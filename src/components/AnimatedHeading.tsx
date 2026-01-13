import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface AnimatedHeadingProps {
  children: string
  className?: string
  delay?: number
  specialChars?: string[] // Characters that should have special animation
}

export default function AnimatedHeading({
  children,
  className = '',
  delay = 0,
  specialChars = ['i', 'I'],
}: AnimatedHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const text = container.textContent || ''
    
    // Clear container
    container.innerHTML = ''

    // Split text into characters
    const chars = text.split('')
    
    chars.forEach((char, index) => {
      const span = document.createElement('span')
      
      // Handle spaces properly
      if (char === ' ') {
        span.textContent = '\u00A0' // Non-breaking space
        span.style.width = '0.25em' // Proper space width
        span.style.display = 'inline-block'
        container.appendChild(span)
        return
      }
      
      span.textContent = char
      span.style.display = 'inline-block'
      span.style.opacity = '0'
      span.style.transform = 'translateY(20px) rotateX(90deg)'
      
      // Check if this is a special character
      const isSpecial = specialChars.includes(char)
      
      if (isSpecial) {
        span.classList.add('special-char')
        // Special animation for 'i' - similar to GSAP.com
        span.style.transformOrigin = 'center center'
        span.style.transformStyle = 'preserve-3d'
      }
      
      container.appendChild(span)
    })

    // Animate with GSAP
    const spans = container.querySelectorAll('span')
    let charIndex = 0
    
    spans.forEach((span) => {
      // Skip spaces (they're already visible)
      if (span.textContent === '\u00A0' || span.style.width === '0.25em') {
        return
      }
      
      const isSpecial = span.classList.contains('special-char')
      const charDelay = delay + charIndex * 0.03
      charIndex++
      
      if (isSpecial) {
        // Special animation for 'i' - rotate and scale with bounce, then continuous flip
        gsap.fromTo(
          span,
          {
            opacity: 0,
            y: 20,
            rotateX: 90,
            scale: 0.5,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            duration: 0.8,
            delay: charDelay,
            ease: 'back.out(1.7)',
            onComplete: () => {
              // Continuous 180-degree vertical flip animation
              gsap.to(span, {
                rotateX: 180,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: 'power2.inOut',
                transformOrigin: 'center center',
              })
            },
          }
        )
      } else {
        // Regular character animation
        gsap.fromTo(
          span,
          {
            opacity: 0,
            y: 20,
            rotateX: 90,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.6,
            delay: charDelay,
            ease: 'power3.out',
          }
        )
      }
    })
  }, [children, delay, specialChars])

  return (
    <div 
      ref={containerRef} 
      className={className}
      style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  )
}

