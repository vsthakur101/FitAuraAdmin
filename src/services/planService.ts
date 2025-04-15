import { Exercise, WorkoutPlan } from "../types";

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


export const getWorkoutPlanById = async (id: number): Promise<WorkoutPlan> => {
    return Promise.resolve({
        id,
        title: "Fat Loss Program",
        goal: "Burn fat and improve stamina",
        level: "beginner",
        durationWeeks: 6,
        createdAt: "2025-04-10",
        exercises: [
            { id: 1, label: "Jumping Jacks", sets: 3, reps: 15, rest: "30s" },
            { id: 2, label: "Mountain Climbers", sets: 4, reps: 20, rest: "45s" },
        ],
    });
};

export const addExerciseToPlan = async (planId: number, exercise: Omit<Exercise, "id">) => {
    console.log("Exercise added to plan", planId, exercise);
    return Promise.resolve({ message: "Exercise added!" });
};

export const updateExercise = async (planId: number, updated: Exercise): Promise<void> => {
    console.log("Exercise updated:", updated);
    return Promise.resolve();
};

export const deleteExercise = async (planId: number, exerciseId: number): Promise<void> => {
    console.log("Exercise deleted:", exerciseId);
    return Promise.resolve();
};