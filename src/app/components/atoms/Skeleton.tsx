import React from 'react';
import clsx from 'clsx';

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  circle?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 16,
  circle = false,
  className = '',
  style = {},
  children,
}) => {
  return (
    <div
      className={clsx(
        'bg-[var(--muted)] animate-pulse',
        circle ? 'rounded-full' : 'rounded',
        className
      )}
      style={{
        width,
        height,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default Skeleton; 