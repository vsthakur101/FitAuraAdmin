import { useEffect, useState } from "react";
import { getWorkoutPlans } from "../../services/planService";
import { WorkoutPlan } from "../../types";
import PlanCard from "../../components/Trainer/PlanCard";
import { useNavigate } from "react-router-dom";

const Plans = () => {
    const [plans, setPlans] = useState<WorkoutPlan[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        getWorkoutPlans().then(setPlans);
    }, []);

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Workout Plans</h1>
                <button
                    onClick={() => navigate("/trainer/plans/create")}
                    className="btn-primary"
                >
                    + New Plan
                </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {plans.length > 0 ? (
                    plans.map((plan) => <PlanCard key={plan.id} plan={plan} />)
                ) : (
                    <p className="text-gray-500">No plans found.</p>
                )}
            </div>
        </div>
    );
};

export default Plans;
