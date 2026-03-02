import { useState } from 'react'
import { Download, Trash2, ExternalLink, Clock } from 'lucide-react'
import { useDeleteFile } from '../hooks/useFiles'
import { getFileTypeInfo, formatDate, formatRelativeDate } from '../utils/fileUtils'
import FileTypeIcon from './FileTypeIcon'
import clsx from 'clsx'

export default function FileCard({ file, index }) {
  const [showConfirm, setShowConfirm] = useState(false)
  const deleteFile = useDeleteFile()
  const typeInfo = getFileTypeInfo(file.fileType)

  const handleDelete = () => {
    deleteFile.mutate(file.id, {
      onSettled: () => setShowConfirm(false),
    })
  }

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = file.downloadUrl
    link.download = file.originalFileName
    link.click()
  }

  const handleView = () => {
    window.open(file.downloadUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div
      className={clsx(
        'group bg-white rounded-2xl border border-ink-200 p-5',
        'card-lift cursor-default animate-fade-up opacity-0',
        `stagger-${Math.min(index + 1, 6)}`
      )}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <FileTypeIcon mimeType={file.fileType} size={18} />

        <div className="flex-1 min-w-0">
          <h3
            className="font-display font-semibold text-ink-900 text-sm leading-tight truncate"
            title={file.originalFileName}
          >
            {file.originalFileName}
          </h3>
          {file.description && (
            <p className="text-xs text-ink-500 mt-1 truncate">{file.description}</p>
          )}
        </div>

        {/* Type badge */}
        <span
          className={clsx(
            'text-[10px] font-mono font-bold px-2 py-0.5 rounded-md flex-shrink-0',
            typeInfo.color
          )}
        >
          {typeInfo.label}
        </span>
      </div>

      {/* Metadata row */}
      <div className="flex items-center gap-3 text-xs text-ink-400 font-mono mb-4">
        <span>{file.fileSizeFormatted || file.fileSize}</span>
        <span className="w-1 h-1 bg-ink-300 rounded-full" />
        <span className="flex items-center gap-1">
          <Clock size={10} />
          {formatRelativeDate(file.uploadDate)}
        </span>
      </div>

      {/* Action buttons */}
      {!showConfirm ? (
        <div className="flex items-center gap-2">
          <button
            onClick={handleView}
            className="btn-ghost flex-1 flex items-center justify-center gap-1.5 text-xs py-1.5"
          >
            <ExternalLink size={12} />
            View
          </button>
          <button
            onClick={handleDownload}
            className="btn-ghost flex-1 flex items-center justify-center gap-1.5 text-xs py-1.5"
          >
            <Download size={12} />
            Download
          </button>
          <button
            onClick={() => setShowConfirm(true)}
            className="btn-ghost text-rust-500 hover:bg-rust-500/10 flex items-center justify-center gap-1.5 text-xs py-1.5 px-2.5"
          >
            <Trash2 size={12} />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2 animate-fade-in">
          <p className="text-xs text-ink-600 flex-1">Delete this file?</p>
          <button
            onClick={handleDelete}
            disabled={deleteFile.isPending}
            className="btn-danger text-xs py-1.5 px-3"
          >
            {deleteFile.isPending ? 'Deleting…' : 'Yes, delete'}
          </button>
          <button
            onClick={() => setShowConfirm(false)}
            className="btn-ghost text-xs py-1.5 px-3"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  )
}
