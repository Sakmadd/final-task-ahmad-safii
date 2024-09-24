const jwt = require('jsonwebtoken')

const authAccess = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer', '')
  const secret = process.env.JWT_SECRET 

  if (!token) {
    return res.status(401).json({
      message: 'Token Is Needed!'
    })
  }

  try {
    const jwtDecode = jwt.verify(token, secret)
    req.user = req.user || {}   
    req.user.data = jwtDecode
    next()  
  } catch (err) {
    console.log(err) 
    return res.status(401).json({
      message: 'Unauthorized'
    })
  }
}

module.exports = authAccess
