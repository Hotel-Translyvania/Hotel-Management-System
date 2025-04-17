// Login.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';
import { useNavigate } from 'react-router-dom';

// Mock react-router-dom's useNavigate
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('Login Component', () => {
  beforeEach(() => {
    useNavigate.mockClear();
  });

  it('renders login form with email and password fields', () => {
    render(<Login />);
    
    expect(screen.getByText('Welcome Back!')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('********')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  it('shows validation errors when fields are empty', async () => {
    render(<Login />);
    
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    
    expect(await screen.findByText('Email is required')).toBeInTheDocument();
    expect(await screen.findByText('Password is required')).toBeInTheDocument();
  });

  it('validates email format', async () => {
    render(<Login />);
    
    const emailInput = screen.getByPlaceholderText('you@example.com');
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    
    expect(await screen.findByText('Invalid email address')).toBeInTheDocument();
  });

  it('navigates to dashboard on successful login', async () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
    
    render(<Login />);
    
    // Fill in valid credentials
    fireEvent.change(screen.getByPlaceholderText('you@example.com'), { 
      target: { value: 'hayat@test.com' } 
    });
    fireEvent.change(screen.getByPlaceholderText('********'), { 
      target: { value: 'password123' } 
    });
    
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    
    // Check if navigation occurred after a delay
    await new Promise(resolve => setTimeout(resolve, 2100));
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });

  it('shows loading state during submission', async () => {
    render(<Login />);
    
    // Fill in valid credentials
    fireEvent.change(screen.getByPlaceholderText('you@example.com'), { 
      target: { value: 'hayat@test.com' } 
    });
    fireEvent.change(screen.getByPlaceholderText('********'), { 
      target: { value: 'password123' } 
    });
    
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    
    expect(await screen.findByText('Logging in...')).toBeInTheDocument();
  });
});