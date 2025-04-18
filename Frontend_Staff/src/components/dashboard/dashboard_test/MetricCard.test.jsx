import React from 'react';
import { render, screen } from '@testing-library/react';
import MetricCard from '../MetricCard'; 
import { FaUser } from 'react-icons/fa'; 

describe('MetricCard', () => {
  const defaultProps = {
    title: 'Total Users',
    value: '1,234',
    icon: FaUser,
    label: 'Active',
    valueClassName: 'text-green-600',
    iconClassName: 'text-green-500',
  };

  it('renders title, value, and label', () => {
    render(<MetricCard {...defaultProps} />);
    expect(screen.getByText('Total Users')).toBeInTheDocument();
    expect(screen.getByText('1,234')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('renders the icon', () => {
    render(<MetricCard {...defaultProps} />);
    const heading = screen.getByText('Total Users').closest('h2');
    expect(heading?.querySelector('svg')).toBeInTheDocument();
  });

  it('applies valueClassName to the value paragraph', () => {
    render(<MetricCard {...defaultProps} />);
    const valueElement = screen.getByText('1,234');
    expect(valueElement).toHaveClass('text-4xl', 'font-bold', 'text-gray-900'); // Base classes
    expect(valueElement).toHaveClass(defaultProps.valueClassName);
  });

  it('applies iconClassName to the icon component (its svg)', () => {
    render(<MetricCard {...defaultProps} />);
    const heading = screen.getByText('Total Users').closest('h2');
    const iconElement = heading?.querySelector('svg');
    expect(iconElement).toHaveClass(defaultProps.iconClassName);
  });

  it('renders without icon if not provided', () => {
    const { icon, ...propsWithoutIcon } = defaultProps;
    render(<MetricCard {...propsWithoutIcon} icon={null} />);
    const heading = screen.getByText('Total Users').closest('h2');
    expect(heading?.querySelector('svg')).not.toBeInTheDocument();
  });
});