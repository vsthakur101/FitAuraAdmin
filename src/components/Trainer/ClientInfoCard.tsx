import { FullClient } from "../../types";

const ClientInfoCard = ({ client }: { client: FullClient }) => (
    <div className="bg-white rounded-2xl shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Client Info</h2>
        <p><strong>Name:</strong> {client.name}</p>
        <p><strong>Age:</strong> {client.age}</p>
        <p><strong>Gender:</strong> {client.gender}</p>
    </div>
);

export default ClientInfoCard;
