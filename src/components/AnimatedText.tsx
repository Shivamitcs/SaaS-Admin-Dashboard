import { useEffect, useRef } from 'react'

interface AnimatedTextProps {
  children: string
  className?: string
  delay?: number
  splitBy?: 'chars' | 'words' | 'lines'
}

export default function AnimatedText({
  children,
  className = '',
  delay = 0,
  splitBy = 'words',
}: AnimatedTextProps) {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!textRef.current) return

    const element = textRef.current
    const text = element.textContent || ''
    
    // Split text based on splitBy prop
    let splitText: string[] = []
    if (splitBy === 'chars') {
      splitText = text.split('').filter(char => char.trim().length > 0 || char === ' ')
    } else if (splitBy === 'words') {
      splitText = text.split(' ').filter(word => word.length > 0)
    } else {
      splitText = text.split('\n').filter(line => line.length > 0)
    }

    // Clear original text
    element.textContent = ''

    // Create spans for each part with CSS animation classes
    splitText.forEach((part, index) => {
      const span = document.createElement('span')
      span.style.display = 'inline-block'
      span.style.opacity = '0'
      span.style.transform = 'translateY(20px)'
      span.style.transition = `opacity 0.6s ease-out ${delay + index * 0.05}s, transform 0.6s ease-out ${delay + index * 0.05}s`
      
      if (splitBy === 'chars') {
        if (part === ' ') {
          span.textContent = '\u00A0'
          span.style.width = '0.25em'
        } else {
          span.textContent = part
        }
      } else if (splitBy === 'words') {
        span.textContent = part
      } else {
        span.textContent = part
        span.style.display = 'block'
      }
      
      element.appendChild(span)
      
      // Add space after each word (except the last one) when splitting by words
      if (splitBy === 'words' && index < splitText.length - 1) {
        const spaceSpan = document.createElement('span')
        spaceSpan.textContent = '\u00A0'
        spaceSpan.style.display = 'inline-block'
        spaceSpan.style.width = '0.3em'
        spaceSpan.style.opacity = '1' // Spaces should be visible immediately
        element.appendChild(spaceSpan)
      }
    })

    // Use Intersection Observer to trigger animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const spans = entry.target.querySelectorAll('span')
            spans.forEach((span) => {
              span.style.opacity = '1'
              span.style.transform = 'translateY(0)'
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [children, delay, splitBy])

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  )
}

