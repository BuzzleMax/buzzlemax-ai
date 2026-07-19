import * as React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  Code2,
  Cpu,
  Globe,
  Layout,
  Layers,
  Search,
  ShoppingCart,
  Sparkles,
  Zap,
} from 'lucide-react'

import { PageSEO } from '@/components/common/PageSEO'
import { ContactSalesModal } from '@/components/landing/ContactSalesModal'
import { Footer } from '@/components/landing/Footer'
import { Navbar } from '@/components/landing/Navbar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { navigateToHref } from '@/lib/navigation'
import { COMPANY_INFO } from '@/lib/constants'
import { SITE_URL, WEB_DEVELOPMENT_SEO } from '@/lib/site'
import { cn } from '@/lib/utils'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}


const services = [
  {
    icon: Layout,
    title: 'Landing Pages',
    price: 'Starting at $990',
    description: 'High-converting landing pages designed to capture leads and drive action.',
    features: [
      'Custom design & copy',
      'Mobile responsive',
      'Fast loading speed',
      'Lead capture forms',
      'A/B testing ready',
      'Analytics integration'
    ],
    cta: 'Get Started'
  },
  {
    icon: Globe,
    title: 'Business Websites',
    price: 'Starting at $2,500',
    description: 'Professional multi-page websites that establish your brand and convert visitors.',
    features: [
      '5-10 custom pages',
      'CMS integration',
      'SEO optimization',
      'Contact forms',
      'Blog functionality',
      'Social media integration'
    ],
    cta: 'Get Started'
  },
  {
    icon: ShoppingCart,
    title: 'E-commerce Stores',
    price: 'Starting at $5,000',
    description: 'Complete online stores with payment processing and inventory management.',
    features: [
      'Product catalog',
      'Payment integration',
      'Inventory management',
      'Order tracking',
      'Customer accounts',
      'Marketing tools'
    ],
    cta: 'Get Started'
  },
  {
    icon: Code2,
    title: 'Custom Web Applications',
    price: 'Custom Quote',
    description: 'Bespoke web applications built for your specific business requirements.',
    features: [
      'Custom architecture',
      'Advanced functionality',
      'API integrations',
      'Database design',
      'Authentication systems',
      'Scalable infrastructure'
    ],
    cta: 'Request Quote'
  }
]

const processSteps = [
  { number: '01', title: 'Discovery', description: 'Understanding your goals, audience, and requirements' },
  { number: '02', title: 'Wireframes', description: 'Planning the structure and user flow' },
  { number: '03', title: 'UI Design', description: 'Creating beautiful, functional interfaces' },
  { number: '04', title: 'Development', description: 'Building your solution with modern technologies' },
  { number: '05', title: 'Testing', description: 'Ensuring quality, performance, and security' },
  { number: '06', title: 'Launch', description: 'Deploying your project to production' },
  { number: '07', title: 'Support', description: 'Ongoing maintenance and optimization' }
]

const whyChooseUs = [
  { icon: Sparkles, title: 'Premium UI', description: 'Beautiful, modern interfaces that delight users' },
  { icon: Zap, title: 'Fast Performance', description: 'Optimized for speed and Core Web Vitals' },
  { icon: Search, title: 'SEO Optimized', description: 'Built to rank well in search engines' },
  { icon: Cpu, title: 'Modern Technologies', description: 'Latest frameworks and best practices' },
  { icon: Layers, title: 'Scalable Architecture', description: 'Built to grow with your business' },
  { icon: Brain, title: 'AI Ready', description: 'Prepared for AI integration and automation' }
]

const technologies = [
  { name: 'Next.js', category: 'Framework' },
  { name: 'React', category: 'Framework' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'Tailwind', category: 'Styling' },
  { name: 'Supabase', category: 'Backend' },
  { name: 'Node.js', category: 'Runtime' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'Stripe', category: 'Payments' },
  { name: 'Framer Motion', category: 'Animation' },
  { name: 'OpenAI', category: 'AI' },
  { name: 'Anthropic', category: 'AI' },
  { name: 'Google Gemini', category: 'AI' }
]

const solutionShowcases = [
  {
    title: 'Conversion-Focused Landing Page',
    category: 'Lead Generation',
    description: 'Premium landing pages engineered around trust signals, clear messaging, and stronger CTA hierarchy.',
    tags: ['Next.js', 'Stripe', 'AI'],
    image: 'gradient-1'
  },
  {
    title: 'SaaS Marketing Website',
    category: 'Product Marketing',
    description: 'High-performance sites that position software clearly and support premium product perception.',
    tags: ['React', 'TypeScript', 'D3.js'],
    image: 'gradient-2'
  },
  {
    title: 'Modern Commerce Storefront',
    category: 'E-commerce',
    description: 'Fast storefront experiences with polished UX, stronger product storytelling, and scalable architecture.',
    tags: ['Next.js', 'Framer Motion', 'Tailwind'],
    image: 'gradient-3'
  }
]

