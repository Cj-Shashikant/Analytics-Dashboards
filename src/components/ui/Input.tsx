import * as React from 'react';

import { cn } from './utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'flex h-9 w-full rounded-md border border-gray-200 bg-white px-3 py-1 text-sm transition-colors',
        // Darker text color for better visibility
        'text-gray-900 font-medium',
        'file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-gray-900',
        // Darker placeholder
        'placeholder:text-gray-400 placeholder:font-normal',
        'focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-gray-500 focus-visible:border-gray-500',
        // Better focus state
        'focus:text-gray-900',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'aria-invalid:border-red-500 aria-invalid:ring-red-500/20',
        className
      )}
      {...props}
    />
  );
}
export { Input };
