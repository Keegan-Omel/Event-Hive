import React from 'react';
import EventList from '../components/EventList';
import '../assets/css/Home.css'

// fix this later
import SearchResultContainer from './SearchBar'

function Home() {
  return (
    <div>
      <div class="home-container">
        {/* Your home-container content */}
      </div>
      
      <section>
        <h1>FIND EVENTS</h1>
        {/* SEARCH BAR COMPONENT: FIX */}
        {/* <SearchResultContainer /> */}
        <EventList />
      </section>
    </div>
  );
}

export default Home;
