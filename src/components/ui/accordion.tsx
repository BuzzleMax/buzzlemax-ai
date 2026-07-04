import * as React from 'react'
import { ChevronDown } from 'lucide-react'

import { cn } from '@/lib/utils'

type AccordionValue = string | number

type AccordionContextValue = {
  value: AccordionValue | null
  onChange: (value: AccordionValue) => void
  type: 'single' | 'multiple'
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null)

function useAccordionContext() {
  const ctx = React.useContext(AccordionContext)
  if (!ctx) throw new Error('Accordion components must be used within <Accordion />')
  return ctx
}

export function Accordion({
  children,
  type = 'single',
  value,
  defaultValue,
  onValueChange,
  className,
}: {
  children: React.ReactNode
  type?: 'single' | 'multiple'
  value?: AccordionValue
  defaultValue?: AccordionValue
  onValueChange?: (value: AccordionValue) => void
  className?: string
}) {
  const isControlled = value !== undefined

  const [internalValue, setInternalValue] = React.useState<AccordionValue | null>(
    (defaultValue ?? null) as AccordionValue | null
  )

  const currentValue = isControlled ? (value as AccordionValue | null) : internalValue

  const handleChange = (next: AccordionValue) => {
    if (!isControlled) setInternalValue(next)
    onValueChange?.(next)
  }

  return (
    <AccordionContext.Provider
      value={{
        value: currentValue,
        onChange: handleChange,
        type,
      }}
    >
      <div className={cn('w-full', className)}>{children}</div>
    </AccordionContext.Provider>
  )
}

export function AccordionItem({
  value,
  className,
  children,
}: {
  value: AccordionValue
  className?: string
  children: React.ReactNode
}) {
  const ctx = useAccordionContext()
  const isOpen = ctx.value === value
  return (
    <div className={cn('border-border/50', className)} data-state={isOpen ? 'open' : 'closed'}>
      {children}
    </div>
  )
}

export function AccordionTrigger({
  value,
  children,
  className,
}: {
  value: AccordionValue
  children: React.ReactNode
  className?: string
}) {
  const ctx = useAccordionContext()
  const isOpen = ctx.value === value

  const onClick = () => {
    if (isOpen) {
      // For single mode, clicking open closes.
      // For simplicity with this lightweight accordion, we set a sentinel close by changing value.
      if (ctx.type === 'single') {
        ctx.onChange(value)
      }
    } else {
      ctx.onChange(value)
    }
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex w-full items-center justify-between py-4 text-left text-sm font-medium transition-colors hover:text-foreground',
        className
      )}
    >
      <span>{children}</span>
      <ChevronDown className={cn('h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200', isOpen && 'rotate-180')} />
    </button>
  )
}

export function AccordionContent({
  value,
  children,
}: {
  value: AccordionValue
  children: React.ReactNode
  className?: string
}) {
  const ctx = useAccordionContext()
  const isOpen = ctx.value === value

  return (
    <div
      className={cn('overflow-hidden text-sm text-muted-foreground', isOpen ? 'max-h-[1000px] pb-4 pt-0' : 'max-h-0')}
      style={{ transition: 'max-height 220ms ease' }}
      aria-hidden={!isOpen}
    >
      <div className={cn('pt-0', isOpen ? 'opacity-100' : 'opacity-0', 'transition-opacity duration-150')}>
        {children}
      </div>
    </div>
  )
}


