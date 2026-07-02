import { Link } from 'react-router-dom'
import BrandLogo from '../common/BrandLogo'

function LegalTopBar({ rightAction, rightActionTo, showPrint = false }) {
  return (
    <header className="border-b border-slate-300/10 bg-navy-900/80">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <BrandLogo />
        {showPrint ? (
          <button
            type="button"
            className="rounded-md border border-gold-400/45 px-4 py-2 text-xs font-semibold text-gold-300 transition hover:bg-gold-500/10"
            onClick={() => window.print()}
          >
            Print Version
          </button>
        ) : rightAction && rightActionTo ? (
          <Link
            to={rightActionTo}
            className="rounded-md border border-gold-400/45 px-4 py-2 text-xs font-semibold text-gold-300 transition hover:bg-gold-500/10"
          >
            {rightAction}
          </Link>
        ) : null}
      </div>
    </header>
  )
}

export default LegalTopBar
