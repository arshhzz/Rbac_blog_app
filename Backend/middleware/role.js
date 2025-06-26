function checkRole(...roles) {
  return (req, res, next) => {
    const userRole = req.user?.role

    if (!userRole || !roles.includes(userRole)) {
      console.log('denied:', req.user)
      return res.status(403).json({ error: 'access denied' })
    }
    next();
  }
}

module.exports = checkRole
