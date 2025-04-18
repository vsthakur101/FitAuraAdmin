import { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import DashboardCard from '../../components/Trainer/DashboardCard';
import ReminderItem from '../../components/Trainer/ReminderItem';
import ClientCard from '../../components/Trainer/ClientCard';
import Calendar from 'react-calendar';
import {
    Users,
    CalendarDays,
    ClipboardList,
    StickyNote,
    Bell,
} from 'lucide-react';
import { fetchStats } from '../../services/dashboardService';
import { getAllReminders } from '../../services/scheduleService';
import { getAllClients } from '../../services/clientService';

const TrainerDashboard = () => {
    const [data, setData] = useState({
        totalClients: 0,
        activePlans: 0,
        upcomingSessions: 0,
        recentNotes: 0,
    });
    const [reminders, setReminders] = useState<{ time: string; title: string }[]>([]);
    const [clients, setClients] = useState<{ name: string; plan: string; lastCheckin: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(new Date());
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const { totalActivePlans, totalNotes, totalSessionsToday, totalClients } = await fetchStats()
            const schedules = await getAllReminders();
            const clients = await getAllClients();
            setData({
                totalClients: totalClients,
                activePlans: totalActivePlans,
                upcomingSessions: totalSessionsToday,
                recentNotes: totalNotes,
            });
            setReminders(schedules);
            setClients(clients);
            setLoading(false);
        };
        fetchData();
    }, []);

    const statCards = [
        { icon: <Users size={20} />, label: 'Clients', value: data.totalClients },
        { icon: <CalendarDays size={20} />, label: 'Sessions Today', value: data.upcomingSessions },
        { icon: <ClipboardList size={20} />, label: 'Active Plans', value: data.activePlans },
        { icon: <StickyNote size={20} />, label: 'Notes', value: data.recentNotes },
    ];

    return (
        <DashboardLayout>
            {/* Welcome */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold">Welcome back, Trainer 👋</h1>
                <p className="text-gray-400 text-sm">Here's what's happening today</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {statCards.map((card, idx) => (
                    <DashboardCard
                        key={idx}
                        icon={card.icon}
                        label={card.label}
                        value={card.value}
                        isLoading={loading}
                    />
                ))}
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Calendar */}
                <div className="lg:col-span-2 bg-gray-900 rounded-xl p-4">
                    <h2 className="text-xl font-semibold mb-4">This Week's Schedule</h2>
                    <div className="bg-gray-800 p-4 rounded-xl">
                        <Calendar
                            onChange={(value) => value && setSelectedDate(value as Date)}
                            value={selectedDate}
                            className="w-full rounded-lg"
                        />
                    </div>
                </div>

                {/* Reminders */}
                <div className="bg-gray-900 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Reminders</h2>
                        <Bell size={20} />
                    </div>
                    <ul className="space-y-3">
                        {reminders.map((r, idx) => (
                            <ReminderItem key={idx} title={r.title} time={r.time} />
                        ))}
                    </ul>
                </div>
            </div>

            {/* Client Preview */}
            <div className="bg-gray-900 rounded-xl p-4 mt-6">
                <h2 className="text-xl font-semibold mb-4">Client Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {clients.map((client, idx) => (
                        <ClientCard
                            key={idx}
                            client={client}
                        />
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default TrainerDashboard;
