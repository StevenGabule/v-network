const User = require('../models/User.model')
const userController = {
  searchUsers: async (req, res) => {
    try {
      const users = await User.find({ username: { $regex: req.query.username } }).limit(10).select("fullname username avatar")
      return res.json({users})
    } catch (err) {
      return res.status(500).json({message: err.message})
    }
  }
}

module.exports = userController;