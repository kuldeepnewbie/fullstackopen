/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Result from "./components/Result";
const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all'); // Update API endpoint
        setCountries(response.data);
        // Store data in sessionStorage
        sessionStorage.setItem('countriesData', JSON.stringify(response.data));
      } catch (error) {
        console.error('Error while fetching data:', error.message);
      }
    };

    // Check if data is already stored in sessionStorage
    const storedData = sessionStorage.getItem('countriesData');
    if (storedData) {
      setCountries(JSON.parse(storedData));
    } else {
      fetchData();
    }
  }, []);

  const onFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <Filter text={'Find Countries'} onInputChange={onFilterChange} />
      <Result country={countries} filter={filter} />
    </div>
  );
};
export default App;