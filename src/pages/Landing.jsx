import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Coins,
  ArrowRight,
  Wallet,
  LineChart,
  ShieldCheck,
  Moon,
  Sun,
  TrendingUp,
  TrendingDown,
  Receipt,
  Sparkles,
  Plus,
  CheckCircle2,
  X,
} from 'lucide-react'

import { useTheme } from '../contexts/useTheme'

const FEATURES = [
  {
    icon: Wallet,
    title: 'Catat dalam hitungan detik',
    desc: 'Tambah pemasukan atau pengeluaran cukup dengan nominal, kategori, dan tanggal.',
  },
  {
    icon: LineChart,
    title: 'Lihat arah keuanganmu',
    desc: 'Ringkasan mingguan, bulanan, dan tahunan membantu melihat ke mana uangmu pergi.',
  },
  {
    icon: ShieldCheck,
    title: 'Datamu tetap milikmu',
    desc: 'Catatan keuangan tersimpan pada akunmu dan tidak tercampur dengan pengguna lain.',
  },
]

const TRANSACTIONS = [
  {
    category: 'Gaji',
    note: 'Pemasukan bulanan',
    amount: 8100000,
    type: 'income',
  },
  {
    category: 'Makanan',
    note: 'Makan siang',
    amount: 35000,
    type: 'expense',
  },
  {
    category: 'Transportasi',
    note: 'Bensin',
    amount: 100000,
    type: 'expense',
  },
  {
    category: 'Freelance',
    note: 'Project desain',
    amount: 750000,
    type: 'income',
  },
]

const STEPS = [
  {
    number: '01',
    icon: Plus,
    title: 'Catat transaksi',
    desc: 'Masukkan pemasukan atau pengeluaran yang baru saja terjadi.',
  },
  {
    number: '02',
    icon: Receipt,
    title: 'Pilih kategori',
    desc: 'Kelompokkan transaksi supaya kamu tahu uangmu paling banyak digunakan untuk apa.',
  },
  {
    number: '03',
    icon: LineChart,
    title: 'Lihat perkembangannya',
    desc: 'Pantau saldo, pemasukan, pengeluaran, dan insight keuanganmu.',
  },
]

const BENEFITS = [
  'Pencatatan pemasukan',
  'Pencatatan pengeluaran',
  'Kategori transaksi',
  'Ringkasan keuangan',
  'Insight pengeluaran',
  'Mode terang & gelap',
]

function formatIDR(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount)
}

