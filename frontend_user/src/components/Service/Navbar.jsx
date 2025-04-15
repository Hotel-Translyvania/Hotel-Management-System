// src/components/Navbar.jsx
import React from 'react';
import './Navbar.css';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-brand">Hotel Services</div>
      <div className="navbar-links">
        <Link
          to="/services"
          className={`nav-link ${location.pathname === '/services' ? 'active' : ''}`}
        >
          Services
        </Link>
        <Link
          to="/history"
          className={`nav-link ${location.pathname === '/history' ? 'active' : ''}`}
        >
          Booking History
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;