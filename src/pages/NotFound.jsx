import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-navy-900 to-navy-950 px-4 text-center text-slate-100">
      <h1 className="text-6xl font-bold text-gold-400">404</h1>
      <p className="mt-4 text-lg text-slate-300">The page you are looking for does not exist.</p>
      <Link
        to="/login"
        className="mt-8 rounded-md border border-gold-400 bg-gold-400 px-5 py-2 text-sm font-semibold text-navy-900 transition hover:bg-gold-300"
      >
        Back to Login
      </Link>
    </div>
  )
}

export default NotFound
