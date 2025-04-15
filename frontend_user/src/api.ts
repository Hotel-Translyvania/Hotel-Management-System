// api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

// Signup function
export const signup = async (data: any) => {
  try {
    const response = await api.post("/auth/signup", data);
    return response.data; // Return response data for further use (like a token)
  } catch (error) {
    throw new Error(error.response?.data?.message || "Signup failed");
  }
};

// Login function
export const login = async (data: any) => {
  try {
    const response = await api.post("/auth/login", data);
    return response.data; // Return response data for further use (like a token)
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

// Fetch all hotels
export const getHotels = async () => {
  try {
    const response = await api.get("/hotels");
    console.log("API Response:", response.data);
    
    // Return the data array from the response
    if (response.data && response.data.Success && Array.isArray(response.data.data)) {
      return response.data.data;
    }
    throw new Error("Invalid hotels data format");
  } catch (error: any) {
    console.error("API Error:", error);
    throw new Error(
      error.response?.data?.message || 
      error.message || 
      "Failed to fetch hotels"
    );
  }
};

export default api;