function PrimaryButton({ children, type = 'button', ...rest }) {
  return (
    <button
      type={type}
      className="rounded-md border border-gold-400 bg-gold-400 px-5 py-2 text-sm font-semibold text-navy-900 transition hover:bg-gold-300"
      {...rest}
    >
      {children}
    </button>
  )
}

function SecondaryButton({ children, type = 'button', ...rest }) {
  return (
    <button
      type={type}
      className="rounded-md border border-gold-400/50 px-5 py-2 text-sm font-semibold text-gold-300 transition hover:bg-gold-500/10"
      {...rest}
    >
      {children}
    </button>
  )
}

export { PrimaryButton, SecondaryButton }
