import { useState } from 'react'
import axios from 'axios'

function Login({ login }) {
  const [info, setInfo] = useState({ username: '', password: '' })
  const [err, setErr] = useState('')
  const handleChange = (e) => setInfo(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:3000/api/login', info)
      const user = { ...res.data.user, token: res.data.token }
      login(user)
    } catch (e) {
      setErr(e?.response?.data?.error || 'login failed')
    }
  }
  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded">
      <h2 className="text-2xl font-bold text-center mb-2">LIA PLUS AI BLOG APP</h2>
      <h3 className="text-lg text-center mb-3">Login</h3>
      {err && <p className="text-red-600 text-center mb-3">{err}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4"><label className="block text-sm font-medium mb-1">Username</label><input type="text" name="username" value={info.username} onChange={handleChange} className="w-full border px-2 py-2 rounded" required /></div>
        <div className="mb-5"><label className="block text-sm font-medium mb-1">Password</label><input type="password" name="password" value={info.password} onChange={handleChange} className="w-full border px-2 py-2 rounded" required /></div>
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">Login</button>
      </form>
    </div>
  )
}

export default Login
