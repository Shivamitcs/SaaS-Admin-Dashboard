import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Users,
  DollarSign,
  TrendingDown,
  Activity,
  Zap,
  Server,
  Clock,
  Target,
  ArrowUpRight,
  Bell,
  Settings,
  Download,
  BarChart3,
  TrendingUp,
  Globe,
  Database,
  Cpu,
  Mail,
  MessageSquare,
  FileText,
  Shield,
  Award,
} from 'lucide-react'
import EnhancedKPICard from '../components/EnhancedKPICard'
import MagneticButton from '../components/MagneticButton'
import StatCard from '../components/StatCard'
import ProgressCard from '../components/ProgressCard'
import ChartCard from '../components/ChartCard'
import ActivityFeed from '../components/ActivityFeed'
import AnimatedChart from '../components/AnimatedChart'
import QuickActionCard from '../components/QuickActionCard'
import LottieLoader from '../components/LottieLoader'
import LottieSuccess from '../components/LottieSuccess'
import LottieAnimation from '../components/LottieAnimation'
import MountainChart from '../components/MountainChart'
import GadgetCard from '../components/GadgetCard'
// Using CSS animations instead of ScrollTriggerCard
import AnimatedText from '../components/AnimatedText'
import AnimatedHeading from '../components/AnimatedHeading'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

// GSAP ScrollTrigger will be registered in useEffect

// Extended data for mountain charts
const revenueMountainData = [
  { name: 'Jan', revenue: 4000, forecast: 4500 },
  { name: 'Feb', revenue: 3200, forecast: 4000 },
  { name: 'Mar', revenue: 5000, forecast: 5500 },
  { name: 'Apr', revenue: 4800, forecast: 6000 },
  { name: 'May', revenue: 6200, forecast: 6500 },
  { name: 'Jun', revenue: 5800, forecast: 7000 },
  { name: 'Jul', revenue: 7200, forecast: 7500 },
  { name: 'Aug', revenue: 6800, forecast: 8000 },
  { name: 'Sep', revenue: 8500, forecast: 9000 },
  { name: 'Oct', revenue: 9200, forecast: 9500 },
  { name: 'Nov', revenue: 8800, forecast: 10000 },
  { name: 'Dec', revenue: 10500, forecast: 11000 },
]

const userGrowthData = [
  { month: 'Jan', active: 1200, new: 200 },
  { month: 'Feb', active: 1500, new: 250 },
  { month: 'Mar', active: 1800, new: 300 },
  { month: 'Apr', active: 2200, new: 400 },
  { month: 'May', active: 2800, new: 500 },
  { month: 'Jun', active: 3500, new: 600 },
  { month: 'Jul', active: 4200, new: 700 },
  { month: 'Aug', active: 5000, new: 800 },
]

// Removed unused data - charts were removed from UI

const revenueData = [
  { name: 'Jan', value: 4000, target: 5000 },
  { name: 'Feb', value: 3000, target: 5000 },
  { name: 'Mar', value: 5000, target: 5500 },
  { name: 'Apr', value: 4800, target: 6000 },
  { name: 'May', value: 6000, target: 6500 },
  { name: 'Jun', value: 5500, target: 7000 },
]

const userData = [
  { name: 'Mon', users: 1200, new: 150 },
  { name: 'Tue', users: 1900, new: 200 },
  { name: 'Wed', users: 3000, new: 250 },
  { name: 'Thu', users: 2800, new: 180 },
  { name: 'Fri', users: 3500, new: 300 },
  { name: 'Sat', users: 3200, new: 220 },
  { name: 'Sun', users: 3100, new: 200 },
]

const pieData = [
  { name: 'Active', value: 65, color: '#0ea5e9' },
  { name: 'Inactive', value: 25, color: '#64748b' },
  { name: 'Pending', value: 10, color: '#f59e0b' },
]

const conversionData = [
  { month: 'Jan', rate: 2.5 },
  { month: 'Feb', rate: 3.2 },
  { month: 'Mar', rate: 3.8 },
  { month: 'Apr', rate: 4.1 },
  { month: 'May', rate: 4.5 },
  { month: 'Jun', rate: 5.2 },
]

