import React from 'react';
import './ServiceHistory.css';

const ServiceHistory = ({ requests, onStatusUpdate }) => {
  if (requests.length === 0) {
    return (
      <div className="service-history">
        <h3>Service Booking History</h3>
        <p className="no-requests">No service requests found.</p>
      </div>
    );
  }

  return (
    <div className="service-history">
      <h3>Service Booking History</h3>
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
    </div>
  );
};

export default ServiceHistory;