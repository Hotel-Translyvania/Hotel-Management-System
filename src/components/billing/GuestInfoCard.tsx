
import { useState } from 'react';
import { GuestInfo, ServiceDetails } from '../../data/mockData';
import { Calendar, CreditCard, User, Phone, Mail, Clock, Home, Tag, Map, Users } from 'lucide-react';

interface GuestInfoCardProps {
  guest: GuestInfo;
  service: ServiceDetails;
}

const GuestInfoCard = ({ guest, service }: GuestInfoCardProps) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderServiceDetails = () => {
    switch (service.type) {
      case 'room':
        return (
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2">
              <Home className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-700">Room {service.roomNumber} - {service.roomType}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-700">Check-in: {formatDate(service.checkIn)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-700">Check-out: {formatDate(service.checkOut)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-700">{service.nights} Night{service.nights !== 1 ? 's' : ''}</span>
            </div>
          </div>
        );
      
      case 'restaurant':
        return (
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2">
              <Map className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-700">Table {service.tableNumber}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-700">Date: {service.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-700">Time: {service.time}</span>
            </div>
            {service.orderItems && (
              <div className="mt-2">
                <h4 className="text-sm font-medium text-gray-700">Order Items:</h4>
                <ul className="mt-1 space-y-1">
                  {service.orderItems.map((item, index) => (
                    <li key={index} className="text-xs text-gray-600 flex justify-between">
                      <span>{item.quantity}x {item.name}</span>
                      <span>${item.price.toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      
      case 'spa':
        return (
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-700">Treatment: {service.treatment}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-700">Therapist: {service.therapist}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-700">Duration: {service.duration} minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-700">Date: {service.date} at {service.time}</span>
            </div>
          </div>
        );
      
      case 'event':
        return (
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-700">Event: {service.eventName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Map className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-700">Location: {service.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-700">Attendees: {service.attendees}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-700">Date: {service.date} at {service.time}</span>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="mt-4">
            <p className="text-sm text-gray-700">{service.description}</p>
          </div>
        );
    }
  };

  return (
    <div className="section-card">
      <div className="flex flex-col md:flex-row justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{guest.name}</h2>
          <div className="mt-2 space-y-1">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-700">{guest.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-700">{guest.phone}</span>
            </div>
            {guest.reservationId && (
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-gray-700">Reservation: {guest.reservationId}</span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 md:mt-0">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
            {service.type.charAt(0).toUpperCase() + service.type.slice(1)} Service
          </div>
          <h3 className="mt-2 text-lg font-medium text-gray-800">{service.description}</h3>
          {renderServiceDetails()}
        </div>
      </div>
    </div>
  );
};

export default GuestInfoCard;