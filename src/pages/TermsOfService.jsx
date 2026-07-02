import { Link } from 'react-router-dom'
import CTABanner from '../Components/legal/CTABanner'
import LegalLayout from '../Components/legal/LegalLayout'
import { LEGAL_LAST_UPDATED } from '../constants/legal'

const terms = [
  {
    id: '01',
    title: 'Acceptance of Terms',
    content:
      'By accessing or using the Vocal Quest platform, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.',
  },
  {
    id: '02',
    title: 'User Conduct',
    content:
      'Users are expected to interact with the Vocal Quest community in a respectful and lawful manner. You agree not to: Use the service for any illegal purpose or to promote illegal activities. Attempt to hack, destabilize, or bypass any security features of the platform. Impersonate any person or entity, including Vocal Quest employees or representatives. Upload or transmit any content that is defamatory, obscene, or infringing on intellectual property.',
  },
  {
    id: '03',
    title: 'Voice Data Usage',
    content:
      'Vocal Quest collects voice recordings to provide and improve our vocal training services. By using our platform, you grant us a non-exclusive, royalty-free license to use, process, and analyze your voice data for the sole purpose of personalizing your experience and training our AI models. Your voice data is encrypted and stored securely according to our Privacy Policy. We will never sell your individual voice recordings to third parties.',
    highlighted: true,
  },
  {
    id: '04',
    title: 'Intellectual Property',
    content:
      'The service and its original content, features, and functionality are and will remain the exclusive property of Vocal Quest and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Vocal Quest. Training materials, sheet music, and instructional videos provided by the platform are for personal use only.',
  },
  {
    id: '05',
    title: 'Termination',
    content:
      'We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.',
  },
]

function TermsOfService() {
  return (
    <LegalLayout showPrint>
      <div>
        <nav className="text-sm text-slate-400">
          <Link to="/signup" className="transition hover:text-gold-300">
            Sign Up
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-300">Terms of Service</span>
        </nav>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl">
          Terms of Service
        </h1>
        <div className="mt-3 flex items-center gap-2">
          <span className="rounded-full border border-gold-400/40 bg-gold-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold-300">
            Effective
          </span>
          <span className="text-sm text-slate-300">Last updated: {LEGAL_LAST_UPDATED}</span>
        </div>

        <div className="mt-8 space-y-8">
          {terms.map((term) => (
            <section
              key={term.id}
              className={`rounded-xl ${term.highlighted ? 'border border-slate-300/10 bg-slate-100/[0.03] p-5 shadow-panel' : ''}`}
            >
              <h2 className="text-2xl font-semibold text-slate-100">
                <span className="mr-2 text-gold-400">{term.id}.</span>
                {term.title}
              </h2>
              <p className="mt-3 text-slate-300/90">{term.content}</p>
            </section>
          ))}
        </div>

        <CTABanner
          primaryText="I ACCEPT THE TERMS"
          secondaryText="Cancel"
          secondaryTo="/signup"
        />
      </div>
    </LegalLayout>
  )
}

export default TermsOfService
