const Comments = require('../models/Comment.model')
const Posts = require('../models/Post.model');

const commentCtrl = {
  createComment: async(req, res) => {
    try {
      const { postId, content, tag, reply } = req.body;
      const newComment = new Comments({user: req.user._id, content, tag, reply})
      await Posts.findOneAndUpdate({_id: postId}, {
        $push: { comments: newComment._id }
      }, {new: true})
      await newComment.save();
      res.json({newComment})
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  }
}

module.exports = commentCtrl