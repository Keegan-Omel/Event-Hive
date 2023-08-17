import React from 'react';
import '../assets/css/EventCard.css';

function EventCard({ event }) {
  const attendees = event.attendees || []; // Initialize attendees array if undefined

  return (
    <div class="eventcard">
      <h2>{event.title}</h2>
      <p> {event.description}</p>
      <p>Date: {new Date(parseInt(event.date)).toLocaleDateString()}</p>
      <p>Cost: ${event.cost} </p>
      <p>Location: {event.location}</p>
      <p>Creator/Host: {event.user.username}</p>


      <p>Creator/Host: {event.user.email}</p>

      {/* not needed */}
      {/* <p>Creator/Host: {event.user._id}</p> */}


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

      {/* Not functional for now: FOR the future */}
      {/* <p>Number of Seats available: {event.seating}</p> */}



    </div>
  );
}

export default EventCard;

