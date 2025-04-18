import React from 'react';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignupForm from './SignupForm';
import { signup } from '@/api';
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
jest.mock('@/components/ui/use-toast', () => ({
  useToast: jest.fn(() => ({ toast: jest.fn() })),
}));
jest.mock('@/api', () => ({
  signup: jest.fn(),
}));

const mockedSignup = signup as jest.Mock;

describe('SignupForm', () => {
  const mockNavigate = jest.fn();
  const mockToast = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useToast as jest.Mock).mockReturnValue({ toast: mockToast });
    (signup as jest.Mock).mockReset();
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('renders the signup form correctly with initial step', () => {
    render(<SignupForm />);
    
    expect(screen.getByText('Personal Info')).toBeInTheDocument();
    expect(screen.getByTestId('firstname-input')).toBeInTheDocument();
    expect(screen.getByTestId('lastname-input')).toBeInTheDocument();
    expect(screen.getByTestId('gender-trigger')).toBeInTheDocument();
    expect(screen.getByTestId('date-trigger')).toBeInTheDocument();
    expect(screen.getByTestId('continue-button')).toBeInTheDocument();
  });

  it('allows navigation between steps', async () => {
    render(<SignupForm />);
    
    // Fill in first step
    fireEvent.change(screen.getByTestId('firstname-input'), { target: { value: 'John' } });
    fireEvent.change(screen.getByTestId('lastname-input'), { target: { value: 'Doe' } });
    
    // Select gender
    fireEvent.click(screen.getByTestId('gender-trigger'));
    fireEvent.click(screen.getByTestId('gender-male'));
    
    // Select date of birth
    fireEvent.click(screen.getByTestId('date-trigger'));
    fireEvent.click(screen.getByText('15'));
    
    // Go to next step
    fireEvent.click(screen.getByTestId('continue-button'));
    
    await waitFor(() => {
      expect(screen.getByText('Contact')).toBeInTheDocument();
      expect(screen.getByTestId('email-input')).toBeInTheDocument();
    });
    
    // Go back
    fireEvent.click(screen.getByTestId('back-button'));
    
    await waitFor(() => {
      expect(screen.getByText('Personal Info')).toBeInTheDocument();
    });
  });

  it('validates email format', async () => {
    render(<SignupForm />);
    
    // Fill and submit first step
    fireEvent.change(screen.getByTestId('firstname-input'), { target: { value: 'John' } });
    fireEvent.change(screen.getByTestId('lastname-input'), { target: { value: 'Doe' } });
    fireEvent.click(screen.getByTestId('gender-trigger'));
    fireEvent.click(screen.getByTestId('gender-male'));
    fireEvent.click(screen.getByTestId('date-trigger'));
    fireEvent.click(screen.getByText('15'));
    fireEvent.click(screen.getByTestId('continue-button'));
    
    // Test invalid email
    await waitFor(() => {
      fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'invalid-email' } });
      fireEvent.click(screen.getByTestId('continue-button'));
      
      expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });
  });

  it('toggles password visibility', async () => {
    render(<SignupForm />);
    
    // Navigate to security step
    fireEvent.change(screen.getByTestId('firstname-input'), { target: { value: 'John' } });
    fireEvent.change(screen.getByTestId('lastname-input'), { target: { value: 'Doe' } });
    fireEvent.click(screen.getByTestId('gender-trigger'));
    fireEvent.click(screen.getByTestId('gender-male'));
    fireEvent.click(screen.getByTestId('date-trigger'));
    fireEvent.click(screen.getByText('15'));
    fireEvent.click(screen.getByTestId('continue-button'));
    
    // Fill contact step
    await waitFor(() => {
      fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'valid@example.com' } });
      fireEvent.change(screen.getByTestId('phone-input'), { target: { value: '1234567890' } });
      fireEvent.change(screen.getByTestId('address-textarea'), { target: { value: '123 Main St' } });
      fireEvent.click(screen.getByTestId('nationality-trigger'));
      fireEvent.click(screen.getByTestId('nationality-ethiopian'));
      fireEvent.click(screen.getByTestId('continue-button'));
    });
    
    // Fill identity step
    await waitFor(() => {
      fireEvent.change(screen.getByTestId('idnumber-input'), { target: { value: 'ABC123' } });
      fireEvent.click(screen.getByTestId('continue-button'));
    });
    
    // Test password toggle
    await waitFor(() => {
      const passwordInput = screen.getByTestId('password-input') as HTMLInputElement;
      const toggleButton = screen.getByTestId('password-toggle');
      
      expect(passwordInput.type).toBe('password');
      
      fireEvent.click(toggleButton);
      expect(passwordInput.type).toBe('text');
      
      fireEvent.click(toggleButton);
      expect(passwordInput.type).toBe('password');
    });
  });

  it('validates password requirements', async () => {
    render(<SignupForm />);
    
    // Step 1: Personal Info
    fireEvent.change(screen.getByTestId('firstname-input'), { target: { value: 'John' } });
    fireEvent.change(screen.getByTestId('lastname-input'), { target: { value: 'Doe' } });
    fireEvent.click(screen.getByTestId('gender-trigger'));
    await waitFor(() => {
      fireEvent.click(screen.getByTestId('gender-male'));
    });
    fireEvent.click(screen.getByTestId('date-trigger'));
    const days = screen.getAllByText('15');
    fireEvent.click(days[0]);
    fireEvent.click(screen.getByTestId('continue-button'));
  
    // Step 2: Contact Info
    await waitFor(() => {
      fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'valid@example.com' } });
      fireEvent.change(screen.getByTestId('phone-input'), { target: { value: '1234567890' } });
      fireEvent.change(screen.getByTestId('address-textarea'), { target: { value: '123 Main St' } });
      fireEvent.click(screen.getByTestId('nationality-trigger'));
      fireEvent.click(screen.getByTestId('nationality-ethiopian'));
      fireEvent.click(screen.getByTestId('continue-button'));
    });
  
    // Step 3: Identity
    await waitFor(() => {
      fireEvent.click(screen.getByTestId('idtype-trigger'));
      fireEvent.click(screen.getByTestId('idtype-passport'));
      fireEvent.change(screen.getByTestId('idnumber-input'), { target: { value: 'ABC123' } });
      fireEvent.click(screen.getByTestId('continue-button'));
    });
  
    // Step 4: Security - Test validation
    await waitFor(() => {
      fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'weak' } });
      fireEvent.click(screen.getByText('Create Account'));
      
      // Get the error message element specifically by its id or test id if available
      const errorMessages = screen.getAllByText(/Password must be at least 8 characters/i);
      // Assert that the error message is shown (the second one is likely the error message)
      expect(errorMessages[1]).toBeInTheDocument();
      
      // Or better yet, if you can add test ids to your error messages:
      // expect(screen.getByTestId('password-length-error')).toBeInTheDocument();
      // expect(screen.getByTestId('password-uppercase-error')).toBeInTheDocument();
      
      // Alternative: check for the error message that has the 'text-destructive' class
      const errorElement = screen.getByText(/Password must be at least 8 characters/i, {
        selector: '.text-destructive'
      });
      expect(errorElement).toBeInTheDocument();
    });
  });
});