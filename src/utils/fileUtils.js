import { formatDistanceToNow, format } from 'date-fns'

export const FILE_TYPES = {
  'application/pdf': { label: 'PDF', color: 'badge-pdf', icon: 'pdf' },
  'video/mp4': { label: 'MP4', color: 'badge-mp4', icon: 'video' },
  'image/jpeg': { label: 'JPG', color: 'badge-image', icon: 'image' },
  'image/png': { label: 'PNG', color: 'badge-image', icon: 'image' },
}

export const ACCEPTED_MIME_TYPES = {
  'application/pdf': ['.pdf'],
  'video/mp4': ['.mp4'],
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
}

export const MAX_FILE_SIZE = 100 * 1024 * 1024 // 100 MB

export const getFileTypeInfo = (mimeType) =>
  FILE_TYPES[mimeType] || { label: 'FILE', color: 'badge-other', icon: 'file' }

export const formatFileSize = (bytes) => {
  if (!bytes || bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

export const formatDate = (dateStr) => {
  if (!dateStr) return '—'
  try {
    return format(new Date(dateStr), 'MMM d, yyyy')
  } catch {
    return '—'
  }
}

export const formatRelativeDate = (dateStr) => {
  if (!dateStr) return '—'
  try {
    return formatDistanceToNow(new Date(dateStr), { addSuffix: true })
  } catch {
    return '—'
  }
}

export const validateFile = (file) => {
  const allowedTypes = Object.keys(ACCEPTED_MIME_TYPES)
  if (!allowedTypes.includes(file.type)) {
    return `"${file.name}" is not allowed. Only PDF, MP4, JPG, and PNG files are accepted.`
  }
  if (file.size > MAX_FILE_SIZE) {
    return `"${file.name}" exceeds the 100 MB limit (${formatFileSize(file.size)}).`
  }
  return null
}

export const getFileIcon = (mimeType) => {
  if (mimeType?.includes('pdf')) return 'pdf'
  if (mimeType?.includes('video')) return 'video'
  if (mimeType?.includes('image')) return 'image'
  return 'file'
}
