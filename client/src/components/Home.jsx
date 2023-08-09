import React from 'react';
import EventList from './EventList';

// fix this later
import SearchResultContainer from './SearchBar'

function Home() {
  return (
    <div>
      <h1>Find Events</h1>

      {/* SEARCH BAR COMPONENT: FIX */}
      {/* <SearchResultContainer /> */}


      <EventList />
    </div>
  );
}

export default Home;

