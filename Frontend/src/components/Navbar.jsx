import { Link } from 'react-router-dom'

function Navbar({ user, logout }) {
  return (
    <nav style={{ background: 'black', color: 'white', padding: '1rem' }}>
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div>
          <Link to="/" className="text-white text-3xl font-bold no-underline flex items-center gap-2">
            LIA PLUS AI BLOG APP
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
          </Link>
        </div>
        <div>
          {user ? (
            <div className="flex items-center gap-3">
              <span ><b>Hi {user.username.split('@')[0]}</b> ({user.role})</span>
              {user.role === 'admin' && (<Link to="/admin" className="text-sm font-semibold uppercase hover:text-gray-400 px-2 mx-2">Manage Blogs</Link>)}
              <button type="button" onClick={logout} className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">Logout</button>
            </div>
          ) : (
            <div className="flex gap-3">
              <Link to="/login" className="hover:text-gray-400 mx-2 text-l">Login</Link>
              <Link to="/register" className="hover:text-gray-400 mx-2 text-l">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
