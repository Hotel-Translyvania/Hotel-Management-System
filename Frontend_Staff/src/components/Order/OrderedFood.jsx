import React from "react";
import foodOrderData from "@/TestData/foodOrderData";
import { useEffect } from "react";
import { foodOrderColumns } from "./orderColumns";
import { CustomTable } from "../Table/Table";
import axios from "axios";
import SpinPage from "@/components/Spin/Spin";

export const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});
const OrderedFood = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [foodOrder, setFoodOrder] = React.useState([]);

  useEffect(() => {
    const fetchFoodOrder = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/hms/hotels/1/orders");
        const data = response.data;
        console.log(data, "data from api");


        const formattedFoodOrder = data.map((food) => ({
          OrderID: food.orderId,
          Status: food.status,
          OrderTime: food.time,
          Notes: food.specialRequest,
          RoomNumber: food.roomNo,
          Item: food.foodItems.map((item) => item.name).join(", "),
          Qty: food.foodItems.map((item) => item.quantity).join(", "),
          Price: food.foodItems.map((item) => item.price).join(", "),
        }));
        setFoodOrder(formattedFoodOrder);
        setError(null);
        console.log(formattedFoodOrder, "formatted food order");
      } catch (error) {
        console.error("Error fetching food order:", error);
        setError("Failed to load food order");
        setFoodOrder([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFoodOrder();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center flex-col items-center p-10">
        <div className="text-center text-gray-500">Loading food...</div>
        <SpinPage />
      </div>
    );
  }

  return (
    <div className="p-2 flex flex-col gap-6">
      <h2 className="text-lg font-semibold font-serif">Ordered Food</h2>
      <CustomTable
        data={foodOrder}
        columns={foodOrderColumns}
        pageSize={8}
        defaultSort={foodOrderColumns.find(
          (column) => column.id === "OrderTime"
        )}
        maxWidth="48"
      />
    </div>
  );
};

export default OrderedFood;
