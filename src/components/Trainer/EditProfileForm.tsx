import { useState } from "react";
import { updateTrainerProfile } from "../../services/authService";
import { Trainer } from "../../types";

const EditProfileForm = ({ trainer }: { trainer: Trainer }) => {
    const [form, setForm] = useState({ name: trainer.name, password: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        await updateTrainerProfile(form);
        alert("Profile updated!");
    };

    return (
        <div className="bg-white p-4 rounded-xl shadow space-y-4">
            <h3 className="text-lg font-semibold">Update Info</h3>
            <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Name"
            />
            <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="New Password"
            />
            <button onClick={handleSubmit} className="btn-primary w-full">Save Changes</button>
        </div>
    );
};

export default EditProfileForm;
