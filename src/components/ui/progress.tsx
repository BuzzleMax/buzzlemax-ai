import * as React from 'react'

import { cn } from '@/lib/utils'

function Progress({ className, value = 0, ...props }: React.ComponentProps<'div'> & { value?: number }) {
  return (
    <div
      data-slot="progress"
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      data-value={value}
      data-state={value === 100 ? 'complete' : 'indeterminate'}
      className={cn(
        'bg-primary/20 relative h-2 w-full overflow-hidden rounded-full',
        className
      )}
      {...props}
    >
      <div
        data-slot="progress-indicator"
        className="bg-primary h-full rounded-full transition-all duration-500 ease-out"
        style={{ width: `${value ?? 0}%` }}
      />
    </div>
  )
}

export { Progress }
