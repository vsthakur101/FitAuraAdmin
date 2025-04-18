interface ActionCardProps {
    icon: React.ReactNode;
    title: string;
    desc: string;
}

const ActionCard: React.FC<ActionCardProps> = ({ icon, title, desc }) => (
    <div className="flex items-center justify-between p-4 bg-gray-900 rounded-xl hover:bg-gray-800 cursor-pointer">
        <div className="flex items-center gap-4">
            <div className="p-2 rounded-full bg-white text-black">{icon}</div>
            <div>
                <p className="text-white font-semibold text-base">{title}</p>
                <p className="text-gray-400 text-sm">{desc}</p>
            </div>
        </div>
        <div className="text-white">›</div>
    </div>
);

export default ActionCard;