import { render, screen, fireEvent } from '@testing-library/react';
import {OrderConfirmation} from '@/components/restaurant/OrderConfirmation';

describe('OrderConfirmation Component', () => {
  it('should render nothing when isOpen is false', () => {
    render(<OrderConfirmation isOpen={false} onClose={() => {}} orderNumber="12345" />);
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('should render the modal when isOpen is true', () => {
    render(<OrderConfirmation isOpen={true} onClose={() => {}} orderNumber="12345" />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Order Confirmed!')).toBeInTheDocument();
    expect(screen.getByText('Your order has been received and is being prepared.')).toBeInTheDocument();
    expect(screen.getByText('Order Number')).toBeInTheDocument();
    expect(screen.getByText('12345')).toBeInTheDocument();
    expect(screen.getByText('Estimated Preparation Time')).toBeInTheDocument();
    expect(screen.getByText('Your order will be ready in approximately 25-30 minutes. You can pick it up at the restaurant or we\'ll deliver it to your room.')).toBeInTheDocument();
    expect(screen.getByText('Order Status')).toBeInTheDocument();
    expect(screen.getByText('Order received')).toBeInTheDocument();
    expect(screen.getByText('Preparing your food')).toBeInTheDocument();
    expect(screen.getByText('Ready for pickup/delivery')).toBeInTheDocument();
    expect(screen.getByText('Continue Browsing')).toBeInTheDocument();
  });

  it('should display the correct order number', () => {
    render(<OrderConfirmation isOpen={true} onClose={() => {}} orderNumber="9876" />);
    expect(screen.getByText('9876')).toBeInTheDocument();
  });

  it('should call onClose function when the button is clicked', () => {
    const onCloseMock = jest.fn();
    render(<OrderConfirmation isOpen={true} onClose={onCloseMock} orderNumber="12345" />);
    fireEvent.click(screen.getByText('Continue Browsing'));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('should have the correct accessibility roles', () => {
    render(<OrderConfirmation isOpen={true} onClose={() => {}} orderNumber="12345" />);
    expect(screen.getByRole('dialog')).toHaveClass('fixed'); // Ensure it's treated as a modal
    expect(screen.getByText('Order Confirmed!')).toHaveClass('font-bold'); // Heading
    expect(screen.getByRole('button', { name: 'Continue Browsing' })).toBeInTheDocument();
  });

  it('should have the correct Tailwind CSS classes applied', () => {
    render(<OrderConfirmation isOpen={true} onClose={() => {}} orderNumber="12345" />);
    expect(screen.getByRole('dialog')).toHaveClass('fixed', 'inset-0', 'bg-black', 'bg-opacity-50', 'z-50', 'flex', 'items-center', 'justify-center', 'p-4');
    expect(screen.getByRole('dialog').firstChild).toHaveClass('bg-white', 'rounded-lg', 'max-w-md', 'w-full');
    expect(screen.getByText('Continue Browsing')).toHaveClass('px-4', 'py-2', 'bg-blue-600', 'text-white', 'rounded-md', 'w-full');
  });

  it('should display the checkmark icon', () => {
    render(<OrderConfirmation isOpen={true} onClose={() => {}} orderNumber="12345" />);
    expect(screen.getByTestId('checkmark-icon')).toBeInTheDocument();
  });

  it('should display the clock icon', () => {
    render(<OrderConfirmation isOpen={true} onClose={() => {}} orderNumber="12345" />);
    expect(screen.getByTestId('clock-icon')).toBeInTheDocument();
  });

  it('should display the status icons', () => {
    render(<OrderConfirmation isOpen={true} onClose={() => {}} orderNumber="12345" />);
    expect(screen.getByTestId('status-icon-received')).toBeInTheDocument();
    expect(screen.getByTestId('status-icon-preparing')).toBeInTheDocument();
    expect(screen.getByTestId('status-icon-ready')).toBeInTheDocument();
  });
});