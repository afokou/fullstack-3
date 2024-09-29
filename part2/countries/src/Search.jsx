import { useEffect, useState } from 'react';
import Country from './Country.jsx';

const Search = ({ countries }) => {
  const [showCountry, setShowCountry] = useState(null);

  useEffect(() => {
    setShowCountry(null);
  }, [countries]);

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

export default Search;
