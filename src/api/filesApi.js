import apiClient from './client'

export const filesApi = {
  // GET /api/files — all metadata, ordered newest first
  getAll: async () => {
    const { data } = await apiClient.get('/files')
    return data.data
  },

  // GET /api/files/:id
  getById: async (id) => {
    const { data } = await apiClient.get(`/files/${id}`)
    return data.data
  },

  // GET /api/files/filter?type=pdf
  getByType: async (type) => {
    const { data } = await apiClient.get('/files/filter', { params: { type } })
    return data.data
  },

  // POST /api/files/upload  (multipart, with progress callback)
  upload: async (file, description, onProgress) => {
    const formData = new FormData()
    formData.append('file', file)
    if (description) formData.append('description', description)

    const { data } = await apiClient.post('/files/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (event) => {
        if (event.total && onProgress) {
          onProgress(Math.round((event.loaded / event.total) * 100))
        }
      },
    })
    return data.data
  },

  // DELETE /api/files/:id
  delete: async (id) => {
    const { data } = await apiClient.delete(`/files/${id}`)
    return data
  },

  // Build download URL for a file (uses the fileName stored in DB)
  getDownloadUrl: (fileName) => `/api/files/download/${fileName}`,
}
