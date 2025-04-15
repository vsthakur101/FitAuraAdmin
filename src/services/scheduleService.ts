// src/services/scheduleService.ts
export interface Reminder {
    id: number;
    clientId: number;
    clientName: string;
    date: string;
    time: string;
    message: string;
}

export const addReminder = async (reminder: Omit<Reminder, "id" | "clientName">) => {
    console.log("Reminder added:", reminder);
    return Promise.resolve({ message: "Reminder saved!" });
};

export const getAllReminders = async (): Promise<Reminder[]> => {
    return Promise.resolve([
        {
            id: 1,
            clientId: 1,
            clientName: "Rahul Sharma",
            date: "2025-04-18",
            time: "07:00 AM",
            message: "Leg Day session",
        },
    ]);
};
