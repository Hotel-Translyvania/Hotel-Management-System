import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingSpinner from '../LoadingSpinner'; 

describe('LoadingSpinner', () => {
  it('renders the default message', () => {
    render(<LoadingSpinner />);
    expect(screen.getByText('Loading dashboard data...')).toBeInTheDocument();
    expect(screen.getByRole('status', { hidden: true })).toBeInTheDocument();
  });

  it('renders a custom message', () => {
    render(<LoadingSpinner message="Fetching details..." />);
    expect(screen.getByText('Fetching details...')).toBeInTheDocument();
    expect(screen.queryByText('Loading dashboard data...')).not.toBeInTheDocument();
  });
});