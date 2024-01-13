/* eslint-disable react/prop-types */
const Contact = ({name,number,id,deleteItem})=>{
    return (<tr>
        <td>{name}</td>
        <td>{number}</td>
        <td><button onClick={()=>deleteItem(id)}>Delete</button></td>
    </tr>)
}
export default Contact;