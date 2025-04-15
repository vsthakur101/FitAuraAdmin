import { useEffect, useState } from "react";
import { getAssignedPlans } from "../../services/planService";
import { AssignedPlan } from "../../types";
import AssignedPlanCard from "../../components/Trainer/AssignedPlanCard";

const AssignedPlans = () => {
    const [assigned, setAssigned] = useState<AssignedPlan[]>([]);

    useEffect(() => {
        getAssignedPlans().then(setAssigned);
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Assigned Workout Plans</h1>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {assigned.length > 0 ? (
                    assigned.map((plan) => <AssignedPlanCard key={plan.id} plan={plan} />)
                ) : (
                    <p className="text-gray-500">No assigned plans yet.</p>
                )}
            </div>
        </div>
    );
};

export default AssignedPlans;
