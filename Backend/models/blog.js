const mongoose = require('mongoose')

const bSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true 
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
}, { timestamps: true })

const Blog = mongoose.model('Blog', bSchema)
module.exports = Blog;