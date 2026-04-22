import { Link } from 'react-router-dom'
import BrandLogo from '../components/common/BrandLogo'

function DemonGuardian() {
  return (
    <div className="min-h-screen bg-[#052a4d] text-slate-100">
      <header className="border-b border-slate-300/10 bg-[#0b2e4f]/80">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
          <BrandLogo />
          <Link
            to="/"
            className="rounded-md border border-gold-400/45 px-3 py-1.5 text-xs font-semibold text-gold-300 transition hover:bg-gold-500/10"
          >
            Exit Encounter
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
        <section className="space-y-8 rounded-2xl border border-slate-300/10 bg-[#03274a]/50 p-4 shadow-panel sm:p-6">
          <article className="relative overflow-hidden rounded-2xl border border-gold-500/20">
            <div className="absolute right-4 top-4 z-20 rounded-full border border-gold-400/40 bg-[#041d36]/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-300">
              ... Listening
            </div>
            <div className="relative h-52 bg-gradient-to-b from-[#2f3f4a] via-[#1c2d39] to-[#0a1118] sm:h-72">
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-slate-300/40" />
              <div className="absolute bottom-10 left-1/2 h-24 w-10 -translate-x-1/2 rounded-t-full bg-black/60" />
              <div className="absolute inset-x-0 top-5 text-center text-xs tracking-[0.4em] text-slate-200/80">
                IRON GATE
              </div>
            </div>
          </article>

          <article className="rounded-xl border border-slate-300/10 bg-[#072b4d]/80 p-4 sm:p-6">
            <h1 className="text-3xl font-bold text-gold-400 sm:text-4xl">The Shadowed Gate</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-200/90">
              The Demon Guardian towers over the obsidian threshold, its eyes smoldering like dying
              embers. The air grows heavy with the scent of sulfur and ancient magic. You feel the
              weight of centuries pressing against your chest. Your voice is the only weapon that
              can pierce this silence.
            </p>
          </article>

          <section>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-gold-300/90">
              Speak Your Command
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <button className="rounded-xl border border-gold-400/35 bg-[#092f53] p-5 text-left transition hover:border-gold-300 hover:bg-[#0b355d]">
                <p className="text-3xl font-bold tracking-wide text-gold-300">APPROACH</p>
                <p className="mt-2 text-lg text-slate-300/90">"Walk forward with intent..."</p>
              </button>
              <button className="rounded-xl border border-gold-400/35 bg-[#092f53] p-5 text-left transition hover:border-gold-300 hover:bg-[#0b355d]">
                <p className="text-3xl font-bold tracking-wide text-gold-300">SNEAK</p>
                <p className="mt-2 text-lg text-slate-300/90">"Move quietly through shadows..."</p>
              </button>
            </div>
          </section>

          <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-300/10 pt-5 text-xs">
            <div className="flex items-center gap-6">
              <div>
                <p className="mb-1 uppercase tracking-wider text-gold-300/80">Vocal Power</p>
                <div className="flex gap-1">
                  <span className="h-1.5 w-4 rounded bg-gold-300" />
                  <span className="h-1.5 w-4 rounded bg-gold-400" />
                  <span className="h-1.5 w-4 rounded bg-slate-500/50" />
                  <span className="h-1.5 w-4 rounded bg-slate-500/50" />
                </div>
              </div>
              <div>
                <p className="mb-1 uppercase tracking-wider text-gold-300/80">Sanity</p>
                <div className="flex gap-1">
                  <span className="h-1.5 w-4 rounded bg-rose-300" />
                  <span className="h-1.5 w-4 rounded bg-rose-400" />
                  <span className="h-1.5 w-4 rounded bg-rose-500" />
                  <span className="h-1.5 w-4 rounded bg-slate-500/50" />
                </div>
              </div>
            </div>
            <p className="text-slate-300/70">Act I: The Descent</p>
          </footer>
        </section>
      </main>
    </div>
  )
}

export default DemonGuardian
