interface ClientCardProps {
  image: string;
  name: string;
  plan: string;
}

const ClientCard: React.FC<ClientCardProps> = ({ image, name, plan }) => {
  return (
    <li className="flex justify-between items-center p-4 bg-gray-900 rounded-xl">
    <div className="flex items-center gap-4">
        <img src={image} alt={name} className="w-10 h-10 rounded-full" />
        <div>
            <p className="font-semibold text-white">{name}</p>
            <p className="text-gray-400 text-sm">{plan}</p>
        </div>
    </div>
    <button className="text-white text-2xl font-bold">⋯</button>
</li>
  )
}

export default ClientCard;