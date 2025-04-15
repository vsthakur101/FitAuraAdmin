import { useEffect, useState } from "react";
import DashboardCard from "../../components/Trainer/DashboardCard";
import { getTrainerDashboardData } from "../../services/trainerService";
import { FaUsers, FaDumbbell, FaBell, FaStickyNote } from "react-icons/fa";
import QuickActions from "../../components/Trainer/QuickActions";
import ReminderPreview from "../../components/Trainer/ReminderPreview";

const Dashboard = () => {
    const [data, setData] = useState({
        totalClients: 0,
        activePlans: 0,
        upcomingSessions: 0,
        recentNotes: 0,
    });

    const dummyReminders = [
        { clientName: "Rahul Sharma", date: "16 Apr", time: "7:00 AM" },
        { clientName: "Sneha Gupta", date: "16 Apr", time: "8:30 AM" },
    ];


    useEffect(() => {
        getTrainerDashboardData().then(setData);
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-semibold mb-6">Trainer Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <DashboardCard title="Total Clients" value={data.totalClients} icon={<FaUsers />} />
                <DashboardCard title="Active Plans" value={data.activePlans} icon={<FaDumbbell />} />
                <DashboardCard title="Upcoming Sessions" value={data.upcomingSessions} icon={<FaBell />} />
                <DashboardCard title="Recent Notes" value={data.recentNotes} icon={<FaStickyNote />} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <QuickActions />
                <ReminderPreview reminders={dummyReminders} />
            </div>
        </div>
    );
};

export default Dashboard;
