const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
    maxLength: 25
  },
  username: {
    type: String,
    required: true,
    trim: true,
    maxLength: 25,
    unique: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png'
  },
  role: {
    type: String,
    default: 'user',
  },
  gender: {
    type: String,
    default: 'male',
  },
  mobile: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  story: {
    type: String,
    maxLength: 200,
    default: ''
  },
  website: { type: String, default: ''},
  followers: [{type: mongoose.Types.ObjectId, ref: 'User'}],
  following: [{type: mongoose.Types.ObjectId, ref: 'User'}],
}, {timestamps: true})

module.exports = mongoose.model('User', UserSchema)