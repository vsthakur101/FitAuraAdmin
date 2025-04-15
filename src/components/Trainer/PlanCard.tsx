import { WorkoutPlan } from "../../types";

const PlanCard = ({ plan }: { plan: WorkoutPlan }) => (
    <div className="bg-white shadow p-4 rounded-xl">
        <h2 className="text-lg font-semibold mb-1">{plan.title}</h2>
        <p className="text-sm text-gray-500 mb-1">{plan.goal}</p>
        <p className="text-sm text-gray-600 mb-1 capitalize">
            Level: <strong>{plan.level}</strong> | Duration: {plan.durationWeeks} weeks
        </p>
        <p className="text-xs text-gray-400">Created on: {plan.createdAt}</p>
    </div>
);

export default PlanCard;
