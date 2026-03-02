import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X, FileText, Video, Image, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { useUploadFile } from '../hooks/useFiles'
import {
  ACCEPTED_MIME_TYPES,
  MAX_FILE_SIZE,
  validateFile,
  formatFileSize,
  getFileTypeInfo,
} from '../utils/fileUtils'
import clsx from 'clsx'

const FilePreview = ({ file, error, onRemove }) => {
  const typeInfo = getFileTypeInfo(file.type)
  const iconMap = { pdf: FileText, mp4: Video, image: Image }

  return (
    <div
      className={clsx(
        'flex items-center gap-3 p-3 rounded-xl border transition-colors',
        error
          ? 'bg-rust-500/5 border-rust-500/30'
          : 'bg-ink-50 border-ink-200'
      )}
    >
      <div className={clsx('rounded-lg p-2 text-sm', typeInfo.color)}>
        <FileText size={16} strokeWidth={1.5} />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-ink-800 truncate">{file.name}</p>
        <p className="text-xs text-ink-500 font-mono mt-0.5">{formatFileSize(file.size)}</p>
        {error && (
          <p className="text-xs text-rust-600 mt-1 flex items-center gap-1">
            <AlertCircle size={11} /> {error}
          </p>
        )}
      </div>

      <button
        onClick={() => onRemove(file.name)}
        className="btn-ghost p-1.5 text-ink-400 hover:text-rust-500"
      >
        <X size={14} />
      </button>
    </div>
  )
}

const ProgressBar = ({ progress }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-xs font-mono text-ink-500">
      <span>Uploading…</span>
      <span>{progress}%</span>
    </div>
    <div className="h-2 bg-ink-100 rounded-full overflow-hidden">
      <div
        className="h-full bg-amber-500 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
        style={{ width: `${progress}%` }}
      >
        {progress < 100 && (
          <div className="absolute inset-0 shimmer-bar" />
        )}
      </div>
    </div>
  </div>
)

export default function UploadDropzone({ onSuccess }) {
  const [selectedFiles, setSelectedFiles] = useState([])
  const [fileErrors, setFileErrors] = useState({})
  const [description, setDescription] = useState('')
  const [uploadedCount, setUploadedCount] = useState(0)

  const { mutateAsync: uploadFile, isPending, uploadProgress } = useUploadFile()

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    const newErrors = {}

    // Handle dropzone-level rejections
    rejectedFiles.forEach((rejected) => {
      rejected.errors.forEach((err) => {
        if (err.code === 'file-too-large') {
          newErrors[rejected.file.name] = `File exceeds 100 MB limit.`
        } else if (err.code === 'file-invalid-type') {
          newErrors[rejected.file.name] = `Only PDF, MP4, JPG, and PNG are allowed.`
        } else {
          newErrors[rejected.file.name] = err.message
        }
      })
    })

    // Additional app-level validation
    acceptedFiles.forEach((file) => {
      const validationError = validateFile(file)
      if (validationError) {
        newErrors[file.name] = validationError
      }
    })

    setFileErrors((prev) => ({ ...prev, ...newErrors }))
    setSelectedFiles((prev) => {
      const existingNames = new Set(prev.map((f) => f.name))
      const newFiles = [...acceptedFiles, ...rejectedFiles.map((r) => r.file)]
      return [...prev, ...newFiles.filter((f) => !existingNames.has(f.name))]
    })
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_MIME_TYPES,
    maxSize: MAX_FILE_SIZE,
    multiple: true,
    noClick: false,
  })

  const removeFile = (name) => {
    setSelectedFiles((prev) => prev.filter((f) => f.name !== name))
    setFileErrors((prev) => {
      const next = { ...prev }
      delete next[name]
      return next
    })
  }

  const validFiles = selectedFiles.filter((f) => !fileErrors[f.name])
  const hasErrors = Object.keys(fileErrors).length > 0
  const canUpload = validFiles.length > 0 && !isPending

  const handleUpload = async () => {
    if (!canUpload) return
    let count = 0

    for (const file of validFiles) {
      try {
        await uploadFile({ file, description })
        count++
        setUploadedCount((prev) => prev + 1)
      } catch {
        // individual file errors handled by mutation
      }
    }

    if (count > 0) {
      setSelectedFiles([])
      setFileErrors({})
      setDescription('')
      setUploadedCount(0)
      onSuccess?.()
    }
  }

  return (
    <div className="space-y-5">
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={clsx(
          'relative border-2 border-dashed rounded-2xl p-10 text-center',
          'cursor-pointer transition-all duration-300',
          isDragActive
            ? 'border-amber-500 bg-amber-500/5 scale-[1.01]'
            : 'border-ink-200 bg-white hover:border-ink-400 hover:bg-ink-50/50'
        )}
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center gap-4">
          <div
            className={clsx(
              'w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300',
              isDragActive
                ? 'bg-amber-500/20 text-amber-600 scale-110'
                : 'bg-ink-100 text-ink-500'
            )}
          >
            <Upload size={28} strokeWidth={1.5} />
          </div>

          {isDragActive ? (
            <div>
              <p className="font-display font-bold text-ink-900 text-lg">Drop it here!</p>
              <p className="text-ink-500 text-sm mt-1">Release to add your files</p>
            </div>
          ) : (
            <div>
              <p className="font-display font-semibold text-ink-800 text-base">
                Drag files here, or{' '}
                <span className="text-amber-600 underline underline-offset-2">browse</span>
              </p>
              <p className="text-ink-500 text-sm mt-2">
                PDF, MP4, JPG, PNG — up to 100 MB each
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Selected files list */}
      {selectedFiles.length > 0 && (
        <div className="space-y-2 animate-fade-in">
          <div className="flex items-center justify-between">
            <p className="text-sm font-display font-semibold text-ink-700">
              {selectedFiles.length} file{selectedFiles.length > 1 ? 's' : ''} selected
              {hasErrors && (
                <span className="ml-2 text-rust-500">
                  ({Object.keys(fileErrors).length} invalid)
                </span>
              )}
            </p>
            <button
              onClick={() => { setSelectedFiles([]); setFileErrors({}) }}
              className="text-xs text-ink-400 hover:text-ink-700 transition-colors"
            >
              Clear all
            </button>
          </div>

          <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
            {selectedFiles.map((file) => (
              <FilePreview
                key={file.name}
                file={file}
                error={fileErrors[file.name]}
                onRemove={removeFile}
              />
            ))}
          </div>
        </div>
      )}

      {/* Description input */}
      {validFiles.length > 0 && (
        <div className="animate-fade-in">
          <label className="block text-sm font-display font-semibold text-ink-700 mb-2">
            Description <span className="text-ink-400 font-normal">(optional)</span>
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. Week 3 — Introduction to Algorithms"
            className="input-field"
            disabled={isPending}
          />
        </div>
      )}

      {/* Progress bar */}
      {isPending && <ProgressBar progress={uploadProgress} />}

      {/* Upload button */}
      {validFiles.length > 0 && (
        <button
          onClick={handleUpload}
          disabled={!canUpload}
          className="btn-primary w-full flex items-center justify-center gap-2 text-base"
        >
          {isPending ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Uploading {validFiles.length > 1 ? `file ${uploadedCount + 1} of ${validFiles.length}` : '…'}
            </>
          ) : (
            <>
              <Upload size={18} />
              Upload {validFiles.length} File{validFiles.length > 1 ? 's' : ''}
            </>
          )}
        </button>
      )}
    </div>
  )
}
