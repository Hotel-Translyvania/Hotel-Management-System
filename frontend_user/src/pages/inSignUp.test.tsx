import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import "@testing-library/jest-dom";
import { MemoryRouter } from 'react-router-dom';
import SignupForm from '../components/SignUp/mockSignupForm';
import { signup } from '../api';
import { toast } from '@/hooks/use-toast';

// Mock the API and toast functions
jest.mock('../api');
jest.mock('@/hooks/use-toast');

const mockedSignup = signup as jest.MockedFunction<typeof signup>;
const mockedToast = toast as jest.MockedFunction<typeof toast>;

describe('SignupForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderForm = () => {
    return render(
      <MemoryRouter>
        <SignupForm />
      </MemoryRouter>
    );
  };

  const fillForm = async () => {
    // Personal Info
    await userEvent.type(screen.getByTestId('firstname-input'), 'John');
    await userEvent.type(screen.getByTestId('lastname-input'), 'Doe');
    
    // Select gender
    fireEvent.click(screen.getByTestId('gender-trigger'));
    fireEvent.click(screen.getByTestId('gender-male'));

    // Select date of birth
    fireEvent.click(screen.getByTestId('date-trigger'));
    const dayButton = screen.getByRole('gridcell', { name: '15' });
    fireEvent.click(dayButton);

    // Contact Info
    await userEvent.type(screen.getByTestId('email-input'), 'john.doe@example.com');
    await userEvent.type(screen.getByTestId('phone-input'), '+1234567890');
    await userEvent.type(screen.getByTestId('address-textarea'), '123 Main St, City, Country');
    
    // Select nationality
    fireEvent.click(screen.getByTestId('nationality-trigger'));
    fireEvent.click(screen.getByTestId('nationality-ethiopian'));

    // Identity Info
    fireEvent.click(screen.getByTestId('idtype-trigger'));
    fireEvent.click(screen.getByTestId('idtype-passport'));
    await userEvent.type(screen.getByTestId('idnumber-input'), 'AB1234567');

    // Security Info
    await userEvent.type(screen.getByTestId('password-input'), 'SecurePass123!');
    await userEvent.type(screen.getByTestId('confirm-password-input'), 'SecurePass123!');
  };

  test('renders all form fields', () => {
    renderForm();

    expect(screen.getByTestId('firstname-input')).toBeInTheDocument();
    expect(screen.getByTestId('lastname-input')).toBeInTheDocument();
    expect(screen.getByTestId('gender-trigger')).toBeInTheDocument();
    expect(screen.getByTestId('date-trigger')).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('phone-input')).toBeInTheDocument();
    expect(screen.getByTestId('address-textarea')).toBeInTheDocument();
    expect(screen.getByTestId('nationality-trigger')).toBeInTheDocument();
    expect(screen.getByTestId('idtype-trigger')).toBeInTheDocument();
    expect(screen.getByTestId('idnumber-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('confirm-password-input')).toBeInTheDocument();
  });

  test('successfully submits form with valid data', async () => {
    mockedSignup.mockResolvedValueOnce({ data: { success: true } });
    renderForm();

    await fillForm();
    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(mockedSignup).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        identificationType: 'Passport',
        identificationNumber: 'AB1234567',
        address: '123 Main St, City, Country',
        email: 'john.doe@example.com',
        password: 'SecurePass123!',
        nationality: 'Ethiopian',
        dateOfBirth: expect.any(String),
        gender: 'Male',
        phone: '+1234567890',
        role: 'user',
        picture: 'https://example.com/default-avatar.jpg'
      });

      expect(mockedToast).toHaveBeenCalledWith({
        title: "Account created!",
        description: "You have successfully created your account.",
      });
    });
  });

  test('shows error toast when signup fails', async () => {
    const errorMessage = 'Email already in use';
    mockedSignup.mockRejectedValueOnce({
      response: { data: { message: errorMessage } }
    });
    renderForm();

    await fillForm();
    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(mockedToast).toHaveBeenCalledWith({
        title: "Signup Error",
        description: errorMessage,
        variant: "destructive",
      });
    });
  });

  test('toggles password visibility', async () => {
    renderForm();

    const passwordInput = screen.getByTestId('password-input');
    const toggleButton = screen.getByTestId('password-toggle');

    // Password should be hidden by default
    expect(passwordInput).toHaveAttribute('type', 'password');

    // Click to show password
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');

    // Click to hide password again
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('toggles confirm password visibility', async () => {
    renderForm();

    const confirmPasswordInput = screen.getByTestId('confirm-password-input');
    const toggleButton = screen.getByTestId('confirm-password-toggle');

    // Password should be hidden by default
    expect(confirmPasswordInput).toHaveAttribute('type', 'password');

    // Click to show password
    fireEvent.click(toggleButton);
    expect(confirmPasswordInput).toHaveAttribute('type', 'text');

    // Click to hide password again
    fireEvent.click(toggleButton);
    expect(confirmPasswordInput).toHaveAttribute('type', 'password');
  });
});