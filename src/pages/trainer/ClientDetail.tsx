import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getClientDetail } from "../../services/clientService";
import ClientInfoCard from "../../components/Trainer/ClientInfoCard";
import AssignedPlanCard from "../../components/Trainer/AssignedPlanCard";
import NotesPreview from "../../components/Trainer/NotesPreview";
import { FullClient } from "../../types";

const ClientDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [client, setClient] = useState<FullClient | null>(null);

    useEffect(() => {
        if (id) getClientDetail(Number(id)).then(setClient);
    }, [id]);

    if (!client) return <div className="p-4">Loading...</div>;

    return (
        <div className="p-4 space-y-6">
            <h1 className="text-2xl font-semibold">Client Detail</h1>

            <ClientInfoCard client={client} />

            {client.assignedPlan && (
                <AssignedPlanCard
                    plan={{
                        id: 0, // placeholder if not available
                        clientName: client.name,
                        planTitle: client.assignedPlan.name,
                        assignedOn: client.assignedPlan.assignedOn,
                    }}
                    onReassign={() => navigate(`/trainer/clients/${id}/assign`)}
                />
            )}

            <NotesPreview notes={client.notes} clientId={client.id} />
        </div>
    );
};

export default ClientDetail;
