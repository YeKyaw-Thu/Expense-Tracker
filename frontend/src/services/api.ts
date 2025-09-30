import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Automatically attach token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API.interceptors.response.use(
//   response => response,
//   error => {
//     if (error.response?.status === 401) {
//       // redirect to login
//     }
//     return Promise.reject(error);
//   }
// );

export default API;
