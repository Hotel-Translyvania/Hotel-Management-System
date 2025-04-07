// src/components/PoolCard.jsx
import React from 'react';

const PoolCard = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Swimming Pool</h2>
        <img 
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
          alt="Hotel Pool" 
          style={{ width: '100%', borderRadius: '8px', margin: '1rem 0' }}
        />
        <h3>Facilities</h3>
        <ul>
          <li>Heated outdoor pool</li>
          <li>Open 7am - 10pm daily</li>
          <li>Poolside service available</li>
          <li>Jacuzzi area</li>
          <li>Towels provided</li>
        </ul>
        <h3>Rules</h3>
        <ul>
          <li>Shower before entering</li>
          <li>No diving</li>
          <li>Children must be supervised</li>
          <li>No glass containers</li>
          <li>Proper swimwear required</li>
        </ul>
      </div>
    </div>
  );
};

export default PoolCard;