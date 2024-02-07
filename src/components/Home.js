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
      'United Kingdom': 'UK',
      'Spain': 'ES'
    };

    return mappings[userLocation] || '';
  };

  return (
    <div className="container">
      <h1 className="mt-4 mb-4">Upcoming Events</h1>
  
      <div className="mb-4">
        <label htmlFor="location" className="form-label">Select Location:</label>
        <select id="location" value={location} onChange={(e) => setLocation(e.target.value)} className="form-select">
          <option value="Ireland">Ireland</option>
          <option value="United States">United States</option>
          <option value="United Kingdom">United Kingdom</option>
          <option value="Spain">Spain</option>
          {/* Add more options as needed */}
        </select>
        <button onClick={handleSearch} className="btn btn-primary ms-3">Search</button>
      </div>
  
      <div className="row">
        <div className="col-md-6">
          <h2 className="mb-3">Ticketmaster Events</h2>
          <ul className="list-group">
            {ticketmasterEvents.map(event => (
              <li key={event.id} className="list-group-item">
                <div className="row">
                  <div className="col-md-4">
                    <img src={event.images[0].url} alt={event.name} className="img-fluid" style={{ height: '150px', objectFit: 'cover' }} />
                  </div>
                  <div className="col-md-8">
                    <h3>{event.name}</h3>
                    <p>{new Date(event.dates.start.localDate).toLocaleDateString()}</p>{/*Changes the date + time into just a date  */}
                    <p>Location: {event._embedded.venues[0].name}, {event._embedded.venues[0].city.name}</p>
                    <p><a href={event.url} target="_blank" rel="noopener noreferrer">More Info</a></p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-6">
  <h2 className="mb-3">RapidAPI Events</h2>
  <ul className="list-group">
    {rapidAPIEvents.map(event => (
      <li key={event.event_id} className="list-group-item">
        <div className="row">
          <div className="col-md-4">
            <img src={event.thumbnail} alt="" className="img-fluid" style={{ height: '150px', objectFit: 'cover' }} />
          </div>
          <div className="col-md-8">
            <h3>{event.name}</h3>
            <p>{new Date(event.start_time).toLocaleDateString()}</p>
            <p>Location: {event.venue.name}</p>
            <p><a href={event.info_links[0].link} target="_blank" rel="noopener noreferrer">More Info</a></p>
          </div>
        </div>
      </li>
    ))}
  </ul>
</div>

      </div>
    </div>
  );
  

  
};

export default Home;





