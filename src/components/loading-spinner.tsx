import * as React from 'react';
import { cn } from '@/lib/utils';

export interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'default' | 'lg' | 'xl';
  text?: string;
  fullScreen?: boolean;
}

const sizeClasses = {
  sm: 'h-6 w-6',
  default: 'h-10 w-10',
  lg: 'h-16 w-16',
  xl: 'h-24 w-24',
};

const coreSizeClasses = {
  sm: 'h-1.5 w-1.5',
  default: 'h-2.5 w-2.5',
  lg: 'h-4 w-4',
  xl: 'h-6 w-6',
};

export const LoadingSpinner = ({
  size = 'default',
  text,
  fullScreen = false,
  className,
  ...props
}: LoadingSpinnerProps) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-4 text-muted-foreground antialiased',
        fullScreen
          ? 'fixed inset-0 z-50 min-h-screen w-full bg-background/80 backdrop-blur-md'
          : 'h-full w-full py-8',
        className
      )}
      {...props}
    >
      <div className={cn('relative flex items-center justify-center', sizeClasses[size])}>
        {/* Outer Ambient Glow Ring */}
        <div className="absolute inset-0 rounded-full bg-primary/20 blur-md animate-ping" />

        {/* Inner Subtle Static Track */}
        <div className="absolute inset-0 rounded-full border border-primary/10" />

        {/* Rotating Gradient Spinner */}
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary border-r-primary/40 animate-spin" />

        {/* Glowing Center Core Dot */}
        <div
          className={cn(
            'rounded-full bg-primary shadow-[0_0_12px_2px_rgba(var(--primary),0.8)] animate-pulse',
            coreSizeClasses[size]
          )}
        />
      </div>

      {/* Modern Shimmering Text Label */}
      {text && (
        <p className="text-xs font-mono font-medium tracking-wider text-muted-foreground uppercase animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;