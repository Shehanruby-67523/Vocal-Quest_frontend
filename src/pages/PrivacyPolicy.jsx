import CTABanner from '../components/legal/CTABanner'
import IconBadge from '../components/common/IconBadge'
import LegalLayout from '../components/legal/LegalLayout'
import SectionCard from '../components/legal/SectionCard'

function PrivacyPolicy() {
  return (
    <LegalLayout>
      <div className="space-y-8">
        <div>
          <p className="text-sm text-slate-400">Home / Privacy Policy</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl">
            Privacy<span className="text-gold-400">First.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-300">
            Last updated: October 2023. At Vocal Quest, your voice is yours alone. We believe in
            radical transparency regarding your data.
          </p>
        </div>

        <section className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <IconBadge icon="o" />
              <h2 className="text-3xl font-semibold text-slate-100">Data Collection</h2>
            </div>
            <p className="text-slate-300/90">
              Vocal Quest utilizes the <span className="text-gold-300">Web Speech API</span> to
              process your voice commands in real-time. This processing happens primarily on your
              device. We do not record or store your continuous audio stream.
            </p>
            <div className="space-y-2">
              <div className="rounded-lg border border-slate-300/10 bg-slate-100/[0.04] px-4 py-3 text-sm text-slate-300">
                Technical metadata (browser version, operating system) required for session
                stability.
              </div>
              <div className="rounded-lg border border-slate-300/10 bg-slate-100/[0.04] px-4 py-3 text-sm text-slate-300">
                Anonymized voice snippets only when you explicitly trigger a "Report Issue" action.
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <IconBadge icon="*" />
              <h2 className="text-3xl font-semibold text-slate-100">How We Use Your Voice Data</h2>
            </div>
            <p className="text-slate-300/90">
              Your voice data is used exclusively to power the core interactive experience of Vocal
              Quest. We do not sell, rent, or trade your voice data to third parties for
              advertising or profiling.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <SectionCard title="Real-time Feedback" compact>
                <p className="text-slate-300/90">
                  Converting speech-to-text to provide immediate quest interactions and game
                  mechanics.
                </p>
              </SectionCard>
              <SectionCard title="Algorithm Improvement" compact>
                <p className="text-slate-300/90">
                  Using aggregated, non-identifiable text transcripts to improve our custom
                  language models.
                </p>
              </SectionCard>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <IconBadge icon="v" />
              <h2 className="text-3xl font-semibold text-slate-100">Data Security</h2>
            </div>
            <p className="text-slate-300/90">
              We employ industry-leading encryption protocols (TLS 1.3) for any data transmitted
              to our secure servers. Our infrastructure is hosted on ISO 27001 certified data
              centers with 24/7 monitoring.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <IconBadge icon="!" />
              <h2 className="text-3xl font-semibold text-slate-100">Your Rights</h2>
            </div>
            <SectionCard title="You have full control of your data." compact>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>Request a copy of all stored transcripts associated with your account.</li>
                <li>Withdraw consent for microphone access at any time through your browser.</li>
                <li>Request permanent deletion of your account and all associated data.</li>
              </ul>
            </SectionCard>
          </div>
        </section>

        <CTABanner primaryText="Sign Up Now" secondaryText="Contact Privacy Team" />
      </div>
    </LegalLayout>
  )
}

export default PrivacyPolicy
