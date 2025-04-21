import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';
import axios from 'axios';

jest.mock('axios');

describe('Login Page', () => {
  test('renders the login page with all elements', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Check for the presence of the left-side brand illustration (visible on md screens and up)
    expect(screen.getByText('Welcome back to EzyStay')).toBeInTheDocument();
    expect(screen.getByText('Book your perfect stay with ease. Access your bookings, view your history, and find exclusive deals.')).toBeInTheDocument();

    // Check for the login form elements
    expect(screen.getByText('Login to your account')).toBeInTheDocument();
    expect(screen.getByText('Welcome back! Please enter your details.')).toBeInTheDocument();

    // Check for the "Back to Home" link
    expect(screen.getByText('← Back to Home')).toBeInTheDocument();

    // Check for the terms and privacy policy text
    expect(screen.getByText('By signing in, you agree to our Terms and Privacy Policy.')).toBeInTheDocument();
  });

  test('handles form submission and API call', async () => {
    const mockResponse = { data: { token: 'fake-jwt-token' } };
    (axios.post as jest.Mock).mockResolvedValueOnce(mockResponse);

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });

    // Simulate form submission
    fireEvent.click(screen.getByText('Sign In'));

    // Wait for the API call to complete and check for expected behavior
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('/api/login', {
        email: 'test@example.com',
        password: 'password123',
      });
      expect(screen.getByText('Login successful!')).toBeInTheDocument();
    });
  });

  test('displays error message on failed login', async () => {
    (axios.post as jest.Mock).mockRejectedValueOnce(new Error('Invalid credentials'));

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'wrong@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'wrongpassword' },
    });

    // Simulate form submission
    fireEvent.click(screen.getByText('Sign In'));

    // Wait for the API call to complete and check for error message
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('/api/login', {
        email: 'wrong@example.com',
        password: 'wrongpassword',
      });
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });
  });
});