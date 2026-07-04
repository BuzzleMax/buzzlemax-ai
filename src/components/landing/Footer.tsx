import { Sparkles, Mail, Github, Twitter, Linkedin, Instagram } from 'lucide-react'
import { COMPANY_INFO } from '@/lib/constants'
import { Separator } from '@/components/ui/separator'

const footerLinks = {

  Product: [
    { name: 'Features', href: '#features' },
    { name: 'Solutions', href: '#solutions' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Pricing', href: '#pricing' },
  ],
  Resources: [
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ],
  Legal: [
    { name: 'Privacy Policy', href: '#contact' },
    { name: 'Terms of Service', href: '#contact' },
  ],
}

const socialLinks = [
  { icon: Instagram, href: 'https://www.instagram.com/buzzlemax.official/', label: 'Instagram' },
  { icon: Twitter, href: 'https://x.com/BuzzleMax', label: 'X' },
  { icon: Github, href: 'https://github.com/BuzzleMax', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/buzzle-max-24955441b/', label: 'LinkedIn' },
]


export function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                {COMPANY_INFO.name}
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mb-6">
              {COMPANY_INFO.description}
            </p>

            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-background border border-border/50 text-muted-foreground transition-colors hover:text-foreground hover:border-foreground/20"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}

            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        if (link.href.startsWith('#')) {
                          e.preventDefault()
                          const element = document.querySelector(link.href)
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' })
                          }
                        }
                      }}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-12" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <a
                href={`mailto:${COMPANY_INFO.contact.email}`}
                className="hover:text-foreground transition-colors"
              >
                {COMPANY_INFO.contact.email}
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}