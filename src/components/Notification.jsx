import { useEffect } from 'react'
import { CheckCircle2, XCircle, Info, X } from 'lucide-react'

export default function Notification({
  show,
  type = 'success',
  title,
  message,
  onClose,
}) {
  useEffect(() => {
    if (!show) return

    const timer = setTimeout(() => {
      onClose?.()
    }, 4000)

    return () => clearTimeout(timer)
  }, [show, onClose])

  if (!show) return null

  const config = {
    success: {
      icon: CheckCircle2,
      iconClass: 'text-gain',
      bgClass: 'bg-gain-soft dark:bg-gain/10',
    },
    error: {
      icon: XCircle,
      iconClass: 'text-loss',
      bgClass: 'bg-loss-soft dark:bg-loss/10',
    },
    info: {
      icon: Info,
      iconClass: 'text-forest-500 dark:text-gold',
      bgClass: 'bg-forest-50 dark:bg-forest-500/10',
    },
  }

  const current = config[type] || config.success
  const Icon = current.icon

  return (
    <div className="fixed top-5 right-5 z-[9999] w-[calc(100%-2rem)] max-w-sm animate-[notification-in_0.3s_ease-out]">
      <div
        className="
          flex
          items-start
          gap-3
          rounded-2xl
          border
          border-paper-line
          dark:border-white/10
          bg-paper-card
          dark:bg-[#17221F]
          p-4
          shadow-xl
          backdrop-blur
        "
      >
        {/* ICON */}
        <div
          className={`
            h-10
            w-10
            shrink-0
            rounded-xl
            ${current.bgClass}
            flex
            items-center
            justify-center
          `}
        >
          <Icon
            className={`h-5 w-5 ${current.iconClass}`}
            strokeWidth={2}
          />
        </div>

        {/* CONTENT */}
        <div className="min-w-0 flex-1 pt-0.5">
          <p className="text-sm font-semibold text-ink dark:text-white">
            {title}
          </p>

          {message && (
            <p className="mt-1 text-xs leading-relaxed text-ink-soft dark:text-white/60">
              {message}
            </p>
          )}
        </div>

        {/* CLOSE */}
        <button
          type="button"
          onClick={onClose}
          className="
            shrink-0
            rounded-lg
            p-1
            text-ink-soft
            hover:bg-paper
            dark:hover:bg-white/10
            transition
          "
          aria-label="Tutup notifikasi"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}