import { NavLink } from "react-router-dom";
import { FaHome, FaUsers, FaStickyNote, FaCalendarAlt, FaUser } from "react-icons/fa";

const menu = [
    { name: "Dashboard", path: "/trainer/dashboard", icon: <FaHome /> },
    { name: "Clients", path: "/trainer/clients", icon: <FaUsers /> },
    { name: "Notes", path: "/trainer/notes", icon: <FaStickyNote /> },
    { name: "Schedule", path: "/trainer/schedule", icon: <FaCalendarAlt /> },
    { name: "Profile", path: "/trainer/profile", icon: <FaUser /> },
];

const Sidebar = () => {
    return (
        <aside className="w-64 bg-white h-screen shadow-md hidden md:flex flex-col p-4 fixed left-0 top-0 z-20">
            <h2 className="text-2xl font-bold text-blue-600 mb-8">FitAura</h2>

            <nav className="flex flex-col gap-4">
                {menu.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2 rounded-lg font-medium ${isActive
                                ? "bg-blue-100 text-blue-600"
                                : "text-gray-700 hover:bg-gray-100"
                            }`
                        }
                    >
                        <span className="text-lg">{item.icon}</span>
                        <span>{item.name}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
