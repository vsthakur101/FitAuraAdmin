import { WorkoutPlan } from "../types";

export const getAllPlans = async () => {
    return Promise.resolve([
        { id: 1, name: "Fat Loss Program" },
        { id: 2, name: "Muscle Gain Program" },
        { id: 3, name: "Strength Builder" },
    ]);
};

export const assignPlanToClient = async (
    clientId: number,
    planId: number,
    notes: string
) => {
    // Replace with real API call
    return Promise.resolve({
        message: "Plan assigned!",
        data: { clientId, planId, notes },
    });
};

export const getWorkoutPlans = async (): Promise<WorkoutPlan[]> => {
    return Promise.resolve([
        {
            id: 1,
            title: "Fat Loss Program",
            goal: "Reduce body fat",
            level: "beginner",
            durationWeeks: 6,
            createdAt: "2025-04-10",
        },
        {
            id: 2,
            title: "Muscle Gain Program",
            goal: "Build lean muscle",
            level: "intermediate",
            durationWeeks: 8,
            createdAt: "2025-04-12",
        },
    ]);
};

export const createWorkoutPlan = async (plan: Omit<WorkoutPlan, "id" | "createdAt">) => {
    console.log("Creating plan:", plan);
    return Promise.resolve({ message: "Plan created successfully!" });
};
