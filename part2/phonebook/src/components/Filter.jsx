/* eslint-disable react/prop-types */
const Filter = ({text, value, handleNewChange}) => {
    return(
    <div>
      {text} <input value={value} onChange={handleNewChange}/>
    </div>
    )
  }

  export default Filter;