import { twMerge } from '../../utils/cn';

interface SkeletonProps {
  className?: string;
  variant?: 'rect' | 'circle' | 'text';
  width?: string | number;
  height?: string | number;
}

export function Skeleton({ className, variant = 'rect', width, height }: SkeletonProps) {
  const variantClasses = {
    rect: 'rounded',
    circle: 'rounded-full',
    text: 'rounded h-4',
  };

  return (
    <div
      className={twMerge(
        'animate-shimmer',
        variantClasses[variant],
        className
      )}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}

// Pre-built skeleton components
export function ProductCardSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="aspect-[3/4] w-full" />
      <Skeleton variant="text" className="w-3/4" />
      <Skeleton variant="text" className="w-1/2" />
    </div>
  );
}

export function HeaderSkeleton() {
  return (
    <div className="h-16 flex items-center justify-between px-4">
      <Skeleton width={120} height={24} />
      <div className="flex gap-4">
        <Skeleton width={80} height={20} />
        <Skeleton width={80} height={20} />
        <Skeleton width={80} height={20} />
      </div>
      <div className="flex gap-3">
        <Skeleton variant="circle" width={32} height={32} />
        <Skeleton variant="circle" width={32} height={32} />
        <Skeleton variant="circle" width={32} height={32} />
      </div>
    </div>
  );
}
