import apiClient from './client'

export const authApi = {
  login: async (credentials) => {
    const { data } = await apiClient.post('/auth/login', credentials)
    return data.data // unwrap ApiResponse wrapper
  },

  register: async (payload) => {
    const { data } = await apiClient.post('/auth/register', payload)
    return data.data
  },
}
