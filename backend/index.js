const express = require('express')
const app = express()
const Person = require('./models/person')
const cors = require('cors')

app.use(express.static('dist'))

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}


app.use(express.static('dist'))
app.use(express.json())
app.use(requestLogger)
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', cors(),   (request, response) => {
  Person.find({}).then(notes => {
    response.json(notes)
  })
})
app.options('/api/persons', cors())
app.post('/api/persons', cors(), (request, response) => {
  const body = request.body

  let person = new Person({
    _id: body._id,
    name: body.name,
    number: body.number,
  })

  person.save().then(savedNote => {
    response.status(200).json(savedNote)
  })

})

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})