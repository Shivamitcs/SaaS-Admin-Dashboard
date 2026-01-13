import { useState } from 'react'
import type { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Server,
  Shield,
  Settings,
  Key,
  Palette,
  Bell,
  Lock,
} from 'lucide-react'
import ChartCard from '../components/ChartCard'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import LottieSuccess from '../components/LottieSuccess'

const engagementData = [
  { month: 'Jan', sessions: 12000, pageviews: 45000 },
  { month: 'Feb', sessions: 15000, pageviews: 52000 },
  { month: 'Mar', sessions: 18000, pageviews: 61000 },
  { month: 'Apr', sessions: 22000, pageviews: 75000 },
  { month: 'May', sessions: 25000, pageviews: 88000 },
  { month: 'Jun', sessions: 28000, pageviews: 95000 },
]

const revenueData = [
  { month: 'Jan', revenue: 45000, churn: 3200 },
  { month: 'Feb', revenue: 52000, churn: 2800 },
  { month: 'Mar', revenue: 61000, churn: 2500 },
  { month: 'Apr', revenue: 75000, churn: 2200 },
  { month: 'May', revenue: 88000, churn: 1900 },
  { month: 'Jun', revenue: 95000, churn: 1500 },
]

const usageData = [
  { day: 'Mon', api: 1200, storage: 450 },
  { day: 'Tue', api: 1900, storage: 520 },
  { day: 'Wed', api: 2300, storage: 610 },
  { day: 'Thu', api: 2800, storage: 750 },
  { day: 'Fri', api: 3200, storage: 880 },
  { day: 'Sat', api: 2900, storage: 820 },
  { day: 'Sun', api: 2500, storage: 780 },
]

