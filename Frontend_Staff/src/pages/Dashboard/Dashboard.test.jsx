import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Dashboard from './Dashboard'; // Adjust path if needed
import fetchMock from 'jest-fetch-mock';

// --- Mock API Data ---
const API_BASE_URL = "http://localhost:3000";
const HOTEL_ID = 1;

// !! Corrected Mock Revenue !!
const mockRevenueResponse = { revenue: "1234500" }; // 1,234,500 cents = $12,345.00
const mockBookingsResponse = { booked: 88 };
const mockDemographicsResponse = { male: 40, female: 48 };
const mockCountriesResponse = { country: [{ usa: 50 }, { canada: 30 }, { mexico: 8 }] };
const mockRoomTypesResponse = { data: { Suite: [{}, {}], Standard: [{}, {}, {}], Deluxe: [{}] } };
// --- End Mock Data ---

describe('Dashboard', () => {

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('shows loading indicator initially', () => {
    render(<Dashboard />);
    expect(screen.getByText(/Loading dashboard data.../i)).toBeInTheDocument();
  });

  it('fetches data and renders metrics and charts on successful load', async () => {
    fetchMock.mockResponse(async req => {
      const url = req.url;
      if (url.endsWith('/revenue')) return JSON.stringify(mockRevenueResponse); // Use corrected value
      if (url.endsWith('/bookings')) return JSON.stringify(mockBookingsResponse);
      if (url.endsWith('/demographics')) return JSON.stringify(mockDemographicsResponse);
      if (url.endsWith('/countries')) return JSON.stringify(mockCountriesResponse);
      if (url.endsWith('/room-types')) return JSON.stringify(mockRoomTypesResponse);
      throw new Error(`Unexpected fetch URL in success test: ${url}`);
    });

    render(<Dashboard />);

    // Wait for the CORRECT revenue value
    await screen.findByText('$12,345.00');

    // Check other expected data
    expect(screen.getByText('88')).toBeInTheDocument();
    expect(await screen.findByText('Usa')).toBeInTheDocument();
    expect(await screen.findByText('Male')).toBeInTheDocument();
    expect(await screen.findByText('Standard')).toBeInTheDocument();

    expect(fetchMock).toHaveBeenCalledTimes(5);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('handles partial API failures and displays an error message', async () => {
    fetchMock.mockResponse(async req => {
      const url = req.url;
      if (url.endsWith('/countries')) {
         return Promise.resolve({ status: 500, body: 'Internal Server Error' });
      }
      // Respond successfully for others
      if (url.endsWith('/revenue')) return JSON.stringify(mockRevenueResponse);
      if (url.endsWith('/bookings')) return JSON.stringify(mockBookingsResponse);
      if (url.endsWith('/demographics')) return JSON.stringify(mockDemographicsResponse);
      if (url.endsWith('/room-types')) return JSON.stringify(mockRoomTypesResponse);
      throw new Error(`Unexpected fetch URL in partial failure test: ${url}`);
    });

    render(<Dashboard />);

    // --- MODIFICATION START ---
    // Wait for the ERROR message first in partial failure scenarios
    await screen.findByRole('alert');

    // Check the specific error message content
    expect(screen.getByText(/Failed to load some data: Country/i)).toBeInTheDocument();
    // --- MODIFICATION END ---

    // Check that successful data is still rendered (revenue might be reset to 0, check bookings)
    expect(screen.getByText('88')).toBeInTheDocument();
    expect(await screen.findByText('Male')).toBeInTheDocument();

    // Check failed component shows its "no data" state
    expect(screen.getByText('Guests by Country')).toBeInTheDocument();
    expect(screen.getByText('No country data available.')).toBeInTheDocument();
  });

  it('handles total API failure (e.g., network error)', async () => {
    fetchMock.mockReject(new Error('Network Error Simulated'));
    render(<Dashboard />);

    // Wait for the specific error message for total failure
    // Use findByRole which uses waitFor internally
    const alert = await screen.findByRole('alert');
    expect(alert).toBeInTheDocument();

    // Check the correct error message text (based on component logic update)
    expect(screen.getByText(/Failed to load dashboard data. Please check the connection or try again later./i)).toBeInTheDocument();

    // Check metrics are reset/default
    expect(screen.getByText('$0.00')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();

    // Check all charts show "no data"
    expect(screen.getByText('No country data available.')).toBeInTheDocument();
    expect(screen.getByText('No gender data available.')).toBeInTheDocument();
    expect(screen.getByText('No room type data available.')).toBeInTheDocument();
  });

  it('handles API response with success: false field', async () => {
     fetchMock.mockResponse(async req => {
        const url = req.url;
        if (url.endsWith('/demographics')) {
            return JSON.stringify({ success: false, message: 'API Logic Error' });
        }
        // Respond successfully for others
        if (url.endsWith('/revenue')) return JSON.stringify(mockRevenueResponse);
        if (url.endsWith('/bookings')) return JSON.stringify(mockBookingsResponse);
        if (url.endsWith('/countries')) return JSON.stringify(mockCountriesResponse);
        if (url.endsWith('/room-types')) return JSON.stringify(mockRoomTypesResponse);
        throw new Error(`Unexpected fetch URL in success:false test: ${url}`);
    });

    render(<Dashboard />);

    // --- MODIFICATION START ---
    // Wait for the error message first
    await screen.findByRole('alert');

    // Check error reflects the specific component whose data processing failed
    expect(screen.getByText(/Failed to load some data: Demographics/i)).toBeInTheDocument();
    // --- MODIFICATION END ---

    // Check successful data is rendered (revenue might be reset, check bookings)
    expect(screen.getByText('88')).toBeInTheDocument();

    // Check failed component shows no data
    expect(screen.getByText('Gender Demographics')).toBeInTheDocument();
    expect(screen.getByText('No gender data available.')).toBeInTheDocument();
   });
});