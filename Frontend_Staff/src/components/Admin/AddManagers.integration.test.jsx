import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import AddManager from './AddManagers.jsx';

jest.mock('axios', () => {
  const mockPost = jest.fn();
  return {
    create: jest.fn(() => ({
      post: mockPost,
    })),
    post: mockPost, // Fallback for direct axios.post (if used)
  };
});

global.alert = jest.fn();

// Mock URL.createObjectURL
global.URL = {
  createObjectURL: jest.fn(() => 'blob:http://localhost/dummy-url'),
};

describe('AddManager Component Integration Tests', () => {
  const user = userEvent.setup();
  let mockPost;

  beforeEach(() => {
    jest.clearAllMocks();
    // Access the post mock
    mockPost = axios.create().post;
    console.log('axios mock:', axios, 'create:', axios.create, 'post:', mockPost);
    mockPost.mockImplementation((url, data) => {
      console.log('mockPost called with:', url, Array.from(data.entries()));
      return Promise.resolve({ data: { message: 'Manager added successfully', managerId: '123' } });
    });
  });

  it('successfully submits manager data with profile image', async () => {
    render(
      <MemoryRouter>
        <AddManager onSuccess={jest.fn()} />
      </MemoryRouter>
    );

    // Fill form inputs
    await user.type(screen.getByPlaceholderText('First Name'), 'John');
    await user.type(screen.getByPlaceholderText('Last Name'), 'Doe');
    await user.type(screen.getByPlaceholderText('Email'), 'john.doe@example.com');
    await user.type(screen.getByPlaceholderText('Address'), '123 Main St');
    await user.type(screen.getByPlaceholderText('Phone Number'), '+1234567890');
    await user.type(screen.getByPlaceholderText('Hotel'), '34');

    // Try to fill password
    let passwordInput;
    try {
      passwordInput = screen.getByLabelText(/password/i) || screen.getByPlaceholderText(/password/i) || document.querySelector('#password') || document.querySelector('input[name="password"]');
      await user.type(passwordInput, 'securepassword123');
      fireEvent.blur(passwordInput);
      console.log('Set password:', passwordInput.value);
    } catch (e) {
      console.log('No password input found in form');
    }

    // Fill date inputs
    const dobInput = document.querySelector('#dob');
    const registeredAtInput = document.querySelector('#registeredAt');
    fireEvent.change(dobInput, { target: { value: '1990-01-01' } });
    fireEvent.blur(dobInput);
    fireEvent.change(registeredAtInput, { target: { value: '2025-04-06' } });
    fireEvent.blur(registeredAtInput);

    // Log all input values
    console.log('firstName value:', screen.getByPlaceholderText('First Name').value);
    console.log('lastName value:', screen.getByPlaceholderText('Last Name').value);
    console.log('email value:', screen.getByPlaceholderText('Email').value);
    console.log('address value:', screen.getByPlaceholderText('Address').value);
    console.log('phone value:', screen.getByPlaceholderText('Phone Number').value);
    console.log('hotel value:', screen.getByPlaceholderText('Hotel').value);
    console.log('dob value:', dobInput.value);
    console.log('registeredAt value:', registeredAtInput.value);
    console.log('password value:', passwordInput ? passwordInput.value : 'Not present');

    // Mock file upload
    const fileInput = document.querySelector('input[type="file"]');
    const file = new File(['dummy'], 'profile.png', { type: 'image/png' });
    await user.upload(fileInput, file);

    // Check for validation errors
    const errorMessages = screen.queryAllByText(/is required|invalid/i);
    console.log('Validation errors:', errorMessages.map((el) => el.textContent || 'Unknown error'));

    // Debug form state
    console.log('Form DOM:');
    screen.debug();

    // Submit form
    const saveButton = screen.getByRole('button', { name: /save/i });
    console.log('Clicking Save button');
    try {
      await user.click(saveButton);
      await waitFor(
        () => {
          expect(mockPost).toHaveBeenCalledWith(
            expect.stringContaining('/manager'),
            expect.any(FormData),
            expect.any(Object)
          );
        },
        { timeout: 10000 }
      );
    } catch (error) {
      console.log('Test caught submission error:', error.message);
      // Verify form submission occurred
      expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
      expect(screen.getByPlaceholderText('First Name').value).toBe('John');
      throw error; // Re-throw for debugging
    }
  }, 15000);

  it('shows validation errors when required fields are missing', async () => {
    render(
      <MemoryRouter>
        <AddManager onSuccess={jest.fn()} />
      </MemoryRouter>
    );

    await user.click(screen.getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(screen.getByText('Phone Number is required')).toBeInTheDocument();
      expect(mockPost).not.toHaveBeenCalled();
    });
  });
});