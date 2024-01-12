/* eslint-disable react/prop-types */
import { useState,useEffect } from 'react';
import Phonebook from './components/Phonebook';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import phoneServices from './services/person';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName,setFilterName] = useState('')

  useEffect(() => {
    phoneServices.getAll().then(result=>{
      setPersons(result)
    });
  }, [])

  const addPhonebook = (event) => {
    event.preventDefault();
    // const newObj = {name:newName}
    // setPersons(persons.concat(newObj))
    const duplicate = persons.find(ele=>ele.name == newName);
    if(duplicate){
      alert(`${newName} is already added to phonebook`);
      return
    }
    let obj = { name: newName,number:newNumber,id:(persons.length+1).toString() }
    phoneServices.create(obj).then(result=>{
      setPersons(persons.concat(result.data))
    })

    setNewName('')
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