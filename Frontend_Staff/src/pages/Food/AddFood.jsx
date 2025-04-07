import { useState } from "react";
import axios from "axios";
import SpinPage from "@/components/Spin/Spin";

export const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

const AddFood = ({ onSuccess }) => {
  const [activeTab, setActiveTab] = useState("basic");
  const [foodItem, setFoodItem] = useState({
    name: "",
    category: "",
    preparationTime: "",
    ingredients: "",
    price: "",
    image: null,
    status: "available",
  });
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!previewUrl) {
      alert("Please upload an image before submitting.");
      return;
    }
    const IngredientArray = foodItem.ingredients
      .split(",")
      .map((item) => item.trim());
    console.log(foodItem);
    const formData = new FormData();
    formData.append("ingredients", JSON.stringify(IngredientArray));
    formData.append("name", foodItem.name);
    formData.append("categories", foodItem.category);
    formData.append("timeToMake", foodItem.preparationTime);
    formData.append("price", foodItem.price);
    formData.append("image", foodItem.image);
    formData.append("status", foodItem.status);

    setIsLoading(true);
    try {
      const response = await api.post("/hms/hotels/1/food", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);
      setError(null);
      onSuccess();
      alert("Food item added successfully!");
    } catch (error) {
      console.error("Error adding food item:", error);
      setError("Failed to add food item. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center flex-col items-center p-10">
        <div className="text-center text-gray-500">Adding food...</div>
        <SpinPage />
      </div>
    );
  }

  return (
    <div className=" p-6 ">
      <h1 className="text-xl font-bold text-gray-800">Add Food Item</h1>
      <p className="text-gray-600 mb-4">
        Create a new delicious item for your menu
      </p>

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
                className="w-full px-3 py-2 border rounded"
                required
              />
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

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={foodItem.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              >
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </select>
            </div>

            <button
              type="button"
              onClick={() => {
                if (
                  foodItem.name &&
                  foodItem.category &&
                  foodItem.preparationTime &&
                  foodItem.status &&
                  foodItem.price
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
                ingredients
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
              Upload Image
            </label>
            <div className="border-dashed border-2 border-gray-300 p-6 text-center rounded-lg">
              {previewUrl ? (
                <div className="relative">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="mx-auto h-32 rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => setPreviewUrl(null)}
                    className="absolute top-2 right-2 bg-gray-900 text-white p-1 rounded-full"
                  >
                    X
                  </button>
                </div>
              ) : (
                <>
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden rounded-full"
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
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-green-600"
            >
              Add Food Item
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddFood;
