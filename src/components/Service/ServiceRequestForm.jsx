// src/components/ServiceRequestForm.jsx
import React, { useState } from 'react';
import './ServiceRequestForm.css';

const ServiceRequestForm = () => {
  const [formData, setFormData] = useState({
    guestName: '',
    roomNumber: '',
    serviceDescription: '',
    preferredTime: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="service-request-form">
      <h3>Special Service Request</h3>
      <form>
        <div className="form-group">
          <label htmlFor="guestName">Guest Name *</label>
          <input
            type="text"
            id="guestName"
            name="guestName"
            value={formData.guestName}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="roomNumber">Room Number *</label>
          <input
            type="text"
            id="roomNumber"
            name="roomNumber"
            value={formData.roomNumber}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="serviceDescription">Service Description *</label>
          <textarea
            id="serviceDescription"
            name="serviceDescription"
            value={formData.serviceDescription}
            onChange={handleChange}
            required
            rows="4"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="preferredTime">Preferred Time</label>
          <input
            type="time"
            id="preferredTime"
            name="preferredTime"
            value={formData.preferredTime}
            onChange={handleChange}
          />
        </div>
        
        <button type="submit" className="submit-button">Submit Request</button>
      </form>
    </div>
  );
};

export default ServiceRequestForm;