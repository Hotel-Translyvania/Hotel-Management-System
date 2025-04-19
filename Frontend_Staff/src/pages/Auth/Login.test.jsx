import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';
import { useAuthStore } from '@/components/Auth/authStore';

jest.mock('@/components/Auth/authStore', () => ({
  useAuthStore: jest.fn(() => ({
    loading: false,
    login: jest.fn(),
    user: null,
    isAuthenticated: false
  }))
}));

describe('Login Component', () => {
  const Wrapper = ({ children }) => (
    <MemoryRouter>{children}</MemoryRouter>
  );

  it('validates form inputs', async () => {
    render(<Login />, { wrapper: Wrapper });
    
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });

  it('handles successful login', async () => {
    const mockLogin = jest.fn().mockResolvedValue({});
    useAuthStore.mockImplementation(() => ({ 
      login: mockLogin,
      loading: false
    }));
    
    render(<Login />, { wrapper: Wrapper });
    
    fireEvent.change(screen.getByLabelText(/email/i), { 
      target: { value: 'test@example.com' } 
    });
    fireEvent.change(screen.getByLabelText(/password/i), { 
      target: { value: 'password123' } 
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
    });
  });
});