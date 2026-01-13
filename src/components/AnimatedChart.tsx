import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface AnimatedChartProps {
  data: any[]
  type: 'line' | 'area' | 'bar'
  dataKey: string
  dataKey2?: string
  color?: string
  color2?: string
  delay?: number
}

export default function AnimatedChart({
  data,
  type,
  dataKey,
  dataKey2,
  color = '#0ea5e9',
  color2 = '#8b5cf6',
  delay = 0,
}: AnimatedChartProps) {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chartRef.current) {
      // ALWAYS VISIBLE - NO HIDING
      gsap.set(chartRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationY: 0,
        clearProps: 'all',
      })
    }
  }, [delay])

  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={3}
              dot={{ fill: color, r: 4 }}
              animationDuration={1000}
            />
            {dataKey2 && (
              <Line
                type="monotone"
                dataKey={dataKey2}
                stroke={color2}
                strokeWidth={3}
                dot={{ fill: color2, r: 4 }}
                animationDuration={1000}
              />
            )}
          </LineChart>
        )
      case 'area':
        return (
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              fill={color}
              fillOpacity={0.6}
              animationDuration={1000}
            />
            {dataKey2 && (
              <Area
                type="monotone"
                dataKey={dataKey2}
                stroke={color2}
                fill={color2}
                fillOpacity={0.4}
                animationDuration={1000}
              />
            )}
          </AreaChart>
        )
      case 'bar':
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey={dataKey}
              fill={color}
              radius={[8, 8, 0, 0]}
              animationDuration={1000}
            />
            {dataKey2 && (
              <Bar
                dataKey={dataKey2}
                fill={color2}
                radius={[8, 8, 0, 0]}
                animationDuration={1000}
              />
            )}
          </BarChart>
        )
    }
  }

  return (
    <motion.div
      ref={chartRef}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
      className="w-full h-full"
    >
      <ResponsiveContainer width="100%" height={300}>
        {renderChart()}
      </ResponsiveContainer>
    </motion.div>
  )
}

