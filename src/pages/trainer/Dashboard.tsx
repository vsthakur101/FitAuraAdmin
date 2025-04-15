import { useEffect, useState, useMemo } from "react";
import { FaUsers, FaDumbbell, FaBell, FaStickyNote } from "react-icons/fa";
import DashboardCard from "../../components/Trainer/DashboardCard";
import QuickActions from "../../components/Trainer/QuickActions";
import ReminderPreview from "../../components/Trainer/ReminderPreview";
import { getTrainerDashboardData } from "../../services/trainerService";
import { useAuth } from "../../hooks/useAuth";

const Dashboard = () => {
    const { user, loading: authLoading } = useAuth();
    const [data, setData] = useState({
        totalClients: 0,
        activePlans: 0,
        upcomingSessions: 0,
        recentNotes: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const dummyReminders = useMemo(() => [
        { clientName: "Rahul Sharma", date: "16 Apr", time: "7:00 AM" },
        { clientName: "Sneha Gupta", date: "16 Apr", time: "8:30 AM" },
    ], []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dashboardData = await getTrainerDashboardData();
                setData(dashboardData);
            } catch (err) {
                console.error(err);
                setError("Unable to fetch dashboard data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (authLoading || loading) {
        return (
            <div className="p-6 text-center text-gray-600">Loading dashboard...</div>
        );
    }

    if (error) {
        return (
            <div className="p-6 text-center text-red-500">{error}</div>
        );
    }

    return (
        <main className="px-[6rem] space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    {user?.role === "admin" ? "Admin Dashboard" : "Trainer Dashboard"}
                </h1>
                <p className="text-sm text-gray-500">Welcome back, {user?.name || "Trainer"}!</p>
            </div>

            {/* Overview Cards */}
            <section>
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Overview</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    <DashboardCard title="Total Clients" value={data.totalClients} icon={<FaUsers />} bgColor="bg-blue-100" />
                    <DashboardCard title="Active Plans" value={data.activePlans} icon={<FaDumbbell />} bgColor="bg-green-100" />
                    <DashboardCard title="Upcoming Sessions" value={data.upcomingSessions} icon={<FaBell />} bgColor="bg-yellow-100" />
                    <DashboardCard title="Recent Notes" value={data.recentNotes} icon={<FaStickyNote />} bgColor="bg-purple-100" />
                </div>
            </section>

            {/* Actions & Reminders */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Quick Actions</h2>
                    <QuickActions />
                </div>
                <div>
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Today's Reminders</h2>
                    <ReminderPreview reminders={dummyReminders} />
                </div>
            </section>
        </main>
    );
};

export default Dashboard;
