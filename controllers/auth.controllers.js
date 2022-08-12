const User = require("../models/User.model");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const authController = {
  register: async (req, res) => {
    try {
      const { fullname, username, email, password, gender } = req.body;

      const checkUsernameIfExists = await User.findOne({ username })
      if (checkUsernameIfExists) return res.status(400).json({ msg: "Username is already taken." })

      const checkEmailIfExists = await User.findOne({ email })
      if (checkEmailIfExists) return res.status(400).json({ msg: "Email is already taken." })

      if (password.length < 6) return res.status(400).json({ msg: "Password must be at least 6 characters." })

      const passwordHash = await bcrypt.hash(password, 12)

      const newUser = new User({
        fullname, username, email, password: passwordHash, gender
      })

      const access_token = createAccessToken({ id: newUser._id });
      const refresh_token = createRefreshToken({ id: newUser._id });

      res.cookie('refreshToken', refresh_token, {
        httpOnly: true,
        path: '/api/refresh_token',
        maxAge: 30 * 24 * 60 * 60 * 1000
      });

      await newUser.save();

      return res.status(201).json({ 
        message: "Register!",
        access_token,
        user: {
          ...newUser._doc,
          password: ''
        } 
      })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  login: async (req, res) => {
    try {
      const {email, password} = req.body;
      const user = await User.findOne({email})
								.populate('followers following', 'avatar username fullname followers following')

      if (!user) return res.status(400).json({message: "The email does not exists."})

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) return res.status(400).json({message: "The password does not exists."})

      const access_token = createAccessToken({ id: user._id });
      const refresh_token = createRefreshToken({ id: user._id });

      res.cookie('refreshToken', refresh_token, {
        httpOnly: true,
        path: '/api/refresh_token',
        maxAge: 30 * 24 * 60 * 60 * 1000
      });

      return res.json({ 
        message: "Login successfully!",
        access_token,
        user: {
          ...user._doc,
          password: ''
        } 
      })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  logout: async (req, res) => {
    try {
        res.clearCookie('refreshToken', {path: '/api/refresh_token'})
        return res.json({message: "Logged out!"})
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  generateAccessToken: async (req, res) => {
    try {
        const rf_token = req.cookies.refreshToken;
        if (!rf_token) return res.status(400).json({message: "Please login now."})
        jwt.verify(rf_token, process.env.JWT_SECRET_REFRESH_TOKEN, async(err, result) => {
          if (err) return res.status(400).json({message: "Please login now."})
			  
          const user = await User.findById(result.id)
									.select('-password')
									.populate('followers following', 'avatar username fullname followers following')
          
		  if (!user) return res.status(400).json({message: "This does not exists."})
          
		  const access_token = createAccessToken({id: result.id})
          
		  res.json({
            access_token,
            user
          })
        })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
}

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_ACCESS_TOKEN, { expiresIn: '3d' })
}
const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_REFRESH_TOKEN, { expiresIn: '30d' })
}

module.exports = authController;