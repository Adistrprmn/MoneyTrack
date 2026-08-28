import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Coins } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

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
    if (!name.trim()) return 'Nama wajib diisi.'
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(email)) return 'Masukkan email yang valid.'
    if (password.length < 6) return 'Password minimal 6 karakter.'
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
      const data = await signUp({ name: name.trim(), email, password })
      if (data.session) {
        navigate('/dashboard', { replace: true })
      } else {
        // Email confirmation is required by the Supabase project settings.
        setNotice('Akun berhasil dibuat. Silakan cek email kamu untuk konfirmasi sebelum masuk.')
      }
    } catch (err) {
      if (err.message?.toLowerCase().includes('already registered') || err.message?.toLowerCase().includes('already been registered')) {
        setError('Email ini sudah terdaftar. Gunakan email lain atau masuk.')
      } else if (err.message?.toLowerCase().includes('fetch')) {
        setError('Terjadi kesalahan koneksi. Coba lagi.')
      } else {
        setError(err.message || 'Gagal membuat akun. Coba lagi.')
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
          <h1 className="font-display text-2xl font-semibold mb-1">Buat akun baru</h1>
          <p className="text-sm text-ink-soft mb-6">Mulai catat pemasukan dan pengeluaranmu hari ini.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label" htmlFor="name">Nama</label>
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
                autoComplete="new-password"
                className="input"
                placeholder="Minimal 6 karakter"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p className="text-sm text-loss bg-loss-soft rounded-lg px-3.5 py-2.5">{error}</p>}
            {notice && <p className="text-sm text-gain bg-gain-soft rounded-lg px-3.5 py-2.5">{notice}</p>}

            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? 'Memproses…' : 'Daftar'}
            </button>
          </form>

          <p className="text-sm text-ink-soft text-center mt-6">
            Sudah punya akun?{' '}
            <Link to="/login" className="text-forest-500 font-semibold hover:underline">
              Masuk
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
