import { Link, useLocation } from 'react-router-dom'
import { Upload, LayoutGrid, LogOut, BookOpen } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import { useLogout } from '../hooks/useAuth'
import clsx from 'clsx'

const NavLink = ({ to, icon: Icon, label }) => {
  const { pathname } = useLocation()
  const active = pathname === to
  return (
    <Link
      to={to}
      className={clsx(
        'flex items-center gap-2 px-4 py-2 rounded-lg font-display text-sm font-medium transition-all duration-200',
        active
          ? 'bg-ink-950 text-white'
          : 'text-ink-600 hover:bg-ink-100 hover:text-ink-900'
      )}
    >
      <Icon size={16} />
      {label}
    </Link>
  )
}

export default function Navbar() {
  const { user } = useAuthStore()
  const logout = useLogout()

  return (
    <header className="sticky top-0 z-50 bg-ink-50/80 backdrop-blur-md border-b border-ink-200">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-ink-950 rounded-lg flex items-center justify-center">
            <BookOpen size={16} className="text-amber-400" />
          </div>
          <span className="font-display font-bold text-ink-950 text-lg tracking-tight">
            Course<span className="text-amber-500">Vault</span>
          </span>
        </Link>

        {/* Nav links */}
        <nav className="hidden sm:flex items-center gap-1">
          <NavLink to="/dashboard" icon={LayoutGrid} label="Library" />
          <NavLink to="/upload" icon={Upload} label="Upload" />
        </nav>

        {/* User info + logout */}
        <div className="flex items-center gap-3">
          {user && (
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-xs font-display font-semibold text-ink-800 leading-none">
                {user.username}
              </span>
              <span className="text-xs text-ink-400 font-mono mt-0.5">
                {user.role}
              </span>
            </div>
          )}
          <button
            onClick={logout}
            className="btn-ghost flex items-center gap-1.5 text-sm"
            title="Log out"
          >
            <LogOut size={15} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  )
}
