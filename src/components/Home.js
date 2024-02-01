import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [location, setLocation] = useState('Ireland');
  const [ticketmasterEvents, setTicketmasterEvents] = useState([]);
  const [rapidAPIEvents, setRapidAPIEvents] = useState([]);

  const handleSearch = () => {
    const ticketmasterLocation = mapLocationToTicketmaster(location);

    // Ticketmaster
    const ticketmasterApiKey = 'mM5ozgGAP9WelfAi49gdlzxGHpPWBr92';
    const ticketmasterUrl = 'https://app.ticketmaster.com/discovery/v2/events.json';
    const ticketmasterParams = {
      countryCode: ticketmasterLocation,
      apikey: ticketmasterApiKey,
    };

    axios.get(ticketmasterUrl, { params: ticketmasterParams })
      .then(response => {
        const eventsData = response.data._embedded ? response.data._embedded.events : [];

        // Removes Dupes
        const uniqueEvents = Array.from(new Set(eventsData.map(event => event.name)))
          .map(eventName => eventsData.find(event => event.name === eventName));

        setTicketmasterEvents(uniqueEvents);
      })
      .catch(error => {
        console.error(error);
      });

    // Rapid Api
    const rapidApiKey = '7561ab95a8msh2bf2de2b0234f7bp1de190jsnf25f8f1f8a96';
    const rapidApiUrl = 'https://real-time-events-search.p.rapidapi.com/search-events';
    const rapidApiParams = {
      query: location,
      start: '0',
    };
    const rapidApiHeaders = {
      'X-RapidAPI-Key': rapidApiKey,
      'X-RapidAPI-Host': 'real-time-events-search.p.rapidapi.com',
    };

    axios.get(rapidApiUrl, { params: rapidApiParams, headers: rapidApiHeaders })
      .then(response => {
        const eventsData = response.data.data || [];

        const uniqueEvents = Array.from(new Set(eventsData.map(event => event.name)))
          .map(eventName => eventsData.find(event => event.name === eventName));

        setRapidAPIEvents(uniqueEvents);
      })
      .catch(error => {
        console.error(error);
      });
  };

  // changes country to country code because that's how ticketmaster works
  const mapLocationToTicketmaster = (userLocation) => {
    // add more mapping later
    const mappings = {
      'Ireland': 'IE',
      'United States': 'US',
    };

    return mappings[userLocation] || '';
  };

  return (
    <div>
      <h1>Upcoming Events</h1>

      <div>
        <label htmlFor="location">Select Location:</label>
        <select id="location" value={location} onChange={(e) => setLocation(e.target.value)}>
          <option value="Ireland">Ireland</option>
          <option value="United States">United States</option>
          {/* add later more or change to search query probs */}
        </select>
        <button onClick={handleSearch}>Search</button>
      </div>

      <h2>Ticketmaster Events</h2>
      <ul>
        {ticketmasterEvents.map(event => (
          <li key={event.id}>{event.name}</li>
        ))}
      </ul>

      <h2>RapidAPI Events</h2>
      <ul>
        {rapidAPIEvents.map(event => (
          <li key={event.event_id}>
            <h3>{event.name}</h3>
            <p>{event.description}</p>
            <p>Start Time: {event.start_time}</p>
            <p>End Time: {event.end_time}</p>
            <img src={event.thumbnail} alt='' />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;





