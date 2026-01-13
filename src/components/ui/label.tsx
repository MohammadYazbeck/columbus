import * as React from 'react';
import {cn} from '@/src/lib/utils';

const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({className, ...props}, ref) => (
  <label
    className={cn('text-sm font-medium leading-none text-foreground', className)}
    ref={ref}
    {...props}
  />
));

Label.displayName = 'Label';

export {Label};
