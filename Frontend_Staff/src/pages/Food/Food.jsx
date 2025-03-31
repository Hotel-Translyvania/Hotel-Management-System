// src/pages/Food/Food.jsx
import { useState, useEffect } from 'react';
import AddFood from './AddFood';
import FoodItem from '../../components/Food/FoodItem';


const Food = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  // Sample categories - replace with your actual categories
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'appetizer', name: 'Appetizers' },
    { id: 'main-course', name: 'Main Courses' },
    { id: 'dessert', name: 'Desserts' },
    { id: 'beverage', name: 'Beverages' }
  ];

  // Fetch food items (replace with your API call)
  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        // Simulating API call
        const mockData = [
          {
            id: 1,
            name: 'Margherita Pizza',
            category: 'main-course',
            price: 12.99,
            status: 'available',
            image: '/images/pizza.jpg'
          }, {
            id: 1,
            name: 'Margherita Pizza',
            category: 'main-course',
            price: 12.99,
            status: 'available',
            image: '/images/pizza.jpg'
          },  {
            id: 1,
            name: 'Margherita Pizza',
            category: 'main-course',
            price: 12.99,
            status: 'available',
            image: '/images/pizza.jpg'
          },  {
            id: 1,
            name: 'Margherita Pizza',
            category: 'appetizer',
            price: 12.99,
            status: 'available',
            image: '/images/pizza.jpg'
          }
          // Add more mock items as needed
        ];
        setFoodItems(mockData);
      } catch (error) {
        console.error('Error fetching food items:', error);
      }
    };

    fetchFoodItems();
  }, []);

  // Filter food items based on search and category
  const filteredItems = foodItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Handle adding new food item
  const handleAddFood = (newFoodItem) => {
    setFoodItems([...foodItems, { ...newFoodItem, id: foodItems.length + 1 }]);
    setIsAddFormOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Food Menu Management</h1>
          <p className="text-gray-600">Manage your restaurant's food items</p>
        </div>
        
        <button
          onClick={() => setIsAddFormOpen(true)}
          className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          + Add New Item
        </button>
      </div>

      {/* Search and Filter */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <input
            type="text"
            id="search"
            placeholder="Search food items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Filter by Category
          </label>
          <select
            id="category"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-b-500 focus:border-blue-500"
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Food Items Table */}
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Item
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredItems.length > 0 ? (
              filteredItems.map(item => (
                <FoodItem key={item.id} item={item} />
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No food items found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Food Form Modal */}
      {isAddFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center border-b p-4">
              <h2 className="text-xl font-semibold text-gray-800">Add New Food Item</h2>
              <button
                onClick={() => setIsAddFormOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <AddFood onAddFood={handleAddFood} onCancel={() => setIsAddFormOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Food;