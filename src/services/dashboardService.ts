import API from "../interceptors/tokenInterceptor";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchStats = async () => {
    const response = await API.get(`${API_URL}/api/v1/trainer/dashboard-stats`);
    return response.data;
};
