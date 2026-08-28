import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Coins } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const from = location.state?.from?.pathname || '/dashboard'

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Email dan password wajib diisi.')
      return
    }

    setLoading(true)
    try {
      await signIn({ email, password })
      navigate(from, { replace: true })
    } catch (err) {
      if (err.message?.toLowerCase().includes('invalid login credentials')) {
        setError('Email atau password salah.')
      } else if (err.message?.toLowerCase().includes('fetch')) {
        setError('Terjadi kesalahan koneksi. Coba lagi.')
      } else {
        setError('Email atau password salah.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <Coins className="h-6 w-6 text-forest-500" strokeWidth={2} />
          <span className="font-display text-xl font-semibold">MoneyTrack</span>
        </Link>

        <div className="card p-6 sm:p-8">
          <h1 className="font-display text-2xl font-semibold mb-1">Selamat datang kembali</h1>
          <p className="text-sm text-ink-soft mb-6">Masuk untuk melanjutkan pencatatan keuanganmu.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label" htmlFor="email">Email</label>
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
            <div>
              <label className="label" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                className="input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p className="text-sm text-loss bg-loss-soft rounded-lg px-3.5 py-2.5">{error}</p>}

            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? 'Memproses…' : 'Masuk'}
            </button>
          </form>

          <p className="text-sm text-ink-soft text-center mt-6">
            Belum punya akun?{' '}
            <Link to="/register" className="text-forest-500 font-semibold hover:underline">
              Daftar sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
