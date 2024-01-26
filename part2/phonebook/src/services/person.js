import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/phonebook';

const getAll = async () => {
    try{
      const response = await axios.get(baseUrl)
      return response.data
    }catch(error){
      throw new Error(`Error Fetching data: ${error.message}`)
    }
  }
  
  const create = async (newObject) => {
    try {
      const response = await axios.post(baseUrl, newObject);
      return response.data;
    } catch (error) {
      throw new Error(`Error creating data: ${error.message}`);
    }
  };
  
  const update = async (id, newObject) => {
    try {
      const response = await axios.put(`${baseUrl}/${id}`, newObject);
      return response.data;
    } catch (error) {
      throw new Error(`Error updating data: ${error.message}`);
    }
  };
  
  const deleteItem = async (id) => {
    try {
      const response = await axios.delete(`${baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error deleting data: ${error.message}`);
    }
  };

  const phoneServices = { getAll, create, update, deleteItem };

  export default phoneServices;