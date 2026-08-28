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

  return (
    <div className="card p-5 flex items-start justify-between gap-3">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft mb-2">{label}</p>
        <p className={`font-display text-2xl sm:text-3xl font-semibold tabular-nums ${toneClasses}`}>
          {formatIDR(amount)}
        </p>
      </div>
      {Icon && (
        <div className={`h-10 w-10 shrink-0 rounded-full flex items-center justify-center ${iconBg}`}>
          <Icon className="h-5 w-5" strokeWidth={2} />
        </div>
      )}
    </div>
  )
}