export default function Landing() {
  const { theme, toggleTheme } = useTheme()

  // =====================================================
  // WELCOME NOTIFICATION
  // =====================================================

  const [showWelcome, setShowWelcome] = useState(false)

  useEffect(() => {
    const welcomeShown = sessionStorage.getItem(
      'moneytrack-welcome-shown'
    )

    if (!welcomeShown) {
      setShowWelcome(true)

      sessionStorage.setItem(
        'moneytrack-welcome-shown',
        'true'
      )

      const timer = setTimeout(() => {
        setShowWelcome(false)
      }, 4500)

      return () => clearTimeout(timer)
    }
  }, [])

  const closeWelcome = () => {
    setShowWelcome(false)
  }

  return (
    <div className="landing-page min-h-screen bg-paper text-ink transition-colors duration-300">

      {/* =====================================================
          WELCOME NOTIFICATION
      ===================================================== */}

      {showWelcome && (
        <div
          className="
            fixed
            top-5
            right-5
            z-[100]
            w-[calc(100%-2.5rem)]
            max-w-sm
            animate-[welcomeSlideIn_0.45s_ease-out]
          "
        >
          <div
            className="
              relative
              overflow-hidden
              rounded-2xl
              border
              border-paper-line
              bg-paper-card
              shadow-[0_18px_50px_rgba(20,50,43,0.16)]
              dark:border-white/10
              dark:bg-[#17221F]
              dark:shadow-[0_18px_50px_rgba(0,0,0,0.35)]
            "
          >

            {/* GARIS HIJAU ATAS */}

            <div
              className="
                absolute
                top-0
                left-0
                right-0
                h-1
                bg-forest-500
                dark:bg-gold
              "
            />

            <div className="flex items-start gap-3 p-4">

              {/* ICON */}

              <div
                className="
                  h-10
                  w-10
                  shrink-0
                  rounded-xl
                  bg-forest-50
                  dark:bg-forest-500/10
                  flex
                  items-center
                  justify-center
                "
              >
                <Sparkles
                  className="
                    h-5
                    w-5
                    text-forest-500
                    dark:text-gold
                  "
                />
              </div>


              {/* TEXT */}

              <div className="flex-1 min-w-0 pr-5">

                <p
                  className="
                    text-sm
                    font-semibold
                    text-ink
                    dark:text-white
                  "
                >
                  Selamat datang di MoneyTrack! 👋
                </p>

                <p
                  className="
                    text-xs
                    leading-relaxed
                    text-ink-soft
                    dark:text-white/60
                    mt-1
                  "
                >
                  Catat pemasukan dan pengeluaranmu
                  dengan lebih mudah dan teratur.
                </p>

              </div>


              {/* CLOSE */}

              <button
                type="button"
                onClick={closeWelcome}
                className="
                  absolute
                  top-3
                  right-3
                  h-7
                  w-7
                  rounded-full
                  flex
                  items-center
                  justify-center
                  text-ink-soft
                  dark:text-white/50
                  hover:bg-forest-50
                  dark:hover:bg-white/10
                  hover:text-ink
                  dark:hover:text-white
                  transition-colors
                "
                aria-label="Tutup notifikasi"
              >
                <X className="h-4 w-4" />
              </button>

            </div>

            {/* PROGRESS BAR */}

            <div
              className="
                absolute
                bottom-0
                left-0
                h-[2px]
                bg-forest-500
                dark:bg-gold
                animate-[welcomeProgress_4.5s_linear_forwards]
              "
            />

          </div>
        </div>
      )}


      {/* =====================================================
          FLOATING MONEY
      ===================================================== */}

      <div
        className="money-float-container"
        aria-hidden="true"
      >

        <span className="money-float money-float-1 income">
          Rp250.000 ↑
        </span>

        <span className="money-float money-float-2 income">
          Rp75.000 ↑
        </span>

        <span className="money-float money-float-3 income">
          Rp1.500.000 ↑
        </span>

        <span className="money-float money-float-4 income">
          Rp875.000 ↑
        </span>

        <span className="money-float money-float-5 income">
          Rp50.000 ↑
        </span>

        <span className="money-float money-float-6 income">
          Rp320.000 ↑
        </span>

        <span className="money-float money-float-7 expense">
          Rp125.000 ↓
        </span>

        <span className="money-float money-float-8 expense">
          Rp85.000 ↓
        </span>

        <span className="money-float money-float-9 expense">
          Rp450.000 ↓
        </span>

        <span className="money-float money-float-10 expense">
          Rp200.000 ↓
        </span>

      </div>


      {/* =====================================================
          HEADER
      ===================================================== */}

      <header
        className="
          relative
          z-20
          max-w-6xl
          mx-auto
          px-5
          sm:px-8
          py-5
          sm:py-6
        "
      >

        <div className="flex items-center justify-between">

          {/* LOGO */}

          <Link
            to="/"
            className="flex items-center gap-2 text-ink no-underline"
          >

            <Coins
              className="
                h-6
                w-6
                text-forest-500
                dark:text-gold
              "
              strokeWidth={2}
            />

            <span
              className="
                font-display
                text-xl
                font-semibold
              "
            >

              {'MoneyTrack'.split('').map(
                (letter, index) => (
                  <span
                    key={`${letter}-${index}`}
                    className="logo-letter"
                    style={{
                      animationDelay: `${index * 0.08}s`,
                    }}
                  >
                    {letter}
                  </span>
                )
              )}

            </span>

          </Link>


          {/* NAVIGATION */}

          <div className="flex items-center gap-1.5 sm:gap-3">

            {/* THEME */}

            <button
              type="button"
              onClick={toggleTheme}
              className="
                h-9
                w-9
                sm:h-10
                sm:w-10
                rounded-full
                flex
                items-center
                justify-center
                border
                border-paper-line
                bg-paper-card
                text-forest-500
                dark:text-gold
                hover:scale-105
                transition-all
              "
              aria-label="Ganti tema"
              title={
                theme === 'dark'
                  ? 'Mode terang'
                  : 'Mode gelap'
              }
            >

              {theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}

            </button>


            {/* LOGIN */}

            <Link
              to="/login"
              className="
                btn-ghost
                text-xs
                sm:text-sm
                px-2.5
                sm:px-3
                transition-all
                hover:-translate-y-0.5
              "
            >
              Masuk
            </Link>


            {/* REGISTER */}

            <Link
              to="/register"
              className="
                btn-primary
                text-xs
                sm:text-sm
                px-3
                sm:px-4
                py-2
                sm:py-2.5
                transition-all
                hover:-translate-y-0.5
                hover:shadow-md
              "
            >

              <span className="hidden sm:inline">
                Buat Akun
              </span>

              <span className="sm:hidden">
                Daftar
              </span>

            </Link>

          </div>

        </div>

      </header>


      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="relative z-10">


        {/* ===================================================
            HERO
        =================================================== */}

        <section
          className="
            max-w-6xl
            mx-auto
            px-5
            sm:px-8
            pt-10
            sm:pt-16
            pb-16
            sm:pb-24
            grid
            lg:grid-cols-2
            gap-12
            lg:gap-16
            items-center
          "
        >

          {/* HERO TEXT */}

          <div>

            {/* BADGE */}

            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-forest-50
                dark:bg-forest-500/10
                border
                border-forest-100
                dark:border-forest-300/20
                px-3
                py-1.5
                mb-5
              "
            >

              <Sparkles
                className="
                  h-3.5
                  w-3.5
                  text-forest-500
                  dark:text-gold
                "
              />

              <span
                className="
                  text-xs
                  font-semibold
                  text-forest-500
                  dark:text-gold
                "
              >
                Pencatat keuangan pribadi
              </span>

            </div>


            {/* TITLE */}

            <h1
              className="
                font-display
                text-4xl
                sm:text-5xl
                lg:text-6xl
                font-semibold
                leading-[1.05]
                tracking-tight
                mb-6
              "
            >

              Uangmu bergerak setiap hari.

              <span
                className="
                  block
                  text-forest-500
                  dark:text-gold
                  mt-2
                "
              >
                Jangan sampai kamu kehilangan arahnya.
              </span>

            </h1>


            {/* DESCRIPTION */}

            <p
              className="
                text-ink-soft
                dark:text-white/65
                text-base
                sm:text-lg
                leading-relaxed
                mb-8
                max-w-xl
              "
            >
              MoneyTrack membantu kamu mencatat pemasukan
              dan pengeluaran, melihat pola penggunaan uang,
              dan memahami kondisi keuanganmu dengan lebih jelas.
            </p>


            {/* BUTTON */}

            <div className="flex flex-wrap items-center gap-3">

              <Link
                to="/register"
                className="
                  btn-primary
                  text-sm
                  px-6
                  py-3
                  transition-all
                  hover:-translate-y-0.5
                  hover:shadow-lg
                "
              >

                Mulai Mencatat

                <ArrowRight className="h-4 w-4" />

              </Link>


              <Link
                to="/login"
                className="
                  btn-secondary
                  text-sm
                  px-6
                  py-3
                  transition-all
                  hover:-translate-y-0.5
                "
              >
                Saya sudah punya akun
              </Link>

            </div>


            {/* SMALL TRUST */}

            <div
              className="
                flex
                flex-wrap
                items-center
                gap-x-5
                gap-y-2
                mt-7
                text-xs
                text-ink-soft
                dark:text-white/45
              "
            >

              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-gain" />
                Gratis digunakan
              </span>

              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-gain" />
                Responsive
              </span>

              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-gain" />
                Mudah digunakan
              </span>

            </div>

          </div>


          {/* =================================================
              DASHBOARD PREVIEW
          ================================================= */}

          <div className="relative">

            {/* GLOW */}

            <div
              className="
                absolute
                -inset-6
                bg-forest-500/5
                dark:bg-gain/5
                blur-3xl
                rounded-full
                pointer-events-none
              "
            />


            {/* CARD */}

            <div
              className="
                relative
                card
                p-5
                sm:p-7
                overflow-hidden
              "
            >

              {/* TOP */}

              <div className="flex items-start justify-between mb-6">

                <div>

                  <p
                    className="
                      text-xs
                      font-semibold
                      uppercase
                      tracking-wide
                      text-ink-soft
                      mb-1
                    "
                  >
                    Total Saldo
                  </p>

                  <p
                    className="
                      font-display
                      text-3xl
                      sm:text-4xl
                      font-semibold
                      text-forest-500
                      dark:text-gold
                      tabular-nums
                    "
                  >
                    Rp4.250.000
                  </p>

                </div>


                <div
                  className="
                    h-10
                    w-10
                    rounded-xl
                    bg-forest-50
                    dark:bg-gain/10
                    flex
                    items-center
                    justify-center
                  "
                >

                  <Wallet
                    className="
                      h-5
                      w-5
                      text-forest-500
                      dark:text-gold
                    "
                  />

                </div>

              </div>


              {/* INCOME EXPENSE */}

              <div className="grid grid-cols-2 gap-3 mb-6">

                <div
                  className="
                    rounded-xl
                    bg-gain-soft
                    dark:bg-gain/10
                    p-4
                  "
                >

                  <div className="flex items-center gap-1.5 mb-1">

                    <TrendingUp
                      className="h-3.5 w-3.5 text-gain"
                    />

                    <p className="text-xs font-semibold text-gain">
                      Pemasukan
                    </p>

                  </div>

                  <p
                    className="
                      font-mono
                      text-sm
                      sm:text-base
                      font-semibold
                      text-gain
                    "
                  >
                    Rp8.100.000
                  </p>

                </div>


                <div
                  className="
                    rounded-xl
                    bg-loss-soft
                    dark:bg-loss/10
                    p-4
                  "
                >

                  <div className="flex items-center gap-1.5 mb-1">

                    <TrendingDown
                      className="h-3.5 w-3.5 text-loss"
                    />

                    <p className="text-xs font-semibold text-loss">
                      Pengeluaran
                    </p>

                  </div>

                  <p
                    className="
                      font-mono
                      text-sm
                      sm:text-base
                      font-semibold
                      text-loss
                    "
                  >
                    Rp3.850.000
                  </p>

                </div>

              </div>


              {/* PROGRESS */}

              <div className="mb-6">

                <div
                  className="
                    flex
                    justify-between
                    text-xs
                    text-ink-soft
                    mb-2
                  "
                >

                  <span>
                    Keuangan bulan ini
                  </span>

                  <span className="font-semibold text-gain">
                    +Rp4.250.000
                  </span>

                </div>

                <div
                  className="
                    h-2
                    rounded-full
                    bg-paper
                    overflow-hidden
                    flex
                  "
                >

                  <div
                    className="h-full bg-gain"
                    style={{ width: '68%' }}
                  />

                  <div
                    className="h-full bg-loss"
                    style={{ width: '32%' }}
                  />

                </div>

              </div>


              {/* RECENT */}

              <div>

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    mb-3
                  "
                >

                  <p className="text-sm font-semibold">
                    Transaksi terbaru
                  </p>

                  <span
                    className="
                      text-xs
                      text-forest-500
                      dark:text-gold
                    "
                  >
                    Bulan ini
                  </span>

                </div>


                <div className="space-y-1">

                  {TRANSACTIONS.map((transaction) => (

                    <div
                      key={`${transaction.category}-${transaction.note}`}
                      className="
                        flex
                        items-center
                        gap-3
                        py-2.5
                        border-b
                        last:border-0
                        border-paper-line
                      "
                    >

                      <div
                        className={`
                          h-8
                          w-8
                          rounded-lg
                          flex
                          items-center
                          justify-center
                          shrink-0
                          ${
                            transaction.type === 'income'
                              ? 'bg-gain-soft dark:bg-gain/10'
                              : 'bg-loss-soft dark:bg-loss/10'
                          }
                        `}
                      >

                        {transaction.type === 'income' ? (
                          <TrendingUp
                            className="h-4 w-4 text-gain"
                          />
                        ) : (
                          <TrendingDown
                            className="h-4 w-4 text-loss"
                          />
                        )}

                      </div>


                      <div className="flex-1 min-w-0">

                        <p className="text-xs font-semibold truncate">
                          {transaction.category}
                        </p>

                        <p className="text-[11px] text-ink-soft truncate">
                          {transaction.note}
                        </p>

                      </div>


                      <p
                        className={`
                          font-mono
                          text-xs
                          font-semibold
                          shrink-0
                          ${
                            transaction.type === 'income'
                              ? 'text-gain'
                              : 'text-loss'
                          }
                        `}
                      >

                        {transaction.type === 'income'
                          ? '+'
                          : '−'}

                        {formatIDR(transaction.amount)}

                      </p>

                    </div>

                  ))}

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* ===================================================
            FEATURES
        =================================================== */}

        <section
          className="
            relative
            bg-forest-500
            dark:bg-[#121E1B]
            text-white
          "
        >

          <div
            className="
              max-w-6xl
              mx-auto
              px-5
              sm:px-8
              py-14
              sm:py-16
            "
          >

            <div
              className="
                grid
                sm:grid-cols-3
                gap-8
              "
            >

              {FEATURES.map(
                ({ icon: Icon, title, desc }) => (

                  <div key={title}>

                    <div
                      className="
                        h-10
                        w-10
                        rounded-full
                        bg-white/10
                        flex
                        items-center
                        justify-center
                        mb-4
                      "
                    >

                      <Icon
                        className="h-5 w-5 text-gold"
                      />

                    </div>


                    <h3
                      className="
                        font-display
                        text-lg
                        font-semibold
                        mb-2
                      "
                    >
                      {title}
                    </h3>


                    <p
                      className="
                        text-sm
                        text-forest-100
                        leading-relaxed
                      "
                    >
                      {desc}
                    </p>

                  </div>

                )
              )}

            </div>

          </div>

        </section>


        {/* ===================================================
            HOW IT WORKS
        =================================================== */}

        <section
          className="
            max-w-6xl
            mx-auto
            px-5
            sm:px-8
            py-16
            sm:py-20
          "
        >

          <div className="max-w-2xl mb-10">

            <p
              className="
                text-xs
                font-semibold
                uppercase
                tracking-wide
                text-forest-500
                dark:text-gold
                mb-2
              "
            >
              Cara kerja
            </p>

            <h2
              className="
                font-display
                text-2xl
                sm:text-3xl
                font-semibold
                mb-3
              "
            >
              Sesederhana mencatat uangmu.
            </h2>

            <p
              className="
                text-sm
                sm:text-base
                text-ink-soft
                max-w-xl
              "
            >
              Tidak perlu spreadsheet rumit atau
              perhitungan manual. Catat, kategorikan,
              lalu lihat hasilnya.
            </p>

          </div>


          <div
            className="
              grid
              md:grid-cols-3
              gap-5
            "
          >

            {STEPS.map(
              ({
                number,
                icon: Icon,
                title,
                desc,
              }) => (

                <div
                  key={number}
                  className="
                    card
                    p-6
                    relative
                    overflow-hidden
                    hover:-translate-y-1
                    transition-transform
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      mb-6
                    "
                  >

                    <div
                      className="
                        h-11
                        w-11
                        rounded-xl
                        bg-forest-50
                        dark:bg-forest-500/10
                        flex
                        items-center
                        justify-center
                      "
                    >

                      <Icon
                        className="
                          h-5
                          w-5
                          text-forest-500
                          dark:text-gold
                        "
                      />

                    </div>

                    <span
                      className="
                        font-mono
                        text-xs
                        font-semibold
                        text-ink-soft
                      "
                    >
                      {number}
                    </span>

                  </div>


                  <h3
                    className="
                      font-display
                      text-lg
                      font-semibold
                      mb-2
                    "
                  >
                    {title}
                  </h3>


                  <p
                    className="
                      text-sm
                      text-ink-soft
                      leading-relaxed
                    "
                  >
                    {desc}
                  </p>

                </div>

              )
            )}

          </div>

        </section>


        {/* ===================================================
            INSIGHT PREVIEW
        =================================================== */}

        <section
          className="
            max-w-6xl
            mx-auto
            px-5
            sm:px-8
            pb-16
            sm:pb-20
          "
        >

          <div
            className="
              grid
              lg:grid-cols-2
              gap-6
            "
          >

            {/* INSIGHT */}

            <div
              className="
                card
                p-6
                sm:p-7
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-3
                  mb-6
                "
              >

                <div
                  className="
                    h-10
                    w-10
                    rounded-xl
                    bg-gain-soft
                    dark:bg-gain/10
                    flex
                    items-center
                    justify-center
                  "
                >

                  <LineChart
                    className="h-5 w-5 text-gain"
                  />

                </div>

                <div>

                  <p className="text-sm font-semibold">
                    Insight keuangan
                  </p>

                  <p className="text-xs text-ink-soft">
                    Contoh analisis MoneyTrack
                  </p>

                </div>

              </div>


              <div
                className="
                  rounded-xl
                  bg-paper
                  p-4
                  mb-3
                "
              >

                <p
                  className="
                    text-xs
                    text-ink-soft
                    mb-1
                  "
                >
                  Pengeluaran terbesar
                </p>

                <div className="flex items-end justify-between gap-3">

                  <p className="font-display text-xl font-semibold">
                    Makanan
                  </p>

                  <p className="font-mono text-sm font-semibold text-loss">
                    Rp1.250.000
                  </p>

                </div>

                <div
                  className="
                    h-2
                    bg-paper-card
                    border
                    border-paper-line
                    rounded-full
                    overflow-hidden
                    mt-3
                  "
                >

                  <div
                    className="h-full bg-loss rounded-full"
                    style={{ width: '64%' }}
                  />

                </div>

                <p
                  className="
                    text-xs
                    text-ink-soft
                    mt-2
                  "
                >
                  64% dari total pengeluaran bulan ini
                </p>

              </div>


              <div
                className="
                  rounded-xl
                  bg-paper
                  p-4
                "
              >

                <p
                  className="
                    text-xs
                    text-ink-soft
                    mb-1
                  "
                >
                  Kondisi keuangan
                </p>

                <p className="text-sm leading-relaxed">

                  Pemasukanmu saat ini lebih besar
                  daripada pengeluaran sebesar{' '}

                  <span className="font-semibold text-gain">
                    Rp4.250.000
                  </span>
                  .

                </p>

              </div>

            </div>


            {/* BENEFITS */}

            <div
              className="
                rounded-xl
                bg-forest-500
                dark:bg-[#121E1B]
                text-white
                p-6
                sm:p-7
              "
            >

              <p
                className="
                  text-xs
                  uppercase
                  tracking-wide
                  font-semibold
                  text-gold
                  mb-2
                "
              >
                Yang kamu dapatkan
              </p>

              <h2
                className="
                  font-display
                  text-2xl
                  font-semibold
                  mb-6
                "
              >
                Semua yang kamu butuhkan
                untuk mulai lebih sadar finansial.
              </h2>


              <div className="grid sm:grid-cols-2 gap-3">

                {BENEFITS.map((benefit) => (

                  <div
                    key={benefit}
                    className="
                      flex
                      items-center
                      gap-2.5
                      text-sm
                      text-forest-100
                    "
                  >

                    <CheckCircle2
                      className="
                        h-4
                        w-4
                        text-gold
                        shrink-0
                      "
                    />

                    {benefit}

                  </div>

                ))}

              </div>

            </div>

          </div>

        </section>


        {/* ===================================================
            FINAL CTA
        =================================================== */}

        <section
          className="
            border-t
            border-paper-line
          "
        >

          <div
            className="
              max-w-6xl
              mx-auto
              px-5
              sm:px-8
              py-16
              sm:py-20
              text-center
            "
          >

            <div
              className="
                inline-flex
                items-center
                justify-center
                h-11
                w-11
                rounded-full
                bg-forest-50
                dark:bg-forest-500/10
                mb-5
              "
            >

              <Coins
                className="
                  h-5
                  w-5
                  text-forest-500
                  dark:text-gold
                "
              />

            </div>


            <h2
              className="
                font-display
                text-2xl
                sm:text-3xl
                font-semibold
                mb-3
              "
            >
              Siap tahu ke mana uangmu pergi?
            </h2>


            <p
              className="
                text-sm
                sm:text-base
                text-ink-soft
                mb-7
                max-w-md
                mx-auto
              "
            >
              Mulai catat transaksi pertamamu dan
              lihat kondisi keuanganmu dengan cara
              yang lebih sederhana.
            </p>


            <Link
              to="/register"
              className="
                btn-primary
                text-sm
                px-6
                py-3
                inline-flex
                transition-all
                hover:-translate-y-0.5
                hover:shadow-lg
              "
            >

              Buat Akun Gratis

              <ArrowRight className="h-4 w-4" />

            </Link>

          </div>

        </section>

      </main>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer
        className="
          relative
          z-10
          border-t
          border-paper-line
        "
      >

        <div
          className="
            max-w-6xl
            mx-auto
            px-5
            sm:px-8
            py-6
            flex
            flex-col
            sm:flex-row
            items-center
            justify-between
            gap-2
            text-xs
            text-ink-soft
          "
        >

          <span>
            © {new Date().getFullYear()} MoneyTrack
          </span>

          <span className="text-center sm:text-right">
            Dibuat untuk mencatat, bukan menghakimi.
          </span>

        </div>

      </footer>

    </div>
  )
}