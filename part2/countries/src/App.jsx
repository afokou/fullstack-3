import axios from 'axios'
import { useState } from 'react';
import Search from './Search.jsx';

const App = () => {
  const [searching, setSearching] = useState(false)
  const [countries, setCountries] = useState([])

  const onSearch = (event) => {
    event.preventDefault();
    const country = event.target.country.value;
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      // .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`) // TODO
      .then(response => {
        const filteredCountries = response.data.filter((c) => {
            return c.name.common.toLowerCase().includes(country.toLowerCase()) || c.name.official.toLowerCase().includes(country.toLowerCase());
        });
        setCountries(filteredCountries)
        setSearching(true)
      })
  }

  return (
    <div>
      <form onSubmit={onSearch}>
        <label htmlFor="country">find countries</label>
        <input id="country" type="text" name="country" />
        <input type="submit" value="search" />
      </form>
      {searching && <Search countries={countries} />}
    </div>
  )
}

export default App
