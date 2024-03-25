import axios from 'axios';
import Notification from '../components/Notification'
// const baseUrl = 'https://react-phonebook-z4df.onrender.com/api/phonebook';
const baseUrl = 'http://localhost:3001/api/phonebook';

const getAll = async () => {
    try{
      const response = await axios.get(baseUrl)
      return response.data
    }catch(error){
      // alert(error.response.data.error)
      throw new Error(`Error Fetching data: ${error.response.data.error}`)
    }
  }
  
  const create = async (newObject) => {
    try {
      const response = await axios.post(baseUrl, newObject);
      return response.data;
    } catch (error) {
      throw new Error(`Error creating data: ${error.response.data.error}`);
    }
  };
  
  const update = async (id, newObject) => {
    try {
      const response = await axios.put(`${baseUrl}/${id}`, newObject);
      return response.data;
    } catch (error) {
      console.log(error,"Asdasd")
      throw new Error(`Error updating data: ${error.response.data.error}`);
    }
  };
  
  const deleteItem = async (id) => {
    try {
      const response = await axios.delete(`${baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error deleting data: ${error.response.data.error}`);
    }
  };

  const phoneServices = { getAll, create, update, deleteItem };

  export default phoneServices;