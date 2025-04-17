import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
export interface Reminder {
    id: number;
    title: string;
    description: string;
    date: string;
    time: string;
    repeat: "once" | "daily" | "weekly" | "monthly"; // or just string
}

export const addReminder = async (
    reminder: Omit<Reminder, "id">
) => {
    try {
        const response = await axios.post(`${API_URL}/api/v1/schedule`, reminder);
        return response.data;
    } catch (error) {
        console.error("Error adding reminder:", error);
        throw error;
    }
};

export const getAllReminders = async (id: number): Promise<Reminder[]> => {
    const response = await axios.get(`${API_URL}/api/v1/trainer/${id}/upcoming-schedule`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return response.data.schedules || [];
};
