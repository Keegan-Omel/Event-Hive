import React from 'react';
import '../assets/css/EventCard.css';

function EventCard({ event }) {
  return (
    <div class='eventcard'>
        <h2>{event.title}</h2>
        <p>{event.description}</p> 
    
    </div>


  );
}



export default EventCard;
