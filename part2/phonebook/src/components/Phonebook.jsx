/* eslint-disable react/prop-types */
import Contact from "./Contact";
const Phonebook = ({persons, filterName}) =>{
    const filteredArray = persons.filter(ele=>ele.name.toLowerCase().includes(filterName.toLowerCase()))
    const filteredContacts = filteredArray.map((person)=>{
       return <Contact name={person.name} phnumberone={person.number} key={person.id} id={person.id}/>
    })
    const unFilteredContacts = filteredArray.map((person)=>{
       return <Contact name={person.name} number={person.number} key={person.id} id={person.id}/>
    })
    const contactsToShow = filterName ? filteredContacts : unFilteredContacts
    return (
    <>
    <h2>Numbers</h2>
    <table>
        <tbody>{contactsToShow}</tbody>
    </table>
    </>)
}
export default Phonebook;