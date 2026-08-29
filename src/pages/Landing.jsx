import { Link } from 'react-router-dom'
import {
  Coins,
  ArrowRight,
  Wallet,
  LineChart,
  ShieldCheck,
} from 'lucide-react'

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
  return (
    <div className="min-h-screen bg-paper">
      {/* HEADER */}
      <header className="max-w-6xl mx-auto px-5 sm:px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Coins
            className="h-6 w-6 text-forest-500"
            strokeWidth={2}
          />

          {/* LOGO MONEYTRACK */}
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

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/login"
            className="btn-ghost text-sm"
          >
            Masuk
          </Link>

          <Link
            to="/register"
            className="btn-primary text-sm"
          >
            Buat Akun
          </Link>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="max-w-6xl mx-auto px-5 sm:px-8 pt-10 sm:pt-16 pb-14 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-forest-500 bg-forest-50 rounded-full px-3 py-1.5 mb-5">
              Pencatat keuangan pribadi
            </p>

            <h1 className="font-display text-4xl sm:text-5xl font-semibold leading-[1.08] mb-5">
              Uangmu bergerak setiap hari.{' '}
              <span className="text-forest-500">
                Sekarang kamu bisa melihatnya.
              </span>
            </h1>

            <p className="text-ink-soft text-base sm:text-lg leading-relaxed mb-8 max-w-md">
              MoneyTrack membantu kamu mencatat pemasukan dan pengeluaran,
              lalu menunjukkan kondisi keuanganmu dengan jelas — tanpa
              kerumitan spreadsheet.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/register"
                className="btn-primary text-sm px-6 py-3"
              >
                Mulai Mencatat
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                to="/login"
                className="btn-secondary text-sm px-6 py-3"
              >
                Saya sudah punya akun
              </Link>
            </div>
          </div>

          {/* PREVIEW SALDO */}
          <div className="card p-6 sm:p-8 relative">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft mb-1">
              Total Saldo
            </p>

            <p className="font-display text-4xl font-semibold text-forest-500 tabular-nums mb-6">
              Rp4.250.000
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="rounded-xl bg-gain-soft p-4">
                <p className="text-xs font-semibold text-gain/80 mb-1">
                  Pemasukan
                </p>

                <p className="font-mono font-semibold text-gain tabular-nums">
                  Rp8.100.000
                </p>
              </div>

              <div className="rounded-xl bg-loss-soft p-4">
                <p className="text-xs font-semibold text-loss/80 mb-1">
                  Pengeluaran
                </p>

                <p className="font-mono font-semibold text-loss tabular-nums">
                  Rp3.850.000
                </p>
              </div>
            </div>

            <div className="h-2 w-full rounded-full bg-paper overflow-hidden flex">
              <div
                className="h-full bg-gain"
                style={{ width: '68%' }}
              />

              <div
                className="h-full bg-loss"
                style={{ width: '32%' }}
              />
            </div>

            <p className="text-xs text-ink-soft mt-2">
              Proporsi pemasukan terhadap pengeluaran bulan ini
            </p>
          </div>
        </section>

        {/* FEATURES */}
        <section className="bg-forest-500 text-white">
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

          <p className="text-ink-soft mb-7 max-w-md mx-auto">
            Gratis, dan siap dipakai di ponsel, tablet, maupun laptop kamu.
          </p>

          <Link
            to="/register"
            className="btn-primary text-sm px-6 py-3 inline-flex"
          >
            Buat Akun Gratis
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-paper-line">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-6 text-xs text-ink-soft flex items-center justify-between">
          <span>
            © {new Date().getFullYear()} MoneyTrack
          </span>

          <span>
            Dibuat untuk mencatat, bukan menghakimi.
          </span>
        </div>
      </footer>
    </div>
  )
}