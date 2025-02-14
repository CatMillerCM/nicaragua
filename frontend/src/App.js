import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL = 'http://localhost:8080';

function App() {
  const [parties, setParties] = useState([]);
  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState('');
  const [day, setDay] = useState('');

  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'fluctuating'];

  useEffect(() => {
    fetch(`${API_URL}/parties`)
      .then(res => res.json())
      .then(data => setParties(data))
      .catch(err => console.error('Error fetching parties:', err));

    fetch(`${API_URL}/locations`)
      .then(res => res.json())
      .then(data => setLocations(data))
      .catch(err => console.error('Error fetching locations:', err));
  }, []);

  const searchParties = () => {
    let query = `${API_URL}/parties`;
    const params = [];
  
    if (location) params.push(`location=${location}`);
    if (day) params.push(`day=${day}`);
  
    if (params.length > 0) {
      query += `?${params.join('&')}`;
    }

    fetch(query)
      .then(res => res.json())
      .then(data => setParties(data))
      .catch(err => console.error('Error fetching data:', err));
  };

  const clearFilters = () => {
    setLocation('');
    setDay('');

    fetch(`${API_URL}/parties`)
    .then(res => res.json())
    .then(data => setParties(data))
    .catch(err => console.error('Error fetching data:', err));
  };

  return (
    <div className="main">
      <div>
        <h1 className="title">RavePI</h1>
        <p className="intro">Explore Nicaragua's Best Backpacker Parties</p>
      </div>
      <div className="selectors">
        <select className="locationSelect" value={location} onChange={(e) => setLocation(e.target.value)}>
          <option value="">Filter by location</option>
          {locations.map((loc, index) => (
            <option key={index} value={loc}>{loc}</option>
          ))}
        </select>
        <select className="daySelect" value={day} onChange={(e) => setDay(e.target.value)}>
          <option value="">Filter by day</option>
          {daysOfWeek.map((day, index) => (
            <option key={index} value={day.toLowerCase()}>{day}</option>
          ))}
        </select>
        <div className="buttons">
          <button className="searchButton" onClick={searchParties} disabled={Boolean(!location && !day)}>Search</button>
          <button className="clearButton" onClick={clearFilters} disabled={Boolean(!location && !day)}>Clear</button>
        </div>
      </div>
      <div className="partiesContainer">
        {parties.length > 0 ? (
          parties.map((party) => (
            <div key={party.name} className="partyContainer">
              <div>
                <p className="partyName">{party.name}</p>
                <p className="partyLocationDay">{party.location} ~ {party.day}</p>
              </div>
              <div className="partyImage">
                <img src={party.image} alt={`Promotional post for ${party.name}`}></img>
              </div>
              <div>
                <p>Instagram:</p>
                <a className="partyInstagram" href={`https://www.instagram.com/${party.instagram}`} target="_blank">@{party.instagram}</a>
              </div>
            </div>
          ))
        ) : (
          <p>No parties found.</p>
        )}
      </div>
    </div>
  );
}

export default App;