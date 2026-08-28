import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { formatDateInput } from '../utils/format'

export default function TransactionModal({
  open,
  onClose,
  onSubmit,
  type,
  categories,
  initialData,
}) {
  const [amount, setAmount] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [customCategory, setCustomCategory] = useState('')
  const [date, setDate] = useState(formatDateInput())
  const [note, setNote] = useState('')
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')

  useEffect(() => {
    if (!open) return

    if (initialData) {
      setAmount(String(initialData.amount ?? ''))
      setCategoryId(initialData.category_id ?? '')
      setCustomCategory('')
      setDate(
        initialData.transaction_date ??
          formatDateInput()
      )
      setNote(initialData.note ?? '')
    } else {
      setAmount('')
      setCategoryId(categories[0]?.id ?? '')
      setCustomCategory('')
      setDate(formatDateInput())
      setNote('')
    }

    setFormError('')
  }, [open, initialData, categories])

  if (!open) return null

  const isIncome = type === 'income'

  const selectedCategory = categories.find(
    (category) => category.id === categoryId
  )

  const isOtherCategory =
    selectedCategory?.name === 'Lainnya'

  const title = initialData
    ? `Edit ${
        isIncome ? 'Pemasukan' : 'Pengeluaran'
      }`
    : `Tambah ${
        isIncome ? 'Pemasukan' : 'Pengeluaran'
      }`

  async function handleSubmit(e) {
    e.preventDefault()
    setFormError('')

    const numericAmount = Number(amount)

    if (
      !amount ||
      Number.isNaN(numericAmount) ||
      numericAmount <= 0
    ) {
      setFormError(
        'Nominal harus berupa angka lebih besar dari 0.'
      )
      return
    }

    if (!categoryId) {
      setFormError('Kategori wajib dipilih.')
      return
    }

    if (
      isOtherCategory &&
      !customCategory.trim()
    ) {
      setFormError('Nama kategori wajib diisi.')
      return
    }

    if (!date) {
      setFormError('Tanggal wajib diisi.')
      return
    }

    setSaving(true)

    try {
      await onSubmit({
        type,
        amount: numericAmount,
        category_id: categoryId,
        custom_category: isOtherCategory
          ? customCategory.trim()
          : '',
        transaction_date: date,
        note: note.trim(),
      })

      onClose()
    } catch (err) {
      setFormError(
        err.message ||
          'Gagal menyimpan transaksi. Coba lagi.'
      )
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div
        className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
        onClick={onClose}
      />

      <div className="relative w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-2xl shadow-card p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-xl font-semibold">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-paper text-ink-soft"
            aria-label="Tutup"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* NOMINAL */}
          <div>
            <label
              className="label"
              htmlFor="amount"
            >
              Nominal (Rp)
            </label>

            <input
              id="amount"
              type="number"
              inputMode="decimal"
              min="0"
              step="1"
              className="input"
              placeholder="0"
              value={amount}
              onChange={(e) =>
                setAmount(e.target.value)
              }
            />
          </div>

          {/* KATEGORI */}
          <div>
            <label
              className="label"
              htmlFor="category"
            >
              Kategori
            </label>

            <select
              id="category"
              className="input"
              value={categoryId}
              onChange={(e) => {
                setCategoryId(e.target.value)
                setCustomCategory('')
              }}
            >
              {categories.length === 0 && (
                <option value="">
                  Belum ada kategori
                </option>
              )}

              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </option>
              ))}
            </select>

            {/* INPUT KATEGORI CUSTOM */}
            {isOtherCategory && (
              <div className="mt-3">
                <label
                  className="label"
                  htmlFor="customCategory"
                >
                  Nama kategori
                </label>

                <input
                  id="customCategory"
                  type="text"
                  className="input"
                  placeholder={
                    isIncome
                      ? 'Contoh: Uang dari ortu'
                      : 'Contoh: Beli keyboard'
                  }
                  value={customCategory}
                  onChange={(e) =>
                    setCustomCategory(
                      e.target.value
                    )
                  }
                />
              </div>
            )}
          </div>

          {/* TANGGAL */}
          <div>
            <label
              className="label"
              htmlFor="date"
            >
              Tanggal
            </label>

            <input
              id="date"
              type="date"
              className="input"
              value={date}
              onChange={(e) =>
                setDate(e.target.value)
              }
            />
          </div>

          {/* CATATAN */}
          <div>
            <label
              className="label"
              htmlFor="note"
            >
              Catatan (opsional)
            </label>

            <textarea
              id="note"
              className="input min-h-[72px] resize-none"
              placeholder="Contoh: makan siang bersama tim"
              value={note}
              onChange={(e) =>
                setNote(e.target.value)
              }
            />
          </div>

          {/* ERROR */}
          {formError && (
            <p className="text-sm text-loss bg-loss-soft rounded-lg px-3.5 py-2.5">
              {formError}
            </p>
          )}

          {/* BUTTON */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1"
            >
              Batal
            </button>

            <button
              type="submit"
              disabled={saving}
              className="btn-primary flex-1"
            >
              {saving
                ? 'Menyimpan…'
                : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}