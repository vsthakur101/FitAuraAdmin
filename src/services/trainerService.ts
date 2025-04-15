import { FullClient, Note } from "../types";

export const getTrainerClients = async (): Promise<FullClient[]> => {
    return Promise.resolve([
        {
            id: 1,
            name: "Rahul Sharma",
            age: 28,
            gender: "Male",
            assignedPlan: {
                name: "Fat Loss Program",
                assignedOn: "2025-04-10"
            },
            notes: []
        },
        {
            id: 2,
            name: "Sneha Gupta",
            age: 24,
            gender: "Female",
            assignedPlan: null,
            notes: []
        }
    ]);
};

export const getTrainerNotes = async (): Promise<Note[]> => {
    return Promise.resolve([
        {
            id: 1,
            content: "Increased squat weight today",
            date: "2025-04-15",
            clientId: 1,
            clientName: "Rahul Sharma",
        },
        {
            id: 2,
            content: "Recovery improving",
            date: "2025-04-14",
            clientId: 2,
            clientName: "Sneha Gupta",
        },
    ]);
};

export const getTrainerDashboardData = async () => {
    return Promise.resolve({
        totalClients: 12,
        activePlans: 7,
        upcomingSessions: 3,
        recentNotes: 5,
    });
};
