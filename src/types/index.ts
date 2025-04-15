export interface ClientBase {
    id: number;
    name: string;
    age: number;
    gender: string;
}

export interface BasicClient extends ClientBase {
    currentPlan: string | null;
}

export interface FullClient extends ClientBase {
    assignedPlan: { name: string; assignedOn: string } | null;
    notes: Note[];
}

export interface Note {
    id: number;
    content: string;
    date: string;
    clientId: number;
    clientName: string;
}

export interface ProgressLog {
    id: number;
    clientId: number;
    type: "weight" | "exercise";
    label: string; // e.g. "Deadlift", "Squat", or "Bodyweight"
    value: number;
    unit: string; // e.g. "kg", "lbs"
    date: string;
}
export interface Trainer {
    id: number;
    name: string;
    email: string;
    role: "trainer";
    avatarUrl?: string;
}
export interface Exercise {
    id: number;
    label: string;
    sets: number;
    reps: number;
    rest: string;
}
export interface WorkoutPlan {
    id: number;
    title: string;
    goal: string;
    level: "beginner" | "intermediate" | "advanced";
    durationWeeks: number;
    createdAt: string;
    exercises?: Exercise[];
}