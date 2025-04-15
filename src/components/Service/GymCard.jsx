// src/components/GymCard.jsx
import React from 'react';

const GymCard = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Gym Access</h2>
        <img 
          src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
          alt="Hotel Gym" 
          style={{ width: '100%', borderRadius: '8px', margin: '1rem 0' }}
        />
        <h3>Facilities</h3>
        <ul>
          <li>24/7 Access</li>
          <li>Modern cardio equipment</li>
          <li>Free weights area</li>
          <li>Personal trainers available</li>
          <li>Towels and water provided</li>
        </ul>
        <h3>Rules</h3>
        <ul>
          <li>Proper athletic attire required</li>
          <li>Wipe down equipment after use</li>
          <li>No food allowed</li>
          <li>Guests under 16 must be accompanied by an adult</li>
        </ul>
      </div>
    </div>
  );
};

export default GymCard;