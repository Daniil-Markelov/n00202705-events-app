import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../Home.css';

const Home = () => {
  const [userPreferences, setUserPreferences] = useState(null);
  const [ticketmasterEvents, setTicketmasterEvents] = useState([]);
  const [location, setLocation] = useState('IE');

  useEffect(() => {
    const fetchUserPreferences = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/api/user/preferences', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserPreferences(response.data.preferences);
        console.log(response.data.preferences);
      } catch (error) {
        console.error('Error fetching user preferences:', error);
      }
    };

    fetchUserPreferences();
  }, []);

  useEffect(() => {
    const handleSearch = async () => {
      const ticketmasterLocation = userPreferences?.location || location;

      // Ticketmaster
      const ticketmasterApiKey = 'mM5ozgGAP9WelfAi49gdlzxGHpPWBr92';
      const ticketmasterUrl = 'https://app.ticketmaster.com/discovery/v2/events.json';
      const ticketmasterParams = {
        countryCode: ticketmasterLocation,
        apikey: ticketmasterApiKey,
      };

      try {
        const response = await axios.get(ticketmasterUrl, { params: ticketmasterParams });
        const eventsData = response.data._embedded ? response.data._embedded.events : [];
        const uniqueEvents = Array.from(new Set(eventsData.map(event => event.name)))
          .map(eventName => eventsData.find(event => event.name === eventName));

        setTicketmasterEvents(uniqueEvents);
      } catch (error) {
        console.error('Error fetching Ticketmaster events:', error);
      }
    };

    handleSearch();
  }, [location, userPreferences]);

  return (
    <div className="container">
      <h1 className="mt-4 mb-4">Upcoming Events</h1>

      {!userPreferences && (
        <div className="mb-4">
          <label htmlFor="location" className="form-label">Select Location:</label>
          <select id="location" value={location} onChange={(e) => setLocation(e.target.value)} className="form-select">
            <option value="IE">Ireland</option>
            <option value="US">United States</option>
            <option value="ES">Spain</option>
            {/* add more options as needed */}
          </select>
        </div>
      )}

      <div className="event-grid">
        {ticketmasterEvents.map(event => (
          <div key={event.id} className="event-card">
            <img src={event.images[0].url} alt={event.name} className="event-image" />
            <div className="event-details">
              <h3 className="event-name">{event.name}</h3>
              <p>Location: {event._embedded.venues[0].name}, {event._embedded.venues[0].city.name}</p>
              <p className="event-date">{new Date(event.dates.start.localDate).toLocaleDateString()}</p>
              <Link to={`/events/${event.id}`} className="event-link">More Info</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;


