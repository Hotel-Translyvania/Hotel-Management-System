import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Login from '@/pages/Login';
import { login } from '@/api';

// Mock the API module
jest.mock('@/api', () => ({
  login: jest.fn(),
}));

// Mock the components
jest.mock('@/components/Login/Logo', () => () => <div data-testid="logo">Logo</div>);

// Fixed LoginForm mock (mocking onSubmit)
jest.mock('@/components/Login/LoginForm', () => ({
  onSubmit,
}: {
  onSubmit: (data: { email: string; password: string }) => void;
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({
        email: 'test@example.com', 
        password: 'password123',
      });
    }
  };

  return (
    <form data-testid="login-form" onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </form>
  );
});

describe('Login Page', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('renders correctly on desktop view', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Check for main elements
    expect(screen.queryAllByTestId('logo').length).toBeGreaterThan(0);  
    expect(screen.getByText('Login to your account')).toBeInTheDocument();
    expect(screen.getByText('Welcome back! Please enter your details.')).toBeInTheDocument();
    expect(screen.getByTestId('login-form')).toBeInTheDocument();
    expect(screen.getByText('← Back to Home')).toBeInTheDocument();
  });

  it('renders mobile-specific elements on mobile view', () => {
    // Mock window.innerWidth for mobile view
    global.innerWidth = 500;
    global.dispatchEvent(new Event('resize'));

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Mobile should show logo in the center
    const mobileLogo = screen.getAllByTestId('logo')[0];
    expect(mobileLogo).toBeInTheDocument();
  });

  it('navigates to home when "Back to Home" is clicked', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const homeLink = screen.getByText('← Back to Home');
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('displays the correct terms and conditions text', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByText('By signing in, you agree to our Terms and Privacy Policy.')).toBeInTheDocument();
  });
});