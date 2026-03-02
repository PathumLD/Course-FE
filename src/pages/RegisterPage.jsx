import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff, UserPlus, BookOpen, Loader2 } from 'lucide-react'
import { useRegister } from '../hooks/useAuth'

export default function RegisterPage() {
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const register = useRegister()

  const validate = () => {
    const newErrors = {}
    if (!form.username.trim()) {
      newErrors.username = 'Username is required.'
    } else if (form.username.length < 3) {
      newErrors.username = 'Must be at least 3 characters.'
    }
    if (!form.email.trim()) {
      newErrors.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email address.'
    }
    if (!form.password) {
      newErrors.password = 'Password is required.'
    } else if (form.password.length < 6) {
      newErrors.password = 'Must be at least 6 characters.'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    register.mutate(form)
  }

  const set = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: null }))
  }

  return (
    <div className="min-h-screen bg-ink-50 flex items-center justify-center p-8 grain">
      {/* Background circles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-sage-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md animate-fade-up opacity-0">
        {/* Card */}
        <div className="bg-white rounded-2xl border border-ink-200 shadow-xl shadow-ink-900/5 p-8 space-y-7">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-ink-950 rounded-xl flex items-center justify-center">
              <BookOpen size={18} className="text-amber-400" />
            </div>
            <div>
              <h2 className="font-display font-bold text-ink-950 text-xl leading-none">
                Create Account
              </h2>
              <p className="text-ink-500 text-xs mt-1">
                Join as an instructor
              </p>
            </div>
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
                placeholder="john_doe"
                className={`input-field ${errors.username ? 'border-rust-500 ring-rust-500/30 ring-2' : ''}`}
                autoComplete="username"
                autoFocus
              />
              {errors.username && (
                <p className="text-xs text-rust-600">{errors.username}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-sm font-display font-semibold text-ink-700">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={set('email')}
                placeholder="john@example.com"
                className={`input-field ${errors.email ? 'border-rust-500 ring-rust-500/30 ring-2' : ''}`}
                autoComplete="email"
              />
              {errors.email && (
                <p className="text-xs text-rust-600">{errors.email}</p>
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
                  placeholder="Min. 6 characters"
                  className={`input-field pr-11 ${errors.password ? 'border-rust-500 ring-rust-500/30 ring-2' : ''}`}
                  autoComplete="new-password"
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
              {/* Password strength indicator */}
              {form.password && (
                <div className="flex gap-1 mt-2">
                  {[1, 2, 3].map((level) => {
                    const strength = form.password.length >= 6
                      ? form.password.length >= 10
                        ? 3
                        : 2
                      : 1
                    return (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          level <= strength
                            ? strength === 1
                              ? 'bg-rust-500'
                              : strength === 2
                              ? 'bg-amber-500'
                              : 'bg-sage-500'
                            : 'bg-ink-200'
                        }`}
                      />
                    )
                  })}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={register.isPending}
              className="btn-primary w-full flex items-center justify-center gap-2 mt-2"
            >
              {register.isPending ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Creating account…
                </>
              ) : (
                <>
                  <UserPlus size={16} />
                  Create Account
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-ink-500">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-ink-900 font-semibold hover:text-amber-600 transition-colors underline underline-offset-2"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
