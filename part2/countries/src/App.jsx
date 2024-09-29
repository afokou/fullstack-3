import axios from 'axios'
import { useState } from 'react';
import Country from './Country';

const Search = ({ countries }) => {
  const [showCountry, setShowCountry] = useState(null);

  if (showCountry) {
    return <Country country={showCountry} />
  }

  return <>
      { countries.length > 10
      ? <p>Too many matches, specify another filter</p>
      : countries.length > 1
        ? countries.map((country) => <div key={country.name.common}>{country.name.common} <input type="button" value="show" onClick={() => {
            setShowCountry(country)
          }} /></div>)
        : countries.length === 1
          ? <Country country={countries[0]} />
          : <p>No matches, specify another filter</p>
      }
  </>
}

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
