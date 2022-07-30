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
      const user = await User.findById(req.params.id).select("-password").populate('followers following', '-password');
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
  follow: async(req, res) => {
    try {
      const user = await User.find({_id: req.params.id, followers: req.user._id});
      if(user.length > 0) return res.status(500).json({msg: "You followed this user."});
      await User.findOneAndUpdate({_id: req.params.id}, {$push: { followers: req.user._id}}, { new: true })
      await User.findOneAndUpdate({_id: req.user._id}, {$push: { following: req.params.id}}, { new: true })
      res.json({msg: "Followed User."})
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  },
  unFollow: async(req, res) => {
    try {
      await User.findOneAndUpdate({_id: req.params.id}, {$pull: { followers: req.user._id}}, { new: true })
      await User.findOneAndUpdate({_id: req.user._id}, {$pull: { following: req.params.id}}, { new: true })
      res.json({msg: "UnFollow User."})
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  }
}

module.exports = userController;