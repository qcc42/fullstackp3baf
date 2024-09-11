import { useState, useEffect } from 'react'
import Person from './components/Person'
import Footer from './components/Footer'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] =  useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
  
    personService
      .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h1>Phone book</h1>      
      <ul>
        {persons.map(person => 
          <Person
            name={person.name}
            number = {person.number}
          />
        )}
      </ul>
      <form onSubmit={addPerson}>
      <input
          value={newName}
          onChange={handleNameChange}
        />
         <input
          value={newNumber}
          onChange={handleNumberChange}
        />
        <button type="submit">Save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App