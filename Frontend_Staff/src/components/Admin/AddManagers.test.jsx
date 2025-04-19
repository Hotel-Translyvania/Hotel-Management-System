import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddManager from './AddManagers';

// Mock window.alert
global.alert = jest.fn();

// Mock react-hook-form to simulate validation
jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  useForm: () => ({
    register: jest.fn(),
    handleSubmit: (fn) => (e) => {
      e.preventDefault();
      fn({ 
        firstName: '',
        email: 'invalid' 
      });
    },
    formState: { 
      errors: { 
        firstName: { type: 'required', message: 'First Name is required' },
        email: { type: 'pattern', message: 'Invalid email format' },
        phone: { type: 'required', message: 'Phone Number is required' }
      } 
    }
  })
}));

describe('AddManager Component', () => {
  it('shows alert when profile image is missing', async () => {
    render(<AddManager onSuccess={jest.fn()} />);
    
    fireEvent.click(screen.getByRole('button', { name: /save/i }));
    
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith('Please upload a profile image.');
    });
  });

  it('validates phone number field', async () => {
    // Mock the form to return phone number error
    jest.mock('react-hook-form', () => ({
      useForm: () => ({
        formState: { 
          errors: { 
            phone: { message: 'Phone Number is required' } 
          } 
        }
      })
    }));

    render(<AddManager onSuccess={jest.fn()} />);
    
    const phoneInput = screen.getByPlaceholderText(/phone number/i);
    fireEvent.change(phoneInput, { target: { value: '' } });
    fireEvent.click(screen.getByRole('button', { name: /save/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/phone number is required/i)).toBeInTheDocument();
    });
  });
});