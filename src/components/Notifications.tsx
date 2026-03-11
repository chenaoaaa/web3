import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from 'lucide-react'
import { useAppStore } from '../store'

const iconMap = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
  warning: AlertTriangle,
}

const colorMap = {
  success: 'border-neon-green/40 bg-neon-green/5',
  error: 'border-neon-pink/40 bg-neon-pink/5',
  info: 'border-neon-blue/40 bg-neon-blue/5',
  warning: 'border-neon-gold/40 bg-neon-gold/5',
}

const iconColorMap = {
  success: 'text-neon-green',
  error: 'text-neon-pink',
  info: 'text-neon-blue',
  warning: 'text-neon-gold',
}

export default function Notifications() {
  const { notifications, removeNotification } = useAppStore()

  return (
    <div className="fixed top-24 right-4 z-[60] space-y-3 max-w-sm">
      <AnimatePresence>
        {notifications.map(notif => {
          const Icon = iconMap[notif.type]
          return (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.9 }}
              className={`glass-card rounded-lg border p-4 ${colorMap[notif.type]}`}
            >
              <div className="flex items-start gap-3">
                <Icon size={18} className={`mt-0.5 ${iconColorMap[notif.type]}`} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-white">{notif.title}</div>
                  <div className="text-xs text-white/50 mt-0.5">{notif.message}</div>
                </div>
                <button
                  onClick={() => removeNotification(notif.id)}
                  className="text-white/30 hover:text-white transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
