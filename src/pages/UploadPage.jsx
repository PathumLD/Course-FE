import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, LayoutGrid } from 'lucide-react'
import UploadDropzone from '../components/UploadDropzone'

export default function UploadPage() {
  const navigate = useNavigate()

  return (
    <div className="max-w-2xl mx-auto px-6 py-8 space-y-7">
      {/* Header */}
      <div className="animate-fade-up opacity-0">
        <Link
          to="/dashboard"
          className="btn-ghost flex items-center gap-1.5 text-sm w-fit mb-5 -ml-1"
        >
          <ArrowLeft size={15} />
          Back to Library
        </Link>

        <h1 className="font-display font-bold text-ink-950 text-3xl">
          Upload Materials
        </h1>
        <p className="text-ink-500 mt-1 text-sm">
          Supports PDF, MP4, JPG, and PNG — up to 100 MB per file
        </p>
      </div>

      {/* Upload card */}
      <div className="bg-white rounded-2xl border border-ink-200 p-7 animate-fade-up opacity-0 stagger-1">
        <UploadDropzone onSuccess={() => navigate('/dashboard')} />
      </div>

      {/* Tip box */}
      <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 animate-fade-up opacity-0 stagger-2">
        <p className="text-sm text-amber-700 font-medium mb-2">💡 Tips</p>
        <ul className="text-sm text-amber-700/80 space-y-1 list-disc list-inside">
          <li>You can drag and drop multiple files at once</li>
          <li>The description field helps students identify the file</li>
          <li>Files are instantly accessible after upload</li>
        </ul>
      </div>

      {/* Quick nav to dashboard */}
      <div className="flex justify-center animate-fade-up opacity-0 stagger-3">
        <Link
          to="/dashboard"
          className="btn-ghost flex items-center gap-2 text-sm text-ink-500"
        >
          <LayoutGrid size={14} />
          View all uploaded files
        </Link>
      </div>
    </div>
  )
}
