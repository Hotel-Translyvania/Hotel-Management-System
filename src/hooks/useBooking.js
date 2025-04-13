import { useContext } from 'react';
import { BookingContext } from '../data/BookingContext';

export const useBooking = () => {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }

  return context;
};