// src/components/ServiceHistory.jsx
import React from 'react';
import './ServiceHistory.css';
import Navbar from '@/components/Navbar/Navbar';
;

const ServiceHistory = ({ requests, onStatusUpdate }) => {
  return (
    <>
      <Navbar /> {/* Navbar at the top, outside the main content */}
      <div className="service-history">
        {(!requests || requests.length === 0) ? (
          <p className="no-requests">No service requests found.</p>
        ) : (
          <div className="requests-list">
            {requests.map(request => (
              <div key={request.id} className="request-card">
                <div className="request-details">
                  <h4>{request.serviceDescription}</h4>
                  <p><strong>Guest:</strong> {request.guestName} (Room {request.roomNumber})</p>
                  <p><strong>Date:</strong> {request.date}</p>
                  <p><strong>Preferred Time:</strong> {request.preferredTime || 'Not specified'}</p>
                </div>
                <div className="request-status">
                  <span className={`status-badge ${request.status === 'Completed' ? 'completed' : 'in-progress'}`}>
                    {request.status}
                  </span>
                  {request.status === 'In Progress' && (
                    <button 
                      onClick={() => onStatusUpdate(request.id, 'Completed')}
                      className="complete-button"
                    >
                      Mark Complete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ServiceHistory;
