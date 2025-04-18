import React from 'react';
export const Doughnut = ({ data, options, 'data-testid': dataTestId }) => (
  <div data-testid={dataTestId || 'mock-doughnut-chart'}>
    Mock Doughnut Chart (Labels: {data?.labels?.join(', ') || 'N/A'})
  </div>
);

export const Bar = ({ data, options, 'data-testid': dataTestId }) => (
  <div data-testid={dataTestId || 'mock-bar-chart'}>
     Mock Bar Chart (Labels: {data?.labels?.join(', ') || 'N/A'})
  </div>
);