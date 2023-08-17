import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';
import '../assets/css/NavBar.css';

function NavBar() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const handleLogout = () => {
    Auth.logout();
    navigate('/');
  };
  // Check if the user is authenticated (you can replace this with your actual authentication logic)
  const isAuthenticated = Auth.loggedIn();
  return (
    <nav className="navbar">
      {/* Add the search bar */}
  <input
    type="text"
    placeholder="Search Events..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
      <Link to="/">Home</Link>
      <Link to="/profile">Profile</Link>
      
      <div className="dropdown">
        <button className="dropdown-button" onClick={() => setShowDropdown(!showDropdown)}>
          {isAuthenticated ? 'Sign Out' : 'Sign Up / Log-In'}
        </button>
        {showDropdown && (
          <div className="dropdown-content">
            {!isAuthenticated && (
              <>
                <div>
                  <Link to="/signup">Sign Up</Link>
                </div>
                <div>
                  <Link to="/login">Log-In</Link>
                </div>
              </>
            )}
            {isAuthenticated && (
              <button className="signout-button" onClick={handleLogout}>Sign Out</button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
export default NavBar;