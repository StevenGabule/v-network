require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const SocketServer = require('./SocketServer')

const app = express();
app.use(express.json())
app.use(cors()) //{origin: '*'}
app.use(cookieParser());

// socket
const http = require('http').createServer(app)
const io = require('socket.io')(http)

io.on('connection', (socket) => {
  SocketServer(socket)
})

// user authentication routes
app.use('/api', require('./routes/authRouter'))
app.use('/api', require('./routes/userRouter'))
app.use('/api', require('./routes/postRouter'))
app.use('/api', require('./routes/commentRouter'))
app.use('/api', require('./routes/notifyRouter'))

const URI = process.env.MONGO_DB_URI;
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, (err) => {
  if (err) throw err
  console.log('Connected')
})

const PORT = process.env.PORT || 5000;

http.listen(PORT, () => console.log(`Server is running on port: http://localhost:${PORT}`));