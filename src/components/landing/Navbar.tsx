import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useTheme } from '@/hooks/use-theme'
import { cn } from '@/lib/utils'
import { COMPANY_INFO } from '@/lib/constants'
import { navigateToHref } from '@/lib/navigation'
import { NAV_LINKS } from '@/lib/site'

type NavbarProps = {
  onContactSales: (plan?: string) => void
  compactLandingLayout?: boolean
}

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
          <div className="flex min-w-0 items-center gap-2">
            <img 
              src="/logo-36x36.png" 
              alt="Buzzlemax AI Logo" 
              className="h-8 w-8 shrink-0 rounded-lg md:h-9 md:w-9"
              style={{ height: '32px', width: '32px' }}
              sizes="(max-width: 768px) 32px, 36px"
              srcSet="/logo-32x32.png 32w, /logo-36x36.png 36w"
            />
            <span className="truncate text-xl font-bold tracking-tight">
              {COMPANY_INFO.name}
            </span>
          </div>

          <nav
            className={cn(
              'hidden md:flex items-center',
              compactLandingLayout ? 'gap-5 lg:gap-6' : 'gap-8'
            )}
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  navigateToHref(navigate, link.href)
                }}
                className={cn(
                  'rounded-md py-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                  compactLandingLayout ? 'px-1.5 lg:px-2' : 'px-2'
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex shrink-0 items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative h-9 w-9">
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme('light')}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline" size="sm" onClick={() => navigateToHref(navigate, '/#pricing')}>
              View Pricing
            </Button>
            <Button size="sm" onClick={() => onContactSales()} className="font-semibold">
              Book Strategy Call
            </Button>
          </div>

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
                <DropdownMenuItem onClick={() => setTheme('light')}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>
                  System
                </DropdownMenuItem>
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
            <div className={cn('space-y-3 py-4', compactLandingLayout ? 'px-3' : 'px-4')}>
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    navigateToHref(navigate, link.href, () => setMobileOpen(false))
                  }}
                  className="block rounded-md px-2 py-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-2">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigateToHref(navigate, '/#pricing', () => setMobileOpen(false))}
                >
                  View Pricing
                </Button>
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
