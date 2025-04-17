// src/components/Admin/Managers.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Managers from './Managers';
import axios from 'axios';
import AddManager from './AddManagers';

jest.mock('axios');
jest.mock('./AddManagers', () => jest.fn(({ onSuccess }) => (
  <div>
    Add Manager Dialog
    <button onClick={onSuccess}>Submit</button>
  </div>
)));

describe('Managers Component', () => {
  const mockManagers = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '+1234567890',
      registrationDate: '2023-01-01',
      address: '123 Main St',
      hotelName: 'Hotel A',
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      phoneNumber: '+0987654321',
      registrationDate: '2023-02-01',
      address: '456 Oak Ave',
      hotelName: 'Hotel B',
    },
  ];

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: { data: mockManagers } });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the managers table with data', async () => {
    render(<Managers />);

    await waitFor(() => {
      expect(screen.getByText('First Name')).toBeInTheDocument();
      expect(screen.getByText('Last Name')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.getByText('Doe')).toBeInTheDocument();
      expect(screen.getByText('jane.smith@example.com')).toBeInTheDocument();
    });
  });

  it('opens the Add Manager dialog when Add Manager button is clicked', async () => {
    render(<Managers />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Add Manager/i })).toBeInTheDocument();
    });

    await userEvent.click(screen.getByRole('button', { name: /Add Manager/i }));

    expect(screen.getByText('Add Manager Dialog')).toBeInTheDocument();
  });

  it('closes the Add Manager dialog when onSuccess is called', async () => {
    render(<Managers />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Add Manager/i })).toBeInTheDocument();
    });

    await userEvent.click(screen.getByRole('button', { name: /Add Manager/i }));
    expect(screen.getByText('Add Manager Dialog')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(screen.queryByText('Add Manager Dialog')).not.toBeInTheDocument();
    });
  });
});