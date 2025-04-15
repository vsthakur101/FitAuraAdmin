import { Exercise } from "../../types";
import { useState } from "react";

interface Props {
    ex: Exercise;
    onEdit: (exercise: Exercise) => void;
    onDelete: (id: number) => void;
}

const ExerciseCard = ({ ex, onEdit, onDelete }: Props) => {
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({
        label: ex.label,
        sets: ex.sets,
        reps: ex.reps,
        rest: ex.rest,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        onEdit({ ...ex, ...form, sets: Number(form.sets), reps: Number(form.reps) });
        setEditing(false);
    };

    return (
        <div className="border p-4 rounded-xl bg-white shadow-sm relative">
            {!editing ? (
                <>
                    <h3 className="text-lg font-semibold">{ex.label}</h3>
                    <p className="text-sm text-gray-600">
                        {ex.sets} sets × {ex.reps} reps
                    </p>
                    <p className="text-xs text-gray-500">Rest: {ex.rest}</p>
                    <div className="absolute top-2 right-2 flex gap-2">
                        <button onClick={() => setEditing(true)} className="text-blue-500 text-sm">Edit</button>
                        <button onClick={() => onDelete(ex.id)} className="text-red-500 text-sm">Delete</button>
                    </div>
                </>
            ) : (
                <div className="space-y-2">
                    <input
                        name="label"
                        value={form.label}
                        onChange={handleChange}
                        className="border p-1 w-full rounded text-sm"
                    />
                    <div className="flex gap-2">
                        <input
                            name="sets"
                            type="number"
                            value={form.sets}
                            onChange={handleChange}
                            className="border p-1 w-1/3 rounded text-sm"
                        />
                        <input
                            name="reps"
                            type="number"
                            value={form.reps}
                            onChange={handleChange}
                            className="border p-1 w-1/3 rounded text-sm"
                        />
                        <input
                            name="rest"
                            value={form.rest}
                            onChange={handleChange}
                            className="border p-1 w-1/3 rounded text-sm"
                        />
                    </div>
                    <div className="flex justify-between">
                        <button onClick={handleSave} className="text-green-600 text-sm">Save</button>
                        <button onClick={() => setEditing(false)} className="text-gray-500 text-sm">Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExerciseCard;
