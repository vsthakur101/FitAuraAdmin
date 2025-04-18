import { ClipboardCheck, Apple, ActivitySquare, Bell } from 'lucide-react';
import ActionCard from '../../../components/trainer/Client/ActionCard';
import ClientCard from '../../../components/trainer/Client/ClientCard';
import { useNavigate } from 'react-router-dom';

const clients = [
    { id: 1, name: 'Arvind Agarwal', plan: 'Workout A', image: 'https://i.pravatar.cc/150?img=1' },
    { id: 2, name: 'Preeti Desai', plan: 'Workout A', image: 'https://i.pravatar.cc/150?img=2' },
];


const clientActions = [
    {
        icon: <ClipboardCheck size={24} />,
        title: 'Assign Workout Plan',
        desc: 'Assign plans to your clients',
    },
    {
        icon: <Apple size={24} />,
        title: 'Assign Nutrition Plan',
        desc: 'Assign nutrition goals',
    },
    {
        icon: <ActivitySquare size={24} />,
        title: 'Track Progress',
        desc: 'Record and view progress',
    },
    {
        icon: <Bell size={24} />,
        title: 'Set Reminders',
        desc: 'Schedule reminders for clients',
    },
];

const ClientPanel = () => {
    const navigate = useNavigate();

    const handleAddClient = () => {
        navigate('/trainer/clients/add');
    };
    return (
        <div className="p-6 text-white">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Clients</h1>
                    <p className="text-gray-400 text-sm">Manage your clients and their progress</p>
                </div>
                <button className="bg-white text-black px-4 py-2 rounded-md font-semibold hover:bg-gray-200" onClick={handleAddClient}>Add Client</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {
                    clientActions.map((action, index) => (
                        <ActionCard
                            key={index}
                            icon={action.icon}
                            title={action.title}
                            desc={action.desc}
                        />
                    ))
                }
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-4">Client List</h2>
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full px-4 py-2 mb-4 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none"
                />

                <ul className="space-y-4">
                    {clients.map((client) => (
                        <ClientCard
                            key={client.id}
                            name={client.name}
                            plan={client.plan}
                            image={client.image}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ClientPanel;
