import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { login } from '../../../src/components/api/api';
import { BrowserRouter } from 'react-router-dom';
import LoginForm from '../../../src/components/login/LoginForm';
import { validLoginInput, loginSuccessResponse } from '../../mocks/loginmock';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';

// Mock the login function
jest.mock('@/components/api/api', () => ({
  login: jest.fn(),
}));

// Mock useNavigate
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...Object.assign({}, jest.requireActual('react-router-dom')),
  useNavigate: () => mockedNavigate,
}));

// Wrap component with router for navigation
const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('LoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls login and navigates on successful login', async () => {
    (login as jest.Mock).mockResolvedValueOnce(loginSuccessResponse);
    renderWithRouter(<LoginForm />);

    // Simulate user input
    userEvent.type(screen.getByLabelText(/email/i), validLoginInput.email);
    userEvent.type(screen.getByLabelText(/password/i), validLoginInput.password);
    fireEvent.click(screen.getByRole('button', { name: /log in/i }));

    // Wait for async actions and assert expectations
    await waitFor(() => {
      expect(login).toHaveBeenCalledWith(validLoginInput);
      expect(mockedNavigate).toHaveBeenCalledWith('/user_login');
    });
  });
});