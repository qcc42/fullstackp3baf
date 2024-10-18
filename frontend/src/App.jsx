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
        console.log(JSON.stringify(initialPersons));
        setPersons(initialPersons)
      })
  }, [])

  const getRandomInt = (min, max)  => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      id: persons.length,
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


  const delPerson = (event, id) => {
    event.preventDefault()
    console.log(id)
    personService.remove(id)
    .then(returnedPerson => {
      setPersons(persons.filter(person => person.id != id))
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
            id = {person.id}
            name={person.name}
            number = {person.number}
            onClick = {delPerson}
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