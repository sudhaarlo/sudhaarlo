import axios from "axios";

// Base URL of backend (adjust if needed)
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Add token automatically for authenticated requests
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    // ensure headers object exists before assigning
    config.headers = config.headers || {};
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// -------- AUTH APIs --------
export const registerUser = (formData) => API.post("/auth/register", formData);
export const loginUser = (formData) => API.post("/auth/login", formData);

export default API;
