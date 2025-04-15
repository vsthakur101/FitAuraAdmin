import { useEffect, useState } from "react";
import { getTrainerClients } from "../../services/trainerService";
import ClientCard from "../../components/Trainer/ClientCard";
import { FullClient } from "../../types";

const Clients = () => {
    const [clients, setClients] = useState<FullClient[]>([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        getTrainerClients().then(setClients);
    }, []);

    const filteredClients = clients.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-4">
            <h1 className="text-2xl font-semibold mb-4">My Clients</h1>

            <input
                type="text"
                placeholder="Search clients..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border p-2 rounded mb-6 w-full sm:w-1/2"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredClients.map((client) => (
                    <ClientCard key={client.id} client={{
                        id: client.id,
                        name: client.name,
                        age: client.age,
                        gender: client.gender,
                        currentPlan: client.assignedPlan?.name || null, // 👈 convert assignedPlan → currentPlan
                    }} />
                ))}
            </div>
        </div>
    );
};

export default Clients;
