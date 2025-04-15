import { ProgressLog } from "../types";

export const getProgressLogs = async (): Promise<ProgressLog[]> => {
    return Promise.resolve([
        {
            id: 1,
            clientId: 1,
            type: "weight",
            label: "Bodyweight",
            value: 102,
            unit: "kg",
            date: "2025-04-15",
        },
        {
            id: 2,
            clientId: 1,
            type: "exercise",
            label: "Deadlift",
            value: 40,
            unit: "kg",
            date: "2025-04-13",
        },
    ]);
};

export const addProgressLog = async (log: Omit<ProgressLog, "id">) => {
    console.log("Added Progress Log:", log);
    return Promise.resolve({ message: "Progress saved!" });
};
