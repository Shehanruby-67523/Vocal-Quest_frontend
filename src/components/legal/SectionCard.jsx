function SectionCard({ title, children, compact = false }) {
  return (
    <section className="space-y-3">
      <h2 className="text-2xl font-semibold text-slate-100">{title}</h2>
      <div
        className={`rounded-xl border border-slate-300/10 bg-slate-100/[0.03] p-4 shadow-panel ${compact ? 'text-sm' : 'text-base'}`}
      >
        {children}
      </div>
    </section>
  )
}

export default SectionCard
