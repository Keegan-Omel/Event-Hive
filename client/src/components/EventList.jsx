import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_EVENTS } from '../utils/queries.js'; 

import EventCard from './EventCard';

function EventList() {
  const { loading, error, data } = useQuery(GET_ALL_EVENTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const events = data.events;

  // comment out the console.log(data) line once you know the query is working
  // console.log(data);

  return (
    <div>
      {events.map(event => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
}

export default EventList;

