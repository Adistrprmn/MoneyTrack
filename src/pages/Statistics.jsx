import { useMemo, useState } from 'react'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
} from 'recharts'
import AppShell from '../components/AppShell'
import EmptyState from '../components/EmptyState'
import { useTransactions } from '../hooks/useTransactions'
import { getRangeForPeriod, isWithinRange } from '../utils/period'
import { formatIDR } from '../utils/format'
import { CATEGORY_COLORS } from '../utils/categories'

const PERIODS = [
  { key: 'weekly', label: 'Mingguan' },
  { key: 'monthly', label: 'Bulanan' },
  { key: 'yearly', label: 'Tahunan' },
]

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'Mei',
  'Jun',
  'Jul',
  'Agu',
  'Sep',
  'Okt',
  'Nov',
  'Des',
]

export default function Statistics() {
  const { transactions, loading } = useTransactions()
  const [period, setPeriod] = useState('monthly')

  // Tahun yang sedang dipilih untuk perbandingan bulanan
  const currentYear = new Date().getFullYear()
  const [comparisonYear, setComparisonYear] = useState(currentYear)

  const { start, end } = getRangeForPeriod(period)

  const periodTx = useMemo(
    () =>
      transactions.filter((t) =>
        isWithinRange(t.transaction_date, start, end)
      ),
    [transactions, start, end]
  )

  const income = periodTx
    .filter((t) => t.type === 'income')
    .reduce((s, t) => s + Number(t.amount), 0)

  const expense = periodTx
    .filter((t) => t.type === 'expense')
    .reduce((s, t) => s + Number(t.amount), 0)

  const balance = income - expense

  // ==========================================
  // DATA KATEGORI PENGELUARAN
  // ==========================================

  const categoryData = useMemo(() => {
    const map = new Map()

    periodTx
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        const name = t.categories?.name ?? 'Lainnya'

        map.set(
          name,
          (map.get(name) ?? 0) + Number(t.amount)
        )
      })

    return Array.from(map.entries())
      .map(([name, value]) => ({
        name,
        value,
      }))
      .sort((a, b) => b.value - a.value)
  }, [periodTx])

  // ==========================================
  // PERBANDINGAN BULANAN
  // ==========================================

  const monthlyComparison = useMemo(() => {
    return MONTHS.map((month, index) => {
      const monthNumber = index + 1

      const monthTransactions = transactions.filter((t) => {
        if (!t.transaction_date) return false

        const date = new Date(`${t.transaction_date}T00:00:00`)

        return (
          date.getFullYear() === comparisonYear &&
          date.getMonth() + 1 === monthNumber
        )
      })

      const monthlyIncome = monthTransactions
        .filter((t) => t.type === 'income')
        .reduce((sum, t) => sum + Number(t.amount), 0)

      const monthlyExpense = monthTransactions
        .filter((t) => t.type === 'expense')
        .reduce((sum, t) => sum + Number(t.amount), 0)

      return {
        month,
        income: monthlyIncome,
        expense: monthlyExpense,
        balance: monthlyIncome - monthlyExpense,
      }
    })
  }, [transactions, comparisonYear])

  // ==========================================
  // TAHUN TERSEDIA
  // ==========================================

  const availableYears = useMemo(() => {
    const years = new Set()

    transactions.forEach((t) => {
      if (!t.transaction_date) return

      const date = new Date(`${t.transaction_date}T00:00:00`)
      const year = date.getFullYear()

      if (!Number.isNaN(year)) {
        years.add(year)
      }
    })

    // Tahun sekarang selalu tersedia
    years.add(currentYear)

    return Array.from(years).sort((a, b) => b - a)
  }, [transactions, currentYear])

  return (
    <AppShell>
      {/* HEADER */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="font-display text-2xl sm:text-3xl font-semibold">
          Statistik Keuangan
        </h1>
      </div>

      {/* FILTER PERIODE */}
      <div className="inline-flex rounded-full bg-paper-card border border-paper-line p-1 mb-6">
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

      {/* RINGKASAN */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <div className="card p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft mb-2">
            Total Pemasukan
          </p>

          <p className="font-display text-2xl font-semibold text-gain tabular-nums">
            {formatIDR(income)}
          </p>
        </div>

        <div className="card p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft mb-2">
            Total Pengeluaran
          </p>

          <p className="font-display text-2xl font-semibold text-loss tabular-nums">
            {formatIDR(expense)}
          </p>
        </div>

        <div className="card p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft mb-2">
            Saldo Bersih
          </p>

          <p className="font-display text-2xl font-semibold tabular-nums">
            {formatIDR(balance)}
          </p>
        </div>
      </div>

      {/* ==========================================
          PERBANDINGAN BULANAN
      ========================================== */}

      <div className="card p-5 sm:p-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div>
            <h2 className="font-display text-lg font-semibold">
              Perbandingan Bulanan
            </h2>

            <p className="text-sm text-ink-soft mt-1">
              Bandingkan pemasukan dan pengeluaran selama tahun {comparisonYear}.
            </p>
          </div>

          <select
            value={comparisonYear}
            onChange={(e) =>
              setComparisonYear(Number(e.target.value))
            }
            className="input sm:w-auto"
          >
            {availableYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthlyComparison}
              margin={{
                top: 10,
                right: 10,
                left: 10,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="month"
                tick={{ fontSize: 12 }}
              />

              <YAxis
                tick={{ fontSize: 11 }}
                tickFormatter={(value) =>
                  value >= 1000000
                    ? `${(value / 1000000).toFixed(1)}jt`
                    : value >= 1000
                      ? `${Math.round(value / 1000)}rb`
                      : value
                }
              />

              <Tooltip
                formatter={(value, name) => [
                  formatIDR(value),
                  name === 'income'
                    ? 'Pemasukan'
                    : 'Pengeluaran',
                ]}
              />

              <Legend
                formatter={(value) =>
                  value === 'income'
                    ? 'Pemasukan'
                    : 'Pengeluaran'
                }
              />

              <Bar
                dataKey="income"
                fill="#2F9E6E"
                radius={[5, 5, 0, 0]}
              />

              <Bar
                dataKey="expense"
                fill="#C0483F"
                radius={[5, 5, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ==========================================
          TABEL RINGKASAN BULANAN
      ========================================== */}

      <div className="card overflow-hidden mb-8">
        <div className="p-5 border-b border-paper-line">
          <h2 className="font-display text-lg font-semibold">
            Ringkasan {comparisonYear}
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-paper-line text-left">
                <th className="px-5 py-3 font-semibold text-ink-soft">
                  Bulan
                </th>

                <th className="px-5 py-3 font-semibold text-ink-soft">
                  Pemasukan
                </th>

                <th className="px-5 py-3 font-semibold text-ink-soft">
                  Pengeluaran
                </th>

                <th className="px-5 py-3 font-semibold text-ink-soft">
                  Saldo
                </th>
              </tr>
            </thead>

            <tbody>
              {monthlyComparison.map((month) => (
                <tr
                  key={month.month}
                  className="border-b border-paper-line last:border-0"
                >
                  <td className="px-5 py-3 font-medium">
                    {month.month}
                  </td>

                  <td className="px-5 py-3 font-mono text-gain">
                    {formatIDR(month.income)}
                  </td>

                  <td className="px-5 py-3 font-mono text-loss">
                    {formatIDR(month.expense)}
                  </td>

                  <td
                    className={`px-5 py-3 font-mono font-semibold ${
                      month.balance >= 0
                        ? 'text-gain'
                        : 'text-loss'
                    }`}
                  >
                    {formatIDR(month.balance)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ==========================================
          PENGELUARAN PER KATEGORI
      ========================================== */}

      <h2 className="font-display text-lg font-semibold mb-4">
        Pengeluaran per Kategori
      </h2>

      {loading ? (
        <div className="card p-8 text-center text-sm text-ink-soft">
          Memuat statistik…
        </div>
      ) : categoryData.length === 0 ? (
        <EmptyState
          title="Belum ada data pengeluaran"
          description="Tambahkan pengeluaran pada periode ini untuk melihat statistiknya."
        />
      ) : (
        <div className="grid lg:grid-cols-2 gap-4">
          {/* PIE CHART */}
          <div className="card p-5">
            <p className="text-sm font-medium mb-4">
              Distribusi Kategori
            </p>

            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius="55%"
                    outerRadius="85%"
                    paddingAngle={2}
                  >
                    {categoryData.map((_, i) => (
                      <Cell
                        key={i}
                        fill={
                          CATEGORY_COLORS[
                            i % CATEGORY_COLORS.length
                          ]
                        }
                      />
                    ))}
                  </Pie>

                  <Tooltip
                    formatter={(value) =>
                      formatIDR(value)
                    }
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4">
              {categoryData.map((c, i) => (
                <div
                  key={c.name}
                  className="flex items-center gap-2 text-xs"
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full shrink-0"
                    style={{
                      background:
                        CATEGORY_COLORS[
                          i % CATEGORY_COLORS.length
                        ],
                    }}
                  />

                  <span className="truncate flex-1">
                    {c.name}
                  </span>

                  <span className="font-mono text-ink-soft">
                    {formatIDR(c.value)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* BAR CHART */}
          <div className="card p-5">
            <p className="text-sm font-medium mb-4">
              Perbandingan Pengeluaran
            </p>

            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={categoryData}
                  layout="vertical"
                  margin={{
                    left: 8,
                    right: 16,
                  }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    horizontal={false}
                  />

                  <XAxis
                    type="number"
                    tickFormatter={(v) =>
                      formatIDR(v)
                    }
                    tick={{ fontSize: 11 }}
                  />

                  <YAxis
                    type="category"
                    dataKey="name"
                    width={90}
                    tick={{ fontSize: 11 }}
                  />

                  <Tooltip
                    formatter={(value) =>
                      formatIDR(value)
                    }
                  />

                  <Bar
                    dataKey="value"
                    fill="#1F3A34"
                    radius={[0, 6, 6, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  )
}