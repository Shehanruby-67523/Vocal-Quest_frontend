import LegalTopBar from './LegalTopBar'
import LegalFooter from './LegalFooter'

const footerLinks = [
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Terms of Service', to: '/terms-of-service' },
  { label: 'Cookie Policy' },
  { label: 'Accessibility Statement' },
]

function LegalLayout({ children, showPrint = false }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-navy-900 to-navy-950">
      <LegalTopBar rightAction="Back to Sign Up" rightActionTo="/signup" showPrint={showPrint} />
      <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-10">{children}</main>
      <LegalFooter links={footerLinks} />
    </div>
  )
}

export default LegalLayout
