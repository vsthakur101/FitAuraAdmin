import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getWorkoutPlanById, addExerciseToPlan, updateExercise, deleteExercise } from "../../services/planService";
import { Exercise, WorkoutPlan } from "../../types";
import ExerciseCard from "../../components/Trainer/ExerciseCard";


const PlanDetail = () => {
    const { id } = useParams();
    const [plan, setPlan] = useState<WorkoutPlan | null>(null);
    const [form, setForm] = useState<Omit<Exercise, "id">>({
        label: "",
        sets: 3,
        reps: 10,
        rest: "60s",
    });

    const loadPlan = () => {
        getWorkoutPlanById(Number(id)).then(setPlan);
    };

    useEffect(() => {
        loadPlan();
    }, [id]);

    const handleEdit = async (updated: Exercise) => {
        await updateExercise(plan!.id, updated);
        loadPlan();
    };

    const handleDelete = async (exId: number) => {
        if (confirm("Delete this exercise?")) {
            await deleteExercise(plan!.id, exId);
            loadPlan();
        }
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleAddExercise = async () => {
        if (!form.label) return alert("Exercise name required");
        await addExerciseToPlan(Number(id), {
            ...form,
            sets: Number(form.sets),
            reps: Number(form.reps),
        });
        alert("Exercise added!");
        setForm({ label: "", sets: 3, reps: 10, rest: "60s" });
        loadPlan();
    };

    if (!plan) return <p className="p-4">Loading...</p>;

    return (
        <div className="p-4 max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-4 rounded-xl shadow">
                <h1 className="text-2xl font-bold mb-1">{plan.title}</h1>
                <p className="text-sm text-gray-600">{plan.goal}</p>
                <p className="text-xs text-gray-500 capitalize">
                    {plan.level} | {plan.durationWeeks} weeks
                </p>
            </div>

            {/* Add Exercise Form */}
            <div className="bg-white p-4 rounded-xl shadow space-y-4">
                <h2 className="text-lg font-semibold">Add Exercise</h2>
                <input
                    name="label"
                    placeholder="Exercise Name"
                    value={form.label}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />
                <div className="grid grid-cols-3 gap-4">
                    <input
                        name="sets"
                        type="number"
                        value={form.sets}
                        onChange={handleChange}
                        className="border p-2 rounded"
                        placeholder="Sets"
                    />
                    <input
                        name="reps"
                        type="number"
                        value={form.reps}
                        onChange={handleChange}
                        className="border p-2 rounded"
                        placeholder="Reps"
                    />
                    <input
                        name="rest"
                        value={form.rest}
                        onChange={handleChange}
                        className="border p-2 rounded"
                        placeholder="Rest Time (e.g. 60s)"
                    />
                </div>
                <button onClick={handleAddExercise} className="btn-primary w-full">Add Exercise</button>
            </div>

            {/* Exercise List */}
            <div className="space-y-3">
                <h2 className="text-lg font-semibold mb-2">Exercises</h2>
                {plan.exercises && plan.exercises.length > 0 ? (
                    <div className="grid sm:grid-cols-2 gap-4">
                        {plan.exercises.map((ex) => (
                            <ExerciseCard key={ex.id} ex={ex} onEdit={handleEdit} onDelete={handleDelete} />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No exercises added yet.</p>
                )}
            </div>
        </div>
    );
};

export default PlanDetail;
