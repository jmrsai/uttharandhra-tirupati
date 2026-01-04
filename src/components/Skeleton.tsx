import React from 'react';

interface SkeletonProps {
    className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => {
    return (
        <div className={`animate-pulse bg-neutral/10 rounded-xl ${className}`}></div>
    );
};

export const CardSkeleton: React.FC = () => {
    return (
        <div className="bg-white p-6 rounded-[2.5rem] shadow-lg border border-neutral/10 space-y-4">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
            </div>
            <Skeleton className="h-12 w-full rounded-2xl" />
        </div>
    );
};
