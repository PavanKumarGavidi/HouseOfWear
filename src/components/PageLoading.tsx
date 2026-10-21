import { Skeleton } from './ui/Skeleton';

export function PageLoading() {
  return (
    <div className="min-h-screen bg-white dark:bg-brand-950">
      {/* Header Skeleton */}
      <div className="border-b border-brand-100 dark:border-brand-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Skeleton width={120} height={24} />
            <div className="hidden lg:flex gap-8">
              <Skeleton width={60} height={20} />
              <Skeleton width={60} height={20} />
              <Skeleton width={60} height={20} />
              <Skeleton width={60} height={20} />
            </div>
            <div className="flex gap-3">
              <Skeleton width={32} height={32} variant="circle" />
              <Skeleton width={32} height={32} variant="circle" />
              <Skeleton width={32} height={32} variant="circle" />
            </div>
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Skeleton */}
        <Skeleton height={400} className="mb-8" />

        {/* Grid Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton height={300} />
              <Skeleton width="70%" height={20} />
              <Skeleton width="40%" height={16} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
