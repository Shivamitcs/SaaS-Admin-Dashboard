import { useEffect, useRef, useState } from 'react'
import Lottie from 'lottie-react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { LOTTIE_ANIMATIONS } from '../data/lottieAnimations'

interface LottieAnimationProps {
  animationData?: any
  animationUrl?: string // URL to LottieFiles animation
  loop?: boolean
  autoplay?: boolean
  className?: string
  delay?: number
  type?: 'loading' | 'success' | 'chart' | 'data' | 'celebration' | 'notification'
}

// Simple loading animation JSON
const loadingAnimationData = {
  v: '5.7.4',
  fr: 30,
  ip: 0,
  op: 60,
  w: 100,
  h: 100,
  nm: 'Loading',
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: 'Circle',
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: {
          a: 1,
          k: [
            { i: { x: [0.833], y: [0.833] }, o: { x: [0.167], y: [0.167] }, t: 0, s: [0] },
            { t: 60, s: [360] },
          ],
        },
        p: { a: 0, k: [50, 50, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      ao: 0,
      shapes: [
        {
          ty: 'gr',
          it: [
            {
              d: 1,
              ty: 'el',
              s: { a: 0, k: [40, 40] },
              p: { a: 0, k: [0, 0] },
              nm: 'Ellipse Path 1',
              mn: 'ADBE Vector Shape - Ellipse',
              hd: false,
            },
            {
              ty: 'st',
              c: { a: 0, k: [0.058, 0.647, 0.914, 1] },
              o: { a: 0, k: 100 },
              w: { a: 0, k: 4 },
              lc: 2,
              lj: 1,
              ml: 4,
              bm: 0,
              nm: 'Stroke 1',
              mn: 'ADBE Vector Graphic - Stroke',
              hd: false,
            },
            {
              ty: 'tr',
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 },
              sk: { a: 0, k: 0 },
              sa: { a: 0, k: 0 },
              nm: 'Transform',
            },
          ],
          nm: 'Ellipse 1',
          np: 2,
          cix: 2,
          bm: 0,
          ix: 1,
          mn: 'ADBE Vector Group',
          hd: false,
        },
      ],
      ip: 0,
      op: 60,
      st: 0,
      bm: 0,
    },
  ],
}

// Success checkmark animation
const successAnimationData = {
  v: '5.7.4',
  fr: 60,
  ip: 0,
  op: 60,
  w: 200,
  h: 200,
  nm: 'Success',
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: 'Check',
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [100, 100, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { i: { x: [0.833, 0.833, 0.833], y: [0.833, 0.833, 0.833] }, o: { x: [0.167, 0.167, 0.167], y: [0.167, 0.167, 0.167] }, t: 0, s: [0, 0, 100] },
            { t: 30, s: [120, 120, 100] },
            { t: 60, s: [100, 100, 100] },
          ],
        },
      },
      ao: 0,
      shapes: [
        {
          ty: 'gr',
          it: [
            {
              ty: 'sh',
              ks: {
                a: 0,
                k: {
                  i: [[0, 0], [0, 0], [0, 0]],
                  o: [[0, 0], [0, 0], [0, 0]],
                  v: [[-30, 0], [0, 30], [30, 0]],
                  c: false,
                },
              },
            },
            {
              ty: 'st',
              c: { a: 0, k: [0.2, 0.8, 0.4, 1] },
              o: { a: 0, k: 100 },
              w: { a: 0, k: 8 },
              lc: 2,
              lj: 1,
              ml: 4,
              bm: 0,
              nm: 'Stroke 1',
              mn: 'ADBE Vector Graphic - Stroke',
              hd: false,
            },
            {
              ty: 'tr',
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 },
              sk: { a: 0, k: 0 },
              sa: { a: 0, k: 0 },
              nm: 'Transform',
            },
          ],
          nm: 'Check 1',
          np: 2,
          cix: 2,
          bm: 0,
          ix: 1,
          mn: 'ADBE Vector Group',
          hd: false,
        },
      ],
      ip: 0,
      op: 60,
      st: 0,
      bm: 0,
    },
  ],
}

export default function LottieAnimation({
  animationData,
  animationUrl,
  loop = true,
  autoplay = true,
  className = '',
  delay = 0,
  type = 'loading',
}: LottieAnimationProps) {
  const lottieRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [loadedData, setLoadedData] = useState<any>(null)

  // Get animation URL based on type if not provided
  const getAnimationUrl = () => {
    if (animationUrl) return animationUrl
    
    // Map types to LottieFiles URLs - using different animations for variety
    const urlMap: { [key: string]: string } = {
      loading: LOTTIE_ANIMATIONS.loadingSpinner,
      success: LOTTIE_ANIMATIONS.successCheck,
      celebration: LOTTIE_ANIMATIONS.confetti, // Use confetti for celebration
      notification: LOTTIE_ANIMATIONS.notification,
      chart: LOTTIE_ANIMATIONS.chart,
      data: LOTTIE_ANIMATIONS.data,
    }
    
    return urlMap[type] || LOTTIE_ANIMATIONS.loadingSpinner
  }

  // Load animation from URL if provided or type-based URL
  useEffect(() => {
    const urlToLoad = getAnimationUrl()
    
    // Only fetch if we have a valid URL and it's not a local animation
    if (urlToLoad && urlToLoad.startsWith('http') && !animationData) {
      fetch(urlToLoad)
        .then((res) => {
          if (!res.ok) throw new Error('Failed to fetch')
          return res.json()
        })
        .then((data) => setLoadedData(data))
        .catch((err) => {
          console.warn('Failed to load Lottie animation from URL, using default:', err)
          // Fallback to default - don't set loadedData, will use getAnimationData()
          setLoadedData(null)
        })
    }
  }, [animationUrl, type, animationData])

  useEffect(() => {
    if (lottieRef.current && delay > 0) {
      const timer = setTimeout(() => {
        lottieRef.current?.play()
      }, delay * 1000)
      return () => clearTimeout(timer)
    }
  }, [delay])

  useEffect(() => {
    if (containerRef.current && typeof window !== 'undefined') {
      // Add GSAP animation for entrance
      gsap.fromTo(
        containerRef.current,
        {
          opacity: 0,
          scale: 0.5,
          rotation: -180,
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1,
          delay: delay,
          ease: 'back.out(1.7)',
        }
      )

      // Add continuous subtle animation
      gsap.to(containerRef.current, {
        y: -5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: delay + 1,
      })
    }
  }, [delay])

  const getAnimationData = () => {
    if (loadedData) return loadedData
    if (animationData) return animationData
    
    // Fallback to default animations if URL loading failed
    if (type === 'success') return successAnimationData
    return loadingAnimationData
  }

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      className={className}
      style={{ position: 'relative' }}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={getAnimationData()}
        loop={loop}
        autoplay={autoplay}
        style={{ width: '100%', height: '100%' }}
      />
    </motion.div>
  )
}
