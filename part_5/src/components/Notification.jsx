/* eslint-disable linebreak-style */
const Notification = ({ message }) => {
  if(!message){
    return null
  }

  return(<h1 className="error">
    {message}
  </h1>)
}

export default Notification