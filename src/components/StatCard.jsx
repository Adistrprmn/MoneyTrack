import { formatIDR } from '../utils/format'

export default function StatCard({ label, amount, tone = 'neutral', icon: Icon }) {
  const toneClasses = {
    neutral: 'text-ink',
    gain: 'text-gain',
    loss: 'text-loss',
  }[tone]

  const iconBg = {
    neutral: 'bg-forest-50 text-forest-500',
    gain: 'bg-gain-soft text-gain',
    loss: 'bg-loss-soft text-loss',
  }[tone]

  const formattedAmount = formatIDR(amount)

  // Ukuran nominal otomatis menyesuaikan panjang angka
  const amountSize =
    formattedAmount.length >= 17
      ? 'text-lg sm:text-xl'
      : formattedAmount.length >= 14
        ? 'text-xl sm:text-2xl'
        : 'text-2xl sm:text-3xl'

  return (
    <div className="card p-5 relative min-w-0">
      {/* Isi card */}
      <div className="pr-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft mb-2">
          {label}
        </p>

        <p
          className={`
            font-display font-semibold tabular-nums whitespace-nowrap
            ${amountSize}
            ${toneClasses}
          `}
        >
          {formattedAmount}
        </p>
      </div>

      {/* Icon pojok kanan atas */}
      {Icon && (
        <div
          className={`
            absolute top-3 right-3
            h-8 w-8
            shrink-0
            rounded-full
            flex items-center justify-center
            ${iconBg}
          `}
        >
          <Icon
            className="h-4 w-4"
            strokeWidth={2}
          />
        </div>
      )}
    </div>
  )
}