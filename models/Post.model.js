const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  content: {
    type: String,
  },
  images: {
    type: Array,
    required: true,
  },
  likes: [{type: mongoose.Types.ObjectId, ref: 'User'}],
  comments: [{type: mongoose.Types.ObjectId, ref: 'Comment'}],
  user: {type: mongoose.Types.ObjectId, ref: 'User'}
}, { timestamps: true})

module.exports = mongoose.model('Post', PostSchema)