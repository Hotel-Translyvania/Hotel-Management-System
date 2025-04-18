import React from 'react';
import { render, screen } from '@testing-library/react';
import GuestCountryChart from '../GuestCountryChart'; 

const mockCountries = [
  { name: 'USA', value: 50 },
  { name: 'Canada', value: 25 },
  { name: 'Mexico', value: 1 }, // Test singular 'Guest'
];

describe('GuestCountryChart', () => {
  it('renders chart and list when data is provided', () => {
    render(<GuestCountryChart guestCountries={mockCountries} />);

    expect(screen.getByText('Guests by Country')).toBeInTheDocument();
    expect(screen.getByTestId('mock-doughnut-chart')).toBeInTheDocument(); // From mock

    expect(screen.getByText('USA')).toBeInTheDocument();
    expect(screen.getByText('50 Guests')).toBeInTheDocument();
    expect(screen.getByText('Canada')).toBeInTheDocument();
    expect(screen.getByText('25 Guests')).toBeInTheDocument();
    expect(screen.getByText('Mexico')).toBeInTheDocument();
    expect(screen.getByText('1 Guest')).toBeInTheDocument();

    expect(screen.queryByText('No country data available.')).not.toBeInTheDocument();
  });

  it('renders no data message when guestCountries is empty, null, or undefined', () => {
    const { rerender } = render(<GuestCountryChart guestCountries={[]} />);
    expect(screen.getByText('Guests by Country')).toBeInTheDocument();
    expect(screen.getByText('No country data available.')).toBeInTheDocument();
    expect(screen.queryByTestId('mock-doughnut-chart')).not.toBeInTheDocument();
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();

    rerender(<GuestCountryChart guestCountries={null} />);
    expect(screen.getByText('No country data available.')).toBeInTheDocument();

    rerender(<GuestCountryChart guestCountries={undefined} />);
    expect(screen.getByText('No country data available.')).toBeInTheDocument();
  });
});