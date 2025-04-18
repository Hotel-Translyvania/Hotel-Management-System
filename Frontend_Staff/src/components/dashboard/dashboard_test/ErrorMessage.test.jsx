import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorMessage from '../ErrorMessage'; 

describe('ErrorMessage', () => {
  it('renders the default title and provided message', () => {
    render(<ErrorMessage message="Something went wrong." />);
    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(screen.getByText('Data Loading Error')).toBeInTheDocument(); 
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
  });

  it('renders a custom title and provided message', () => {
    render(<ErrorMessage title="API Failure" message="Could not fetch users." />);
    expect(screen.getByText('API Failure')).toBeInTheDocument();
    expect(screen.getByText('Could not fetch users.')).toBeInTheDocument();
  });

  it('does not render if message prop is missing or falsy', () => {
    const { container, rerender } = render(<ErrorMessage />);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(container).toBeEmptyDOMElement();

    rerender(<ErrorMessage message={null} />);
    expect(container).toBeEmptyDOMElement();

    rerender(<ErrorMessage message="" />);
    expect(container).toBeEmptyDOMElement();
  });
});