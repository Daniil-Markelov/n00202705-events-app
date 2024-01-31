import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const apiKey = 'mM5ozgGAP9WelfAi49gdlzxGHpPWBr92';

    const url = 'https://app.ticketmaster.com/discovery/v2/events.json';
    const params = {
      countryCode: 'IE',
      apikey: apiKey,
    };

    axios.get(url, { params })
      .then(response => {
        const eventsData = response.data._embedded ? response.data._embedded.events : [];

        // Removes Dupes(took an hour to figure this out)
        const uniqueEvents = Array.from(new Set(eventsData.map(event => event.name)))
          .map(eventName => eventsData.find(event => event.name === eventName));

        setEvents(uniqueEvents);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>Upcoming Events</h1>
      <ul>
        {events.map(event => (
          <li key={event.id}>{event.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;

