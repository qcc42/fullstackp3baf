const mongoose = require('mongoose')
require('dotenv').config()

mongoose.set('strictQuery', false)


const url = process.env.MONGODB_URI


console.log('connecting to', url)

mongoose.connect(url)

  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

let personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: String,
},
)

const model = mongoose.model('Person', personSchema)

module.exports = model