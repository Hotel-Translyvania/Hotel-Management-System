import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/v1";

export const useFoodStore = create((set, get) => ({
  foodItems: [],
  isLoading: false,
  error: null,
  initialized: false,

  fetchFood: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_BASE_URL}/hotels/1/menu`);
      const data = response.data;
      const formattedFood = data.map((food) => ({
        id: food.id,
        Name: food.name,
        Ingredients: food.ingredients,
        Status: food.status,
        Category: food.category,
        Price: food.price,
        picture: food.image,
        EstimatedPreparationTime: food.timeToMake,
      }));
      console.log("Fetched food items:", formattedFood);
      set({
        foodItems: formattedFood,
        initialized: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error("Error fetching food items:", error);
      set({
        foodItems: [],
        isLoading: false,
        error: "Failed to load food items",
      });
    }
  },

  addfood: async (foodItem) => {
    const IngredientArray = foodItem.ingredients
      .split(",")
      .map((item) => item.trim());
    const formData = new FormData();
    formData.append("ingredients", JSON.stringify(IngredientArray));
    formData.append("name", foodItem.name);
    formData.append("category", foodItem.category);
    formData.append("timeToMake", foodItem.preparationTime);
    formData.append("price", foodItem.price);
    formData.append("image", foodItem.image);
    formData.append("status", foodItem.status);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/hms/hotels/1/food`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Food item added successfully:", response.data);
      const newFoodItem = {
        // can i generate temporary id here?
        id: response?.data?.id || Math.random().toString(36).substr(2, 9),
        Name: foodItem.name,
        Ingredients: IngredientArray,
        Status: foodItem.status,
        Category: foodItem.category,
        Price: foodItem.price,
        image: response?.data?.image,
        EstimatedPreparationTime: foodItem.preparationTime,
        picture: response?.data?.image,
      };
      set((state) => ({
        foodItems: [...state.foodItems, newFoodItem],
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      console.error("Error adding food item:", error);
      set({
        isLoading: false,
        error: "Failed to add food item",
      });
    }
  },

  deleteFood: async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/hms/hotels/1/food/${id}`);
      set((state) => ({
        foodItems: state.foodItems.filter((food) => food.id !== id),

        error: null,
      }));
    } catch (error) {
      console.error("Error deleting food item:", error);
      set({
        isLoading: false,
        error: "Failed to delete food item",
      });
    }
  },
}));
