function LegalFooter({ links }) {
  return (
    <footer className="border-t border-slate-300/10 bg-navy-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>(c) 2023 Vocal Quest Inc. All rights reserved.</p>
        <nav className="flex flex-wrap gap-4 sm:justify-end">
          {links.map((link) => (
            <a key={link} href="#" className="transition hover:text-slate-200">
              {link}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}

export default LegalFooter
