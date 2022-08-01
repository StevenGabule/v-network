const User = require('../models/User.model')
const userController = {
  searchUsers: async (req, res) => {
    try {
      const users = await User.find({ username: { $regex: req.query.username } }).limit(10).select("fullname username avatar")
      return res.json({ users })
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select("-password").populate('followers following', '-password');
      if (!user) return res.status(400).json({ message: "User does not exists." })
      return res.json({ user })
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  },
  updateUser: async (req, res) => {
    try {
      await User.findByIdAndUpdate({ _id: req.user._id }, req.body);
      return res.json({ message: "Update Success!" });
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  },
  follow: async (req, res) => {
    try {
      const user = await User.find({ _id: req.params.id, followers: req.user._id });
      if (user.length > 0) return res.status(500).json({ msg: "You followed this user." });
     
      const newUser = await User.findOneAndUpdate(
        { _id: req.params.id }, 
        { $push: { followers: req.user._id } }, 
        { new: true }).populate('followers following', '-password')

      await User.findOneAndUpdate({ _id: req.user._id }, { $push: { following: req.params.id } }, { new: true })
     
      res.json({newUser})
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  unFollow: async (req, res) => {
    try {
      const newUser = await User.findOneAndUpdate(
        { _id: req.params.id }, 
        { $pull: { followers: req.user._id } 
      }, { new: true }).populate('followers following', '-password')
      await User.findOneAndUpdate({ _id: req.user._id }, { $pull: { following: req.params.id } }, { new: true })
      res.json({ newUser })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  suggestionsUser: async (req, res) => {
    try {
      const newArr = [...req.user.following, req.user._id]
      const num = req.query.num || 10;
      const users = await User.aggregate([
        { $match: { _id: { $nin: newArr } } },
        { $sample: { size: Number(num) } },
        { $lookup: { from: 'users', localField: 'followers', foreignField: '_id', as: "followers" } },
        { $lookup: { from: 'users', localField: 'following', foreignField: '_id', as: "following" } },
      ]).project('-password');
      return res.json({
        users,
        result: users.length
      })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  }
}

module.exports = userController;