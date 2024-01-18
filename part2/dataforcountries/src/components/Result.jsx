/* eslint-disable react/prop-types */
import View from "./View";

const Result = (props) => {
  let filteredArray = [];
  
  if (props.country) {
    filteredArray = props.country.filter(ele => ele?.name?.common.toLowerCase().includes(props.filter.toLowerCase()));
    console.log(filteredArray)
    if (filteredArray.length >= 10) {
      return <p>Too many matches, specify another filter</p>;
    } else if (filteredArray.length <= 10 && filteredArray.length > 1) {
      return (
        <>
          {filteredArray.map(ele => <h1 key={ele.ccn3}>{ele.name.common}</h1>)}
        </>
      );
    } else {
      return (
        <>
          {filteredArray.map(ele => (
            <View
              key={ele.ccn3}
              name={ele.name.common}
              flags={ele.flags}
              capital={ele.capital}
              area={ele.area} languages={ele.languages}
            />
          ))}
        </>
      );
    }
  }
};

export default Result;
