import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Coins, ArrowUp, ArrowDown } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const FLOATING_MONEY = [
  {
    amount: 'Rp250.000',
    type: 'income',
    position: 'money-register-1',
    delay: '0s',
  },
  {
    amount: 'Rp75.000',
    type: 'expense',
    position: 'money-register-2',
    delay: '1.5s',
  },
  {
    amount: 'Rp1.500.000',
    type: 'income',
    position: 'money-register-3',
    delay: '3s',
  },
  {
    amount: 'Rp875.000',
    type: 'income',
    position: 'money-register-4',
    delay: '4.5s',
  },
  {
    amount: 'Rp50.000',
    type: 'expense',
    position: 'money-register-5',
    delay: '2s',
  },
  {
    amount: 'Rp320.000',
    type: 'income',
    position: 'money-register-6',
    delay: '5.5s',
  },
  {
    amount: 'Rp125.000',
    type: 'expense',
    position: 'money-register-7',
    delay: '6.5s',
  },
  {
    amount: 'Rp500.000',
    type: 'income',
    position: 'money-register-8',
    delay: '7.5s',
  },
]

export default function Register() {
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  function validate() {
    if (!name.trim()) {
      return 'Nama wajib diisi.'
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailPattern.test(email)) {
      return 'Masukkan email yang valid.'
    }

    if (password.length < 6) {
      return 'Password minimal 6 karakter.'
    }

    return ''
  }

  async function handleSubmit(e) {
    e.preventDefault()

    setError('')
    setNotice('')

    const validationError = validate()

    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)

    try {
      const data = await signUp({
        name: name.trim(),
        email,
        password,
      })

      if (data.session) {
        navigate('/dashboard', { replace: true })
      } else {
        setNotice(
          'Akun berhasil dibuat. Silakan cek email kamu untuk konfirmasi sebelum masuk.'
        )
      }
    } catch (err) {
      const message = err.message?.toLowerCase() || ''

      if (
        message.includes('already registered') ||
        message.includes('already been registered')
      ) {
        setError(
          'Email ini sudah terdaftar. Gunakan email lain atau masuk.'
        )
      } else if (message.includes('fetch')) {
        setError('Terjadi kesalahan koneksi. Coba lagi.')
      } else {
        setError(err.message || 'Gagal membuat akun. Coba lagi.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="register-page min-h-screen bg-paper flex items-center justify-center px-4 py-10 relative overflow-hidden">

      {/* =====================================================
          FLOATING MONEY BACKGROUND
      ====================================================== */}

      <div className="register-money-layer" aria-hidden="true">
        {FLOATING_MONEY.map((money, index) => {
          const isIncome = money.type === 'income'

          return (
            <div
              key={`${money.amount}-${index}`}
              className={`register-money ${money.position} ${
                isIncome
                  ? 'register-money-income'
                  : 'register-money-expense'
              }`}
              style={{
                animationDelay: money.delay,
              }}
            >
              <span>{money.amount}</span>

              {isIncome ? (
                <ArrowUp
                  className="register-money-arrow"
                  strokeWidth={2.5}
                />
              ) : (
                <ArrowDown
                  className="register-money-arrow"
                  strokeWidth={2.5}
                />
              )}
            </div>
          )
        })}

        {/* Decorative dots */}
        <span className="register-dot register-dot-1" />
        <span className="register-dot register-dot-2" />
        <span className="register-dot register-dot-3" />
        <span className="register-dot register-dot-4" />
        <span className="register-dot register-dot-5" />
      </div>

      {/* =====================================================
          REGISTER CONTENT
      ====================================================== */}

      <div className="w-full max-w-sm relative z-10">

        {/* LOGO */}

        <Link
          to="/"
          className="
            flex items-center justify-center gap-2
            mb-8
            group
          "
        >
          <Coins
            className="
              h-6 w-6
              text-forest-500
              dark:text-gold
              transition-transform duration-300
              group-hover:rotate-12
            "
            strokeWidth={2}
          />

          <span
            className="
              font-display
              text-xl
              font-semibold
              text-ink
              dark:text-white
            "
          >
            MoneyTrack
          </span>
        </Link>

        {/* CARD */}

        <div
          className="
            card
            p-6
            sm:p-8
            backdrop-blur-sm
            bg-paper-card/95
            dark:bg-[#19241F]/95
          "
        >
          <h1
            className="
              font-display
              text-2xl
              font-semibold
              mb-1
            "
          >
            Buat akun baru
          </h1>

          <p
            className="
              text-sm
              text-ink-soft
              dark:text-white/60
              mb-6
            "
          >
            Mulai catat pemasukan dan pengeluaranmu hari ini.
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {/* NAMA */}

            <div>
              <label
                className="label"
                htmlFor="name"
              >
                Nama
              </label>

              <input
                id="name"
                type="text"
                autoComplete="name"
                className="input"
                placeholder="Nama kamu"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* EMAIL */}

            <div>
              <label
                className="label"
                htmlFor="email"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                autoComplete="email"
                className="input"
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* PASSWORD */}

            <div>
              <label
                className="label"
                htmlFor="password"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                autoComplete="new-password"
                className="input"
                placeholder="Minimal 6 karakter"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* ERROR */}

            {error && (
              <p
                className="
                  text-sm
                  text-loss
                  bg-loss-soft
                  rounded-lg
                  px-3.5
                  py-2.5
                "
              >
                {error}
              </p>
            )}

            {/* NOTICE */}

            {notice && (
              <p
                className="
                  text-sm
                  text-gain
                  bg-gain-soft
                  rounded-lg
                  px-3.5
                  py-2.5
                "
              >
                {notice}
              </p>
            )}

            {/* BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="
                btn-primary
                w-full
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:shadow-md
              "
            >
              {loading ? 'Memproses…' : 'Daftar'}
            </button>
          </form>

          {/* LOGIN LINK */}

          <p
            className="
              text-sm
              text-ink-soft
              dark:text-white/60
              text-center
              mt-6
            "
          >
            Sudah punya akun?{' '}

            <Link
              to="/login"
              className="
                text-forest-500
                dark:text-gain
                font-semibold
                hover:underline
              "
            >
              Masuk
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}