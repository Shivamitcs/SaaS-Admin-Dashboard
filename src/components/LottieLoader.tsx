import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface LottieLoaderProps {
  size?: number
}

export default function LottieLoader({ size = 60 }: LottieLoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Create animated circles
    const circles = containerRef.current?.querySelectorAll('.circle')
    if (circles) {
      circles.forEach((circle, index) => {
        const el = circle as HTMLElement
        el.style.animationDelay = `${index * 0.2}s`
      })
    }
  }, [])

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center justify-center gap-2"
      style={{ width: size, height: size }}
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="circle w-3 h-3 bg-primary-500 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
            ease: 'easeInOut',
          }}
        />
      ))}
    </motion.div>
  )
}

