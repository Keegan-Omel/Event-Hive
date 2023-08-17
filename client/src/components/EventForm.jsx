import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_EVENT } from '../utils/mutations.js';
import { GET_ONE_USER } from '../utils/queries.js';
import Auth from '../utils/auth';



const EventForm = ({showForm, setShowForm}) => {
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [cost, setCost] = useState('');
  const [seating, setSeating] = useState('');

  const [createEvent] = useMutation(CREATE_EVENT);

  const _id = Auth.getProfile().data._id;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createEvent({
        variables: {
          title,
          description,
          date,
          location,
          cost: parseInt(cost),
          seating: parseInt(seating),
        },
        refetchQueries: [{ query: GET_ONE_USER, variables: { _id } }],
      });

      // Clear form fields and hide the form
      setTitle('');
      setDescription('');
      setDate('');
      setLocation('');
      setCost('');
      setSeating('');
      setShowForm(false);
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <div>
      <button onClick={() => setShowForm(true)}>Add Event</button>
      {showForm && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            type="date"
            placeholder="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Cost ($)"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            min={1}
          />
          <input
            type="number"
            placeholder="Number of Seats"
            value={seating}
            onChange={(e) => setSeating(e.target.value)}
            min={1}
          />
          <button type="submit">Create Event</button>
        </form>
      )}
    </div>
  );
};

export default EventForm;
