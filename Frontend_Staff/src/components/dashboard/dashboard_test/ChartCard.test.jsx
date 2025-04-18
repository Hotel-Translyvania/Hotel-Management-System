import React from 'react';
import { render, screen } from '@testing-library/react';
import ChartCard from '../ChartCard'; 
import { FaChartPie } from 'react-icons/fa'; // Example icon

describe('ChartCard', () => {
  const defaultProps = {
    title: 'Sales Data',
    icon: FaChartPie,
    iconClassName: 'text-red-500',
    noDataMessage: 'No sales data available.',
  };

  it('renders title and icon', () => {
    render(
      <ChartCard {...defaultProps} hasData={true}>
        <div>Chart Content</div>
      </ChartCard>
    );
    expect(screen.getByText('Sales Data')).toBeInTheDocument();
    const heading = screen.getByText('Sales Data').closest('h2');
    expect(heading?.querySelector('svg')).toBeInTheDocument();
    expect(heading?.querySelector('svg')).toHaveClass(defaultProps.iconClassName);
  });

  it('renders children when hasData is true', () => {
    render(
      <ChartCard {...defaultProps} hasData={true}>
        <div data-testid="chart-child">Actual Chart Here</div>
      </ChartCard>
    );
    expect(screen.getByTestId('chart-child')).toBeInTheDocument();
    expect(screen.queryByText(defaultProps.noDataMessage)).not.toBeInTheDocument();
  });

  it('renders noDataMessage when hasData is false', () => {
    render(
      <ChartCard {...defaultProps} hasData={false}>
        <div data-testid="chart-child">Actual Chart Here</div>
      </ChartCard>
    );
    expect(screen.queryByTestId('chart-child')).not.toBeInTheDocument();
    expect(screen.getByText(defaultProps.noDataMessage)).toBeInTheDocument();
  });

  it('renders correctly without an icon', () => {
     const { icon, ...propsWithoutIcon } = defaultProps;
     render(
       <ChartCard {...propsWithoutIcon} hasData={true}>
         <div>Chart Content</div>
       </ChartCard>
     );
     expect(screen.getByText('Sales Data')).toBeInTheDocument();
     const heading = screen.getByText('Sales Data').closest('h2');
     expect(heading?.querySelector('svg')).not.toBeInTheDocument();
  });
});