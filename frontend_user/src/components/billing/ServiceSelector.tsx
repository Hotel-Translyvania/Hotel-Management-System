
import { useState } from 'react';
import { ServiceType, updateServiceDetails } from '../data/mockData';
import { Bed, Utensils, Sparkles, CalendarDays, Package } from 'lucide-react';

interface ServiceSelectorProps {
  currentType: ServiceType;
  onServiceChange: (type: ServiceType) => void;
}

const ServiceSelector = ({ currentType, onServiceChange }: ServiceSelectorProps) => {
  const serviceTypes: { type: ServiceType; label: string; icon: JSX.Element }[] = [
    { type: 'room', label: 'Room Stay', icon: <Bed className="w-5 h-5" /> },
    { type: 'restaurant', label: 'Restaurant', icon: <Utensils className="w-5 h-5" /> },
    { type: 'spa', label: 'Spa & Wellness', icon: <Sparkles className="w-5 h-5" /> },
    { type: 'event', label: 'Events', icon: <CalendarDays className="w-5 h-5" /> },
    { type: 'other', label: 'Other Services', icon: <Package className="w-5 h-5" /> },
  ];

  return (
    <div className="section-card">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Service Type</h2>
      
      <div className="flex flex-wrap gap-3">
        {serviceTypes.map((service) => (
          <button 
            key={service.type}
            onClick={() => onServiceChange(service.type)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
              currentType === service.type
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300 hover:bg-blue-50'
            }`}
          >
            {service.icon}
            <span>{service.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ServiceSelector;