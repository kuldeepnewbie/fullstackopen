/* eslint-disable react/prop-types */
import { useState,useEffect } from 'react';
import Phonebook from './components/Phonebook';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import phoneServices from './services/person';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName,setFilterName] = useState('');
  const [setAlertMessage, setAlertChangeMessage] = useState('');

  useEffect(() => {
    phoneServices.getAll().then(result=>{
      console.log("kuldeep")
      setPersons(result)
    });
  }, [])

  const addPhonebook = (event) => {
    event.preventDefault();
  
    const duplicate = persons.find(ele => ele.name === newName);
    const obj = { name: newName, number: newNumber, id: (persons.length + 1).toString() };
  
    if (duplicate) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        phoneServices.update(duplicate?.id, obj).then(result => {
          // Use map to create a new array with the updated person
          const updatedPersons = persons.map((ele) => {
            return ele.name === duplicate.name ? { ...ele, number: obj.number } : ele;
          });
  
          setPersons(updatedPersons);
        });
      }
    } else {
      phoneServices.create(obj).then(result => {
        setPersons(persons.concat(result.data));
        setAlertChangeMessage(`Successfully added ${newName}`)
          setTimeout(() => {
          setAlertChangeMessage(null)
        }, 5000)
      });
    }
  
    setNewName('');
    setNewNumber('');
  };
  

  const handlePhonebookChange = (event)=>{
    if (event.target.name === 'name') {
      setNewName(event.target.value);
    } else if (event.target.name === 'number') {
      setNewNumber(event.target.value);
    }
  }

  const deleteItem = (id)=>{
    const person = persons.find(n => n.id === id)
    if (window.confirm(`Delete ${person.name} ?`)) {
        phoneServices.deleteItem(id).then(result=>{

        })  
        setPersons(persons.filter(persons => persons.id !== id))        
    }
}
  const handleNewFilter = (event) => { setFilterName(event.target.value)} ;

  return (
    <div>
      <Notification message={setAlertMessage} />
      <h2>Phonebook</h2>
      <Filter text='filter shown with' value={filterName} handleNewChange={handleNewFilter} />
      <PersonForm newName={newName} newNumber={newNumber} handlePhonebookChange={handlePhonebookChange} addPhonebook={addPhonebook} />
      <Phonebook persons={persons} filterName={filterName} deleteItem={deleteItem} />
    </div>
  )
}

export default App