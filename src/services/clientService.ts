import API from "../interceptors/tokenInterceptor";
import { FullClient, Note } from "../types";
const API_URL = import.meta.env.VITE_API_URL;


export const getTrainerNotes = async (): Promise<Note[]> => {
    return Promise.resolve([
        {
            id: 1,
            content: "Increased squat weight today",
            date: "2025-04-15",
            clientId: 1,
            clientName: "Rahul Sharma", // 👈 This line must be present
        },
    ]);
};
export const getClientDetail = async (id: number): Promise<FullClient> => {
    return Promise.resolve({
        id,
        name: "Rahul Sharma",
        age: 28,
        gender: "Male",
        assignedPlan: {
            name: "Fat Loss Program",
            assignedOn: "2025-04-10",
        },
        notes: [
            {
                id: 1,
                content: "Good improvement in squats",
                date: "2025-04-14",
                clientId: id,
                clientName: "Rahul Sharma"
            },
        ],
    });
};

export const getAllClients = async () => {
    const response = await API.get(`${API_URL}/api/v1/trainer/clients`);
    return response.data;
}