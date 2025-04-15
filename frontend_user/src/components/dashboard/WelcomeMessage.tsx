
import React from 'react';

interface WelcomeMessageProps {
  firstName: string;
  hasActiveBooking: boolean;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ 
  firstName, 
  hasActiveBooking 
}) => {
  const getSecondaryMessage = () => {
    if (hasActiveBooking) {
      return "Manage your bookings and explore new destinations.";
    } else {
      return "Find your next perfect stay with us.";
    }
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
        Welcome back!
      </h1>
      <p className="mt-2 text-lg text-gray-600">
        {getSecondaryMessage()}
      </p>
    </div>
  );
};

export default WelcomeMessage;
