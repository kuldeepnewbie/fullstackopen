/* eslint-disable react/prop-types */
const PersonForm = ({newName,newNumber,handlePhonebookChange,addPhonebook}) => {
    return (<div>
        <h2>Add a new</h2>
        <form onSubmit={addPhonebook}>
            <div>
                name: <input type="text" name="name" value={newName} onChange={handlePhonebookChange} />
            </div>
            <div>number: <input type="number" name="number" value={newNumber} onChange={handlePhonebookChange} /></div>
            <div>
                <button type="submit" >add</button>
            </div>
        </form>
    </div>)
}
export default PersonForm;