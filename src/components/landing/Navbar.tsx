import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useTheme } from '@/hooks/use-theme'
import { cn } from '@/lib/utils'
import { COMPANY_INFO } from '@/lib/constants'
import { navigateToHref } from '@/lib/navigation'

type NavbarProps = {
  onContactSales: (plan?: string) => void
  compactLandingLayout?: boolean
}

// ─── Desktop nav group definitions ───────────────────────────────────────────
const SERVICES_LINKS = [
  { label: 'Web Development', href: '/web-development' },
  { label: 'AI Development',  href: '/#solutions' },
]

const PLATFORM_LINKS = [
  { label: 'Features',     href: '/#features' },
  { label: 'Solutions',    href: '/#solutions' },
  { label: 'How It Works', href: '/#how-it-works' },
]

const RESOURCES_LINKS = [
  { label: 'Pricing',  href: '/#pricing' },
  { label: 'FAQ',      href: '/#faq' },
  { label: 'Contact',  href: '/#contact' },
]

// ─── Reusable hover dropdown component ───────────────────────────────────────
function NavDropdown({
  label,
  links,
  navigate,
  onNavigate,
}: {
  label: string
  links: { label: string; href: string }[]
  navigate: ReturnType<typeof useNavigate>
  onNavigate?: () => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 120)
  }

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className="flex items-center gap-1 rounded-md px-2 py-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {label}
        <ChevronDown
          className={cn(
            'h-3.5 w-3.5 transition-transform duration-200',
            open && 'rotate-180'
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute top-full left-0 z-50 mt-1 min-w-[180px] rounded-lg border border-border/60 bg-background/95 py-1.5 shadow-lg backdrop-blur-xl"
            role="menu"
          >
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                role="menuitem"
                className="block px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:bg-accent focus-visible:outline-none"
                onClick={(e) => {
                  e.preventDefault()
                  setOpen(false)
                  navigateToHref(navigate, link.href, onNavigate)
                }}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Mobile expandable section ────────────────────────────────────────────────
function MobileNavSection({
  label,
  links,
  navigate,
  onNavigate,
}: {
  label: string
  links: { label: string; href: string }[]
  navigate: ReturnType<typeof useNavigate>
  onNavigate?: () => void
}) {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <button
        className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {label}
        <ChevronDown
          className={cn('h-3.5 w-3.5 transition-transform duration-200', open && 'rotate-180')}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="overflow-hidden pl-3"
          >
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                onClick={(e) => {
                  e.preventDefault()
                  navigateToHref(navigate, link.href, onNavigate)
                }}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────
export function Navbar({ onContactSales, compactLandingLayout = false }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { setTheme } = useTheme()
  const navigate = useNavigate()

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50',
        'bg-background/80 backdrop-blur-xl border-b border-border/50'
      )}
      role="banner"
    >
      <div
        className={cn(
          'mx-auto max-w-7xl sm:px-6 lg:px-8',
          compactLandingLayout ? 'px-3' : 'px-4'
        )}
      >
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex min-w-0 items-center gap-2">
            <img
              src="/buzzlemax-logo.png"
              alt="Buzzlemax AI Logo"
              className="h-8 w-auto shrink-0 md:h-9"
              style={{ height: '32px', width: 'auto' }}
            />
            <span className="truncate text-xl font-bold tracking-tight">
              {COMPANY_INFO.name}
            </span>
          </div>

          {/* Desktop nav — grouped dropdowns */}
          <nav
            className={cn(
              'hidden md:flex items-center',
              compactLandingLayout ? 'gap-1 lg:gap-2' : 'gap-2'
            )}
            aria-label="Main navigation"
          >
            <NavDropdown label="Services"  links={SERVICES_LINKS}  navigate={navigate} />
            <NavDropdown label="Platform"  links={PLATFORM_LINKS}  navigate={navigate} />
            <NavDropdown label="Resources" links={RESOURCES_LINKS} navigate={navigate} />
          </nav>

          {/* Desktop right-hand actions */}
          <div className="hidden md:flex shrink-0 items-center gap-3">
            {/* Theme toggle — strictly tied to existing useTheme hook */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative h-9 w-9">
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Primary CTA */}
            <Button size="sm" onClick={() => onContactSales()} className="font-semibold">
              Book Strategy Call
            </Button>
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="flex shrink-0 items-center gap-1.5 pr-1 md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative h-9 w-9 shrink-0">
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className={cn('space-y-1 py-4', compactLandingLayout ? 'px-3' : 'px-4')}>
              <MobileNavSection
                label="Services"
                links={SERVICES_LINKS}
                navigate={navigate}
                onNavigate={() => setMobileOpen(false)}
              />
              <MobileNavSection
                label="Platform"
                links={PLATFORM_LINKS}
                navigate={navigate}
                onNavigate={() => setMobileOpen(false)}
              />
              <MobileNavSection
                label="Resources"
                links={RESOURCES_LINKS}
                navigate={navigate}
                onNavigate={() => setMobileOpen(false)}
              />

              <div className="flex flex-col gap-2 pt-3">
                <Button
                  className="w-full"
                  onClick={() => {
                    onContactSales()
                    setMobileOpen(false)
                  }}
                >
                  Book Strategy Call
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
