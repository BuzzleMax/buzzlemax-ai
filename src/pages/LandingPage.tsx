import * as React from 'react'

import { Navbar } from '@/components/landing/Navbar'
import { Hero } from '@/components/landing/Hero'
import { Features } from '@/components/landing/Features'
import { Stats } from '@/components/landing/Stats'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { WhyChooseUs } from '@/components/landing/WhyChooseUs'
import { Pricing } from '@/components/landing/Pricing'
import { Demo } from '@/components/landing/Demo'
import { CTASection } from '@/components/landing/CTASection'
import { AISolutions } from '@/components/landing/AISolutions'
import { FAQ } from '@/components/landing/FAQ'
import { Contact } from '@/components/landing/Contact'
import { MeetTheTeam } from '@/components/landing/MeetTheTeam'
import { Footer } from '@/components/landing/Footer'
import { ContactSalesModal } from '@/components/landing/ContactSalesModal'

export function LandingPage() {
  const [contactSalesOpen, setContactSalesOpen] = React.useState(false)
  const [contactSalesSelectedPlan, setContactSalesSelectedPlan] = React.useState<string | undefined>(undefined)

  const openContactSales = (plan?: string) => {
    setContactSalesSelectedPlan(plan)
    setContactSalesOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar onContactSales={openContactSales} />
      <main>
        <Hero onContactSales={openContactSales} />
        <Stats />
        <Features />
        <HowItWorks />
        <Demo />
        <WhyChooseUs />
        <Pricing onContactSales={openContactSales} />
        <AISolutions onContactSales={openContactSales} />
        <FAQ />
        <Contact />
        <MeetTheTeam />
        <CTASection onContactSales={openContactSales} />
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