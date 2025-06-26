const express = require('express')
const router = express.Router()
const Blog = require('../models/blog')
const vertok = require('../middleware/auth')
const checkRole = require('../middleware/role')
const { z } = require('zod')

const blogSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1)
});

router.post('/create', vertok, checkRole('admin'), async (req, res) => {
  const parsed = blogSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: 'Your Inputs are Invalid :(' })
  try {
    const blog = new Blog({
      title: parsed.data.title,
      content: parsed.data.content,
      author: req.user.id
    })
    await blog.save()
    res.status(200).json({ message: 'Hooray! blog created :)', blog: blog })
  } 
  catch (err) {
    res.status(500).json({ error: 'server not found, please try later' })
  }
});

router.post('/:id/like', vertok, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
    if (!blog) return res.status(404).json({ error: 'cannot find what you are looking for :(' })
    
    const uid = req.user.id
    const alreadyLiked = blog.likes.includes(uid)
    
    if (alreadyLiked) blog.likes = blog.likes.filter((id) => id.toString() !== uid.toString()) 
    else blog.likes.push(uid)
    
    await blog.save()
    
    res.json({ message: alreadyLiked ? 'unliked' : 'liked', likes: blog.likes.length })
  } 
  catch (err) {
    res.status(500).json({ error: 'There is some issue, please try later' })
  }
});
  
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'username')
    res.json(blogs)
  } 
  catch (err) {
    res.status(500).json({ error: 'server not found, please try later' })
  }
});

router.put('/:id', vertok, checkRole('admin'), async (req, res) => {
  const parsed = blogSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: 'Your Inputs are Invalid :(' })
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { 
        title: parsed.data.title, 
        content: parsed.data.content 
      },{ 
        new: true
      }
    )
    if (!updatedBlog) return res.status(404).json({ error: 'cannot find what you are looking for :(' });
    res.json({ message: 'updated :)', blog: updatedBlog })
  } 
  catch (err) {
    res.status(500).json({ error: 'There is some issue, please try later' })
  }
});

router.delete('/:id', vertok, checkRole('admin'), async (req, res) => {
  try {
    const deletedblog = await Blog.findByIdAndDelete(req.params.id)
    if (!deletedblog) return res.status(404).json({ error: 'cannot find what you are looking for :(' })
    res.json({ message: 'Removed.' })
  } 
  catch (err) {
    res.status(500).json({ error: 'could not delete at the moment, try again later' });
  }
});

module.exports = router
