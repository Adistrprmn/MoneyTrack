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
    <div className="min-h-screen bg-paper text-ink transition-colors duration-300">

      {/* =====================================================
          HEADER
      ===================================================== */}
      <header className="max-w-6xl mx-auto px-5 sm:px-8 py-6 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Coins
            className="h-6 w-6 text-forest-500"
            strokeWidth={2}
          />

          <span className="font-display text-xl font-semibold">
            MoneyTrack
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Masuk */}
          <Link
            to="/login"
            className="
              inline-flex items-center justify-center
              rounded-lg
              border border-paper-line
              bg-paper-card
              px-4 py-2.5
              text-sm font-semibold
              text-ink
              transition-all duration-200
              hover:border-forest-300
              hover:bg-forest-50
              dark:hover:bg-forest-50
            "
          >
            Masuk
          </Link>

          {/* Buat Akun */}
          <Link
            to="/register"
            className="btn-primary text-sm"
          >
            Buat Akun
          </Link>

        </div>
      </header>


      {/* =====================================================
          MAIN
      ===================================================== */}
      <main>

        {/* ===================================================
            HERO
        =================================================== */}
        <section className="max-w-6xl mx-auto px-5 sm:px-8 pt-10 sm:pt-16 pb-14 grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <div>

            {/* Badge */}
            <p
              className="
                inline-flex items-center gap-2
                text-xs font-semibold uppercase tracking-wide
                text-forest-500
                bg-forest-50
                border border-forest-100
                rounded-full
                px-3 py-1.5
                mb-5
              "
            >
              Pencatat keuangan pribadi
            </p>

            {/* Heading */}
            <h1
              className="
                font-display
                text-4xl sm:text-5xl
                font-semibold
                leading-[1.08]
                mb-5
                text-ink
              "
            >
              Uangmu bergerak setiap hari.{' '}

              <span className="text-forest-500">
                Sekarang kamu bisa melihatnya.
              </span>
            </h1>

            {/* Description */}
            <p
              className="
                text-ink-soft
                text-base sm:text-lg
                leading-relaxed
                mb-8
                max-w-md
              "
            >
              MoneyTrack membantu kamu mencatat pemasukan dan pengeluaran,
              lalu menunjukkan kondisi keuanganmu dengan jelas — tanpa
              kerumitan spreadsheet.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-3">

              {/* Mulai Mencatat */}
              <Link
                to="/register"
                className="
                  btn-primary
                  text-sm
                  px-6 py-3
                  gap-2
                "
              >
                Mulai Mencatat

                <ArrowRight className="h-4 w-4" />
              </Link>

              {/* Sudah punya akun */}
              <Link
                to="/login"
                className="
                  inline-flex items-center justify-center
                  rounded-lg
                  border border-paper-line
                  bg-paper-card
                  px-6 py-3
                  text-sm font-semibold
                  text-ink
                  transition-all duration-200
                  hover:border-forest-300
                  hover:bg-forest-50
                  dark:hover:bg-forest-50
                "
              >
                Saya sudah punya akun
              </Link>

            </div>
          </div>


          {/* =================================================
              SALDO CARD
          ================================================= */}
          <div className="card p-6 sm:p-8 relative">

            <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft mb-1">
              Total Saldo
            </p>

            <p className="font-display text-4xl font-semibold text-forest-500 tabular-nums mb-6">
              Rp4.250.000
            </p>


            {/* Income & Expense */}
            <div className="grid grid-cols-2 gap-4 mb-6">

              {/* Income */}
              <div className="rounded-xl bg-gain-soft p-4">
                <p className="text-xs font-semibold text-gain/80 mb-1">
                  Pemasukan
                </p>

                <p className="font-mono font-semibold text-gain tabular-nums">
                  Rp8.100.000
                </p>
              </div>


              {/* Expense */}
              <div className="rounded-xl bg-loss-soft p-4">
                <p className="text-xs font-semibold text-loss/80 mb-1">
                  Pengeluaran
                </p>

                <p className="font-mono font-semibold text-loss tabular-nums">
                  Rp3.850.000
                </p>
              </div>

            </div>


            {/* Progress */}
            <div className="h-2 w-full rounded-full bg-paper-line overflow-hidden flex">
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


        {/* ===================================================
            FEATURES
        =================================================== */}
        <section className="bg-forest-500 text-white">

          <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14 grid sm:grid-cols-3 gap-8">

            {FEATURES.map(({ icon: Icon, title, desc }) => (

              <div key={title}>

                {/* Icon */}
                <div
                  className="
                    h-10 w-10
                    rounded-full
                    bg-white/10
                    flex items-center justify-center
                    mb-4
                  "
                >
                  <Icon
                    className="h-5 w-5 text-gold"
                    strokeWidth={2}
                  />
                </div>

                {/* Title */}
                <h3 className="font-display text-lg font-semibold mb-2">
                  {title}
                </h3>

                {/* Description */}
                <p className="text-sm text-forest-100 leading-relaxed">
                  {desc}
                </p>

              </div>

            ))}

          </div>

        </section>


        {/* ===================================================
            CTA
        =================================================== */}
        <section className="max-w-6xl mx-auto px-5 sm:px-8 py-16 text-center">

          <h2 className="font-display text-2xl sm:text-3xl font-semibold mb-3 text-ink">
            Siap tahu ke mana uangmu pergi?
          </h2>

          <p className="text-ink-soft mb-7 max-w-md mx-auto">
            Gratis, dan siap dipakai di ponsel, tablet, maupun laptop kamu.
          </p>

          <Link
            to="/register"
            className="
              btn-primary
              text-sm
              px-6 py-3
              inline-flex
              gap-2
            "
          >
            Buat Akun Gratis

            <ArrowRight className="h-4 w-4" />
          </Link>

        </section>

      </main>


      {/* =====================================================
          FOOTER
      ===================================================== */}
      <footer className="border-t border-paper-line">

        <div
          className="
            max-w-6xl mx-auto
            px-5 sm:px-8
            py-6
            text-xs text-ink-soft
            flex flex-col sm:flex-row
            items-center
            justify-between
            gap-2
          "
        >
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