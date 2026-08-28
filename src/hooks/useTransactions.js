import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

export function useTransactions() {
  const { user } = useAuth()
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    if (!user) return
    setLoading(true)
    setError(null)
    const { data, error: err } = await supabase
      .from('transactions')
      .select('*, categories(name)')
      .order('transaction_date', { ascending: false })
      .order('created_at', { ascending: false })

    if (err) {
      console.error('Gagal memuat transaksi:', err)
      setError(err.message || 'Gagal memuat transaksi.')
    } else {
      setTransactions(data ?? [])
    }
    setLoading(false)
  }, [user])

  useEffect(() => {
    load()
  }, [load])

  async function addTransaction({ type, amount, category_id, transaction_date, note }) {
    if (!(Number(amount) > 0)) throw new Error('Nominal harus lebih besar dari 0')
    if (!category_id) throw new Error('Kategori wajib dipilih')
    if (!transaction_date) throw new Error('Tanggal wajib diisi')

    const { error: err } = await supabase.from('transactions').insert({
      user_id: user.id,
      type,
      amount,
      category_id,
      transaction_date,
      note: note || null,
    })
    if (err) throw new Error('Gagal menyimpan transaksi')
    await load()
  }

  async function updateTransaction(id, { type, amount, category_id, transaction_date, note }) {
    if (!(Number(amount) > 0)) throw new Error('Nominal harus lebih besar dari 0')
    if (!category_id) throw new Error('Kategori wajib dipilih')
    if (!transaction_date) throw new Error('Tanggal wajib diisi')

    const { error: err } = await supabase
      .from('transactions')
      .update({
        type,
        amount,
        category_id,
        transaction_date,
        note: note || null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
    if (err) throw new Error('Gagal menyimpan transaksi')
    await load()
  }

  async function deleteTransaction(id) {
    const { error: err } = await supabase.from('transactions').delete().eq('id', id)
    if (err) throw new Error('Gagal menghapus transaksi')
    await load()
  }

  const totals = transactions.reduce(
    (acc, t) => {
      if (t.type === 'income') acc.income += Number(t.amount)
      else acc.expense += Number(t.amount)
      return acc
    },
    { income: 0, expense: 0 }
  )
  const balance = totals.income - totals.expense

  return {
    transactions,
    loading,
    error,
    totals,
    balance,
    reload: load,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  }
}
