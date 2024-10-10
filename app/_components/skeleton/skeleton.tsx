import { cn } from '@/app/_utils/classnames';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn('animate-pulse rounded-md bg-muted', className)} {...props} />;
}

export { Skeleton };
