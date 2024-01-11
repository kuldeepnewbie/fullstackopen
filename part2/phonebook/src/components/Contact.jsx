/* eslint-disable react/prop-types */
import phoneServices from "../services/person";
const Contact = ({name,number,id})=>{

    const deleteItem = (id)=>{
        if (window.confirm("Do you really want to Delete?")) {
            phoneServices.deleteItem(id).then(result=>{

            })          
        }
    }
    return (<tr>
        <td>{name}</td>
        <td>{number}</td>
        <td><button onClick={()=>deleteItem(id)}>Delete</button></td>
    </tr>)
}
export default Contact;