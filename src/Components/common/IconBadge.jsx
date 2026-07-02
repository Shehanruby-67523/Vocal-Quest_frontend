function IconBadge({ icon = '◉', label, className = '' }) {
  return (
    <span
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-gold-500/30 bg-gold-500/10 text-sm text-gold-300 ${className}`}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? 'img' : undefined}
    >
      {icon}
    </span>
  )
}

export default IconBadge
