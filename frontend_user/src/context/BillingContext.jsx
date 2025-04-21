// src/context/BillingContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const BillingContext = createContext();

export const useBilling = () => useContext(BillingContext);

// Helper to get from localStorage
const getStored = (key, fallback) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
};

export const BillingProvider = ({ children }) => {
  const [booking, setBooking] = useState(() => getStored("booking", null));
  const [restaurantOrders, setRestaurantOrders] = useState(() =>
    getStored("restaurantOrders", [])
  );

  // Sync booking to localStorage
  useEffect(() => {
    localStorage.setItem("booking", JSON.stringify(booking));
  }, [booking]);

  // Sync restaurant orders to localStorage
  useEffect(() => {
    localStorage.setItem("restaurantOrders", JSON.stringify(restaurantOrders));
  }, [restaurantOrders]);

  return (
    <BillingContext.Provider
      value={{ booking, setBooking, restaurantOrders, setRestaurantOrders }}
    >
      {children}
    </BillingContext.Provider>
  );
};
