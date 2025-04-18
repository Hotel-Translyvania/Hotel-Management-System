// tests/components/Cart.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Cart } from '@/components/restaurant/Cart'; // Adjust import path as needed
import '@testing-library/jest-dom';

const mockCartItems = [
  {
    id: '1',
    foodItem: {
      id: '101',
      name: 'Margherita Pizza',
      price: 12.99,
      image: '/pizza.jpg'
    },
    quantity: 2,
    specialInstructions: 'Extra cheese'
  },
  {
    id: '2',
    foodItem: {
      id: '102',
      name: 'Caesar Salad',
      price: 8.99,
      image: '/salad.jpg'
    },
    quantity: 1
  }
];

describe('Cart Component', () => {
  const mockOnClose = jest.fn();
  const mockOnUpdateQuantity = jest.fn();
  const mockOnRemoveItem = jest.fn();
  const mockOnCheckout = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Visibility Tests
  describe('Visibility', () => {
    it('should not render when isOpen is false', () => {
      render(<Cart isOpen={false} onClose={mockOnClose} cartItems={[]} />);
      expect(screen.queryByText('Your Orders')).not.toBeInTheDocument();
    });

    it('should render when isOpen is true', () => {
      render(<Cart isOpen={true} onClose={mockOnClose} cartItems={[]} />);
      expect(screen.getByText('Your Orders')).toBeInTheDocument();
    });
  });

  // Empty State
  describe('Empty Cart', () => {
    it('should display empty cart message when no items', () => {
      render(
        <Cart
          isOpen={true}
          onClose={mockOnClose}
          cartItems={[]}
          total={0}
        />
      );

      expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
      expect(screen.getByText('Add some delicious items from our menu to get started.')).toBeInTheDocument();
      expect(screen.getByText('Browse Menu')).toBeInTheDocument();
    });

    it('should call onClose when Browse Menu button is clicked', () => {
      render(
        <Cart
          isOpen={true}
          onClose={mockOnClose}
          cartItems={[]}
          total={0}
        />
      );

      fireEvent.click(screen.getByText('Browse Menu'));
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  // With Items
  describe('With Cart Items', () => {
    it('should display all cart items', () => {
      render(
        <Cart
          isOpen={true}
          onClose={mockOnClose}
          cartItems={mockCartItems}
          onUpdateQuantity={mockOnUpdateQuantity}
          onRemoveItem={mockOnRemoveItem}
          total={34.97}
        />
      );

      expect(screen.getByText('Margherita Pizza')).toBeInTheDocument();
      expect(screen.getByText('Caesar Salad')).toBeInTheDocument();
      expect(screen.getByText((content) => content.includes('Extra cheese'))).toBeInTheDocument();
    });

    it('should display correct quantities and prices', () => {
      render(
        <Cart
          isOpen={true}
          onClose={mockOnClose}
          cartItems={mockCartItems}
          onUpdateQuantity={mockOnUpdateQuantity}
          onRemoveItem={mockOnRemoveItem}
          total={34.97}
        />
      );

      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('$12.99')).toBeInTheDocument();
      const priceElements = screen.getAllByText('$8.99');
      expect(priceElements.length).toBeGreaterThan(0);
      expect(screen.getByText('$25.98')).toBeInTheDocument(); // 12.99 * 2
    });

    it('should call onUpdateQuantity when quantity buttons are clicked', () => {
      render(
        <Cart
          isOpen={true}
          onClose={mockOnClose}
          cartItems={mockCartItems}
          onUpdateQuantity={mockOnUpdateQuantity}
          onRemoveItem={mockOnRemoveItem}
          total={34.97}
        />
      );

      const decreaseButtons = screen.getAllByTestId('decrease-quantity');
      const increaseButtons = screen.getAllByTestId('increase-quantity');

      fireEvent.click(decreaseButtons[0]);
      expect(mockOnUpdateQuantity).toHaveBeenCalledWith('1', 1);

      fireEvent.click(increaseButtons[0]);
      expect(mockOnUpdateQuantity).toHaveBeenCalledWith('1', 3);
    });

    it('should call onRemoveItem when remove button is clicked', () => {
      render(
        <Cart
          isOpen={true} // Ensure the cart is open
          onClose={mockOnClose}
          cartItems={mockCartItems} // Provide valid cart items
          onUpdateQuantity={mockOnUpdateQuantity}
          onRemoveItem={mockOnRemoveItem} // Pass the mock function
          total={34.97}
        />
      );

      const removeButtons = screen.getAllByTestId('remove-item');
      fireEvent.click(removeButtons[0]);
      expect(mockOnRemoveItem).toHaveBeenCalledWith('1');
    });

    it('should handle image fallback correctly', () => {
      render(
        <Cart
          isOpen={true}
          onClose={jest.fn()}
          cartItems={mockCartItems}
          onUpdateQuantity={jest.fn()}
          onRemoveItem={jest.fn()}
          total={34.97}
        />
      );

      const images = screen.getAllByRole('img');
      fireEvent.error(images[0]);
      expect(images[0]).toHaveAttribute('src', '/placeholder.svg');
    });

    it('should call onUpdateQuantity with correct values', () => {
      render(
        <Cart
          isOpen={true}
          onClose={jest.fn()}
          cartItems={mockCartItems}
          onUpdateQuantity={mockOnUpdateQuantity}
          onRemoveItem={jest.fn()}
          total={34.97}
        />
      );

      const decreaseButton = screen.getAllByRole('button', { name: /decrease quantity/i })[0];
      const increaseButton = screen.getAllByRole('button', { name: /increase quantity/i })[0];

      fireEvent.click(decreaseButton);
      expect(mockOnUpdateQuantity).toHaveBeenCalledWith('1', 1);

      fireEvent.click(increaseButton);
      expect(mockOnUpdateQuantity).toHaveBeenCalledWith('1', 3);
    });

    it('should call onRemoveItem with correct id', () => {
      render(
        <Cart
          isOpen={true}
          onClose={jest.fn()}
          cartItems={mockCartItems}
          onUpdateQuantity={jest.fn()}
          onRemoveItem={mockOnRemoveItem}
          total={34.97}
        />
      );

      const removeButton = screen.getAllByTestId('remove-item')[0];
      fireEvent.click(removeButton);
      expect(mockOnRemoveItem).toHaveBeenCalledWith('1');
    });
  });

  // Checkout Section
  describe('Checkout Section', () => {
    it('should display correct totals', () => {
      render(
        <Cart
          isOpen={true}
          onClose={mockOnClose}
          cartItems={mockCartItems}
          onUpdateQuantity={mockOnUpdateQuantity}
          onRemoveItem={mockOnRemoveItem}
          total={34.97}
          onCheckout={mockOnCheckout}
        />
      );

      expect(screen.getByText('$34.97')).toBeInTheDocument();
      expect(screen.getByText('$3.50')).toBeInTheDocument(); // 10% tax
      expect(screen.getByText('$38.47')).toBeInTheDocument(); // total with tax
    });

    it('should call onCheckout when Place Order button is clicked', () => {
      render(
        <Cart
          isOpen={true}
          onClose={mockOnClose}
          cartItems={mockCartItems}
          onUpdateQuantity={mockOnUpdateQuantity}
          onRemoveItem={mockOnRemoveItem}
          total={34.97}
          onCheckout={mockOnCheckout}
        />
      );

      fireEvent.click(screen.getByText('Place Order'));
      expect(mockOnCheckout).toHaveBeenCalled();
    });

    it('should call onClose when Cancel button is clicked', () => {
      render(
        <Cart
          isOpen={true}
          onClose={mockOnClose}
          cartItems={mockCartItems}
          onUpdateQuantity={mockOnUpdateQuantity}
          onRemoveItem={mockOnRemoveItem}
          total={34.97}
          onCheckout={mockOnCheckout}
        />
      );

      // Update the test to use the new aria-label for the "Cancel" button
      const cancelButton = screen.getByLabelText('Close Cart');
      fireEvent.click(cancelButton);
      expect(mockOnClose).toHaveBeenCalled();
    });
  });
});