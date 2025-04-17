import React from 'react';
import { render, screen } from '@testing-library/react';
import KeyMetrics from '../KeyMetrics'; 

describe('KeyMetrics', () => {
  it('renders revenue and bookings metric cards with correct values and formatting', () => {
    render(<KeyMetrics totalRevenue={5000000} totalBookings={150} />); // Revenue in cents

    expect(screen.getByText('Total Revenue')).toBeInTheDocument();
    expect(screen.getByText('$50,000.00')).toBeInTheDocument(); 

    expect(screen.getByText('Total Bookings')).toBeInTheDocument();
    expect(screen.getByText('150')).toBeInTheDocument();
  });

  it('renders zero values correctly', () => {
    render(<KeyMetrics totalRevenue={0} totalBookings={0} />);
    expect(screen.getByText('$0.00')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('renders large numbers correctly', () => {
    render(<KeyMetrics totalRevenue={123456789} totalBookings={9876} />);
    expect(screen.getByText('$1,234,567.89')).toBeInTheDocument();
    expect(screen.getByText('9876')).toBeInTheDocument();
  });
});