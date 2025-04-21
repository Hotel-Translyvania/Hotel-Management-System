import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Managers from './Managers'; 

// Mock child components if needed
jest.mock('../Table/Table', () => ({
  CustomTable: ({ data, columns, onAddClick, addButtonText, pageSize }) => (
    <div data-testid="mock-table">
      <button onClick={onAddClick}>{addButtonText}</button>
      <div>{JSON.stringify(data)}</div>
    </div>
  )
}));

jest.mock('./AddManagers', () => () => (
  <div data-testid="add-manager">Add Manager Form</div>
));

describe('Managers Component', () => {
  it('renders loading state initially', () => {
    render(<Managers />);
    expect(screen.getByText('Loading Managers...')).toBeInTheDocument();
  });

  it('loads and displays data', async () => {
    render(<Managers />);
    await waitFor(() => {
      expect(screen.getByTestId('mock-table')).toBeInTheDocument();
    });
  });

  it('opens add manager dialog', async () => {
    render(<Managers />);
    await waitFor(() => {
      fireEvent.click(screen.getByText('Add Manager'));
      expect(screen.getByTestId('add-manager')).toBeInTheDocument();
    });
  });
});