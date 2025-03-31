import { useState } from 'react';

const AddFood = () => {

  const [activeTab, setActiveTab] = useState('basic');
  const [foodItem, setFoodItem] = useState({
    name: '',
    category: 'main-course',
    status: 'available',
    preparationTime: '', // New field added
    image: null
  });
  const [previewUrl, setPreviewUrl] = useState(null);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodItem({ ...foodItem, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
        setFoodItem({ ...foodItem, image: file });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic here
    console.log('Food item submitted:', foodItem);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-gray-800">Add Food Item</h1>
          <p className="text-gray-600">Create a new delicious item for your menu</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          <button
            className={`px-6 py-3 font-medium ${activeTab === 'basic' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('basic')}
          >
            Basic Information
          </button>
          <button
            className={`px-6 py-3 font-medium ${activeTab === 'details' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('details')}
          >
            Details & Ingredients
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Basic Information Tab */}
          {activeTab === 'basic' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Food Item Name</label>
                <input
                  type="text"
                  name="name"
                  value={foodItem.name}
                  onChange={handleChange}
                  placeholder="Enter food item name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  name="category"
                  value={foodItem.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="appetizer">Appetizer</option>
                  <option value="main-course">Main Course</option>
                  <option value="dessert">Dessert</option>
                  <option value="beverage">Beverage</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={foodItem.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="available">Available</option>
                  <option value="out-of-stock">Out of Stock</option>
                  <option value="seasonal">Seasonal</option>
                </select>
              </div>

              {/* Preparation Time Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preparation Time (minutes)
                </label>
                <input
                  type="number"
                  name="preparationTime"
                  value={foodItem.preparationTime}
                  onChange={handleChange}
                  placeholder="e.g., 30"
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
          )}

          {/* Details & Ingredients Tab */}
          {activeTab === 'details' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Food Image</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  {previewUrl ? (
                    <div className="relative">
                      <img 
                        src={previewUrl} 
                        alt="Preview" 
                        className="mx-auto max-h-48 rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => setPreviewUrl(null)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-center">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">Drag and drop your image here</p>
                      <p className="text-xs text-gray-500">Supports JPG, PNG and GIF up to 5MB</p>
                      <input
                        type="file"
                        id="image-upload"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="image-upload"
                        className="mt-4 inline-block px-4 py-2 bg-blue-50 text-blue-700 rounded-md text-sm cursor-pointer hover:bg-blue-100"
                      >
                        Browse Files
                      </label>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Submit Section */}
          <div className="mt-8 pt-6 border-t">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-800">Ready to add this item?</h3>
              <p className="text-sm text-gray-600 mt-1">This item will be available on your menu after submission.</p>
              <button
                type="submit"
                className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Add Food Item
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFood;