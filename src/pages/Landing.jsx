import { Link } from 'react-router-dom'
import {
  Coins,
  ArrowRight,
  Wallet,
  LineChart,
  ShieldCheck,
  Moon,
  Sun,
} from 'lucide-react'
import { useTheme } from '../contexts/useTheme'

const FEATURES = [
  {
    icon: Wallet,
    title: 'Catat dalam hitungan detik',
    desc: 'Tambah pemasukan atau pengeluaran cukup dengan nominal, kategori, dan tanggal. Tidak ada langkah yang berbelit.',
  },
  {
    icon: LineChart,
    title: 'Lihat arahnya, bukan cuma angkanya',
    desc: 'Ringkasan mingguan, bulanan, dan tahunan menunjukkan ke mana uangmu benar-benar pergi.',
  },
  {
    icon: ShieldCheck,
    title: 'Datamu, hanya untukmu',
    desc: 'Setiap catatan tersimpan aman dan hanya bisa diakses oleh akunmu sendiri.',
  },
]

export default function Landing() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen bg-paper dark:bg-[#0F1715] text-ink dark:text-white transition-colors duration-300">
      {/* HEADER */}
      <header className="max-w-6xl mx-auto px-5 sm:px-8 py-6 flex items-center justify-between">
        {/* LOGO */}
        <div className="flex items-center gap-2">
          <Coins
            className="h-6 w-6 text-forest-500 dark:text-gold"
            strokeWidth={2}
          />

          <span className="font-display text-xl font-semibold whitespace-nowrap">
            {'MoneyTrack'.split('').map((letter, index) => (
              <span
                key={`${letter}-${index}`}
                className="logo-letter"
                style={{
                  animationDelay: `${index * 0.08}s`,
                }}
              >
                {letter}
              </span>
            ))}
          </span>
        </div>

        {/* HEADER BUTTONS */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* THEME */}
          <button
            onClick={toggleTheme}
            className="
              h-9 w-9 rounded-full
              flex items-center justify-center
              border border-paper-line dark:border-white/10
              bg-paper-card dark:bg-[#17221F]
              text-forest-500 dark:text-gold
              hover:scale-105
              hover:shadow-sm
              transition-all duration-200
            "
            aria-label="Ganti tema"
            title={theme === 'dark' ? 'Mode terang' : 'Mode gelap'}
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4" strokeWidth={2} />
            ) : (
              <Moon className="h-4 w-4" strokeWidth={2} />
            )}
          </button>

          {/* LOGIN */}
          <Link
            to="/login"
            className="
              btn-ghost text-sm
              transition-all duration-200
              hover:-translate-y-0.5
              hover:bg-forest-50
              dark:hover:bg-white/10
            "
          >
            Masuk
          </Link>

          {/* REGISTER */}
          <Link
            to="/register"
            className="
              btn-primary text-sm
              transition-all duration-200
              hover:-translate-y-0.5
              hover:shadow-md
            "
          >
            Buat Akun
          </Link>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="max-w-6xl mx-auto px-5 sm:px-8 pt-10 sm:pt-16 pb-14 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-forest-500 dark:text-gold bg-forest-50 dark:bg-white/10 rounded-full px-3 py-1.5 mb-5">
              Pencatat keuangan pribadi
            </p>

            <h1 className="font-display text-4xl sm:text-5xl font-semibold leading-[1.08] mb-5">
              Uangmu bergerak setiap hari.{' '}
              <span className="text-forest-500 dark:text-gold">
                Sekarang kamu bisa melihatnya.
              </span>
            </h1>

            <p className="text-ink-soft dark:text-white/65 text-base sm:text-lg leading-relaxed mb-8 max-w-md">
              MoneyTrack membantu kamu mencatat pemasukan dan pengeluaran,
              lalu menunjukkan kondisi keuanganmu dengan jelas — tanpa
              kerumitan spreadsheet.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/register"
                className="
                  btn-primary text-sm px-6 py-3
                  transition-all duration-200
                  hover:-translate-y-0.5
                  hover:shadow-md
                "
              >
                Mulai Mencatat
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                to="/login"
                className="
                  btn-secondary text-sm px-6 py-3
                  transition-all duration-200
                  hover:-translate-y-0.5
                "
              >
                Saya sudah punya akun
              </Link>
            </div>
          </div>

          {/* SALDO PREVIEW */}
          <div className="card p-6 sm:p-8 relative">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft dark:text-white/55 mb-1">
              Total Saldo
            </p>

            <p className="font-display text-4xl font-semibold text-forest-500 dark:text-gold tabular-nums mb-6">
              Rp4.250.000
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="rounded-xl bg-gain-soft dark:bg-gain/10 p-4">
                <p className="text-xs font-semibold text-gain/80 mb-1">
                  Pemasukan
                </p>

                <p className="font-mono font-semibold text-gain tabular-nums">
                  Rp8.100.000
                </p>
              </div>

              <div className="rounded-xl bg-loss-soft dark:bg-loss/10 p-4">
                <p className="text-xs font-semibold text-loss/80 mb-1">
                  Pengeluaran
                </p>

                <p className="font-mono font-semibold text-loss tabular-nums">
                  Rp3.850.000
                </p>
              </div>
            </div>

            <div className="h-2 w-full rounded-full bg-paper dark:bg-white/10 overflow-hidden flex">
              <div
                className="h-full bg-gain"
                style={{ width: '68%' }}
              />

              <div
                className="h-full bg-loss"
                style={{ width: '32%' }}
              />
            </div>

            <p className="text-xs text-ink-soft dark:text-white/55 mt-2">
              Proporsi pemasukan terhadap pengeluaran bulan ini
            </p>
          </div>
        </section>

        {/* FEATURES */}
        <section className="bg-forest-500 dark:bg-[#121E1B] text-white transition-colors duration-300">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14 grid sm:grid-cols-3 gap-8">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title}>
                <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center mb-4">
                  <Icon
                    className="h-5 w-5 text-gold"
                    strokeWidth={2}
                  />
                </div>

                <h3 className="font-display text-lg font-semibold mb-2">
                  {title}
                </h3>

                <p className="text-sm text-forest-100 leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-6xl mx-auto px-5 sm:px-8 py-16 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold mb-3">
            Siap tahu ke mana uangmu pergi?
          </h2>

          <p className="text-ink-soft dark:text-white/60 mb-7 max-w-md mx-auto">
            Gratis, dan siap dipakai di ponsel, tablet, maupun laptop kamu.
          </p>

          <Link
            to="/register"
            className="
              btn-primary text-sm px-6 py-3 inline-flex
              transition-all duration-200
              hover:-translate-y-0.5
              hover:shadow-md
            "
          >
            Buat Akun Gratis
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-paper-line dark:border-white/10">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-6 text-xs text-ink-soft dark:text-white/50 flex items-center justify-between gap-4">
          <span>
            © {new Date().getFullYear()} MoneyTrack
          </span>

          <span className="text-right">
            Dibuat untuk mencatat, bukan menghakimi.
          </span>
        </div>
      </footer>
    </div>
  )
}