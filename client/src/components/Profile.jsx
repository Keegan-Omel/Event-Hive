import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ONE_USER } from '../utils/queries.js'; 

function Profile() {
  // LATER ON THIS SHOULD BE TAKEN FROM THE LOGIN PAGE ONCE THAT IS Done
  const userId = 'USER_ID';

  // Use the GET_ONE_USER query with variables to fetch the user's data
  const { loading, error, data } = useQuery(GET_ONE_USER, {
    variables: { userId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const user = data.user;

  return (
    <div>
      <h1>User Profile</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <h2>Events:</h2>
      <ul>
        {user.events.map(event => (
          <li key={event._id}>
            <p>Title: {event.title}</p>
            <p>Description: {event.description}</p>

            {/* of course we're able to add more event details here as we see fit, whoever makes this one */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Profile;