export function WebDevelopmentPage() {
  const [isSticky, setIsSticky] = React.useState(false)
  const [contactSalesOpen, setContactSalesOpen] = React.useState(false)
  const [contactSalesSelectedPlan, setContactSalesSelectedPlan] = React.useState<string>('Web Development')
  const navigate = useNavigate()

  React.useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const openContactSales = (plan = 'Web Development') => {
    setContactSalesSelectedPlan(plan)
    setContactSalesOpen(true)
  }

  const handleGetEstimate = () => openContactSales('Web Development')
  const handleBookCall = () => openContactSales('Custom Solution')

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        {...WEB_DEVELOPMENT_SEO}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: 'Custom Web Development',
          name: 'Buzzlemax AI Web Development',
          provider: {
            '@type': 'Organization',
            name: COMPANY_INFO.name,
            url: SITE_URL,
            email: COMPANY_INFO.contact.email,
          },
          description: WEB_DEVELOPMENT_SEO.description,
          url: `${SITE_URL}/web-development`,
          areaServed: 'Worldwide',
        }}
      />
      <Navbar onContactSales={openContactSales} />

      {/* Sticky CTA */}
      {isSticky && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="fixed inset-x-0 top-16 z-40 border-b border-white/10 bg-background/80 backdrop-blur-xl"
        >
          <div className="container flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-sm font-semibold text-foreground sm:text-base">Ready to build a premium website that converts?</span>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button
                onClick={handleGetEstimate}
                className="font-semibold"
              >
                Get Free Estimate
              </Button>
              <Button
                variant="outline"
                onClick={handleBookCall}
                className="font-semibold"
              >
                Book Discovery Call
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      <main id="main-content">
        {/* Hero Section */}
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16" aria-labelledby="web-dev-heading">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-primary/5" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear'
              }}
              className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/15 blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [90, 0, 90],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: 'linear'
              }}
              className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
            />
          </div>

          <div className="container relative z-10 py-24 text-center sm:py-28 lg:py-36">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="eyebrow mb-6">Custom Web Development</span>
              <h1 id="web-dev-heading" className="mx-auto mb-8 max-w-5xl text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
                Custom Websites That
                <span className="block bg-gradient-to-r from-primary via-primary/80 to-primary/50 bg-clip-text text-transparent">
                  Grow Businesses
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mx-auto mb-12 max-w-4xl text-lg leading-8 text-muted-foreground sm:text-xl md:text-2xl"
            >
              We build premium websites, e-commerce platforms, SaaS products, and custom web applications designed for speed, trust, conversions, and long-term growth.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Button
                onClick={handleGetEstimate}
                size="lg"
                className="w-full sm:w-auto"
              >
                Get Free Estimate
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button
                onClick={handleBookCall}
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                Book Discovery Call
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-14 flex flex-col items-center gap-4"
            >
              <div className="glass inline-flex items-center gap-2 rounded-full border-white/15 px-4 py-2">
                <div className="flex gap-1">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                  <div className="h-2 w-2 animate-pulse rounded-full bg-amber-400 delay-100" />
                  <div className="h-2 w-2 animate-pulse rounded-full bg-primary delay-200" />
                </div>
                <span className="text-sm text-muted-foreground">Premium build quality, direct communication, and conversion-focused execution</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Replies come directly from <a className="font-medium text-foreground hover:text-primary" href={`mailto:${COMPANY_INFO.contact.email}`}>{COMPANY_INFO.contact.email}</a>
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex h-10 w-6 justify-center rounded-full border-2 border-foreground/20 pt-2"
            >
              <div className="h-3 w-1.5 rounded-full bg-foreground/40" />
            </motion.div>
          </motion.div>
        </section>

        {/* Services Section */}
        <section className="section relative bg-background" aria-labelledby="web-services-heading">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5" />
          <div className="container relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="section-header"
            >
              <span className="eyebrow mb-4">Services</span>
              <h2 id="web-services-heading" className="section-title">
                Premium Web Solutions
              </h2>
              <p className="section-description">
                Custom-built experiences for measurable ROI, better user trust, and scalable digital growth.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4"
            >
              {services.map((service) => (
                <motion.article key={service.title} variants={cardVariants}>
                  <Card className="surface-card hover-lift h-full bg-background/60">
                    <CardHeader className="pb-6 pt-8 text-left">
                      <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/15">
                        <service.icon className="h-8 w-8" />
                      </div>
                      <h3 className="mb-3 text-xl font-semibold tracking-tight text-foreground">
                        {service.title}
                      </h3>
                      <p className="mb-4 text-sm font-semibold text-primary">
                        {service.price}
                      </p>
                      <p className="text-sm leading-7 text-muted-foreground">
                        {service.description}
                      </p>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <ul className="mb-6 space-y-3">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button onClick={() => openContactSales(service.title)} className="w-full">
                        {service.cta}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        {/* AI Automation Cross-link */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container py-4 text-center"
          aria-labelledby="web-ai-crosslink-heading"
        >
          <div className="surface-card mx-auto max-w-3xl px-6 py-8">
            <p id="web-ai-crosslink-heading" className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Want AI automation too?
            </p>
            <p className="mb-5 text-lg leading-8 text-muted-foreground">
              Pair your website with AI chatbots, voice AI, and workflow automation to qualify leads and book more appointments.
            </p>
            <Button variant="outline" onClick={() => navigateToHref(navigate, '/#pricing')}>
              Explore AI Automation Services
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </motion.section>

        {/* Development Process Section */}
        <section className="section relative bg-background" aria-labelledby="web-process-heading">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          <div className="container relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="section-header"
            >
              <span className="eyebrow mb-4">Process</span>
              <h2 id="web-process-heading" className="section-title">
                Development Process
              </h2>
              <p className="section-description">
                A structured workflow that keeps projects fast, transparent, and conversion-focused from kickoff to launch.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
              {processSteps.map((step) => (
                <motion.article
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="surface-card h-full bg-background/60">
                    <CardContent className="p-6">
                      <div className="mb-4 text-4xl font-bold text-primary/20">
                        {step.number}
                      </div>
                      <h3 className="mb-3 text-xl font-semibold text-foreground">
                        {step.title}
                      </h3>
                      <p className="text-sm leading-7 text-muted-foreground">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="section relative bg-background" aria-labelledby="web-why-heading">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="section-header"
            >
              <span className="eyebrow mb-4">Why BuzzleMax</span>
              <h2 id="web-why-heading" className="section-title">
                Why Choose BuzzleMax
              </h2>
              <p className="section-description">
                Modern UI, clean code, and performance-minded execution designed to elevate trust and premium perception.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {whyChooseUs.map((item) => (
                <motion.article key={item.title} variants={cardVariants}>
                  <div className="surface-card h-full p-8 text-center">
                    <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/15">
                      <item.icon className="h-8 w-8" />
                    </div>
                    <h3 className="mb-3 text-xl font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-7 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Technology Section */}
        <section className="section relative bg-background" aria-labelledby="web-tech-heading">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="section-header"
            >
              <span className="eyebrow mb-4">Stack</span>
              <h2 id="web-tech-heading" className="section-title">
                Modern Technologies
              </h2>
              <p className="section-description">
                Built with a modern stack that supports speed, accessibility, maintainability, and future growth.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
            >
              {technologies.map((tech) => (
                <motion.div
                  key={tech.name}
                  variants={cardVariants}
                  className="surface-card p-6 text-center"
                >
                  <div className="mb-1 text-lg font-semibold text-foreground">
                    {tech.name}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    {tech.category}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Solution Examples Section */}
        <section className="section relative bg-background" aria-labelledby="web-showcase-heading">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="section-header"
            >
              <span className="eyebrow mb-4">Examples</span>
              <h2 id="web-showcase-heading" className="section-title">
                Common Build Types
              </h2>
              <p className="section-description">
                Typical website engagements we design and build for brands that want sharper positioning and stronger conversions.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {solutionShowcases.map((project) => (
                <motion.article key={project.title} variants={cardVariants}>
                  <Card className="surface-card hover-lift overflow-hidden h-full">
                    <div
                      className={cn(
                        'h-48 bg-gradient-to-br',
                        project.image === 'gradient-1' && 'from-primary/25 to-primary/5',
                        project.image === 'gradient-2' && 'from-blue-500/20 to-cyan-500/10',
                        project.image === 'gradient-3' && 'from-emerald-500/20 to-teal-500/10'
                      )}
                    />
                    <CardContent className="p-6">
                      <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
                        {project.category}
                      </div>
                      <h3 className="mb-3 text-xl font-semibold text-foreground">
                        {project.title}
                      </h3>
                      <p className="mb-4 text-sm leading-7 text-muted-foreground">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-border/70 bg-background/80 px-3 py-1 text-xs text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section relative overflow-hidden bg-background" aria-labelledby="web-cta-heading">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent" />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"
          />

          <div className="container relative text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-4xl"
            >
              <span className="eyebrow mb-4">Let’s Build</span>
              <h2 id="web-cta-heading" className="section-title">
                Ready to build your next project?
              </h2>
              <p className="mx-auto mb-12 max-w-2xl text-lg leading-8 text-muted-foreground">
                Let’s create something polished, fast, and conversion-focused together.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button onClick={handleBookCall} size="lg">
                  Book a Discovery Call
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" onClick={handleGetEstimate}>
                  Request Pricing Guidance
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
      <ContactSalesModal
        open={contactSalesOpen}
        onOpenChange={setContactSalesOpen}
        selectedPlan={contactSalesSelectedPlan}
      />
    </div>
  )
}
