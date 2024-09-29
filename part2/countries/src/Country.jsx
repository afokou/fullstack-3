import axios from 'axios'
import { useEffect, useState } from 'react';

const Weather = ({ weather }) => {
  const [icon, setIcon] = useState(null)

  useEffect(() => {
    const iconUrl = `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`
    setIcon(iconUrl)
  }, [weather.weather]);

  return (
    <div>
      <h2>Weather in {weather.name}</h2>
      <p><b>temperature:</b> {weather.main.temp} Celsius</p>
      <img src={icon} alt="weather icon" />
      <p><b>wind:</b> {weather.wind.speed} m/s</p>
    </div>
  )
}

const Country = ({ country }) => {
  const api_key = import.meta.env.VITE_OPENWEATHERMAP_API_KEY
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${api_key}`)
      .then(response => {
        setWeather(response.data)
      })
  }, [api_key, country.capital]);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital[0]}</p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      <ul>
        {Object.values(country.languages).map((language, i) => <li key={i}>{language}</li>)}
      </ul>
      <img src={country.flags.png} alt="flag" width="100" />
      {weather && <Weather weather={weather} />}
    </div>
  )
}

export default Country
