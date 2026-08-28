import { useState } from 'react'
import { Plus } from 'lucide-react'
import AppShell from '../components/AppShell'
import TransactionTable from '../components/TransactionTable'
import TransactionModal from '../components/TransactionModal'
import ConfirmDialog from '../components/ConfirmDialog'
import StatCard from '../components/StatCard'
import { useTransactions } from '../hooks/useTransactions'
import { useCategories } from '../hooks/useCategories'

export default function TransactionTypePage({ type }) {
  const isIncome = type === 'income'

  const {
    transactions,
    loading,
    error,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  } = useTransactions()

  const {
    incomeCategories,
    expenseCategories,
    addCategory,
  } = useCategories()

  const categories = isIncome
    ? incomeCategories
    : expenseCategories

  const [editing, setEditing] = useState(null)
  const [showAdd, setShowAdd] = useState(false)
  const [pendingDelete, setPendingDelete] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const filtered = transactions.filter(
    (transaction) => transaction.type === type
  )

  const total = filtered.reduce(
    (sum, transaction) => sum + Number(transaction.amount),
    0
  )

  async function handleSubmit(payload) {
    let categoryId = payload.category_id

    // Jika user membuat kategori sendiri
    if (payload.custom_category) {
      const newCategory = await addCategory({
        name: payload.custom_category,
        type,
      })

      categoryId = newCategory.id
    }

    await addTransaction({
      ...payload,
      category_id: categoryId,
    })
  }

  async function handleUpdate(payload) {
    await updateTransaction(editing.id, payload)
  }

  async function handleDelete() {
    setDeleting(true)

    try {
      await deleteTransaction(pendingDelete.id)
      setPendingDelete(null)
    } finally {
      setDeleting(false)
    }
  }

  return (
    <AppShell>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="font-display text-2xl sm:text-3xl font-semibold">
          {isIncome ? 'Pemasukan' : 'Pengeluaran'}
        </h1>

        {/* Tombol tambah */}
        <button
          type="button"
          onClick={() => setShowAdd(true)}
          className="btn-primary text-sm w-full sm:w-auto"
        >
          <Plus className="h-4 w-4" strokeWidth={2} />
          <span>Tambah</span>
        </button>
      </div>

      {/* TOTAL */}
      <div className="mb-6 max-w-xs">
        <StatCard
          label={
            isIncome
              ? 'Total Pemasukan'
              : 'Total Pengeluaran'
          }
          amount={total}
          tone={isIncome ? 'gain' : 'loss'}
        />
      </div>

      {/* ERROR */}
      {error && (
        <p className="text-sm text-loss bg-loss-soft rounded-lg px-3.5 py-2.5 mb-4">
          {error}
        </p>
      )}

      {/* TABLE */}
      {loading ? (
        <div className="card p-8 text-center text-sm text-ink-soft">
          Memuat data…
        </div>
      ) : (
        <TransactionTable
          transactions={filtered}
          categories={categories}
          fixedType={type}
          showTypeBadge={false}
          onEdit={setEditing}
          onDelete={setPendingDelete}
        />
      )}

      {/* MODAL TAMBAH */}
      <TransactionModal
        open={showAdd}
        onClose={() => setShowAdd(false)}
        onSubmit={handleSubmit}
        type={type}
        categories={categories}
      />

      {/* MODAL EDIT */}
      <TransactionModal
        open={!!editing}
        onClose={() => setEditing(null)}
        onSubmit={handleUpdate}
        type={type}
        categories={categories}
        initialData={editing}
      />

      {/* KONFIRMASI HAPUS */}
      <ConfirmDialog
        open={!!pendingDelete}
        title={`Hapus ${
          isIncome ? 'pemasukan' : 'pengeluaran'
        } ini?`}
        description="Tindakan ini tidak dapat dibatalkan. Transaksi akan dihapus secara permanen."
        onConfirm={handleDelete}
        onCancel={() => setPendingDelete(null)}
        loading={deleting}
      />
    </AppShell>
  )
}