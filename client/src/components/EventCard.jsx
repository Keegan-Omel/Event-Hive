import React from 'react';
import '../assets/css/EventCard.css';

function EventCard({ event }) {
  return (
    <div className='eventcard'>
      <h2>{event.title}</h2>
      <p>{event.description}</p>
    </div>
  );
}

export default EventCard;

