const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')

const directory = path.join(__dirname, '/statics/')
app.use(express.static(directory))
app.use(cors())
//untuk connect ke database
mongoose.connect('mongodb://localhost:27017/movieapp', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Berhasil Connect ke Database'))
  .catch(() => console.log('Gagal Connect ke Database'))

app.use(express.json({
  extended: true,
  limit: '20mb'
}))

app.use(express.urlencoded({
  extended: true,
  limit: '20mb'
}))

app.use('/user', require('./routes/User'))
app.use('/movie', require('./routes/Movie'))
app.use('/order', require('./routes/Order'))

app.listen(3000, () =>{
    console.log('server started')
})