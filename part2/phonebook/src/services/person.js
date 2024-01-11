import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }
  
  const create = newObject => {
    return axios.post(baseUrl, newObject)
  }
  
  const deleteItem = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
  }

  const phoneServices = { getAll, create, deleteItem };

  export default phoneServices;