/* eslint-disable react/prop-types */
import { useState } from 'react';
import Phonebook from './components/Phonebook';
import PersonForm from './components/PersonForm';
const Filter = ({text, value, handleNewChange}) => {
  return(
  <div>
    {text} <input value={value} onChange={handleNewChange}/>
  </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName,setFilterName] = useState('')

  const addPhonebook = (event) => {
    event.preventDefault();
    // const newObj = {name:newName}
    // setPersons(persons.concat(newObj))
    const duplicate = persons.find(ele=>ele.name == newName);
    if(duplicate){
      alert(`${newName} is already added to phonebook`);
      return
    }
    setPersons([...persons, { name: newName,number:newNumber,id:persons.length+1 }]);
    setNewName('');
    setNewNumber('')
  }

  const handlePhonebookChange = (event)=>{
    if (event.target.name === 'name') {
      setNewName(event.target.value);
    } else if (event.target.name === 'number') {
      setNewNumber(event.target.value);
    }
  }
  const handleNewFilter = (event) => { setFilterName(event.target.value) } ;

  console.log('Persons:', persons);
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter text='filter shown with' value={filterName} handleNewChange={handleNewFilter} />
      <PersonForm newName={newName} newNumber={newNumber} handlePhonebookChange={handlePhonebookChange} addPhonebook={addPhonebook} />
      <Phonebook persons={persons} filterName={filterName} />
    </div>
  )
}

export default App