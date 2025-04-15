import { useNavigate } from "react-router-dom";

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md">
      <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
      <div className="flex gap-4 flex-wrap">
        <button onClick={() => navigate("/trainer/schedule")} className="btn-primary">Add Reminder</button>
        <button onClick={() => navigate("/trainer/notes")} className="btn-secondary">Add Note</button>
        <button onClick={() => navigate("/trainer/clients")} className="btn-outline">Assign Plan</button>
      </div>
    </div>
  );
};

export default QuickActions;
