import React, {useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_EVENTS } from '../utils/queries.js'; 
import EventCard from '../components/EventCard.jsx';
import '../assets/css/EventList.css'; // Import CSS for grid layout

function EventList() {

  const { loading, error, data, refetch } = useQuery(GET_ALL_EVENTS);
  
  useEffect(() => {
    refetch(); // Refetch events whenever the component mounts
  }, [refetch]);
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const events = data.events;

  return (
    <div className="event-list-grid">
      {events.map(event => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
}

export default EventList;
