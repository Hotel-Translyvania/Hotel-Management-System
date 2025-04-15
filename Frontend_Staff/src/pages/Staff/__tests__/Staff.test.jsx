import { render, screen, waitFor } from '@testing-library/react';
import Staff from '../components/Staff';

describe('Staff List Component', () => {
  it('renders staff list correctly (Happy Path)', async () => {
    render(<Staff />);
    expect(await screen.findByText(/John Doe/i)).toBeInTheDocument();
  });

  it('shows empty state when no staff exists (Edge Case)', () => {
    render(<Staff staffList={[]} />);
    expect(screen.getByText(/No staff members found/i)).toBeInTheDocument();
  });

  it('displays error on fetch failure (Error Condition)', async () => {
    global.fetch = jest.fn(() => Promise.reject('API Error'));
    render(<Staff />);
    expect(await screen.findByText(/Failed to fetch staff/i)).toBeInTheDocument();
  });
});
