const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const express = require('express')
const mongoose = require('mongoose')
const config = require('config')

const uri = 'mongodb://Bomane:27017,Bomane:27018,Bomane:27019/product-feed?replicaSet=rs'
mongoose.connect(uri).then(() => console.log('MongoDB Successfully Connected')).catch((ex) => console.log(ex.message))

const app = express()

app.use(express.json())
app.use('/api/categories', require('./routes/categories'))
app.use('/api/suggestions', require('./routes/suggestions'))
app.use('/api/suggestions', require('./routes/comments'))
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))


if (!config.get('feedPrivatekey')) {
  console.log("Fatal Error: no jwt key defined")
  process.exit(1)
}


app.get('/', (req, res) => {
  res.send('Suggestion App')
})

const port = process.env.PORT || 1200
app.listen(port, () => console.log('Listenning on  ' + port))