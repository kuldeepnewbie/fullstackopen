/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import axios from "axios";
const Weather = (props) => {
    const [weather, setWeather] = useState({})
    console.log("hell")
    useEffect(() => {
        const fetchData = async () => {
            const api_key = process.env.REACT_APP_API_KEY
            try {
                console.log(props, "asdkuisk")
                const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${props.name}&aqi=no`);
                const weatherReport = {};
                weatherReport['temp_f'] = response.data.current.temp_f;
                weatherReport['icon'] = response.data.current.condition.icon;
                weatherReport['windSpeed'] = response.data.current.wind_mph;
                setWeather(weatherReport)
            } catch (error) {
                throw new Error(`Error Fetching data: ${error.message}`)
            }
        }
        fetchData();
    },[props.name])

    return (
        <div>
            <p>Tem{weather.temp_f}</p>
            <img src={weather.icon} />
            <p>{weather.windSpeed}</p>
        </div>
    )
}

export default Weather;