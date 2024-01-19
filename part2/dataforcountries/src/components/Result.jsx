/* eslint-disable react/prop-types */
import View from "./View";
import { useState } from "react";

const Result = (props) => {
  let filteredArray = [];
  const [showData, setShowData] = useState(false);
  const [finalData, setFinalData] = useState([]);
  const mystyle = {
    'display': "flex",
    'align-items': "center"
  };
  const handleButtonClick = (ele) => {
    const index = filteredArray.findIndex(eles => eles.fifa == ele.fifa);
    setFinalData([filteredArray[index]]);
    setShowData(true)
  }
  const clearData = ()=>{
    console.log("hekk")
    setShowData(false)
  }
  if (props.country) {
    filteredArray = props.country.filter(ele => ele?.name?.common.toLowerCase().includes(props.filter.toLowerCase()));
  }
  if (showData) {
    return (
      <View
        key={finalData[0].ccn3}
        name={finalData[0].name.common}
        flags={finalData[0].flags}
        capital={finalData[0].capital}
        area={finalData[0].area}
        languages={finalData[0].languages}
        clearData = {clearData}
      />
    );
  }
  if (filteredArray.length == 1) {
    return (
      <View
        key={filteredArray[0].ccn3}
        name={filteredArray[0].name.common}
        flags={filteredArray[0].flags}
        capital={filteredArray[0].capital}
        area={filteredArray[0].area}
        languages={filteredArray[0].languages}
        clearData = {()=>clearData}
      />
    );
  }
  if (filteredArray.length >= 10) {
    return <p>Too many matches, specify another filter</p>;
  }
  if ((filteredArray.length <= 10 && filteredArray.length > 1) && !showData) {
    return (
      <>
        {filteredArray.map(ele => (
          <div style={mystyle} key={ele.ccn3}>
            <h1>{ele.name.common}</h1>
            <button onClick={() => handleButtonClick(ele)}>show</button>
          </div>
        ))}
      </>
    )
  }
};

export default Result;
