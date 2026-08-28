import { useNavigate } from 'react-router-dom'
import { LogOut, UserRound, Mail, CalendarDays } from 'lucide-react'
import AppShell from '../components/AppShell'
import { useAuth } from '../contexts/AuthContext'
import { formatDate } from '../utils/format'

export default function Profile() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const displayName = user?.user_metadata?.name || user?.email?.split('@')[0] || 'Pengguna'

  async function handleLogout() {
    await signOut()
    navigate('/login', { replace: true })
  }

  return (
    <AppShell>
      <h1 className="font-display text-2xl sm:text-3xl font-semibold mb-6">Profil</h1>

      <div className="card p-6 max-w-md">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-14 w-14 rounded-full bg-forest-50 text-forest-500 flex items-center justify-center">
            <UserRound className="h-7 w-7" strokeWidth={2} />
          </div>
          <div>
            <p className="font-display text-lg font-semibold">{displayName}</p>
            <p className="text-sm text-ink-soft">{user?.email}</p>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 text-sm text-ink-soft">
            <Mail className="h-4 w-4" />
            <span>{user?.email}</span>
          </div>
          {user?.created_at && (
            <div className="flex items-center gap-3 text-sm text-ink-soft">
              <CalendarDays className="h-4 w-4" />
              <span>Bergabung sejak {formatDate(user.created_at)}</span>
            </div>
          )}
        </div>

        <button
          onClick={handleLogout}
          className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-loss-soft text-loss font-semibold px-5 py-2.5 text-sm hover:bg-loss-soft/80 transition-colors"
        >
          <LogOut className="h-4 w-4" /> Keluar
        </button>
      </div>
    </AppShell>
  )
}
