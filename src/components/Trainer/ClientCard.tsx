import { useNavigate } from "react-router-dom";
import { BasicClient } from "../../types";

const ClientCard = ({ client }: { client: BasicClient }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition">
      <h3 className="text-lg font-semibold">{client.name}</h3>
      <p className="text-sm text-gray-600">Age: {client.age} | {client.gender}</p>
      <p className="text-sm mt-1">
        Plan:{" "}
        {client.currentPlan ? (
          <span className="text-green-600 font-medium">{client.currentPlan}</span>
        ) : (
          <span className="text-red-500">Not Assigned</span>
        )}
      </p>
      <div className="flex gap-2 mt-4">
        <button
          className="btn-outline"
          onClick={() => navigate(`/trainer/clients/${client.id}`)}
        >
          View
        </button>
        <button
          className="btn-primary"
          onClick={() => navigate(`/trainer/clients/${client.id}/assign`)}
        >
          Assign Plan
        </button>
        <button
          className="btn-secondary"
          onClick={() => navigate(`/trainer/notes?clientId=${client.id}`)}
        >
          Add Note
        </button>
      </div>
    </div>
  );
};

export default ClientCard;
