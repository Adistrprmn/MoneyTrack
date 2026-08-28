import { Inbox } from 'lucide-react'

export default function EmptyState({ title, description, action }) {
  return (
    <div className="card flex flex-col items-center justify-center text-center py-14 px-6">
      <div className="h-12 w-12 rounded-full bg-forest-50 text-forest-500 flex items-center justify-center mb-4">
        <Inbox className="h-6 w-6" strokeWidth={2} />
      </div>
      <p className="font-display text-lg font-semibold mb-1">{title}</p>
      {description && <p className="text-sm text-ink-soft max-w-xs mb-4">{description}</p>}
      {action}
    </div>
  )
}
