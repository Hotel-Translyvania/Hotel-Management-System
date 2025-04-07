// src/pages/ServicesPage.jsx
import React, { useState } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import ServiceRequestForm from '../components/Service/ServiceRequestForm';
import GymCard from '../components/Service/GymCard';
import PoolCard from '../components/Service/PoolCard';
import SpaCard from '../components/Service/SpaCard';
import RestaurantCard from '../components/Service/RestaurantCard';
import BusinessCenterCard from '../components/Service/BusinessCenterCard';
import './ServicesPage.css';

const ServicesPage = () => {
  const [serviceRequests, setServiceRequests] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  const handleServiceSubmit = (newRequest) => {
    setServiceRequests([...serviceRequests, {
      ...newRequest,
      id: Date.now(),
      status: 'In Progress',
      date: new Date().toLocaleDateString(),
    }]);
  };

  const updateServiceStatus = (id, status) => {
    setServiceRequests(
      serviceRequests.map((request) =>
        request.id === id ? { ...request, status } : request
      )
    );
  };

  const renderServiceCard = () => {
    switch (selectedService) {
      case 'gym': return <GymCard onClose={() => setSelectedService(null)} />;
      case 'pool': return <PoolCard onClose={() => setSelectedService(null)} />;
      case 'spa': return <SpaCard onClose={() => setSelectedService(null)} />;
      case 'restaurant': return <RestaurantCard onClose={() => setSelectedService(null)} />;
      case 'business': return <BusinessCenterCard onClose={() => setSelectedService(null)} />;
      default: return null;
    }
  };

  return (
    <div className="services-section">
      <Navbar />
      <div className="service-cards">
        <div className="service-card" onClick={() => setSelectedService('gym')}>
          <h3>Gym Access</h3>
          <p>24/7 Fitness Center</p>
        </div>
        <div className="service-card" onClick={() => setSelectedService('pool')}>
          <h3>Swimming Pool</h3>
          <p>Heated Outdoor Pool</p>
        </div>
        <div className="service-card" onClick={() => setSelectedService('spa')}>
          <h3>Spa & Wellness</h3>
          <p>Relaxation treatments</p>
        </div>
        <div className="service-card" onClick={() => setSelectedService('restaurant')}>
          <h3>Restaurant</h3>
          <p>Fine dining experience</p>
        </div>
        <div className="service-card" onClick={() => setSelectedService('business')}>
          <h3>Business Center</h3>
          <p>Work facilities</p>
        </div>
      </div>
      
      <ServiceRequestForm onSubmit={handleServiceSubmit} />
      {renderServiceCard()}
    </div>
  );
};

export default ServicesPage;
