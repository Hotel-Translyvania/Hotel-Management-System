// src/components/BusinessCenterCard.jsx
import React from 'react';

const BusinessCenterCard = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Business Center</h2>
        <img 
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
          alt="Business Center" 
          style={{ width: '100%', borderRadius: '8px', margin: '1rem 0' }}
        />
        <h3>Facilities</h3>
        <ul>
          <li>Workstations with computers</li>
          <li>Printing, scanning, and copying</li>
          <li>High-speed internet</li>
          <li>Meeting rooms (reservation required)</li>
          <li>Secretarial services</li>
        </ul>
        <h3>Hours</h3>
        <p>24/7 access with room key</p>
      </div>
    </div>
  );
};

export default BusinessCenterCard;