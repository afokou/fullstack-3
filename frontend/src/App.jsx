import "./index.css";

import { useEffect, useState } from 'react'
import Filter from './Filter.jsx';
import PersonForm from './PersonForm.jsx';
import Persons from './Persons.jsx';
import personService from './services/persons.js';
import SuccessNotification from './SuccessNotification.jsx';
import ErrorNotification from './ErrorNotification.jsx';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then(response => {
      setPersons(response.data)
    })
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    const newPerson = { name: newName.trim(), number: newNumber.trim() }

    const existingPerson = persons.find(person => person.name.trim() === newName.trim())
    if (existingPerson) {
      if (window.confirm(`${newName.trim()} is already added to phonebook, replace the old number with a new one?`)) {
        personService.update(existingPerson.id, newPerson)
          .then(response => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : response.data))

            setSuccessMessage(`Updated ${newPerson.name}`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
          })
          .catch(error => {
            console.error("Failed to update person: ", error);

            setErrorMessage(`Information of ${newPerson.name} has already been removed from server`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          });
      }
    } else {
      personService.create(newPerson).then(response => {
        setPersons(persons.concat(response.data))

        setSuccessMessage(`Added ${newPerson.name}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      setNewName('')
      setNewNumber('')
    }
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessNotification message={successMessage} />
      <ErrorNotification message={errorMessage} />
      <Filter search={search} handleSearchChange={handleSearchChange} />
      <h2>add new</h2>
      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} setPersons={setPersons} setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage} />
    </div>
  )
}

export default App
