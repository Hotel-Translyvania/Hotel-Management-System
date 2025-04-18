import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import AssignmentsInsights from '../AssignmentsInsights';

jest.mock('react-chartjs-2');

const MOCK_ASSIGNMENTS = [
  { assignmentId: 1, task: "Clean Room", staffName: "Alice", roomNumber: "101", description: "Standard", startTime: "2023-10-27T09:00:00Z", endTime: "2023-10-27T10:00:00Z", assignedAt: "2023-10-27T08:00:00Z" },
  { assignmentId: 2, task: "Maintenance", staffName: "Bob", roomNumber: "205", description: "Faucet", startTime: "2023-10-27T10:30:00Z", endTime: "2023-10-27T11:00:00Z", assignedAt: "2023-10-27T08:15:00Z" },
  { assignmentId: 3, task: "Clean Room", staffName: "Alice", roomNumber: "102", description: "Deep", startTime: "2023-10-27T10:15:00Z", endTime: "2023-10-27T11:45:00Z", assignedAt: "2023-10-27T08:05:00Z" },
  { assignmentId: 4, task: "Restock", staffName: "Charlie", roomNumber: "310", description: "Full", startTime: "2023-10-28T13:00:00Z", endTime: "2023-10-28T13:30:00Z", assignedAt: "2023-10-28T09:00:00Z" },
  { assignmentId: 5, task: "Laundry", staffName: "Alice", roomNumber: "Service", description: "Towels", startTime: "2023-10-28T11:00:00Z", endTime: "2023-10-28T12:00:00Z", assignedAt: "2023-10-28T10:00:00Z" },
  { assignmentId: 6, task: "Clean Room", staffName: "Bob", roomNumber: "201", description: "Checkout", startTime: "2023-10-28T14:00:00Z", endTime: "2023-10-28T15:00:00Z", assignedAt: "2023-10-28T13:00:00Z" },
  { assignmentId: 7, task: "Maintenance", staffName: "Charlie", roomNumber: "Gym", description: "Treadmill", startTime: "2023-10-29T09:00:00Z", endTime: "2023-10-29T09:30:00Z", assignedAt: "2023-10-29T08:30:00Z" },
];


