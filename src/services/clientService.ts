import API from "../interceptors/tokenInterceptor";
const API_URL = import.meta.env.VITE_API_URL;


export const getAllClients = async () => {
    const response = await API.get(`${API_URL}/api/v1/trainer/clients`);
    return response.data;
}


export const addClientByTrainer = async (data: FormData) => {
    const response = await API.post(`${API_URL}/api/v1/trainer/clients`, data);
    return response.data;
}