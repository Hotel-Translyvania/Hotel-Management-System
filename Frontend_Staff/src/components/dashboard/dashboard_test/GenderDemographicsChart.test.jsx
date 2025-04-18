import React from 'react';
import { render, screen } from '@testing-library/react';
import GenderDemographicsChart from '../GenderDemographicsChart'; 



const mockDemographics = { Male: 75, Female: 50 };

describe('GenderDemographicsChart', () => {
  it('renders chart and list when data is provided', () => {
    render(<GenderDemographicsChart genderDemographics={mockDemographics} />);

    expect(screen.getByText('Gender Demographics')).toBeInTheDocument();
    expect(screen.getByTestId('mock-doughnut-chart')).toBeInTheDocument();

    expect(screen.getByText('Male')).toBeInTheDocument();
    expect(screen.getByText('75')).toBeInTheDocument();
    expect(screen.getByText('Female')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();

    expect(screen.queryByText('No gender data available.')).not.toBeInTheDocument();
  });

  it('renders no data message when data is empty, null, or undefined, or has zero counts', () => {
    const { rerender } = render(<GenderDemographicsChart genderDemographics={{ Male: 0, Female: 0 }} />);
    expect(screen.getByText('Gender Demographics')).toBeInTheDocument();
    expect(screen.getByText('No gender data available.')).toBeInTheDocument();
    expect(screen.queryByTestId('mock-doughnut-chart')).not.toBeInTheDocument();
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();

    rerender(<GenderDemographicsChart genderDemographics={{}} />);
    expect(screen.getByText('No gender data available.')).toBeInTheDocument();

    rerender(<GenderDemographicsChart genderDemographics={null} />);
    expect(screen.getByText('No gender data available.')).toBeInTheDocument();

    rerender(<GenderDemographicsChart genderDemographics={undefined} />);
    expect(screen.getByText('No gender data available.')).toBeInTheDocument();
  });
});