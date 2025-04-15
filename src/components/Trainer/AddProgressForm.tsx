import { useState } from "react";
import { addProgressLog } from "../../services/progressService";
import { ProgressLog } from "../../types";

type ProgressForm = Omit<ProgressLog, "id">;
const AddProgressForm = ({ clientId, onAdd }: { clientId: number; onAdd: () => void }) => {
    const [form, setForm] = useState<ProgressForm>({
        clientId,
        type: "weight",
        label: "",
        value: 0,
        unit: "kg",
        date: new Date().toISOString().split("T")[0],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!form.label || !form.value || !form.date) {
            alert("Fill all fields");
            return;
        }
        await addProgressLog({
            ...form,
            value: Number(form.value),
            clientId,
        });
        onAdd();
        setForm({ ...form, value: 0, label: "" });
    };

    return (
        <div className="bg-white p-4 rounded-xl shadow mb-6">
            <h2 className="text-lg font-semibold mb-4">Add Progress Log</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <select
                    name="type"
                    value={form.type}
                    onChange={(e) =>
                        setForm({ ...form, type: e.target.value as "weight" | "exercise" })
                    }
                    className="border p-2 rounded"
                >
                    <option value="weight">Bodyweight</option>
                    <option value="exercise">Exercise PR</option>
                </select>

                <input
                    type="text"
                    name="label"
                    placeholder="e.g. Squat / Bodyweight"
                    value={form.label}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />

                <input
                    type="number"
                    name="value"
                    placeholder="Value"
                    value={form.value}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />

                <input
                    type="text"
                    name="unit"
                    placeholder="kg / lbs"
                    value={form.unit}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />

                <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="border p-2 rounded col-span-1 sm:col-span-2"
                />
            </div>

            <button onClick={handleSubmit} className="btn-primary mt-4 w-full">
                Add Progress
            </button>
        </div>
    );
};

export default AddProgressForm;
