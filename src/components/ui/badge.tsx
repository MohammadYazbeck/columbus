import * as React from 'react';
import {cn} from '@/src/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outline' | 'success' | 'danger';
}

export function Badge({className, variant = 'default', ...props}: BadgeProps) {
  const styles: Record<string, string> = {
    default: 'bg-secondary text-secondary-foreground',
    outline: 'border border-input',
    success: 'bg-emerald-100 text-emerald-800',
    danger: 'bg-rose-100 text-rose-700'
  };
  return (
    <div
      className={cn('inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold', styles[variant], className)}
      {...props}
    />
  );
}
