import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import ServiceRequestForm from './components/ServiceRequestForm';
import ServiceHistory from './components/ServiceHistory';
import GymCard from './components/GymCard';
import PoolCard from './components/PoolCard';
import SpaCard from './components/SpaCard';
import RestaurantCard from './components/RestaurantCard'; // Fixed typo in import (was 'PestaurantCard')
import BusinessCenterCard from './components/BusinessCenterCard';

function App() {
  const [activeTab, setActiveTab] = useState('services');
  const [serviceRequests, setServiceRequests] = useState([]);
  const [showGymCard, setShowGymCard] = useState(false);
  const [showPoolCard, setShowPoolCard] = useState(false);
  const [showSpaCard, setShowSpaCard] = useState(false);
  const [showRestaurantCard, setShowRestaurantCard] = useState(false);
  const [showBusinessCenterCard, setShowBusinessCenterCard] = useState(false);

  const handleServiceSubmit = (newRequest) => {
    setServiceRequests([...serviceRequests, { 
      ...newRequest, 
      id: Date.now(), 
      status: 'In Progress',
      date: new Date().toLocaleDateString()
    }]);
  };

  const updateServiceStatus = (id, status) => {
    setServiceRequests(serviceRequests.map(request => 
      request.id === id ? { ...request, status } : request
    ));
  };

  return (
    <div className="app">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="main-content">
        {activeTab === 'services' && (
          <div className="services-section">
            <h2>Hotel Services</h2>
            <div className="service-cards">
              <div className="service-card" onClick={() => setShowGymCard(true)}>
                <h3>Gym Access</h3>
                <p>24/7 Fitness Center</p>
              </div>
              <div className="service-card" onClick={() => setShowPoolCard(true)}>
                <h3>Swimming Pool</h3>
                <p>Heated Outdoor Pool</p>
              </div>
              <div className="service-card" onClick={() => setShowSpaCard(true)}>
                <h3>Spa & Wellness</h3>
                <p>Relaxation treatments</p>
              </div>
              <div className="service-card" onClick={() => setShowRestaurantCard(true)}>
                <h3>Restaurant</h3>
                <p>Fine dining experience</p>
              </div>
              <div className="service-card" onClick={() => setShowBusinessCenterCard(true)}>
                <h3>Business Center</h3>
                <p>Work facilities</p>
              </div>
            </div>
            
            <ServiceRequestForm onSubmit={handleServiceSubmit} />
          </div>
        )}
        
        {activeTab === 'history' && (
          <ServiceHistory 
            requests={serviceRequests} 
            onStatusUpdate={updateServiceStatus} 
          />
        )}
      </div>

      {showGymCard && <GymCard onClose={() => setShowGymCard(false)} />}
      {showPoolCard && <PoolCard onClose={() => setShowPoolCard(false)} />}
      {showSpaCard && <SpaCard onClose={() => setShowSpaCard(false)} />}
      {showRestaurantCard && <RestaurantCard onClose={() => setShowRestaurantCard(false)} />}
      {showBusinessCenterCard && <BusinessCenterCard onClose={() => setShowBusinessCenterCard(false)} />}
    </div>
  );
}

export default App;
