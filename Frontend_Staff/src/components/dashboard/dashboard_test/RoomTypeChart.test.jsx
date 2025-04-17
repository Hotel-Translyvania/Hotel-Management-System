import React from 'react';
import { render, screen } from '@testing-library/react';
import RoomTypeChart from '../RoomTypeChart'; 

const mockRoomTypes = [
  { type: 'Suite', count: 5 },
  { type: 'Standard', count: 15 },
  { type: 'Penthouse', count: 1 },
];

describe('RoomTypeChart', () => {
  it('renders chart and list when data is provided', () => {
    render(<RoomTypeChart roomTypeData={mockRoomTypes} />);

    expect(screen.getByText('Room Types')).toBeInTheDocument();
    expect(screen.getByTestId('mock-doughnut-chart')).toBeInTheDocument();

    expect(screen.getByText('Suite')).toBeInTheDocument();
    expect(screen.getByText('5 Rooms')).toBeInTheDocument();
    expect(screen.getByText('Standard')).toBeInTheDocument();
    expect(screen.getByText('15 Rooms')).toBeInTheDocument();
    expect(screen.getByText('Penthouse')).toBeInTheDocument();
    expect(screen.getByText('1 Room')).toBeInTheDocument();

    expect(screen.queryByText('No room type data available.')).not.toBeInTheDocument();
  });

  it('renders no data message when roomTypeData is empty, null, or undefined', () => {
    const { rerender } = render(<RoomTypeChart roomTypeData={[]} />);
    expect(screen.getByText('Room Types')).toBeInTheDocument();
    expect(screen.getByText('No room type data available.')).toBeInTheDocument();
    expect(screen.queryByTestId('mock-doughnut-chart')).not.toBeInTheDocument();
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();

    rerender(<RoomTypeChart roomTypeData={null} />);
    expect(screen.getByText('No room type data available.')).toBeInTheDocument();

    rerender(<RoomTypeChart roomTypeData={undefined} />);
    expect(screen.getByText('No room type data available.')).toBeInTheDocument();
  });
});