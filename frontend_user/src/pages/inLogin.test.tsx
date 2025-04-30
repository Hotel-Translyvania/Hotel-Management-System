import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import "@testing-library/jest-dom";
import { MemoryRouter } from 'react-router-dom';
import LoginForm from '../components/Login/LoginForm';
import { login } from '@/api';
import { useToast } from '@/components/ui/use-toast';

// Mock the API and toast functions
jest.mock('@/api');
jest.mock('@/components/ui/use-toast');

const mockedLogin = login as jest.MockedFunction<typeof login>;
const mockedUseToast = useToast as jest.MockedFunction<typeof useToast>;

describe('LoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock useToast implementation
    mockedUseToast.mockReturnValue({
      toast: jest.fn(),
      dismiss: jest.fn(),
      toasts: [],
    });
  });

  const renderForm = () => {
    return render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
  };

  const fillForm = async (email = 'user@example.com', password = 'password123') => {
    await userEvent.type(screen.getByPlaceholderText('your@email.com'), email);
    await userEvent.type(screen.getByPlaceholderText('••••••••'), password);
  };

  test('renders all form elements', () => {
    renderForm();

    expect(screen.getByTestId('login-form')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('your@email.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
    expect(screen.getByTestId('password-toggle')).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /remember me/i })).toBeInTheDocument();
    expect(screen.getByTestId('login-button')).toBeInTheDocument();
    expect(screen.getByText(/don't have an account/i)).toBeInTheDocument();
  });

  test('shows validation errors for empty fields', async () => {
    renderForm();

    fireEvent.click(screen.getByTestId('login-button'));

    await waitFor(() => {
      expect(screen.getByText('Please fill in all fields.')).toBeInTheDocument();
    });
  });

  test('shows validation error for short password', async () => {
    renderForm();

    await userEvent.type(screen.getByPlaceholderText('your@email.com'), 'user@example.com');
    await userEvent.type(screen.getByPlaceholderText('••••••••'), 'short');
    fireEvent.click(screen.getByTestId('login-button'));

    await waitFor(() => {
      expect(screen.getByText('Password must be at least 6 characters.')).toBeInTheDocument();
    });
  });

  test('successfully submits form with valid data', async () => {
    const mockToken = 'mock-token-123';
    mockedLogin.mockResolvedValueOnce({ token: mockToken });
    renderForm();

    await fillForm();
    fireEvent.click(screen.getByTestId('login-button'));

    await waitFor(() => {
      expect(mockedLogin).toHaveBeenCalledWith({
        email: 'user@example.com',
        password: 'password123'
      });

      // Check if token was stored in localStorage
      expect(localStorage.getItem('token')).toBe(mockToken);

      // Check if toast was shown
      expect(mockedUseToast().toast).toHaveBeenCalledWith({
        title: 'Success!',
        description: 'You have successfully logged in.',
      });
    });
  });

  test('handles login failure with specific error message', async () => {
    const errorMessage = 'Invalid credentials';
    mockedLogin.mockRejectedValueOnce(new Error(errorMessage));
    renderForm();

    await fillForm();
    fireEvent.click(screen.getByTestId('login-button'));

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  test('handles login failure with generic error message', async () => {
    mockedLogin.mockRejectedValueOnce(new Error());
    renderForm();

    await fillForm();
    fireEvent.click(screen.getByTestId('login-button'));

    await waitFor(() => {
      expect(screen.getByText('Login failed. Please try again.')).toBeInTheDocument();
    });
  });

  test('toggles password visibility', async () => {
    renderForm();

    const passwordInput = screen.getByPlaceholderText('••••••••');
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

  test('toggles remember me checkbox', async () => {
    renderForm();

    const checkbox = screen.getByRole('checkbox', { name: /remember me/i });

    // Checkbox should be unchecked by default
    expect(checkbox).not.toBeChecked();

    // Click to check
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    // Click to uncheck again
    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });
});