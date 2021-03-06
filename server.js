require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express();
app.use(express.json())
app.use(cors())
app.use(cookieParser());

// user authentication routes
app.use('/api', require('./routes/authRouter'))
app.use('/api', require('./routes/userRouter'))

const URI = process.env.MONGO_DB_URI;
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, (err) => {
  if (err) throw err
  console.log('Connected')
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));