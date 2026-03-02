import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { filesApi } from '../api/filesApi'
import toast from 'react-hot-toast'
import { useState } from 'react'

export const QUERY_KEYS = {
  files: ['files'],
  file: (id) => ['files', id],
}

// Fetch all files
export const useFiles = () =>
  useQuery({
    queryKey: QUERY_KEYS.files,
    queryFn: filesApi.getAll,
  })

// Fetch a single file
export const useFile = (id) =>
  useQuery({
    queryKey: QUERY_KEYS.file(id),
    queryFn: () => filesApi.getById(id),
    enabled: !!id,
  })

// Upload mutation with progress tracking
export const useUploadFile = () => {
  const queryClient = useQueryClient()
  const [uploadProgress, setUploadProgress] = useState(0)

  const mutation = useMutation({
    mutationFn: ({ file, description }) =>
      filesApi.upload(file, description, (pct) => setUploadProgress(pct)),

    onMutate: () => {
      setUploadProgress(0)
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.files })
      toast.success(`"${data.originalFileName}" uploaded successfully!`)
      setUploadProgress(0)
    },

    onError: (error) => {
      setUploadProgress(0)
      const msg =
        error.response?.data?.message ||
        error.message ||
        'Upload failed. Please try again.'
      toast.error(msg)
    },
  })

  return { ...mutation, uploadProgress }
}

// Delete mutation
export const useDeleteFile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id) => filesApi.delete(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.files })
      toast.success('File deleted.')
    },
    onError: (error) => {
      const msg = error.response?.data?.message || 'Failed to delete file.'
      toast.error(msg)
    },
  })
}
