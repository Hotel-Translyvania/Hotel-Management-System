import PropTypes from 'prop-types';

export function FoodCategories({ categories, selectedCategory, onSelectCategory }) {
  if (!categories || categories.length === 0) {
    return null; // Render nothing if categories array is empty
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Categories</h2>
      <div className="overflow-x-auto">
        <div className="flex space-x-2 pb-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                if (category !== selectedCategory) {
                  onSelectCategory(category); // Only call if category is not already selected
                }
              }}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === category 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

FoodCategories.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCategory: PropTypes.string,
  onSelectCategory: PropTypes.func.isRequired,
};