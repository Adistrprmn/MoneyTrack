import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Plus,
  Receipt,
  Lightbulb,
} from 'lucide-react'

import AppShell from '../components/AppShell'
import StatCard from '../components/StatCard'
import EmptyState from '../components/EmptyState'
import TransactionModal from '../components/TransactionModal'

import { useAuth } from '../contexts/AuthContext'
import { useTransactions } from '../hooks/useTransactions'
import { useCategories } from '../hooks/useCategories'

import {
  getRangeForPeriod,
  isWithinRange,
} from '../utils/period'

import {
  formatIDR,
  formatDate,
} from '../utils/format'

const PERIODS = [
  {
    key: 'weekly',
    label: 'Minggu ini',
  },
  {
    key: 'monthly',
    label: 'Bulan ini',
  },
  {
    key: 'yearly',
    label: 'Tahun ini',
  },
]

export default function Dashboard() {
  const { user } = useAuth()

  const {
    transactions,
    loading,
    error,
    addTransaction,
  } = useTransactions()

  const {
    incomeCategories,
    expenseCategories,
    addCategory,
  } = useCategories()

  const [period, setPeriod] = useState('monthly')
  const [modalType, setModalType] = useState(null)

  const displayName =
    user?.user_metadata?.name ||
    user?.email?.split('@')[0] ||
    'Pengguna'

  /*
   * ============================================================
   * DATA PERIODE
   * ============================================================
   */

  const { start, end } = getRangeForPeriod(period)

  const periodTx = transactions.filter((transaction) =>
    isWithinRange(
      transaction.transaction_date,
      start,
      end
    )
  )

  const periodIncome = periodTx
    .filter((transaction) => transaction.type === 'income')
    .reduce(
      (sum, transaction) =>
        sum + Number(transaction.amount),
      0
    )

  const periodExpense = periodTx
    .filter((transaction) => transaction.type === 'expense')
    .reduce(
      (sum, transaction) =>
        sum + Number(transaction.amount),
      0
    )

  const periodBalance =
    periodIncome - periodExpense

  const transactionCount = periodTx.length

  /*
   * ============================================================
   * PENGELUARAN BERDASARKAN KATEGORI
   * ============================================================
   */

  const expenseByCategory = Object.values(
    periodTx
      .filter(
        (transaction) =>
          transaction.type === 'expense'
      )
      .reduce((result, transaction) => {
        const categoryName =
          transaction.categories?.name ||
          'Tanpa kategori'

        if (!result[categoryName]) {
          result[categoryName] = {
            name: categoryName,
            amount: 0,
          }
        }

        result[categoryName].amount += Number(
          transaction.amount
        )

        return result
      }, {})
  )
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 6)

  const highestExpenseCategory =
    expenseByCategory[0] ?? null

  const highestExpenseAmount =
    highestExpenseCategory?.amount ?? 0

  /*
   * Persentase masing-masing kategori
   */
  const getCategoryPercentage = (amount) => {
    if (periodExpense <= 0) return 0

    return Math.round(
      (amount / periodExpense) * 100
    )
  }

  /*
   * ============================================================
   * TRANSAKSI TERBARU
   * ============================================================
   */

  const recent = transactions.slice(0, 5)

  /*
   * ============================================================
   * TAMBAH TRANSAKSI
   *
   * Ini penting supaya tombol Tambah di Dashboard juga
   * mendukung kategori "Lainnya".
   * ============================================================
   */

  async function handleAddTransaction(payload) {
    let categoryId = payload.category_id

    if (payload.custom_category) {
      const newCategory = await addCategory({
        name: payload.custom_category,
        type: payload.type,
      })

      categoryId = newCategory.id
    }

    await addTransaction({
      ...payload,
      category_id: categoryId,
    })
  }

  /*
   * ============================================================
   * RENDER
   * ============================================================
   */

  return (
    <AppShell>
      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
        <div>
          <p className="text-sm text-ink-soft mb-1">
            Halo, {displayName} 👋
          </p>

          <h1 className="font-display text-2xl sm:text-3xl font-semibold">
            Ringkasan Keuangan
          </h1>

          <p className="text-sm text-ink-soft mt-1">
            Pantau kondisi keuanganmu dengan mudah.
          </p>
        </div>

        <div className="flex items-center gap-3">
  <button
    type="button"
    className="btn-danger px-5 py-2.5"
    onClick={() => setModalType('expense')}
  >
    <span className="mr-1">+</span>
    Pengeluaran
  </button>

  <button
    type="button"
    className="btn-primary px-5 py-2.5"
    onClick={() => setModalType('income')}
  >
    <span className="mr-1">+</span>
    Pemasukan
  </button>
</div>
      </div>

      {/* ======================================================
          ERROR
      ====================================================== */}

      {error && (
        <p className="text-sm text-loss bg-loss-soft rounded-lg px-3.5 py-2.5 mb-4">
          {error}
        </p>
      )}

      {/* ======================================================
          FILTER PERIODE
      ====================================================== */}

      <div className="inline-flex rounded-full bg-paper-card border border-paper-line p-1 mb-5">
        {PERIODS.map((p) => (
          <button
            key={p.key}
            onClick={() => setPeriod(p.key)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              period === p.key
                ? 'bg-forest-500 text-white'
                : 'text-ink-soft hover:text-ink'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* ======================================================
          STAT CARDS
      ====================================================== */}

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Saldo"
          amount={periodBalance}
          tone="neutral"
          icon={Wallet}
        />

        <StatCard
          label="Pemasukan"
          amount={periodIncome}
          tone="gain"
          icon={TrendingUp}
        />

        <StatCard
          label="Pengeluaran"
          amount={periodExpense}
          tone="loss"
          icon={TrendingDown}
        />

        {/* JUMLAH TRANSAKSI */}
        <div className="card p-5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-paper flex items-center justify-center">
              <Receipt className="h-5 w-5 text-ink-soft" />
            </div>

            <div>
              <p className="text-sm text-ink-soft">
                Transaksi
              </p>

              <p className="font-display text-2xl font-semibold mt-0.5">
                {transactionCount}
              </p>

              <p className="text-xs text-ink-soft mt-0.5">
                transaksi periode ini
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================
          GRID ANALISIS
      ====================================================== */}

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* ====================================================
            PENGELUARAN BERDASARKAN KATEGORI
        ==================================================== */}

        <div className="card p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-display text-lg font-semibold">
                Pengeluaran per Kategori
              </h2>

              <p className="text-xs text-ink-soft mt-1">
                Kategori dengan pengeluaran terbesar
              </p>
            </div>
          </div>

          {expenseByCategory.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-sm text-ink-soft">
                Belum ada pengeluaran pada periode ini.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {expenseByCategory.map(
                (category, index) => {
                  const percentage =
                    getCategoryPercentage(
                      category.amount
                    )

                  return (
                    <div key={category.name}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="h-2.5 w-2.5 rounded-full bg-forest-500 shrink-0" />

                          <span className="text-sm font-medium truncate">
                            {category.name}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-xs text-ink-soft">
                            {percentage}%
                          </span>

                          <span className="font-mono text-sm font-semibold">
                            {formatIDR(
                              category.amount
                            )}
                          </span>
                        </div>
                      </div>

                      <div className="h-2 bg-paper rounded-full overflow-hidden">
                        <div
                          className="h-full bg-forest-500 rounded-full transition-all"
                          style={{
                            width: `${percentage}%`,
                          }}
                        />
                      </div>
                    </div>
                  )
                }
              )}
            </div>
          )}
        </div>

        {/* ====================================================
            INSIGHT
        ==================================================== */}

        <div className="card p-5">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-10 w-10 rounded-xl bg-paper flex items-center justify-center">
              <Lightbulb className="h-5 w-5 text-forest-500" />
            </div>

            <div>
              <h2 className="font-display text-lg font-semibold">
                Insight Keuangan
              </h2>

              <p className="text-xs text-ink-soft mt-1">
                Ringkasan dari data periode ini
              </p>
            </div>
          </div>

          {periodTx.length === 0 ? (
            <div className="rounded-xl bg-paper p-4">
              <p className="text-sm text-ink-soft">
                Belum cukup data untuk memberikan
                insight.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {/* INSIGHT 1 */}
              <div className="rounded-xl bg-paper p-4">
                <p className="text-xs text-ink-soft mb-1">
                  Pengeluaran terbesar
                </p>

                {highestExpenseCategory ? (
                  <>
                    <p className="font-semibold">
                      {highestExpenseCategory.name}
                    </p>

                    <p className="text-sm text-ink-soft mt-1">
                      {formatIDR(
                        highestExpenseAmount
                      )}{' '}
                      atau{' '}
                      {getCategoryPercentage(
                        highestExpenseAmount
                      )}
                      % dari total pengeluaran.
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-ink-soft">
                    Belum ada pengeluaran.
                  </p>
                )}
              </div>

              {/* INSIGHT 2 */}
              <div className="rounded-xl bg-paper p-4">
                <p className="text-xs text-ink-soft mb-1">
                  Kondisi saldo
                </p>

                {periodBalance > 0 ? (
                  <p className="text-sm">
                    👍 Pemasukanmu lebih besar daripada
                    pengeluaran sebesar{' '}
                    <span className="font-semibold">
                      {formatIDR(periodBalance)}
                    </span>
                    .
                  </p>
                ) : periodBalance < 0 ? (
                  <p className="text-sm">
                    ⚠️ Pengeluaranmu lebih besar
                    daripada pemasukan sebesar{' '}
                    <span className="font-semibold">
                      {formatIDR(
                        Math.abs(periodBalance)
                      )}
                    </span>
                    .
                  </p>
                ) : (
                  <p className="text-sm">
                    Pemasukan dan pengeluaranmu
                    seimbang pada periode ini.
                  </p>
                )}
              </div>

              {/* INSIGHT 3 */}
              <div className="rounded-xl bg-paper p-4">
                <p className="text-xs text-ink-soft mb-1">
                  Aktivitas
                </p>

                <p className="text-sm">
                  Kamu mencatat{' '}
                  <span className="font-semibold">
                    {transactionCount}
                  </span>{' '}
                  transaksi pada periode ini.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ======================================================
          TRANSAKSI TERBARU
      ====================================================== */}

      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-display text-lg font-semibold">
            Transaksi Terbaru
          </h2>

          <p className="text-xs text-ink-soft mt-1">
            Aktivitas transaksi terakhir
          </p>
        </div>

        <Link
          to="/transaksi"
          className="text-sm font-medium text-forest-500 hover:underline flex items-center gap-1"
        >
          Lihat semua
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {loading ? (
        <div className="card p-8 text-center text-sm text-ink-soft">
          Memuat transaksi…
        </div>
      ) : recent.length === 0 ? (
        <EmptyState
          title="Belum ada transaksi"
          description="Mulai catat pemasukan atau pengeluaran pertamamu."
          action={
            <button
              onClick={() =>
                setModalType('income')
              }
              className="btn-primary text-sm"
            >
              <Plus className="h-4 w-4" />
              Tambah Transaksi
            </button>
          }
        />
      ) : (
        <div className="card overflow-hidden">
          <div className="divide-y divide-paper-line">
            {recent.map((t) => (
              <div
                key={t.id}
                className="flex items-center gap-3 px-4 sm:px-5 py-3.5"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">
                    {t.categories?.name ??
                      'Tanpa kategori'}
                  </p>

                  <p className="text-xs text-ink-soft mt-0.5">
                    {formatDate(
                      t.transaction_date
                    )}

                    {t.note
                      ? ` · ${t.note}`
                      : ''}
                  </p>
                </div>

                <p
                  className={`font-mono text-sm font-semibold tabular-nums shrink-0 ${
                    t.type === 'income'
                      ? 'text-gain'
                      : 'text-loss'
                  }`}
                >
                  {t.type === 'income'
                    ? '+'
                    : '−'}

                  {formatIDR(t.amount)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================
          MODAL PEMASUKAN
      ====================================================== */}

      <TransactionModal
        open={modalType === 'income'}
        onClose={() => setModalType(null)}
        onSubmit={handleAddTransaction}
        type="income"
        categories={incomeCategories}
      />

      {/* ======================================================
          MODAL PENGELUARAN
      ====================================================== */}

      <TransactionModal
        open={modalType === 'expense'}
        onClose={() => setModalType(null)}
        onSubmit={handleAddTransaction}
        type="expense"
        categories={expenseCategories}
      />
    </AppShell>
  )
}