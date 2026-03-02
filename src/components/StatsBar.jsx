import { FileText, Video, Image, HardDrive } from 'lucide-react'
import { formatFileSize } from '../utils/fileUtils'

export default function StatsBar({ files = [] }) {
  const pdfs = files.filter((f) => f.fileType === 'application/pdf').length
  const videos = files.filter((f) => f.fileType === 'video/mp4').length
  const images = files.filter((f) => f.fileType?.startsWith('image/')).length
  const totalSize = files.reduce((acc, f) => acc + (f.fileSize || 0), 0)

  const stats = [
    { label: 'Total Files', value: files.length, icon: HardDrive, color: 'text-ink-600' },
    { label: 'PDFs', value: pdfs, icon: FileText, color: 'text-rust-500' },
    { label: 'Videos', value: videos, icon: Video, color: 'text-sage-500' },
    { label: 'Images', value: images, icon: Image, color: 'text-amber-500' },
    { label: 'Storage Used', value: formatFileSize(totalSize), icon: HardDrive, color: 'text-ink-500' },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 animate-fade-up opacity-0 stagger-1">
      {stats.map(({ label, value, icon: Icon, color }) => (
        <div
          key={label}
          className="bg-white rounded-xl border border-ink-200 px-4 py-3 flex flex-col gap-1"
        >
          <div className={`flex items-center gap-1.5 ${color}`}>
            <Icon size={13} strokeWidth={2} />
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold">
              {label}
            </span>
          </div>
          <span className="font-display font-bold text-ink-900 text-xl">
            {value}
          </span>
        </div>
      ))}
    </div>
  )
}
