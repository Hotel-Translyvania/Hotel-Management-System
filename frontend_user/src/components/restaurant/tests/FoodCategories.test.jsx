// tests/components/FoodCategories.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { FoodCategories } from '@/components/restaurant/FoodCategories'; // Adjust import path as needed
import '@testing-library/jest-dom';

describe('FoodCategories Component', () => {
  const mockCategories = ['All', 'Pizza', 'Salad', 'Dessert', 'Drinks'];
  const mockSelectedCategory = 'Pizza';
  const mockOnSelectCategory = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Rendering Tests
  describe('Rendering', () => {
    it('should render all categories', () => {
      render(
        <FoodCategories 
          categories={mockCategories}
          selectedCategory={mockSelectedCategory}
          onSelectCategory={mockOnSelectCategory}
        />
      );

      expect(screen.getByText('Categories')).toBeInTheDocument();
      mockCategories.forEach(category => {
        expect(screen.getByText(category)).toBeInTheDocument();
      });
    });

    it('should display the selected category with active styling', () => {
      render(
        <FoodCategories 
          categories={mockCategories}
          selectedCategory={mockSelectedCategory}
          onSelectCategory={mockOnSelectCategory}
        />
      );

      const selectedButton = screen.getByText(mockSelectedCategory);
      expect(selectedButton).toHaveClass('bg-blue-600');
      expect(selectedButton).toHaveClass('text-white');
    });

    it('should display non-selected categories with default styling', () => {
      render(
        <FoodCategories 
          categories={mockCategories}
          selectedCategory={mockSelectedCategory}
          onSelectCategory={mockOnSelectCategory}
        />
      );

      const nonSelectedCategories = mockCategories.filter(c => c !== mockSelectedCategory);
      nonSelectedCategories.forEach(category => {
        const button = screen.getByText(category);
        expect(button).toHaveClass('bg-gray-100');
        expect(button).toHaveClass('hover:bg-gray-200');
        expect(button).not.toHaveClass('bg-blue-600');
      });
    });
  });

  // Interaction Tests
  describe('Interactions', () => {
    it('should call onSelectCategory with the clicked category', () => {
      render(
        <FoodCategories 
          categories={mockCategories}
          selectedCategory={mockSelectedCategory}
          onSelectCategory={mockOnSelectCategory}
        />
      );

      const newCategory = 'Dessert';
      fireEvent.click(screen.getByText(newCategory));
      expect(mockOnSelectCategory).toHaveBeenCalledTimes(1);
      expect(mockOnSelectCategory).toHaveBeenCalledWith(newCategory);
    });

    it('should not call onSelectCategory when clicking the already selected category', () => {
      render(
        <FoodCategories 
          categories={mockCategories}
          selectedCategory={mockSelectedCategory}
          onSelectCategory={mockOnSelectCategory}
        />
      );

      fireEvent.click(screen.getByText(mockSelectedCategory));
      expect(mockOnSelectCategory).not.toHaveBeenCalled();
    });
  });

  // Edge Cases
  describe('Edge Cases', () => {
    it('should render nothing if categories array is empty', () => {
      const { container } = render(
        <FoodCategories 
          categories={[]}
          selectedCategory=""
          onSelectCategory={mockOnSelectCategory}
        />
      );

      expect(container).toBeEmptyDOMElement();
    });

    it('should handle no selected category gracefully', () => {
      render(
        <FoodCategories 
          categories={mockCategories}
          selectedCategory={null}
          onSelectCategory={mockOnSelectCategory}
        />
      );

      mockCategories.forEach(category => {
        const button = screen.getByText(category);
        expect(button).toHaveClass('bg-gray-100');
      });
    });
  });
});