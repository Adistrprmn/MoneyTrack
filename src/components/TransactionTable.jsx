import { useMemo, useState } from 'react'
import { Pencil, Trash2, SlidersHorizontal } from 'lucide-react'
import { formatIDR, formatDate } from '../utils/format'
import EmptyState from './EmptyState'

export default function TransactionTable({
  transactions,
  onEdit,
  onDelete,
  categories = [],
  fixedType, // if set ('income'|'expense'), hides the type filter
  showTypeBadge = true,
}) {
  const [category, setCategory] = useState('all')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [type, setType] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      if (fixedType && t.type !== fixedType) return false
      if (!fixedType && type !== 'all' && t.type !== type) return false
      if (category !== 'all' && t.category_id !== category) return false
      if (dateFrom && t.transaction_date < dateFrom) return false
      if (dateTo && t.transaction_date > dateTo) return false
      return true
    })
  }, [transactions, category, dateFrom, dateTo, type, fixedType])

  const hasActiveFilters = category !== 'all' || dateFrom || dateTo || (!fixedType && type !== 'all')

  function resetFilters() {
    setCategory('all')
    setDateFrom('')
    setDateTo('')
    setType('all')
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={() => setShowFilters((s) => !s)}
          className={`btn-secondary text-xs sm:text-sm ${hasActiveFilters ? '!border-forest-500 !text-forest-500' : ''}`}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filter {hasActiveFilters && `(${filtered.length})`}
        </button>
        {hasActiveFilters && (
          <button onClick={resetFilters} className="btn-ghost text-xs sm:text-sm">
            Reset filter
          </button>
        )}
      </div>

      {showFilters && (
        <div className="card p-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {!fixedType && (
            <div>
              <label className="label">Jenis</label>
              <select className="input" value={type} onChange={(e) => setType(e.target.value)}>
                <option value="all">Semua</option>
                <option value="income">Pemasukan</option>
                <option value="expense">Pengeluaran</option>
              </select>
            </div>
          )}
          <div className={fixedType ? 'col-span-2 sm:col-span-1' : ''}>
            <label className="label">Kategori</label>
            <select className="input" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="all">Semua</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Dari tanggal</label>
            <input type="date" className="input" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
          </div>
          <div>
            <label className="label">Sampai tanggal</label>
            <input type="date" className="input" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <EmptyState
          title="Belum ada transaksi"
          description={hasActiveFilters ? 'Tidak ada transaksi yang cocok dengan filter ini.' : 'Transaksi yang kamu tambahkan akan muncul di sini.'}
        />
      ) : (
        <div className="card overflow-hidden">
          <div className="divide-y divide-paper-line">
            {filtered.map((t) => (
              <div key={t.id} className="flex items-center gap-3 px-4 sm:px-5 py-3.5">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-medium text-sm truncate">{t.categories?.name ?? 'Tanpa kategori'}</p>
                    {showTypeBadge && (
                      <span
                        className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${
                          t.type === 'income' ? 'bg-gain-soft text-gain' : 'bg-loss-soft text-loss'
                        }`}
                      >
                        {t.type === 'income' ? 'Masuk' : 'Keluar'}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-ink-soft mt-0.5">
                    {formatDate(t.transaction_date)}
                    {t.note ? ` · ${t.note}` : ''}
                  </p>
                </div>
                <p className={`font-mono text-sm font-semibold tabular-nums shrink-0 ${t.type === 'income' ? 'text-gain' : 'text-loss'}`}>
                  {t.type === 'income' ? '+' : '−'}{formatIDR(t.amount)}
                </p>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => onEdit(t)}
                    className="h-8 w-8 flex items-center justify-center rounded-full text-ink-soft hover:bg-forest-50 hover:text-forest-500"
                    aria-label="Edit transaksi"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDelete(t)}
                    className="h-8 w-8 flex items-center justify-center rounded-full text-ink-soft hover:bg-loss-soft hover:text-loss"
                    aria-label="Hapus transaksi"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
