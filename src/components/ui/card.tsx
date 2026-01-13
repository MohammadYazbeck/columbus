import * as React from 'react';
import {cn} from '@/src/lib/utils';

export function Card({className, ...props}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('rounded-2xl border border-border bg-card p-6 shadow-sm', className)} {...props} />;
}

export function CardHeader({className, ...props}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('pb-4', className)} {...props} />;
}

export function CardTitle({className, ...props}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn('text-lg font-semibold tracking-tight text-foreground', className)} {...props} />
  );
}

export function CardContent({className, ...props}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('text-sm text-muted-foreground', className)} {...props} />;
}
