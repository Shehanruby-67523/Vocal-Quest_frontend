import LegalTopBar from './LegalTopBar'
import LegalFooter from './LegalFooter'

function LegalLayout({ children, showPrint = false }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-navy-900 to-navy-950">
      <LegalTopBar rightAction="Back to Sign Up" showPrint={showPrint} />
      <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-10">{children}</main>
      <LegalFooter links={['Terms of Service', 'Cookie Policy', 'Accessibility Statement']} />
    </div>
  )
}

export default LegalLayout
