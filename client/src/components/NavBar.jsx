import { Link } from 'react-router-dom';
import React, { Component } from 'react';
//added above line maybe replace line 1
import { useQuery } from '@apollo/client';
import { QUERY_MATCHUPS } from '../utils/queries';
import { Component } from 'react';

// const NavBar = () => {

  //JAVASCRPIT CODE: USESTATE/ USEEFFECT/ CONST/ PROPS
function NavBar (props) {
 return (
    <header id="home">
    <h1 className="responsive-headline">EventHive</h1>
      <nav id="nav-wrap">
        <a className="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
        <a className="mobile-btn" href="#home" title="Hide navigation">Hide navigation</a>
        <ul id="nav" className="nav">
          <li className="current"><a className="smoothscroll" href="#home">Home</a></li>
          <li><a className="smoothscroll" href="#about">My Events</a></li>
          <li><a className="smoothscroll" href="#resume">Events</a></li>
          <li><a className="smoothscroll" href="#portfolio">Login/Signup</a></li>
          <li><a className="smoothscroll" href="#contact">Contact</a></li>
        </ul>
      </nav>
      <div className="row banner">
        <div className="banner-text">
      
        </div>
      </div>
      <p className="scrolldown">
        <a className="smoothscroll" href="#about"><i className="icon-down-circle"></i></a>
      </p>
    </header>
  );
}
export default NavBar;
