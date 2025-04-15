import { useEffect, useState } from "react";
import { addReminder, getAllReminders, Reminder } from "../../services/scheduleService";
import { getTrainerClients } from "../../services/trainerService";
import { BasicClient } from "../../types";

const Schedule = () => {
    const [clients, setClients] = useState<BasicClient[]>([]);
    const [form, setForm] = useState({
        clientId: "",
        date: "",
        time: "",
        message: "",
    });

    const [reminders, setReminders] = useState<Reminder[]>([]);

    useEffect(() => {
        getTrainerClients().then((fullClients) => {
            const basicClients = fullClients.map((client) => ({
                id: client.id,
                name: client.name,
                age: client.age,
                gender: client.gender,
                currentPlan: client.assignedPlan?.name || null,
            }));
            setClients(basicClients);
        });
        getAllReminders().then(setReminders);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!form.clientId || !form.date || !form.time) {
            alert("Please fill all required fields");
            return;
        }
        await addReminder({
            clientId: Number(form.clientId),
            date: form.date,
            time: form.time,
            message: form.message,
        });
        alert("Reminder added!");
        setForm({ clientId: "", date: "", time: "", message: "" });
    };

    return (
        <div className="p-4 max-w-3xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold">Schedule Reminder</h1>

            {/* Form */}
            <div className="bg-white shadow p-4 rounded-xl space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Client</label>
                    <select
                        name="clientId"
                        value={form.clientId}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    >
                        <option value="">Select client</option>
                        {clients.map((client) => (
                            <option key={client.id} value={client.id}>
                                {client.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block mb-1 font-medium">Date</label>
                        <input
                            type="date"
                            name="date"
                            value={form.date}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block mb-1 font-medium">Time</label>
                        <input
                            type="time"
                            name="time"
                            value={form.time}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                    </div>
                </div>

                <div>
                    <label className="block mb-1 font-medium">Message</label>
                    <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        placeholder="Optional note"
                    />
                </div>

                <button
                    onClick={handleSubmit}
                    className="btn-primary w-full"
                >
                    Add Reminder
                </button>
            </div>

            {/* Upcoming Reminders */}
            <div>
                <h2 className="text-xl font-semibold mb-2">Upcoming Reminders</h2>
                <ul className="space-y-2">
                    {reminders.map((r) => (
                        <li key={r.id} className="border rounded-xl p-3 bg-white shadow-sm">
                            <p className="font-semibold">{r.clientName}</p>
                            <p className="text-sm text-gray-600">
                                {r.date} at {r.time}
                            </p>
                            <p className="text-sm mt-1">{r.message}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Schedule;
