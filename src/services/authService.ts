import { Trainer } from "../types";

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
