import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginForm from './LoginForm';
import { login } from '@/api';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

// Mock the dependencies
jest.mock('@/api');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}));
jest.mock('@/components/ui/use-toast');

describe('LoginForm', () => {
  const mockNavigate = jest.fn();
  const mockToast = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useToast as jest.Mock).mockReturnValue({ toast: mockToast });
    (login as jest.Mock).mockReset();
    localStorage.clear();
  });

  it('renders the login form correctly', () => {
    render(<LoginForm />);
    
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByText('Remember me')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
    expect(screen.getByText('Sign up')).toBeInTheDocument();
  });

  it('shows validation errors when form is submitted empty', async () => {
    render(<LoginForm />);
    
    fireEvent.click(screen.getByRole('button', { name: /log in/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();
    });
  });

  it('shows password validation error when password is too short', async () => {
    render(<LoginForm />);
    
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'valid@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'short' } });
    fireEvent.click(screen.getByRole('button', { name: /log in/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/password must be at least 6 characters/i)).toBeInTheDocument();
    });
  });

  it('toggles password visibility', () => {
    render(<LoginForm />);
    
    const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;
    const toggleButton = screen.getByTestId('password-toggle');
    
    // Password should be hidden by default
    expect(passwordInput.type).toBe('password');
    
    // Click to show password
    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe('text');
    
    // Click to hide password again
    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe('password');
  });

  it('handles successful login', async () => {
    const mockToken = 'mock-token-123';
    (login as jest.Mock).mockResolvedValue({ token: mockToken });
    
    render(<LoginForm />);
    
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'valid@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'correctpassword' } });
    fireEvent.click(screen.getByRole('button', { name: /log in/i }));
    
    await waitFor(() => {
      expect(login).toHaveBeenCalledWith({
        email: 'valid@example.com',
        password: 'correctpassword'
      });
      
      expect(localStorage.getItem('token')).toBe(mockToken);
      expect(mockToast).toHaveBeenCalledWith({
        title: 'Success!',
        description: 'You have successfully logged in.',
      });
      expect(mockNavigate).toHaveBeenCalledWith('/user_login');
    });
  });

  it('handles login failure', async () => {
    const errorMessage = 'Invalid credentials';
    (login as jest.Mock).mockRejectedValue(new Error(errorMessage));
    
    render(<LoginForm />);
    
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'valid@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByRole('button', { name: /log in/i }));
    
    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it('shows loading state during form submission', async () => {
    (login as jest.Mock).mockImplementation(() => new Promise(resolve => {
      setTimeout(() => resolve({ token: 'mock-token' }), 1000);
    }));
    
    render(<LoginForm />);
    
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'valid@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'correctpassword' } });
    fireEvent.click(screen.getByRole('button', { name: /log in/i }));
    
    expect(screen.getByRole('button', { name: /logging in/i })).toBeDisabled();
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
    });
  });

  it('toggles remember me checkbox', () => {
    render(<LoginForm />);
    
    const checkbox = screen.getByRole('checkbox', { name: /remember me/i });
    
    // Should be unchecked by default
    expect(checkbox).not.toBeChecked();
    
    // Check the checkbox
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    
    // Uncheck the checkbox
    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });
});