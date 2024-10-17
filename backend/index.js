const express = require('express')
const app = express()
const Person = require('./models/person')
const cors = require('cors')
const mongoose = require('mongoose')


const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}


app.use(express.json())
app.use(requestLogger)
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(cors())

app.use((req, res, next) => {

  res.status(200).setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', cors(), (request, response) => {
  response.status(200)
})

app.get('/api/persons', cors(),  (request, response) => {
  Person.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/persons/:id',cors(), (request, response, next) => {
  Person.find({'id': request.params.id})
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})
app.post('/api/persons', cors(), (request, response) => {
  const body = request.body

  let person = new Person({
    id: body.id,
    name: body.name,
    number: body.number,
  })

  person.save().then(savedNote => {
    response.status(200).json(savedNote)
  })

})


app.delete('/api/persons/:id', cors(), (request, response, next) => {
  Person.deleteOne({"id": request.params.id})
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})