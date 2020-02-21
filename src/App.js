import React, { useState, useEffect } from 'react';
import { Route, BrowserRouter as Router, Link } from 'react-router-dom';
import StoreList from './storeList';
import fetchStores from './services/storeLocator';
import './App.css';

/**
 * Main App
 * Get all the countries on load
 *
 * @returns {*}
 * @constructor
 */
const App = () => {
  const [countries, setCountries] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [cities, setCities] = useState(null);

  // Async call to fetchStores service
  const getStores = async value => {
    let didCancel = false;

    const response = await fetchStores(value);
    if (!didCancel) {
      if (value === 'locations') setCountries(response);
      if (value.indexOf('locations/') !== -1) {
        setCities(response);
        setSelectedCountry(value.replace('locations/', ''));
      }
    }

    return () => { didCancel = true; };
  };

  // Handle dropdown change
  const handleDropdownChange = value => getStores(`locations/${value}`);

  // Run only once on app start
  useEffect(() => {
    getStores('locations');
  }, []);

  return (
    <div className="App">
      <select className="dropdown__countries" onChange={e => handleDropdownChange(e.target.value)}>
        {countries && countries.map(value => (
            <option key={value.slug} value={value.slug}>{value.country}</option>
        ))}
      </select>
      <select className="dropdown__cities" onChange={e => handleDropdownChange(e.target.value)} disabled={!cities}>
        {cities && cities.cities.map(value => (
          <option key={value.slug} value={value.slug}>{value.name}</option>
        ))}
      </select>
      <Router>
        <nav>
          <Link to="/">Home</Link>
          <br />
          {selectedCountry && (<Link to={`/store-list/${selectedCountry}`}>Go to {selectedCountry} store list</Link>)}
        </nav>
        <Route path="/store-list">
          <StoreList />
        </Route>
      </Router>
    </div>
  );
};

export default App;
