import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import SignUp from './SignUp';
const useIsMobileMock = require('@/hooks/use-mobile').useIsMobile;

// filepath: c:\Users\Nas\Contacts\Desktop\Class\Main-Product\frontend_user\src\pages\SignUp.test.tsx

// Mock dependencies
jest.mock('@/components/SignUp/Logo', () => () => <div data-testid="logo">Logo</div>);
jest.mock('@/components/SignUp/SignupForm', () => () => <div data-testid="signup-form">SignupForm</div>);
jest.mock('@/hooks/use-mobile', () => ({
  useIsMobile: jest.fn(),
}));

describe('SignUp Page', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly on desktop view', () => {
    useIsMobileMock.mockReturnValue(false); // Simulate desktop view

    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    // Check for left panel
    expect(screen.getByText('Welcome to EzyStay')).toBeInTheDocument();
    expect(screen.getByText('Your home away from home. Sign up to discover the perfect stays for your next trip.')).toBeInTheDocument();

    // Check for right panel
    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByTestId('signup-form')).toBeInTheDocument();
    expect(screen.getByText('Create your account')).toBeInTheDocument();
    expect(screen.getByText('Join EzyStay to start booking your perfect stays')).toBeInTheDocument();

    // Check for "Back to Home" link
    const backToHomeLink = screen.getByText('← Back to Home');
    expect(backToHomeLink).toBeInTheDocument();
    expect(backToHomeLink).toHaveAttribute('href', '/');
  });

  it('hides the left panel on mobile view', () => {
    useIsMobileMock.mockReturnValue(true); // Simulate mobile view

    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    // Left panel should not be visible
    expect(screen.queryByText('Welcome to EzyStay')).not.toBeInTheDocument();

    // Right panel should still render
    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByTestId('signup-form')).toBeInTheDocument();
  });

  it('renders footer correctly', () => {
    useIsMobileMock.mockReturnValue(false); // Simulate desktop view

    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    // Check for footer text
    expect(screen.getByText('© 2025 EzyStay. All rights reserved.')).toBeInTheDocument();
  });
});