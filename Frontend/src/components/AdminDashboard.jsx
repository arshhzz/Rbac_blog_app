import { useState, useEffect } from 'react'
import axios from 'axios'

function AdminDashboard() {
  const [blogs, setBlogs] = useState([])
  const [form, setForm] = useState({ title: '', content: '' })
  const [editId, setEditId] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [msg, setMsg] = useState('')
  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    getAllBlogs()
  }, [])

  const getAllBlogs = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/blog')
      setBlogs(res.data)
    } catch (e) {
      setMsg('Could not fetch blogs')
    } finally {
      setIsLoading(false)
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = user?.token
    if (!token) {
      setMsg('Token missing')
      return
    }

    try {
      if (editId) {
        await axios.put(`http://localhost:3000/api/blog/${editId}`, form, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setEditId(null)
      } else {
        await axios.post('http://localhost:3000/api/blog/create', form, {
          headers: { Authorization: `Bearer ${token}` }
        })
      }

      setForm({ title: '', content: '' })
      setMsg('')
      getAllBlogs()
      alert('Blog saved!')
    } catch (err) {
      setMsg(err.response?.data?.error || 'Something went wrong')
    }
  }

  const editBlog = (blog) => {
    setEditId(blog._id)
    setForm({ title: blog.title, content: blog.content })
  }

  const deleteBlog = async (id) => {
    if (!window.confirm('Delete this blog?')) return

    const token = user?.token
    if (!token) {
      setMsg('Token missing')
      return
    }

    try {
      await axios.delete(`http://localhost:3000/api/blog/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      getAllBlogs()
    } catch (e) {
      setMsg('Delete failed')
    }
  }

  const cancelEdit = () => {
    setEditId(null)
    setForm({ title: '', content: '' })
  }

  const formatDate = (val) => {
    const d = new Date(val)
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString()
  }

  if (isLoading) return <div className="text-center mt-10">Loading...</div>

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {msg && (
        <div className="bg-red-100 border text-red-700 px-4 py-3 rounded mb-4">
          {msg}
        </div>
      )}

      <div className="border rounded p-5 mb-6">
        <h2 className="text-xl font-semibold mb-3">{editId ? 'Edit Blog' : 'New Blog'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-sm mb-1">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-1">Content</label>
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows="4"
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="flex gap-3">
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              {editId ? 'Update' : 'Post'}
            </button>
            {editId && (
              <button type="button" onClick={cancelEdit} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <h2 className="text-2xl font-semibold mb-4">My Blogs</h2>
      {blogs.map((blog) => (
        <div key={blog._id} className="border rounded p-4 mb-4">
          <h3 className="text-lg font-bold">{blog.title}</h3>
          <p className="mb-2">{blog.content}</p>
          <div className="text-sm mb-3">
            <div>by: {blog.author?.username?.split('@')[0] || 'unknown'}</div>
            <div>created: {formatDate(blog.createdAt)}</div>
            {blog.updatedAt !== blog.createdAt && (
              <div>updated: {formatDate(blog.updatedAt)}</div>
            )}
            <div>likes: {blog.likes?.length || 0}</div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => editBlog(blog)} className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500">
              Edit
            </button>
            <button onClick={() => deleteBlog(blog._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AdminDashboard
