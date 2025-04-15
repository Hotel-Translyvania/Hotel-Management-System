import { useState } from "react";

const EditFood = ({ onSuccess, foodItem: initialFoodItem }) => {
  const [activeTab, setActiveTab] = useState("basic");
  // console.log(initialFoodItem)
  const [foodItem, setFoodItem] = useState({
    id: initialFoodItem.id,
    name: initialFoodItem.Name,
    category: initialFoodItem.Category,
    status: initialFoodItem.Status.toLowerCase().replace(" ", "-"),
    preparationTime: initialFoodItem.EstimatedPreparationTime,
    ingredients: initialFoodItem.Ingredients,
    price: initialFoodItem.Price,
    image: initialFoodItem.picture,
  });
  const [previewUrl, setPreviewUrl] = useState(initialFoodItem.picture);

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
    console.log(foodItem, previewUrl);
    onSuccess();
  };

  return (
    <div className=" p-6 ">
      <h1 className="text-xl font-bold text-gray-800">Edit Food Item</h1>

      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 flex-1 text-sm font-medium ${
            activeTab === "basic"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("basic")}
        >
          Basic Info
        </button>
        <button
          className={`px-4 py-2 flex-1 text-sm font-medium ${
            activeTab === "details"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("details")}
        >
          Details
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {activeTab === "basic" && (
          <div className="space-y-3">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Food Name
              </label>
              <input
                type="text"
                name="name"
                value={foodItem.name}
                onChange={handleChange}
                placeholder="Food Item Name"
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={foodItem.category}
                onChange={handleChange}
                placeholder="e.g. Pizza, Burger"
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={foodItem.price}
                onChange={handleChange}
                placeholder="Price"
                min="1"
                step="0.01"
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={foodItem.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="available">Available</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preparation Time (in minutes)
              </label>
              <input
                type="number"
                name="preparationTime"
                value={foodItem.preparationTime}
                onChange={handleChange}
                placeholder="Preparation Time (mins)"
                min="1"
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <button
              type="button"
              onClick={() => {
                if (
                  foodItem.name &&
                  foodItem.category &&
                  foodItem.status &&
                  foodItem.preparationTime
                ) {
                  setActiveTab("details");
                } else {
                  alert("Please fill all fields before proceeding.");
                }
              }}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Next
            </button>
          </div>
        )}

        {activeTab === "details" && (
          <div className="space-y-4 w-full">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ingredients
              </label>
              <textarea
                name="ingredients"
                value={foodItem.ingredients}
                onChange={handleChange}
                placeholder="List of ingredients"
                className="w-full px-3 py-2 border rounded"
                rows="4"
                required
              ></textarea>
            </div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Food Image
            </label>
            <div className="border-dashed border-2 border-gray-300 p-6 text-center rounded-lg">
              {previewUrl ? (
                <div className="relative">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="mx-auto h-32 rounded-md"
                  />
                  <div className="mt-2">
                    <input
                      type="file"
                      id="image-upload"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="image-upload"
                      className="text-blue-600 cursor-pointer text-sm"
                    >
                      Change Image
                    </label>
                    <button
                      type="button"
                      onClick={() => setPreviewUrl(null)}
                      className="ml-2 text-red-600 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="image-upload"
                    className="text-blue-600 cursor-pointer"
                  >
                    Upload Image
                  </label>
                </>
              )}
            </div>
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setActiveTab("basic")}
                className="flex-1 bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-green-600"
              >
                Update Food Item
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default EditFood;