export default function ReportsSettings() {
  const [activeTab, setActiveTab] = useState<'reports' | 'settings'>('reports')
  const [showSuccess, setShowSuccess] = useState(false)
  const [settings, setSettings] = useState({
    darkMode: true,
    notifications: true,
    emailAlerts: false,
    apiKey: 'sk_live_1234567890abcdef',
    brandColor: '#0ea5e9',
    companyName: 'SaaS Admin',
  })

  const handleSaveSettings = () => {
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Reports & Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          View analytics, manage system settings, and configure your platform.
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex gap-2 border-b border-gray-200 dark:border-gray-700"
      >
        <button
          onClick={() => setActiveTab('reports')}
          className={`px-6 py-3 font-medium transition-colors relative ${
            activeTab === 'reports'
              ? 'text-primary-600 dark:text-primary-400'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
          }`}
        >
          Reports
          {activeTab === 'reports' && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-400"
            />
          )}
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-6 py-3 font-medium transition-colors relative ${
            activeTab === 'settings'
              ? 'text-primary-600 dark:text-primary-400'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
          }`}
        >
          Settings
          {activeTab === 'settings' && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-400"
            />
          )}
        </button>
      </motion.div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'reports' ? (
          <motion.div
            key="reports"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Total Sessions"
                value="128,000"
                change={+15.3}
                icon={BarChart3}
                delay={0.1}
              />
              <MetricCard
                title="Engagement Rate"
                value="68.5%"
                change={+8.2}
                icon={TrendingUp}
                delay={0.2}
              />
              <MetricCard
                title="Active Users"
                value="12,453"
                change={+12.5}
                icon={Users}
                delay={0.3}
              />
              <MetricCard
                title="Revenue"
                value="$95,000"
                change={+18.7}
                icon={DollarSign}
                delay={0.4}
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartCard title="Engagement Metrics" delay={0.5}>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="sessions"
                      stackId="1"
                      stroke="#0ea5e9"
                      fill="#0ea5e9"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="pageviews"
                      stackId="2"
                      stroke="#8b5cf6"
                      fill="#8b5cf6"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Revenue & Churn" delay={0.6}>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="revenue"
                      stroke="#10b981"
                      strokeWidth={2}
                      name="Revenue"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="churn"
                      stroke="#ef4444"
                      strokeWidth={2}
                      name="Churn"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>

            <ChartCard title="Usage Statistics" delay={0.7}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={usageData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="api" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="storage" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </motion.div>
        ) : (
          <motion.div
            key="settings"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* System Monitoring */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <SystemCard
                title="Server Status"
                status="operational"
                icon={Server}
                delay={0.1}
              />
              <SystemCard
                title="Error Logs"
                status="low"
                icon={Shield}
                delay={0.2}
              />
              <SystemCard
                title="Security"
                status="secure"
                icon={Lock}
                delay={0.3}
              />
            </div>

            {/* Settings Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SettingsSection
                title="Feature Toggles"
                icon={Settings}
                delay={0.4}
              >
                <ToggleSetting
                  label="Dark Mode"
                  value={settings.darkMode}
                  onChange={(val) => setSettings({ ...settings, darkMode: val })}
                />
                <ToggleSetting
                  label="Push Notifications"
                  value={settings.notifications}
                  onChange={(val) => setSettings({ ...settings, notifications: val })}
                />
                <ToggleSetting
                  label="Email Alerts"
                  value={settings.emailAlerts}
                  onChange={(val) => setSettings({ ...settings, emailAlerts: val })}
                />
              </SettingsSection>

              <SettingsSection title="API Configuration" icon={Key} delay={0.5}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      API Key
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={settings.apiKey}
                        readOnly
                        className="flex-1 px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 font-mono text-sm"
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        Copy
                      </motion.button>
                    </div>
                  </div>
                </div>
              </SettingsSection>

              <SettingsSection title="Branding" icon={Palette} delay={0.6}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={settings.companyName}
                      onChange={(e) =>
                        setSettings({ ...settings, companyName: e.target.value })
                      }
                      className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Brand Color
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={settings.brandColor}
                        onChange={(e) =>
                          setSettings({ ...settings, brandColor: e.target.value })
                        }
                        className="w-16 h-10 rounded-lg border border-gray-200 dark:border-gray-600 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={settings.brandColor}
                        onChange={(e) =>
                          setSettings({ ...settings, brandColor: e.target.value })
                        }
                        className="flex-1 px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 font-mono"
                      />
                    </div>
                  </div>
                </div>
              </SettingsSection>

              <SettingsSection title="Security Audit" icon={Shield} delay={0.7}>
                <div className="space-y-3">
                  {[
                    { action: 'Login attempt', user: 'admin@example.com', time: '2 hours ago', status: 'success' },
                    { action: 'API key rotated', user: 'system', time: '1 day ago', status: 'success' },
                    { action: 'Failed login', user: 'unknown@example.com', time: '3 days ago', status: 'failed' },
                    { action: 'Role changed', user: 'john.doe@example.com', time: '1 week ago', status: 'success' },
                  ].map((log, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {log.action}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {log.user} • {log.time}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            log.status === 'success'
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                              : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                          }`}
                        >
                          {log.status}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </SettingsSection>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex justify-end"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSaveSettings}
                className="px-6 py-3 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-medium transition-colors"
              >
                Save Settings
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Animation */}
      {showSuccess && <LottieSuccess onComplete={() => setShowSuccess(false)} />}
    </div>
  )
}

function MetricCard({
  title,
  value,
  change,
  icon: Icon,
  delay = 0,
}: {
  title: string
  value: string
  change: number
  icon: any
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {title}
        </h3>
        <Icon size={20} className="text-primary-500" />
      </div>
      <div className="flex items-baseline gap-2">
        <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {value}
        </div>
        <div
          className={`text-sm font-medium ${
            change >= 0 ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {change >= 0 ? '+' : ''}
          {change}%
        </div>
      </div>
    </motion.div>
  )
}

function SystemCard({
  title,
  status,
  icon: Icon,
  delay = 0,
}: {
  title: string
  status: string
  icon: any
  delay?: number
}) {
  const statusColors: Record<string, string> = {
    operational: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
    low: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
    secure: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center justify-between mb-4">
        <Icon size={24} className="text-primary-500" />
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[status]}`}
        >
          {status}
        </span>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        {title}
      </h3>
    </motion.div>
  )
}

function SettingsSection({
  title,
  icon: Icon,
  children,
  delay = 0,
}: {
  title: string
  icon: any
  children: ReactNode
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center gap-3 mb-6">
        <Icon size={20} className="text-primary-500" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h3>
      </div>
      {children}
    </motion.div>
  )
}

function ToggleSetting({
  label,
  value,
  onChange,
}: {
  label: string
  value: boolean
  onChange: (val: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-0">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </span>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => onChange(!value)}
        className={`relative w-12 h-6 rounded-full transition-colors ${
          value ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
        }`}
      >
        <motion.div
          animate={{ x: value ? 24 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md"
        />
      </motion.button>
    </div>
  )
}

