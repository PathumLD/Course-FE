import { FileText, Video, Image, File } from 'lucide-react'
import clsx from 'clsx'
import { getFileIcon, getFileTypeInfo } from '../utils/fileUtils'

const iconMap = {
  pdf: FileText,
  video: Video,
  image: Image,
  file: File,
}

export default function FileTypeIcon({ mimeType, size = 20, className }) {
  const iconType = getFileIcon(mimeType)
  const Icon = iconMap[iconType] || File
  const { color } = getFileTypeInfo(mimeType)

  return (
    <div
      className={clsx(
        'rounded-xl flex items-center justify-center flex-shrink-0',
        {
          'badge-pdf': color === 'badge-pdf',
          'badge-mp4': color === 'badge-mp4',
          'badge-image': color === 'badge-image',
          'badge-other': color === 'badge-other',
        },
        'p-2.5',
        className
      )}
    >
      <Icon size={size} strokeWidth={1.5} />
    </div>
  )
}
