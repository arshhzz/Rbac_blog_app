const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { z } = require('zod')
const User = require('../models/User')

const router = express.Router()

const userSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1)
});

router.post('/login', async (req, res) => {
  const func = userSchema.safeParse(req.body)

  if (!func.success) return res.status(405).json({ msg: 'Your Inputs are Invalid :(' })
  const { username, password } = func.data

  try {
    const account = await User.findOne({ username });

    if (!account) return res.status(401).json({ msg: 'No account found with this username' })
    const isMatch = await bcrypt.compare(password, account.password);

    if (!isMatch) return res.status(402).json({ msg: 'Oops! Wrong password :(' })
      
      const token = jwt.sign(
        { 
          id: account._id,
          role: account.role 
        },
        process.env.JWT_SECRET,
        { 
          expiresIn: '3h'
        } 
      );
    res.json({token, user: {
        id: account._id,
        username: account.username,
        role: account.role
      }
    });
  } 
  catch (err) {
    res.status(500).json({ msg: 'Server Not found, try again later.' });
  }
});

router.post('/register', async (req, res) => {
  const func = userSchema.safeParse(req.body)
  if (!func.success) return res.status(405).json({ msg: 'Please check your username and password' })
  const { username, password } = func.data

  try {
    const exists = await User.findOne({ username })
    if (exists) return res.status(404).json({ msg: 'This username is taken, please choose another' })

    const hashedPassword = await bcrypt.hash(password, 8);
    const newUser = new User({
      username,
      password: hashedPassword
    })
    await newUser.save()
    res.status(200).json({ msg: 'Yeyy! User Created' })
  } 
  catch (err) {
    res.status(500).json({ msg: 'Server Not Found, please try again later.' })
  }
});;

module.exports = router;
