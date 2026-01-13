import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface AnimatedSVGIconProps {
  svgPath: string
  className?: string
  color?: string
  delay?: number
  animateOnScroll?: boolean
}

export default function AnimatedSVGIcon({
  svgPath,
  className = '',
  color = 'currentColor',
  delay = 0,
  animateOnScroll = true,
}: AnimatedSVGIconProps) {
  const pathRef = useRef<SVGPathElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!pathRef.current || !svgRef.current) return

    const path = pathRef.current
    const pathLength = path.getTotalLength()

    // Set initial state
    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
      fill: 'none',
      stroke: color,
      strokeWidth: 2,
    })

    if (animateOnScroll) {
      // Animate on scroll
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 1.5,
        delay: delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: svgRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
          once: true,
        },
        onComplete: () => {
          // Fill the path after drawing
          gsap.to(path, {
            fill: color,
            duration: 0.5,
            ease: 'power2.out',
          })
        },
      })
    } else {
      // Immediate animation
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 1.5,
        delay: delay,
        ease: 'power2.out',
        onComplete: () => {
          gsap.to(path, {
            fill: color,
            duration: 0.5,
            ease: 'power2.out',
          })
        },
      })
    }
  }, [svgPath, color, delay, animateOnScroll])

  return (
    <svg
      ref={svgRef}
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path ref={pathRef} d={svgPath} />
    </svg>
  )
}

