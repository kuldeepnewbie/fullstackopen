/* eslint-disable react/prop-types */
import Weather from './Weather';
const View = (props) => {
    console.log(props,"sadjhjk")
    const languagesArray = Object.values(props.languages);
    const myStyle={
        display:"flex",
        flexDirection:"column"
    }
    return (
        <div style={myStyle}>
            <h3>{props.name}</h3>
            <p>Capital:{props.capital}</p>
            <p>Area:{props.area}</p>
            <p>Languages</p>
            <ul>
                {languagesArray.map(ele=><li key={ele}>{ele}</li>)}
            </ul>
            <img src={props.flags.png} alt='flag' height='200' width='250' />
            <Weather {...props} />
            <div><button onClick={props.clearData}>clear</button></div>
        </div>
    )
}
export default View