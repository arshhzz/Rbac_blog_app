import { useState, useEffect } from 'react'
import axios from 'axios'

function BlogList() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState('')
  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    loadBlogs()
  }, [])
  const loadBlogs = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/blog')
      setBlogs(res.data)
    } catch (e) {
      setErr('Could not load blogs')
    } finally {
      setLoading(false)
    }
  }
  const handleLike = async (id) => {
    if (!user) {
      alert('Please login to like')
      return
    }
    try {
      const token = user.token
      await axios.post(`http://localhost:3000/api/blog/${id}/like`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      loadBlogs()
    } catch {
      alert('Could not like post')
    }
  }

  const formatDate = (date) => {
    const d = new Date(date)
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString()
  }
  if (loading) return <div className="text-center mt-10">Loading blogs...</div>
  if (err) return <div className="text-center text-red-600 mt-10">{err}</div>

  return (
    <div className="max-w-3xl mx-auto p-5">
      <h1 className="text-2xl font-bold mb-5">All Blogs</h1>
      {blogs.length === 0 ? (
        <p className="text-center">No blogs yet</p>
      ) : (
        blogs.map(blog => (
          <div key={blog._id} className="border rounded p-4 mb-5 bg-white">
            <h2 className="text-lg font-semibold">{blog.title}</h2>
            <p className="my-2">{blog.content}</p>
            <div className="text-sm flex justify-between items-center">
              <div>
                by: {blog.author?.username?.split('@')[0] || 'unknown'} | {formatDate(blog.createdAt)}
              </div>
              <div className="flex gap-2 items-center"><span>likes: {blog.likes?.length || 0}</span>
                {user && (
                  <button
                    onClick={() => handleLike(blog._id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Like
                  </button>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default BlogList
