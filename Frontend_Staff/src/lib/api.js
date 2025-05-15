import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  // baseURL: "https://hotel-management-system-backend-b4d8.onrender.com/api/v1",
});
