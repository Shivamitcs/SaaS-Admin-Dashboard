import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, Info, AlertCircle, X } from 'lucide-react'
import LottieAnimation from './LottieAnimation'

interface NotificationToastProps {
  id: string
  type: 'success' | 'error' | 'info' | 'warning'
  message: string
  onClose: (id: string) => void
}

export default function NotificationToast({
  id,
  type,
  message,
  onClose,
}: NotificationToastProps) {
  const icons = {
    success: CheckCircle,
    error: XCircle,
    info: Info,
    warning: AlertCircle,
  }

  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    warning: 'bg-yellow-500',
  }

  const Icon = icons[type]

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, x: 300, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.8 }}
      transition={{
        type: 'spring',
        damping: 25,
        stiffness: 300,
      }}
      className={`${colors[type]} text-white rounded-lg shadow-lg p-4 min-w-[300px] max-w-md flex items-start gap-3 relative overflow-hidden`}
    >
      {/* Lottie animation for success */}
      {type === 'success' && (
        <div className="absolute top-2 right-2 opacity-20">
          <LottieAnimation type="success" className="w-16 h-16" />
        </div>
      )}

      <div className="relative z-10 flex items-start gap-3 flex-1">
        <Icon size={20} className="mt-0.5 flex-shrink-0" />
        <p className="flex-1 text-sm font-medium">{message}</p>
        <button
          onClick={() => onClose(id)}
          className="flex-shrink-0 p-1 rounded hover:bg-white/20 transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* Progress bar */}
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 5, ease: 'linear' }}
        className="absolute bottom-0 left-0 right-0 h-1 bg-white/30 origin-left"
      />
    </motion.div>
  )
}