describe('AssignmentsInsights Component', () => {

  test('renders no data message when assignments array is empty', () => {
    render(<AssignmentsInsights assignments={[]} />);
    expect(screen.getByText('No assignment data available.')).toBeInTheDocument();
  });

  test('renders charts and table when assignments data is provided', () => {
     render(<AssignmentsInsights assignments={[MOCK_ASSIGNMENTS[0]]} />);
     expect(screen.getByRole('cell', { name: 'Clean Room' })).toBeInTheDocument();
     expect(screen.getByRole('cell', { name: 'Alice' })).toBeInTheDocument();
     expect(screen.getByRole('cell', { name: '101' })).toBeInTheDocument();
  });

  test('displays only the first 5 assignments initially', () => {
    render(<AssignmentsInsights assignments={MOCK_ASSIGNMENTS} />);
    const tableBody = screen.getByRole('table').querySelector('tbody');
    const rows = within(tableBody).getAllByRole('row');
    expect(rows).toHaveLength(5);

    const firstRow = within(tableBody).getByText('101').closest('tr');
    expect(within(firstRow).getByRole('cell', { name: 'Clean Room' })).toBeInTheDocument();
    expect(within(firstRow).getByRole('cell', { name: 'Alice' })).toBeInTheDocument();

    expect(screen.queryByText('Checkout')).not.toBeInTheDocument();
    expect(screen.queryByRole('cell', { name: '201' })).not.toBeInTheDocument();
  });

  test('pagination controls appear when there are more than 5 assignments', () => {
    render(<AssignmentsInsights assignments={MOCK_ASSIGNMENTS} />);
    expect(screen.getByRole('button', { name: /Previous/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Next/i })).toBeInTheDocument();
    expect(screen.getByText('Page 1 of 2')).toBeInTheDocument();
  });

  test('pagination controls do not appear for 5 or less assignments', () => {
    render(<AssignmentsInsights assignments={MOCK_ASSIGNMENTS.slice(0, 5)} />);
    expect(screen.queryByRole('button', { name: /Previous/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Next/i })).not.toBeInTheDocument();
    expect(screen.queryByText(/Page 1 of/i)).not.toBeInTheDocument();
  });

  test('pagination works correctly', () => {
    render(<AssignmentsInsights assignments={MOCK_ASSIGNMENTS} />);

    const nextButton = screen.getByRole('button', { name: /Next/i });
    const prevButton = screen.getByRole('button', { name: /Previous/i });
    const tableBody = screen.getByRole('table').querySelector('tbody');

    expect(prevButton).toBeDisabled();
    expect(nextButton).toBeEnabled();
    expect(screen.getByText('Page 1 of 2')).toBeInTheDocument();
    expect(within(tableBody).getAllByRole('cell', { name: 'Alice' })).toHaveLength(3);
    expect(within(tableBody).getByRole('cell', { name: '101' })).toBeInTheDocument();
    expect(within(tableBody).queryByRole('cell', { name: '201' })).not.toBeInTheDocument();
    expect(within(tableBody).queryByText('Checkout')).not.toBeInTheDocument();

    fireEvent.click(nextButton);

    expect(prevButton).toBeEnabled();
    expect(nextButton).toBeDisabled();
    expect(screen.getByText('Page 2 of 2')).toBeInTheDocument();
    expect(within(tableBody).queryByRole('cell', { name: '101' })).not.toBeInTheDocument();
    expect(within(tableBody).getByRole('cell', { name: 'Bob' })).toBeInTheDocument();
    expect(within(tableBody).getByRole('cell', { name: '201' })).toBeInTheDocument();
    expect(within(tableBody).getByText('Checkout')).toBeInTheDocument();
    expect(within(tableBody).getByRole('cell', { name: 'Charlie' })).toBeInTheDocument();
    expect(within(tableBody).getByRole('cell', { name: 'Gym' })).toBeInTheDocument();

    fireEvent.click(prevButton);

    expect(prevButton).toBeDisabled();
    expect(nextButton).toBeEnabled();
    expect(screen.getByText('Page 1 of 2')).toBeInTheDocument();
    expect(within(tableBody).getByRole('cell', { name: '101' })).toBeInTheDocument();
    expect(within(tableBody).queryByRole('cell', { name: '201' })).not.toBeInTheDocument();
    expect(within(tableBody).queryByText('Checkout')).not.toBeInTheDocument();
  });

   test('handles null or undefined values in assignment data gracefully', () => {
        const assignmentsWithNulls = [
            { assignmentId: 10, task: null, staffName: undefined, roomNumber: null, description: null, startTime: null, endTime: null, assignedAt: null },
            { assignmentId: 11, task: "Valid Task", staffName: "Valid Staff", roomNumber: "123", description: "Desc", startTime: "2023-01-01T10:00:00Z", endTime: "2023-01-01T11:00:00Z", assignedAt: "2023-01-01T09:00:00Z" },
        ];
        render(<AssignmentsInsights assignments={assignmentsWithNulls} />);

        const tableBody = screen.getByRole('table').querySelector('tbody');
        const rows = within(tableBody).getAllByRole('row');

        const cellsInBody = within(tableBody).getAllByRole('cell');
        const naCells = cellsInBody.filter(cell => cell.textContent === 'N/A');

        expect(naCells).toHaveLength(6);

        const emptyDescCell = rows[0].querySelector('td.truncate');
        expect(emptyDescCell).toBeInTheDocument();
        expect(emptyDescCell).toHaveTextContent('');

        expect(screen.getByRole('cell', { name: 'Valid Task' })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: 'Valid Staff' })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: '123' })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: 'Desc' })).toBeInTheDocument();
        expect(screen.getByRole('cell', { name: /1\/1\/23, 1:00 PM/i })).toBeInTheDocument();

    });
});