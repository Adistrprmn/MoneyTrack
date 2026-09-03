import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  ArrowLeftRight,
  TrendingUp,
  TrendingDown,
  PieChart,
  UserRound,
  LogOut,
  Coins,
  Moon,
  Sun,
  CalendarDays,
} from 'lucide-react'

import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/useTheme'

const NAV_ITEMS = [
  {
    to: '/dashboard',
    label: 'Ringkasan',
    icon: LayoutDashboard,
  },
  {
    to: '/transaksi',
    label: 'Transaksi',
    icon: ArrowLeftRight,
  },
  {
    to: '/pemasukan',
    label: 'Pemasukan',
    icon: TrendingUp,
  },
  {
    to: '/pengeluaran',
    label: 'Pengeluaran',
    icon: TrendingDown,
  },
  {
    to: '/statistik',
    label: 'Statistik',
    icon: PieChart,
  },
  {
    to: '/kalender',
    label: 'Kalender',
    icon: CalendarDays,
  },
  {
    to: '/profil',
    label: 'Profil',
    icon: UserRound,
  },
]

// Profil tidak ditampilkan di bottom navigation
const MOBILE_NAV_ITEMS = NAV_ITEMS.filter(
  (item) => item.to !== '/profil'
)

export default function AppShell({ children }) {
  const { signOut, user } = useAuth()
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()

  async function handleLogout() {
    await signOut()
    navigate('/login', { replace: true })
  }

  const displayName =
    user?.user_metadata?.name ||
    user?.email?.split('@')[0] ||
    'Pengguna'

  return (
    <div className="min-h-screen bg-paper dark:bg-[#0F1715] transition-colors duration-300 lg:flex">

      {/* ================================
          DESKTOP / TABLET SIDEBAR
      ================================= */}

      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 border-r border-paper-line dark:border-white/10 bg-forest-500 dark:bg-[#121E1B] text-white transition-colors duration-300">

        {/* LOGO */}

        <div className="flex items-center px-6 py-6">

          <div className="flex items-center gap-2.5 animate-pulse">

            <Coins
              className="h-6 w-6 text-gold drop-shadow-[0_0_7px_rgba(242,196,80,0.8)]"
              strokeWidth={2}
            />

            <span className="font-display text-xl font-semibold tracking-tight">
              MoneyTrack
            </span>

          </div>

        </div>


        {/* NAVIGATION */}

        <nav className="flex-1 px-3 space-y-1">

          {NAV_ITEMS.map(
            ({ to, label, icon: Icon }) => (

              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-forest-100 hover:bg-white/5 hover:text-white'
                  }`
                }
              >

                <Icon
                  className="h-4.5 w-4.5"
                  strokeWidth={2}
                />

                {label}

              </NavLink>

            )
          )}

        </nav>


        {/* SIDEBAR BOTTOM */}

        <div className="px-3 pb-6 pt-3 border-t border-white/10">

          {/* USER */}

          <div className="px-3.5 py-2 text-xs text-forest-100/80 truncate">

            Masuk sebagai
            <br />

            <span className="text-white font-medium">
              {displayName}
            </span>

          </div>


          {/* DARK MODE */}

          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium text-forest-100 hover:bg-white/5 hover:text-white transition-colors"
          >

            {theme === 'dark' ? (
              <Sun
                className="h-4.5 w-4.5"
                strokeWidth={2}
              />
            ) : (
              <Moon
                className="h-4.5 w-4.5"
                strokeWidth={2}
              />
            )}

            {theme === 'dark'
              ? 'Mode terang'
              : 'Mode gelap'}

          </button>


          {/* LOGOUT */}

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium text-forest-100 hover:bg-white/5 hover:text-white transition-colors"
          >

            <LogOut
              className="h-4.5 w-4.5"
              strokeWidth={2}
            />

            Keluar

          </button>

        </div>

      </aside>


      {/* ================================
          MAIN COLUMN
      ================================= */}

      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">

        {/* ================================
            MOBILE TOP BAR
        ================================= */}

        <header className="lg:hidden sticky top-0 z-20 flex items-center justify-between border-b border-paper-line dark:border-white/10 bg-paper/90 dark:bg-[#0F1715]/90 backdrop-blur px-4 py-3.5">

          {/* MOBILE LOGO */}

          <div className="flex items-center gap-2 animate-pulse">

            <Coins
              className="h-5 w-5 text-forest-500 dark:text-gold drop-shadow-[0_0_7px_rgba(242,196,80,0.8)]"
              strokeWidth={2}
            />

            <span className="font-display text-lg font-semibold dark:text-white">
              MoneyTrack
            </span>

          </div>


          <div className="flex items-center gap-2">

            {/* MOBILE DARK MODE */}

            <button
              onClick={toggleTheme}
              className="h-9 w-9 rounded-full flex items-center justify-center border border-paper-line dark:border-white/10 bg-white dark:bg-[#17221F]"
              aria-label="Ganti tema"
            >

              {theme === 'dark' ? (
                <Sun className="h-4 w-4 text-gold" />
              ) : (
                <Moon className="h-4 w-4 text-forest-500" />
              )}

            </button>


            {/* PROFILE */}

            <NavLink
              to="/profil"
              className={({ isActive }) =>
                `h-9 w-9 rounded-full flex items-center justify-center border ${
                  isActive
                    ? 'border-forest-500 bg-forest-50'
                    : 'border-paper-line bg-white'
                }`
              }
              aria-label="Profil"
            >

              <UserRound
                className="h-4.5 w-4.5 text-forest-500"
                strokeWidth={2}
              />

            </NavLink>

          </div>

        </header>


        {/* ================================
            MAIN CONTENT
        ================================= */}

        <main className="flex-1 px-4 py-5 sm:px-6 lg:px-10 lg:py-8 pb-24 lg:pb-8 max-w-6xl w-full mx-auto">

          {children}

        </main>


        {/* ================================
            MOBILE BOTTOM NAVIGATION
        ================================= */}

        <nav className="lg:hidden fixed bottom-0 inset-x-0 z-20 bg-white dark:bg-[#121E1B] border-t border-paper-line dark:border-white/10 pb-[env(safe-area-inset-bottom)]">

          <div className="grid grid-cols-6">

            {MOBILE_NAV_ITEMS.map(
              ({ to, label, icon: Icon }) => (

                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `flex flex-col items-center justify-center gap-1 py-2.5 text-[10px] sm:text-[11px] font-medium ${
                      isActive
                        ? 'text-forest-500 dark:text-gold'
                        : 'text-ink-soft/70 dark:text-white/50'
                    }`
                  }
                >

                  <Icon
                    className="h-5 w-5"
                    strokeWidth={2}
                  />

                  {label}

                </NavLink>

              )
            )}

          </div>

        </nav>

      </div>

    </div>
  )
}