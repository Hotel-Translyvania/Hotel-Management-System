import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

// Request Interceptor
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// Response Interceptor
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       console.warn("Unauthorized");
//       // handle logout or redirect
//     }
//     return Promise.reject(error);
//   }
// );

export default api;