import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Logout from "./components/Logout";
import Auth from './utils/auth';
import "./App.css";

function App() {
  return (
    <div className="APP">
      <Router>
        <NavBar />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/profile"
              element={Auth.loggedIn() ? <Profile /> : <Login />}
            />

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </main>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
