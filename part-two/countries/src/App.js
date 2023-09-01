import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [countries, setCountries] = useState([]);

  const handleSearch = () => {
    axios.get(`https://restcountries.com/v3.1/name/${searchQuery}`)
      .then(response => {
        const foundCountries = response.data;
        setCountries(foundCountries);
      })
      .catch(error => {
        console.error('Error fetching countries by search', error);
      });
  };

  useEffect(() => {
    if (searchQuery.trim() !== '') {
      handleSearch();
    } else {
      setCountries([]);
    }
  }, [searchQuery]);

  return (
    <div>
      <h1>Country Information App</h1>
      <input
        type="text"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        placeholder="Search for a country"
      />
      <button onClick={handleSearch}>Search</button>
      
      <div>
        {countries.length === 1 && (
          <CountryInfo country={countries[0]} />
        )}
        {countries.length > 1 && countries.length <= 10 && (
          <CountryList countries={countries} />
        )}
        {countries.length > 10 && (
          <p>Too many matches, please specify your query.</p>
        )}
      </div>
    </div>
  );
};

const CountryList = ({ countries }) => {
  return (
    <ul>
      {countries.map((country, index) => (
        <li key={index}>{country.name.common}</li>
      ))}
    </ul>
  );
};

const CountryInfo = ({ country }) => {
  const { name, capital, area, languages } = country[0];

  return (
    <div>
      <h2>{name.common}</h2>
      <p>Capital: {capital?.[0] || 'N/A'}</p>
      <p>Area: {area?.toLocaleString()} km²</p>
      <p>Languages: {Object.values(languages).join(', ')}</p>
    </div>
  );
};

export default App;
