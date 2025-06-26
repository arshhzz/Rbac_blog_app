import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import Login from './components/Login'
import Register from './components/Register'
import BlogList from './components/BlogList'
import AdminDashboard from './components/AdminDashboard'
import Navbar from './components/Navbar'

function App() {
  const savedUser = localStorage.getItem('user')
  const [user, setUser] = useState(savedUser ? JSON.parse(savedUser) : null)

  const handleLogin = (data) => {
    setUser(data)
    localStorage.setItem('user', JSON.stringify(data))
  }
  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <Router>
      <div>
        <Navbar user={user} logout={handleLogout} />
        <div className="container mx-auto mt-6">
          <Routes>
            <Route path="/" element={<BlogList />} />
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login login={handleLogin} />} />
            <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
            <Route path="/admin" element={user && user.role === 'admin' ? <AdminDashboard /> : <Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
