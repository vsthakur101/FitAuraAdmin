import axios from "axios";
import { Trainer } from "../types";
const API_URL = import.meta.env.VITE_API_URL;

export const getTrainerProfile = async (): Promise<Trainer> => {
    return Promise.resolve({
        id: 1,
        name: "Vidhya Sagar",
        email: "vidhya@example.com",
        role: "trainer",
        avatarUrl: "", // Optional for now
    });
};

export const updateTrainerProfile = async (data: Partial<Trainer>) => {
    console.log("Updated profile:", data);
    return Promise.resolve({ message: "Profile updated!" });
};

export const login = async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/api/v1/auth/login`, { email, password });
    return response.data;
};

export const sendOtp = async (email: string) => {
    const response = await axios.post(`${API_URL}/api/v1/auth/forgot-password`, { email });
    return response.data;
};

export const verifyOtp = async (email: string, otp: string) => {
    const response = await axios.post(`${API_URL}/api/v1/auth/verify-otp`, { email, otp });
    return response.data;
};

export const resetPassword = async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/api/v1/auth/reset-password`, {
        email,
        newPassword: password
    });
    return response.data;
};


export const getProfile = async () => {
    const response = await axios.get(`${API_URL}/api/v1/auth/me`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return response.data;
};

