import { useState } from "react";
import { createWorkoutPlan } from "../../services/planService";
import { useNavigate } from "react-router-dom";

type CreatePlanForm = {
    title: string;
    goal: string;
    level: "beginner" | "intermediate" | "advanced";
    durationWeeks: number;
};

const CreatePlan = () => {
    const [form, setForm] = useState<CreatePlanForm>({
        title: "",
        goal: "",
        level: "beginner",
        durationWeeks: 4,
    });

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, level: e.target.value as "beginner" | "intermediate" | "advanced" })
    };

    const handleSubmit = async () => {
        if (!form.title || !form.goal) {
            alert("Please fill all fields");
            return;
        }

        await createWorkoutPlan({
            ...form,
            durationWeeks: Number(form.durationWeeks),
        });

        alert("Workout Plan Created ✅");
        navigate("/trainer/plans");
    };

    return (
        <div className="p-4 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Create New Workout Plan</h1>

            <div className="space-y-4 bg-white p-4 rounded-xl shadow">
                <input
                    name="title"
                    placeholder="Plan Title"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />
                <input
                    name="goal"
                    placeholder="Plan Goal (e.g. Build Muscle)"
                    value={form.goal}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />

                <div className="flex gap-4">
                    <select
                        name="level"
                        value={form.level}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                    >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>

                    <input
                        type="number"
                        name="durationWeeks"
                        value={form.durationWeeks}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                        placeholder="Duration (weeks)"
                        min={1}
                    />
                </div>

                <button onClick={handleSubmit} className="btn-primary w-full">
                    Create Plan
                </button>
            </div>
        </div>
    );
};

export default CreatePlan;
