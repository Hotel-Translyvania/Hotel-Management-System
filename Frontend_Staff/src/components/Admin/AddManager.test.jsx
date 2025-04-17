// src/components/Admin/AddManager.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddManager from './AddManagers';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios;

describe('AddManager Component', () => {
  let onSuccessMock;

  beforeEach(() => {
    onSuccessMock = jest.fn();
    mockedAxios.create = jest.fn(() => ({
      post: jest.fn().mockResolvedValue({ data: { message: 'Success' } }),
    }));
    global.URL.createObjectURL = jest.fn(() => '/mock-profile-image.png');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form with all fields', () => {
    render(<AddManager onSuccess={onSuccessMock} />);
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Date of Birth')).toBeInTheDocument();
    expect(screen.getByLabelText('Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone Number')).toBeInTheDocument();
    expect(screen.getByLabelText('Hotel Id')).toBeInTheDocument();
    expect(screen.getByLabelText('Registered At')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('shows validation errors when required fields are empty', async () => {
    render(<AddManager onSuccess={onSuccessMock} />);
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(screen.getByText('First Name is required')).toBeInTheDocument();
      expect(screen.getByText('Last Name is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Date of Birth is required')).toBeInTheDocument();
      expect(screen.getByText('Address is required')).toBeInTheDocument();
      expect(screen.getByText('Phone Number is required')).toBeInTheDocument();
      expect(screen.getByText('Hotel is required')).toBeInTheDocument();
      expect(screen.getByText('Registration Date is required')).toBeInTheDocument();
    });
  });

  it('validates email format', async () => {
    render(<AddManager onSuccess={onSuccessMock} />);
    const emailInput = screen.getByLabelText('Email');
    await userEvent.type(emailInput, 'invalid-email', { delay: 10 });
    await userEvent.tab();
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(screen.getByText('Invalid Email')).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('validates phone number format', async () => {
    render(<AddManager onSuccess={onSuccessMock} />);
    const phoneInput = screen.getByLabelText('Phone Number');
    await userEvent.type(phoneInput, '123');
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(screen.getByText('Invalid Phone Number')).toBeInTheDocument();
    });
  });

  it('calls onSuccess when form is submitted with valid data', async () => {
    render(<AddManager onSuccess={onSuccessMock} />);

    await userEvent.type(screen.getByLabelText('First Name'), 'John', { delay: 10 });
    await userEvent.type(screen.getByLabelText('Last Name'), 'Doe', { delay: 10 });
    await userEvent.type(screen.getByLabelText('Email'), 'john.doe@example.com', { delay: 10 });
    await userEvent.type(screen.getByLabelText('Date of Birth'), '1990-01-01', { delay: 10 });
    await userEvent.type(screen.getByLabelText('Address'), '123 Main St', { delay: 10 });
    await userEvent.type(screen.getByLabelText('Phone Number'), '+12345678901', { delay: 10 });
    await userEvent.type(screen.getByLabelText('Hotel Id'), '1', { delay: 10 });
    await userEvent.type(screen.getByLabelText('Registered At'), '2023-01-01', { delay: 10 });

    const file = new File(['dummy'], 'profile.png', { type: 'image/png' });
    const fileInput = screen.getByTestId('file-input');
    Object.defineProperty(fileInput, 'files', { value: [file] });
    fireEvent.change(fileInput);

    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(mockedAxios.create().post).toHaveBeenCalled();
      expect(onSuccessMock).toHaveBeenCalled();
    }, { timeout: 3000 });
  });
});