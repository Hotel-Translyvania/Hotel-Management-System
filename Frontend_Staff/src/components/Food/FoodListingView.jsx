import { useState, useEffect } from "react";
import FoodCard from "./foodCard";
import FoodPagination from "./foodPagination";
import FoodToolbar from "./foodToolBar";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import AddFood from "@/pages/Food/AddFood";
import OrderedFood from "../Order/OrderedFood";
import EditFood from "@/pages/Food/EditFood";
import axios from "axios";
import SpinPage from "@/components/Spin/Spin";

export const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

export const FoodListingView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 12;
  const [addFoodOpen, setAddFoodOpen] = useState(false);
  const [orderFoodOpen, setOrderFoodOpen] = useState(false);
  const [editFoodOpen, setEditFoodOpen] = useState(false);
  const [foodItem, setFoodItem] = useState(null);

  const [food, setFood] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/hotels/1/menu");
        const data = response.data;
        console.log(data, "data from api");
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
        setFood(formattedFood);
        setError(null);
      } catch (error) {
        console.error("Error fetching food:", error);
        setError("Failed to load food");
        setFood([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFood();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center flex-col items-center p-10">
        <div className="text-center text-gray-500">Loading food...</div>
        <SpinPage />
      </div>
    );
  }
  console.log(food);
  const filteredFoods = food.filter((food) => {
    const lowerSearchTerm = searchTerm.toLowerCase();

    return (
      food.Name.toLowerCase().includes(lowerSearchTerm) ||
      food.Status.toLowerCase().includes(lowerSearchTerm) ||
      food.Category.toLowerCase().includes(lowerSearchTerm) ||
      food.Ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(lowerSearchTerm)
      ) ||
      String(food.Price).includes(searchTerm) 
    );
  });

  const pageCount = Math.ceil(filteredFoods.length / itemsPerPage);
  const paginatedFoods = filteredFoods.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="flex flex-col gap-6 p-4 rounded-lg bg-white">
      <div>
        <FoodToolbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          buttonText="Add Food"
          onAddClick={() => setAddFoodOpen(true)}
          onOrderClick={() => setOrderFoodOpen(true)}
        />
      </div>
      <div className="flex flex-wrap gap-5 justify-center">
        {paginatedFoods.map((food) => (
          <FoodCard
            key={food.id}
            food={food}
            onEditClick={() => {
              setEditFoodOpen(true);
              setFoodItem(food);
            }}
          />
        ))}
      </div>

      <FoodPagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageCount={pageCount}
      />

      <Dialog open={addFoodOpen} onOpenChange={setAddFoodOpen}>
        <DialogContent className="sm:max-w-3xl">
          <AddFood onSuccess={() => setAddFoodOpen(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={orderFoodOpen} onOpenChange={setOrderFoodOpen}>
        <DialogContent>
          <OrderedFood />
        </DialogContent>
      </Dialog>
      <Dialog open={editFoodOpen} onOpenChange={setEditFoodOpen}>
        <DialogContent className="sm:max-w-3xl">
          <EditFood
            foodItem={foodItem}
            onSuccess={() => setEditFoodOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
