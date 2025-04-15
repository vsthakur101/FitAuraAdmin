interface AssignedPlan {
    name: string;
    assignedOn: string;
}
const AssignedPlanCard = ({ plan, onReassign }: { plan: AssignedPlan | null, onReassign: () => void }) => (
    <div className="bg-white rounded-2xl shadow p-4 flex justify-between items-center">
        <div>
            <h2 className="text-lg font-semibold mb-1">Assigned Plan</h2>
            <p>{plan?.name || "No plan assigned"}</p>
            <p className="text-sm text-gray-500">Since: {plan?.assignedOn}</p>
        </div>
        <button onClick={onReassign} className="btn-outline">Reassign</button>
    </div>
);

export default AssignedPlanCard;
