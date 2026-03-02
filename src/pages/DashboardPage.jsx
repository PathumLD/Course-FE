import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Upload, Search, RefreshCw, FileX } from 'lucide-react'
import { useFiles } from '../hooks/useFiles'
import FileCard from '../components/FileCard'
import StatsBar from '../components/StatsBar'
import { FileCardSkeleton } from '../components/Skeleton'
import clsx from 'clsx'

const FILTER_TABS = [
  { key: 'all', label: 'All' },
  { key: 'application/pdf', label: 'PDFs' },
  { key: 'video/mp4', label: 'Videos' },
  { key: 'image', label: 'Images' },
]

export default function DashboardPage() {
  const { data: files = [], isLoading, isError, refetch, isFetching } = useFiles()
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredFiles = useMemo(() => {
    let result = files

    // Type filter
    if (activeFilter !== 'all') {
      result = result.filter((f) =>
        activeFilter === 'image'
          ? f.fileType?.startsWith('image/')
          : f.fileType === activeFilter
      )
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (f) =>
          f.originalFileName?.toLowerCase().includes(q) ||
          f.description?.toLowerCase().includes(q)
      )
    }

    return result
  }, [files, activeFilter, searchQuery])

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-7">
      {/* Page header */}
      <div className="flex items-start justify-between animate-fade-up opacity-0">
        <div>
          <h1 className="font-display font-bold text-ink-950 text-3xl">
            Course Library
          </h1>
          <p className="text-ink-500 mt-1 text-sm">
            Manage and distribute your teaching materials
          </p>
        </div>
        <Link to="/upload" className="btn-primary flex items-center gap-2">
          <Upload size={16} />
          <span className="hidden sm:inline">Upload Files</span>
          <span className="sm:hidden">Upload</span>
        </Link>
      </div>

      {/* Stats */}
      {!isLoading && <StatsBar files={files} />}

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 animate-fade-up opacity-0 stagger-2">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by filename or description…"
            className="input-field pl-10 py-2.5 text-sm"
          />
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-1 bg-white border border-ink-200 rounded-lg p-1">
          {FILTER_TABS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={clsx(
                'px-3 py-1.5 rounded-md text-sm font-display font-medium transition-all duration-200',
                activeFilter === key
                  ? 'bg-ink-950 text-white shadow-sm'
                  : 'text-ink-500 hover:text-ink-900 hover:bg-ink-50'
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Refresh */}
        <button
          onClick={() => refetch()}
          disabled={isFetching}
          className="btn-secondary flex items-center gap-2 text-sm"
          title="Refresh"
        >
          <RefreshCw size={14} className={isFetching ? 'animate-spin' : ''} />
          <span className="hidden sm:inline">Refresh</span>
        </button>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <FileCardSkeleton key={i} />
          ))}
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4 animate-fade-in">
          <div className="w-14 h-14 bg-rust-500/10 rounded-2xl flex items-center justify-center">
            <FileX size={24} className="text-rust-500" />
          </div>
          <div className="text-center">
            <p className="font-display font-semibold text-ink-800">Failed to load files</p>
            <p className="text-ink-500 text-sm mt-1">
              Could not connect to the server.
            </p>
          </div>
          <button onClick={() => refetch()} className="btn-secondary text-sm">
            Try again
          </button>
        </div>
      ) : filteredFiles.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4 animate-fade-in">
          <div className="w-14 h-14 bg-ink-100 rounded-2xl flex items-center justify-center">
            <FileX size={24} className="text-ink-400" />
          </div>
          <div className="text-center">
            <p className="font-display font-semibold text-ink-700">
              {searchQuery ? 'No results found' : 'No files yet'}
            </p>
            <p className="text-ink-400 text-sm mt-1">
              {searchQuery
                ? `No files match "${searchQuery}"`
                : 'Upload your first file to get started'}
            </p>
          </div>
          {!searchQuery && (
            <Link to="/upload" className="btn-primary flex items-center gap-2 text-sm">
              <Upload size={15} />
              Upload a file
            </Link>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFiles.map((file, index) => (
              <FileCard key={file.id} file={file} index={index} />
            ))}
          </div>

          {/* Result count */}
          <p className="text-xs text-ink-400 font-mono text-center pb-4">
            Showing {filteredFiles.length} of {files.length} file
            {files.length !== 1 ? 's' : ''}
          </p>
        </>
      )}
    </div>
  )
}
