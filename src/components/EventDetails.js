import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const EventDetails = ({ ticketmasterEvents }) => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
    console.log(liked);
    
  };

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const ticketmasterUrl = `https://app.ticketmaster.com/discovery/v2/events/${eventId}.json`;
        const ticketmasterApiKey = 'mM5ozgGAP9WelfAi49gdlzxGHpPWBr92';
        const ticketmasterParams = {
          apikey: ticketmasterApiKey,
        };
        const ticketmasterResponse = await axios.get(ticketmasterUrl, { params: ticketmasterParams });
        const ticketmasterEvent = ticketmasterResponse.data;
        
        // will add rapid api else statemnt so it goes through ticketmaster first and then rapid api and then event not found
        if (ticketmasterEvent) {
          setEvent(ticketmasterEvent);
        } else {
          setError('Event not found');
        }
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId, ticketmasterEvents]);

  // rapid api call logic here when i buy more calls

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    if (error instanceof Error) {
      return <div>Error: {error.message}</div>;
    } else {
      return <div>Error: {error}</div>;
    }
  }

  if (!event) {
    return <div>No event found.</div>;
  }

  return (
    <div className="container mt-4">
      <h1>{event.name}</h1>
      <div className="row">
        <div className="col-md-6">
          <img src={event.images ? event.images[0].url : event.thumbnail} alt={event.name} className="img-fluid" style={{ maxHeight: '300px', objectFit: 'cover' }} />
        </div>
        <div className="col-md-6">
          <p><strong>Date:</strong> {event.dates ? new Date(event.dates.start.localDate).toLocaleDateString() : ''}</p>
          <p><strong>Location:</strong> {event._embedded ? `${event._embedded.venues[0].name}, ${event._embedded.venues[0].city.name}` : ''}</p>
          {event.description && <p><strong>Description:</strong> {event.description}</p>}
          <button onClick={toggleLike}>{liked ? '❤️' : '🤍'}</button>
          <p><strong>Price:</strong> {event.price}</p>
          <p><a href={event.url || ''} target="_blank" rel="noopener noreferrer">More Info</a></p>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
