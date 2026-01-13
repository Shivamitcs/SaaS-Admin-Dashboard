import { useState, useEffect, useRef } from 'react'
import { Moon, Sun, Bell, User, Settings, LogOut, UserCircle, Mail, Shield, CreditCard, HelpCircle, ChevronDown } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { motion, AnimatePresence } from 'framer-motion'

// Dummy notification data
const notifications = [
  {
    id: 1,
    title: 'New user registered',
    message: 'John Doe has joined the platform',
    time: '2 minutes ago',
    type: 'success',
    unread: true,
  },
  {
    id: 2,
    title: 'System update available',
    message: 'Version 2.1.0 is now available',
    time: '1 hour ago',
    type: 'info',
    unread: true,
  },
  {
    id: 3,
    title: 'Payment received',
    message: 'Payment of $1,200 received from ABC Corp',
    time: '3 hours ago',
    type: 'success',
    unread: false,
  },
  {
    id: 4,
    title: 'Security alert',
    message: 'Unusual login activity detected',
    time: '5 hours ago',
    type: 'warning',
    unread: true,
  },
  {
    id: 5,
    title: 'Monthly report ready',
    message: 'Your monthly analytics report is ready',
    time: '1 day ago',
    type: 'info',
    unread: false,
  },
]

// Profile menu items
const profileMenuItems = [
  { icon: UserCircle, label: 'Profile', action: () => console.log('Profile clicked') },
  { icon: Settings, label: 'Settings', action: () => console.log('Settings clicked') },
  { icon: CreditCard, label: 'Billing', action: () => console.log('Billing clicked') },
  { icon: Shield, label: 'Security', action: () => console.log('Security clicked') },
  { icon: HelpCircle, label: 'Help & Support', action: () => console.log('Help clicked') },
  { icon: LogOut, label: 'Logout', action: () => console.log('Logout clicked'), divider: true },
]

export default function TopNav() {
  const { theme, toggleTheme } = useTheme()
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const notificationsRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false)
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Prevent horizontal scroll when dropdowns are open
  useEffect(() => {
    if (notificationsOpen || profileOpen) {
      document.body.style.overflowX = 'hidden'
    } else {
      document.body.style.overflowX = ''
    }
    return () => {
      document.body.style.overflowX = ''
    }
  }, [notificationsOpen, profileOpen])

  const unreadCount = notifications.filter(n => n.unread).length

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 md:px-6 py-4 relative z-50"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center md:ml-0 ml-14">
          <h1 className="text-xl md:text-2xl font-bold text-primary-600 dark:text-primary-400">
            <span className="hidden sm:inline">SHIVAM ITCS</span>
            <span className="sm:hidden">SHIVAM</span>
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>

          {/* Notifications Dropdown */}
          <div ref={notificationsRef} className="relative">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setNotificationsOpen(!notificationsOpen)
                setProfileOpen(false)
              }}
              className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"
                />
              )}
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </motion.button>

            <AnimatePresence>
              {notificationsOpen && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setNotificationsOpen(false)}
                    className="fixed inset-0 z-40"
                  />
                  <motion.div
                    ref={notificationsRef}
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-80 max-w-[calc(100vw-2rem)] bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden"
                    style={{ maxWidth: 'min(20rem, calc(100vw - 2rem))' }}
                  >
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">Notifications</h3>
                      {unreadCount > 0 && (
                        <span className="text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-2 py-1 rounded-full">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    <div className="max-h-96 overflow-y-auto overflow-x-hidden">
                      {notifications.length === 0 ? (
                        <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                          <Bell size={32} className="mx-auto mb-2 opacity-50" />
                          <p>No notifications</p>
                        </div>
                      ) : (
                        notifications.map((notification, index) => (
                          <motion.div
                            key={notification.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => {
                              console.log('Notification clicked:', notification.id)
                              setNotificationsOpen(false)
                            }}
                            className={`p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                              notification.unread ? 'bg-primary-50/50 dark:bg-primary-900/10' : ''
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className={`p-2 rounded-lg ${
                                  notification.type === 'success'
                                    ? 'bg-green-100 dark:bg-green-900/30'
                                    : notification.type === 'warning'
                                    ? 'bg-yellow-100 dark:bg-yellow-900/30'
                                    : 'bg-blue-100 dark:bg-blue-900/30'
                                }`}
                              >
                                {notification.type === 'success' ? (
                                  <Bell size={16} className="text-green-600 dark:text-green-400" />
                                ) : notification.type === 'warning' ? (
                                  <Bell size={16} className="text-yellow-600 dark:text-yellow-400" />
                                ) : (
                                  <Mail size={16} className="text-blue-600 dark:text-blue-400" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0 overflow-hidden">
                                <div className="flex items-center gap-2 mb-1">
                                  <p className="font-medium text-sm text-gray-900 dark:text-gray-100 truncate">
                                    {notification.title}
                                  </p>
                                  {notification.unread && (
                                    <span className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0"></span>
                                  )}
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 break-words">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1 truncate">
                                  {notification.time}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        ))
                      )}
                    </div>
                    {notifications.length > 0 && (
                      <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                        <button
                          onClick={() => {
                            console.log('View all notifications')
                            setNotificationsOpen(false)
                          }}
                          className="w-full text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
                        >
                          View all notifications
                        </button>
                      </div>
                    )}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Profile Dropdown */}
          <div ref={profileRef} className="relative">
            <motion.div
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                setProfileOpen(!profileOpen)
                setNotificationsOpen(false)
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center">
                <User size={18} className="text-white" />
              </div>
              <span className="hidden md:block font-medium">Admin</span>
              <ChevronDown
                size={16}
                className={`hidden md:block transition-transform ${profileOpen ? 'rotate-180' : ''}`}
              />
            </motion.div>

            <AnimatePresence>
              {profileOpen && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setProfileOpen(false)}
                    className="fixed inset-0 z-40"
                  />
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden"
                  >
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center">
                          <User size={20} className="text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-gray-100">Admin User</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">admin@shivamitcs.in</p>
                        </div>
                      </div>
                    </div>
                    <div className="py-2">
                      {profileMenuItems.map((item, index) => (
                        <div key={index}>
                          {item.divider && (
                            <div className="my-2 border-t border-gray-200 dark:border-gray-700"></div>
                          )}
                          <motion.button
                            whileHover={{ x: 4 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              item.action()
                              setProfileOpen(false)
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                              item.label === 'Logout' ? 'text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300' : ''
                            }`}
                          >
                            <item.icon size={18} />
                            <span>{item.label}</span>
                          </motion.button>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
