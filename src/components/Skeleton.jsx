import clsx from 'clsx'

const Skeleton = ({ className }) => (
  <div
    className={clsx(
      'bg-gradient-to-r from-ink-100 via-ink-50 to-ink-100 rounded-lg',
      'bg-[length:200%_100%] animate-shimmer',
      className
    )}
  />
)

export function FileCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-ink-200 p-5 space-y-4">
      <div className="flex items-start gap-3">
        <Skeleton className="w-10 h-10 rounded-xl flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
        <Skeleton className="h-5 w-10 rounded-md" />
      </div>
      <Skeleton className="h-3 w-2/5" />
      <div className="flex gap-2">
        <Skeleton className="h-8 flex-1 rounded-lg" />
        <Skeleton className="h-8 flex-1 rounded-lg" />
        <Skeleton className="h-8 w-10 rounded-lg" />
      </div>
    </div>
  )
}

export default Skeleton
