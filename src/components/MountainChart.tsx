import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface MountainChartProps {
  data: any[]
  dataKey: string
  dataKey2?: string
  color?: string
  color2?: string
  title?: string
  delay?: number
}

export default function MountainChart({
  data,
  dataKey,
  dataKey2,
  color = '#0ea5e9',
  color2 = '#8b5cf6',
  title,
  delay = 0,
}: MountainChartProps) {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chartRef.current) {
      // ALWAYS VISIBLE - NO HIDING
      gsap.set(chartRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        clearProps: 'all',
      })
    }
  }, [delay])

  return (
    <motion.div
      ref={chartRef}
      initial={{ opacity: 1 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
    >
      {title && (
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
          {title}
        </h3>
      )}
      <ResponsiveContainer width="100%" height={350}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.8} />
              <stop offset="95%" stopColor={color} stopOpacity={0.1} />
            </linearGradient>
            {dataKey2 && (
              <linearGradient id={`gradient-${dataKey2}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color2} stopOpacity={0.8} />
                <stop offset="95%" stopColor={color2} stopOpacity={0.1} />
              </linearGradient>
            )}
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            fill={`url(#gradient-${dataKey})`}
            strokeWidth={3}
            animationDuration={1500}
            animationBegin={delay * 1000}
          />
          {dataKey2 && (
            <Area
              type="monotone"
              dataKey={dataKey2}
              stroke={color2}
              fill={`url(#gradient-${dataKey2})`}
              strokeWidth={3}
              animationDuration={1500}
              animationBegin={(delay + 0.2) * 1000}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  )
}

