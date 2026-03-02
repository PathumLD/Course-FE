import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff, LogIn, BookOpen, Loader2 } from 'lucide-react'
import { useLogin } from '../hooks/useAuth'

export default function LoginPage() {
  const [form, setForm] = useState({ username: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const login = useLogin()

  const validate = () => {
    const newErrors = {}
    if (!form.username.trim()) newErrors.username = 'Username is required.'
    if (!form.password) newErrors.password = 'Password is required.'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    login.mutate(form)
  }

  const set = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: null }))
  }

  return (
    <div className="min-h-screen bg-ink-50 flex grain">
      {/* Left panel — decorative */}
      <div className="hidden lg:flex flex-col justify-between w-[45%] bg-ink-950 p-12 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute border border-white rounded-full"
              style={{
                width: `${(i + 1) * 120}px`,
                height: `${(i + 1) * 120}px`,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          ))}
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
            <BookOpen size={20} className="text-amber-400" />
          </div>
          <span className="font-display font-bold text-white text-xl tracking-tight">
            Course<span className="text-amber-400">Vault</span>
          </span>
        </div>

        <div className="relative z-10 space-y-6">
          <div className="space-y-3">
            <p className="text-ink-400 font-mono text-xs uppercase tracking-widest">
              Silverline IT — Course Portal
            </p>
            <h1 className="font-display font-bold text-white text-4xl leading-tight">
              Share knowledge.
              <br />
              <span className="text-amber-400">Elevate learning.</span>
            </h1>
          </div>
          <p className="text-ink-400 text-sm leading-relaxed max-w-xs">
            Upload PDFs, videos, and images for your students — all in one place with secure, instant access.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-6">
          {['PDF', 'MP4', 'JPG', 'PNG'].map((type) => (
            <div key={type} className="text-center">
              <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-1">
                <span className="font-mono text-[10px] font-bold text-ink-300">{type}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm space-y-8 animate-fade-up opacity-0">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2.5">
            <div className="w-8 h-8 bg-ink-950 rounded-lg flex items-center justify-center">
              <BookOpen size={16} className="text-amber-400" />
            </div>
            <span className="font-display font-bold text-ink-950 text-lg">
              Course<span className="text-amber-500">Vault</span>
            </span>
          </div>

          <div>
            <h2 className="font-display font-bold text-ink-950 text-3xl">Welcome back</h2>
            <p className="text-ink-500 mt-2 text-sm">
              Sign in to your instructor account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Username */}
            <div className="space-y-1.5">
              <label className="text-sm font-display font-semibold text-ink-700">
                Username
              </label>
              <input
                type="text"
                value={form.username}
                onChange={set('username')}
                placeholder="your_username"
                className={`input-field ${errors.username ? 'border-rust-500 ring-rust-500/30 ring-2' : ''}`}
                autoComplete="username"
                autoFocus
              />
              {errors.username && (
                <p className="text-xs text-rust-600">{errors.username}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-sm font-display font-semibold text-ink-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={set('password')}
                  placeholder="••••••••"
                  className={`input-field pr-11 ${errors.password ? 'border-rust-500 ring-rust-500/30 ring-2' : ''}`}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-700 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-rust-600">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={login.isPending}
              className="btn-primary w-full flex items-center justify-center gap-2 mt-2"
            >
              {login.isPending ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Signing in…
                </>
              ) : (
                <>
                  <LogIn size={16} />
                  Sign in
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-ink-500">
            No account?{' '}
            <Link
              to="/register"
              className="text-ink-900 font-semibold hover:text-amber-600 transition-colors underline underline-offset-2"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
