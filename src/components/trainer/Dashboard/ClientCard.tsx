interface Client {
  name: string;
  plan: string;
  image?: string;
}

const ClientCard: React.FC<{ client: Client }> = ({ client }) => {
  return (
    <div className="flex items-center gap-4 bg-gray-900 p-4 rounded-xl hover:bg-gray-800 transition">
      <img
        src={client.image || `https://api.dicebear.com/7.x/initials/svg?seed=${client.name}`}
        alt={client.name}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div>
        <p className="font-semibold text-white">{client.name}</p>
        <p className="text-sm text-gray-400">{client.plan}</p>
      </div>
    </div>
  );
};

export default ClientCard;
