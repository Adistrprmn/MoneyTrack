import { useState } from 'react'
import { Plus } from 'lucide-react'
import AppShell from '../components/AppShell'
import TransactionTable from '../components/TransactionTable'
import TransactionModal from '../components/TransactionModal'
import ConfirmDialog from '../components/ConfirmDialog'
import { useTransactions } from '../hooks/useTransactions'
import { useCategories } from '../hooks/useCategories'

export default function Transactions() {
  const {
    transactions,
    loading,
    error,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  } = useTransactions()

  const {
    categories,
    incomeCategories,
    expenseCategories,
  } = useCategories()

  const [editing, setEditing] = useState(null)
  const [addType, setAddType] = useState(null)
  const [pendingDelete, setPendingDelete] = useState(null)
  const [deleting, setDeleting] = useState(false)

  function handleEdit(transaction) {
    setEditing(transaction)
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

  const categoriesForEdit =
    editing?.type === 'income'
      ? incomeCategories
      : expenseCategories

  return (
    <AppShell>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="font-display text-2xl sm:text-3xl font-semibold">
          Riwayat Transaksi
        </h1>

        {/* TOMBOL TAMBAH */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setAddType('expense')}
            className="btn-primary text-sm"
          >
            <Plus className="h-4 w-4" strokeWidth={2} />
            <span>Pengeluaran</span>
          </button>

          <button
            type="button"
            onClick={() => setAddType('income')}
            className="btn-primary text-sm"
          >
            <Plus className="h-4 w-4" strokeWidth={2} />
            <span>Pemasukan</span>
          </button>
        </div>
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
          Memuat transaksi…
        </div>
      ) : (
        <TransactionTable
          transactions={transactions}
          categories={categories}
          onEdit={handleEdit}
          onDelete={setPendingDelete}
        />
      )}

      {/* MODAL TAMBAH PEMASUKAN */}
      <TransactionModal
        open={addType === 'income'}
        onClose={() => setAddType(null)}
        onSubmit={addTransaction}
        type="income"
        categories={incomeCategories}
      />

      {/* MODAL TAMBAH PENGELUARAN */}
      <TransactionModal
        open={addType === 'expense'}
        onClose={() => setAddType(null)}
        onSubmit={addTransaction}
        type="expense"
        categories={expenseCategories}
      />

      {/* MODAL EDIT */}
      <TransactionModal
        open={!!editing}
        onClose={() => setEditing(null)}
        onSubmit={handleUpdate}
        type={editing?.type}
        categories={categoriesForEdit}
        initialData={editing}
      />

      {/* KONFIRMASI HAPUS */}
      <ConfirmDialog
        open={!!pendingDelete}
        title="Hapus transaksi ini?"
        description="Tindakan ini tidak dapat dibatalkan. Transaksi akan dihapus secara permanen."
        onConfirm={handleDelete}
        onCancel={() => setPendingDelete(null)}
        loading={deleting}
      />
    </AppShell>
  )
}