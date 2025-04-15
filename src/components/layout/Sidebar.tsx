import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
    FaHome,
    FaUsers,
    FaStickyNote,
    FaCalendarAlt,
    FaUser,
    FaBars,
    FaSignOutAlt,
} from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth"; // Assuming you use this hook

const trainerMenu = [
    { name: "Dashboard", path: "/trainer/dashboard", icon: <FaHome /> },
    { name: "Clients", path: "/trainer/clients", icon: <FaUsers /> },
    { name: "Notes", path: "/trainer/notes", icon: <FaStickyNote /> },
    { name: "Schedule", path: "/trainer/schedule", icon: <FaCalendarAlt /> },
    { name: "Profile", path: "/trainer/profile", icon: <FaUser /> },
];

const adminMenu = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <FaHome /> },
    { name: "Users", path: "/admin/users", icon: <FaUsers /> },
    { name: "Profile", path: "/admin/profile", icon: <FaUser /> },
];

const Sidebar = () => {
    const { user, logout } = useAuth();
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const navigate = useNavigate();

    const menu = user?.role === "admin" ? adminMenu : trainerMenu;

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <>
            {/* Mobile Toggle */}
            <div className="md:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                    className="p-2 text-white bg-blue-600 rounded-lg shadow-lg"
                >
                    <FaBars />
                </button>
            </div>

            {/* Sidebar */}
            <aside
                onMouseEnter={() => setIsCollapsed(false)}
                onMouseLeave={() => setIsCollapsed(true)}
                className={`
          fixed top-0 left-0 z-40 h-screen bg-white shadow-md transition-all duration-300
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:flex flex-col justify-between p-4
          ${isCollapsed ? "w-20" : "w-64"} group
        `}
            >
                {/* Brand */}
                <div>
                    <h2 className={`text-2xl font-extrabold text-blue-600 mb-8 transition-all duration-300 ${isCollapsed && "text-center text-xl"}`}>
                        {isCollapsed ? "F" : "FitAura"}
                    </h2>

                    {/* Navigation */}
                    <nav className="flex flex-col gap-3 overflow-y-auto custom-scrollbar">
                        {menu.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all
                  ${isActive ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100"}
                  ${isCollapsed ? "justify-center px-3" : ""}
                  `
                                }
                            >
                                <span className="text-lg">{item.icon}</span>
                                {!isCollapsed && <span>{item.name}</span>}
                            </NavLink>
                        ))}
                    </nav>
                </div>

                {/* Logout */}
                <div className={`mt-6 ${isCollapsed ? "justify-center" : ""} flex`}>
                    <button
                        onClick={handleLogout}
                        className={`flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:text-red-600 rounded-lg transition-all w-full ${isCollapsed ? "justify-center px-3" : ""
                            }`}
                    >
                        <FaSignOutAlt />
                        {!isCollapsed && <span>Logout</span>}
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
