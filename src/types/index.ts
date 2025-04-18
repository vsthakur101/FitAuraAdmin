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
export interface User {
    id: number;
    name: string;
    email: string;
    role: "admin" | "trainer" | "user";
}

export interface AssignedPlan {
    id: number;
    clientName: string;
    planTitle: string;
    assignedOn: string;
    notes?: string;
}

export interface ClientData {
    name: string;
    email: string;
    phone: number;
    gender: 'Male' | 'Female' | 'Other';
    goal: 'Fat Loss' | 'Muscle Gain' | 'General Fitness';
    weight: number;
    height: number;
    password: string;
    confirmPassword?: string;
}

export interface ClientFormData extends ClientData{
    profile_photo?: File | null; // optional in case image is not uploaded
}
