import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dashboard from './Dashboard';

jest.mock('../../components/dashboard/LoadingSpinner', () => () => <div data-testid="loading-spinner">Loading...</div>);
jest.mock('../../components/dashboard/ErrorMessage', () => ({ message }) => message ? <div data-testid="error-message">{message}</div> : null);
jest.mock('../../components/dashboard/KeyMetrics', () => ({ totalRevenue, totalBookings }) => <div data-testid="key-metrics">Revenue: {totalRevenue} Bookings: {totalBookings}</div>);
jest.mock('../../components/dashboard/GuestCountryChart', () => () => <div data-testid="guest-country-chart">Guest Country Chart</div>);
jest.mock('../../components/dashboard/GenderDemographicsChart', () => () => <div data-testid="gender-demographics-chart">Gender Demographics Chart</div>);
jest.mock('../../components/dashboard/RoomTypeChart', () => () => <div data-testid="room-type-chart">Room Type Chart</div>);
jest.mock('../../components/dashboard/AssignmentsInsights', () => ({ assignments }) => (
    <div data-testid="assignments-insights">
        Assignments Count: {assignments?.length || 0}
    </div>
));

if (typeof global.fetch === 'undefined') {
  global.fetch = jest.fn();
}

beforeEach(() => {
    fetch.mockClear();
});

const mockRevenueResponse = { success: true, revenue: 50000 };
const mockBookingsResponse = { success: true, booked: 120 };
const mockDemographicsResponse = { success: true, male: 60, female: 40 };
const mockCountriesResponse = { success: true, country: [{ "USA": 50 }, { "Canada": 30 }] };
const mockRoomTypesResponse = { success: true, data: { "Single": ["101", "102"], "Double": ["201"] } };
const mockAssignmentsResponse = { success: true, data: [{ assignmentId: 1, task: "Test Task" }, { assignmentId: 2, task: "Another Task" }] };


describe('Dashboard Component', () => {
    test('renders loading spinner initially', () => {
        fetch.mockImplementation(() => new Promise(() => { }));
        render(<Dashboard />);
        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
        expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
        expect(screen.queryByTestId('key-metrics')).not.toBeInTheDocument();
    });

    test('renders dashboard components after successful data fetch', async () => {
        fetch
            .mockResolvedValueOnce({ ok: true, json: async () => mockRevenueResponse })
            .mockResolvedValueOnce({ ok: true, json: async () => mockBookingsResponse })
            .mockResolvedValueOnce({ ok: true, json: async () => mockDemographicsResponse })
            .mockResolvedValueOnce({ ok: true, json: async () => mockCountriesResponse })
            .mockResolvedValueOnce({ ok: true, json: async () => mockRoomTypesResponse })
            .mockResolvedValueOnce({ ok: true, json: async () => mockAssignmentsResponse });

        render(<Dashboard />);

        expect(await screen.findByTestId('key-metrics')).toBeInTheDocument();
        expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
        expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();

        expect(screen.getByTestId('guest-country-chart')).toBeInTheDocument();
        expect(screen.getByTestId('gender-demographics-chart')).toBeInTheDocument();
        expect(screen.getByTestId('room-type-chart')).toBeInTheDocument();

        const assignmentsInsights = screen.getByTestId('assignments-insights');
        expect(assignmentsInsights).toBeInTheDocument();
        expect(assignmentsInsights).toHaveTextContent('Assignments Count: 2');

        expect(screen.getByTestId('key-metrics')).toHaveTextContent('Revenue: 500 Bookings: 120');
    });

   test('renders error message if a fetch fails', async () => {
        fetch
            .mockResolvedValueOnce({ ok: true, json: async () => mockRevenueResponse })
            .mockResolvedValueOnce({ ok: true, json: async () => mockBookingsResponse })
            .mockRejectedValueOnce(new Error('API Error Demographics'))
            .mockResolvedValueOnce({ ok: true, json: async () => mockCountriesResponse })
            .mockResolvedValueOnce({ ok: true, json: async () => mockRoomTypesResponse })
            .mockResolvedValueOnce({ ok: true, json: async () => mockAssignmentsResponse });

        render(<Dashboard />);

        expect(await screen.findByTestId('error-message')).toBeInTheDocument();
        expect(screen.getByTestId('error-message')).toHaveTextContent(/Failed to load some data: Demographics/i);

        expect(screen.getByTestId('key-metrics')).toBeInTheDocument();
        expect(screen.getByTestId('guest-country-chart')).toBeInTheDocument();
        expect(screen.getByTestId('assignments-insights')).toHaveTextContent('Assignments Count: 2');
        expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
   });

    test('renders generic error message if all fetches fail', async () => {
        fetch.mockRejectedValue(new Error('Network Error'));

        render(<Dashboard />);

        expect(await screen.findByTestId('error-message')).toBeInTheDocument();
        expect(screen.getByTestId('error-message')).toHaveTextContent(/Failed to load dashboard data/i);

        expect(screen.queryByTestId('key-metrics')).not.toBeInTheDocument();
        expect(screen.queryByTestId('guest-country-chart')).not.toBeInTheDocument();
        expect(screen.queryByTestId('assignments-insights')).not.toBeInTheDocument();
        expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
   });
});