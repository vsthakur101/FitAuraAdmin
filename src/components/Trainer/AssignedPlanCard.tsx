import { AssignedPlan } from "../../types";

interface Props {
    plan: AssignedPlan;
    onReassign?: () => void; // ✅ Add this optional prop
}

const AssignedPlanCard = ({ plan, onReassign }: Props) => (
    <div className="bg-white p-4 rounded-xl shadow relative">
        <h3 className="text-lg font-semibold">{plan.clientName}</h3>
        <p className="text-sm text-gray-600">
            Plan: <strong>{plan.planTitle}</strong>
        </p>
        <p className="text-xs text-gray-500">Assigned on: {plan.assignedOn}</p>
        {plan.notes && <p className="text-sm mt-2 italic text-gray-700">“{plan.notes}”</p>}

        {onReassign && (
            <button
                onClick={onReassign}
                className="absolute top-2 right-2 text-blue-600 text-sm hover:underline"
            >
                Reassign
            </button>
        )}
    </div>
);

export default AssignedPlanCard;
