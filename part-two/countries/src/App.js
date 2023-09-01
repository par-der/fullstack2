import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchText(value);
  };

  return (
    <div>
      <Search searchText={searchText} handleSearchChange={handleSearchChange} />
      <Countries countries={countries} searchText={searchText} />
    </div>
  );
};

const Countries = ({ countries, searchText }) => {
  const [expandedCountry, setExpandedCountry] = useState(null);

  const filteredCountries = countries.filter(({ name: { common } }) =>
    common.toLowerCase().includes(searchText.toLowerCase())
  );

  if (!searchText) {
    return <div>Search for a country</div>;
  }

  if (filteredCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  return (
    <div>
      {filteredCountries.map((country) => (
        <div key={country.cca3}>
          <span>{country.name.common}</span>
          <button onClick={() => setExpandedCountry(country)}>
            {expandedCountry === country ? "Hide" : "Show"}
          </button>
          {expandedCountry === country && <Country country={country} />}
        </div>
      ))}
    </div>
  );
};

const Country = ({ country }) => {
  const { name, capital, area, languages, flags } = country;

  return (
    <div>
      <h2>{name.common}</h2>
      <div>Capital: {capital?.[0]}</div>
      <div>Area: {area} km²</div>
      <h3>Languages:</h3>
      <ul>
        {Object.entries(languages).map(([code, language]) => (
          <li key={code}>{language}</li>
        ))}
      </ul>
      <img src={flags.svg} alt={`${name.common} flag`} height="100px" width="100px" />
    </div>
  );
};

const Search = ({ searchText, handleSearchChange }) => {
  return (
    <div>
      find countries
      <input type="text" value={searchText} onChange={handleSearchChange} />
    </div>
  );
};

export default App;
