const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
  content: {type: String, required: true},
  tag: Object,
  reply: mongoose.Types.ObjectId,
  likes: [{type: mongoose.Types.ObjectId, ref: 'User'}],
  user: {type: mongoose.Types.ObjectId, ref: 'User'}
}, { timestamps: true})

module.exports = mongoose.model('Comment', CommentSchema)