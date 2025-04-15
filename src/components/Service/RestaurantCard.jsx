// src/components/RestaurantCard.jsx
import React from 'react';

const RestaurantCard = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Restaurant & Bar</h2>
        <img 
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
          alt="Hotel Restaurant" 
          style={{ width: '100%', borderRadius: '8px', margin: '1rem 0' }}
        />
        <h3>Dining Options</h3>
        <ul>
          <li>Breakfast buffet: 7:00 AM - 11:00 AM</li>
          <li>Lunch: 12:00 PM - 3:00 PM</li>
          <li>Dinner: 6:00 PM - 10:00 PM</li>
          <li>24-hour room service</li>
        </ul>
        <h3>Cuisine</h3>
        <p>International with local specialties</p>
      </div>
    </div>
  );
};

export default RestaurantCard;