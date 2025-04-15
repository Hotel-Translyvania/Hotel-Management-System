// src/components/SpaCard.jsx
import React from 'react';

const SpaCard = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Spa & Wellness Center</h2>
        <img 
          src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
          alt="Hotel Spa" 
          style={{ width: '100%', borderRadius: '8px', margin: '1rem 0' }}
        />
        <h3>Services</h3>
        <ul>
          <li>Massage therapies</li>
          <li>Facials and skin treatments</li>
          <li>Sauna and steam room</li>
          <li>Manicure & Pedicure</li>
          <li>Private treatment rooms</li>
        </ul>
        <h3>Hours</h3>
        <p>Daily: 9:00 AM - 9:00 PM</p>
        <h3>Booking</h3>
        <p>Advance reservation recommended</p>
      </div>
    </div>
  );
};

export default SpaCard;