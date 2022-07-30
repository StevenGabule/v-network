const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({}, { timestamps: true})

module.exports = mongoose.model('Comment', CommentSchema)