import { PrimaryButton, SecondaryButton } from '../common/Buttons'

function CTABanner({ primaryText, secondaryText }) {
  return (
    <section className="mt-10 rounded-xl border border-slate-300/10 bg-slate-100/[0.03] p-5 shadow-panel">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-xl font-semibold text-slate-100">Ready to start your journey?</h3>
          <p className="mt-1 text-sm text-slate-300/80">
            Join thousands of players in the quest of a lifetime.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <PrimaryButton>{primaryText}</PrimaryButton>
          <SecondaryButton>{secondaryText}</SecondaryButton>
        </div>
      </div>
    </section>
  )
}

export default CTABanner
