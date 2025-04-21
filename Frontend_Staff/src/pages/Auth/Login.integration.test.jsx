// src/pages/Auth/Login.integration.test.jsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import Login from './Login';

jest.mock('axios');

describe('Login Component Integration Tests', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    // Clear all mocks between tests
    jest.clearAllMocks();
  });

  it('successfully logs in with valid credentials', async () => {
    // Mock successful response
    axios.post.mockResolvedValueOnce({
      data: { token: 'mock-token', user: { role: 'admin' } }
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Fill out the form
    await user.type(screen.getByLabelText(/email/i), 'admin@example.com');
    await user.type(screen.getByLabelText(/password/i), 'securePassword123');

    // Submit the form
    await user.click(screen.getByRole('button', { name: /login/i }));

    // Verify the API call
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:3000/api/v1/auth/staff/login',
        {
          email: 'admin@example.com',
          password: 'securePassword123'
        }
      );
    });
  });

  it('shows error for invalid credentials', async () => {
    // Mock error response
    axios.post.mockRejectedValueOnce({
      response: { data: { message: 'Invalid credentials' } }
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Fill out the form with invalid credentials
    await user.type(screen.getByLabelText(/email/i), 'wrong@example.com');
    await user.type(screen.getByLabelText(/password/i), 'wrongpass');

    // Submit the form
    await user.click(screen.getByRole('button', { name: /login/i }));

    // Verify error message appears
    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });
});