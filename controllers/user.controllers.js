const User = require('../models/User.model')
const userController = {
  searchUsers: async (req, res) => {
    try {
      const users = await User.find({ username: { $regex: req.query.username } }).limit(10).select("fullname username avatar")
      return res.json({users})
    } catch (err) {
      return res.status(500).json({message: err.message})
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select("-password");
      if (!user) return res.status(400).json({message: "User does not exists."})
      return res.json({user})
    } catch (err) {
      return res.status(500).json({message: err.message})
    }
  },
  updateUser: async (req, res) => {
    try {
      await User.findByIdAndUpdate({_id: req.user._id}, req.body);
      return res.json({message: "Update Success!"});
    } catch (err) {
      return res.status(500).json({message: err.message})
    }
  },
}

module.exports = userController;