const topProducts = [
  { name: 'Premium Plan', sales: 1240, revenue: 37200 },
  { name: 'Basic Plan', sales: 890, revenue: 17800 },
  { name: 'Enterprise', sales: 156, revenue: 46800 },
  { name: 'Starter', sales: 2100, revenue: 21000 },
]

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [showSuccess, setShowSuccess] = useState(false)
  const pageRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    if (!isLoading && pageRef.current && typeof window !== 'undefined') {
      // Intersection Observer for CSS scroll animations
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-on-scroll')
              observer.unobserve(entry.target)
            }
          })
        },
        {
          threshold: 0.01,
          rootMargin: '100px 0px -50px 0px',
        }
      )

      // Observe all elements with scroll-animate classes
      const scrollElements = pageRef.current.querySelectorAll(
        '.scroll-animate-fade-up, .scroll-animate-fade-scale, .scroll-animate-slide-left, .scroll-animate-slide-right, .scroll-animate-rotate, .scroll-animate-zoom'
      )

      scrollElements.forEach((element) => {
        const htmlEl = element as HTMLElement
        // Check if element is already in viewport
        const rect = htmlEl.getBoundingClientRect()
        const isInViewport = rect.top < window.innerHeight + 200 && rect.bottom > -200
        
        if (isInViewport) {
          // Make visible immediately if already in viewport
          htmlEl.classList.add('animate-on-scroll')
        } else {
          // Observe for scroll animation
          observer.observe(element)
        }
      })

      return () => {
        observer.disconnect()
      }
    }
  }, [isLoading])

  // Header animation removed - using CSS animations instead

  const handleQuickAction = () => {
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 2000)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <LottieLoader size={80} />
        </motion.div>
      </div>
    )
  }

  return (
    <div ref={pageRef} className="space-y-8 min-h-screen pb-12">
      {/* Header Section */}
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-3">
            <AnimatedHeading
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 leading-tight"
              delay={0.1}
              specialChars={['i', 'I']}
            >
              Dashboard Overview
            </AnimatedHeading>
            <AnimatedText
              splitBy="words"
              className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed"
              delay={0.3}
            >
              Welcome back! Here's what's happening with your SaaS platform today.
            </AnimatedText>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex gap-2"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <Download size={18} />
              <span>Export</span>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

          {/* Main KPI Cards */}
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="kpi-card relative">
                <div className="absolute bottom-4 right-4 z-20 opacity-80">
                  <LottieAnimation
                    type="loading"
                    className="w-12 h-12"
                    delay={0.5}
                  />
                </div>
                <EnhancedKPICard
                  title="Active Users"
                  value={12453}
                  change={12.5}
                  icon={Users}
                  color="bg-blue-500"
                  delay={0}
                />
              </div>
              <div className="kpi-card relative">
                <div className="absolute top-4 right-4 z-20 opacity-80">
                  <LottieAnimation
                    type="success"
                    className="w-12 h-12"
                    delay={0.6}
                  />
                </div>
                <EnhancedKPICard
                  title="Revenue"
                  value={89432}
                  change={8.2}
                  icon={DollarSign}
                  color="bg-green-500"
                  delay={0.1}
                />
              </div>
              <div className="kpi-card relative">
                <div className="absolute bottom-4 right-4 z-20 opacity-80">
                  <LottieAnimation
                    type="loading"
                    className="w-12 h-12"
                    delay={0.7}
                  />
                </div>
                <EnhancedKPICard
                  title="Churn Rate"
                  value={3.2}
                  change={-15.3}
                  icon={TrendingDown}
                  color="bg-red-500"
                  delay={0.2}
                />
              </div>
              <div className="kpi-card relative">
                <div className="absolute bottom-4 right-4 z-20 opacity-80">
                  <LottieAnimation
                    type="success"
                    className="w-12 h-12"
                    delay={0.8}
                  />
                </div>
                <EnhancedKPICard
                  title="System Performance"
                  value={98.5}
                  change={2.1}
                  icon={Activity}
                  color="bg-purple-500"
                  delay={0.3}
                />
              </div>
            </div>
          </div>

      {/* Additional Stat Cards with Lottie */}
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="scroll-animate-fade-scale stagger-1">
            <GadgetCard
              title="Response Time"
              value="142ms"
              icon={Zap}
              color="bg-yellow-500"
              trend="down"
              trendValue="8.3% faster"
              subtitle="Average API response"
              delay={0}
            />
          </div>
          <div className="scroll-animate-fade-scale stagger-2">
            <GadgetCard
              title="Uptime"
              value="99.9%"
              icon={Server}
              color="bg-green-500"
              trend="up"
              trendValue="+0.1%"
              subtitle="Last 30 days"
              delay={0}
            />
          </div>
          <div className="scroll-animate-fade-scale stagger-3">
            <GadgetCard
              title="Active Sessions"
              value={2847}
              icon={Clock}
              color="bg-blue-500"
              trend="up"
              trendValue="+15.2%"
              subtitle="Currently online"
              delay={0}
            />
          </div>
          <div className="scroll-animate-fade-scale stagger-4">
            <GadgetCard
              title="Conversion Rate"
              value="5.2%"
              icon={Target}
              color="bg-purple-500"
              trend="up"
              trendValue="+12.8%"
              subtitle="Monthly average"
              delay={0}
            />
          </div>
        </div>
      </div>

      {/* More Gadgets Row */}
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="scroll-animate-fade-up stagger-1">
            <GadgetCard
              title="API Requests"
              value={1250000}
              subtitle="Last 30 days"
              icon={Globe}
              color="bg-indigo-500"
              trend="up"
              trendValue="+22%"
              delay={0}
            />
          </div>
          <div className="scroll-animate-fade-up stagger-2">
            <GadgetCard
              title="Database Size"
              value="2.4 TB"
              subtitle="Storage used"
              icon={Database}
              color="bg-pink-500"
              trend="up"
              trendValue="+5%"
              delay={0}
            />
          </div>
          <div className="scroll-animate-fade-up stagger-3">
            <GadgetCard
              title="CPU Usage"
              value="68%"
              subtitle="Average load"
              icon={Cpu}
              color="bg-orange-500"
              trend="neutral"
              trendValue="Stable"
              delay={0}
            />
          </div>
          <div className="scroll-animate-fade-up stagger-4">
            <GadgetCard
              title="Emails Sent"
              value={45600}
              subtitle="This month"
              icon={Mail}
              color="bg-cyan-500"
              trend="up"
              trendValue="+18%"
              delay={0}
            />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="w-full mb-12" style={{ height: '15vh', minHeight: '140px' }}>
        <AnimatedText
          splitBy="words"
          className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 scroll-animate-fade-up"
          delay={0.1}
        >
          Quick Actions
        </AnimatedText>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MagneticButton
            className="scroll-animate-zoom stagger-1 h-full"
            strength={0.2}
          >
            <QuickActionCard
              title="New User"
              icon={Users}
              color="bg-blue-500"
              onClick={handleQuickAction}
              delay={0}
            />
          </MagneticButton>
          <MagneticButton
            className="scroll-animate-zoom stagger-2 h-full"
            strength={0.2}
          >
            <QuickActionCard
              title="Generate Report"
              icon={BarChart3}
              color="bg-green-500"
              onClick={handleQuickAction}
              delay={0}
            />
          </MagneticButton>
          <MagneticButton
            className="scroll-animate-zoom stagger-3 h-full"
            strength={0.2}
          >
            <QuickActionCard
              title="Settings"
              icon={Settings}
              color="bg-purple-500"
              onClick={handleQuickAction}
              delay={0}
            />
          </MagneticButton>
          <MagneticButton
            className="scroll-animate-zoom stagger-4 h-full"
            strength={0.2}
          >
            <QuickActionCard
              title="Notifications"
              icon={Bell}
              color="bg-orange-500"
              onClick={handleQuickAction}
              delay={0}
            />
          </MagneticButton>
        </div>
      </div>

      {/* Mountain Charts - Revenue */}
      <div className="scroll-animate-fade-up">
        <MountainChart
          data={revenueMountainData}
          dataKey="revenue"
          dataKey2="forecast"
          color="#0ea5e9"
          color2="#8b5cf6"
          title="Revenue Growth - Mountain View"
          delay={0}
        />
      </div>

      {/* Progress Cards */}
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="scroll-animate-fade-scale stagger-1">
            <ProgressCard
              title="Monthly Goal"
              value={78}
              max={100}
              icon={Target}
              color="bg-primary-500"
              delay={0}
            />
          </div>
          <div className="scroll-animate-fade-scale stagger-2">
            <ProgressCard
              title="Storage Used"
              value={65}
              max={100}
              icon={Server}
              color="bg-green-500"
              delay={0}
            />
          </div>
          <div className="scroll-animate-fade-scale stagger-3">
            <ProgressCard
              title="API Calls"
              value={45}
              max={100}
              icon={Activity}
              color="bg-purple-500"
              delay={0}
            />
          </div>
        </div>
      </div>

      {/* User Growth Mountain Chart */}
      <div className="scroll-animate-rotate stagger-1">
        <MountainChart
          data={userGrowthData}
          dataKey="active"
          dataKey2="new"
          color="#10b981"
          color2="#f59e0b"
          title="User Growth - Active vs New Users"
          delay={0}
        />
      </div>

      {/* Engagement Mountain Chart */}


      {/* Performance Mountain Chart */}


      {/* Regular Charts Row */}
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="scroll-animate-rotate stagger-1">

            <ChartCard title="Revenue Trend" delay={0}>
              <AnimatedChart
                data={revenueData}
                type="area"
                dataKey="value"
                dataKey2="target"
                color="#0ea5e9"
                color2="#8b5cf6"
                delay={0}
              />
            </ChartCard>
          </div>

          <div className="scroll-animate-rotate stagger-2">

            <ChartCard title="User Activity" delay={0}>
              <AnimatedChart
                data={userData}
                type="bar"
                dataKey="users"
                dataKey2="new"
                color="#0ea5e9"
                color2="#10b981"
                delay={0}
              />
            </ChartCard>
          </div>
        </div>
      </div>

      {/* More Charts */}
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="scroll-animate-rotate stagger-2">
            <ChartCard title="Conversion Rate" delay={0}>
              <AnimatedChart
                data={conversionData}
                type="line"
                dataKey="rate"
                color="#10b981"
                delay={0}
              />
            </ChartCard>
          </div>

          <div>
            <ChartCard title="User Status Distribution" delay={0}>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    animationBegin={0}
                    animationDuration={1000}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </div>
      </div>

      {/* Additional Stats Row */}
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="scroll-animate-rotate stagger-1">
            <StatCard
              title="Messages"
              value="12,450"
              change={25.3}
              icon={MessageSquare}
              color="bg-blue-500"
              delay={0}
              subtitle="Total conversations"
            />
          </div>
          <div className="scroll-animate-rotate stagger-2">
            <StatCard
              title="Documents"
              value="8,920"
              change={18.7}
              icon={FileText}
              color="bg-green-500"
              delay={0}
              subtitle="Files processed"
            />
          </div>
          <div className="scroll-animate-rotate stagger-3">
            <StatCard
              title="Security Score"
              value="98/100"
              change={2.1}
              icon={Shield}
              color="bg-purple-500"
              delay={0}
              subtitle="Overall rating"
            />
          </div>
          <div className="scroll-animate-rotate stagger-4">
            <StatCard
              title="Achievements"
              value="24"
              change={4}
              icon={Award}
              color="bg-yellow-500"
              delay={0}
              subtitle="Milestones reached"
            />
          </div>
        </div>
      </div>

      {/* Bottom Row - Top Products and Activity */}
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top Products Table */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4 }}
            className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <AnimatedText
                splitBy="words"
                className="text-lg font-semibold text-gray-900 dark:text-gray-100"
                delay={0.1}
              >
                Top Products
              </AnimatedText>
              <TrendingUp className="text-primary-500" size={20} />
            </div>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5 + index * 0.1 }}
                  whileHover={{ x: 5, scale: 1.02 }}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {product.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {product.sales} sales
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 dark:text-gray-100">
                      ${product.revenue.toLocaleString()}
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                      <ArrowUpRight size={12} />
                      +12%
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Activity Feed */}
          <div className="lg:col-span-2 scroll-animate-fade-up">
            <ActivityFeed />
          </div>
        </div>
      </div>

      {/* Lottie Animation Showcase */}
      <div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 scroll-animate-fade-up">
          <AnimatedText
            splitBy="words"
            className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6"
            delay={0.1}
          >
            Live Animations Showcase
          </AnimatedText>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl border-2 border-blue-200 dark:border-blue-700"
            >
              <LottieAnimation
                animationUrl="https://assets5.lottiefiles.com/packages/lf20_jcikwtux.json"
                className="w-40 h-40"
                delay={0.1}
              />
              <p className="mt-4 text-sm font-semibold text-blue-700 dark:text-blue-300">
                Loading Animation
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl border-2 border-green-200 dark:border-green-700"
            >
              <LottieAnimation
                animationUrl="https://assets5.lottiefiles.com/packages/lf20_Sta1XK.json"
                className="w-40 h-40"
                delay={0.2}
              />
              <p className="mt-4 text-sm font-semibold text-green-700 dark:text-green-300">
                Success Animation
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl border-2 border-purple-200 dark:border-purple-700"
            >
              <LottieAnimation
                animationUrl="https://assets5.lottiefiles.com/packages/lf20_obhph3sh.json"
                className="w-40 h-40"
                delay={0.3}
              />
              <p className="mt-4 text-sm font-semibold text-purple-700 dark:text-purple-300">
                Celebration Animation
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Success Animation */}
      <AnimatePresence>
        {showSuccess && <LottieSuccess onComplete={() => setShowSuccess(false)} />}
      </AnimatePresence>
    </div>
  )
}
