const User = require('../models/User.model')
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')
    
    if (!token) return res.status(400).json({ message: "Unauthorized." })

    const decoded = jwt.verify(token, process.env.JWT_SECRET_ACCESS_TOKEN)

    if (!decoded) return res.status(400).json({ message: "Invalid token." })

    const user = await User.findOne({_id: decoded.id})
    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({message: err.message})
  }
}

module.exports = auth;