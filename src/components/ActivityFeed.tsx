import { motion, AnimatePresence } from 'framer-motion'
import { Clock, User, Settings, DollarSign } from 'lucide-react'

interface Activity {
  id: string
  type: 'user' | 'system' | 'revenue' | 'settings'
  message: string
  time: string
}

const activities: Activity[] = [
  {
    id: '1',
    type: 'user',
    message: 'New user registered: john.doe@example.com',
    time: '2 minutes ago',
  },
  {
    id: '2',
    type: 'revenue',
    message: 'Monthly subscription payment received: $299',
    time: '15 minutes ago',
  },
  {
    id: '3',
    type: 'system',
    message: 'System backup completed successfully',
    time: '1 hour ago',
  },
  {
    id: '4',
    type: 'settings',
    message: 'API key configuration updated',
    time: '2 hours ago',
  },
  {
    id: '5',
    type: 'user',
    message: 'User role changed: admin → editor',
    time: '3 hours ago',
  },
]

const iconMap = {
  user: User,
  system: Settings,
  revenue: DollarSign,
  settings: Settings,
}

const colorMap = {
  user: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
  system: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
  revenue: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400',
  settings: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
}

export default function ActivityFeed() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Recent Activity
      </h2>
      <div className="space-y-3">
        <AnimatePresence>
          {activities.map((activity, index) => {
            const Icon = iconMap[activity.type]
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className={`p-2 rounded-lg ${colorMap[activity.type]}`}>
                  <Icon size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 dark:text-gray-100">
                    {activity.message}
                  </p>
                  <div className="flex items-center gap-1 mt-1 text-xs text-gray-500 dark:text-gray-400">
                    <Clock size={12} />
                    <span>{activity.time}</span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}

