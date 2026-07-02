function SectionCard({ title, children, compact = false }) {
  const Heading = compact ? 'h3' : 'h2'

  return (
    <section className="space-y-3">
      <Heading className={`font-semibold text-slate-100 ${compact ? 'text-lg' : 'text-2xl'}`}>
        {title}
      </Heading>
      <div
        className={`rounded-xl border border-slate-300/10 bg-slate-100/[0.03] p-4 shadow-panel ${compact ? 'text-sm' : 'text-base'}`}
      >
        {children}
      </div>
    </section>
  )
}

export default SectionCard
