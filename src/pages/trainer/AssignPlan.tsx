import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllPlans, assignPlanToClient } from "../../services/planService";

interface Plan {
    id: number;
    name: string;
}

const AssignPlan = () => {
    const { id: clientId } = useParams();
    const navigate = useNavigate();

    const [plans, setPlans] = useState<Plan[]>([]);
    const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
    const [notes, setNotes] = useState("");

    useEffect(() => {
        getAllPlans().then(setPlans);
    }, []);

    const handleSubmit = async () => {
        if (!selectedPlan) return alert("Please select a plan");
        await assignPlanToClient(Number(clientId), selectedPlan, notes);
        alert("Plan assigned successfully!");
        navigate("/trainer/clients");
    };

    return (
        <div className="p-4 max-w-xl mx-auto">
            <h1 className="text-2xl font-semibold mb-6">Assign Workout Plan</h1>

            <label className="block mb-2 font-medium">Select Plan</label>
            <select
                value={selectedPlan ?? ""}
                onChange={(e) => setSelectedPlan(Number(e.target.value))}
                className="w-full border p-2 rounded mb-4"
            >
                <option value="" disabled>Select a plan</option>
                {plans.map((plan) => (
                    <option key={plan.id} value={plan.id}>
                        {plan.name}
                    </option>
                ))}
            </select>

            <label className="block mb-2 font-medium">Trainer Notes (optional)</label>
            <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full border p-2 rounded h-28 mb-6"
                placeholder="Add any custom instructions..."
            />

            <button
                onClick={handleSubmit}
                className="btn-primary w-full"
            >
                Assign Plan
            </button>
        </div>
    );
};

export default AssignPlan;
