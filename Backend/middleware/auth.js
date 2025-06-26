const jwt = require('jsonwebtoken')

const vertok = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'no token' })
  }
  const token = authHeader.split(' ')[1]

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET)
    req.user = data
    next()
  } catch (e) {
    console.log('bad token:', e.message)
    res.status(403).json({ error: 'bad token' })
  }
}
module.exports = vertok
