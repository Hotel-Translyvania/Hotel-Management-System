// tests/components/restaurant/FoodItems.test.jsx
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { FoodItems } from '@/components/restaurant/FoodItems';
import '@testing-library/jest-dom';

describe('FoodItems Component', () => {
  const mockItems = [
    {
      id: '1',
      name: 'Margherita Pizza',
      price: 12.99,
      description: 'Classic pizza with tomato sauce and mozzarella',
      image: '/pizza.jpg',
      category: 'Pizza',
      popular: true
    },
    {
      id: '2',
      name: 'Caesar Salad',
      price: 8.99,
      description: 'Romaine lettuce with Caesar dressing and croutons',
      image: '/salad.jpg',
      category: 'Salad',
      popular: false
    }
  ];

  const mockOnAddToCart = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Basic Rendering Tests
  describe('Rendering', () => {
    it('should render all food items', () => {
      render(<FoodItems items={mockItems} onAddToCart={mockOnAddToCart} />);
      
      mockItems.forEach(item => {
        expect(screen.getByText(item.name)).toBeInTheDocument();
        expect(screen.getByText(`$${item.price.toFixed(2)}`)).toBeInTheDocument();
      });
    });

    it('should show popular badge for popular items', () => {
      render(<FoodItems items={mockItems} onAddToCart={mockOnAddToCart} />);
      
      const popularItem = mockItems.find(item => item.popular);
      expect(screen.getByText('Popular')).toBeInTheDocument();
      expect(screen.getByText('Popular')).toHaveClass('bg-blue-600');
    });

    it('should not show popular badge for non-popular items', () => {
      render(<FoodItems items={mockItems} onAddToCart={mockOnAddToCart} />);
      
      const nonPopularItem = mockItems.find(item => !item.popular);
      expect(screen.queryAllByText('Popular')).toHaveLength(1); // Only one popular item
    });

    it('should render placeholder image when image fails to load', async () => {
      render(<FoodItems items={mockItems} onAddToCart={mockOnAddToCart} />);
      
      const images = screen.getAllByRole('img');
      fireEvent.error(images[0]);
      
      await waitFor(() => {
        expect(images[0]).toHaveAttribute('src', '/placeholder.svg');
      });
    });
  });

  // Quick Order Functionality
  describe('Quick Order', () => {
    it('should call onAddToCart with quantity 1 when Order button is clicked', () => {
      render(<FoodItems items={mockItems} onAddToCart={mockOnAddToCart} />);
      
      const orderButtons = screen.getAllByText('Order');
      fireEvent.click(orderButtons[0]);
      
      expect(mockOnAddToCart).toHaveBeenCalledTimes(1);
      expect(mockOnAddToCart).toHaveBeenCalledWith(mockItems[0], 1, undefined);
    });
  });

  // Details Dialog Functionality
  describe('Details Dialog', () => {
    it('should open dialog when Details button is clicked', async () => {
      render(<FoodItems items={mockItems} onAddToCart={mockOnAddToCart} />);
      
      const detailsButtons = screen.getAllByRole('button', { name: /Details/i });
      fireEvent.click(detailsButtons[0]);
      
      // Ensure dialog is open
      await waitFor(() => {
        const dialog = screen.getByRole('dialog');
        expect(dialog).toBeInTheDocument();
        expect(within(dialog).getByText(mockItems[0].name)).toBeInTheDocument();
        expect(within(dialog).getByText(mockItems[0].description)).toBeInTheDocument();
      });
    });

    it('should close dialog when Cancel button is clicked', async () => {
      render(<FoodItems items={mockItems} onAddToCart={mockOnAddToCart} />);

      // Open dialog
      const detailsButtons = screen.getAllByRole('button', { name: /Details/i });
      fireEvent.click(detailsButtons[0]);

      // Ensure dialog is open
      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();

      // Close dialog
      const cancelButton = within(dialog).getByRole('button', { name: /Cancel/i });
      fireEvent.click(cancelButton);

      // Wait for dialog to be removed
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });

    it('should update quantity when increment/decrement buttons are clicked', () => {
      render(<FoodItems items={mockItems} onAddToCart={mockOnAddToCart} />);

      // Open dialog
      const detailsButtons = screen.getAllByRole('button', { name: /Details/i });
      fireEvent.click(detailsButtons[0]);

      // Test increment
      const incrementButton = screen.getByTestId('increment-quantity');
      fireEvent.click(incrementButton);
      expect(screen.getByText('2')).toBeInTheDocument();

      // Test decrement (should not go below 1)
      const decrementButton = screen.getByTestId('decrement-quantity');
      fireEvent.click(decrementButton);
      expect(screen.getByText('1')).toBeInTheDocument();
      fireEvent.click(decrementButton); // Click again, should stay at 1
      expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('should handle special instructions input', () => {
      render(<FoodItems items={mockItems} onAddToCart={mockOnAddToCart} />);
      
      // Open dialog
      const detailsButtons = screen.getAllByRole('button', { name: /Details/i });
      fireEvent.click(detailsButtons[0]);
      
      const instructions = "No onions please";
      const textarea = screen.getByPlaceholderText('Any special requests or allergies?');
      fireEvent.change(textarea, { target: { value: instructions } });
      
      expect(textarea).toHaveValue(instructions);
    });

    it('should call onAddToCart with correct parameters when Order button in dialog is clicked', () => {
      render(<FoodItems items={mockItems} onAddToCart={mockOnAddToCart} />);
      
      // Open dialog
      const detailsButtons = screen.getAllByRole('button', { name: /Details/i });
      fireEvent.click(detailsButtons[0]);
      
      // Set quantity to 2
      const incrementButton = screen.getByTestId('increment-quantity');
      fireEvent.click(incrementButton);
      
      // Set special instructions
      const instructions = "Extra cheese";
      const textarea = screen.getByPlaceholderText('Any special requests or allergies?');
      fireEvent.change(textarea, { target: { value: instructions } });
      
      // Click Order button in dialog
      fireEvent.click(screen.getByText(/Order - \$/));
      
      expect(mockOnAddToCart).toHaveBeenCalledTimes(1);
      expect(mockOnAddToCart).toHaveBeenCalledWith(
        mockItems[0],
        2,
        instructions
      );
    });
  });

  // Edge Cases
  describe('Edge Cases', () => {
    it('should render nothing when items array is empty', () => {
      const { container } = render(<FoodItems items={[]} onAddToCart={mockOnAddToCart} />);
      expect(container).toBeEmptyDOMElement();
    });

    it('should handle missing image property', () => {
      const itemsWithoutImages = mockItems.map(item => ({ ...item, image: undefined }));
      render(<FoodItems items={itemsWithoutImages} onAddToCart={mockOnAddToCart} />);
      
      const images = screen.getAllByRole('img');
      expect(images[0]).toHaveAttribute('src', '/placeholder.svg');
    });
  });
});