import React from 'react';

// Mock the specific chart types you use from react-chartjs-2
export const Doughnut = ({ 'data-testid': dataTestId }) => (
  <div data-testid={dataTestId || 'mock-doughnut-chart'}>Mock Doughnut Chart</div>
);
// Add mocks for Bar, Line, Pie etc. if you use them
// export const Bar = ({ 'data-testid': dataTestId }) => (...);

// Mock the ChartJS registration if needed (often optional for basic tests)
export const Chart = {
  register: jest.fn(),
};