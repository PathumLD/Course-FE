import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { authApi } from '../api/authApi'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'

export const useLogin = () => {
  const { setAuth } = useAuthStore()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      setAuth(data)
      toast.success(`Welcome back, ${data.username}!`)
      navigate('/dashboard')
    },
    onError: (error) => {
      const msg =
        error.response?.data?.message ||
        'Login failed. Check your credentials.'
      toast.error(msg)
    },
  })
}

export const useRegister = () => {
  const { setAuth } = useAuthStore()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      setAuth(data)
      toast.success(`Account created! Welcome, ${data.username}!`)
      navigate('/dashboard')
    },
    onError: (error) => {
      const msg =
        error.response?.data?.message ||
        error.response?.data?.data?.username ||
        error.response?.data?.data?.email ||
        'Registration failed. Please try again.'
      toast.error(msg)
    },
  })
}

export const useLogout = () => {
  const { logout } = useAuthStore()
  const navigate = useNavigate()

  return () => {
    logout()
    toast.success('Logged out successfully.')
    navigate('/login')
  }
}
