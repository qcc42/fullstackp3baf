const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}
else if(process.argv.length == 3) {

    const password = process.argv[2]

    const url =
    `mongodb+srv://qcc1992:${password}@cluster0.pyjta.mongodb.net/personApp?retryWrites=true&w=majority`

    mongoose.set('strictQuery',false)

    mongoose.connect(url)

    
    const noteSchema = new mongoose.Schema({
        content: String,
        important: Boolean,
    })
  
    const Person = mongoose.model('Person', noteSchema)

    Person.find({}).then(result => {
        result.forEach(note => {
          console.log(note)
        })
        mongoose.connection.close()
      })
}

else {

const password = process.argv[2]

 const url = `mongodb+srv://qcc1992:${password}@cluster0.pyjta.mongodb.net/personApp?retryWrites=true&w=majority`
mongoose.set('strictQuery',false)

mongoose.connect(url)


const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)


const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })
person.save().then(result => {

    console.log('note saved!')
    mongoose.connection.close()

})
}
