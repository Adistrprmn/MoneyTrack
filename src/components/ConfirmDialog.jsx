export default function ConfirmDialog({ open, title, description, onConfirm, onCancel, confirmLabel = 'Hapus', loading }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]" onClick={onCancel} />
      <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-card p-6">
        <h3 className="font-display text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-ink-soft mb-6">{description}</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="btn-secondary flex-1">Batal</button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 inline-flex items-center justify-center rounded-full bg-loss text-white font-semibold px-5 py-2.5 text-sm hover:bg-loss/90 disabled:opacity-50"
          >
            {loading ? 'Menghapus…' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
