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
  id: String,
  name: String,
  number: String,
},
{versionKey: false, 
}
)

personSchema = personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const model = mongoose.model('Person', personSchema)

module.exports = model