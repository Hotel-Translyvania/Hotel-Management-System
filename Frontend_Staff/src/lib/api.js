import axios from "axios";

export const api = axios.create({
  baseURL: "https://hotel-management-system-backend-b4d8.onrender.com/api/v1",
});
