import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Register() {
  const [data, setData] = useState({ username: '', password: '' })
  const [err, setErr] = useState('')
  const [msg, setMsg] = useState('')
  const nav = useNavigate()

  const handleChange = (e) => setData(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:3000/api/register', data)
      setMsg('registered! please login')
      setTimeout(() => nav('/login'), 2000)
    } catch (error) {
      setErr(error?.response?.data?.error || 'register failed')
    }
  }
  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded">
      <h2 className="text-2xl font-bold text-center mb-2">LIA PLUS AI BLOG APP</h2>
      <h3 className="text-lg text-center mb-3">Register Here</h3>

      {err && <p className="text-red-600 text-center mb-3">{err}</p>}
      {msg && <p className="text-green-600 text-center mb-3">{msg}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4"><label className="block mb-1 text-sm font-medium">Username</label><input type="text" name="username" value={data.username} onChange={handleChange} className="w-full border px-2 py-2 rounded" required /></div>
        <div className="mb-5"><label className="block mb-1 text-sm font-medium">Password</label><input type="password" name="password" value={data.password} onChange={handleChange} className="w-full border px-2 py-2 rounded" required minLength={6} /></div>
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">Register</button>
      </form>
    </div>
  )
}

export default Register
