import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Menu,
  X,
  ChevronLeft,
} from 'lucide-react'

const menuItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/users', label: 'Users', icon: Users },
  { path: '/reports', label: 'Reports & Settings', icon: BarChart3 },
]

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const location = useLocation()

  const sidebarVariants = {
    open: {
      width: '16rem',
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 300,
      },
    },
    closed: {
      width: '4rem',
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 300,
      },
    },
  }

  const mobileSidebarVariants = {
    open: { x: 0, transition: { duration: 0.3, ease: 'easeInOut' } },
    closed: { x: '-100%', transition: { duration: 0.3, ease: 'easeInOut' } },
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg"
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="md:hidden fixed inset-0 bg-black/50 z-40"
            />
            <motion.div
              variants={mobileSidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="md:hidden fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 z-50 shadow-xl"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <h1 className="text-xl font-bold text-primary-600 dark:text-primary-400">
                    SaaS Admin
                  </h1>
                  <button onClick={() => setIsMobileOpen(false)}>
                    <X size={24} />
                  </button>
                </div>
                <nav className="space-y-2">
                  {menuItems.map((item) => {
                    const Icon = item.icon
                    const isActive = location.pathname === item.path
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsMobileOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                          isActive
                            ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        <Icon size={20} />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    )
                  })}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.aside
        variants={sidebarVariants}
        animate={isOpen ? 'open' : 'closed'}
        className="hidden md:flex flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-sm"
      >
        <div className={`p-6 flex items-center ${isOpen ? 'justify-between' : 'justify-center'}`}>
          <AnimatePresence mode="wait">
            {isOpen && (
              <motion.h1
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="text-xl font-bold text-primary-600 dark:text-primary-400"
              >
                SaaS Admin
              </motion.h1>
            )}
          </AnimatePresence>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            <ChevronLeft
              size={20}
              className={`transition-transform ${isOpen ? '' : 'rotate-180'}`}
            />
          </button>
        </div>

        <nav className="flex-1 px-2 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center ${isOpen ? 'justify-start gap-3 px-4' : 'justify-center px-2'} py-3 rounded-lg transition-all relative group ${
                  isActive
                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                title={!isOpen ? item.label : undefined}
              >
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex-shrink-0"
                >
                  <Icon size={isOpen ? 20 : 22} className="block" />
                </motion.div>
                <AnimatePresence mode="wait">
                  {isOpen && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="font-medium whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-primary-600 rounded-r-full"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                {/* Tooltip for collapsed state */}
                {!isOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: -10 }}
                    whileHover={{ opacity: 1, scale: 1, x: 0 }}
                    className="absolute left-full ml-2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg whitespace-nowrap pointer-events-none z-50 shadow-xl"
                  >
                    {item.label}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 dark:bg-gray-700 rotate-45" />
                  </motion.div>
                )}
              </Link>
            )
          })}
        </nav>
      </motion.aside>
    </>
  )
}

