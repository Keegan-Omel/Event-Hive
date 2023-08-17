import React from 'react';
import '../assets/css/EventCard.css';

function EventCard({ event }) {
  const attendees = event.attendees || []; // Initialize attendees array if undefined

  return (
    <div>
      <h2>Title: {event.title}</h2>
      <p>Description: {event.description}</p>
      <p>Date: {event.date}</p>
      <p>Cost: {event.cost}</p>
      <p>Location: {event.location}</p>
      <p>Creator/Host: {event.user.username}</p>


      <p>Creator/Host: {event.user.email}</p>
      <p>Creator/Host: {event.user._id}</p>


      {attendees.length > 0 ? (
        <div>
          <p>Attendees:</p>
          <ul>
            {attendees.map((attendee) => (
              <li key={attendee._id}>{attendee.username}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No one is attending so far.</p>
      )}
      <p>Number of Seats available: {event.seating}</p>
    </div>
  );
}

export default EventCard;

