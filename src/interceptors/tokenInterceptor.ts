import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

const API = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

// Interceptor to attach token in each request
API.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => Promise.reject(error)
);

// Optional: Interceptor to handle 401 (unauthorized) errors globally
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default API;
