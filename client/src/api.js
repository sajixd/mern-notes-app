import axios from "axios";

// Use environment variable for API URL or default to localhost
// In Vite, env vars must start with VITE_
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

console.log("Using API URL:", API_URL);

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // This is important for cookies
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

// Add a request interceptor to attach the token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log detailed error information for debugging
    console.error('API Request Failed:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
    });

    if (error.response && error.response.status === 401) {
      // Token expired or invalid
      console.log('Unauthorized - removing token');
      localStorage.removeItem('token');
      // Optional: Redirect to login or trigger a global state update
      // window.location.href = '/'; 
    }

    // Network error (server unreachable)
    if (!error.response) {
      console.error('Network Error: Server might be unreachable');
    }

    return Promise.reject(error);
  }
);

export default api;
